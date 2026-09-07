import styles from "./ShopTabs.module.css";

export const SHOP_TABS = [
  { key: "top-brands", label: "Top Brands" },
  { key: "nearby-stores", label: "Nearby Stores" },
  { key: "marketplace", label: "1Fi Marketplace" },
];

export function ShopTabs({ activeTab, onChange }) {
  return (
    <div className={styles.tabbar} role="tablist" aria-label="Shop sections">
      {SHOP_TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
