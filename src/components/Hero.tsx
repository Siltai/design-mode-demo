import styles from './Hero.module.css'

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  primaryLabel?: string
  secondaryLabel?: string
}

export default function Hero({
  eyebrow = 'Now in public beta',
  title,
  subtitle,
  primaryLabel = 'Start free',
  secondaryLabel = 'Book a demo',
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.primary}>
          {primaryLabel}
        </button>
        <button type="button" className={styles.secondary}>
          {secondaryLabel}
        </button>
      </div>
    </section>
  )
}
