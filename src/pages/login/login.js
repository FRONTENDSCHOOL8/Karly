import '/src/styles/style.css';
import '/src/components/header/header.css';
import '/src/pages/login/login.css';
import '/src/components/footer/footer.css';
import { getNode, setDocumentTitle } from '/src/lib';
import pb from '/src/api/pocketbase';

const loginBtn = getNode('.login_btn');
const userIdInput = getNode('.user_id_input');
const userPasswordInput = getNode('.user_password_input');
const loginAlertContainer = getNode('.login_alert_container');
const html = getNode('html');
const loginAlertBtn = getNode('.login_alert_btn');
const errorMessage = getNode('.error_message');
const userPasswordError = getNode('#user_password_error');

setDocumentTitle('칼리 | 로그인');

// 아이디 유효성 검사
function handleValidationId(id) {
  const regex = /^(?=.*[A-Za-z])[A-Za-z\d]{6,16}$/;

  if (regex.test(id)) return true;
  else return false;
}

// 비밀번호 유효성 검사
function handleValidationPassword(pw) {
  const regex =
    /^(?=(?:.*[A-Za-z]){1,})(?=(?:.*\d){1,}|.*[!@#$%^&*()_+{}[\]:;<>,.?~/-]{1,})(?:[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~/-]){10,}$/;

  if (regex.test(pw)) return true;
  else return false;
}

// 로그인 성공하면 localStorage에 값이 생성된다.
async function handleAuth(id, pw) {
  try {
    const authData = await pb.collection('users').authWithPassword(id, pw);

    if (authData) {
      console.log('로그인 성공');
      // alert('로그인 완료! 메인페이지로 이동합니다.');
      console.log(authData);
      authData.isAuth = true;
      // window.location.href = '%BASE_URL%src/pages/main/';
    }
  } catch (error) {
    handleLoginAlert();
    console.log('로그인 실패!', error);
  }
}

// 로그인 정보 잘못 입력 시 경고창
function handleLoginAlert() {
  loginAlertContainer.style.visibility = 'visible';
  html.style.overflowY = 'hidden';
}

// 로그인 정보 잘못 입력 시 경고창 닫기
function handleLoginAlertClose() {
  loginAlertContainer.style.visibility = 'hidden';
  html.style.overflowY = 'scroll';
}

loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  handleAuth(userIdInput.value, userPasswordInput.value);
});

loginAlertBtn.addEventListener('click', handleLoginAlertClose);

userIdInput.addEventListener('input', (e) => {
  let state = handleValidationId(e.target.value);
  if (state) errorMessage.classList.remove('is_invalid');
  else errorMessage.classList.add('is_invalid');
});

userPasswordInput.addEventListener('input', (e) => {
  let state = handleValidationPassword(e.target.value);

  if (e.target.value && e.target.value.length < 10) {
    userPasswordError.classList.add('is_invalid');
    userPasswordError.textContent = '최소 10자 이상 입력';
  } else {
    if (state) {
      userPasswordError.classList.remove('is_invalid');
    } else {
      userPasswordError.textContent =
        '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
    }
  }
});
