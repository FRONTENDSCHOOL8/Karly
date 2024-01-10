import '/src/components/header/header.js';
import '/src/components/footer/footer.js';
import '/src/pages/product_detail/product_detail.css';
import { getNode, getNodes, css, comma } from '/src/lib/';

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
