import pb from '/src/api/pocketbase';
import '/src/pages/cart/cart.css';
import '/src/styles/style.css';
import {
  setDocumentTitle,
  getNode,
  getNodes,
  comma,
  insertLast,
  getStorage,
  setStorage,
  defaultAuthData,
  getPbImageURL,
  tiger,
  checkLogin,
} from '/src/lib';

setDocumentTitle('칼리 | 장바구니');

checkLogin();

if (!localStorage.getItem('auth')) {
  setStorage('auth', defaultAuthData);
}
async function renderCart() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/cart/records`
  );
  let { cartData1, cartData2, cartData3 } = response.data.items;
  const { isAuth, user } = await getStorage('auth');
  cartData1 = await pb.collection('cart').getFullList({
    filter: 'package_type~"냉장"',
  });
  cartData2 = await pb.collection('cart').getFullList({
    filter: 'package_type~"냉동"',
  });
  cartData3 = await pb.collection('cart').getFullList({
    filter: 'package_type~"상온"',
  });
  function template(Auth, item) {
    const template = /* html */ `
      <li>
        <div class="input_check">
          <input
            type="checkbox"
            class="check_item"
            id="check_item_${item.id}"
          />
          <label for="check_item_${item.id}">
            <a href="${
              !isAuth
                ? '/src/pages/login/'
                : `/src/pages/product_detail/index.html#${item.id}`
            }">
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
              value="${item.quantity}"
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
            <span class="sales sr_only">${item.sales}</span>
            <span class="before_price sr_only">${item.price}</span>
            <span class="price" >${comma(item.price)}</span>원</span>
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
  cartData1.forEach((item) => {
    if (item.username == user.username) {
      insertLast('.cart_content_list_1', template(isAuth, item));
    }
  });
  cartData2.forEach((item) => {
    if (item.username == user.username) {
      insertLast('.cart_content_list_2', template(isAuth, item));
    }
  });
  cartData3.forEach((item) => {
    if (item.username == user.username) {
      insertLast('.cart_content_list_3', template(isAuth, item));
    }
  });

  selection();
  total();
  check_all();
  input_number();
  item_price_total();
}
renderCart();

function accordion() {
  const btn = getNodes('.cart_title_btn');

  function handleAccordion(e) {
    const title = e.target.closest('.cart_list_title');
    title.classList.toggle('open');
  }

  btn.forEach((element) => {
    element.addEventListener('click', handleAccordion);
  });
}
accordion();

function selection() {
  const selection = getNodes('.check_all_text .selection');
  const check_item_checked = getNodes('input[class="check_item"]:checked');

  selection.forEach((element) => {
    element.innerText = check_item_checked.length;
  });
}

function total() {
  const total = getNodes('.check_all_text .all');
  const check_item = document.getElementsByClassName('check_item');

  total.forEach((element) => {
    element.innerText = check_item.length;
  });
}

function check_all() {
  const check_all = getNode('#check_all_1');
  const check_item = getNodes('.check_item');

  check_all.addEventListener('change', (e) => {
    const ischeck = e.target.checked;

    check_item.forEach((element) => {
      if (ischeck === true) {
        element.checked = ischeck;
      } else {
        element.checked = ischeck;
      }
    });
    selection();
  });

  for (const item of check_item) {
    item.addEventListener('click', updateDisplay);
  }

  function updateDisplay() {
    let checkedCount = 0;
    for (const item of check_item) {
      if (item.checked) {
        checkedCount++;
      }
    }

    if (checkedCount === 0) {
      check_all.checked = false;
      check_all.indeterminate = false;
    } else if (checkedCount === check_item.length) {
      check_all.checked = true;
      check_all.indeterminate = false;
    } else {
      check_all.checked = false;
      check_all.indeterminate = true;
    }

    selection();
  }
}

function input_number() {
  const numbers = document.querySelectorAll('input[type="number"]');
  const btns = document.querySelectorAll('.input_number button');
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const number = btn.parentElement.querySelector('input[type="number"]');
      if (btn.classList.contains('btn_plus')) {
        let value = Number(number.value);
        value++;
        number.value = value;
        number.setAttribute('value', value);
        btn.parentElement
          .querySelector('.btn_minus')
          .removeAttribute('disabled', '');
      } else {
        let value = Number(number.value);
        value--;
        number.value = value;
        number.setAttribute('value', value);
        if (number.value <= 1) {
          number.value = '1';
          btn.setAttribute('disabled', '');
        }
      }
    });
  });
  numbers.forEach((element) => {
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

function item_price_total() {
  const input_number = document.querySelectorAll('input[type="number"]');
  const button = document.querySelectorAll('.input_number button');

  input_number.forEach((element) => {
    element.addEventListener('input', price_sum);
  });
  button.forEach((element) => {
    element.addEventListener('click', price_sum);
  });

  function price_sum(e) {
    const target = e.target;
    const quantity =
      target.closest('.item_price').querySelector('.quantity').value * 1;
    const sales =
      target.closest('.item_price').querySelector('.item_price_total .sales')
        .innerHTML * 1;
    const before_price =
      target
        .closest('.item_price')
        .querySelector('.item_price_total .before_price').innerHTML * 1;
    const price_innerHTML = target
      .closest('.item_price')
      .querySelector('.item_price_total .price');
    const discount = (before_price * sales) / 100;
    const after_price = before_price - discount;
    const price = after_price * quantity;
    const price_result = Math.floor(price / 10) * 10;

    price_innerHTML.innerHTML = comma(price_result);
  }
}
