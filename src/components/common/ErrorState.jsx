import styles from "./ErrorState.module.css";

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this right now.",
  onRetry,
}) {
  return (
    <div className={styles.wrap} role="alert">
      <div className={styles.icon} aria-hidden="true">
        !
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
