const PROJECTS = [
  {
    num: '01',
    name: 'DR. RAUSHAN KUMAR',
    category: 'Healthcare & Medical Web',
    desc: 'Professional website for a medical practitioner to build online presence and connect with patients.',
    image: '/images/drraushankumar.png',
    live: 'http://drrausankumar.online/',
  },
  {
    num: '02',
    name: 'GO69 PIZZA',
    category: 'Food & Restaurant Web',
    desc: 'Vibrant online presence for a pizza outlet to showcase their menu and attract local customers.',
    image: '/images/go69pizza.png',
    live: 'http://go69pizzaareraj.in/',
  },
  {
    num: '03',
    name: 'MAA BHAWANI DIAGNOSTICS',
    category: 'Healthcare & Diagnostics Web',
    desc: 'Clean, trustworthy website for a diagnostic center to help patients book tests and find services.',
    image: '/images/maabhawani.png',
    live: 'http://maabhawanidiagnostics.com/',
  },
  {
    num: '04',
    name: 'ZENITHTAIL',
    category: 'E-Commerce & Pet Products',
    desc: 'Full-featured online store for pet products — giving pet owners a seamless shopping experience.',
    image: '/images/zenithtail.png',
    live: 'http://zenithtail.in/',
  },
  {
    num: '05',
    name: 'ARORA SWEETS',
    category: 'Food & Sweets Web',
    desc: 'Elegant website for a traditional sweet shop to showcase their products and attract local customers.',
    image: '/images/arorasweets.png',
    live: 'https://arorasweets.co.in/',
  },
]

function ProjectRow({ project, isDark }) {
  const borderColor   = isDark ? 'border-white/10'  : 'border-gray-100'
  const nameColor     = isDark ? 'text-white'        : 'text-dark'
  const categoryColor = 'text-gray-400'
  const descColor     = isDark ? 'text-gray-400'     : 'text-gray-500'

  return (
    <div className={`py-10 border-b grid grid-cols-1 lg:grid-cols-2 gap-8 items-center group ${borderColor}`}>
      <div>
        <div className="flex items-start gap-4 mb-3">
          <span
            className="font-display text-accent leading-none flex-shrink-0"
            style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}
          >
            {project.num}
          </span>
          <div className="pt-2">
            <p className={`font-body text-xs tracking-widest uppercase mb-1 ${categoryColor}`}>
              {project.category}
            </p>
            <h3
              className={`font-display leading-none group-hover:text-accent transition-colors duration-300 ${nameColor}`}
              style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
            >
              {project.name}
            </h3>
            <p className={`font-body text-sm mt-2 leading-relaxed max-w-sm ${descColor}`}>
              {project.desc}
            </p>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-body font-medium text-accent hover:underline"
            >
              VISIT SITE
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <a href={project.live} target="_blank" rel="noopener noreferrer" className="block">
        <img
          src={project.image}
          alt={project.name}
          className="w-full aspect-[4/3] object-cover object-top rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
        />
      </a>
    </div>
  )
}

export default function Projects({ isDark }) {
  const sectionBg    = isDark ? 'bg-[#111111]' : 'bg-white'
  const headingColor = isDark ? 'text-white'   : 'text-dark'

  return (
    <section id="projects" className={`py-20 px-6 transition-colors duration-300 ${sectionBg}`}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`font-display leading-none mb-6 ${headingColor}`}
          style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
        >
          PROJECTS
        </h2>

        {PROJECTS.map((p) => (
          <ProjectRow key={p.num} project={p} isDark={isDark} />
        ))}

        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-light transition-colors duration-200 shadow-lg shadow-accent/20"
          >
            VIEW ALL PROJECTS
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
