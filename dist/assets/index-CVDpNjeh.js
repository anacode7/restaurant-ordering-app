(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const c=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],id:0,price:14,emoji:"🍕"},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"🍔",id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",id:2}];let d=[];document.addEventListener("click",function(e){e.target.dataset.add?m(e.target.dataset.add):e.target.dataset.remove?f(e.target.dataset.remove):e.target.id==="complete-order-btn"?l():e.target.id==="close-modal-btn"&&u()});document.getElementById("payment-form").addEventListener("submit",function(e){e.preventDefault();const n=new FormData(document.getElementById("payment-form")).get("fullName");document.getElementById("modal").classList.add("hidden"),document.getElementById("success-message").textContent=`Payment successful! Thanks, ${n}! Your order is on its way!`,document.getElementById("success-modal").classList.remove("hidden"),document.getElementById("rating-feedback").classList.add("hidden"),document.querySelectorAll('input[name="rating"]').forEach(r=>r.checked=!1),d=[],s()});document.querySelectorAll('input[name="rating"]').forEach(function(e){e.addEventListener("change",function(){document.getElementById("rating-feedback").classList.remove("hidden")})});function l(){document.getElementById("modal").classList.remove("hidden")}function u(){document.getElementById("success-modal").classList.add("hidden")}function m(e){const t=d.filter(function(n){return n.id==e})[0];if(t)t.quantity++;else{const n=c.filter(function(o){return o.id==e})[0];d.push({...n,quantity:1})}s()}function f(e){const t=d.filter(function(n){return n.id==e})[0];if(t&&(t.quantity--,t.quantity===0)){const n=d.indexOf(t);d.splice(n,1)}s()}function p(){let e="";return c.forEach(function(t){e+=`
<div class="menu-item">
    <div class="menu-inner">
        <div class="menu-emoji">${t.emoji}</div>
        <div class="menu-details">
            <h2 class="menu-name">${t.name}</h2>
            <p class="menu-ingredients">${t.ingredients.join(", ")}</p>
            <p class="menu-price">$${t.price}</p>
        </div>
        <button class="add-btn" data-add="${t.id}">+</button>
    </div>
</div>
`}),d.length>0&&(e+=g()),e}function g(){let e=`
    <div class="order-section">
        <h3 class="order-title">Your order</h3>
        <div class="order-items">
    `,t=0;return d.forEach(function(n){t+=n.price*n.quantity,e+=`
            <div class="order-item">
                <div class="order-item-info">
                    <h3 class="order-item-name">${n.name}</h3>
                    <button class="quantity-btn remove" data-remove="${n.id}">-</button>
                    <span class="quantity-text">${n.quantity}</span>
                    <button class="quantity-btn add" data-add="${n.id}">+</button>
                </div>
                <p class="order-item-price">$${n.price*n.quantity}</p>
            </div>
        `}),e+=`
        </div>
        <div class="order-divider"></div>
        <div class="total-section">
            <h3 class="total-title">Total price:</h3>
            <p class="total-price">$${t}</p>
        </div>
        <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
    </div>
    `,e}function s(){document.getElementById("feed").innerHTML=p()}s();
