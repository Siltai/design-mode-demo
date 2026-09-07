import styles from './SiteHeader.module.css'

const LINKS = ['Product', 'Pricing', 'Customers', 'Docs']

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/">
        <span className={styles.mark} aria-hidden="true" />
        Kettle
      </a>
      <nav className={styles.nav} aria-label="Main">
        {LINKS.map((link) => (
          <a key={link} className={styles.link} href={`/${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
      </nav>
      <button type="button" className={styles.cta}>
        Sign in
      </button>
    </header>
  )
}
