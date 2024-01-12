import '/src/styles/style.css';
import '/src/components/header/header.css';
import '/src/pages/register/register.css';
import '/src/components/footer/footer.css';
import { getNode, setDocumentTitle } from '/src/lib';
import pb from '/src/api/pocketbase.js';

setDocumentTitle('칼리 | 회원가입');

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

// const duplicateEmailBtn = getNode('.duplicate_email_btn');
// const duplicateEmailAlertContainer = getNode(
//   '.duplicate_email_alert_container'
// );
// const duplicateEmailAlertText = getNode('.duplicate_email_alert_text');

const duplicateAlertBtn = getNode('.duplicate_alert_btn');
// const duplicateEmailAlertBtn = getNode('.duplicate_email_alert_btn');

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
  const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,16}$/;
  // const regex =
  //   /^(?=(?:.*[A-Za-z]){1,})(?=(?:.*\d){1,}|.*[!@#$%^&*()_+{}[\]:;<>,.?~/-]{1,})(?:[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~/-]){10,}$/;

  if (regex.test(pw)) return true;
  else return false;
}

// 이메일 유효성 검사
function handleValidationEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(email)) return true;
  else return false;
}

// 아이디 중복확인 (return값이 true면 중복이라는 뜻)
async function DuplicationId() {
  const records = await pb.collection('users').getFullList();
  console.log(records);
  let res = records.filter((item) => userIdInput.value === item.username);
  if (res.length === 0) return false;
  else return true;
}

// 이메일 중복확인 (return값이 true면 중복이라는 뜻)
// async function DuplicationEmail() {
//   const authData = await pb
//     .collection('users')
//     .authWithPassword(userIdInput.value, userPasswordInput.value);

//   if (authData.record.email !== userEmailInput.value) return false;
//   else return true;
// }

