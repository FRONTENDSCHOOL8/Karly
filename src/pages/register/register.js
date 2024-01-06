import '/src/styles/style.css';
import '/src/components/header/header.css';
import '/src/pages/register/register.css';
import '/src/components/footer/footer.css';
import { getNode } from '/src/lib';

/*
.user_id_input,
.user_password_input,
.user_password_check_input,
.user_name_input,
.user_email_input,
.user_phone_input
*/

const userId = getNode('.user_id_input');
const userPassword_input = getNode('.user_password_input');
const userPasswordCheckInput = getNode('.user_password_check_input');
const userNameInput = getNode('.user_name_input');
const userEmailInput = getNode('.user_email_input');
const userPhoneInput = getNode('.user_phone_input');

// input에 값이 있다면 글자가 검은색으로 변함
function handleInputActive(e, node) {
  if (e.target.value) node.classList.add('input_active');
}

userId.addEventListener('input', (e) => handleInputActive(e, userId));
userPassword_input.addEventListener('input', (e) =>
  handleInputActive(e, userPassword_input)
);
userPasswordCheckInput.addEventListener('input', (e) =>
  handleInputActive(e, userPasswordCheckInput)
);
userNameInput.addEventListener('input', (e) =>
  handleInputActive(e, userNameInput)
);
userEmailInput.addEventListener('input', (e) =>
  handleInputActive(e, userEmailInput)
);
userPhoneInput.addEventListener('input', (e) =>
  handleInputActive(e, userPhoneInput)
);
