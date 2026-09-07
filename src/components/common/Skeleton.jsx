import styles from "./Skeleton.module.css";

/**
 * A single reusable shimmer block. Compose it (see ProductGrid's skeleton
 * grid) rather than building bespoke skeletons per screen.
 */
export function Skeleton({ width = "100%", height = "1em", radius = "8px", style }) {
  return (
    <span
      className={styles.skeleton}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  );
}
