# 1Fi Marketplace

A new **1Fi Marketplace** section for the Shop page of the 1Fi app, built for the
SDE Intern Assignment. The Shop page gets three tabs — **Top Brands** and
**Nearby Stores** are intentionally left as blank placeholders per the brief;
**1Fi Marketplace** is fully designed and implemented.

## Why it looks the way it does

1Fi's real product is a mutual-fund-backed, no-cost (0% interest) EMI
platform — I looked at the live app/site before designing anything, and
grounded the UI in what's actually there rather than a generic e‑commerce
template:

- **Brand colour** `#6C28D9` — taken directly from 1Fi's own site (`theme-color`
  meta tag), used sparingly as the one accent colour, not a background wash.
- **A separate green** is reserved only for the "0% interest / no-cost EMI"
  signal, since that's the product's core promise and deserves to stand apart
  from the brand accent.
- **Bottom tab bar** mirrors the real app's navigation (`Home / Shop / EMI /
  Dues / Profile`, as seen on `app.1fi.in/shop`) — only **Shop** is
  interactive, the rest are visibly present but disabled, since a Marketplace
  screen that ignores its own app's chrome would feel bolted on.
- **Product catalogue** uses the phones/laptops/two-wheelers 1Fi actually
  finances (iPhone, Galaxy, Pixel, MacBook, OnePlus, Royal Enfield) instead of
  placeholder "Product A/B/C" data.

## Architecture

```
src/
├── api/                 # The only place that knows about "the network"
│   ├── client.js        #   simulated latency + on-demand failure injection
│   ├── productsApi.js   #   fetchProducts / fetchProductById / fetchCategories
│   └── mockData/        #   the fake backend's "database"
├── hooks/                # Own request lifecycle (loading/error/success) per screen
│   ├── useProducts.js
│   └── useProductDetail.js
├── context/
│   └── MarketplaceContext.jsx   # list ↔ detail navigation, without a router dep
├── utils/
│   ├── emiMath.js        # pure functions: 0%-interest EMI split, no React
│   └── formatCurrency.js
├── components/
│   ├── common/            # Skeleton, ErrorState, EmptyState, Badge — reused everywhere
│   ├── layout/             # AppShell, TopBar, BottomNav
│   ├── shop/               # ShopTabs, PlaceholderPage (Top Brands / Nearby Stores)
│   └── marketplace/        # Everything specific to the Marketplace feature
└── pages/
    ├── ShopPage.jsx
    └── ProductDetailPage.jsx
```

### Data & API design

Nothing is hardcoded into a component. Every screen goes through a hook
(`useProducts`, `useProductDetail`) that calls a function in `productsApi.js`,
which in turn goes through `client.js` — the single seam that currently
returns mock JSON but simulates real network latency (700ms) and can be made
to fail on demand. **Swapping mock data for a real backend later is a
one-file change** (`productsApi.js`) — no component or hook needs to change,
because they only depend on the shape of the response, not where it comes
from.

### State management

- **Server-ish state** (products, product detail) lives in hooks, each
  exposing `{ data, status, error, retry }` — a small, consistent
  loading/error/success pattern used identically on both screens.
- **Screen-local state** (selected storage/colour/EMI tenure, which image is
  showing, whether the confirmation sheet is open) lives in `ProductDetail`
  itself with `useState`, because it's genuinely local to that one screen —
  lifting it further up would just be prop-drilling for no benefit.
- **Cross-cutting navigation** (list vs. detail) is the one thing put in
  Context, since `TopBar`'s back button needs it without being a child of
  `ShopPage`. A full router (react-router) was deliberately skipped — the
  Marketplace is two screens today, and adding a router dependency for two
  screens would be over-engineering; the seam is there if it grows a cart or
  order-tracking screen later.

### Error & loading states

Every request-driven screen renders one of: **skeleton loading** → **error
state with a retry button** → **empty state** (no products in a category) →
**loaded content**. In dev builds, a small "Dev tools" panel on the
Marketplace tab lets you trigger the failed-load state on demand
(`Simulate failed load`) so this is easy to verify without throttling your
network by hand.

### Component reusability

- `VariantSelector` renders *any* variant axis a product defines (storage,
  colour, ...) — driven entirely by the product's own data shape, so a new
  axis needs a data change, not a component change.
- `Skeleton` is a single primitive composed into different loading shapes per
  screen, instead of one bespoke skeleton component per screen.
- `PlaceholderPage` is shared by both "Top Brands" and "Nearby Stores" since
  they have identical (empty) requirements.

## Requirements checklist

- [x] Product listing (grid, with category filter)
- [x] Product image (gallery with multiple images on the detail screen)
- [x] Product name, brand, rating
- [x] Product pricing (base price + variant price deltas)
- [x] Product variants (storage, colour — generic to any axis)
- [x] EMI options/plans (dynamically computed 0%-interest tenures)
- [x] Relevant product details (highlights, description)
- [x] Ability to select an EMI plan
- [x] CTA to proceed with the selected plan (sticky bar → confirmation sheet)
- [x] Data retrieved dynamically via a mock API layer, not hardcoded in UI
- [x] Loading, error, and empty states throughout

## Running it locally

```bash
npm install
npm run dev
```

Then open the printed local URL — the app is sized to a phone viewport
since this is a mobile app screen, not a responsive web page (it does still
scale down gracefully on narrow real-device viewports).

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## What I'd do next with more time / a real backend

- Wire the "Pledge mutual funds" step referenced in the confirmation sheet —
  today it's explicitly out of scope and called out in copy rather than
  faked.
- Add automated tests for `emiMath.js` (it's pure and has no React
  dependency, so it's the cheapest, highest-value place to start).
- Replace the Context-based nav with `react-router` if the Marketplace grows
  more than two screens (cart, order tracking, etc).
- Add pagination/infinite scroll to `fetchProducts` once the catalogue is
  larger than fits on one screen.
