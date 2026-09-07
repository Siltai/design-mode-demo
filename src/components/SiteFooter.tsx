import styles from './SiteFooter.module.css'

const LINKS = ['privacy', 'terms', 'status']

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>© 2026 kettle labs</p>
        <nav className={styles.links} aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link} className={styles.link} href={`/${link}`}>
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
