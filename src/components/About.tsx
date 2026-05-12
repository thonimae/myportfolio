import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

export default function About() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const credentials = [
    t('abC1'), t('abC2'), t('abC3'), t('abC4'),
  ]

  const fadeProps = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0 as number, y: 22 as number },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease, delay },
  })

  return (
    <section
      id="about"
      className="py-24 md:py-36"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.012)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Label */}
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="section-label block mb-4"
        >
          {t('abLabel')}
        </motion.span>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20 items-start">

          {/* Photo */}
          <motion.div {...fadeProps(0)} className="relative">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img
                src="/profil-picture.jpg"
                alt="Thony M. — Amazon EU Consultant"
                className="w-full aspect-[4/5] object-cover object-center"
                style={{ filter: 'grayscale(18%)' }}
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/480x600/131313/666666?text=TM'
                }}
              />
              {/* Orange corner accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, var(--color-accent), transparent)' }}
              />
            </div>

            {/* Credential chips below photo */}
            <div className="flex flex-wrap gap-2 mt-5">
              {credentials.map(c => (
                <span key={c} className="tag">{c}</span>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.h2
              {...fadeProps(0.1)}
              className="font-display font-bold text-title text-text whitespace-pre-line mb-8"
            >
              {t('abTitle')}
            </motion.h2>

            <motion.div {...fadeProps(0.2)} className="space-y-5 mb-10">
              {[t('abP1'), t('abP2'), t('abP3')].map((p, i) => (
                <p key={i} className="font-sans text-[15px] leading-relaxed text-text/60">{p}</p>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              {...fadeProps(0.3)}
              className="relative pl-5"
              style={{ borderLeft: '2px solid var(--color-accent)' }}
            >
              <p className="font-display font-medium text-[17px] md:text-[19px] text-text/80 leading-snug" style={{ letterSpacing: '-0.01em' }}>
                {t('abQuote')}
              </p>
              <cite className="block mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-text/35 not-italic">
                — Thony M.
              </cite>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
