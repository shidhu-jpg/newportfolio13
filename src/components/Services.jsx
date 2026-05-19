import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

const SERVICES = [
  {
    num: '01', name: 'WEBSITE DEVELOPMENT', icon: '🌐',
    grad: 'from-cyan-400 to-blue-600', badge: 'Most Popular',
    desc: 'Fast, beautiful, mobile-first websites and landing pages engineered for conversions and built to scale.',
    plans: [
      {
        name: 'Starter', price: '₹7,999', monthly: false, delivery: '5 – 7 days', highlight: false,
        features: [
          '1-page landing site',
          'Mobile responsive design',
          'Contact form',
          'Basic on-page SEO',
          '15-day support',
          '2 revision rounds',
        ],
      },
      {
        name: 'Growth', price: '₹14,999', monthly: false, delivery: '7 – 14 days', highlight: true,
        features: [
          'Up to 5 pages',
          'Custom UI design',
          'Contact & enquiry forms',
          'Google Analytics setup',
          'Speed optimisation',
          '30-day support',
          'WhatsApp chat button',
          '5 revision rounds',
        ],
      },
      {
        name: 'Business', price: '₹29,999', monthly: false, delivery: '14 – 21 days', highlight: false,
        features: [
          'Up to 10 pages',
          'E-commerce / booking ready',
          'CMS (easy content editing)',
          'Advanced SEO setup',
          'Blog integration',
          'Payment gateway',
          '60-day support',
          'Unlimited revisions',
        ],
      },
    ],
  },
  {
    num: '02', name: 'APP DEVELOPMENT', icon: '📱',
    grad: 'from-violet-400 to-purple-700', badge: null,
    desc: 'Custom web and mobile applications tailored to your workflow, built with modern frameworks and clean architecture.',
    plans: [
      {
        name: 'Starter', price: '₹29,999', monthly: false, delivery: '20 – 30 days', highlight: false,
        features: [
          'Single platform (Android or iOS)',
          'Up to 6 screens',
          'User login & registration',
          'Basic UI/UX design',
          '30-day support',
          '3 revision rounds',
        ],
      },
      {
        name: 'Growth', price: '₹59,999', monthly: false, delivery: '30 – 50 days', highlight: true,
        features: [
          'Cross-platform (iOS + Android)',
          'Custom UI/UX design',
          'REST API integration',
          'Admin dashboard',
          'Push notifications',
          '60-day support',
          'App Store submission',
          'Unlimited revisions',
        ],
      },
      {
        name: 'Business', price: '₹1,19,999', monthly: false, delivery: '45 – 75 days', highlight: false,
        features: [
          'Full-featured cross-platform app',
          'Custom animations & micro-UX',
          'Payment gateway integration',
          'CRM / third-party integrations',
          'Real-time features (chat/live)',
          'Analytics dashboard',
          '90-day support',
          'Unlimited revisions',
        ],
      },
    ],
  },
  {
    num: '03', name: 'WHATSAPP AI AGENT / BOT', icon: '💬',
    grad: 'from-green-400 to-emerald-600', badge: 'High Demand',
    desc: 'Automate customer conversations, appointment bookings, and FAQs with intelligent, always-on WhatsApp bots.',
    plans: [
      {
        name: 'Starter', price: '₹9,999', monthly: false, delivery: '3 – 5 days', highlight: false,
        features: [
          'WhatsApp Business API setup',
          'Up to 10 conversation flows',
          'FAQ auto-responses',
          'Lead capture form',
          '15-day support',
        ],
      },
      {
        name: 'Growth', price: '₹18,999', monthly: false, delivery: '5 – 10 days', highlight: true,
        features: [
          'Up to 30 conversation flows',
          'Appointment booking automation',
          'Google Sheets / CRM sync',
          'Multi-language support',
          'Analytics dashboard',
          '30-day support',
          'Unlimited revisions',
        ],
      },
      {
        name: 'Business', price: '₹34,999', monthly: false, delivery: '10 – 15 days', highlight: false,
        features: [
          'Unlimited conversation flows',
          'AI-powered smart replies',
          'E-commerce / payment integration',
          'Custom CRM integration',
          'Advanced analytics & reports',
          'Broadcast campaigns',
          '60-day support',
        ],
      },
    ],
  },
  {
    num: '04', name: 'CALL AI AGENT / BOT', icon: '📞',
    grad: 'from-blue-400 to-indigo-600', badge: null,
    desc: 'AI-powered voice agents that handle inbound calls, qualify leads, and schedule appointments — 24/7.',
    plans: [
      {
        name: 'Starter', price: '₹14,999', monthly: false, delivery: '5 – 7 days', highlight: false,
        features: [
          'Basic IVR call handling',
          'Up to 5 call scripts',
          'Call recording',
          'Voicemail handling',
          '15-day support',
        ],
      },
      {
        name: 'Growth', price: '₹24,999', monthly: false, delivery: '7 – 14 days', highlight: true,
        features: [
          'AI voice agent (natural speech)',
          'Lead qualification scripts',
          'Appointment scheduling',
          'CRM integration',
          'Call transcripts & summaries',
          '30-day support',
          'Unlimited revisions',
        ],
      },
      {
        name: 'Business', price: '₹44,999', monthly: false, delivery: '14 – 20 days', highlight: false,
        features: [
          'Multi-department call routing',
          'Custom AI voice persona',
          'Real-time analytics dashboard',
          'SMS follow-up automation',
          'Escalation to human agent',
          'Priority support',
          '60-day support',
        ],
      },
    ],
  },
  {
    num: '05', name: 'OFFLINE MARKETING', icon: '🖨️',
    grad: 'from-amber-400 to-orange-500', badge: null,
    desc: 'Brochures, flyers, banners, and print collateral that reinforce your brand at every physical touchpoint.',
    plans: [
      {
        name: 'Starter', price: '₹1,999', monthly: false, delivery: '2 – 3 days', highlight: false,
        features: [
          'Business card design',
          '1 flyer / pamphlet',
          'Print-ready files (CMYK)',
          '2 revision rounds',
        ],
      },
      {
        name: 'Growth', price: '₹4,999', monthly: false, delivery: '3 – 5 days', highlight: true,
        features: [
          'Business card design',
          'Tri-fold brochure',
          '2 flyers / pamphlets',
          'Banner / hoarding design',
          'Print-ready files (CMYK)',
          'Unlimited revisions',
        ],
      },
      {
        name: 'Business', price: '₹9,999', monthly: false, delivery: '5 – 7 days', highlight: false,
        features: [
          'Full print suite (card, brochure, flyers)',
          'Standee & roller banner',
          'Letterhead & envelope',
          'Billboard / large format',
          'Source files included',
          'Unlimited revisions',
        ],
      },
    ],
  },
  {
    num: '06', name: 'DESIGNING', icon: '🎨',
    grad: 'from-pink-400 to-rose-600', badge: null,
    desc: 'UI/UX design, brand identity, logos, and visual content that instantly communicates trust and quality.',
    plans: [
      {
        name: 'Starter', price: '₹2,999', monthly: false, delivery: '3 – 5 days', highlight: false,
        features: [
          'Logo design (2 concepts)',
          'Color palette selection',
          'PNG & SVG export',
          '3 revision rounds',
        ],
      },
      {
        name: 'Growth', price: '₹5,999', monthly: false, delivery: '5 – 7 days', highlight: true,
        features: [
          'Logo design (3 concepts)',
          'Full brand identity kit',
          'Color palette & typography',
          '5 social media templates',
          'Business card design',
          'Unlimited revisions',
        ],
      },
      {
        name: 'Business', price: '₹12,999', monthly: false, delivery: '7 – 12 days', highlight: false,
        features: [
          'Logo + complete brand system',
          '10 social media templates',
          'Brand guidelines PDF',
          'UI/UX design (up to 5 screens)',
          'All vector source files',
          'Unlimited revisions',
        ],
      },
    ],
  },
  {
    num: '07', name: 'SEARCH ENGINE OPTIMISATION', icon: '🔍',
    grad: 'from-teal-400 to-cyan-600', badge: null,
    desc: 'Data-driven SEO strategies that rank your business higher on Google and drive consistent organic traffic.',
    plans: [
      {
        name: 'Starter', price: '₹4,999', monthly: true, delivery: 'Results in 3 – 4 months', highlight: false,
        features: [
          'Up to 10 keywords',
          'On-page SEO optimisation',
          'Google Business setup',
          'Monthly ranking report',
          'Basic link building',
        ],
      },
      {
        name: 'Growth', price: '₹8,999', monthly: true, delivery: 'Results in 2 – 4 months', highlight: true,
        features: [
          'Up to 25 keywords',
          'On-page + off-page SEO',
          'Technical SEO audit & fix',
          'Link building (10 backlinks)',
          'Competitor analysis',
          'Bi-weekly reports',
          'Content strategy',
        ],
      },
      {
        name: 'Business', price: '₹15,999', monthly: true, delivery: 'Results in 1 – 3 months', highlight: false,
        features: [
          'Up to 50 keywords',
          'Full SEO management',
          'Link building (25 backlinks)',
          '4 blog articles/month',
          'Schema markup',
          'Weekly reports',
          'Dedicated SEO manager',
        ],
      },
    ],
  },
  {
    num: '08', name: 'DIGITAL MARKETING', icon: '📈',
    grad: 'from-red-400 to-pink-600', badge: null,
    desc: 'Full-funnel marketing campaigns across Google, Meta, and Instagram that generate real, measurable leads.',
    plans: [
      {
        name: 'Starter', price: '₹6,999', monthly: true, delivery: 'Campaign live in 3 days', highlight: false,
        features: [
          '1 platform (Meta or Google)',
          'Up to ₹5K ad budget managed',
          '4 ad creatives/month',
          'Basic audience targeting',
          'Monthly performance report',
        ],
      },
      {
        name: 'Growth', price: '₹12,999', monthly: true, delivery: 'Campaign live in 2 days', highlight: true,
        features: [
          '2 platforms (Meta + Google)',
          'Up to ₹15K ad budget managed',
          '8 ad creatives/month',
          'A/B testing',
          'Retargeting campaigns',
          'Weekly performance reports',
          'Landing page optimisation',
        ],
      },
      {
        name: 'Business', price: '₹24,999', monthly: true, delivery: 'Campaign live in 1 day', highlight: false,
        features: [
          'All platforms (Meta, Google, Instagram)',
          'Up to ₹30K+ ad budget managed',
          '15+ ad creatives/month',
          'Daily monitoring & optimisation',
          'Full-funnel strategy',
          'ROI & lead tracking dashboard',
          'Dedicated account manager',
        ],
      },
    ],
  },
  {
    num: '09', name: 'SOFTWARE DEVELOPER', icon: '⚙️',
    grad: 'from-slate-400 to-gray-700', badge: null,
    desc: 'Custom tools, automations, and third-party integrations that eliminate repetitive work and streamline operations.',
    plans: [
      {
        name: 'Starter', price: '₹14,999', monthly: false, delivery: '7 – 14 days', highlight: false,
        features: [
          'Single custom tool or script',
          '1 third-party API integration',
          'Basic automation workflow',
          'Documentation',
          '30-day support',
        ],
      },
      {
        name: 'Growth', price: '₹29,999', monthly: false, delivery: '14 – 30 days', highlight: true,
        features: [
          'Custom web tool or dashboard',
          'Multiple API integrations',
          'Database design & setup',
          'Admin panel',
          'REST API development',
          '60-day support',
          'Full documentation',
        ],
      },
      {
        name: 'Business', price: '₹59,999', monthly: false, delivery: '30 – 60 days', highlight: false,
        features: [
          'Full custom software system',
          'Multiple modules',
          'Complex API & webhook integrations',
          'Cloud deployment (AWS / GCP)',
          'Role-based access control',
          'End-to-end documentation',
          '90-day support',
        ],
      },
    ],
  },
  {
    num: '10', name: 'INSTAGRAM MANAGEMENT', icon: '📸',
    grad: 'from-fuchsia-500 to-pink-500', badge: null,
    desc: 'We manage your Instagram so you can focus on running your business. You provide the photos/videos — we handle everything else.',
    note: 'Client provides photos/videos. Ad budget is managed separately and not included in monthly pricing.',
    plans: [
      {
        name: 'Basic', price: '₹1,499', monthly: true, delivery: 'Just ₹50/day', highlight: false,
        features: [
          '8 posts/month',
          '4 stories/month',
          'Captions & hashtags written for you',
          'Scheduled uploading',
          'Ad budget managed separately',
        ],
      },
      {
        name: 'Standard', price: '₹2,999', monthly: true, delivery: 'Best value — 2× the work', highlight: true, highlightLabel: 'Most Popular',
        features: [
          '15 posts/month',
          '10 stories/month',
          'Captions & hashtags written for you',
          'Scheduled uploading',
          'Comment replies (weekdays)',
          'Ad budget managed separately',
        ],
      },
      {
        name: 'Pro', price: '₹4,999', originalPrice: '₹5,999', savingsBadge: 'Save ₹1,000', monthly: true, delivery: 'Full management, zero stress', highlight: false,
        features: [
          '20 posts/month',
          'Unlimited stories',
          'Captions & hashtags written for you',
          'Scheduled uploading',
          'DM + comment management (daily)',
          'Monthly performance report',
          'Monthly strategy call',
          'Ad budget managed separately',
        ],
      },
    ],
  },
]

