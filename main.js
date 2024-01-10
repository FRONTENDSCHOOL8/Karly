import '/src/styles/style.css';
import '/src/styles/main.css';
import '/src/components/header/header.css';
import '/src/components/footer/footer.css';

// 로그인 상태인지 확인
import { getStorage } from '/src/lib';
import { getNodes, deleteStorage } from '/src/lib';
import pb from '/src/api/pocketbase';

if (getStorage('pocketbase_auth')) {
  const { model } = await getStorage('pocketbase_auth');
  const welcome = getNodes('.header_member_service li a');
  welcome[0].textContent = `${model.name} 님`;
  ('welcome');
  welcome[0].style.color = 'var(--black)';
  welcome[0].style.fontWeight = '700';
  welcome[1].textContent = '로그아웃';
  welcome[1].href = '/src/pages/main/';
  // window.location.reload();

  welcome[1].addEventListener('click', function () {
    pb.authStore.clear();
    deleteStorage('auth');
  });
}
