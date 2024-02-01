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
  checkLogin,
} from '/src/lib';

setDocumentTitle('칼리 | 장바구니');

checkLogin();

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
            <a href="/Karly/src/pages/product_detail/index.html#${item.id}">
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


  /**
   * TODO: 파이널 프로젝트 때는 else 없이 구현해 보시길 권합니다.
   * @type {NodeListOf<Element>}
   */
      // TODO: 사용하는 곳 근처에 변수를 선언하면 머리가 상쾌해집니다.
  const number = document.querySelectorAll('input[type="number"]');
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
  /**
   * TODO: 수고하셨습니다! 누적합을 구할 때는 Array.prototype.forEach 보다 Array.prototype.reduce 를 활용해 보세요.
   * 부수효과 없이 구현할 수 있게 됩니다.
   */
  const result = checkItem.reduce((acc, element) => {
    const li = element.closest('li');
    const quantity = parseInt(li.querySelector('.quantity').value, 10);
    const beforePrice = parseInt(li.querySelector('.before_price').innerHTML, 10);
    const sales = parseInt(li.querySelector('.sales').innerHTML, 10);
    const discount = (beforePrice * sales) / 100;

    if (element.checked) {
      acc.sumArr.push(beforePrice * quantity);
      acc.sumArr2.push(discount * quantity);
      acc.sumArr3.push((beforePrice - discount) * quantity);
    }

    return acc;
  }, { sumArr: [], sumArr2: [], sumArr3: [] }); // 초기값 설정

  // 결과 사용
  const sumArr = result.sumArr;
  const sumArr2 = result.sumArr2;
  const sumArr3 = result.sumArr3;
  const sum = sumArr.reduce((acc, cur) => acc + cur, 0);
  const sum2 = sumArr2.reduce((acc, cur) => acc + cur, 0);
  const sum3 = sumArr3.reduce((acc, cur) => acc + cur, 0);
  priceSum.innerHTML = comma(Math.floor(sum / 10) * 10);
  if (sum2 === 0) {
    discountSum.innerHTML = comma(Math.floor(sum2 / 10) * 10);
  } else {
    discountSum.innerHTML = '-' + comma(Math.floor(sum2 / 10) * 10);
  }
  // TODO: 0이 들어왔을 때 아무것도 하지 않는 처리를 comma 함수에 추가하는게 낫지 않았을까요?
  deliveryCharge.innerHTML = '+' + comma(3000);
  total.innerHTML = comma(Math.floor((sum3 + 3000) / 10) * 10);
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

/**
 * TODO: 저라면 폼을 이용해서 구현해 보았을 테지만 이것이 최선이었을것 같습니다.
 * 수고하셨습니다. 폼을 사용하면 더 간단하게 구현하실 수 있을 거에요.
 */
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
