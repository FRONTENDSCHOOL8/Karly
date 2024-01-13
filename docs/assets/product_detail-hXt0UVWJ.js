import"./style-v06b81ne.js";import{p as E,g as c,a as h,c as r}from"./header-tMjJ4wC4.js";/* empty css               */import{c as B,e as I,f as L,i as g,b as o,a as k,d as H,g as u}from"./checkLogin-dd8Ug7jR.js";import{s as m,g as v}from"./storage-PSdSBPgg.js";import{s as D}from"./setDocumentTitle-_OwlDZqT.js";B();const T=window.location.hash.slice(1),n=await E.collection("products").getOne(T);console.log(n.image);D(`칼리 | ${n.name}`);const q=c(".product_purchase_container");function A(t){return`
  <img
  class="product_img"
  src="${u(t)}"
  alt="${t.name}"
/>
  `}function M(t,e){I(t,A(e))}M(q,n);const Z=c(".product_purchase_container");function N({delivery:t,name:e,description:s,price:i,delivery_info:p,seller:l,package_type:$,package_info:P,unit:V,volume:S,origin:x,allergy:C}){return`
  <article class="product_summary">
  <h3 class="sr_only">상품 판매 개요</h3>
  <p class="product_delivery_info">${t}</p>
  <h4 class="product_title">${e}</h4>
  <p class="product_description">${s}</p>
  <p class="product_price"><em>${o(i)}</em>원</p>
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
        ${p}
      </td>
    </tr>
    <tr>
      <th class="product_seller">판매자</th>
      <td class="product_seller_info">${l}</td>
    </tr>
    <tr>
      <th class="product_package">포장타입</th>
      <td class="product_package_type">
        ${$}
        ${P}
      </td>
    </tr>
    <tr>
      <th class="product_sell_unit">판매단위</th>
      <td class="product_sell_unit_info">${V}</td>
    </tr>
    <tr>
      <th class="product_volume">중량/용량</th>
      <td class="product_volume_info">${S}</td>
    </tr>
    <tr>
      <th class="product_origin">원산지</th>
      <td class="product_origin_description">${x}</td>
    </tr>
    <tr>
      <th class="product_allergy">알레르기정보</th>
      <td class="product_allergy_info">
        ${C}
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
          <em class="calculated_price">${o(i)}원</em>
        </div>
      </td>
    </tr>
  </table>
</article>
<article class="product_total_price_section">
  <h3 class="sr_only">총 상품 금액</h3>
  <p class="product_total_price">
    <span>총 상품 금액&#58;</span
    ><em class="total_price">${o(i)}</em>원
  </p>
  <small class="benefit_notice">로그인 후, 적립 혜택 제공</small>
</article>
  `}function Q(t,e){L(t,N(e))}Q(Z,n);const F=c(".product_description_brief_info");function O(t){return`
  <picture class="product_description_img_container">
    <img
      class="product_description_img"
      src="${u(t,"image",1)}"
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
  `}function R(t,e){g(t,O(e))}R(F,n);const U=c(".product_details_info");function W(t){return`
  <picture>
  <img
    src="${u(t,"details_pic")}"
    alt="제품 상세 정보"
  />
</picture>
  `}function j(t,e){g(t,W(e))}j(U,n);const z=c(".product_quantity_increase_button"),b=c(".product_quantity_decrease_button");function G(){const t=this.previousSibling,e=c(".product_price").firstElementChild.innerText.replaceAll(",","")*1,s=c(".calculated_price"),i=c(".total_price");if(t.nodeValue=t.nodeValue-0+1+"",s.innerText=o(e*t.nodeValue)+"원",i.innerText=o(e*t.nodeValue),t.nodeValue!==1){const l=b.firstElementChild.firstElementChild;r(b,"cursor","pointer"),r(l,"fill","var(--content)")}}function J(){const t=this.nextSibling,e=c(".product_price").firstElementChild.innerText.replaceAll(",","")*1,s=c(".calculated_price"),i=c(".total_price");if(t.nodeValue==="2"){const l=this.firstElementChild.firstElementChild;r(this,"cursor","default"),r(l,"fill","var(--gray--300)")}t.nodeValue!=="1"&&(t.nodeValue=t.nodeValue-1+"",s.innerText=o(e*t.nodeValue)+"원",i.innerText=o(e*t.nodeValue))}z.addEventListener("click",G);b.addEventListener("click",J);const w=c(".dibs_button");let _=!1;function K(){const t=w.firstElementChild,e=t.firstElementChild;_?(r(t,"fill","none"),r(e,"stroke","var(--primary)"),_=!1):(r(t,"fill","var(--accent--yellow"),r(e,"stroke","var(--accent--yellow)"),_=!0)}w.addEventListener("click",K);const y=h(".icon_wrapper");function X(t){return`
  <div class="cart_bubble">
  <picture class="cart_bubble_img_container">
    <img
      class="cart_bubble_img"
      src="${u(t)}"
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
  `}function Y(t,e){y.forEach(s=>{g(s,X(e))})}Y(y,n);const tt=c(".add_cart_button");function et(){const t=h(".cart_bubble"),e=h(".cart_bubble_pointer");t.forEach(s=>{r(s,"visibility","visible"),setTimeout(()=>{r(s,"visibility","hidden")},4e3),e.forEach(i=>{r(i,"visibility","visible"),setTimeout(()=>{r(i,"visibility","hidden")},4e3)})})}tt.addEventListener("click",et);localStorage.getItem("auth")||m("auth",k);const{user:ct}=await v("auth");localStorage.getItem("view")||m("view",H);const f=await v("view"),d=window.location.hash.slice(1),rt=10;let a=f.id;a.includes(d)?(a=a.filter(t=>t!==d),a.push(d)):(a.length>=rt&&a.shift(),f.id.push(d));const st={user:ct,id:a};m("view",st);
