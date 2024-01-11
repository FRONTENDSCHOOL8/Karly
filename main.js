import '/src/styles/style.css';
import '/src/styles/main.css';
import '/src/components/header/header.css';
import '/src/components/footer/footer.css';
import { getNode, css, setDocumentTitle } from '/src/lib/';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

setDocumentTitle('칼리 | 마켓칼리');

const swiperBanner = new Swiper('.swiper.banner', {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next.banner',
    prevEl: '.swiper-button-prev.banner',
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination.banner',
    type: 'fraction',
  },
});

const swiperRecommend = new Swiper('.swiper.recommend', {
  modules: [Navigation, Pagination],
  loop: false,
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 30,
  centeredSlides: false,
  navigation: {
    nextEl: '.swiper-button-next.recommend',
    prevEl: '.swiper-button-prev.recommend',
  },
});

const swiperSale = new Swiper('.swiper.sale', {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next.sale',
    prevEl: '.swiper-button-prev.sale',
  },
});

const swiperRecent = new Swiper('.swiper.recent', {
  modules: [Navigation, Pagination, Autoplay],
  direction: 'vertical',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next.recent',
    prevEl: '.swiper-button-prev.recent',
  },
});

const swiperBannerPrevBtn = getNode('.swiper-button-prev.recommend');
const swiperBannerNextBtn = getNode('.swiper-button-next.recommend');

function handleSliderBtn() {
  if (swiperBannerNextBtn.classList.contains('swiper-button-disabled')) {
    css(swiperBannerNextBtn, 'display', 'none');
  } else {
    css(swiperBannerNextBtn, 'display', 'flex');
  }

  if (swiperBannerPrevBtn.classList.contains('swiper-button-disabled')) {
    css(swiperBannerPrevBtn, 'display', 'none');
  } else {
    css(swiperBannerPrevBtn, 'display', 'flex');
  }

  // const node = e.target;
  // disableSliderBtn(node);
}

// function disableSliderBtn(node) {
//   if (node.classList.contains('swiper-button-disabled')) {
//     console.log(node + ' : if');
//     css(node, 'display', 'none');
//   } else {
//     console.log(node + ' : else');
//     css(node, 'display', 'flex');
//   }
// }

window.addEventListener('load', handleSliderBtn);
swiperBannerPrevBtn.addEventListener('click', handleSliderBtn);
swiperBannerNextBtn.addEventListener('click', handleSliderBtn);
