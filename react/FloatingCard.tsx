/* Floating Card — React port of vanilla/floating-card.css. Renders .card with title and children; reduced motion is handled by the module stylesheet. */
import type { ReactNode } from "react";
import styles from "./FloatingCard.module.css";
export interface FloatingCardProps {
  title?: string;
  children?: ReactNode;
}
export function FloatingCard({
  title = "Floating card",
  children,
}: FloatingCardProps) {
  return (
    <article className={styles.card}>
      <strong>{title}</strong>
      {children ?? <span>Ambient surface</span>}
    </article>
  );
}
