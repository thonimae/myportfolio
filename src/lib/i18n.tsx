import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'en' | 'fr'

const en = {
  // Meta
  pageTitle: 'Thony M. — Amazon EU Consultant',
  pageDesc: 'Amazon EU specialist — catalog, pricing, and compliance. Vendor & Seller Central.',

  // Nav
  navServices: 'Services',
  navWork: 'Work',
  navAbout: 'About',
  navContact: 'Contact',

  // Hero
  heroAvail: 'Available for new engagements',
  heroLine1: 'Amazon EU.',
  heroLine2: 'Catalog, pricing,',
  heroLine3: 'compliance — fixed.',
  heroSub: 'I solve the operational problems that cost brands real revenue on Vendor & Seller Central.',
  heroCTA: 'Let\'s talk',
  heroWork: 'See the work ↓',
  stat1v: '4+',   stat1l: 'Years on Amazon EU',
  stat2v: '€50M+', stat2l: 'GMV managed',
  stat3v: '5',    stat3l: 'EU markets',
  stat4v: '<24h', stat4l: 'Response time',

  // Services
  svcLabel: 'Services',
  svcTitle: 'Three pillars.\nOne outcome.',
  svcSub: 'Measurable results across catalog, pricing, and compliance.',
  s1n: '01', s1t: 'Catalog Architecture',
  s1sub: 'Every product live. Every detail correct.',
  s1d: 'Full catalog management — ASIN creation, suppression recovery, compliance mapping, A+ content, and inventory coordination. Nothing falls through the cracks.',
  s1tags: ['ASIN Management', 'Suppression Recovery', 'A+ Content', 'Compliance'],
  s2n: '02', s2t: 'Pricing & Margin Defense',
  s2sub: 'Margin protected at scale.',
  s2d: 'Repricing strategy, MAP enforcement, promotional mechanics, and Buy Box optimization. Your margin is an asset — I protect it systematically.',
  s2tags: ['Repricing Strategy', 'MAP Enforcement', 'Buy Box', 'Promotions'],
  s3n: '03', s3t: 'Compliance & Resolution',
  s3sub: 'Problems solved before they cost you.',
  s3d: 'Policy violation resolution, Amazon support escalation, account health monitoring, and dispute management. I navigate Amazon\'s complexity so you don\'t have to.',
  s3tags: ['Policy Resolution', 'Case Escalation', 'Account Health', 'Disputes'],

  // Case Studies
  csLabel: 'Case Studies',
  csTitle: 'Before → After.',
  csSub: 'Measurable outcomes, documented.',
  cs1cat: 'Cosmetics · Vendor Central · France',
  cs1title: 'Catalog Recovery',
  cs1sit: '31% of catalog suppressed following a compliance audit — 2,847 ASINs offline in six days.',
  cs1m1v: '€847K', cs1m1l: 'Revenue unlocked',
  cs1m2v: '98.1%', cs1m2l: 'Compliance rate',
  cs1m3v: '6 wk',  cs1m3l: 'Time to resolution',
  cs2cat: 'Home & Garden · Vendor Central · EU',
  cs2title: 'Pricing Architecture',
  cs2sit: 'Margin erosion of −22 pts below target due to repricing spiral and daily MAP violations.',
  cs2m1v: '+18 pt', cs2m1l: 'Margin recovery',
  cs2m2v: '€2.1M',  cs2m2l: 'Revenue protected / yr',
  cs2m3v: '0',       cs2m3l: 'MAP violations / mo',
  cs3cat: 'Wellness · Seller Central · Pan-EU',
  cs3title: 'Pan-EU Market Entry',
  cs3sit: 'Zero Amazon presence. Target: 4 EU markets live in 90 days, fully compliant from day one.',
  cs3m1v: '€1.2M', cs3m1l: 'GMV first 90 days',
  cs3m2v: 'Top 10', cs3m2l: 'BSR in category',
  cs3m3v: '4',      cs3m3l: 'Markets launched',

  // About
  abLabel: 'About',
  abTitle: 'I didn\'t study Amazon.\nI built my expertise inside it.',
  abP1: 'Four years ago I joined a digital solutions agency as a customer service agent. Inside a year I was managing accounts. Inside three, I was training the teams that managed accounts — at one of France\'s leading marketplace agencies.',
  abP2: 'That path — from frontline operations to strategy — gave me something rare: I understand exactly where Amazon breaks, why it breaks, and the precise sequence to fix it.',
  abP3: 'Today I work directly with brands on Amazon EU. No layers. No fluff. Clean, documented, measurable work.',
  abQuote: '"Every problem I fix is revenue unlocked for your brand."',
  abC1: '4+ years Amazon EU',
  abC2: 'Vendor & Seller Central',
  abC3: 'FR · EN · ES',
  abC4: 'Senior Marketplace Trainer',

  // Contact
  ctLabel: 'Contact',
  ctTitle: 'Let\'s talk about\nyour Amazon operation.',
  ctSub: 'Describe the problem. I\'ll tell you exactly how I\'d approach it.',
  ctAvail: 'Available for new engagements',
  ctResp: '< 24h response',
  ctLang: 'FR / EN',
  fName: 'Full name',
  fEmail: 'Email address',
  fSubject: 'Subject',
  fMsg: 'Tell me about your Amazon operation and what\'s not working...',
  fBtn: 'Send message →',
  fOr: 'Or email directly:',

  // Footer
  ftTagline: 'Amazon EU Consultant',
  ftCopy: 'All rights reserved.',
}

