import { Link } from 'react-router-dom'

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

const WA_NUMBER = '919341784664'
const generalMsg = encodeURIComponent("Hi Shidhu! I'd like to discuss a project with you. Can we connect?")
const waUrl = `https://wa.me/${WA_NUMBER}?text=${generalMsg}`

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
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-light transition-colors duration-200 shadow-lg shadow-accent/20"
            >
              GET IN TOUCH
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href="tel:+919341784664"
              className="inline-flex items-center gap-2 font-body text-sm text-gray-400 hover:text-accent transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 9341784664
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

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="font-body text-gray-700 text-xs">
            © {new Date().getFullYear()} Shidhu. All rights reserved.
          </p>
          <span className="hidden sm:block text-gray-700 text-xs">·</span>
          <Link
            to="/privacy-policy"
            className="font-body text-xs text-gray-600 hover:text-accent transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
