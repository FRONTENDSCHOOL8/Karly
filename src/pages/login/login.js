import '/src/styles/style.css';
import '/src/components/header/header.css';
import '/src/pages/login/login.css';
import '/src/components/footer/footer.css';
import {
  getStorage,
  setStorage,
  getNode,
  setDocumentTitle,
  handleValidationId,
  handleValidationPassword,
  defaultAuthData,
  defaultViewData,
} from '/src/lib';
import pb from '/src/api/pocketbase';

const html = getNode('html');
const userIdInput = getNode('.user_id_input');
const userPasswordInput = getNode('.user_password_input');
const loginAlertContainer = getNode('.login_alert_container');
const errorMessage = getNode('.error_message');
const userPasswordError = getNode('#user_password_error');
const loginBtn = getNode('.login_btn');

setDocumentTitle('칼리 | 로그인');

// 로그인 성공하면 localStorage에 값이 생성된다.
async function handleAuth(id, pw) {
  try {
    const authData = await pb.collection('users').authWithPassword(id, pw);

    if (authData) {
      let { model, token } = await getStorage('pocketbase_auth');

      setStorage('auth', {
        isAuth: !!model,
        user: model,
        token: token,
      });
      setStorage('view', defaultViewData);

      window.location.href = '/Karly/src/pages/main/';
    }
  } catch (error) {
    handleLoginAlert('visible', 'hidden');
  }
}

// 로그인에 대한 alert
function handleLoginAlert(state, overflow) {
  loginAlertContainer.style.visibility = state;
  html.style.overflowY = overflow;
}

// 로그인 성공 여부 알림창
loginAlertContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') handleLoginAlert('hidden', 'scroll');
});

// 로그인 버튼 클릭
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  handleAuth(userIdInput.value, userPasswordInput.value);
});

// 아이디 입력
userIdInput.addEventListener('input', (e) => {
  let value = e.target.value;
  let state = handleValidationId(value);
  if (state) errorMessage.classList.remove('is_invalid');
  else errorMessage.classList.add('is_invalid');
});

// 비밀번호 입력
userPasswordInput.addEventListener('input', (e) => {
  let value = e.target.value;
  let state = handleValidationPassword(value);

  if (value && value.length < 6) {
    userPasswordError.classList.add('is_invalid');
    userPasswordError.textContent = '최소 6자 이상 입력';
  } else if (value.length > 16) {
    userPasswordError.classList.add('is_invalid');
    userPasswordError.textContent = '최대 16자 까지 입력';
  } else {
    if (state) {
      userPasswordError.classList.remove('is_invalid');
    } else {
      userPasswordError.textContent = '특수문자 포함 최소 6자 - 최대 16자';
    }
  }
});
