import pb from '../../api/pocketbase.js';
import {
  defaultAuthData,
  defaultViewData,
  deleteStorage,
  getNodes,
  getStorage,
  setStorage,
} from '/src/lib';

export async function checkLogin() {
  if (await getStorage('pocketbase_auth')) {
    const { model } = await getStorage('pocketbase_auth');
    const welcome = getNodes('.header_member_service li a');
    welcome[0].textContent = `${model.name} 님`;
    ('welcome');
    welcome[0].style.color = 'var(--black)';
    welcome[0].style.fontWeight = '700';
    welcome[1].textContent = '로그아웃';
    welcome[1].href = '/Karly/src/pages/main/';
    welcome[1].addEventListener('click', function () {
      pb.authStore.clear();
      deleteStorage('pocketbase_auth');
      setStorage('view', defaultViewData);
      setStorage('auth', defaultAuthData);
    });
  }
}
