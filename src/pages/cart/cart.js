import '/src/styles/style.css';
import '/src/pages/cart/cart.css';
import { getNode, getNodes } from '/src/lib';

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
selection();

function total() {
  const total = getNodes('.check_all_text .total');
  const check_item = document.getElementsByClassName('check_item');

  total.forEach((element) => {
    element.innerText = check_item.length;
  });
}
total();

function itemDelete() {
  const btn_cancel = getNodes('.btn_cancel');

  function handleItemDelete(e) {
    const li = e.target.closest('li');
    li.remove();
    selection();
    total();
  }

  btn_cancel.forEach((element) => {
    element.addEventListener('click', handleItemDelete);
  });
}
itemDelete();

function itemsDelete() {
  const btn_delete_selection = getNode('.btn_delete_selection');
  const check_item = getNodes('.check_item');

  function handleItemsDelete() {
    for (let i = 0; i < check_item.length; i++) {
      if (check_item[i].checked) {
        const li = check_item[i].closest('li');
        li.remove();
      }
    }
    selection();
    total();
  }

  btn_delete_selection.addEventListener('click', handleItemsDelete);
}
itemsDelete();

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
check_all();
