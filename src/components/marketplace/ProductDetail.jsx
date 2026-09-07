import { useMemo, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { buildEmiPlans, getRecommendedPlan } from "../../utils/emiMath";
import { Skeleton } from "../common/Skeleton";
import { ErrorState } from "../common/ErrorState";
import { Badge } from "../common/Badge";
import { VariantSelector } from "./VariantSelector";
import { EmiPlanSelector } from "./EmiPlanSelector";
import { StickyCta } from "./StickyCta";
import { ConfirmationModal } from "./ConfirmationModal";
import styles from "./ProductDetail.module.css";

export function ProductDetail({ status, product, error, onRetry }) {
  if (status === "loading") return <DetailSkeleton />;
  if (status === "error") {
    return <ErrorState title="Couldn't load this product" message={error?.message} onRetry={onRetry} />;
  }
  if (!product) return null;
  return <DetailLoaded product={product} />;
}

function DetailLoaded({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [storageId, setStorageId] = useState(product.variants.storage[0].id);
  const [colorId, setColorId] = useState(product.variants.color[0].id);
  const [showConfirm, setShowConfirm] = useState(false);

  const storageOption = product.variants.storage.find((o) => o.id === storageId);
  const colorOption = product.variants.color.find((o) => o.id === colorId);
  const finalPrice = product.basePrice + (storageOption?.priceDelta ?? 0);

  const plans = useMemo(
    () => buildEmiPlans(finalPrice, product.emiTenuresMonths),
    [finalPrice, product.emiTenuresMonths]
  );
  const [selectedMonths, setSelectedMonths] = useState(
    () => getRecommendedPlan(plans)?.months
  );
  const selectedPlan = plans.find((p) => p.months === selectedMonths) ?? plans[0];

  const variantSummary = [storageOption?.label, colorOption?.label]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={styles.wrap}>
      <div className={styles.gallery}>
        <img src={product.images[activeImage]} alt={product.name} />
        {product.images.length > 1 && (
          <div className={styles.dots}>
            {product.images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === activeImage ? styles.dotActive : ""}`}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActiveImage(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <h2 className={styles.name}>{product.name}</h2>

        <div className={styles.ratingRow}>
          <Badge tone="neutral">★ {product.rating}</Badge>
          <span className={styles.reviewCount}>{product.reviewCount.toLocaleString("en-IN")} ratings</span>
        </div>

        <p className={styles.description}>{product.shortDescription}</p>

        <p className={`${styles.price} tabular-num`}>{formatCurrency(finalPrice)}</p>

        <VariantSelector
          label="Storage"
          options={product.variants.storage}
          selectedId={storageId}
          onSelect={setStorageId}
        />
        <VariantSelector
          label="Colour"
          options={product.variants.color}
          selectedId={colorId}
          onSelect={setColorId}
          swatchMode
        />

        <EmiPlanSelector plans={plans} selectedMonths={selectedMonths} onSelect={setSelectedMonths} />

        <div className={styles.highlights}>
          <p className={styles.highlightsTitle}>Highlights</p>
          <ul>
            {product.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {selectedPlan && (
        <StickyCta plan={selectedPlan} onProceed={() => setShowConfirm(true)} />
      )}

      {showConfirm && selectedPlan && (
        <ConfirmationModal
          product={product}
          variantSummary={variantSummary}
          plan={selectedPlan}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className={styles.wrap}>
      <Skeleton height="320px" radius="0" />
      <div className={styles.info}>
        <Skeleton height="10px" width="30%" style={{ marginBottom: 10 }} />
        <Skeleton height="20px" width="70%" style={{ marginBottom: 14 }} />
        <Skeleton height="14px" width="90%" style={{ marginBottom: 20 }} />
        <Skeleton height="24px" width="40%" style={{ marginBottom: 24 }} />
        <Skeleton height="40px" width="100%" style={{ marginBottom: 24 }} />
        <Skeleton height="80px" width="100%" />
      </div>
    </div>
  );
}
