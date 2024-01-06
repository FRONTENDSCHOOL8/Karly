import '/src/styles/style.css';
import '/src/pages/login/login.css';
import '/src/components/footer/footer.css';
import { getNode } from '/src/lib';

const login_btn = getNode('.login_btn');
const register_btn = getNode('.register_btn');

login_btn.addEventListener('click', function (e) {
  e.preventDefault();
});

register_btn.addEventListener('click', function (e) {
  e.preventDefault();
});
