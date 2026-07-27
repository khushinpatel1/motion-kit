/* Marquee Logo Strip — React port of vanilla/marquee-logo-strip.css. Renders duplicated groups for the loop; reduced motion is handled by the module stylesheet. */
import styles from "./MarqueeLogoStrip.module.css";
export interface MarqueeLogoStripProps {
  items?: string[];
}
export function MarqueeLogoStrip({
  items = ["Verdant", "Garden", "Motion Kit", "Studio"],
}: MarqueeLogoStripProps) {
  const group = (
    <div className={styles.group}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        {group}
        {group}
      </div>
    </div>
  );
}
