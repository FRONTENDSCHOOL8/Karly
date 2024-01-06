import '/src/styles/style.css';
import '/src/pages/register/register.css';
import { getNode } from '/src/lib';

const btn = getNode('.check_number_btn');
console.log(444);
btn.addEventListener('click', function () {
  console.log(111);
});
