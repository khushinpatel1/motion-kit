import { useEffect } from "react";
import styles from "./ParticleCursorTrail.module.css";

export interface ParticleCursorTrailProps { color?: string; }

export function ParticleCursorTrail({ color = "#a7f3d0" }: ParticleCursorTrailProps) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.className = styles.canvas;
    document.body.append(canvas);
    const context = canvas.getContext("2d");
    if (!context) return () => canvas.remove();
    let frame = 0;
    let running = true;
    const particles: { x: number; y: number; life: number }[] = [];
    const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
    const move = (event: PointerEvent) => { particles.push({ x: event.clientX, y: event.clientY, life: 1 }); if (particles.length > 80) particles.shift(); };
    const draw = () => { if (!running) return; context.clearRect(0, 0, innerWidth, innerHeight); particles.forEach((particle) => { particle.life -= .025; context.globalAlpha = particle.life; context.fillStyle = color; context.beginPath(); context.arc(particle.x, particle.y, 4 * particle.life, 0, Math.PI * 2); context.fill(); }); context.globalAlpha = 1; frame = requestAnimationFrame(draw); };
    resize(); addEventListener("resize", resize); addEventListener("pointermove", move); frame = requestAnimationFrame(draw);
    return () => { running = false; cancelAnimationFrame(frame); removeEventListener("resize", resize); removeEventListener("pointermove", move); canvas.remove(); };
  }, [color]);
  return null;
}
