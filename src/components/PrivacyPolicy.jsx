import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `When you contact me through this website (via WhatsApp, phone, or any contact form), I may collect your name, phone number, email address, and any project details you voluntarily share. I do not use tracking cookies, analytics scripts, or any third-party data collection tools on this site.`,
  },
  {
    title: '2. How I Use Your Information',
    body: `The information you provide is used solely to respond to your inquiries, discuss potential projects, and deliver agreed-upon services. I will never sell, rent, or share your personal information with third parties for marketing purposes.`,
  },
  {
    title: '3. WhatsApp Communication',
    body: `This site includes links that open WhatsApp with a pre-filled message. By clicking those links, you initiate contact through WhatsApp's platform. WhatsApp's own privacy policy governs data handled within their service. I only use the information shared in our conversation to fulfill your service request.`,
  },
  {
    title: '4. Data Storage & Security',
    body: `Any information you share is stored only in the communication channels you use (e.g., WhatsApp, email). I do not maintain a separate database of client data. I take reasonable precautions to keep your information secure and confidential.`,
  },
  {
    title: '5. Third-Party Links',
    body: `This website may contain links to external platforms (Instagram, LinkedIn, GitHub). I am not responsible for the privacy practices of those sites. I encourage you to review their respective privacy policies before sharing any personal data with them.`,
  },
  {
    title: '6. Your Rights',
    body: `You have the right to request access to, correction of, or deletion of any personal information I hold about you. To exercise these rights, please contact me directly via WhatsApp or phone.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `I may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date. Continued use of this site after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '8. Contact',
    body: `If you have any questions about this Privacy Policy, please reach out via WhatsApp at +91 934184664.`,
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-2xl tracking-widest text-white hover:text-accent transition-colors"
          >
            SHIDHU
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="mb-12">
          <p className="font-body text-xs font-medium tracking-[0.2em] text-accent mb-4 uppercase">
            Legal
          </p>
          <h1
            className="font-display text-white leading-none mb-4"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            PRIVACY POLICY
          </h1>
          <p className="font-body text-gray-400 text-sm">
            Effective date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Intro */}
        <p className="font-body text-gray-300 text-base leading-relaxed mb-12 pb-12 border-b border-white/10">
          Your privacy matters. This policy explains what information I collect when you visit
          <span className="text-white font-medium"> shidhu.dev</span>, how I use it, and the choices
          you have. This site is a personal portfolio and does not collect data beyond what is
          necessary to respond to your contact requests.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">{s.title}</h2>
              <p className="font-body text-gray-400 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-gray-600 text-xs">
            © {new Date().getFullYear()} Shidhu. All rights reserved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-light text-white font-body text-sm font-medium transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
