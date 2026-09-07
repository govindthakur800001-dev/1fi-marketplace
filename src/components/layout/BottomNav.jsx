import styles from "./BottomNav.module.css";

// Mirrors the real 1Fi app's tab bar (app.1fi.in/shop uses Home / Shop /
// EMI / Dues / Limit / Profile). Only "Shop" is interactive here since
// every other tab is out of scope for this assignment — but keeping them
// visible (and disabled) is what makes the Marketplace feel like it lives
// inside the real app instead of a standalone demo.
const TABS = [
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "shop", label: "Shop", icon: ShopIcon },
  { key: "emi", label: "EMI", icon: EmiIcon },
  { key: "dues", label: "Dues", icon: DuesIcon },
  { key: "profile", label: "Profile", icon: ProfileIcon },
];

export function BottomNav({ active = "shop" }) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {TABS.map(({ key, label, icon: Icon }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            disabled={!isActive}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon active={isActive} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function iconProps(active) {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: active ? "var(--color-brand-600)" : "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

function HomeIcon({ active }) {
  return (
    <svg {...iconProps(active)}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
    </svg>
  );
}

function ShopIcon({ active }) {
  return (
    <svg {...iconProps(active)}>
      <path d="M4 8l1.5-4h13L20 8" />
      <path d="M4 8h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V8z" />
      <path d="M9 12a3 3 0 006 0" />
    </svg>
  );
}

function EmiIcon({ active }) {
  return (
    <svg {...iconProps(active)}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 14h4" />
    </svg>
  );
}

function DuesIcon({ active }) {
  return (
    <svg {...iconProps(active)}>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M9 10h6M9 14h6M9 18h3" />
    </svg>
  );
}

function ProfileIcon({ active }) {
  return (
    <svg {...iconProps(active)}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  );
}
