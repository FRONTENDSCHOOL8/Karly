import '/src/styles/style.css';
import '/src/components/header/header.css';
import '/src/pages/register/register.css';
import '/src/components/footer/footer.css';
import {
  getNode,
  setDocumentTitle,
  handleValidationId,
  handleValidationPassword,
  handleValidationEmail,
} from '/src/lib';
import pb from '/src/api/pocketbase.js';

setDocumentTitle('칼리 | 회원가입');

const html = getNode('html');

const form = getNode('form fieldset');
const userIdInput = getNode('.user_id_input');
const userPasswordInput = getNode('.user_password_input');
const userEmailInput = getNode('.user_email_input');
const checkNumberBtn = getNode('.check_number_btn');
const userAddressBtn = getNode('.user_address_btn');
let { gender } = { gender: 'none' };
const birthInput = getNode('.birth_box');

const duplicateIdBtn = getNode('.duplicate_id_btn');
const duplicateAlertContainer = getNode('.duplicate_alert_container');
const duplicateAlertText = getNode('.duplicate_alert_text');
const duplicateEmailBtn = getNode('.duplicate_email_btn');
const duplicateEmailAlertContainer = getNode(
  '.duplicate_email_alert_container'
);
const duplicateEmailAlertText = getNode('.duplicate_email_alert_text');
const duplicateNumberAlertBtn = getNode('.duplicate_number_alert_btn');
const duplicateAlertBtn = getNode('.duplicate_alert_btn');
const duplicateEmailAlertBtn = getNode('.duplicate_email_alert_btn');

const errorMessage = getNode('.error_message');
const userPasswordError = getNode('#user_password_error');
const userPasswordCheckError = getNode('#user_password_check_error');
const userEmailError = getNode('#user_email_error');

let { all, check1, check2, check3, check4 } = {
  all: false,
  check1: false,
  check2: false,
  check3: false,
  check4: false,
};
const agreeInfoWrapper = getNode('.agree_info_wrapper');
const agreeAll = getNode('#agree_all');

const joinBtn = getNode('.join_btn');

// ==================================================================================
//                              중복확인
// ==================================================================================

// 아이디 중복확인 (return값이 true면 중복이라는 뜻)
async function DuplicationId() {
  const records = await pb.collection('users').getFullList();
  let res = records.filter((item) => userIdInput.value === item.username);
  if (res.length === 0) return false;
  else return true;
}

// 이메일 중복확인 후 생성된 정보 db에서 삭제
async function deleteUserInfo() {
  const records = await pb.collection('users').getFullList();
  let res = records.filter((item) => userEmailInput.value === item.email);
  if (res.length !== 0) await pb.collection('users').delete(res[0].id);
}

// ==================================================================================
//                              알림창 열기 관련
// ==================================================================================

// 아이디 중복확인 알림창 보이기
async function handleValidationAlertShow() {
  if (!handleValidationId(userIdInput.value)) {
    duplicateAlertText.textContent =
      '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
    duplicateAlertContainer.style.visibility = 'visible';
    html.style.overflowY = 'hidden';
  } else {
    if (await DuplicationId()) {
      duplicateAlertText.textContent = '이미 등록된 아이디 입니다';
      duplicateAlertContainer.style.visibility = 'visible';
      html.style.overflowY = 'hidden';
    } else {
      duplicateIdBtn.disabled = true;
      duplicateIdBtn.classList.add('disable_btn');
      duplicateAlertText.textContent = '사용 할 수 있는 아이디 입니다';
      duplicateAlertContainer.style.visibility = 'visible';
      html.style.overflowY = 'hidden';
    }
  }
}

// 이메일 중복확인 알림창 보이기
async function handleDuplicateAlertShow() {
  const data = {
    username: '',
    password: '111111',
    passwordConfirm: '111111',
    email: userEmailInput.value,
    emailVisibility: true,
  };

  if (!handleValidationEmail(userEmailInput.value)) {
    duplicateEmailAlertText.textContent = '이메일 형식으로 입력해 주세요.';
    duplicateEmailAlertContainer.style.visibility = 'visible';
    html.style.overflowY = 'hidden';
  } else {
    pb.collection('users')
      .create(data)
      .then(() => {
        duplicateEmailBtn.disabled = true;
        duplicateEmailBtn.classList.add('disable_btn');
        duplicateEmailAlertText.textContent = '사용 가능한 이메일 입니다.';
        duplicateEmailAlertContainer.style.visibility = 'visible';
        html.style.overflowY = 'hidden';
        deleteUserInfo();
      })
      .catch(() => {
        duplicateEmailAlertText.textContent = '이미 등록된 이메일 입니다.';
        duplicateEmailAlertContainer.style.visibility = 'visible';
        html.style.overflowY = 'hidden';
      });
  }
}

