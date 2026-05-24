import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import LeadPopup from './components/LeadPopup'
import WhatsAppFloat from './components/WhatsAppFloat'

function Home({ isDark, onToggle }) {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar isDark={isDark} onToggle={onToggle} />
      <Hero isDark={isDark} />
      <About />
      <Services />
      <Process />
      <Projects isDark={isDark} />
      <Reviews isDark={isDark} />
      <FAQ />
      <Footer />
      <LeadPopup />
      <WhatsAppFloat />
    </div>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const toggle = () => setIsDark(d => !d)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} onToggle={toggle} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}
