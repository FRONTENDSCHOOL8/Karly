import '/src/styles/style.css';
import '/src/components/header/header.css';
import '/src/pages/register/register.css';
import '/src/components/footer/footer.css';
import { getNode } from '/src/lib';

const html = getNode('html');
const userIdInput = getNode('.user_id_input');
const userPasswordInput = getNode('.user_password_input');
const userPasswordCheckInput = getNode('.user_password_check_input');
const userNameInput = getNode('.user_name_input');
const userEmailInput = getNode('.user_email_input');
const userPhoneInput = getNode('.user_phone_input');

const duplicateIdBtn = getNode('.duplicate_id_btn');
const duplicateAlertContainer = getNode('.duplicate_alert_container');
const duplicateAlertText = getNode('.duplicate_alert_text');

const duplicateEmailBtn = getNode('.duplicate_email_btn');
const duplicateEmailAlertContainer = getNode(
  '.duplicate_email_alert_container'
);
const duplicateEmailAlertText = getNode('.duplicate_email_alert_text');

const duplicateAlertBtn = getNode('.duplicate_alert_btn');
const duplicateEmailAlertBtn = getNode('.duplicate_email_alert_btn');

const checkNumberBtn = getNode('.check_number_btn');

const errorMessage = getNode('.error_message');
const userPasswordError = getNode('#user_password_error');
const userPasswordCheckError = getNode('#user_password_check_error');
const userEmailError = getNode('#user_email_error');

const agreeAll = getNode('#agree_all');

// input에 값이 있다면 글자가 검은색으로 변함
function handleInputActive(e, node) {
  if (e.target.value) node.classList.add('input_active');
}

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

// 이메일 유효성 검사
function handleValidationEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(email)) return true;
  else return false;
}

// handleValidationAlertShow, handleValidationAlertClose 나중에 하나로 리팩토링하기
// 중복확인 알림창 보이기
function handleValidationAlertShow() {
  if (!handleValidationId(userIdInput.value)) {
    duplicateAlertText.textContent =
      '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
    duplicateAlertContainer.style.visibility = 'visible';
    html.style.overflow = 'hidden';
  } else {
    duplicateIdBtn.disabled = true;
    duplicateIdBtn.classList.add('disable_btn');
    duplicateAlertText.textContent = '사용 할 수 있는 아이디 입니다';
    duplicateAlertContainer.style.visibility = 'visible';
    html.style.overflow = 'hidden';
  }
}

function handleDuplicateAlertShow() {
  if (!handleValidationEmail(userEmailInput.value)) {
    duplicateEmailAlertText.textContent = '이메일 형식으로 입력해 주세요.';
    duplicateEmailAlertContainer.style.visibility = 'visible';
    html.style.overflow = 'hidden';
  } else {
    duplicateEmailBtn.disabled = true;
    duplicateEmailBtn.classList.add('disable_btn');
    duplicateEmailAlertText.textContent = '사용 가능한 이메일 입니다.';
    duplicateEmailAlertContainer.style.visibility = 'visible';
    html.style.overflow = 'hidden';
  }
}

// 중복확인 알림창 닫기
function handleValidationAlertClose() {
  duplicateAlertContainer.style.visibility = 'hidden';
  html.style.overflow = 'scroll';
}

// 이메일 중복확인 알림창 닫기
function handleDuplicateAlertClose() {
  duplicateEmailAlertContainer.style.visibility = 'hidden';
  html.style.overflow = 'scroll';
}

userIdInput.addEventListener('input', (e) => {
  handleInputActive(e, userIdInput);

  let state = handleValidationId(e.target.value);

  if (state) errorMessage.classList.remove('is_invalid');
  else errorMessage.classList.add('is_invalid');
});

userPasswordInput.addEventListener('input', (e) => {
  handleInputActive(e, userPasswordInput);
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

userPasswordCheckInput.addEventListener('input', (e) => {
  handleInputActive(e, userPasswordCheckInput);

  if (e.target.value === userPasswordInput.value) {
    userPasswordCheckError.classList.remove('is_invalid');
  } else {
    userPasswordCheckError.classList.add('is_invalid');
  }
});

userNameInput.addEventListener('input', (e) =>
  handleInputActive(e, userNameInput)
);
userEmailInput.addEventListener('input', (e) => {
  handleInputActive(e, userEmailInput);

  let state = handleValidationEmail(e.target.value);

  if (state) userEmailError.classList.remove('is_invalid');
  else userEmailError.classList.add('is_invalid');
});

// const x = [];
userPhoneInput.addEventListener('input', (e) => {
  handleInputActive(e, userPhoneInput);
  console.log(userPhoneInput.value);
  let val = e.target.value;

  // if(isNaN(val)){
  //   userPhoneInput.value = x;
  // } else{
  //   x.push(val);
  //   userPhoneInput.value = x;
  //   console.log('숫자');
  //   if(val){
  //     checkNumberBtn.classList.remove('disable_btn');
  //   }else{
  //     checkNumberBtn.classList.add('disable_btn');
  //   }
  // }

  if (isNaN(val)) {
    userPhoneInput.value = '';
  } else {
    userPhoneInput.value = val;
    console.log('숫자');
    if (val) {
      checkNumberBtn.classList.remove('disable_btn');
    } else {
      checkNumberBtn.classList.add('disable_btn');
    }
  }
});

duplicateIdBtn.addEventListener('click', handleValidationAlertShow);
duplicateAlertBtn.addEventListener('click', handleValidationAlertClose);
duplicateEmailBtn.addEventListener('click', handleDuplicateAlertShow);
duplicateEmailAlertBtn.addEventListener('click', handleDuplicateAlertClose);

// 전체 동의하면 모두 checked 상태 true로 변경
function handleAgreeAll(state) {
  for (let i = 1; i < 5; i++) {
    document.querySelector(`#check_${i}`).checked = state;
  }
}

agreeAll.addEventListener('click', function () {
  if (agreeAll.checked) handleAgreeAll(true);
  else handleAgreeAll(false);
});