// 인증번호 알림창 보이기
async function handleAuthNumAlertShow() {
  if (!checkNumberBtn.disabled) {
    getNode('.duplicate_number_alert_text').textContent =
      '믿음으로 인증되었습니다';
    getNode('.duplicate_number_alert_container').style.visibility = 'visible';
    checkNumberBtn.classList.add('disable_btn');
    html.style.overflowY = 'hidden';
    checkNumberBtn.disabled = true;
  }
}

// 인증번호 받기
checkNumberBtn.addEventListener('click', handleAuthNumAlertShow);

// 아이디 중복확인 버튼
form.addEventListener('click', (e) => {
  if (e.target.className === 'duplicate_id_btn') handleValidationAlertShow();
});

// 이메일 중복확인 버튼
duplicateEmailBtn.addEventListener('click', handleDuplicateAlertShow);

// ==================================================================================
//                              알림창 닫기 관련
// ==================================================================================

// 알림창 닫기
function handleAlertClose(node) {
  node.style.visibility = 'hidden';
  html.style.overflowY = 'scroll';
}

// 인증번호 알림창 닫기
duplicateNumberAlertBtn.addEventListener('click', () =>
  handleAlertClose(getNode('.duplicate_number_alert_container'))
);

// 중복확인 알림창 닫기
duplicateAlertBtn.addEventListener('click', () =>
  handleAlertClose(duplicateAlertContainer)
);

// 이메일 중복확인 알림창 닫기
duplicateEmailAlertBtn.addEventListener('click', () =>
  handleAlertClose(duplicateEmailAlertContainer)
);

// ==================================================================================
//                              회원정보 입력
// ==================================================================================

// 아이디 입력
userIdInput.addEventListener('input', (e) => {
  duplicateIdBtn.disabled = false;
  duplicateIdBtn.classList.remove('disable_btn');

  let state = handleValidationId(e.target.value);

  if (state) errorMessage.classList.remove('is_invalid');
  else errorMessage.classList.add('is_invalid');
});

