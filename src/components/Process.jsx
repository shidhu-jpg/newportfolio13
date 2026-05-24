import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    icon: '📞',
    title: 'Free Discovery Call',
    desc: 'We talk about your business, goals, timeline, and budget. No pressure, no pitch — just a real conversation so I understand exactly what you need.',
    grad: 'from-violet-500 to-purple-700',
  },
  {
    num: '02',
    icon: '📋',
    title: 'Strategy & Proposal',
    desc: 'Within 24 hours you receive a clear scope document, fixed price, and delivery timeline. No hidden fees, no moving goalposts.',
    grad: 'from-cyan-500 to-blue-600',
  },
  {
    num: '03',
    icon: '🎨',
    title: 'Design & Build',
    desc: 'You sit back while I design, develop, and keep you updated at every milestone. You\'ll always know exactly where your project stands.',
    grad: 'from-pink-500 to-rose-600',
  },
  {
    num: '04',
    icon: '✅',
    title: 'Review & Refine',
    desc: 'You review the work. I revise until every single detail is exactly right. Unlimited revisions are included in Growth and Business plans.',
    grad: 'from-emerald-500 to-teal-600',
  },
  {
    num: '05',
    icon: '🚀',
    title: 'Launch & Support',
    desc: 'We go live together. Post-launch support is included in every plan so you\'re never left figuring things out alone after delivery.',
    grad: 'from-amber-500 to-orange-600',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-dark px-6 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-xs font-medium tracking-[0.25em] text-accent uppercase mb-4">
            Simple. Transparent. Fast.
          </p>
          <h2
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
          >
            HOW IT<br />WORKS
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line — desktop only */}
          <div className="hidden lg:block absolute left-[28px] top-10 bottom-10 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative grid grid-cols-1 lg:grid-cols-[72px_1fr] gap-6 lg:gap-10 py-10 border-b border-white/8 last:border-b-0 group"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Icon orb */}
                <div className="flex-shrink-0">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.grad} flex items-center justify-center border border-white/15 relative z-10`}
                    style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)' }}
                    whileHover={{ scale: 1.1, rotate: 4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{step.icon}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-accent/40 text-sm">{step.num}</span>
                    <h3
                      className="font-display text-white leading-none group-hover:text-accent transition-colors duration-300"
                      style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-body text-gray-500 text-sm leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.025]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex-1">
            <p className="font-display text-white text-2xl md:text-3xl leading-tight mb-1">
              Ready to start?
            </p>
            <p className="font-body text-gray-500 text-sm">
              Step 1 is a free call. No commitment required — just a conversation.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-accent hover:bg-accent-light text-white font-body font-semibold text-sm transition-colors duration-200 shadow-lg shadow-accent/25"
          >
            Book Free Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
