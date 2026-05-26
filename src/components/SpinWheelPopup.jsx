import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const STORAGE_KEY = 'shidhu_spin_wheel'
const SHOW_DELAY  = 3000 // 3 seconds after page load

// 6 segments: two each of 5%, 10%, 15%
const SEGMENTS = [
  { label: '5% OFF',  discount: 5,  bg: '#5B21B6', border: '#7C3AED' },
  { label: '10% OFF', discount: 10, bg: '#7C3AED', border: '#A78BFA' },
  { label: '15% OFF', discount: 15, bg: '#4C1D95', border: '#8B5CF6' },
  { label: '5% OFF',  discount: 5,  bg: '#6D28D9', border: '#7C3AED' },
  { label: '10% OFF', discount: 10, bg: '#7C3AED', border: '#C4B5FD' },
  { label: '15% OFF', discount: 15, bg: '#5B21B6', border: '#A78BFA' },
]

const NUM_SEG    = SEGMENTS.length
const SEG_DEG    = 360 / NUM_SEG          // 60° per segment
const SIZE       = 260                    // canvas px

function buildWheelPath(cx, cy, r, startDeg, endDeg) {
  const s = (startDeg - 90) * (Math.PI / 180)
  const e = (endDeg   - 90) * (Math.PI / 180)
  const x1 = cx + r * Math.cos(s)
  const y1 = cy + r * Math.sin(s)
  const x2 = cx + r * Math.cos(e)
  const y2 = cy + r * Math.sin(e)
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`
}

function labelPos(cx, cy, r, segIdx) {
  const mid = (segIdx * SEG_DEG + SEG_DEG / 2 - 90) * (Math.PI / 180)
  return {
    x: cx + r * 0.66 * Math.cos(mid),
    y: cy + r * 0.66 * Math.sin(mid),
    rotate: segIdx * SEG_DEG + SEG_DEG / 2,
  }
}

function Wheel({ rotation }) {
  const cx = SIZE / 2
  const cy = SIZE / 2
  const r  = SIZE / 2 - 6

  return (
    <svg
      width={SIZE}
      height={SIZE}
      style={{ transform: `rotate(${rotation}deg)`, transition: 'none', display: 'block' }}
    >
      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="#7C3AED" strokeWidth="2" opacity="0.4" />

      {SEGMENTS.map((seg, i) => {
        const start = i * SEG_DEG
        const end   = start + SEG_DEG
        const { x, y, rotate } = labelPos(cx, cy, r, i)
        return (
          <g key={i}>
            <path
              d={buildWheelPath(cx, cy, r, start, end)}
              fill={seg.bg}
              stroke={seg.border}
              strokeWidth="1.5"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="13"
              fontWeight="700"
              fontFamily="'DM Sans', sans-serif"
              transform={`rotate(${rotate}, ${x}, ${y})`}
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {seg.label}
            </text>
          </g>
        )
      })}

      {/* Center hub */}
      <circle cx={cx} cy={cy} r={r * 0.16} fill="#141414" stroke="#7C3AED" strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={r * 0.07} fill="#7C3AED" />
    </svg>
  )
}

// Pointer arrow sitting above the wheel, pointing down
function Pointer() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 flex flex-col items-center">
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft:  '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop:   '22px solid #F59E0B',
          filter: 'drop-shadow(0 2px 4px rgba(245,158,11,0.6))',
        }}
      />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SpinWheelPopup() {
  // phase: 'wheel' | 'result' | 'form' | 'done'
  const [phase,     setPhase]    = useState('wheel')
  const [visible,   setVisible]  = useState(false)
  const [rotation,  setRotation] = useState(0)
  const [spinning,  setSpinning] = useState(false)
  const [wonIdx,    setWonIdx]   = useState(null)

  const [name,     setName]     = useState('')
  const [phone,    setPhone]    = useState('')
  const [business, setBusiness] = useState('')
  const [status,   setStatus]   = useState('idle') // idle | sending | error

  const wheelRef = useRef(null)
  const rotRef   = useRef(0)   // tracks actual CSS rotation accumulated

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'submitted' || stored === 'dismissed') return
    const t = setTimeout(() => setVisible(true), SHOW_DELAY)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'dismissed')
    setVisible(false)
  }

  function spin() {
    if (spinning) return

    // Pick a random segment index weighted toward 10% (feels fair)
    const rand   = Math.random()
    let picked
    if (rand < 0.40)      picked = SEGMENTS.findIndex(s => s.discount === 5)
    else if (rand < 0.75) picked = SEGMENTS.findIndex(s => s.discount === 10)
    else                  picked = SEGMENTS.findIndex(s => s.discount === 15)

    // Sometimes the same discount appears twice — pick one of the two randomly
    const allMatches = SEGMENTS
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.discount === SEGMENTS[picked].discount)
    const chosenMatch = allMatches[Math.floor(Math.random() * allMatches.length)]
    const segIdx = chosenMatch.i

    // Rotation to land segment center at top pointer
    // Segment i center = i*60 + 30 degrees from 12 o'clock
    // We need that angle at 0 (top), so subtract it (counter-clockwise)
    const segCenter   = segIdx * SEG_DEG + SEG_DEG / 2
    const extraSpins  = 5 * 360
    const landOffset  = (360 - segCenter % 360) % 360
    const totalDelta  = extraSpins + landOffset

    const finalRot = rotRef.current + totalDelta

    setSpinning(true)
    setWonIdx(segIdx)

    // Apply via CSS transition on the div wrapping the SVG
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 1.0)'
      wheelRef.current.style.transform  = `rotate(${finalRot}deg)`
    }

    rotRef.current = finalRot

    setTimeout(() => {
      setSpinning(false)
      setPhase('result')
    }, 4800)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !business.trim()) return

    const wonDiscount = SEGMENTS[wonIdx]?.discount ?? '?'
    setStatus('sending')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:        name.trim(),
          phone:            phone.trim(),
          service_interest: `${business.trim()} — Spin Wheel Discount: ${wonDiscount}% OFF`,
          page_url:         window.location.href,
          submitted_at:     new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
        PUBLIC_KEY,
      )
      localStorage.setItem(STORAGE_KEY, 'submitted')
      setPhase('done')
    } catch {
      setStatus('error')
    }
  }

  const wonDiscount = wonIdx !== null ? SEGMENTS[wonIdx].discount : null

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={phase === 'wheel' ? dismiss : undefined}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <div className="relative bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">

              {/* Top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-accent to-accent-light" />

              {/* Close button */}
              {phase !== 'done' && (
                <button
                  onClick={dismiss}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                  aria-label="Close"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* ── WHEEL PHASE ── */}
              {(phase === 'wheel' || phase === 'result') && (
                <div className="flex flex-col items-center px-6 pt-5 pb-6">
                  <p className="font-display text-white text-2xl tracking-wide mb-0.5">
                    {phase === 'wheel' ? 'SPIN TO WIN' : `YOU WON ${wonDiscount}% OFF!`}
                  </p>
                  <p className="font-body text-gray-400 text-xs mb-5 text-center">
                    {phase === 'wheel'
                      ? 'Try your luck — get 5%, 10%, or 15% off your first project'
                      : 'Congrats! Claim your discount before it expires.'}
                  </p>

                  {/* Wheel container */}
                  <div className="relative mb-5" style={{ width: SIZE, height: SIZE + 14 }}>
                    <Pointer />
                    <div
                      ref={wheelRef}
                      style={{
                        width: SIZE,
                        height: SIZE,
                        marginTop: 14,
                        transformOrigin: 'center center',
                        willChange: 'transform',
                      }}
                    >
                      <Wheel rotation={0} />
                    </div>
                  </div>

                  {phase === 'wheel' ? (
                    <motion.button
                      onClick={spin}
                      disabled={spinning}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent to-accent-light text-white font-body font-bold text-sm tracking-wide shadow-lg shadow-accent/30 disabled:opacity-50 transition-opacity"
                      whileHover={{ scale: spinning ? 1 : 1.03 }}
                      whileTap={{ scale: spinning ? 1 : 0.97 }}
                    >
                      {spinning ? 'Spinning…' : '🎡 SPIN THE WHEEL'}
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => setPhase('form')}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-body font-bold text-sm tracking-wide shadow-lg shadow-amber-500/30"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      🎁 CLAIM YOUR {wonDiscount}% DISCOUNT →
                    </motion.button>
                  )}

                  {phase === 'wheel' && (
                    <button
                      onClick={dismiss}
                      className="mt-3 font-body text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
                    >
                      No thanks, I'll pay full price
                    </button>
                  )}
                </div>
              )}

              {/* ── FORM PHASE ── */}
              {phase === 'form' && (
                <div className="px-6 pt-5 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🎁</span>
                    <p className="font-display text-white text-xl tracking-wide">
                      CLAIM {wonDiscount}% OFF
                    </p>
                  </div>
                  <p className="font-body text-gray-400 text-xs mb-5">
                    Fill in your details and we'll apply the discount to your project.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-accent/60 outline-none rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-gray-600 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number *"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-accent/60 outline-none rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-gray-600 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Business / Company name *"
                      value={business}
                      onChange={e => setBusiness(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-accent/60 outline-none rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-gray-600 transition-colors"
                    />

                    {status === 'error' && (
                      <p className="font-body text-red-400 text-xs">
                        Something went wrong. WhatsApp us at +91 9341784664.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white font-body font-bold text-sm transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === 'sending' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        'Send & Claim Discount →'
                      )}
                    </motion.button>

                    <p className="font-body text-gray-700 text-[10px] text-center">
                      Your details are only used to contact you about your discount.
                    </p>
                  </form>
                </div>
              )}

              {/* ── DONE PHASE ── */}
              {phase === 'done' && (
                <div className="px-6 pt-8 pb-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-display text-white text-2xl tracking-wide mb-1">
                    YOU'RE ALL SET!
                  </p>
                  <p className="font-body text-gray-400 text-sm mb-1">
                    Your <span className="text-white font-semibold">{wonDiscount}% discount</span> is locked in.
                  </p>
                  <p className="font-body text-gray-500 text-xs mb-6">
                    Shidhu will call you at <span className="text-gray-300">{phone}</span> within 2 hours to get started.
                  </p>
                  <button
                    onClick={dismiss}
                    className="font-body text-xs text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
