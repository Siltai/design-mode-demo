import Button from './Button'
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
    <section className={styles.hero} id="hero">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.rule} aria-hidden="true" />
          {eyebrow}
        </p>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.actions}>
          <Button onBand variant="primary">
            {primaryLabel}
          </Button>
          <Button onBand variant="secondary">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
