import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import heroImg from '../../images/hero.png'

const DESCRIPTION = "Mumbai-based developer & digital growth specialist. I build high-converting websites, AI-powered bots, and complete digital systems that help businesses grow and stand out online."

function useTypewriter(text, speed = 28, startDelay = 1100) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayed, done }
}

const SERVICES = [
  { icon: '🌐', label: 'Website Development' },
  { icon: '📱', label: 'App Development' },
  { icon: '💬', label: 'WhatsApp AI Bot' },
  { icon: '📞', label: 'Call AI Agent' },
  { icon: '🔍', label: 'SEO' },
  { icon: '📈', label: 'Digital Marketing' },
  { icon: '🎨', label: 'Designing' },
  { icon: '🖨️', label: 'Offline Marketing' },
  { icon: '⚙️', label: 'Software Dev' },
]

const WORK_STRIP = [
  { bg: 'bg-gradient-to-br from-violet-500 to-purple-700', label: 'Branding', icon: '✦' },
  { bg: 'bg-gradient-to-br from-sky-400 to-cyan-600', label: 'Web Design', icon: '🌐' },
  { bg: 'bg-gradient-to-br from-rose-400 to-pink-600', label: 'UI/UX', icon: '🎨' },
  { bg: 'bg-gradient-to-br from-emerald-400 to-teal-600', label: 'Marketing', icon: '📈' },
  { bg: 'bg-gradient-to-br from-amber-400 to-orange-500', label: 'SEO', icon: '🔍' },
  { bg: 'bg-gradient-to-br from-indigo-400 to-blue-700', label: 'App Dev', icon: '⚙️' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ isDark }) {
  const sectionBg    = isDark ? 'bg-[#111111]' : 'bg-white'
  const headingColor = isDark ? 'text-white'   : 'text-dark'
  const paraColor    = isDark ? 'text-gray-400' : 'text-gray-500'
  const { displayed, done } = useTypewriter(DESCRIPTION)

  return (
    <>
      <section
        id="home"
        className={`relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center transition-colors duration-300 ${sectionBg}`}
      >
        {/* Animated background orbs */}
        <motion.div
          className="pointer-events-none absolute -right-20 top-1/4 w-[52vw] h-[52vw] max-w-[620px] max-h-[620px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.14, 1], x: [0, 25, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute left-0 bottom-0 w-[36vw] h-[36vw] max-w-[420px] max-h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], y: [0, -18, 0], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/3 top-0 w-[22vw] h-[22vw] max-w-[260px] max-h-[260px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.22, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

          {/* Left — text content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.p
              variants={itemVariants}
              className="font-body text-xs tracking-[0.25em] text-gray-400 uppercase mb-5"
            >
              Full-Stack Developer &amp; Designer
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className={`font-display leading-none mb-5 ${headingColor}`}
              style={{ fontSize: 'clamp(64px, 11vw, 160px)' }}
            >
              HI, I'M<br />
              <span className="text-accent">SHIDHU</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`font-body text-base md:text-lg max-w-md leading-relaxed mb-6 ${paraColor}`}
            >
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-accent align-middle ml-0.5 animate-[blink_0.75s_step-end_infinite]" />
              )}
            </motion.p>

            {/* Services offered */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {SERVICES.map(s => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 font-body text-xs text-gray-300 hover:bg-accent/20 transition-colors duration-200"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-white font-body font-medium text-sm shadow-lg shadow-accent/25"
                whileHover={{ scale: 1.06, boxShadow: '0 20px 40px rgba(124,58,237,0.35)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                CONTACT ME
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            className="relative flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow behind image */}
              <div
                className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, transparent 70%)' }}
              />

              <motion.div
                className="relative rounded-3xl overflow-hidden"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 32px 80px rgba(124,58,237,0.22), 0 8px 32px rgba(0,0,0,0.35)' }}
              >
                <img
                  src={heroImg}
                  alt="Shidhu — Developer & Designer"
                  className="w-80 sm:w-[380px] lg:w-[420px] object-cover rounded-3xl"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/15 via-transparent to-transparent rounded-3xl" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Work strip */}
      <div className="grid grid-cols-3 md:grid-cols-6">
        {WORK_STRIP.map((item, i) => (
          <motion.div
            key={item.label}
            className={`${item.bg} aspect-square relative group overflow-hidden cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.04, zIndex: 10 }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex flex-col items-center justify-center gap-2 p-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-body text-xs font-semibold text-white/80 tracking-widest uppercase">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}
