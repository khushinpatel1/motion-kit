import type { ReactNode } from "react";
import styles from "./ShimmerText.module.css";
export interface ShimmerTextProps { children: ReactNode; }
export function ShimmerText({ children }: ShimmerTextProps) { return <span className={styles.text}>{children}</span>; }
