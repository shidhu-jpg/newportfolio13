const LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'REVIEWS', href: '#reviews' },
]

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Top — CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-14 border-b border-white/10">
          <h2
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
          >
            LET'S WORK<br />TOGETHER
          </h2>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <a
              href="mailto:mlshidhu@gmail.com"
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-light transition-colors duration-200 shadow-lg shadow-accent/20"
            >
              GET IN TOUCH
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="tel:+91934184664"
              className="inline-flex items-center gap-2 font-body text-sm text-gray-400 hover:text-accent transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 934184664
            </a>
          </div>
        </div>

        {/* Bottom — logo + nav + socials + copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <a href="#home" className="font-display text-3xl text-white tracking-widest hover:text-accent transition-colors">
            SHIDHU
          </a>

          {/* Nav links */}
          <ul className="flex flex-wrap gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-body text-xs font-medium tracking-[0.18em] text-gray-500 hover:text-white transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-body text-xs font-medium tracking-widest text-gray-600 hover:text-accent transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="font-body text-gray-700 text-xs mt-10 text-center">
          © {new Date().getFullYear()} Shidhu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
