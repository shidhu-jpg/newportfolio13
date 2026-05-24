import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import LeadPopup from './components/LeadPopup'

function Home({ isDark, onToggle }) {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar isDark={isDark} onToggle={onToggle} />
      <Hero isDark={isDark} />
      <About />
      <Services />
      <Projects isDark={isDark} />
      <Reviews isDark={isDark} />
      <Footer />
      <LeadPopup />
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
