import { createContext, useContext, useMemo, useState } from "react";

/**
 * Navigation state for the Marketplace section only (list vs. product
 * detail). Deliberately not a full router: the assignment's scope is one
 * section of one page, and pulling in react-router for two screens would
 * be over-engineering. If the Marketplace grows more screens (cart,
 * order tracking, etc.), this is the seam to swap in a real router
 * without touching any screen component's internals.
 */
const MarketplaceNavContext = createContext(null);

export function MarketplaceNavProvider({ children }) {
  const [screen, setScreen] = useState({ name: "list" });

  const value = useMemo(
    () => ({
      screen,
      openProduct: (productId) => setScreen({ name: "detail", productId }),
      goToList: () => setScreen({ name: "list" }),
    }),
    [screen]
  );

  return (
    <MarketplaceNavContext.Provider value={value}>
      {children}
    </MarketplaceNavContext.Provider>
  );
}

export function useMarketplaceNav() {
  const ctx = useContext(MarketplaceNavContext);
  if (!ctx) {
    throw new Error("useMarketplaceNav must be used within MarketplaceNavProvider");
  }
  return ctx;
}
