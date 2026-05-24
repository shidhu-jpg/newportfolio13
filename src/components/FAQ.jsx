import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'How long does it take to build a website?',
    a: 'Most websites are live within 5–21 days. A 1-page Starter site goes live in 5–7 days. A 5-page Growth site in 7–14 days. A full Business site with e-commerce or bookings in 14–21 days. Timelines start once I receive your content and deposit.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Just your business name, logo (if you have one), the text/photos you want on the site, and 2–3 websites you like the look of. If you don\'t have a logo or content yet, that\'s fine — I can help with both.',
  },
  {
    q: 'Do you work with clients outside Mumbai?',
    a: 'Yes — 100% of the work is done remotely. I have clients across India and internationally. Everything runs smoothly over WhatsApp, email, and video calls.',
  },
  {
    q: 'What if I\'m not happy with the result?',
    a: 'Every service comes with a satisfaction guarantee. Growth and Business plans include unlimited revisions. If you\'re genuinely not happy after revisions, I offer a full refund — no questions asked. I\'d rather earn your trust than keep your money.',
  },
  {
    q: 'Can I pay in installments?',
    a: '50% upfront secures your spot and starts the project. The remaining 50% is due on final delivery before the site goes live. For larger projects (₹50,000+), a 3-part payment schedule can be arranged.',
  },
  {
    q: 'Do you offer ongoing maintenance after the project?',
    a: 'Yes. Every plan includes post-launch support (15 days on Starter, 30–90 days on Growth/Business). Extended monthly maintenance — updates, backups, security — is available as an add-on.',
  },
  {
    q: 'Will my website rank on Google?',
    a: 'Every website I build includes on-page SEO basics — proper headings, meta tags, fast loading, and Google Business setup on relevant plans. For consistent page-1 rankings, my dedicated SEO service runs monthly campaigns that have delivered results in 1–3 months for past clients.',
  },
  {
    q: 'What makes you different from other freelancers?',
    a: 'Three things: speed (most websites go live in under 2 weeks), real guarantees (not just promises — if you\'re not happy, you get your money back), and full-stack capability (I handle design, development, SEO, and marketing — you don\'t need to manage multiple vendors).',
  },
  {
    q: 'Can I update the website myself after it\'s built?',
    a: 'Yes. Business plan websites include a CMS so you can edit text, images, and pages yourself without touching any code. For other plans, small content updates are handled by me during the support period.',
  },
  {
    q: 'Do you sign a contract or NDA?',
    a: 'Yes. A straightforward service agreement is shared before any work begins — it covers scope, timeline, payment, and ownership. NDAs are available on request at no extra charge.',
  },
]

function Item({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/8 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-center justify-between gap-6 group"
      >
        <span
          className={`font-body font-medium text-sm md:text-base leading-snug transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-white group-hover:text-accent'}`}
        >
          {faq.q}
        </span>
        <motion.div
          className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${isOpen ? 'border-accent/50 text-accent' : 'border-white/15 text-gray-500'}`}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-body text-gray-400 text-sm leading-relaxed pb-6 max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(prev => prev === i ? null : i)

  return (
    <section id="faq" className="bg-dark px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-xs font-medium tracking-[0.25em] text-accent uppercase mb-4">
            Got questions?
          </p>
          <h2
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
          >
            FAQ
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {FAQS.map((faq, i) => (
            <Item
              key={i}
              faq={faq}
              isOpen={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-body text-gray-600 text-sm mb-4">Still have a question?</p>
          <a
            href={`https://wa.me/919341784664?text=${encodeURIComponent("Hi Shidhu! I have a question about your services.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/15 text-gray-300 font-body font-medium text-sm hover:border-accent/50 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
