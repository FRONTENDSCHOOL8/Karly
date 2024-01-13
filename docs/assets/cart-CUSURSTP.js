import"./style-v06b81ne.js";import{t as h,g as o,a as v}from"./header-MICfn_ID.js";import"./footer-GuUMSODD.js";import{p as u}from"./pocketbase-mqgmocw_.js";import{i as p,c as d,g}from"./getPbImageURL-Q86jnK4B.js";import{s as k,g as y}from"./storage-jFd8YWAz.js";import{s as E}from"./setDocumentTitle-_OwlDZqT.js";import{a as L}from"./setDefaultData-b6PVXYnJ.js";/* empty css               */E("칼리 | 장바구니");localStorage.getItem("auth")||k("auth",L);async function q(){const a=await h.get("https://square-zebra.pockethost.io/api/collections/cart/records");let{cartData1:n,cartData2:c,cartData3:t}=a.data.items;const{isAuth:e,user:s}=await y("auth");n=await u.collection("cart").getFullList({filter:'package_type~"냉장"'}),c=await u.collection("cart").getFullList({filter:'package_type~"냉동"'}),t=await u.collection("cart").getFullList({filter:'package_type~"상온"'});function l(r,i){return`
      <li>
        <div class="input_check">
          <input
            type="checkbox"
            class="check_item"
            id="check_item_${i.id}"
          />
          <label for="check_item_${i.id}">
            <a href="${e?`/src/pages/product_detail/index.html#${i.id}`:"/src/pages/login/"}">
              <span class="item">
                <img
                  src="${g(i)}"
                  alt="${i.name}"
                />
                <span class="item_title"
                  >${i.name}</span
                >
              </span>
            </a>
          </label>
        </div>
        <div class="item_price">
          <div class="input_number">
            <input
              type="number"
              min="1"
              value="${i.quantity}"
              aria-label="수량"
              class="quantity"
            />
            <button type="button" class="btn_plus">
              <span class="sr_only">+</span>
            </button>
            <button type="button" class="btn_minus">
              <span class="sr_only">-</span>
            </button>
          </div>
          <span class="item_price_total">
            <span class="sales sr_only">${i.sales}</span>
            <span class="before_price sr_only">${i.price}</span>
            <span class="price" >${d(i.price)}</span>원</span>
        </div>
        <div class="item_delete">
          <button type="button" class="btn_cancel">
            <span class="sr_only">삭제</span>
          </button>
        </div>
      </li>
    `}n.forEach(r=>{r.username==s.username&&p(".cart_content_list_1",l(e,r))}),c.forEach(r=>{r.username==s.username&&p(".cart_content_list_2",l(e,r))}),t.forEach(r=>{r.username==s.username&&p(".cart_content_list_3",l(e,r))}),m(),S(),$(),N(),T()}q();function A(){const a=o(".cart_title_btn");function n(c){c.target.closest(".cart_list_title").classList.toggle("open")}a.forEach(c=>{c.addEventListener("click",n)})}A();function m(){const a=o(".check_all_text .selection"),n=o('input[class="check_item"]:checked');a.forEach(c=>{c.innerText=n.length})}function S(){const a=o(".check_all_text .all"),n=document.getElementsByClassName("check_item");a.forEach(c=>{c.innerText=n.length})}function $(){const a=v("#check_all_1"),n=o(".check_item");a.addEventListener("change",t=>{const e=t.target.checked;n.forEach(s=>{s.checked=e}),m()});for(const t of n)t.addEventListener("click",c);function c(){let t=0;for(const e of n)e.checked&&t++;t===0?(a.checked=!1,a.indeterminate=!1):t===n.length?(a.checked=!0,a.indeterminate=!1):(a.checked=!1,a.indeterminate=!0),m()}}function N(){const a=document.querySelectorAll('input[type="number"]');document.querySelectorAll(".input_number button").forEach(c=>{c.addEventListener("click",()=>{const t=c.parentElement.querySelector('input[type="number"]');if(c.classList.contains("btn_plus")){let e=Number(t.value);e++,t.value=e,t.setAttribute("value",e),c.parentElement.querySelector(".btn_minus").removeAttribute("disabled","")}else{let e=Number(t.value);e--,t.value=e,t.setAttribute("value",e),t.value<=1&&(t.value="1",c.setAttribute("disabled",""))}})}),a.forEach(c=>{c.addEventListener("input",t=>{const e=t.target;if(e.value>1){let s=Number(e.value);e.value=s,e.setAttribute("value",s),e.parentElement.querySelector(".btn_minus").removeAttribute("disabled","")}else{let s=Number(e.value);e.value=s,e.setAttribute("value",s),e.value="1",e.parentElement.querySelector(".btn_minus").setAttribute("disabled","")}})})}function T(){const a=document.querySelectorAll('input[type="number"]'),n=document.querySelectorAll(".input_number button");a.forEach(t=>{t.addEventListener("input",c)}),n.forEach(t=>{t.addEventListener("click",c)});function c(t){const e=t.target,s=e.closest(".item_price").querySelector(".quantity").value*1,l=e.closest(".item_price").querySelector(".item_price_total .sales").innerHTML*1,r=e.closest(".item_price").querySelector(".item_price_total .before_price").innerHTML*1,i=e.closest(".item_price").querySelector(".item_price_total .price"),_=r*l/100,f=(r-_)*s,b=Math.floor(f/10)*10;i.innerHTML=d(b)}}
