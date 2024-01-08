import '/src/styles/style.css';
import '/src/components/header/header.css';
import '/src/pages/login/login.css';
import '/src/components/footer/footer.css';
import { getNode } from '/src/lib';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const loginBtn = getNode('.login_btn');
const userIdInput = getNode('.user_id_input');
const userPasswordInput = getNode('.user_password_input');

const data = await pb.collection('users').getOne('c9dyw5dd41teztn');

// .authWithPassword(data.username, 'song123456789');

console.log(data);
// console.log(pb.authStore.isValid);
// console.log(pb.authStore.token);
// console.log(pb.authStore.model.id);
// console.log(data.name);

// setStorage('user_id', data.name);

// 로그인 성공하면 localStorage에 값이 생성된다.
async function handleAuth(id, pw) {
  try {
    const authData = await pb.collection('users').authWithPassword(id, pw);
    if (authData) {
      console.log('로그인 성공');
    }
    console.log(authData);
  } catch (error) {
    console.log('로그인 실패!', error);
  }
}

loginBtn.addEventListener('click', function (e) {
  e.preventDefault();

  handleAuth(userIdInput.value, userPasswordInput.value);
});
