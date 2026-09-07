import { formatCurrency } from "../../utils/formatCurrency";
import styles from "./StickyCta.module.css";

export function StickyCta({ plan, onProceed }) {
  return (
    <div className={styles.bar}>
      <div className={styles.summary}>
        <span className={styles.amount}>
          <span className="tabular-num">{formatCurrency(plan.monthlyAmount)}</span>/mo
        </span>
        <span className={styles.meta}>for {plan.months} months · 0% interest</span>
      </div>
      <button type="button" className={styles.cta} onClick={onProceed}>
        Proceed with this plan
      </button>
    </div>
  );
}
