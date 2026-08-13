/* Floating Image Gallery — vanilla JavaScript.
   Clean-room re-derived from a behaviour specification on 2026-08-13; no
   outside reference was consulted for this implementation. The public mount
   function accepts the existing items/columns options and builds the grid. */

const focusableSelector =
  "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])";

export function mountFloatingImageGallery(
  root,
  { items = [], columns = 5 } = {},
) {
  if (!root || !Array.isArray(items) || items.length === 0) {
    return { destroy() {} };
  }

  const gridColumns = Math.max(
    1,
    Math.min(Math.floor(columns) || 1, Math.max(items.length, 1)),
  );
  const cards = [];
  const shells = [];
  let activeIndex = 0;
  let opener = null;
  let previousOverflow = "";

  root.replaceChildren();
  root.classList.add("fig-gallery");
  root.setAttribute("role", "grid");
  root.setAttribute("aria-label", "Image gallery");
  root.style.setProperty("--fig-columns", String(gridColumns));

  const setActive = (index) => {
    activeIndex = index;
    cards.forEach((card, cardIndex) => {
      card.tabIndex = cardIndex === activeIndex ? 0 : -1;
    });
  };

  const move = (index, direction) => {
    const lastIndex = items.length - 1;
    let nextIndex = index;
    if (direction === "left" && index > 0) nextIndex = index - 1;
    if (direction === "right" && index < lastIndex) nextIndex = index + 1;
    if (direction === "up" && index - gridColumns >= 0) {
      nextIndex = index - gridColumns;
    }
    if (direction === "down" && index + gridColumns <= lastIndex) {
      nextIndex = index + gridColumns;
    }
    setActive(nextIndex);
    if (nextIndex !== index) cards[nextIndex].focus();
  };

  items.forEach((item, index) => {
    const shell = document.createElement("div");
    shell.className = "fig-shell";
    shell.setAttribute("role", "gridcell");
    shell.setAttribute(
      "aria-rowindex",
      String(Math.floor(index / gridColumns) + 1),
    );
    shell.setAttribute("aria-colindex", String((index % gridColumns) + 1));

    const card = document.createElement("button");
    card.className = "fig-card";
    card.type = "button";
    card.tabIndex = index === 0 ? 0 : -1;
    card.dataset.figIndex = String(index);
    card.setAttribute(
      "aria-label",
      item.alt || item.title || `Image ${index + 1}`,
    );
    card.setAttribute("aria-posinset", String(index + 1));
    card.setAttribute("aria-setsize", String(items.length));

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt || "";
    image.loading = "lazy";

    const label = document.createElement("span");
    label.className = "fig-label";
    const title = document.createElement("span");
    title.className = "fig-title";
    title.textContent = item.title;
    label.append(title);
    if (item.description) {
      const description = document.createElement("span");
      description.className = "fig-description";
      description.textContent = item.description;
      label.append(description);
    }
    card.append(image, label);
    shell.append(card);
    root.append(shell);
    cards.push(card);
    shells.push(shell);

    card.addEventListener("focus", () => setActive(index));
    card.addEventListener("keydown", (event) => {
      const direction = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      }[event.key];
      if (!direction) return;
      event.preventDefault();
      move(index, direction);
    });
    card.addEventListener("click", () => open(index));
    shell.addEventListener("pointerenter", () => {
      shells.forEach((itemShell) => itemShell.removeAttribute("data-raised"));
      shell.dataset.raised = "true";
    });
    shell.addEventListener("pointerleave", () => {
      shell.removeAttribute("data-raised");
    });
  });

  const dialog = document.createElement("dialog");
  dialog.className = "fig-modal";
  dialog.setAttribute("aria-modal", "true");
  dialog.tabIndex = -1;
  const modalInner = document.createElement("div");
  modalInner.className = "fig-modal-inner";
  const closeButton = document.createElement("button");
  closeButton.className = "fig-modal-close";
  closeButton.type = "button";
  closeButton.textContent = "Close image";
  const modalImage = document.createElement("img");
  const modalCopy = document.createElement("div");
  modalCopy.className = "fig-modal-copy";
  const modalTitle = document.createElement("h2");
  const modalDescription = document.createElement("p");
  modalCopy.append(modalTitle, modalDescription);
  modalInner.append(closeButton, modalImage, modalCopy);
  dialog.append(modalInner);
  root.append(dialog);

  const close = () => {
    if (!dialog.open) return;
    dialog.close();
    document.body.style.overflow = previousOverflow;
    const source = opener;
    opener = null;
    if (source?.isConnected) source.focus();
  };

  function open(index) {
    const item = items[index];
    if (!item) return;
    opener = cards[index];
    modalImage.src = item.src;
    modalImage.alt = item.alt || item.title || `Image ${index + 1}`;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description || "";
    modalDescription.hidden = !item.description;
    dialog.showModal();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  const cancel = (event) => {
    event.preventDefault();
    close();
  };
  const backdropClick = (event) => {
    if (event.target === dialog) close();
  };
  const modalKeydown = (event) => {
    if (event.key !== "Tab" || !dialog.open) return;
    const focusable = [...dialog.querySelectorAll(focusableSelector)].filter(
      (item) => !item.disabled,
    );
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  closeButton.addEventListener("click", close);
  dialog.addEventListener("cancel", cancel);
  dialog.addEventListener("click", backdropClick);
  dialog.addEventListener("keydown", modalKeydown);

  return {
    open,
    close,
    destroy() {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = previousOverflow;
      }
      closeButton.removeEventListener("click", close);
      dialog.removeEventListener("cancel", cancel);
      dialog.removeEventListener("click", backdropClick);
      dialog.removeEventListener("keydown", modalKeydown);
      root.replaceChildren();
    },
  };
}
