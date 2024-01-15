import"./style-v06b81ne.js";import{p as m,g as u,a as e,c as i}from"./header-tMjJ4wC4.js";/* empty css               */import{c as p,i as C}from"./checkLogin-dd8Ug7jR.js";import{c as h}from"./itemList-MN9rZj0T.js";import"./storage-PSdSBPgg.js";p();const _=await m.collection("products").getList(1,15),g=u(".item_list_container");h(g,_.items);const f=e(".cart_button"),v=e(".icon_wrapper");function L(r){const s=r.currentTarget.parentElement.firstElementChild.firstElementChild,c=s.firstElementChild,a=s.lastElementChild.children[1];function o(){return`
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
  `}function l(t){C(t,o())}v.forEach(t=>{l(t)});const b=e(".cart_bubble"),d=e(".cart_bubble_pointer");b.forEach(t=>{i(t,"visibility","visible"),setTimeout(()=>{i(t,"visibility","hidden")},4e3),d.forEach(n=>{i(n,"visibility","visible"),setTimeout(()=>{i(n,"visibility","hidden")},4e3)})})}f.forEach(r=>{r.addEventListener("click",L)});
