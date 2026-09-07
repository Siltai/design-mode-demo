import styles from './SiteHeader.module.css'

const LINKS = ['product', 'pricing', 'customers', 'docs']

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="/">
          <svg
            className={styles.mark}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5.5 9h8v4.5a3 3 0 0 1-3 3H8.5a3 3 0 0 1-3-3z" />
            <path d="M13.5 10.5 16.5 8.5" />
            <path d="M7.5 9V8.25a2 2 0 0 1 4 0V9" />
          </svg>
          kettle
        </a>

        <nav className={styles.nav} aria-label="Main">
          {LINKS.map((link) => (
            <a key={link} className={styles.link} href={`/${link}`}>
              {link}
            </a>
          ))}
        </nav>

        <a className={styles.signin} href="/signin">
          sign in
        </a>
      </div>
    </header>
  )
}
