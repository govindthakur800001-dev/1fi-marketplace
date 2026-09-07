import styles from "./AppShell.module.css";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

export function AppShell({ title, onBack, children }) {
  return (
    <div className={styles.phone}>
      <TopBar title={title} onBack={onBack} />
      <main className={styles.content}>{children}</main>
      <BottomNav />
    </div>
  );
}
