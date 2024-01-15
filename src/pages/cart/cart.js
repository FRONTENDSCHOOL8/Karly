import pb from '/src/api/pocketbase';
import '/src/pages/cart/cart.css';
import '/src/styles/style.css';
import {
  setDocumentTitle,
  getNode,
  getNodes,
  comma,
  insertLast,
  getPbImageURL,
} from '/src/lib';

setDocumentTitle('칼리 | 장바구니');

const cartData1 = await pb.collection('products').getFullList({
  filter: 'package_type~"냉장"',
});
const cartData2 = await pb.collection('products').getFullList({
  filter: 'package_type~"냉동"',
});
const cartData3 = await pb.collection('products').getFullList({
  filter: 'package_type~"상온"',
});

cartData1.forEach((item) => {
  insertLast('.cart_content_list_1', template(item));
});
cartData2.forEach((item) => {
  insertLast('.cart_content_list_2', template(item));
});
cartData3.forEach((item) => {
  insertLast('.cart_content_list_3', template(item));
});

function template(item) {
  const template = /* html */ `
      <li>
        <div class="input_check">
          <input
            type="checkbox"
            class="check_item"
            id="check_item_${item.id}"
          />
          <label for="check_item_${item.id}">
            <a href="/src/pages/product_detail/index.html#${item.id}">
              <span class="item">
                <img
                  src="${getPbImageURL(item)}"
                  alt="${item.name}"
                />
                <span class="item_title"
                  >${item.name}</span
                >
              </span>
            </a>
          </label>
        </div>
        <div class="item_price">
          <div class="input_number">
            <input
              type="number"
              min="1"
              value="1"
              aria-label="수량"
              class="quantity"
            />
            <button type="button" class="btn_plus">
              <span class="sr_only">+</span>
            </button>
            <button type="button" class="btn_minus">
              <span class="sr_only">-</span>
            </button>
          </div>
          <span class="item_price_total">
            <span class="sales" style="display:none">${item.sales}</span>
            <span class="before_price" style="display:none">${item.price}</span>
            <span class="price">${comma(
              Math.floor((item.price - (item.price * item.sales) / 100) / 10) *
                10
            )}</span>원</span>
        </div>
        <div class="item_delete">
          <button type="button" class="btn_cancel">
            <span class="sr_only">삭제</span>
          </button>
        </div>
      </li>
  `;
  return template;
}

selection();
total();
checkAll();
inputNumber();
priceTotal();

const accordion = getNodes('.cart_title_btn');
const checkItem = document.querySelectorAll('.check_item');
const inputNum = document.querySelectorAll('input[type="number"]');
const inputNumBtn = document.querySelectorAll('.input_number button');

accordion.forEach((element) => {
  element.addEventListener('click', (e) => {
    const title = e.target.closest('.cart_list_title');
    title.classList.toggle('open');
  });
});

checkItem.forEach((element) => {
  element.addEventListener('click', () => {
    checkItem.forEach((element) => {
      if (element.checked === true) {
        priceTotal();
      }
    });
  });
});

inputNum.forEach((element) => {
  element.addEventListener('input', price_sum);
});
inputNumBtn.forEach((element) => {
  element.addEventListener('click', price_sum);
});

function inputNumber() {
  const number = document.querySelectorAll('input[type="number"]');
  const btns = document.querySelectorAll('.input_number button');

  btns.forEach((element) => {
    element.addEventListener('click', () => {
      const number = element.parentElement.querySelector(
        'input[type="number"]'
      );
      if (element.classList.contains('btn_plus')) {
        let value = Number(number.value);
        value++;
        number.value = value;
        number.setAttribute('value', value);
        element.parentElement
          .querySelector('.btn_minus')
          .removeAttribute('disabled', '');
      } else {
        let value = Number(number.value);
        value--;
        number.value = value;
        number.setAttribute('value', value);
        if (number.value <= 1) {
          number.value = '1';
          element.setAttribute('disabled', '');
        }
      }
    });
  });
  number.forEach((element) => {
    element.addEventListener('input', (e) => {
      const target = e.target;
      if (target.value > 1) {
        let value = Number(target.value);
        target.value = value;
        target.setAttribute('value', value);
        target.parentElement
          .querySelector('.btn_minus')
          .removeAttribute('disabled', '');
      } else {
        let value = Number(target.value);
        target.value = value;
        target.setAttribute('value', value);
        target.value = '1';
        target.parentElement
          .querySelector('.btn_minus')
          .setAttribute('disabled', '');
      }
    });
  });
}

