import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-10 md:py-12"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-5">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-mono text-[14px] font-medium text-text/80" style={{ letterSpacing: '0.04em' }}>
              TM.
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text/30">
              {t('ftTagline')}
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {(['#services', '#work', '#about', '#contact'] as const).map((href) => {
              const label = href.slice(1).charAt(0).toUpperCase() + href.slice(2)
              return (
                <button
                  key={href}
                  onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-text/30 hover:text-text/70 transition-colors duration-200"
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Right — LinkedIn + copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <motion.a
              href="https://www.linkedin.com/in/thonymaherison"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text/30 hover:text-accent transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </motion.a>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text/20">
              © {year} Thony M. — {t('ftCopy')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
