import { EmiPlanCard } from "./EmiPlanCard";
import styles from "./EmiPlanSelector.module.css";

export function EmiPlanSelector({ plans, selectedMonths, onSelect }) {
  return (
    <div className={styles.group}>
      <p className={styles.label}>Choose your EMI plan</p>
      <div className={styles.row}>
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.months}
            plan={plan}
            isSelected={plan.months === selectedMonths}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
