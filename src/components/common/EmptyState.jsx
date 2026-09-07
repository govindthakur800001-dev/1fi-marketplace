import styles from "./ErrorState.module.css";

export function EmptyState({ title, message }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
