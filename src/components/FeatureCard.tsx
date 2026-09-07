import type { ReactNode } from 'react'
import styles from './FeatureCard.module.css'

interface FeatureCardProps {
  /** Fills the well above the text — art, a swatch row, anything. */
  well: ReactNode
  title: string
  description: string
  badge?: string
}

export default function FeatureCard({
  well,
  title,
  description,
  badge,
}: FeatureCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.well}>{well}</div>
      <div className={styles.text}>
        <div className={styles.heading}>
          <h3 className={styles.title}>{title}</h3>
          {badge ? <span className={styles.badge}>{badge}</span> : null}
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  )
}
