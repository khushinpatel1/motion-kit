import styles from "./PulseRing.module.css";
export interface PulseRingProps { label?: string; }
export function PulseRing({ label = "Live" }: PulseRingProps) { return <span className={styles.status}><span className={styles.indicator} aria-hidden="true"/><span>{label}</span></span>; }
