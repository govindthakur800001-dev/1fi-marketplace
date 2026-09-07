import { Skeleton } from "../common/Skeleton";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";

export function ProductGrid({ status, products, error, onRetry, onOpenProduct }) {
  if (status === "loading") {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <Skeleton height="140px" radius="14px 14px 0 0" />
            <div style={{ padding: "12px" }}>
              <Skeleton height="10px" width="40%" style={{ marginBottom: 8 }} />
              <Skeleton height="14px" width="80%" style={{ marginBottom: 8 }} />
              <Skeleton height="16px" width="55%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorState
        title="Couldn't load the Marketplace"
        message={error?.message}
        onRetry={onRetry}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products here yet"
        message="Try a different category, or check back soon."
      />
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
      ))}
    </div>
  );
}
