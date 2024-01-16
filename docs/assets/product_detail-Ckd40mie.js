import"./style-v06b81ne.js";import{p as v,g as c,a as b,c as s}from"./header-qYaCn0IU.js";/* empty css               */import{b as k,S as H,N as T,P as A,A as q}from"./autoplay-kvZURvwd.js";import{c as $,b as U,d as N,i as m,a as n,g as d}from"./checkLogin-VMqPfWLq.js";import{g as p,s as w,a as M,d as Q}from"./setDefaultData-8dNE6q3B.js";import{s as Z}from"./setDocumentTitle-_OwlDZqT.js";$();const V=window.location.hash.slice(1),o=await v.collection("products").getOne(V);Z(`칼리 | ${o.name}`);const K=c(".product_purchase_container");function O(t){return`
  <img
  class="product_img"
  src="${d(t)}"
  alt="${t.name}"
/>
  `}function R(t,e){U(t,O(e))}R(K,o);const F=c(".product_purchase_container");function W({delivery:t,name:e,description:r,price:a,delivery_info:_,seller:l,package_type:S,package_info:x,unit:I,volume:B,origin:D,allergy:L}){return`
  <article class="product_summary">
  <h3 class="sr_only">상품 판매 개요</h3>
  <p class="product_delivery_info">${t}</p>
  <h4 class="product_title">${e}</h4>
  <p class="product_description">${r}</p>
  <p class="product_price"><em>${n(a)}</em>원</p>
  <small class="benefit_notice"
    >로그인 후, 적립 혜택이 제공됩니다.</small
  >
  <table class="product_brief_info_container">
    <caption class="sr_only">
      상품 판매 정보
    </caption>
    <tr>
      <th class="product_delivery">배송</th>
      <td class="product_delivery_type">
        ${t}
        ${_}
      </td>
    </tr>
    <tr>
      <th class="product_seller">판매자</th>
      <td class="product_seller_info">${l}</td>
    </tr>
    <tr>
      <th class="product_package">포장타입</th>
      <td class="product_package_type">
        ${S}
        ${x}
      </td>
    </tr>
    <tr>
      <th class="product_sell_unit">판매단위</th>
      <td class="product_sell_unit_info">${I}</td>
    </tr>
    <tr>
      <th class="product_volume">중량/용량</th>
      <td class="product_volume_info">${B}</td>
    </tr>
    <tr>
      <th class="product_origin">원산지</th>
      <td class="product_origin_description">${D}</td>
    </tr>
    <tr>
      <th class="product_allergy">알레르기정보</th>
      <td class="product_allergy_info">
        ${L}
      </td>
    </tr>
    <tr>
      <th class="product_select">상품선택</th>
      <td class="product_select_option">
        <div class="product_quantity_selector">
          <strong class="product_name">${e}</strong>
          <div class="product_quantity_select_buttons">
            <button
              class="product_quantity_decrease_button"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M20 14V16H10V14H20Z"
                  fill="var(--gray--300)"
                />
              </svg></button
            >1<button
              class="product_quantity_increase_button"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M16 10V14H20V16H16V20H14V16H10V14H14V10H16Z"
                  fill="var(--content)"
                />
              </svg>
            </button>
          </div>
          <em class="calculated_price">${n(a)}원</em>
        </div>
      </td>
    </tr>
  </table>
</article>
<article class="product_total_price_section">
  <h3 class="sr_only">총 상품 금액</h3>
  <p class="product_total_price">
    <span>총 상품 금액&#58;</span
    ><em class="total_price">${n(a)}</em>원
  </p>
  <small class="benefit_notice">로그인 후, 적립 혜택 제공</small>
</article>
  `}function j(t,e){N(t,W(e))}j(F,o);const z=c(".product_description_brief_info");function G(t){return`
  <picture class="product_description_img_container">
    <img
      class="product_description_img"
      src="${d(t,"image",1)}"
      alt="${t.name}"
    />
  </picture>
  <div class="product_description_info_container">
    <p>${t.description}</p>
    <h4>${t.name}</h4>
    <p>
      ${t.introduction}
    </p>
  </div>
  `}function J(t,e){m(t,G(e))}J(z,o);const X=c(".product_details_info");function Y(t){return`
  <picture>
  <img
    src="${d(t,"details_pic")}"
    alt="제품 상세 정보"
  />
</picture>
  `}function tt(t,e){m(t,Y(e))}tt(X,o);const et=c(".product_quantity_increase_button"),f=c(".product_quantity_decrease_button");function ct(){const t=this.previousSibling,e=c(".product_price").firstElementChild.innerText.replaceAll(",","")*1,r=c(".calculated_price"),a=c(".total_price");if(t.nodeValue=t.nodeValue-0+1+"",r.innerText=n(e*t.nodeValue)+"원",a.innerText=n(e*t.nodeValue),t.nodeValue!==1){const l=f.firstElementChild.firstElementChild;s(f,"cursor","pointer"),s(l,"fill","var(--content)")}}function rt(){const t=this.nextSibling,e=c(".product_price").firstElementChild.innerText.replaceAll(",","")*1,r=c(".calculated_price"),a=c(".total_price");if(t.nodeValue==="2"){const l=this.firstElementChild.firstElementChild;s(this,"cursor","default"),s(l,"fill","var(--gray--300)")}t.nodeValue!=="1"&&(t.nodeValue=t.nodeValue-1+"",r.innerText=n(e*t.nodeValue)+"원",a.innerText=n(e*t.nodeValue))}et.addEventListener("click",ct);f.addEventListener("click",rt);const E=c(".dibs_button");let h=!1;function at(){const t=E.firstElementChild,e=t.firstElementChild;h?(s(t,"fill","none"),s(e,"stroke","var(--primary)"),h=!1):(s(t,"fill","var(--accent--yellow"),s(e,"stroke","var(--accent--yellow)"),h=!0)}E.addEventListener("click",at);const y=b(".icon_wrapper");function st(t){return`
  <div class="cart_bubble">
  <picture class="cart_bubble_img_container">
    <img
      class="cart_bubble_img"
      src="${d(t)}"
      alt="${t.name}"
    />
  </picture>
  <div class="cart_bubble_textbox">
    <h4 class="cart_bubble_product">
      ${t.name}
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
  `}function it(t,e){y.forEach(r=>{m(r,st(e))})}it(y,o);const C=c(".add_cart_button");function nt(){const t=b(".cart_bubble"),e=b(".cart_bubble_pointer");t.forEach(r=>{s(r,"visibility","visible"),setTimeout(()=>{s(r,"visibility","hidden")},4e3),e.forEach(a=>{s(a,"visibility","visible"),setTimeout(()=>{s(a,"visibility","hidden")},4e3)})})}C.addEventListener("click",nt);$();async function ot(){const e=(await p("auth")).user.username,r=c(".product_quantity_select_buttons"),a={username:e,product_id:V,quantity:r.innerText*1};await v.collection("cart").create(a)}C.addEventListener("click",ot);y.forEach(async t=>{const e=t.children[2].firstElementChild;(await p("auth")).isAuth?e.href="/Karly/src/pages/cart/":e.href="/Karly/src/pages/login/"});localStorage.getItem("auth")||w("auth",M);const{user:lt}=await p("auth");localStorage.getItem("view")||w("view",Q);const g=await p("view");let i=g.id,P=[];const u=window.location.hash.slice(1),ut=10;i.includes(u)?(i=i.filter(t=>t!==u),i.push(u)):(i.length>=ut&&i.shift(),g.id.push(u));const dt={user:lt,id:i};w("view",dt);async function pt(){for(let t of i){const e=await v.collection("products").getOne(t);P.push(e)}P.forEach(t=>{k(".recent > .swiper-wrapper",t)}),new H(".swiper.recent",{modules:[T,A,q],direction:"vertical",slidesPerView:3,spaceBetween:15,centeredSlides:!1,navigation:{nextEl:".swiper-button-next.recent",prevEl:".swiper-button-prev.recent"}})}pt();
