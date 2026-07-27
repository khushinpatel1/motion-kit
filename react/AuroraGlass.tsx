import type { ReactNode } from "react";
import styles from "./AuroraGlass.module.css";
export interface AuroraGlassProps { title?: string; children?: ReactNode; }
export function AuroraGlass({ title = "Aurora glass", children }: AuroraGlassProps) { return <section className={styles.shell}><h3>{title}</h3>{children ?? <p>Foreground content over a living gradient field.</p>}</section>; }
