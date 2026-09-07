import FeatureCard from './FeatureCard'
import styles from './FeatureGrid.module.css'

const FEATURES = [
  {
    icon: '◆',
    title: 'Unified inbox',
    description:
      'Every conversation from email, chat and social lands in one queue your team actually works through.',
    badge: 'New',
  },
  {
    icon: '◈',
    title: 'Smart routing',
    description:
      'Rules assign work by topic, language and workload, so nothing waits on a manual triage pass.',
  },
  {
    icon: '◇',
    title: 'Shared drafts',
    description:
      'Write replies together, leave notes teammates can see, and ship the answer once it reads right.',
  },
  {
    icon: '◉',
    title: 'Live metrics',
    description:
      'Response time, backlog and satisfaction update as the day runs — not the morning after.',
  },
]

export default function FeatureGrid() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>Everything in one place</h2>
        <p className={styles.subtitle}>
          Replace the four tools your support team is switching between.
        </p>
      </header>
      <div className={styles.grid}>
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