function ServiceIcon({ icon, grad, index }) {
  const ref   = useRef(null)
  const mx    = useMotionValue(0)
  const my    = useMotionValue(0)
  const rotX  = useTransform(my, [-20, 20], [18, -18])
  const rotY  = useTransform(mx, [-20, 20], [-18, 18])
  const sRotX = useSpring(rotX, { stiffness: 260, damping: 20 })
  const sRotY = useSpring(rotY, { stiffness: 260, damping: 20 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - (r.left + r.width  / 2))
    my.set(e.clientY - (r.top  + r.height / 2))
  }
  function onLeave() { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d', perspective: 500 }}
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.55, type: 'spring', stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.12 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="flex-shrink-0 cursor-pointer"
    >
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center border border-white/20`}
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.22)' }}
      >
        <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{icon}</span>
      </div>
    </motion.div>
  )
}

function PlanCard({ plan, serviceName }) {
  const waMsg = encodeURIComponent(
    `Hi Shidhu! I'm interested in your ${serviceName} service – ${plan.name} plan (${plan.price}${plan.monthly ? '/mo' : ''}). Can we connect?`
  )
  const waUrl = `https://wa.me/919341784664?text=${waMsg}`

  return (
    <motion.div
      className={`relative flex flex-col rounded-2xl border p-5 gap-4 ${
        plan.highlight
          ? 'border-accent/60 bg-accent/[0.08]'
          : 'border-white/10 bg-white/[0.03]'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-[10px] font-semibold tracking-widest uppercase bg-accent text-white px-3 py-1 rounded-full shadow-lg shadow-accent/30">
          {plan.highlightLabel ?? 'Recommended'}
        </span>
      )}

      {/* Plan name */}
      <div>
        <p className={`font-body text-xs font-semibold tracking-widest uppercase mb-2 ${plan.highlight ? 'text-accent' : 'text-gray-500'}`}>
          {plan.name}
        </p>
        <div className="flex items-end gap-2 flex-wrap">
          <span className="font-display text-white" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)' }}>
            {plan.price}
          </span>
          {plan.originalPrice && (
            <span className="font-body text-gray-600 text-sm line-through mb-1">{plan.originalPrice}</span>
          )}
          {plan.monthly && (
            <span className="font-body text-gray-500 text-sm mb-1">/mo</span>
          )}
          {plan.savingsBadge && (
            <span className="font-body text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 mb-1">
              {plan.savingsBadge}
            </span>
          )}
        </div>
        <p className="font-body text-gray-600 text-[11px] mt-1 flex items-center gap-1.5">
          <svg className="w-3 h-3 text-accent/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {plan.delivery}
        </p>
      </div>

      {/* Divider */}
      <div className={`h-px ${plan.highlight ? 'bg-accent/20' : 'bg-white/8'}`} />

      {/* Features */}
      <ul className="flex flex-col gap-2 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2">
            <svg className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-accent' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body text-gray-300 text-xs leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto w-full text-center py-2.5 rounded-full font-body font-semibold text-xs tracking-wider transition-colors duration-200 inline-flex items-center justify-center gap-1.5 ${
          plan.highlight
            ? 'bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-light'
            : 'border border-white/15 text-gray-300 hover:border-white/35 hover:text-white'
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.16 }}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        GET STARTED
      </motion.a>
    </motion.div>
  )
}

export default function Services() {
  const [open, setOpen] = useState(null)
  const toggle = (num) => setOpen(prev => prev === num ? null : num)

  return (
    <section id="services" className="bg-dark px-6 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-display text-white leading-none pt-4 pb-14"
          style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          SERVICES
        </motion.h2>

        <div>
          {SERVICES.map((s, i) => {
            const isOpen = open === s.num
            return (
              <motion.div
                key={s.num}
                className="border-b border-white/10"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.055, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Row header */}
                <button
                  onClick={() => toggle(s.num)}
                  className="w-full text-left grid grid-cols-[56px_1fr_36px] md:grid-cols-[72px_1fr_44px] gap-5 md:gap-8 py-7 items-center cursor-pointer"
                >
                  <ServiceIcon icon={s.icon} grad={s.grad} index={i} />

                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className="font-display text-accent/50 text-sm">{s.num}</span>
                      <h3
                        className={`font-display leading-none transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-white'}`}
                        style={{ fontSize: 'clamp(20px, 2.8vw, 32px)' }}
                      >
                        {s.name}
                      </h3>
                      {s.badge && (
                        <span className="font-body text-[10px] font-semibold tracking-widest uppercase bg-accent/20 text-accent px-2.5 py-1 rounded-full border border-accent/30">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-body text-gray-500 text-sm leading-relaxed max-w-xl">
                      {s.desc}
                    </p>
                  </div>

                  {/* + / × toggle */}
                  <motion.div
                    className={`flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border flex items-center justify-center ${isOpen ? 'border-accent/50 text-accent' : 'border-white/15 text-gray-500'}`}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </button>

                {/* Expanded pricing tiers */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pb-10 pt-2 pl-0 md:pl-[calc(72px+2rem)]">
                        <p className="font-body text-xs tracking-widest uppercase text-gray-600 mb-5">
                          Choose your plan
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {s.plans.map(plan => (
                            <PlanCard key={plan.name} plan={plan} serviceName={s.name} />
                          ))}
                        </div>
                        {s.note ? (
                          <p className="font-body text-gray-700 text-xs mt-5">
                            * {s.note} <a href="#contact" className="text-accent hover:underline">Contact for custom requirements →</a>
                          </p>
                        ) : (
                          <p className="font-body text-gray-700 text-xs mt-5">
                            * All prices are starting rates. Final quote depends on project scope. <a href="#contact" className="text-accent hover:underline">Contact for custom requirements →</a>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
