import styles from "./PlaceholderPage.module.css";

/**
 * Per the assignment, "Top Brands" and "Nearby Stores" need no
 * implementation and can stay blank. Rather than leaving a literally
 * empty screen (which reads as broken rather than intentional), this
 * shows a plain "coming soon" placeholder — one component reused for
 * both tabs, since they have identical requirements.
 */
export function PlaceholderPage({ label }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>{label}</p>
      <p className={styles.hint}>Coming soon</p>
    </div>
  );
}
