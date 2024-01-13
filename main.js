import pb from '/src/api/pocketbase';
import '/src/components/footer/footer.css';
import '/src/components/header/header.css';
import '/src/styles/main.css';
import '/src/styles/style.css';

import {
  css,
  defaultAuthData,
  defaultViewData,
  deleteStorage,
  getNode,
  getNodes,
  getStorage,
  setDocumentTitle,
  setStorage,
  renderRecommendCard,
  renderSaleCard,
  renderRecentCard,
} from '/src/lib';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

setDocumentTitle('칼리 | 마켓칼리');

/* 로그인 상태 확인 */
if (await getStorage('pocketbase_auth')) {
  const { model } = await getStorage('pocketbase_auth');
  const welcome = getNodes('.header_member_service li a');
  welcome[0].textContent = `${model.name} 님`;
  ('welcome');
  welcome[0].style.color = 'var(--black)';
  welcome[0].style.fontWeight = '700';
  welcome[1].textContent = '로그아웃';
  welcome[1].href = '/src/pages/main/';
  welcome[1].addEventListener('click', function () {
    pb.authStore.clear();
    deleteStorage('pocketbase_auth');
    setStorage('view', defaultViewData);
    setStorage('auth', defaultAuthData);
  });
}

// localStorage에 최근 본 상품 목록 정보가 없으면 view 초기화
if (!localStorage.getItem('view')) {
  setStorage('view', defaultViewData);
}
const getViewData = await getStorage('view');

let idArray = getViewData.id;
let viewDataArray = [];

/* RenderCarouselsData */
async function renderCarousel() {
  const productData = await pb.collection('products').getFullList();
  // console.log(productData);

  productData.forEach((item) => {
    renderRecommendCard('.recommend > .swiper-wrapper', item);
  });

  productData.forEach((item) => {
    renderSaleCard('.sale > .swiper-wrapper', item);
  });

  for (let id of idArray) {
    const viewData = await pb.collection('products').getOne(id);
    viewDataArray.push(viewData);
  }
  viewDataArray.forEach((item) => {
    renderRecentCard('.recent > .swiper-wrapper', item);
  });
}
renderCarousel();

/* Carousels */
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
  // loop: true,
  slidesPerView: 3,
  spaceBetween: 15,
  centeredSlides: false,
  navigation: {
    nextEl: '.swiper-button-next.recent',
    prevEl: '.swiper-button-prev.recent',
  },
});

/* Events */
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
}

(function prevBtnSetting() {
  css(swiperBannerNextBtn, 'display', 'flex');
  css(swiperBannerPrevBtn, 'display', 'none');
})();

/* EventListener */
// window.addEventListener('load', handleSliderBtn);
swiperBannerPrevBtn.addEventListener('click', handleSliderBtn);
swiperBannerNextBtn.addEventListener('click', handleSliderBtn);
