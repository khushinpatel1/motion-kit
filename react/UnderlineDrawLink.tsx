/* Underline Draw Link — React form. Expects an anchor with .link and its real children; consumes --motion-fast/--ease-out-soft and writes no custom properties. Reduced motion relies on tokens.css collapsing durations to 0ms. */
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./UnderlineDrawLink.module.css";

export interface UnderlineDrawLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  underlineColor?: string;
  thickness?: string;
}
export function UnderlineDrawLink({
  children,
  underlineColor,
  thickness,
  style,
  ...props
}: UnderlineDrawLinkProps) {
  return (
    <a
      {...props}
      className={`${styles.link} ${props.className || ""}`}
      style={
        {
          ...style,
          ...(underlineColor ? { "--udl-color": underlineColor } : {}),
          ...(thickness ? { "--udl-thickness": thickness } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </a>
  );
}
