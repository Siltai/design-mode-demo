import type { ReactNode } from 'react'
import styles from './FeatureCard.module.css'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  badge?: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  badge,
}: FeatureCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.heading}>
        <h3 className={styles.title}>{title}</h3>
        {badge ? <span className={styles.badge}>{badge}</span> : null}
      </div>
      <p className={styles.description}>{description}</p>
    </article>
  )
}
