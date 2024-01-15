/* eslint-disable no-unused-vars */
import pb from '/src/api/pocketbase.js';
import '/src/components/footer/footer.css';
import '/src/components/header/header.css';
import '/src/styles/main.css';
import '/src/styles/style.css';

import {
  checkLogin,
  css,
  defaultViewData,
  getNode,
  renderRecentCard,
  renderRecommendCard,
  renderSaleCard,
  setDocumentTitle,
  setStorage,
  getStorage,
} from '/src/lib';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

setDocumentTitle('칼리 | 마켓칼리');

/* 로그인 상태 확인 */
checkLogin();

// localStorage에 최근 본 상품 목록 정보가 없으면 view 초기화
if (!localStorage.getItem('view')) {
  setStorage('view', defaultViewData);
}
const getViewData = await getStorage('view');

let idArray = getViewData.id;
let viewDataArray = [];

/* RenderCarouselsData + Carousels */
async function renderCarousel() {
  const productData = await pb.collection('products').getFullList();

  productData.forEach((item) => {
    renderRecommendCard('.recommend > .swiper-wrapper', item);
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

  productData.forEach((item) => {
    renderSaleCard('.sale > .swiper-wrapper', item);
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
  swiperBannerPrevBtn.addEventListener('click', handleSliderBtn);
  swiperBannerNextBtn.addEventListener('click', handleSliderBtn);

  for (let id of idArray) {
    const viewData = await pb.collection('products').getOne(id);
    viewDataArray.push(viewData);
  }
  viewDataArray.forEach((item) => {
    renderRecentCard('.recent > .swiper-wrapper', item);
  });

  const swiperRecent = new Swiper('.swiper.recent', {
    modules: [Navigation, Pagination, Autoplay],
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 15,
    centeredSlides: false,
    navigation: {
      nextEl: '.swiper-button-next.recent',
      prevEl: '.swiper-button-prev.recent',
    },
  });
}
renderCarousel();

/* Carousel */
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

/* 팝업 */
const popup = getNode('.popup_container');

// 오늘 날짜를 생성
const nowDate = new Date();
const nowYear = nowDate.getFullYear();
const nowMonth = nowDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
const nowDay = nowDate.getDate();

// 오늘 날짜를 형식에 맞게 변형  ex) 2024-01-15
const formattedDate =
  nowYear +
  '-' +
  (nowMonth < 10 ? '0' : '') +
  nowMonth +
  '-' +
  (nowDay < 10 ? '0' : '') +
  nowDay;

// 팝업 버튼 클릭 시 발생 이벤트 처리
popup.addEventListener('click', function (e) {
  if (e.target.className === 'popup_today_close') {
    setStorage('today', formattedDate);
    popup.style.display = 'none';
  } else if (e.target.className === 'popup_close') {
    popup.style.display = 'none';
  }
});

// 메인 페이지로 이동할 때마다 확인해야 함
// localStorage에 today값과 오늘 날짜가 동일한지 확인
// 동일하면 display = 'none'
// 동일하지 않다면 display = 'block'
async function todayDate() {
  const todayDate = await getStorage('today');

  if (formattedDate === todayDate) popup.style.display = 'none';
  else popup.style.display = 'block';
}
todayDate();