// 비밀번호 입력
userPasswordInput.addEventListener('input', (e) => {
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

// 비밀번호 확인 입력
form.addEventListener('input', (e) => {
  if (e.target.id !== 'user_password_check') return;

  if (e.target.value === userPasswordInput.value) {
    userPasswordCheckError.classList.remove('is_invalid');
  } else {
    userPasswordCheckError.classList.add('is_invalid');
  }
});

// 이메일 입력
userEmailInput.addEventListener('input', (e) => {
  duplicateEmailBtn.disabled = false;
  duplicateEmailBtn.classList.remove('disable_btn');

  let state = handleValidationEmail(e.target.value);

  if (state) userEmailError.classList.remove('is_invalid');
  else userEmailError.classList.add('is_invalid');
});

// 휴대폰 번호 입력
form.addEventListener('input', (e) => {
  if (e.target.id !== 'user_phone') return;

  let val = e.target.value;

  if (isNaN(val)) {
    e.target.value = '';
  } else {
    e.target.value = val;
    if (val) {
      checkNumberBtn.classList.remove('disable_btn');
      checkNumberBtn.disabled = false;
    } else {
      checkNumberBtn.classList.add('disable_btn');
      checkNumberBtn.disabled = true;
    }
  }
});

// 주소 api 가져와 사용하는 함수
function handleSearchAddress() {
  // eslint-disable-next-line no-undef
  new daum.Postcode({
    oncomplete: function (data) {
      if (data.userSelectedType === 'R') {
        document.querySelector('.user_address_input').value = data.roadAddress;
        document
          .querySelector('.user_address_wrapper')
          .classList.add('address_hidden');
        document
          .querySelector('.user_detail_address_wrapper')
          .classList.remove('address_hidden');
        document.querySelector('#user_detail_address').value = '';
      } else if (data.userSelectedType === 'J') {
        document.querySelector('.user_address_input').value = data.jibunAddress;
        document
          .querySelector('.user_address_wrapper')
          .classList.add('address_hidden');
        document
          .querySelector('.user_detail_address_wrapper')
          .classList.remove('address_hidden');
        document.querySelector('#user_detail_address').value = '';
      } else return;
    },
  }).open({
    //여러개의 팝업창이 뜨는 것을 방지하기 위해 팝업창의 Key값을 지정
    //지정하지 않을시 기본값은 '_blank'로 설정되어 계속 새창으로 열리게 됩니다
    popupKey: 'popup1',
    popupTitle: '칼리 - 마켓칼리/뷰티칼리',
    left: window.screen.width / 2 - 530 / 2,
    top: window.screen.height / 2 - 630 / 2,
  });
}
// 주소검색 버튼 클릭
userAddressBtn.addEventListener('click', handleSearchAddress);

// 주소 다시 검색 버튼 클릭
getNode('.check_detail_address_btn').addEventListener(
  'click',
  handleSearchAddress
);

// 성별 체크
form.addEventListener('change', function (e) {
  if (e.target.name !== 'gender') return;
  gender = e.target.value;
});

// 생년월일 입력 함수
function handleBirthInput(e) {
  if (e.target.id === 'year' && e.target.value.length > 4) {
    e.target.value = e.target.value.toString();
    e.target.value = e.target.value.slice(0, 4);

    let year = Number(e.target.value);
    if (year >= 1900 && year <= 2024) {
      e.target.textContent = e.target.value;
    }
  } else if (e.target.id === 'month' && e.target.value.length > 2) {
    e.target.value = e.target.value.toString();
    e.target.value = e.target.value.slice(0, 2);

    let month = Number(e.target.value);
    if (month >= 1 && month <= 12) {
      e.target.textContent = e.target.value;
    }
  } else if (e.target.id === 'day' && e.target.value.length > 2) {
    e.target.value = e.target.value.toString();
    e.target.value = e.target.value.slice(0, 2);

    let day = Number(e.target.value);
    if (day >= 1 && day <= 31) {
      e.target.textContent = e.target.value;
    }
  }
}

// 생년월인 입력
birthInput.addEventListener('input', (e) => handleBirthInput(e));

// ==================================================================================
//                              회원가입 기능
// ==================================================================================

// 회원가입 기능 함수
function handleCreateUser() {
  const data = {
    username: userIdInput.value,
    password: userPasswordInput.value,
    passwordConfirm: userPasswordInput.value,
    name: getNode('.user_name_input').value,
    email: userEmailInput.value,
    emailVisibility: true,
    phone: getNode('.user_phone_input').value,
    address: `${getNode('.user_address_input').value} ${
      getNode('#user_detail_address').value
    }`,
    gender,
    birth: `${getNode('#year').value}${getNode('#month').value}${
      getNode('#day').value
    }`,
  };

  pb.collection('users')
    .create(data)
    .then(() => (location.href = '/src/pages/login/'));
}

// 가입하기 버튼 클릭
joinBtn.addEventListener('click', handleCreateUser);

// ==================================================================================
//                              이용약관동의
// ==================================================================================

// 전체 동의하면 모두 checked 상태 true로 변경하는 함수
function handleAgreeAll(state) {
  for (let i = 1; i < 5; i++) getNode(`#check_${i}`).checked = state;
}

// 전체 동의 버튼 클릭
agreeAll.addEventListener('click', function () {
  if (agreeAll.checked) handleAgreeAll(true);
  else handleAgreeAll(false);
});

// 이용약관동의 체크 여부 함수
function handleAgreeCheeck(e) {
  if (e.target.name === 'agree_all') {
    if (e.target.checked) {
      check1 = true;
      check2 = true;
      check3 = true;
      check4 = true;
    } else {
      check1 = false;
      check2 = false;
      check3 = false;
      check4 = false;
    }
  } else if (e.target.name === 'check_1') {
    if (e.target.checked) check1 = true;
    else {
      check1 = false;
      agreeAll.checked = false;
    }
  } else if (e.target.name === 'check_2') {
    if (e.target.checked) check2 = true;
    else {
      check2 = false;
      agreeAll.checked = false;
    }
  } else if (e.target.name === 'check_3') {
    if (e.target.checked) check3 = true;
    else {
      check3 = false;
      agreeAll.checked = false;
    }
  } else if (e.target.name === 'check_4') {
    if (e.target.checked) check4 = true;
    else {
      check4 = false;
      agreeAll.checked = false;
    }
  }

  joinBtnActive(check1, check2, check3, check4, all);
}

// 필수체크 사항 여부에 따른 가입하기 버튼 활성화 함수
function joinBtnActive(check1, check2, check3, check4, all) {
  joinBtn.classList.add('disable_btn');
  joinBtn.disabled = true;

  if (check1 && check2 && !check3 && check4) {
    joinBtn.classList.remove('disable_btn');
    joinBtn.disabled = false;
    agreeAll.checked = false;
  } else if ((check1 && check2 && check4) || all) {
    joinBtn.classList.remove('disable_btn');
    joinBtn.disabled = false;
    agreeAll.checked = true;
  }
}

// 이용약관동의 체크
agreeInfoWrapper.addEventListener('change', (e) => handleAgreeCheeck(e));
