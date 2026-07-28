/* Card Fan Deck — React port of vanilla/card-fan-deck.css.
   Expects cards with --i index values in markup, consumes --motion-base/--motion-fast/--ease-out-expressive, writes no custom properties, and snaps the pile/fan under reduced motion. */
import styles from "./CardFanDeck.module.css";
export interface CardFanDeckProps {
  cards: React.ReactNode[];
  fanAngle?: string;
  spread?: string;
  lift?: string;
}
export function CardFanDeck({
  cards,
  fanAngle = "28deg",
  spread = "92px",
  lift = "18px",
}: CardFanDeckProps) {
  return (
    <div
      className={styles.deck}
      style={
        {
          "--fan-angle": fanAngle,
          "--fan-spread": spread,
          "--fan-lift": lift,
          "--deck-count": cards.length,
        } as React.CSSProperties
      }
    >
      {cards.map((card, index) => (
        <article
          className={styles.card}
          style={{ "--i": index } as React.CSSProperties}
          tabIndex={0}
          key={index}
        >
          {card}
        </article>
      ))}
    </div>
  );
}
