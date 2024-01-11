import '/src/components/header/header.js';
import '/src/components/footer/footer.js';
import '/src/pages/product_list/product_list.css';
import { getNode, renderItemCard } from '/src/lib';
import pb from '/src/api/pocketbase';

// 포켓호스트 서버에서 상품 정보 받아와서 제품 목록 페이지 화면에 렌더링
const product = await pb.collection('products').getOne('sgg2ool4qfysk7a');
const itemList = getNode('.item_list_container');

renderItemCard(itemList, product);
// console.log(product);
