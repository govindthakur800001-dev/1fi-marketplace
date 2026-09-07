import styles from "./CategoryFilter.module.css";

export function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className={styles.row} role="tablist" aria-label="Product categories">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.chip} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
