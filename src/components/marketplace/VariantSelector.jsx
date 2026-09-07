import styles from "./VariantSelector.module.css";

/**
 * Generic enough to render any variant axis a product defines (storage,
 * color, size, ...) — the product data drives the axis label and options,
 * so adding a new axis to mock data needs no component changes.
 */
export function VariantSelector({ label, options, selectedId, onSelect, swatchMode = false }) {
  return (
    <div className={styles.group}>
      <p className={styles.label}>{label}</p>
      <div className={styles.options}>
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          if (swatchMode) {
            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.swatch} ${isSelected ? styles.swatchSelected : ""}`}
                style={{ background: option.swatch }}
                onClick={() => onSelect(option.id)}
                aria-pressed={isSelected}
                aria-label={option.label}
                title={option.label}
              />
            );
          }
          return (
            <button
              key={option.id}
              type="button"
              className={`${styles.pill} ${isSelected ? styles.pillSelected : ""}`}
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
            >
              {option.label}
              {option.priceDelta > 0 && (
                <span className={styles.delta}> +₹{option.priceDelta.toLocaleString("en-IN")}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
