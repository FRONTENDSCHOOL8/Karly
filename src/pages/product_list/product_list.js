import '/src/components/header/header.js';
import '/src/components/footer/footer.js';
import '/src/pages/product_list/product_list.css';
import {
  getNode,
  getNodes,
  insertLast,
  css,
  renderItemList,
  getStorage,
  checkLogin,
} from '/src/lib';
import pb from '/src/api/pocketbase';

checkLogin();

// 포켓호스트 서버에서 상품 정보 받아와서 제품 목록 페이지 화면에 렌더링
const itemList = await pb.collection('products').getList(1, 15);
const itemListContainer = getNode('.item_list_container');

renderItemList(itemListContainer, itemList.items);

// 각 상품의 장바구니 담기 버튼 클릭 시 header 영역 장바구니 아이콘 아래 해당 상품 관련 bubble이 표시 되었다가 제거 되는 기능 구현
const addCartButtons = getNodes('.cart_button');
const headerIconWrappers = getNodes('.icon_wrapper');

function handleBubble(e) {
  // 각 상품의 장바구니 담기 버튼 클릭 시 장바구니 bubble 구현 마크업에 해당 상품 정보가 담긴 채 DOM으로 뿌려지는 기능 구현
  const addCartButton = e.currentTarget;
  const itemCardLink = addCartButton.previousElementSibling;
  const itemCardFigure = itemCardLink.firstElementChild;
  const itemCardImg = itemCardFigure.firstElementChild;
  const itemCardFigCaption = itemCardFigure.lastElementChild;
  const itemCardHeading = itemCardFigCaption.children[1];

  // - 상품 클릭 시 해당 상품의 버블 마크업 생성
  function createCartBubble() {
    return /* html */ `
  <div class="cart_bubble">
  <picture class="cart_bubble_img_container">
    <img
      class="cart_bubble_img"
      src="${itemCardImg.src}"
      alt="${itemCardHeading.innerText}"
    />
  </picture>
  <div class="cart_bubble_textbox">
    <h4 class="cart_bubble_product">
      ${itemCardHeading.innerText}
    </h4>
    <p class="cart_bubble_description">
      장바구니에 상품을 담았습니다.
    </p>
  </div>
</div>
<svg
  class="cart_bubble_pointer"
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="18"
  viewBox="0 0 20 18"
  fill="none"
>
  <path d="M10 1L18.6603 13.75H1.33975L10 1Z" fill="white" />
  <path d="M1 13.5L10 1L18.5 13.5" stroke="#C4C4C4" />
</svg>
  `;
  }

  // - 상품 클릭 시 해당 상품의 정보가 담긴 버블이 렌더링 되는 기능 구현
  function renderCartBubble(target) {
    insertLast(target, createCartBubble());
  }

  headerIconWrappers.forEach((item) => {
    renderCartBubble(item);
  });

  // 장바구니 담기 버튼 클릭 시 bubble이 표시 되었다가 제거 되는 기능 구현
  const bubble = getNodes('.cart_bubble');
  const bubblePointer = getNodes('.cart_bubble_pointer');
  bubble.forEach((node) => {
    css(node, 'visibility', 'visible');
    setTimeout(() => {
      css(node, 'visibility', 'hidden');
    }, 4000);

    bubblePointer.forEach((node) => {
      css(node, 'visibility', 'visible');
      setTimeout(() => {
        css(node, 'visibility', 'hidden');
      }, 4000);
    });
  });
}

// 각 상품의 장바구니 담기 버튼에 클릭 이벤트 추가
addCartButtons.forEach((item) => {
  item.addEventListener('click', handleBubble);
});

// 로그인 상태 확인 후, 로그인 되어 있으면 화면에 로그인 유저 정보 렌더링
checkLogin();

// 장바구니 담기 버튼 클릭 시 서버 내 장바구니 컬렉션에 클릭한 제품의 레코드 id와 로그인 한 유저 레코드의 'username' 필드 값이 담긴 신규 레코드 생성
async function handleCartData(e) {
  // - 클릭한 제품의 레코드 id 값 추출
  const addCartButton = e.currentTarget;
  const itemCardLink = addCartButton.previousElementSibling;
  const hashIndex = itemCardLink.href.indexOf('#');
  const productId = itemCardLink.href.slice(hashIndex + 1);
  // - 로그인 한 유저의 레코드 id 값 추출
  const loginUserInfo = await getStorage('auth');
  const loginUserName = loginUserInfo.user.username;
  // 서버 DB 'cart' 컬렉션에 클릭한 제품의 레코드 id와 로그인 한 유저 레코드의 'username' 필드 값이 담긴 신규 레코드 추가
  const cartData = {
    username: loginUserName,
    product_id: productId,
    quantity: 1,
  };

  const cartRecord = await pb.collection('cart').create(cartData);
}

// - 각 상품의 장바구니 담기 버튼에 클릭 이벤트 추가
addCartButtons.forEach((item) => {
  item.addEventListener('click', handleCartData);
});

// 페이지 헤더의 장바구니 아이콘 클릭 시 로그인 여부에 따라 페이지 이동 경로 다르게 설정하는 기능 구현
headerIconWrappers.forEach(async (item) => {
  const headerCartIconLink = item.children[2].firstElementChild;
  const authUserInfo = await getStorage('auth');
  if (authUserInfo.isAuth) {
    headerCartIconLink.href = '/src/pages/cart/';
  } else {
    headerCartIconLink.href = '/src/pages/login/';
  }
});

console.log(await getStorage('auth'));
