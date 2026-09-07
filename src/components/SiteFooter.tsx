import styles from './SiteFooter.module.css'

export default function SiteFooter() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <p className={styles.copy}>
          a demo page for silt-design-mode. nothing is real except the components.
        </p>
        <nav className={styles.links} aria-label="Footer">
          <a className={styles.link} href="https://github.com/Siltai/design-mode-demo">
            source
          </a>
          <a className={styles.link} href="https://silt.app">
            silt
          </a>
        </nav>
      </div>
    </footer>
  )
}
