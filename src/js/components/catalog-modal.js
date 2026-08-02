import { disableScroll } from "../functions/disable-scroll.js";
import { enableScroll } from "../functions/enable-scroll.js";

function setAccordionHeight(item, isOpen) {
  const content = item.querySelector(".catalog-accordion__content");
  const inner = item.querySelector(".catalog-accordion__inner");

  if (!content || !inner) return;

  content.style.maxHeight = isOpen ? `${inner.scrollHeight}px` : "0";
}

function initAccordion(modal) {
  const items = modal.querySelectorAll(".catalog-accordion");

  items.forEach((item) => {
    if (item.classList.contains("is-open")) {
      setAccordionHeight(item, true);
    }

    const header = item.querySelector(".catalog-accordion__header");

    header?.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        other.classList.remove("is-open");
        setAccordionHeight(other, false);
      });

      if (!isOpen) {
        item.classList.add("is-open");
        setAccordionHeight(item, true);
      }
    });
  });
}

function openCatalogModal(modal) {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  disableScroll();
}

function closeCatalogModal(modal) {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  enableScroll();
}

function initCatalogModals() {
  const modals = document.querySelectorAll(".catalog-modal");

  if (!modals.length) return;

  modals.forEach((modal) => {
    initAccordion(modal);

    const body = modal.querySelector(".catalog-modal__body");
    const closeBtn = modal.querySelector(".catalog-modal__close");

    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      closeCatalogModal(modal);
    });

    modal.addEventListener("click", () => closeCatalogModal(modal));
    body?.addEventListener("click", (e) => e.stopPropagation());
  });

  document.querySelectorAll("[data-catalog-modal]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const modalId = btn.dataset.catalogModal;
      const modal = document.querySelector(
        `.catalog-modal[data-modal-id="${modalId}"]`
      );

      if (modal) openCatalogModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    const activeModal = document.querySelector(".catalog-modal.active");

    if (activeModal) closeCatalogModal(activeModal);
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll(".catalog-accordion.is-open").forEach((item) => {
      setAccordionHeight(item, true);
    });
  });
}

initCatalogModals();
