/* Liquid Mode Toggle — React port of vanilla/liquid-mode-toggle.js/.css. Renders a real aria-pressed button; defaultPressed/onChange own state, while reduced motion affects only CSS timing. */
import { useState } from "react";
import styles from "./LiquidModeToggle.module.css";
export interface LiquidModeToggleProps {
  defaultPressed?: boolean;
  onChange?: (pressed: boolean) => void;
}
export function LiquidModeToggle({
  defaultPressed = false,
  onChange,
}: LiquidModeToggleProps) {
  const [pressed, setPressed] = useState(defaultPressed);
  const toggle = () => {
    const next = !pressed;
    setPressed(next);
    onChange?.(next);
  };
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={pressed}
      aria-label="Toggle mode"
      onClick={toggle}
    />
  );
}
