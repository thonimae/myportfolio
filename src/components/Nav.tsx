import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n, Lang } from '../lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

const links = [
  { key: 'navServices' as const, href: '#services' },
  { key: 'navWork' as const,     href: '#work' },
  { key: 'navAbout' as const,    href: '#about' },
  { key: 'navContact' as const,  href: '#contact' },
]

export default function Nav() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['services', 'work', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0 }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: scrolled ? 'rgba(6,6,6,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        }}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-mono text-[15px] font-medium text-text hover:text-accent transition-colors duration-200"
            style={{ letterSpacing: '0.04em' }}
          >
            TM.
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollTo(href)}
                className="relative font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-text/60 hover:text-text transition-colors duration-200"
              >
                {t(key)}
                {active === href.slice(1) && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ duration: 0.3, ease }}
                  />
                )}
              </button>
            ))}

            {/* Lang toggle */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-white/10">
              {(['en', 'fr'] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="relative font-mono text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 transition-colors duration-200"
                  style={{ color: lang === l ? '#FF5E1A' : 'rgba(232,228,220,0.4)' }}
                >
                  {l}
                  {lang === l && (
                    <motion.span
                      layoutId="lang-bg"
                      className="absolute inset-0 rounded-sm"
                      style={{ background: 'rgba(255,94,26,0.12)', border: '1px solid rgba(255,94,26,0.3)' }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-1">
              {(['en', 'fr'] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] px-2 py-0.5 transition-colors duration-200"
                  style={{ color: lang === l ? '#FF5E1A' : 'rgba(232,228,220,0.4)' }}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 group"
            >
              <motion.span
                className="block h-px w-5 bg-text/80 origin-center"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-px w-5 bg-text/80 origin-center"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-5 bg-text/80 origin-center"
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
            className="fixed top-16 left-0 right-0 z-[90] md:hidden"
            style={{ background: 'rgba(6,6,6,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {links.map(({ key, href }, i) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                onClick={() => scrollTo(href)}
                className="w-full text-left px-6 py-4 font-sans text-[13px] uppercase tracking-[0.1em] text-text/70 hover:text-text border-b border-white/[0.05] transition-colors"
              >
                {t(key)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
