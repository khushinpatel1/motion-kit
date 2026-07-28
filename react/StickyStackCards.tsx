/* Sticky Stack Cards — React port of vanilla/sticky-stack-cards.css.
   Structure expected: this component renders .stack containing one sticky .card per React node in cards; scaleFloor and pinOffset are props.
   Consumes tokens.css variable --motion-slow through the module stylesheet; React writes --scale-floor and --pin-offset.
   Under prefers-reduced-motion, cards remain pinned and the compression animation is removed. */
import { type CSSProperties, type ReactNode } from "react";
import styles from "./StickyStackCards.module.css";
export interface StickyStackCardsProps {
  cards: ReactNode[];
  scaleFloor?: number;
  pinOffset?: string;
}
export function StickyStackCards({
  cards,
  scaleFloor = 0.92,
  pinOffset = "24px",
}: StickyStackCardsProps) {
  return (
    <div
      className={styles.stack}
      style={
        {
          "--scale-floor": scaleFloor,
          "--pin-offset": pinOffset,
        } as CSSProperties
      }
    >
      {cards.map((card, index) => (
        <article className={styles.card} key={index}>
          {card}
        </article>
      ))}
    </div>
  );
}
