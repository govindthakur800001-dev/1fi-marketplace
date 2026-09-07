import { useState } from "react";
import { ShopTabs } from "../components/shop/ShopTabs";
import { PlaceholderPage } from "../components/shop/PlaceholderPage";
import { CategoryFilter } from "../components/marketplace/CategoryFilter";
import { ProductGrid } from "../components/marketplace/ProductGrid";
import { DebugPanel } from "../components/marketplace/DebugPanel";
import { useProducts } from "../hooks/useProducts";
import { useMarketplaceNav } from "../context/MarketplaceContext";

const isDev = import.meta.env.DEV;

export function ShopPage() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const { openProduct } = useMarketplaceNav();
  const {
    categories,
    activeCategory,
    setActiveCategory,
    products,
    status,
    error,
    retry,
  } = useProducts();

  return (
    <div>
      <ShopTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "top-brands" && <PlaceholderPage label="Top Brands" />}
      {activeTab === "nearby-stores" && <PlaceholderPage label="Nearby Stores" />}

      {activeTab === "marketplace" && (
        <div>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          {isDev && <DebugPanel onRetry={retry} />}
          <ProductGrid
            status={status}
            products={products}
            error={error}
            onRetry={retry}
            onOpenProduct={openProduct}
          />
        </div>
      )}
    </div>
  );
}
