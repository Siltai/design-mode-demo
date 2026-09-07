import styles from './Hero.module.css'

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  primaryLabel?: string
  secondaryLabel?: string
}

export default function Hero({
  eyebrow = 'a demo page, and nothing else',
  title,
  subtitle,
  primaryLabel = 'point at something',
  secondaryLabel = 'read the source',
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.rule} aria-hidden="true" />
          {eyebrow}
        </p>

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
      </div>
    </section>
  )
}
