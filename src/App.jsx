import { AppShell } from "./components/layout/AppShell";
import { MarketplaceNavProvider, useMarketplaceNav } from "./context/MarketplaceContext";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";

function Screens() {
  const { screen, goToList } = useMarketplaceNav();

  if (screen.name === "detail") {
    return (
      <AppShell title="Product details" onBack={goToList}>
        <ProductDetailPage productId={screen.productId} />
      </AppShell>
    );
  }

  return (
    <AppShell title="Shop">
      <ShopPage />
    </AppShell>
  );
}

export default function App() {
  return (
    <MarketplaceNavProvider>
      <Screens />
    </MarketplaceNavProvider>
  );
}
