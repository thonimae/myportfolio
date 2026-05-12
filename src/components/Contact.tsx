import { useRef, useState, FormEvent } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-text/45"
      style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px' }}
    >
      {children}
    </span>
  )
}

export default function Contact() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fade = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0 as number, y: 20 as number },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease, delay },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/xovekoaz', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
        form.reset()
      }
    } catch {
      // fallback: let normal submit proceed
      form.submit()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-36"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 md:gap-24 items-start">

          {/* Left — info */}
          <div>
            <motion.span {...fade(0)} className="section-label block mb-4">
              {t('ctLabel')}
            </motion.span>
            <motion.h2
              {...fade(0.1)}
              className="font-display font-bold text-title text-text whitespace-pre-line mb-5"
            >
              {t('ctTitle')}
            </motion.h2>
            <motion.p {...fade(0.2)} className="font-sans text-lead text-text/50 mb-8 max-w-[380px]">
              {t('ctSub')}
            </motion.p>

            {/* Status badges */}
            <motion.div {...fade(0.3)} className="flex flex-wrap gap-2 mb-10">
              <Badge>
                <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
                {t('ctAvail')}
              </Badge>
              <Badge>{t('ctResp')}</Badge>
              <Badge>{t('ctLang')}</Badge>
            </motion.div>

            {/* Direct email */}
            <motion.div {...fade(0.4)}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text/35 mb-2">
                {t('fOr')}
              </p>
              <a
                href="mailto:thonymaherison@gmail.com"
                className="font-sans text-[15px] text-text/70 hover:text-accent transition-colors duration-200 link-underline"
              >
                thonymaherison@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div {...fade(0.15)}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex flex-col items-start gap-4 py-8"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(34,255,136,0.1)', border: '1px solid rgba(34,255,136,0.3)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9l4.5 4.5L15 5" stroke="#22FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-display font-semibold text-[22px] text-text" style={{ letterSpacing: '-0.01em' }}>
                    Message sent.
                  </p>
                  <p className="font-sans text-[14px] text-text/50">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-text/35 block mb-2">
                      {t('fName')}
                    </label>
                    <input name="name" type="text" required className="input-field" placeholder="—" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-text/35 block mb-2">
                      {t('fEmail')}
                    </label>
                    <input name="email" type="email" required className="input-field" placeholder="—" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-text/35 block mb-2">
                      {t('fSubject')}
                    </label>
                    <input name="_subject" type="text" required className="input-field" placeholder="—" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-text/35 block mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="textarea-field"
                      placeholder={t('fMsg')}
                    />
                  </div>
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="relative w-full overflow-hidden py-3.5 font-sans text-[13px] font-medium uppercase tracking-[0.1em]"
                    style={{
                      background: 'var(--color-accent)',
                      color: '#000',
                      borderRadius: '3px',
                      opacity: submitting ? 0.7 : 1,
                    }}
                    whileHover={{ scale: submitting ? 1 : 1.01 }}
                    whileTap={{ scale: submitting ? 1 : 0.99 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="absolute inset-0"
                      style={{ background: 'rgba(0,0,0,0.15)' }}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative">
                      {submitting ? '…' : t('fBtn')}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
