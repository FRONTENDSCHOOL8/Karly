import"./style-v06b81ne.js";import{a as m,g as e,c as i}from"./header-60uMwEkC.js";/* empty css               */import{i as u}from"./getPbImageURL-VQZ22oC_.js";import{c as p}from"./itemList-6Cw8PWkb.js";import{p as C}from"./pocketbase-mqgmocw_.js";const h=await C.collection("products").getList(1,15),_=m(".item_list_container");p(_,h.items);const g=e(".cart_button"),f=e(".icon_wrapper");function v(r){const s=r.currentTarget.parentElement.firstElementChild.firstElementChild,c=s.firstElementChild,a=s.lastElementChild.children[1];function o(){return`
  <div class="cart_bubble">
  <picture class="cart_bubble_img_container">
    <img
      class="cart_bubble_img"
      src="${c.src}"
      alt="${a.innerText}"
    />
  </picture>
  <div class="cart_bubble_textbox">
    <h4 class="cart_bubble_product">
      ${a.innerText}
    </h4>
    <p class="cart_bubble_description">
      장바구니에 상품을 담았습니다.
    </p>
  </div>
</div>
<svg
  class="cart_bubble_pointer"
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="18"
  viewBox="0 0 20 18"
  fill="none"
>
  <path d="M10 1L18.6603 13.75H1.33975L10 1Z" fill="white" />
  <path d="M1 13.5L10 1L18.5 13.5" stroke="#C4C4C4" />
</svg>
  `}function l(t){u(t,o())}f.forEach(t=>{l(t)});const b=e(".cart_bubble"),d=e(".cart_bubble_pointer");b.forEach(t=>{i(t,"visibility","visible"),setTimeout(()=>{i(t,"visibility","hidden")},4e3),d.forEach(n=>{i(n,"visibility","visible"),setTimeout(()=>{i(n,"visibility","hidden")},4e3)})})}g.forEach(r=>{r.addEventListener("click",v)});
