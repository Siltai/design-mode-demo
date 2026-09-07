import FeatureCard from './FeatureCard'
import styles from './FeatureGrid.module.css'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const FEATURES = [
  {
    title: 'one inbox',
    description:
      'email, chat and social land in a single queue your team actually works through.',
    badge: 'new',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 7h18v10H3z" />
        <path d="m3 8 9 6 9-6" />
      </svg>
    ),
  },
  {
    title: 'routing that holds',
    description:
      'rules assign by topic, language and workload, so nothing waits on a manual triage pass.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 6h6l4 6 6 0" />
        <path d="M4 18h6l2-3" />
        <path d="m17 9 3 3-3 3" />
      </svg>
    ),
  },
  {
    title: 'drafts, together',
    description:
      'write replies side by side, leave notes only the team sees, send once it reads right.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M5 5h9l5 5v9H5z" />
        <path d="M14 5v5h5" />
        <path d="M8.5 14h6" />
      </svg>
    ),
  },
  {
    title: 'metrics while it matters',
    description:
      'response time, backlog and satisfaction move as the day runs, not the morning after.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-6" />
        <path d="M22 19H2" />
      </svg>
    ),
  },
]

export default function FeatureGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>everything in one place</h2>
          <p className={styles.subtitle}>
            replace the four tools your support team is switching between.
          </p>
        </header>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
