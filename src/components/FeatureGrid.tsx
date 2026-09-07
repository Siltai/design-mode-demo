import FeatureCard from './FeatureCard'
import styles from './FeatureGrid.module.css'

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const CARDS = [
  {
    title: 'four of the same card',
    badge: 'props',
    description:
      'one component, four sets of props. hover any of them — the drawing answers, because this is the component running, not a picture of it.',
    well: (
      <svg viewBox="0 0 120 90" className={styles.art} aria-hidden="true">
        <rect className={styles.stackBack} x="26" y="26" width="60" height="42" rx="7" {...line} />
        <rect className={styles.stackMid} x="30" y="30" width="60" height="42" rx="7" {...line} />
        <rect className={styles.stackFront} x="34" y="34" width="60" height="42" rx="7" {...line} />
      </svg>
    ),
  },
  {
    title: 'that badge is a prop',
    description:
      'pass it and it shows up, leave it out and the row closes. hover to watch the pointer go press it.',
    well: (
      <svg viewBox="0 0 120 90" className={styles.art} aria-hidden="true">
        <rect className={styles.pill} x="30" y="34" width="44" height="18" rx="9" {...line} />
        <path className={styles.pillFill} d="M40 43h24" {...line} />
        <path className={styles.cursor} d="M76 50v14l4-4h6z" {...line} />
      </svg>
    ),
  },
  {
    title: 'one scale, no strays',
    description:
      'spacing, radius and type each come off a closed set. hover and they step up one at a time.',
    well: (
      <svg viewBox="0 0 120 90" className={styles.art} aria-hidden="true">
        <path d="M24 62h72" {...line} opacity="0.4" />
        <path className={styles.step1} d="M24 62v-6" {...line} />
        <path className={styles.step2} d="M42 62v-10" {...line} />
        <path className={styles.step3} d="M60 62v-16" {...line} />
        <path className={styles.step4} d="M78 62v-24" {...line} />
        <path className={styles.step5} d="M96 62v-34" {...line} />
      </svg>
    ),
  },
  {
    title: 'made to leave the page',
    description:
      'each card keeps its own styles in its own file, so it still looks and behaves like this once it is somewhere else entirely.',
    well: (
      <svg viewBox="0 0 120 90" className={styles.art} aria-hidden="true">
        <path
          className={styles.origin}
          d="M62 28H30a5 5 0 0 0-5 5v24a5 5 0 0 0 5 5h32"
          {...line}
        />
        <rect className={styles.leaving} x="62" y="32" width="34" height="26" rx="6" {...line} />
        <path className={styles.leavingArrow} d="M52 45h30m-7-6 7 6-7 6" {...line} />
      </svg>
    ),
  },
]

export default function FeatureGrid() {
  return (
    <section className={styles.section} id="cards">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>what is actually on this page</h2>
          <p className={styles.subtitle}>
            a header, a hero, four cards and a footer. that is the whole thing.
          </p>
        </header>

        <div className={styles.grid}>
          {CARDS.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
