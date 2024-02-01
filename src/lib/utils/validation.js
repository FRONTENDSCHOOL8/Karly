// 아이디 유효성 검사
export function validateId(id) {
  const regex = /^(?=.*[A-Za-z])[A-Za-z\d]{6,16}$/;

  if (regex.test(id)) return true;
  else return false;
}

// 비밀번호 유효성 검사
export function validatePassword(pw) {
  const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,16}$/;

  if (regex.test(pw)) return true;
  else return false;
}

// 이메일 유효성 검사
export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(email)) return true;
  else return false;
}
