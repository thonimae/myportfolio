import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={reduced ? false : { y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
      className="flex flex-col gap-1"
    >
      <span className="font-mono text-[22px] md:text-[28px] font-medium text-text" style={{ letterSpacing: '-0.02em' }}>
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text/40">{label}</span>
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden />

      {/* Orange radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 45% at 50% 0%, rgba(255,94,26,0.065), transparent 65%)' }}
        aria-hidden
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col justify-center flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 pt-16 md:pt-20 pb-10"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="flex items-center gap-2 mb-12 md:mb-16"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text/50">
            {t('heroAvail')}
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="mb-8 md:mb-10">
          <LineReveal delay={0.08}>
            <h1 className="font-display font-bold text-display text-text leading-[0.93]">
              {t('heroLine1')}
            </h1>
          </LineReveal>
          <LineReveal delay={0.18}>
            <h1 className="font-display font-bold text-display text-text leading-[0.93]">
              {t('heroLine2')}
            </h1>
          </LineReveal>
          <LineReveal delay={0.28}>
            <h1
              className="font-display font-bold text-display leading-[0.93]"
              style={{ WebkitTextStroke: '1.5px rgba(232,228,220,0.85)', color: 'transparent' }}
            >
              {t('heroLine3')}
            </h1>
          </LineReveal>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.42 }}
          className="font-sans text-lead text-text/55 max-w-[520px] mb-10 md:mb-12"
        >
          {t('heroSub')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-bg"
            style={{ background: 'var(--color-accent)', borderRadius: '3px' }}
          >
            <motion.span
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.18)' }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
            <span className="relative">{t('heroCTA')}</span>
          </a>

          <button
            onClick={scrollToServices}
            className="inline-flex items-center gap-2 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-text/50 hover:text-text transition-colors duration-200"
          >
            {t('heroWork')}
          </button>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.7 }}
        className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-10 md:pb-14"
      >
        <div
          className="pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/[0.07]">
            {([
              [t('stat1v'), t('stat1l')],
              [t('stat2v'), t('stat2l')],
              [t('stat3v'), t('stat3l')],
              [t('stat4v'), t('stat4l')],
            ] as [string, string][]).map(([v, l], i) => (
              <div key={i} className="md:px-8 first:pl-0 last:pr-0">
                <StatItem value={v} label={l} delay={0.72 + i * 0.06} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 right-6 md:right-10 hidden md:flex flex-col items-center gap-2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)' }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text/30 rotate-90 origin-center translate-y-4">
          scroll
        </span>
      </motion.div>
    </section>
  )
}
