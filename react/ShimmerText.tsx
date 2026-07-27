/* Shimmer Text — React port of vanilla/shimmer-text.css. Renders children in .text; use short display text, and reduced motion stops the sweep. */
import type { ReactNode } from "react";
import styles from "./ShimmerText.module.css";
export interface ShimmerTextProps {
  children: ReactNode;
}
export function ShimmerText({ children }: ShimmerTextProps) {
  return <span className={styles.text}>{children}</span>;
}
