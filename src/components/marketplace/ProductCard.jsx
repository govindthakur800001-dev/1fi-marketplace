import { formatCurrency } from "../../utils/formatCurrency";
import { buildEmiPlans } from "../../utils/emiMath";
import { Badge } from "../common/Badge";
import styles from "./ProductCard.module.css";

export function ProductCard({ product, onOpen }) {
  const plans = buildEmiPlans(product.basePrice, product.emiTenuresMonths);
  // The lowest monthly figure (longest tenure) is what earns the tap in a
  // shopping grid — the detail screen is where the full set of tenures lives.
  const cheapestMonthly = plans.reduce(
    (min, plan) => Math.min(min, plan.monthlyAmount),
    Infinity
  );

  return (
    <button type="button" className={styles.card} onClick={() => onOpen(product.id)}>
      <div className={styles.imageWrap}>
        <img src={product.heroImage} alt="" loading="lazy" />
      </div>
      <div className={styles.body}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>
          <span className="tabular-num">{formatCurrency(product.basePrice)}</span>
        </p>
        <div className={styles.footer}>
          <Badge tone="positive">0% EMI</Badge>
          <span className={styles.emiFrom}>
            from <span className="tabular-num">{formatCurrency(cheapestMonthly)}</span>/mo
          </span>
        </div>
      </div>
    </button>
  );
}
