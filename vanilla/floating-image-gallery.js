/* Floating Image Gallery — vanilla JS.
   Builds the grid + fullscreen modal from a plain data array. No dependencies.

   Usage:
     import { mountFloatingImageGallery } from "./floating-image-gallery.js";
     mountFloatingImageGallery(document.getElementById("gallery"), {
       items: [{ title, description, src, alt }, ...],
       columns: 5, // optional, default 5
     });

   Structure built: .fig-gallery > .fig-shell > .fig-glow + .fig-lift >
   .fig-card > .fig-face.fig-front/.fig-back; the sibling .fig-modal contains
   .fig-modal-close and .fig-modal-inner. Consumes tokens.css variables
   --motion-ambient, --motion-slow, --motion-base, --ease-out-soft, and
   --ease-out-expressive. Under prefers-reduced-motion, the stylesheet stops
   the idle animation and tokenized transitions resolve to zero duration.
   Designed for a 5x4 (20-item) grid of design/art plates but works with any
   count — grid-template-columns wraps naturally. */

export function mountFloatingImageGallery(root, { items, columns = 5 } = {}) {
  if (!root) throw new Error("mountFloatingImageGallery: no root element");
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error(
      "mountFloatingImageGallery: items must be a non-empty array",
    );
  }

  root.classList.add("fig-gallery");
  root.style.setProperty("--fig-columns", String(columns));
  root.innerHTML = "";

  items.forEach((item, index) => {
    const shell = document.createElement("div");
    shell.className = "fig-shell";
    // Stagger idle-float phase and amplitude per card so 20 cards don't
    // breathe in lockstep — deterministic from index, not Math.random(),
    // so the layout is stable across renders.
    const idleMagnitude = 10 + (index % 5) * 2; // 10..18
    const idleSign = index % 2 === 0 ? -1 : 1;
    shell.style.setProperty("--fig-idle-delay", String((index % 7) * 0.35));
    shell.style.setProperty("--fig-idle-amp", `${idleSign * idleMagnitude}px`);

    const title = escapeHtml(item.title || "");
    const description = escapeHtml(item.description || "");
    const alt = escapeHtml(item.alt || item.title || "");
    const src = item.src;

    shell.innerHTML = `
      <div class="fig-glow"></div>
      <div class="fig-lift">
        <button class="fig-card" type="button" aria-label="Open ${title}" data-index="${index}">
          <div class="fig-face fig-front">
            <img src="${src}" alt="${alt}" loading="lazy">
            <div class="fig-label">
              <strong>${title}</strong>
              <span>${String(index + 1).padStart(2, "0")}</span>
            </div>
          </div>
          <div class="fig-face fig-back">
            <img src="${src}" alt="" loading="lazy">
            <div class="fig-back-copy">
              <small>Selected image</small>
              <strong>${description}</strong>
              <em>Open full screen ↗</em>
            </div>
          </div>
        </button>
      </div>`;
    root.appendChild(shell);
  });

  const modal = buildModal(root);

  root.addEventListener("click", (e) => {
    const card = e.target.closest(".fig-card");
    if (card) modal.open(items[Number(card.dataset.index)], card);
  });

  return { modal };
}

function buildModal(root) {
  const modal = document.createElement("div");
  modal.className = "fig-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <button class="fig-modal-close" aria-label="Close image">×</button>
    <div class="fig-modal-inner">
      <figure class="fig-modal-figure">
        <img class="fig-modal-image" alt="">
        <figcaption class="fig-modal-caption">
          <h2 class="fig-modal-title"></h2>
          <p class="fig-modal-description"></p>
        </figcaption>
      </figure>
    </div>`;
  (root.parentElement || document.body).appendChild(modal);

  const image = modal.querySelector(".fig-modal-image");
  const titleEl = modal.querySelector(".fig-modal-title");
  const descriptionEl = modal.querySelector(".fig-modal-description");
  const closeBtn = modal.querySelector(".fig-modal-close");
  const focusable = () =>
    [
      ...modal.querySelectorAll(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
      ),
    ].filter((item) => !item.disabled);
  let previousFocus;
  let previousOverflow = "";

  function open(item, opener) {
    previousFocus = opener || document.activeElement;
    previousOverflow = document.body.style.overflow;
    modal.inert = false;
    image.src = item.src;
    image.alt = item.alt || item.title || "";
    titleEl.textContent = item.title || "";
    descriptionEl.textContent = item.description || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.inert = true;
    document.body.style.overflow = previousOverflow;
    previousFocus?.focus();
  }

  function keydown(event) {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusable();
    if (!items.length) {
      event.preventDefault();
      modal.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("fig-modal-inner"))
      close();
  });
  document.addEventListener("keydown", keydown);
  modal.inert = true;

  return { open, close };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
