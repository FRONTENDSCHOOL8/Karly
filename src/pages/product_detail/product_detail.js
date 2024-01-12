import '/src/components/header/header.js';
import '/src/components/footer/footer.js';
import '/src/pages/product_detail/product_detail.css';
import {
  getNode,
  getNodes,
  css,
  comma,
  setDocumentTitle,
  insertBefore,
  insertFirst,
  getPbImageURL,
} from '/src/lib/';
import pb from '/src/api/pocketbase';

// 포켓호스트 서버에서 상품 정보 받아오기
const pageHash = window.location.hash.slice(1);
const product = await pb.collection('products').getOne(pageHash);

// 페이지 타이틀 수정
setDocumentTitle(`칼리 | ${product.name}`);

// 포켓호스트 서버에서 받아온 상품 정보를 페이지에 렌더링
// - 상품 이미지 렌더링
const tagBelowProductImg = getNode('.product_purchase_container');

function createProductImage(item) {
  return /* html */ `
  <img
  class="product_img"
  src="${getPbImageURL(item)}"
  alt="${item.name}"
/>
  `;
}

function renderProductImage(target, item) {
  insertBefore(target, createProductImage(item));
}

renderProductImage(tagBelowProductImg, product);

// 상품 정보 렌더링
const productPurchaseSection = getNode('.product_purchase_container');

function createProductInfo({
  delivery,
  name,
  description,
  price,
  delivery_info,
  seller,
  package_type,
  package_info,
  unit,
  volume,
  origin,
  allergy,
}) {
  return /* html */ `
  <article class="product_summary">
  <h3 class="sr_only">상품 판매 개요</h3>
  <p class="product_delivery_info">${delivery}</p>
  <h4 class="product_title">${name}</h4>
  <p class="product_description">${description}</p>
  <p class="product_price"><em>${comma(price)}</em>원</p>
  <small class="benefit_notice"
    >로그인 후, 적립 혜택이 제공됩니다.</small
  >
  <table class="product_brief_info_container">
    <caption class="sr_only">
      상품 판매 정보
    </caption>
    <tr>
      <th class="product_delivery">배송</th>
      <td class="product_delivery_type">
        ${delivery}
        ${delivery_info}
      </td>
    </tr>
    <tr>
      <th class="product_seller">판매자</th>
      <td class="product_seller_info">${seller}</td>
    </tr>
    <tr>
      <th class="product_package">포장타입</th>
      <td class="product_package_type">
        ${package_type}
        ${package_info}
      </td>
    </tr>
    <tr>
      <th class="product_sell_unit">판매단위</th>
      <td class="product_sell_unit_info">${unit}</td>
    </tr>
    <tr>
      <th class="product_volume">중량/용량</th>
      <td class="product_volume_info">${volume}</td>
    </tr>
    <tr>
      <th class="product_origin">원산지</th>
      <td class="product_origin_description">${origin}</td>
    </tr>
    <tr>
      <th class="product_allergy">알레르기정보</th>
      <td class="product_allergy_info">
        ${allergy}
      </td>
    </tr>
    <tr>
      <th class="product_select">상품선택</th>
      <td class="product_select_option">
        <div class="product_quantity_selector">
          <strong class="product_name">${name}</strong>
          <div class="product_quantity_select_buttons">
            <button
              class="product_quantity_decrease_button"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M20 14V16H10V14H20Z"
                  fill="var(--gray--300)"
                />
              </svg></button
            >1<button
              class="product_quantity_increase_button"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M16 10V14H20V16H16V20H14V16H10V14H14V10H16Z"
                  fill="var(--content)"
                />
              </svg>
            </button>
          </div>
          <em class="calculated_price">${comma(price)}원</em>
        </div>
      </td>
    </tr>
  </table>
</article>
<article class="product_total_price_section">
  <h3 class="sr_only">총 상품 금액</h3>
  <p class="product_total_price">
    <span>총 상품 금액&#58;</span
    ><em class="total_price">${comma(price)}</em>원
  </p>
  <small class="benefit_notice">로그인 후, 적립 혜택 제공</small>
</article>
  `;
}

function renderProductInfo(target, item) {
  insertFirst(target, createProductInfo(item));
}

renderProductInfo(productPurchaseSection, product);

// '상품선택' 영역 '+', '-' 버튼을 눌러 상품 구매 수량 조정 및 수량에 따른 가격 계산
const addProductButton = getNode('.product_quantity_increase_button');
const subtractProductButton = getNode('.product_quantity_decrease_button');

function handleAdd() {
  const productQuantity = this.previousSibling;
  const productPrice =
    getNode('.product_price').firstElementChild.innerText.replaceAll(',', '') *
    1;
  const calculatedPrice = getNode('.calculated_price');
  const totalPrice = getNode('.total_price');

  productQuantity.nodeValue = productQuantity.nodeValue - 0 + 1 + '';
  calculatedPrice.innerText =
    comma(productPrice * productQuantity.nodeValue) + '원';
  totalPrice.innerText = comma(productPrice * productQuantity.nodeValue);

  if (productQuantity.nodeValue !== 1) {
    const subtractSvg = subtractProductButton.firstElementChild;
    const subtractSvgPath = subtractSvg.firstElementChild;
    css(subtractProductButton, 'cursor', 'pointer');
    css(subtractSvgPath, 'fill', 'var(--content)');
  }
}

function handleSubtract() {
  const productQuantity = this.nextSibling;
  const productPrice =
    getNode('.product_price').firstElementChild.innerText.replaceAll(',', '') *
    1;
  const calculatedPrice = getNode('.calculated_price');
  const totalPrice = getNode('.total_price');

  if (productQuantity.nodeValue === '2') {
    const subtractSvg = this.firstElementChild;
    const subtractSvgPath = subtractSvg.firstElementChild;
    css(this, 'cursor', 'default');
    css(subtractSvgPath, 'fill', 'var(--gray--300)');
  }

  if (productQuantity.nodeValue === '1') return;

  productQuantity.nodeValue = productQuantity.nodeValue - 1 + '';
  calculatedPrice.innerText =
    comma(productPrice * productQuantity.nodeValue) + '원';
  totalPrice.innerText = comma(productPrice * productQuantity.nodeValue);
}

addProductButton.addEventListener('click', handleAdd);
subtractProductButton.addEventListener('click', handleSubtract);

// '상품 구매' 영역 찜 버튼 클릭 시 UI 변경
const dibsButton = getNode('.dibs_button');
let dibsState = false;

function handleDibs() {
  const dibsSvg = dibsButton.firstElementChild;
  const dibsSvgPath = dibsSvg.firstElementChild;

  if (dibsState) {
    css(dibsSvg, 'fill', 'none');
    css(dibsSvgPath, 'stroke', 'var(--primary)');
    dibsState = false;
  } else {
    css(dibsSvg, 'fill', 'var(--accent--yellow');
    css(dibsSvgPath, 'stroke', 'var(--accent--yellow)');
    dibsState = true;
  }
}

dibsButton.addEventListener('click', handleDibs);

// '장바구니 담기' 버튼 클릭 시 header 장바구니 아이콘 아래 bubble 표시했다가 제거
const addCartButton = getNode('.add_cart_button');

function handleBubble() {
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

addCartButton.addEventListener('click', handleBubble);
