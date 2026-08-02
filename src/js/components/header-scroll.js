function initHeaderScroll() {
  const header = document.querySelector(".header");

  if (!header) return;

  let lastScrollPosition = window.scrollY;
  let isTicking = false;

  function updateHeader() {
    const currentScrollPosition = window.scrollY;
    const scrollDifference = currentScrollPosition - lastScrollPosition;

    if (currentScrollPosition <= 0) {
      header.classList.remove("header--hidden");
      lastScrollPosition = currentScrollPosition;
    } else if (
      scrollDifference > 5 &&
      currentScrollPosition > header.offsetHeight
    ) {
      header.classList.add("header--hidden");
      lastScrollPosition = currentScrollPosition;
    } else if (scrollDifference < -5) {
      header.classList.remove("header--hidden");
      lastScrollPosition = currentScrollPosition;
    }

    isTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (isTicking) return;

      isTicking = true;
      window.requestAnimationFrame(updateHeader);
    },
    { passive: true }
  );
}

initHeaderScroll();
