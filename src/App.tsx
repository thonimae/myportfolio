import { motion, useScroll, useSpring } from 'framer-motion'
import { I18nProvider } from './lib/i18n'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import CaseStudies from './components/CaseStudies'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] origin-left h-[2px]"
      style={{ scaleX, background: 'var(--color-accent)' }}
    />
  )
}

function AppInner() {
  useLenis()
  return (
    <div className="bg-bg text-text min-h-screen">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppInner />
    </I18nProvider>
  )
}
