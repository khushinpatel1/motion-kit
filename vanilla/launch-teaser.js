/* Launch Teaser — dependency-free vanilla composite.
   Structure expected: a root with class "lt-teaser ag-shell" containing
   ".lt-headline" (nested ".ctr-line" rows, per cinematic-type-reveal) and an
   optional ".dt-card" (per dimensional-tilt-card). Orchestrates the two: the
   background fades in first, then the headline reveal and card tilt mount.
   Consumes tokens.css indirectly through the CSS transition on ".lt-teaser";
   delegates to mountCinematicTypeReveal and mountDimensionalTiltCard for their
   own token usage.
   Under prefers-reduced-motion, the fade is skipped and children mount
   immediately instead of waiting on a transitionend. */

import { mountCinematicTypeReveal } from "./cinematic-type-reveal.js";
import { mountDimensionalTiltCard } from "./dimensional-tilt-card.js";

export function mountLaunchTeaser(root, { maxTilt = 6 } = {}) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const headline = root.querySelector(".lt-headline");
  const card = root.querySelector(".dt-card");
  const controllers = [];

  const reveal = () => {
    if (headline) controllers.push(mountCinematicTypeReveal(headline));
    if (card) controllers.push(mountDimensionalTiltCard(card, { maxTilt }));
  };

  if (reduced) {
    root.classList.add("is-in");
    reveal();
    return { destroy() {} };
  }

  const onEnd = (event) => {
    if (event.target !== root || event.propertyName !== "opacity") return;
    root.removeEventListener("transitionend", onEnd);
    reveal();
  };
  root.addEventListener("transitionend", onEnd);
  requestAnimationFrame(() => root.classList.add("is-in"));

  return {
    destroy() {
      root.removeEventListener("transitionend", onEnd);
      controllers.forEach((controller) => controller.destroy());
    },
  };
}