const fr: typeof en = {
  pageTitle: 'Thony M. — Consultant Amazon EU',
  pageDesc: 'Spécialiste Amazon EU — catalogue, prix et conformité. Vendor & Seller Central.',
  navServices: 'Services',
  navWork: 'Travaux',
  navAbout: 'À propos',
  navContact: 'Contact',
  heroAvail: 'Disponible pour de nouvelles missions',
  heroLine1: 'Amazon EU.',
  heroLine2: 'Catalogue, prix,',
  heroLine3: 'conformité — résolus.',
  heroSub: 'Je résous les problèmes opérationnels qui coûtent de vrais revenus aux marques sur Vendor & Seller Central.',
  heroCTA: 'Discutons',
  heroWork: 'Voir les travaux ↓',
  stat1v: '4+',   stat1l: 'Ans sur Amazon EU',
  stat2v: '€50M+', stat2l: 'GMV managé',
  stat3v: '5',    stat3l: 'Marchés EU',
  stat4v: '<24h', stat4l: 'Délai de réponse',
  svcLabel: 'Services',
  svcTitle: 'Trois piliers.\nUn résultat.',
  svcSub: 'Des résultats mesurables sur le catalogue, les prix et la conformité.',
  s1n: '01', s1t: 'Architecture Catalogue',
  s1sub: 'Chaque produit en ligne. Chaque détail correct.',
  s1d: 'Gestion complète du catalogue — création d\'ASINs, récupération de suppressions, conformité, optimisation A+ et coordination des stocks. Rien ne passe à travers les mailles.',
  s1tags: ['Gestion ASIN', 'Récupération', 'Contenu A+', 'Conformité'],
  s2n: '02', s2t: 'Prix & Défense des Marges',
  s2sub: 'Les marges protégées à grande échelle.',
  s2d: 'Stratégie de repricing, respect des prix MAP, mécaniques promotionnelles et optimisation de la Buy Box. Votre marge est un actif — je la protège systématiquement.',
  s2tags: ['Stratégie Repricing', 'Prix MAP', 'Buy Box', 'Promotions'],
  s3n: '03', s3t: 'Conformité & Résolution',
  s3sub: 'Problèmes résolus avant qu\'ils ne coûtent.',
  s3d: 'Résolution de violations, escalade du support Amazon, surveillance de la santé du compte et gestion des litiges. Je navigue la complexité d\'Amazon pour vous.',
  s3tags: ['Violations', 'Escalade', 'Santé Compte', 'Litiges'],
  csLabel: 'Études de cas',
  csTitle: 'Avant → Après.',
  csSub: 'Des résultats mesurables, documentés.',
  cs1cat: 'Cosmétiques · Vendor Central · France',
  cs1title: 'Récupération Catalogue',
  cs1sit: '31% du catalogue supprimé suite à un audit de conformité — 2 847 ASINs hors ligne en six jours.',
  cs1m1v: '€847K', cs1m1l: 'Revenus récupérés',
  cs1m2v: '98,1%', cs1m2l: 'Taux de conformité',
  cs1m3v: '6 sem', cs1m3l: 'Durée de résolution',
  cs2cat: 'Maison & Jardin · Vendor Central · EU',
  cs2title: 'Architecture des Prix',
  cs2sit: 'Érosion des marges de −22 pts sous objectif due à une spirale de repricing et des violations MAP quotidiennes.',
  cs2m1v: '+18 pt', cs2m1l: 'Récupération de marge',
  cs2m2v: '€2,1M',  cs2m2l: 'Revenus protégés / an',
  cs2m3v: '0',       cs2m3l: 'Violations MAP / mois',
  cs3cat: 'Bien-être · Seller Central · Pan-EU',
  cs3title: 'Lancement Pan-EU',
  cs3sit: 'Aucune présence Amazon. Objectif : 4 marchés EU actifs en 90 jours, conformes dès le premier jour.',
  cs3m1v: '€1,2M', cs3m1l: 'GMV 90 premiers jours',
  cs3m2v: 'Top 10', cs3m2l: 'BSR dans la catégorie',
  cs3m3v: '4',      cs3m3l: 'Marchés lancés',
  abLabel: 'À propos',
  abTitle: 'Je n\'ai pas étudié Amazon.\nJ\'ai construit mon expertise à l\'intérieur.',
  abP1: 'Il y a quatre ans, j\'ai rejoint une agence de solutions digitales en tant qu\'agent service client. En moins d\'un an, je gérais des comptes. En moins de trois, je formais les équipes qui géraient ces comptes — dans l\'une des principales agences marketplace de France.',
  abP2: 'Ce parcours — du terrain à la stratégie — m\'a donné quelque chose de rare : je comprends exactement où Amazon se bloque, pourquoi, et la séquence précise pour le débloquer.',
  abP3: 'Aujourd\'hui je travaille directement avec des marques sur Amazon EU. Sans intermédiaires. Sans superflu. Un travail propre, documenté, mesurable.',
  abQuote: '"Chaque problème que je résous, c\'est un levier de croissance pour votre marque."',
  abC1: '4+ ans Amazon EU',
  abC2: 'Vendor & Seller Central',
  abC3: 'FR · EN · ES',
  abC4: 'Senior Marketplace Trainer',
  ctLabel: 'Contact',
  ctTitle: 'Parlons de votre\nopération Amazon.',
  ctSub: 'Décrivez le problème. Je vous dirai exactement comment je l\'aborderais.',
  ctAvail: 'Disponible pour de nouvelles missions',
  ctResp: '< 24h de réponse',
  ctLang: 'FR / EN',
  fName: 'Nom complet',
  fEmail: 'Adresse e-mail',
  fSubject: 'Objet',
  fMsg: 'Décrivez votre activité Amazon et ce qui ne fonctionne pas...',
  fBtn: 'Envoyer le message →',
  fOr: 'Ou contactez directement :',
  ftTagline: 'Consultant Amazon EU',
  ftCopy: 'Tous droits réservés.',
}

type Translations = typeof en

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: keyof Translations) => string
  tArr: (k: keyof Translations) => string[]
}

const I18nContext = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) as Lang | null
  const browser = (typeof navigator !== 'undefined' && navigator.language.split('-')[0] === 'fr') ? 'fr' : 'en'
  const [lang, setLangState] = useState<Lang>(stored ?? browser)

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
    document.documentElement.lang = l
    document.title = (l === 'fr' ? fr : en).pageTitle
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = (lang === 'fr' ? fr : en).pageTitle
  }, [lang])

  const dict = lang === 'fr' ? fr : en

  const t = (k: keyof Translations): string => {
    const v = dict[k]
    return typeof v === 'string' ? v : ''
  }

  const tArr = (k: keyof Translations): string[] => {
    const v = dict[k]
    return Array.isArray(v) ? v as string[] : []
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tArr }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be inside I18nProvider')
  return ctx
}
