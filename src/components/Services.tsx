import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ServiceCardProps {
  num: string
  title: string
  sub: string
  desc: string
  tags: string[]
  delay: number
}

function ServiceCard({ num, title, sub, desc, tags, delay }: ServiceCardProps) {
  return (
    <FadeUp delay={delay}>
      <motion.div
        className="group relative flex flex-col gap-5 p-7 md:p-9 cursor-default"
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.015)',
          transition: 'border-color 0.3s, background 0.3s',
        }}
        whileHover={{
          borderColor: 'rgba(255,255,255,0.14)',
          backgroundColor: 'rgba(255,255,255,0.03)',
          y: -4,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Accent line on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{ background: 'var(--color-accent)' }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease }}
        />

        {/* Number */}
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/80">
          {num}
        </span>

        {/* Title + sub */}
        <div>
          <h3 className="font-display font-semibold text-[22px] md:text-[26px] text-text mb-1.5" style={{ letterSpacing: '-0.02em' }}>
            {title}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-text/40">{sub}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Description */}
        <p className="font-sans text-[14px] leading-relaxed text-text/55">{desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </motion.div>
    </FadeUp>
  )
}

export default function Services() {
  const { t, tArr } = useI18n()
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const services = [
    { num: t('s1n'), title: t('s1t'), sub: t('s1sub'), desc: t('s1d'), tags: tArr('s1tags') },
    { num: t('s2n'), title: t('s2t'), sub: t('s2sub'), desc: t('s2d'), tags: tArr('s2tags') },
    { num: t('s3n'), title: t('s3t'), sub: t('s3sub'), desc: t('s3d'), tags: tArr('s3tags') },
  ]

  return (
    <section id="services" className="py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="section-label block mb-4"
          >
            {t('svcLabel')}
          </motion.span>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display font-bold text-title text-text whitespace-pre-line"
          >
            {t('svcTitle')}
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="font-sans text-lead text-text/50 mt-4 max-w-[460px]"
          >
            {t('svcSub')}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.num} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
