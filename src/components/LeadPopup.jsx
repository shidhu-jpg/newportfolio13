import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const SERVICES = [
  'Website Development',
  'App Development',
  'WhatsApp AI Bot',
  'Call AI Agent',
  'SEO',
  'Digital Marketing',
  'Designing',
  'Offline Marketing',
  'Software Development',
  'Instagram Management',
  'Not sure yet',
]

const STORAGE_KEY = 'shidhu_lead_popup'
const DELAY_MS    = 30_000

export default function LeadPopup() {
  const [visible, setVisible]   = useState(false)
  const [name, setName]         = useState('')
  const [phone, setPhone]       = useState('')
  const [service, setService]   = useState('')
  const [status, setStatus]     = useState('idle') // idle | sending | done | error

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'submitted') return

    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setVisible(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:        name.trim(),
          phone:            phone.trim(),
          service_interest: service || 'Not specified',
          page_url:         window.location.href,
          submitted_at:     new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
        PUBLIC_KEY,
      )
      setStatus('done')
      localStorage.setItem(STORAGE_KEY, 'submitted')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Popup card */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[380px] z-[999]"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="bg-[#141414] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">

              {/* Header bar */}
              <div className="bg-gradient-to-r from-accent to-accent-light px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">👋</span>
                  <div>
                    <p className="font-body text-white font-semibold text-sm leading-tight">
                      Get a Free Strategy Call
                    </p>
                    <p className="font-body text-white/70 text-[11px]">
                      Shidhu will call you within 2 hours
                    </p>
                  </div>
                </div>
                <button
                  onClick={dismiss}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {status === 'done' ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-body text-white font-semibold text-base mb-1">You're all set!</p>
                    <p className="font-body text-gray-400 text-sm">
                      Shidhu will call you at <span className="text-white font-medium">{phone}</span> within 2 hours.
                    </p>
                    <button
                      onClick={dismiss}
                      className="mt-4 font-body text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <p className="font-body text-gray-400 text-xs leading-relaxed mb-1">
                      Drop your details and Shidhu will personally reach out to discuss your project — completely free.
                    </p>

                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Your name *"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 focus:border-accent/60 outline-none rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-gray-600 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone number *"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 focus:border-accent/60 outline-none rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-gray-600 transition-colors"
                      />
                    </div>

                    {/* Service interest */}
                    <div>
                      <select
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent/60 outline-none rounded-xl px-4 py-2.5 font-body text-sm text-gray-400 transition-colors appearance-none"
                        style={{ backgroundColor: '#1e1e1e' }}
                      >
                        <option value="">I'm interested in… (optional)</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {status === 'error' && (
                      <p className="font-body text-red-400 text-xs">
                        Something went wrong. Please WhatsApp directly at +91 9341784664.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-3 rounded-xl bg-accent hover:bg-accent-light text-white font-body font-semibold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
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
                        'Request Free Call →'
                      )}
                    </motion.button>

                    <p className="font-body text-gray-700 text-[10px] text-center">
                      No spam. Your details are only used to contact you about your project.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
