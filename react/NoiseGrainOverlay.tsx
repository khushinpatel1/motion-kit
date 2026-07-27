import type { ReactNode } from "react";
import styles from "./NoiseGrainOverlay.module.css";
export interface NoiseGrainOverlayProps { children?: ReactNode; }
export function NoiseGrainOverlay({ children }: NoiseGrainOverlayProps) { return <div className={styles.surface}>{children}<span className={styles.overlay} aria-hidden="true"/></div>; }
