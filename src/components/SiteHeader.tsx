import styles from './SiteHeader.module.css'

const LINKS = ['hero', 'cards', 'footer']

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="/" aria-label="kettle, home">
          <span className={styles.mark}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 10h10v5.5a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 7 15.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M17 11.5 20 9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.5 10V9a2.5 2.5 0 0 1 5 0v1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className={styles.word}>kettle</span>
        </a>

        <nav className={styles.nav} aria-label="Main">
          {LINKS.map((link) => (
            <a key={link} className={styles.link} href={`#${link}`}>
              {link}
            </a>
          ))}
        </nav>

        <a
          className={styles.source}
          href="https://github.com/Siltai/design-mode-demo"
        >
          source
        </a>
      </div>
    </header>
  )
}
