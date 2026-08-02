function setFactoryPanelHeight(item, isOpen) {
  const panel = item.querySelector(".factories__panel");
  const inner = item.querySelector(".factories__panel-inner");

  if (!panel || !inner) return;

  panel.style.maxHeight = isOpen ? `${inner.scrollHeight}px` : "0";
}

function initFactoriesAccordion() {
  const accordions = document.querySelectorAll(".factories__accordion");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".factories__item");

    items.forEach((item) => {
      const button = item.querySelector(".factories__button");

      if (item.classList.contains("active")) {
        setFactoryPanelHeight(item, true);
      }

      button?.addEventListener("click", () => {
        if (item.classList.contains("active")) return;

        items.forEach((otherItem) => {
          const otherButton = otherItem.querySelector(".factories__button");

          otherItem.classList.remove("active");
          otherButton?.setAttribute("aria-expanded", "false");
          setFactoryPanelHeight(otherItem, false);
        });

        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        setFactoryPanelHeight(item, true);
      });
    });
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll(".factories__item.active").forEach((item) => {
      setFactoryPanelHeight(item, true);
    });
  });
}

initFactoriesAccordion();
