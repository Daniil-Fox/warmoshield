import "./_components.js";

const modal = document.querySelector(".modal");

if (modal) {
  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = modal.querySelector(".modal__close");
  const modalBody = modal.querySelector(".modal__body");
  modalBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      modal.classList.add("active");
    });
  });

  modalClose.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("active");
  });
  modal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("active");
  });
  modalBody.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
