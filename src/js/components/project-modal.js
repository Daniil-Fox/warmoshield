import { Swiper } from "swiper";
import { Thumbs } from "swiper/modules";
import { disableScroll } from "../functions/disable-scroll.js";
import { enableScroll } from "../functions/enable-scroll.js";

Swiper.use([Thumbs]);

function openProjectModal(modal) {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  disableScroll();

  requestAnimationFrame(() => {
    modal.querySelectorAll(".swiper").forEach((slider) => {
      slider.swiper?.update();
    });
  });
}

function closeProjectModal(modal) {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  enableScroll();
}

function initProjectModals() {
  const modals = document.querySelectorAll(".project-modal");

  if (!modals.length) return;

  modals.forEach((modal) => {
    const body = modal.querySelector(".project-modal__body");
    const closeBtn = modal.querySelector(".project-modal__close");
    const thumbsElement = modal.querySelector(".project-modal__thumbs");
    const mainSliderElement = modal.querySelector(".project-modal__main-slider");

    const thumbs = new Swiper(thumbsElement, {
      slidesPerView: "auto",
      watchSlidesProgress: true,
    });

    new Swiper(mainSliderElement, {
      slidesPerView: 1.08,
      spaceBetween: 15,
      breakpoints: {
        577: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
      thumbs: {
        swiper: thumbs,
      },
    });

    closeBtn?.addEventListener("click", () => closeProjectModal(modal));
    modal.addEventListener("click", () => closeProjectModal(modal));
    body?.addEventListener("click", (event) => event.stopPropagation());
  });

  document.querySelectorAll("[data-project-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(
        `.project-modal[data-modal-id="${button.dataset.projectModal}"]`
      );

      if (modal) openProjectModal(modal);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const activeModal = document.querySelector(".project-modal.active");

    if (activeModal) closeProjectModal(activeModal);
  });
}

initProjectModals();
