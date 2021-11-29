import Swiper, { Navigation, Pagination } from "swiper";
import { Accordeon } from "../modules/TSI.js";

Swiper.use([Navigation, Pagination]);

export default () => {
  const spaceBetween = 30;
  const config = {
    spaceBetween,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  if (window.innerWidth > 640) {
    config.slidesPerView = 3;
    const widthOfWrap = document.querySelector(".swiper-wrapper").offsetWidth;
    const offsetOfNavBtns = widthOfWrap / 3 + spaceBetween + "px";
    document.querySelector(".swiper-button-prev").style.left = offsetOfNavBtns;
    document.querySelector(".swiper-button-next").style.right = offsetOfNavBtns;
  }
  const swiper = new Swiper(".swiper", config);

  const tsiAccordeons = document.querySelectorAll("[data-tsi-accordeon]");
  tsiAccordeons.forEach((elem) => {
    console.log({ elem, Accordeon });
    new Accordeon(elem);
  });
};
