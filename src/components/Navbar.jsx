import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROCESS', href: '#process' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
  { label: 'CONTACT', href: '#contact' },
]

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
}

export default function Navbar({ isDark, onToggle }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = isDark ? 'bg-[#111111]' : 'bg-white'
  const shadow = scrolled ? (isDark ? 'border-b border-white/10' : 'shadow-sm') : ''
  const logoColor = isDark ? 'text-white' : 'text-dark'
  const linkColor = isDark ? 'text-gray-400' : 'text-gray-600'
  const toggleColor = isDark ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'
  const hamburgerColor = isDark ? 'text-gray-400' : 'text-gray-600'
  const mobileBg = isDark ? 'bg-[#111111] border-white/10' : 'bg-white border-gray-100'
  const mobileLinkColor = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navBg} ${shadow}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="#home" className={`font-display text-2xl tracking-widest ${logoColor}`}>
          SHIDHU
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-10">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`font-body text-xs font-medium tracking-[0.18em] hover:text-accent transition-colors duration-200 ${linkColor}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${toggleColor}`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${toggleColor}`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className={`p-1 ${hamburgerColor}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden border-t px-6 py-5 flex flex-col gap-5 ${mobileBg}`}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-xs font-medium tracking-[0.18em] hover:text-accent transition-colors ${mobileLinkColor}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
