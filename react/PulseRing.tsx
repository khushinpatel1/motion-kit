/* Pulse Ring — React port of vanilla/pulse-ring.css. Renders an aria-hidden .indicator beside a visible label; reduced motion leaves a static status dot. */
import styles from "./PulseRing.module.css";
export interface PulseRingProps {
  label?: string;
}
export function PulseRing({ label = "Live" }: PulseRingProps) {
  return (
    <span className={styles.status}>
      <span className={styles.indicator} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
