import styles from "./Badge.module.css";

export function Badge({ tone = "brand", children }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
