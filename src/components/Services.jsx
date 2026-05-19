import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

// Deadline = end of current month
function getDeadline() {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  return end.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
const DEADLINE = getDeadline()

const SERVICES = [
  {
    num: '01', name: 'WEBSITE DEVELOPMENT', icon: '🌐',
    grad: 'from-cyan-400 to-blue-600', badge: 'Most Popular',
    spotsLeft: 3,
    desc: 'Get a lead-generating website live in 7 days — designed to convert visitors into paying customers while you sleep.',
    guarantee: '100% satisfaction guarantee — unlimited revisions until you love it, or your money back. No questions asked.',
    plans: [
      {
        name: 'Starter', price: '₹7,999', monthly: false, delivery: 'Live in 5 – 7 days', highlight: false,
        valueStatement: 'Worth ₹25,000+ at any agency',
        features: [
          '1-page high-converting landing site',
          'Mobile-first responsive design',
          'Contact & WhatsApp enquiry form',
          'Basic on-page SEO',
          '15-day priority support',
          '2 revision rounds',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹14,999', monthly: false, delivery: 'Live in 7 – 14 days', highlight: true,
        valueStatement: 'Worth ₹60,000+ at any agency',
        features: [
          'Up to 5 custom-designed pages',
          'Premium UI design (yours, not a template)',
          'Contact & enquiry forms',
          'Google Analytics setup',
          'Speed & performance optimisation',
          '30-day priority support',
          'WhatsApp floating chat button',
          '5 revision rounds',
        ],
        bonuses: [
          'FREE SEO audit report (₹4,999 value)',
          'FREE Google Business Profile setup',
          'FREE 30-day post-launch check-in call',
        ],
        urgency: `Offer expires ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹29,999', monthly: false, delivery: 'Live in 14 – 21 days', highlight: false,
        valueStatement: 'Worth ₹1,20,000+ at any agency',
        features: [
          'Up to 10 custom pages',
          'E-commerce or booking system ready',
          'CMS — edit content yourself, anytime',
          'Advanced SEO setup',
          'Blog integration',
          'Payment gateway integration',
          '60-day priority support',
          'Unlimited revisions',
        ],
        bonuses: [
          'FREE full SEO audit (₹9,999 value)',
          'FREE Google Ads account setup (₹5,999 value)',
          'FREE 3-month analytics review calls',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '02', name: 'APP DEVELOPMENT', icon: '📱',
    grad: 'from-violet-400 to-purple-700', badge: null,
    spotsLeft: 2,
    desc: 'Launch your custom app and start generating revenue — without hiring an expensive in-house team or waiting months.',
    guarantee: 'If your app doesn\'t work exactly as agreed, we fix it for free. Every time.',
    plans: [
      {
        name: 'Starter', price: '₹29,999', monthly: false, delivery: 'Live in 20 – 30 days', highlight: false,
        valueStatement: 'Worth ₹1,00,000+ with a dev agency',
        features: [
          'Single platform (Android or iOS)',
          'Up to 6 screens',
          'User login & registration',
          'Clean, custom UI/UX design',
          '30-day support',
          '3 revision rounds',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹59,999', monthly: false, delivery: 'Live in 30 – 50 days', highlight: true,
        valueStatement: 'Worth ₹2,50,000+ with a dev agency',
        features: [
          'Cross-platform (iOS + Android)',
          'Custom UI/UX design',
          'REST API integration',
          'Admin dashboard included',
          'Push notifications',
          '60-day support',
          'App Store & Play Store submission',
          'Unlimited revisions',
        ],
        bonuses: [
          'FREE 6-month bug-fix warranty',
          'FREE app store optimisation (ASO)',
          'FREE post-launch strategy call',
        ],
        urgency: `Only 2 spots left — offer closes ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹1,19,999', monthly: false, delivery: 'Live in 45 – 75 days', highlight: false,
        valueStatement: 'Worth ₹5,00,000+ with a dev agency',
        features: [
          'Full-featured cross-platform app',
          'Custom animations & micro-UX',
          'Payment gateway integration',
          'CRM & third-party integrations',
          'Real-time features (chat / live)',
          'Analytics dashboard',
          '90-day support',
          'Unlimited revisions',
        ],
        bonuses: [
          'FREE 12-month bug-fix warranty',
          'FREE ASO + launch strategy',
          'FREE dedicated project manager',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '03', name: 'WHATSAPP AI AGENT / BOT', icon: '💬',
    grad: 'from-green-400 to-emerald-600', badge: 'High Demand',
    spotsLeft: 5,
    desc: 'Never miss a customer enquiry again. Your AI bot works 24/7 — capturing leads, answering questions, and booking appointments while you\'re off.',
    guarantee: 'If your bot doesn\'t handle every agreed flow perfectly, we rebuild it for free.',
    plans: [
      {
        name: 'Starter', price: '₹9,999', monthly: false, delivery: 'Live in 3 – 5 days', highlight: false,
        valueStatement: 'Replaces a ₹15,000/mo receptionist',
        features: [
          'WhatsApp Business API setup',
          'Up to 10 conversation flows',
          'FAQ auto-responses',
          'Lead capture & storage',
          '15-day support',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹18,999', monthly: false, delivery: 'Live in 5 – 10 days', highlight: true,
        valueStatement: 'Replaces a ₹30,000/mo support team',
        features: [
          'Up to 30 conversation flows',
          'Appointment booking automation',
          'Google Sheets / CRM sync',
          'Multi-language support',
          'Analytics dashboard',
          '30-day support',
          'Unlimited flow revisions',
        ],
        bonuses: [
          'FREE WhatsApp broadcast template setup',
          'FREE lead sheet integration',
          'FREE 30-day performance review call',
        ],
        urgency: `Price increases after ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹34,999', monthly: false, delivery: 'Live in 10 – 15 days', highlight: false,
        valueStatement: 'Replaces a ₹60,000/mo support team',
        features: [
          'Unlimited conversation flows',
          'AI-powered smart replies',
          'E-commerce & payment integration',
          'Custom CRM integration',
          'Advanced analytics & reports',
          'Broadcast campaign management',
          '60-day support',
        ],
        bonuses: [
          'FREE broadcast campaign strategy',
          'FREE CRM data migration',
          'FREE quarterly performance audits',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '04', name: 'CALL AI AGENT / BOT', icon: '📞',
    grad: 'from-blue-400 to-indigo-600', badge: null,
    spotsLeft: 4,
    desc: 'Your AI receptionist answers every call, qualifies every lead, and books every appointment — 24/7, zero salary, zero sick days.',
    guarantee: 'If the AI misses a single agreed script point, we fix it in 24 hours, guaranteed.',
    plans: [
      {
        name: 'Starter', price: '₹14,999', monthly: false, delivery: 'Live in 5 – 7 days', highlight: false,
        valueStatement: 'Saves ₹20,000/mo in receptionist costs',
        features: [
          'Basic IVR call handling',
          'Up to 5 call scripts',
          'Call recording & storage',
          'Voicemail handling',
          '15-day support',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹24,999', monthly: false, delivery: 'Live in 7 – 14 days', highlight: true,
        valueStatement: 'Saves ₹40,000/mo in staffing costs',
        features: [
          'AI voice agent (natural-sounding speech)',
          'Lead qualification scripts',
          'Automated appointment scheduling',
          'CRM integration',
          'Call transcripts & summaries',
          '30-day support',
          'Unlimited script revisions',
        ],
        bonuses: [
          'FREE lead qualification script writing',
          'FREE CRM pipeline setup',
          'FREE 30-day call analytics review',
        ],
        urgency: `Only 4 spots left this month — closes ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹44,999', monthly: false, delivery: 'Live in 14 – 20 days', highlight: false,
        valueStatement: 'Saves ₹80,000/mo in staffing costs',
        features: [
          'Multi-department call routing',
          'Custom AI voice persona',
          'Real-time analytics dashboard',
          'SMS follow-up automation',
          'Escalation to human agent',
          'Priority support',
          '60-day support',
        ],
        bonuses: [
          'FREE custom AI persona design',
          'FREE SMS automation setup (₹8,999 value)',
          'FREE quarterly script optimisation',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '05', name: 'OFFLINE MARKETING', icon: '🖨️',
    grad: 'from-amber-400 to-orange-500', badge: null,
    spotsLeft: 8,
    desc: 'Professional print materials that make your brand impossible to forget — and turn every flyer, card, and banner into a silent salesperson.',
    guarantee: 'Not happy with the design? We redo it until you are — free of charge.',
    plans: [
      {
        name: 'Starter', price: '₹1,999', monthly: false, delivery: 'Ready in 2 – 3 days', highlight: false,
        valueStatement: 'Worth ₹8,000+ at a print studio',
        features: [
          'Business card design',
          '1 flyer / pamphlet design',
          'Print-ready CMYK files',
          '2 revision rounds',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹4,999', monthly: false, delivery: 'Ready in 3 – 5 days', highlight: true,
        valueStatement: 'Worth ₹20,000+ at a print studio',
        features: [
          'Business card design',
          'Tri-fold brochure',
          '2 flyers / pamphlets',
          'Banner / hoarding design',
          'Print-ready CMYK files',
          'Unlimited revisions',
        ],
        bonuses: [
          'FREE brand colour palette guide',
          'FREE print vendor recommendations',
          'FREE social media post version of flyer',
        ],
        urgency: `Offer valid until ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹9,999', monthly: false, delivery: 'Ready in 5 – 7 days', highlight: false,
        valueStatement: 'Worth ₹40,000+ at a print studio',
        features: [
          'Full print suite (card, brochure, flyers)',
          'Standee & roller banner',
          'Letterhead & envelope design',
          'Billboard / large format design',
          'All source files included',
          'Unlimited revisions',
        ],
        bonuses: [
          'FREE full brand style guide PDF',
          'FREE social media graphics set (5 posts)',
          'FREE print vendor sourcing assistance',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '06', name: 'DESIGNING', icon: '🎨',
    grad: 'from-pink-400 to-rose-600', badge: null,
    spotsLeft: 6,
    desc: 'A brand identity so sharp that customers trust you before you say a word — and choose you over every competitor on the shelf.',
    guarantee: 'You will love your logo and brand — or we redesign it completely, free of charge.',
    plans: [
      {
        name: 'Starter', price: '₹2,999', monthly: false, delivery: 'Ready in 3 – 5 days', highlight: false,
        valueStatement: 'Worth ₹12,000+ at a design studio',
        features: [
          'Logo design — 2 unique concepts',
          'Curated colour palette',
          'PNG & SVG export files',
          '3 revision rounds',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹5,999', monthly: false, delivery: 'Ready in 5 – 7 days', highlight: true,
        valueStatement: 'Worth ₹25,000+ at a design studio',
        features: [
          'Logo design — 3 unique concepts',
          'Full brand identity kit',
          'Colour palette & typography system',
          '5 social media templates',
          'Business card design',
          'Unlimited revisions',
        ],
        bonuses: [
          'FREE brand usage guidelines PDF',
          'FREE 2 extra social media templates',
          'FREE favicon & app icon version',
        ],
        urgency: `Offer expires ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹12,999', monthly: false, delivery: 'Ready in 7 – 12 days', highlight: false,
        valueStatement: 'Worth ₹55,000+ at a design studio',
        features: [
          'Logo + complete brand identity system',
          '10 custom social media templates',
          'Brand guidelines PDF',
          'UI/UX design for up to 5 screens',
          'All vector source files included',
          'Unlimited revisions',
        ],
        bonuses: [
          'FREE brand presentation deck',
          'FREE 5 animated social media posts',
          'FREE 1-hour brand strategy call',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '07', name: 'SEARCH ENGINE OPTIMISATION', icon: '🔍',
    grad: 'from-teal-400 to-cyan-600', badge: null,
    spotsLeft: 4,
    desc: 'Rank on page 1 of Google and get a steady stream of free, qualified leads every month — without spending a single rupee on ads.',
    guarantee: 'If you don\'t see measurable ranking improvement in 90 days, the next month is on us — free.',
    plans: [
      {
        name: 'Starter', price: '₹4,999', monthly: true, delivery: 'First results in 3 – 4 months', highlight: false,
        valueStatement: 'One new customer pays for 6 months',
        features: [
          'Up to 10 target keywords',
          'On-page SEO optimisation',
          'Google Business Profile setup',
          'Monthly ranking report',
          'Basic link building',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹8,999', monthly: true, delivery: 'First results in 2 – 4 months', highlight: true,
        valueStatement: 'One new customer pays for 3 months',
        features: [
          'Up to 25 target keywords',
          'On-page + off-page SEO',
          'Technical SEO audit & fixes',
          'Link building (10 backlinks/month)',
          'Competitor keyword analysis',
          'Bi-weekly progress reports',
          'Content strategy roadmap',
        ],
        bonuses: [
          'FREE technical SEO audit (₹7,999 value)',
          'FREE Google Business optimisation',
          'FREE competitor gap analysis report',
        ],
        urgency: `Lock in this rate before ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹15,999', monthly: true, delivery: 'First results in 1 – 3 months', highlight: false,
        valueStatement: 'Replaces ₹30,000+/mo in ad spend',
        features: [
          'Up to 50 target keywords',
          'Full SEO management',
          'Link building (25 backlinks/month)',
          '4 blog articles written & published/month',
          'Schema markup implementation',
          'Weekly detailed reports',
          'Dedicated SEO manager',
        ],
        bonuses: [
          'FREE full-site content audit',
          'FREE monthly strategy call with your SEO manager',
          'FREE local SEO setup (Google Maps ranking)',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '08', name: 'DIGITAL MARKETING', icon: '📈',
    grad: 'from-red-400 to-pink-600', badge: null,
    spotsLeft: 3,
    desc: 'Get a predictable flow of qualified leads from Google and Meta every single month — with a clear ROI you can track to the rupee.',
    guarantee: 'If your campaign doesn\'t generate leads in the first 30 days, we run the next month free.',
    plans: [
      {
        name: 'Starter', price: '₹6,999', monthly: true, delivery: 'Campaign live in 3 days', highlight: false,
        valueStatement: 'Turn ₹5K ad spend into ₹25K+ revenue',
        features: [
          '1 platform (Meta or Google)',
          'Up to ₹5K ad budget managed',
          '4 ad creatives per month',
          'Targeted audience setup',
          'Monthly performance report',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹12,999', monthly: true, delivery: 'Campaign live in 2 days', highlight: true,
        valueStatement: 'Turn ₹15K ad spend into ₹75K+ revenue',
        features: [
          '2 platforms (Meta + Google)',
          'Up to ₹15K ad budget managed',
          '8 ad creatives per month',
          'A/B split testing',
          'Retargeting campaigns',
          'Weekly performance reports',
          'Landing page conversion optimisation',
        ],
        bonuses: [
          'FREE ad account audit (₹6,999 value)',
          'FREE retargeting audience build',
          'FREE monthly strategy call',
        ],
        urgency: `Only 3 spots left — closes ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹24,999', monthly: true, delivery: 'Campaign live in 1 day', highlight: false,
        valueStatement: 'Turn ₹30K ad spend into ₹1.5L+ revenue',
        features: [
          'All platforms (Meta, Google, Instagram)',
          'Up to ₹30K+ ad budget managed',
          '15+ ad creatives per month',
          'Daily monitoring & optimisation',
          'Full-funnel ad strategy',
          'ROI & lead tracking dashboard',
          'Dedicated account manager',
        ],
        bonuses: [
          'FREE full-funnel strategy build (₹15,000 value)',
          'FREE CRM lead pipeline setup',
          'FREE weekly 1-on-1 performance calls',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '09', name: 'SOFTWARE DEVELOPER', icon: '⚙️',
    grad: 'from-slate-400 to-gray-700', badge: null,
    spotsLeft: 2,
    desc: 'Automate the repetitive work draining your team\'s time — and reclaim hours every day with custom tools built for your exact workflow.',
    guarantee: 'Your tool works exactly as agreed — or we keep building until it does, at no extra charge.',
    plans: [
      {
        name: 'Starter', price: '₹14,999', monthly: false, delivery: 'Ready in 7 – 14 days', highlight: false,
        valueStatement: 'Saves 20+ hours of manual work per month',
        features: [
          'Single custom tool or script',
          '1 third-party API integration',
          'Basic automation workflow',
          'Full code documentation',
          '30-day support',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Growth', price: '₹29,999', monthly: false, delivery: 'Ready in 14 – 30 days', highlight: true,
        valueStatement: 'Saves 60+ hours of manual work per month',
        features: [
          'Custom web tool or dashboard',
          'Multiple API integrations',
          'Database design & setup',
          'Admin panel included',
          'REST API development',
          '60-day support',
          'Full documentation & handover',
        ],
        bonuses: [
          'FREE workflow audit & optimisation report',
          'FREE team onboarding session',
          'FREE 30-day post-delivery support extension',
        ],
        urgency: `Only 2 spots left this month — closes ${DEADLINE}`,
      },
      {
        name: 'Business', price: '₹59,999', monthly: false, delivery: 'Ready in 30 – 60 days', highlight: false,
        valueStatement: 'Saves 200+ hours of manual work per month',
        features: [
          'Full custom software system',
          'Multiple modules & features',
          'Complex API & webhook integrations',
          'Cloud deployment (AWS / GCP)',
          'Role-based access control',
          'End-to-end documentation',
          '90-day support',
        ],
        bonuses: [
          'FREE cloud infrastructure setup (₹12,000 value)',
          'FREE staff training sessions',
          'FREE 6-month maintenance package',
        ],
        urgency: null,
      },
    ],
  },
  {
    num: '10', name: 'INSTAGRAM MANAGEMENT', icon: '📸',
    grad: 'from-fuchsia-500 to-pink-500', badge: null,
    spotsLeft: 5,
    desc: 'A professionally managed Instagram that builds your brand and attracts customers every day — without you lifting a finger.',
    note: 'Client provides photos/videos. Ad budget is managed separately and not included in monthly pricing.',
    guarantee: 'Consistent, on-brand posting every month — or we credit the missed posts to the next month, free.',
    plans: [
      {
        name: 'Basic', price: '₹1,499', monthly: true, delivery: 'Just ₹50/day', highlight: false,
        valueStatement: 'Less than a daily chai for a full month of content',
        features: [
          '8 posts per month',
          '4 stories per month',
          'Captions & hashtags written for you',
          'Scheduled & auto-uploaded',
          'Ad budget managed separately',
        ],
        bonuses: [],
        urgency: null,
      },
      {
        name: 'Standard', price: '₹2,999', originalPrice: '₹5,999', savingsBadge: 'Save ₹3,000', monthly: true, delivery: 'Best value — 2× the content', highlight: true, highlightLabel: 'Most Popular',
        valueStatement: 'Hire a social media manager for ₹100/day',
        features: [
          '15 posts per month',
          '10 stories per month',
          'Captions & hashtags written for you',
          'Scheduled & auto-uploaded',
          'Comment replies (weekdays)',
          'Ad budget managed separately',
        ],
        bonuses: [
          'FREE content calendar every month',
          'FREE hashtag research & strategy',
          'FREE monthly engagement report',
        ],
        urgency: `Introductory price — increases after ${DEADLINE}`,
      },
      {
        name: 'Pro', price: '₹4,999', originalPrice: '₹7,999', savingsBadge: 'Save ₹3,000', monthly: true, delivery: 'Full management, zero stress', highlight: false,
        valueStatement: 'Full social media team for ₹167/day',
        features: [
          '20 posts per month',
          'Unlimited stories',
          'Captions & hashtags written for you',
          'Scheduled & auto-uploaded',
          'DM + comment management (daily)',
          'Monthly performance report',
          'Monthly strategy call',
          'Ad budget managed separately',
        ],
        bonuses: [
          'FREE reel script writing (2/month)',
          'FREE competitor analysis report',
          'FREE monthly 1-on-1 strategy call',
        ],
        urgency: null,
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

      {/* Plan name + price */}
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

        {/* Value anchor */}
        {plan.valueStatement && (
          <p className="font-body text-[11px] text-emerald-500/80 mt-1 flex items-center gap-1">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {plan.valueStatement}
          </p>
        )}

        <p className="font-body text-gray-600 text-[11px] mt-1.5 flex items-center gap-1.5">
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

      {/* Bonuses */}
      {plan.bonuses && plan.bonuses.length > 0 && (
        <>
          <div className={`h-px ${plan.highlight ? 'bg-accent/20' : 'bg-white/8'}`} />
          <div>
            <p className="font-body text-[10px] font-semibold tracking-widest uppercase text-amber-400 mb-2">
              🎁 Included Free
            </p>
            <ul className="flex flex-col gap-1.5">
              {plan.bonuses.map(b => (
                <li key={b} className="flex items-start gap-2">
                  <svg className="w-3 h-3 flex-shrink-0 mt-0.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-body text-amber-300/80 text-xs leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Urgency / Deadline */}
      {plan.urgency && (
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
          <svg className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-body text-orange-400 text-[11px] font-medium">{plan.urgency}</span>
        </div>
      )}

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
        CLAIM THIS OFFER
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
          className="font-display text-white leading-none pt-4 pb-6"
          style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          SERVICES
        </motion.h2>

        {/* Urgency banner */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-orange-500/10 border border-orange-500/25 rounded-2xl px-5 py-4 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">⚡</span>
            <div>
              <p className="font-body text-sm font-semibold text-orange-300">
                Limited client spots available this month
              </p>
              <p className="font-body text-xs text-orange-400/70 mt-0.5">
                All offers and introductory prices expire on <span className="font-semibold text-orange-300">{DEADLINE}</span>. Book now to lock in your rate.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="font-body text-xs font-semibold text-orange-300">Spots filling fast</span>
          </div>
        </motion.div>

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
                      {s.spotsLeft <= 3 && (
                        <span className="font-body text-[10px] font-semibold tracking-widest uppercase bg-orange-500/15 text-orange-400 px-2.5 py-1 rounded-full border border-orange-500/25 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                          {s.spotsLeft} spot{s.spotsLeft !== 1 ? 's' : ''} left
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

                        {/* Guarantee */}
                        <div className="mt-6 flex items-start gap-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-4 py-3">
                          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <div>
                            <p className="font-body text-xs font-semibold text-emerald-400 mb-0.5">Guarantee</p>
                            <p className="font-body text-xs text-gray-400 leading-relaxed">{s.guarantee}</p>
                          </div>
                        </div>

                        {s.note ? (
                          <p className="font-body text-gray-700 text-xs mt-4">
                            * {s.note} <a href="#contact" className="text-accent hover:underline">Contact for custom requirements →</a>
                          </p>
                        ) : (
                          <p className="font-body text-gray-700 text-xs mt-4">
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
