import"./style-v06b81ne.js";import{a as c,g as p,c as r}from"./header-60uMwEkC.js";/* empty css               */import{a as P,b as V,i as b,c as o,g as l}from"./getPbImageURL-VQZ22oC_.js";import{s as x}from"./setDocumentTitle-_OwlDZqT.js";import{p as E}from"./pocketbase-mqgmocw_.js";const C=window.location.hash.slice(1),n=await E.collection("products").getOne(C);x(`칼리 | ${n.name}`);const S=c(".product_purchase_container");function B(t){return`
  <img
  class="product_img"
  src="${l(t)}"
  alt="${t.name}"
/>
  `}function H(t,e){P(t,B(e))}H(S,n);const I=c(".product_purchase_container");function L({delivery:t,name:e,description:s,price:i,delivery_info:d,seller:a,package_type:g,package_info:m,unit:v,volume:y,origin:$,allergy:w}){return`
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
        ${d}
      </td>
    </tr>
    <tr>
      <th class="product_seller">판매자</th>
      <td class="product_seller_info">${a}</td>
    </tr>
    <tr>
      <th class="product_package">포장타입</th>
      <td class="product_package_type">
        ${g}
        ${m}
      </td>
    </tr>
    <tr>
      <th class="product_sell_unit">판매단위</th>
      <td class="product_sell_unit_info">${v}</td>
    </tr>
    <tr>
      <th class="product_volume">중량/용량</th>
      <td class="product_volume_info">${y}</td>
    </tr>
    <tr>
      <th class="product_origin">원산지</th>
      <td class="product_origin_description">${$}</td>
    </tr>
    <tr>
      <th class="product_allergy">알레르기정보</th>
      <td class="product_allergy_info">
        ${w}
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
  `}function k(t,e){V(t,L(e))}k(I,n);const T=c(".product_description_brief_info");function q(t){return`
  <picture class="product_description_img_container">
    <img
      class="product_description_img"
      src="${l(t,"image",1)}"
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
  `}function D(t,e){b(t,q(e))}D(T,n);const M=c(".product_details_info");function A(t){return`
  <picture>
  <img
    src="${l(t,"details_pic")}"
    alt="제품 상세 정보"
  />
</picture>
  `}function Z(t,e){b(t,A(e))}Z(M,n);const N=c(".product_quantity_increase_button"),_=c(".product_quantity_decrease_button");function Q(){const t=this.previousSibling,e=c(".product_price").firstElementChild.innerText.replaceAll(",","")*1,s=c(".calculated_price"),i=c(".total_price");if(t.nodeValue=t.nodeValue-0+1+"",s.innerText=o(e*t.nodeValue)+"원",i.innerText=o(e*t.nodeValue),t.nodeValue!==1){const a=_.firstElementChild.firstElementChild;r(_,"cursor","pointer"),r(a,"fill","var(--content)")}}function F(){const t=this.nextSibling,e=c(".product_price").firstElementChild.innerText.replaceAll(",","")*1,s=c(".calculated_price"),i=c(".total_price");if(t.nodeValue==="2"){const a=this.firstElementChild.firstElementChild;r(this,"cursor","default"),r(a,"fill","var(--gray--300)")}t.nodeValue!=="1"&&(t.nodeValue=t.nodeValue-1+"",s.innerText=o(e*t.nodeValue)+"원",i.innerText=o(e*t.nodeValue))}N.addEventListener("click",Q);_.addEventListener("click",F);const h=c(".dibs_button");let u=!1;function O(){const t=h.firstElementChild,e=t.firstElementChild;u?(r(t,"fill","none"),r(e,"stroke","var(--primary)"),u=!1):(r(t,"fill","var(--accent--yellow"),r(e,"stroke","var(--accent--yellow)"),u=!0)}h.addEventListener("click",O);const f=p(".icon_wrapper");function R(t){return`
  <div class="cart_bubble">
  <picture class="cart_bubble_img_container">
    <img
      class="cart_bubble_img"
      src="${l(t)}"
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
  `}function U(t,e){f.forEach(s=>{b(s,R(e))})}U(f,n);const W=c(".add_cart_button");function j(){const t=p(".cart_bubble"),e=p(".cart_bubble_pointer");t.forEach(s=>{r(s,"visibility","visible"),setTimeout(()=>{r(s,"visibility","hidden")},4e3),e.forEach(i=>{r(i,"visibility","visible"),setTimeout(()=>{r(i,"visibility","hidden")},4e3)})})}W.addEventListener("click",j);
