import{a as h,S as g,i as b}from"./assets/vendor-Cn7RiZ6s.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="46804414-b7542e140c58663107171b647",L="https://pixabay.com/api/";async function w(r,t,s){try{const n=await h.get(L,{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s}});return{hits:n.data.hits,totalHits:n.data.totalHits}}catch(n){throw new Error(`HTTP error! status: ${n.response.status}`)}}let l;function E(r,t=!1){const s=document.getElementById("gallery");t||(s.innerHTML="");const n=r.map(e=>`
    <div class="photo-card">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <p>${e.likes}</p>
        </div>
        <div class="info-item">
          <b>Views</b>
          <p>${e.views}</p>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <p>${e.comments}</p>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <p>${e.downloads}</p>
        </div>
      </div>
    </div>
  `).join("");s.insertAdjacentHTML("beforeend",n),l?l.refresh():l=new g(".gallery a",{captionsData:"alt",captionDelay:250})}const I=document.getElementById("search-form"),f=document.getElementById("load-more-button"),d=document.getElementById("loader"),p=document.getElementById("search-input");let a=1;const u=15;let m="";p.addEventListener("focus",()=>{p.value=""});I.addEventListener("submit",P);f.addEventListener("click",$);async function P(r){if(r.preventDefault(),m=p.value.trim(),m===""){i("Please enter a search query","info");return}a=1,await y()}async function $(){a+=1,await y(!0)}async function y(r=!1){d.style.display="block";try{const{hits:t,totalHits:s}=await w(m,a,u);E(t,r),d.style.display="none",t.length<u||a*u>=s?f.style.display="none":f.style.display="block",a===1&&t.length>0&&i(`Hooray! We found ${s} images.`,"success"),t.length===0&&i("Sorry, there are no images matching your search query. Please try again.","info")}catch(t){d.style.display="none",i(`Error fetching images: ${t.message}`,"error")}}function i(r,t){b[t]({title:r,position:"topRight"})}
//# sourceMappingURL=index.js.map
