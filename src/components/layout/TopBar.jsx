import styles from "./TopBar.module.css";

export function TopBar({ title, onBack }) {
  return (
    <header className={styles.bar}>
      {onBack ? (
        <button type="button" className={styles.backButton} onClick={onBack} aria-label="Go back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <span className={styles.logo}>1Fi</span>
      )}
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.spacer} aria-hidden="true" />
    </header>
  );
}
