function openComparisonModal(modal) {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeComparisonModal(modal) {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initComparisonModals() {
  const modals = document.querySelectorAll(".comparison-modal");

  if (!modals.length) return;

  modals.forEach((modal) => {
    const body = modal.querySelector(".comparison-modal__body");
    const closeButton = modal.querySelector(".comparison-modal__close");
    const tabs = modal.querySelectorAll("[data-comparison-tab]");
    const panels = modal.querySelectorAll("[data-comparison-panel]");

    closeButton?.addEventListener("click", () => closeComparisonModal(modal));
    modal.addEventListener("click", () => closeComparisonModal(modal));
    body?.addEventListener("click", (event) => event.stopPropagation());

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((item) => {
          const isActive = item === tab;

          item.classList.toggle("active", isActive);
          item.setAttribute("aria-selected", String(isActive));
        });

        panels.forEach((panel) => {
          const isActive =
            panel.dataset.comparisonPanel === tab.dataset.comparisonTab;

          panel.classList.toggle("active", isActive);
          panel.hidden = !isActive;
        });
      });
    });
  });

  document.querySelectorAll("[data-comparison-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(
        `.comparison-modal[data-comparison-id="${button.dataset.comparisonModal}"]`
      );

      if (modal) openComparisonModal(modal);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const activeModal = document.querySelector(".comparison-modal.active");

    if (activeModal) closeComparisonModal(activeModal);
  });
}

initComparisonModals();
