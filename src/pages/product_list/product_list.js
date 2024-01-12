import '/src/components/header/header.js';
import '/src/components/footer/footer.js';
import '/src/pages/product_list/product_list.css';
import { getNode, renderItemList } from '/src/lib';
import pb from '/src/api/pocketbase';

// 포켓호스트 서버에서 상품 정보 받아와서 제품 목록 페이지 화면에 렌더링
const itemList = await pb.collection('products').getList(1, 15);
const itemListContainer = getNode('.item_list_container');

renderItemList(itemListContainer, itemList.items);
