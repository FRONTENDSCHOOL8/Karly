import"./style-v06b81ne.js";import{p as y,a as u,g as S}from"./header-RZqFFW1r.js";import"./footer-GuUMSODD.js";import{c as M,i as v,g as A,a}from"./checkLogin-LD3I1H2Y.js";import{s as T}from"./setDocumentTitle-_OwlDZqT.js";/* empty css               */import"./setDefaultData-jfMFH5kw.js";T("칼리 | 장바구니");M();const H=await y.collection("products").getFullList({filter:'package_type~"냉장"'}),N=await y.collection("products").getFullList({filter:'package_type~"냉동"'}),$=await y.collection("products").getFullList({filter:'package_type~"상온"'});H.forEach(e=>{v(".cart_content_list_1",k(e))});N.forEach(e=>{v(".cart_content_list_2",k(e))});$.forEach(e=>{v(".cart_content_list_3",k(e))});function k(e){return`
      <li>
        <div class="input_check">
          <input
            type="checkbox"
            class="check_item"
            id="check_item_${e.id}"
          />
          <label for="check_item_${e.id}">
            <a href="/Karly/src/pages/product_detail/index.html#${e.id}">
              <span class="item">
                <img
                  src="${A(e)}"
                  alt="${e.name}"
                />
                <span class="item_title"
                  >${e.name}</span
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
              value="1"
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
            <span class="sales" style="display:none">${e.sales}</span>
            <span class="before_price" style="display:none">${e.price}</span>
            <span class="price">${a(Math.floor((e.price-e.price*e.sales/100)/10)*10)}</span>원</span>
        </div>
        <div class="item_delete">
          <button type="button" class="btn_cancel">
            <span class="sr_only">삭제</span>
          </button>
        </div>

      </li>
  `}b();C();w();P();p();const I=u(".cart_title_btn"),L=document.querySelectorAll(".check_item"),x=document.querySelectorAll('input[type="number"]'),D=document.querySelectorAll(".input_number button");I.forEach(e=>{e.addEventListener("click",n=>{n.target.closest(".cart_list_title").classList.toggle("open")})});L.forEach(e=>{e.addEventListener("click",()=>{L.forEach(n=>{n.checked===!0&&p()})})});x.forEach(e=>{e.addEventListener("input",E)});D.forEach(e=>{e.addEventListener("click",E)});function P(){const e=document.querySelectorAll('input[type="number"]');document.querySelectorAll(".input_number button").forEach(s=>{s.addEventListener("click",()=>{const c=s.parentElement.querySelector('input[type="number"]');if(s.classList.contains("btn_plus")){let t=Number(c.value);t++,c.value=t,c.setAttribute("value",t),s.parentElement.querySelector(".btn_minus").removeAttribute("disabled","")}else{let t=Number(c.value);t--,c.value=t,c.setAttribute("value",t),c.value<=1&&(c.value="1",s.setAttribute("disabled",""))}})}),e.forEach(s=>{s.addEventListener("input",c=>{const t=c.target;if(t.value>1){let r=Number(t.value);t.value=r,t.setAttribute("value",r),t.parentElement.querySelector(".btn_minus").removeAttribute("disabled","")}else{let r=Number(t.value);t.value=r,t.setAttribute("value",r),t.value="1",t.parentElement.querySelector(".btn_minus").setAttribute("disabled","")}})})}function E(e){const n=e.target,s=n.closest(".item_price").querySelector(".quantity").value*1,c=n.closest(".item_price").querySelector(".item_price_total .sales").innerHTML*1,t=n.closest(".item_price").querySelector(".item_price_total .before_price").innerHTML*1,r=n.closest(".item_price").querySelector(".item_price_total .price"),d=t*c/100,_=(t-d)*s,o=Math.floor(_/10)*10;r.innerHTML=a(o),p()}function p(){const e=document.querySelector(".price_info .price_sum"),n=document.querySelector(".price_info .discount_sum"),s=document.querySelector(".price_info .delivery_charge"),c=document.querySelector(".price_info .total"),t=document.querySelectorAll(".check_item"),r=[],d=[],m=[];t.forEach(i=>{const l=i.closest("li").querySelector(".quantity").value*1,h=i.closest("li").querySelector(".before_price").innerHTML*1,q=i.closest("li").querySelector(".sales").innerHTML*1,g=h*q/100;i.checked===!0&&(r.push(h*l),d.push(g*l),m.push((h-g)*l))});const _=r.reduce((i,l)=>i+l,0),o=d.reduce((i,l)=>i+l,0),f=m.reduce((i,l)=>i+l,0);e.innerHTML=a(Math.floor(_/10)*10),o===0?n.innerHTML=a(Math.floor(o/10)*10):n.innerHTML="-"+a(Math.floor(o/10)*10),f===0?s.innerHTML=0:s.innerHTML="+"+a(3e3),f===0?c.innerHTML=0:c.innerHTML=a(Math.floor((f+3e3)/10)*10)}function b(){const e=u(".check_all_text .selection"),n=u('input[class="check_item"]:checked');e.forEach(s=>{s.innerText=n.length})}function C(){const e=u(".check_all_text .all"),n=document.getElementsByClassName("check_item");e.forEach(s=>{s.innerText=n.length})}function w(){const e=S("#check_all_1"),n=u(".check_item");e.addEventListener("change",c=>{const t=c.target.checked;n.forEach(r=>{r.checked=t}),b(),p()});for(const c of n)c.addEventListener("click",s);function s(){let c=0;for(const t of n)t.checked&&c++;c===0?(e.checked=!1,e.indeterminate=!1):c===n.length?(e.checked=!0,e.indeterminate=!1):(e.checked=!1,e.indeterminate=!0),b(),p()}}
