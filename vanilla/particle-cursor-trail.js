/* Particle Cursor Trail — dependency-free vanilla form.
   Structure expected: no hand-written markup; the mount function appends .pct-canvas to document.body. Pass { color, maxParticles }.
   Consumes no tokens.css variables; work is bounded by maxParticles and a requestAnimationFrame loop.
   Under prefers-reduced-motion, the canvas is appended but no loop or pointer listeners start. */

export function mountParticleCursorTrail({
  color = "#a7f3d0",
  maxParticles = 80,
} = {}) {
  const canvas = document.createElement("canvas");
  canvas.className = "pct-canvas";
  document.body.append(canvas);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced)
    return {
      destroy() {
        canvas.remove();
      },
    };
  const context = canvas.getContext("2d");
  let frame = 0;
  let running = true;
  const particles = [];
  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  const move = (e) => {
    for (let i = 0; i < 3; i += 1)
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: 2 + Math.random() * 4,
        life: 1,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
      });
    if (particles.length > maxParticles)
      particles.splice(0, particles.length - maxParticles);
  };
  const draw = () => {
    if (!running) return;
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.025;
      if (!Number.isFinite(p.life) || p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      const radius = p.size * p.life;
      if (!Number.isFinite(radius) || radius <= 0) {
        particles.splice(i, 1);
        continue;
      }
      context.globalAlpha = p.life;
      context.fillStyle = color;
      context.beginPath();
      context.arc(p.x, p.y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
    frame = requestAnimationFrame(draw);
  };
  resize();
  addEventListener("resize", resize);
  addEventListener("pointermove", move);
  frame = requestAnimationFrame(draw);
  return {
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      canvas.remove();
    },
  };
}
