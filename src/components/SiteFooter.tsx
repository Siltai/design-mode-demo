import styles from './SiteFooter.module.css'

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>© 2026 Kettle Labs</p>
      <nav className={styles.links} aria-label="Footer">
        <a className={styles.link} href="/privacy">
          Privacy
        </a>
        <a className={styles.link} href="/terms">
          Terms
        </a>
        <a className={styles.link} href="/status">
          Status
        </a>
      </nav>
    </footer>
  )
}