// handleValidationAlertShow, handleValidationAlertClose 나중에 하나로 리팩토링하기
// 아이디 중복확인 알림창 보이기
async function handleValidationAlertShow() {
  if (!handleValidationId(userIdInput.value)) {
    duplicateAlertText.textContent =
      '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
    duplicateAlertContainer.style.visibility = 'visible';
    html.style.overflow = 'hidden';
  } else {
    if (await DuplicationId()) {
      duplicateAlertText.textContent = '이미 등록된 아이디 입니다';
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
}

// 이메일 중복확인 알림창 보이기
// async function handleDuplicateAlertShow() {
//   if (!handleValidationEmail(userEmailInput.value)) {
//     duplicateEmailAlertText.textContent = '이메일 형식으로 입력해 주세요.';
//     duplicateEmailAlertContainer.style.visibility = 'visible';
//     html.style.overflow = 'hidden';
//   } else {
//     if (await DuplicationEmail()) {
//       duplicateEmailAlertText.textContent = '이미 등록된 이메일 입니다.';
//       duplicateEmailAlertContainer.style.visibility = 'visible';
//       html.style.overflow = 'hidden';
//     } else {
//       duplicateEmailBtn.disabled = true;
//       duplicateEmailBtn.classList.add('disable_btn');
//       duplicateEmailAlertText.textContent = '사용 가능한 이메일 입니다.';
//       duplicateEmailAlertContainer.style.visibility = 'visible';
//       html.style.overflow = 'hidden';
//     }
//   }
// }

// 인증번호 알림창 보이기
async function handleAuthNumAlertShow() {
  document.querySelector('.duplicate_number_alert_text').textContent =
    '믿음으로 인증되었습니다';
  document.querySelector('.duplicate_number_alert_container').style.visibility =
    'visible';
  checkNumberBtn.classList.add('disable_btn');
  html.style.overflow = 'hidden';
}

// 중복확인 알림창 닫기
function handleValidationAlertClose() {
  duplicateAlertContainer.style.visibility = 'hidden';
  html.style.overflow = 'scroll';
}

// 이메일 중복확인 알림창 닫기
// function handleDuplicateAlertClose() {
//   duplicateEmailAlertContainer.style.visibility = 'hidden';
//   html.style.overflow = 'scroll';
// }

// 인증번호 알림창 닫기
function handleAuthNumAlertClose() {
  document.querySelector('.duplicate_number_alert_container').style.visibility =
    'hidden';
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

  if (e.target.value && e.target.value.length < 6) {
    userPasswordError.classList.add('is_invalid');
    userPasswordError.textContent = '최소 6자 이상 입력';
  } else if (e.target.value.length > 16) {
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

userPhoneInput.addEventListener('input', (e) => {
  handleInputActive(e, userPhoneInput);
  let val = e.target.value;

  if (isNaN(val)) {
    userPhoneInput.value = '';
  } else {
    userPhoneInput.value = val;
    if (val) {
      checkNumberBtn.classList.remove('disable_btn');
    } else {
      checkNumberBtn.classList.add('disable_btn');
    }
  }
});

checkNumberBtn.addEventListener('click', handleAuthNumAlertShow);
document
  .querySelector('.duplicate_number_alert_btn')
  .addEventListener('click', handleAuthNumAlertClose);

duplicateIdBtn.addEventListener('click', handleValidationAlertShow);
duplicateAlertBtn.addEventListener('click', handleValidationAlertClose);
// duplicateEmailBtn.addEventListener('click', handleDuplicateAlertShow);
// duplicateEmailAlertBtn.addEventListener('click', handleDuplicateAlertClose);

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

function handleSearchAddress() {
  // eslint-disable-next-line no-undef
  new daum.Postcode({
    oncomplete: function (data) {
      if (data.userSelectedType === 'R') return;
      else return;
    },
  }).open({
    //여러개의 팝업창이 뜨는 것을 방지하기 위해 팝업창의 Key값을 지정
    //지정하지 않을시 기본값은 '_blank'로 설정되어 계속 새창으로 열리게 됩니다
    popupKey: 'popup1',
    popupTitle: '컬리 - 마켓컬리/뷰티컬리',
    left: window.screen.width / 2 - 530 / 2,
    top: window.screen.height / 2 - 630 / 2,
  });
}

const userAddressBtn = getNode('.user_address_btn');

userAddressBtn.addEventListener('click', handleSearchAddress);

if (
  userIdInput.value
  // userPasswordInput.value &&
  // userNameInput.value &&
  // userEmailInput.value &&
  // userPhoneInput.value &&
  // document.querySelectorAll('.radio_wrapper')[0].value
) {
  document.querySelector('.join_btn').classList.remove('disable_btn');
  console.log('버튼 활성화!');
}

document.querySelector('.join_btn').addEventListener('click', function (e) {
  e.preventDefault();

  const data = {
    username: userIdInput.value,
    password: userPasswordInput.value,
    passwordConfirm: userPasswordInput.value,
    name: userNameInput.value,
    email: userEmailInput.value,
    phone: userPhoneInput.value,
    gender: document.querySelectorAll('.radio_wrapper')[0].value ?? 'none',
    birth: `${document.querySelector('#year').value}${
      document.querySelector('#month').value
    }${document.querySelector('#day').value}`,
  };

  pb.collection('users')
    .create(data)
    .then(() => {
      console.log('회원가입 완료!');
      location.href = '%BASE_URL%src/pages/login/';
    })
    .catch((error) => {
      console.log('회원가입 실패', error);
    });
});

document
  .querySelectorAll('.radio_wrapper')[0]
  .addEventListener('click', function (e) {
    if (e.target.tagName !== 'INPUT') return;
    document.querySelectorAll('.radio_wrapper')[0].value = e.target.value;
  });

document.querySelector('#year').addEventListener('input', function (e) {
  // if(year >== 1900 && year <== 2024)

  if (e.target.value.length > 4) {
    e.target.value = e.target.value.toString();
    e.target.value = e.target.value.slice(0, 4);

    let year = Number(e.target.value);
    if (year >= 1900 && year <= 2024) {
      document.querySelector('#year').textContent = e.target.value;
      // console.log(e.target.value);
    }
  }
});
document.querySelector('#month').addEventListener('input', function (e) {
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.toString();
    e.target.value = e.target.value.slice(0, 2);

    let month = Number(e.target.value);
    if (month >= 1 && month <= 12) {
      // if (month < 10) {
      //   e.target.value = '0' + month;
      // }
      document.querySelector('#month').textContent = e.target.value;
      // console.log(e.target.value);
    }
  }
});
document.querySelector('#day').addEventListener('input', function (e) {
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.toString();
    e.target.value = e.target.value.slice(0, 2);

    let day = Number(e.target.value);
    if (day >= 1 && day <= 31) {
      document.querySelector('#day').textContent = e.target.value;
      // console.log(e.target.value);
    }
  }
});

// document.querySelector('.test').addEventListener('click', function () {
//   console.log(document.querySelector('#year').value);
//   console.log(document.querySelector('#month').value);
//   console.log(document.querySelector('#day').value);
// });
