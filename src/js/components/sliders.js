import { Swiper } from "swiper";
import { EffectFade, FreeMode, Thumbs } from "swiper/modules";
Swiper.use([Thumbs, EffectFade, FreeMode]);
new Swiper(".partners__slider", {
  slidesPerView: "auto",
  spaceBetween: 100,
  freeMode: true,
  breakpoints: {
    320: {
      spaceBetween: 60,
    },
    577: {
      spaceBetween: 100,
    },
  },
});

new Swiper(".catalog__slider", {
  slidesPerView: 1.1,
  spaceBetween: 20,
  watchOverflow: true,
  breakpoints: {
    577: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

new Swiper(".projects__slider", {
  slidesPerView: 1.15,
  spaceBetween: 30,
  freeMode: true,
  breakpoints: {
    577: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

const prodTabs = new Swiper(".products__slider", {
  slidesPerView: "auto",
  spaceBetween: 50,

  breakpoints: {
    320: {
      spaceBetween: 30,
    },
    577: {
      spaceBetween: 50,
    },
  },
});

const prodSlider = new Swiper(".products__slider-content", {
  slidesPerView: 1,
  spaceBetween: 50,

  thumbs: {
    swiper: prodTabs,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});
