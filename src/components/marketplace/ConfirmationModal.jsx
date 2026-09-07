import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import styles from "./ConfirmationModal.module.css";

/**
 * There's no real checkout backend for this assignment, so this models
 * the shape a real one would have — a submitting state, then success —
 * rather than instantly flashing a toast. It's the same request lifecycle
 * pattern used everywhere else in the app (loading → success/error),
 * applied to a write instead of a read.
 */
export function ConfirmationModal({ product, variantSummary, plan, onClose }) {
  const [phase, setPhase] = useState("review"); // "review" | "submitting" | "done"

  function handleConfirm() {
    setPhase("submitting");
    setTimeout(() => setPhase("done"), 900);
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.sheet}>
        {phase !== "done" ? (
          <>
            <p className={styles.title}>Confirm your plan</p>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Product</span>
              <span className={styles.rowValue}>
                {product.name} · {variantSummary}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>EMI tenure</span>
              <span className={styles.rowValue}>{plan.months} months</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Monthly amount</span>
              <span className={`${styles.rowValue} tabular-num`}>
                {formatCurrency(plan.monthlyAmount)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Total payable</span>
              <span className={`${styles.rowValue} tabular-num`}>
                {formatCurrency(plan.totalPayable)}
              </span>
            </div>
            <p className={styles.fineprint}>
              No downpayment · 0% interest · Pledge mutual fund units in the next step.
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.secondary} onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.primary}
                onClick={handleConfirm}
                disabled={phase === "submitting"}
              >
                {phase === "submitting" ? "Processing…" : "Confirm & continue"}
              </button>
            </div>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successIcon} aria-hidden="true">
              ✓
            </div>
            <p className={styles.title}>Plan selected</p>
            <p className={styles.fineprint}>
              Next, you'd pledge mutual fund units to unlock this EMI — that flow lives
              outside the Marketplace section.
            </p>
            <button type="button" className={styles.primary} onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
