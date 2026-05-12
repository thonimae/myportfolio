import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

function MetricReveal({ value, label, delay, color }: {
  value: string; label: string; delay: number; color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  return (
    <div ref={ref} className="metric-card flex flex-col gap-2">
      <motion.span
        initial={reduced ? false : { opacity: 0, filter: 'blur(10px)', y: 8 }}
        animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
        transition={{ duration: 0.75, ease, delay }}
        className="font-mono font-medium text-[28px] md:text-[36px] leading-none"
        style={{ letterSpacing: '-0.02em', color: color ?? 'var(--color-green)' }}
      >
        {value}
      </motion.span>
      <motion.span
        initial={reduced ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: delay + 0.15 }}
        className="font-mono text-[10px] uppercase tracking-[0.14em] text-text/40"
      >
        {label}
      </motion.span>
    </div>
  )
}

interface CaseProps {
  index: number
  category: string
  title: string
  situation: string
  metrics: { value: string; label: string }[]
}

function CaseStudy({ index, category, title, situation, metrics }: CaseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease }}
      className="py-14 md:py-18 first:pt-0"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/35 block mb-2">
            {`Case Study ${String(index + 1).padStart(2, '0')} / ${category}`}
          </span>
          <h3 className="font-display font-semibold text-[26px] md:text-[34px] text-text" style={{ letterSpacing: '-0.02em' }}>
            {title}
          </h3>
        </div>
      </div>

      {/* Situation */}
      <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-text/50 mb-10 max-w-[560px]">
        {situation}
      </p>

      {/* Outcome label */}
      <p className="section-label mb-5">Outcome</p>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-[680px]">
        {metrics.map((m, i) => (
          <MetricReveal
            key={m.label}
            value={m.value}
            label={m.label}
            delay={i * 0.12}
            color={i === 0 ? 'var(--color-green)' : i === 1 ? 'var(--color-text)' : 'rgba(232,228,220,0.6)'}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const { t } = useI18n()
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const cases: CaseProps[] = [
    {
      index: 0,
      category: t('cs1cat'),
      title: t('cs1title'),
      situation: t('cs1sit'),
      metrics: [
        { value: t('cs1m1v'), label: t('cs1m1l') },
        { value: t('cs1m2v'), label: t('cs1m2l') },
        { value: t('cs1m3v'), label: t('cs1m3l') },
      ],
    },
    {
      index: 1,
      category: t('cs2cat'),
      title: t('cs2title'),
      situation: t('cs2sit'),
      metrics: [
        { value: t('cs2m1v'), label: t('cs2m1l') },
        { value: t('cs2m2v'), label: t('cs2m2l') },
        { value: t('cs2m3v'), label: t('cs2m3l') },
      ],
    },
    {
      index: 2,
      category: t('cs3cat'),
      title: t('cs3title'),
      situation: t('cs3sit'),
      metrics: [
        { value: t('cs3m1v'), label: t('cs3m1l') },
        { value: t('cs3m2v'), label: t('cs3m2l') },
        { value: t('cs3m3v'), label: t('cs3m3l') },
      ],
    },
  ]

  return (
    <section id="work" className="py-24 md:py-36" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="section-label block mb-4"
          >
            {t('csLabel')}
          </motion.span>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display font-bold text-title text-text"
          >
            {t('csTitle')}
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="font-sans text-lead text-text/50 mt-4 max-w-[400px]"
          >
            {t('csSub')}
          </motion.p>
        </div>

        {/* Case studies */}
        <div>
          {cases.map(c => (
            <CaseStudy key={c.index} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
