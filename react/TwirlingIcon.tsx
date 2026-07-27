/* Twirling Icon — React port of vanilla/twirling-icon.css. Renders an aria-labelled .icon with an aria-hidden inline SVG; reduced motion stops its spin. */
import styles from "./TwirlingIcon.module.css";
export interface TwirlingIconProps {
  label?: string;
}
export function TwirlingIcon({
  label = "Twirling sparkle",
}: TwirlingIconProps) {
  return (
    <span className={styles.icon} role="img" aria-label={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 1 1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-2.8L12 1Z" />
      </svg>
    </span>
  );
}
