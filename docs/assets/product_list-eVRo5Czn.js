import"./style-v06b81ne.js";import{p as u,g as L,a as s,c as n}from"./header-qYaCn0IU.js";/* empty css               */import{c as y,b as I,S as x,N as B,P as S,A as k}from"./autoplay-VpRqDq9N.js";import{c as m,i as D}from"./checkLogin-Eh0U5S-P.js";import{g as o,s as b,a as A,d as N}from"./setDefaultData-8dNE6q3B.js";m();const T=await u.collection("products").getList(1,15),U=L(".item_list_container");y(U,T.items);const g=s(".cart_button"),f=s(".icon_wrapper");function P(t){const r=t.currentTarget.previousElementSibling.firstElementChild,c=r.firstElementChild,l=r.lastElementChild.children[1];function d(){return`
  <div class="cart_bubble">
  <picture class="cart_bubble_img_container">
    <img
      class="cart_bubble_img"
      src="${c.src}"
      alt="${l.innerText}"
    />
  </picture>
  <div class="cart_bubble_textbox">
    <h4 class="cart_bubble_product">
      ${l.innerText}
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
  `}function C(a){D(a,d())}f.forEach(a=>{C(a)});const _=s(".cart_bubble"),E=s(".cart_bubble_pointer");_.forEach(a=>{n(a,"visibility","visible"),setTimeout(()=>{n(a,"visibility","hidden")},4e3),E.forEach(h=>{n(h,"visibility","visible"),setTimeout(()=>{n(h,"visibility","hidden")},4e3)})})}g.forEach(t=>{t.addEventListener("click",P)});m();async function F(t){const i=t.currentTarget.previousElementSibling,r=i.href.indexOf("#"),c=i.href.slice(r+1),d={username:(await o("auth")).user.username,product_id:c,quantity:1};await u.collection("cart").create(d)}g.forEach(t=>{t.addEventListener("click",F)});f.forEach(async t=>{const e=t.children[2].firstElementChild;(await o("auth")).isAuth?e.href="/Karly/src/pages/cart/":e.href="/Karly/src/pages/login/"});localStorage.getItem("auth")||b("auth",A);const{user:V}=await o("auth");localStorage.getItem("view")||b("view",N);const $=await o("view");let w=$.id,p=[];const H={user:V,id:w};b("view",H);async function K(){for(let t of w){const e=await u.collection("products").getOne(t);p.push(e)}p.forEach(t=>{I(".recent > .swiper-wrapper",t)}),new x(".swiper.recent",{modules:[B,S,k],direction:"vertical",slidesPerView:3,spaceBetween:15,centeredSlides:!1,navigation:{nextEl:".swiper-button-next.recent",prevEl:".swiper-button-prev.recent"}})}K();