function price_sum(e) {
  const target = e.target;
  const quantity =
    target.closest('.item_price').querySelector('.quantity').value * 1;
  const sales =
    target.closest('.item_price').querySelector('.item_price_total .sales')
      .innerHTML * 1;
  const beforePrice =
    target
      .closest('.item_price')
      .querySelector('.item_price_total .before_price').innerHTML * 1;
  const priceInnerHTML = target
    .closest('.item_price')
    .querySelector('.item_price_total .price');
  const discount = (beforePrice * sales) / 100;
  const afterPrice = beforePrice - discount;
  const price = afterPrice * quantity;
  const priceResult = Math.floor(price / 10) * 10;
  priceInnerHTML.innerHTML = comma(priceResult);
  priceTotal();
}

function priceTotal() {
  const priceSum = document.querySelector('.price_info .price_sum');
  const discountSum = document.querySelector('.price_info .discount_sum');
  const deliveryCharge = document.querySelector('.price_info .delivery_charge');
  const total = document.querySelector('.price_info .total');
  const checkItem = document.querySelectorAll('.check_item');
  const sumArr = [];
  const sumArr2 = [];
  const sumArr3 = [];
  checkItem.forEach((element) => {
    const quantity = element.closest('li').querySelector('.quantity').value * 1;
    const beforePrice =
      element.closest('li').querySelector('.before_price').innerHTML * 1;
    const sales = element.closest('li').querySelector('.sales').innerHTML * 1;
    const discount = (beforePrice * sales) / 100;
    if (element.checked === true) {
      sumArr.push(beforePrice * quantity);
      sumArr2.push(discount * quantity);
      sumArr3.push((beforePrice - discount) * quantity);
    }
  });
  const sum = sumArr.reduce((acc, cur) => acc + cur, 0);
  const sum2 = sumArr2.reduce((acc, cur) => acc + cur, 0);
  const sum3 = sumArr3.reduce((acc, cur) => acc + cur, 0);
  priceSum.innerHTML = comma(Math.floor(sum / 10) * 10);
  if (sum2 === 0) {
    discountSum.innerHTML = comma(Math.floor(sum2 / 10) * 10);
  } else {
    discountSum.innerHTML = '-' + comma(Math.floor(sum2 / 10) * 10);
  }
  if (sum3 === 0) {
    deliveryCharge.innerHTML = 0;
  } else {
    deliveryCharge.innerHTML = '+' + comma(3000);
  }
  if (sum3 === 0) {
    total.innerHTML = 0;
  } else {
    total.innerHTML = comma(Math.floor((sum3 + 3000) / 10) * 10);
  }
}

function selection() {
  const selection = getNodes('.check_all_text .selection');
  const checkItemChecked = getNodes('input[class="check_item"]:checked');
  selection.forEach((element) => {
    element.innerText = checkItemChecked.length;
  });
}

function total() {
  const total = getNodes('.check_all_text .all');
  const checkItem = document.getElementsByClassName('check_item');
  total.forEach((element) => {
    element.innerText = checkItem.length;
  });
}

function checkAll() {
  const check_all = getNode('#check_all_1');
  const checkItem = getNodes('.check_item');
  check_all.addEventListener('change', (e) => {
    const ischeck = e.target.checked;
    checkItem.forEach((element) => {
      if (ischeck === true) {
        element.checked = ischeck;
      } else {
        element.checked = ischeck;
      }
    });
    selection();
    priceTotal();
  });
  for (const item of checkItem) {
    item.addEventListener('click', updateDisplay);
  }
  function updateDisplay() {
    let checkedCount = 0;
    for (const item of checkItem) {
      if (item.checked) {
        checkedCount++;
      }
    }
    if (checkedCount === 0) {
      check_all.checked = false;
      check_all.indeterminate = false;
    } else if (checkedCount === checkItem.length) {
      check_all.checked = true;
      check_all.indeterminate = false;
    } else {
      check_all.checked = false;
      check_all.indeterminate = true;
    }
    selection();
    priceTotal();
  }
}
