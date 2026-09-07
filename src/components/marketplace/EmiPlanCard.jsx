import { formatCurrency } from "../../utils/formatCurrency";
import styles from "./EmiPlanCard.module.css";

export function EmiPlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(plan.months)}
      aria-pressed={isSelected}
    >
      <span className={styles.tenure}>{plan.months} months</span>
      <span className={`${styles.amount} tabular-num`}>
        {formatCurrency(plan.monthlyAmount)}
        <span className={styles.unit}>/mo</span>
      </span>
      <span className={styles.interest}>0% interest</span>
    </button>
  );
}
