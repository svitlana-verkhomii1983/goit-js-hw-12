import{a as h,S as g,i as b}from"./assets/vendor-Cn7RiZ6s.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const v="46804414-b7542e140c58663107171b647",w="https://pixabay.com/api/";async function L(o,t,s){try{const n=await h.get(w,{params:{key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s}});return{hits:n.data.hits,totalHits:n.data.totalHits}}catch(n){throw new Error(`HTTP error! status: ${n.response.status}`)}}let l;function E(o,t=!1){const s=document.getElementById("gallery");t||(s.innerHTML="");const n=o.map(e=>`
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
  `).join("");s.insertAdjacentHTML("beforeend",n),l?l.refresh():l=new g(".gallery a",{captionsData:"alt",captionDelay:250})}const I=document.getElementById("search-form"),f=document.getElementById("load-more-button"),d=document.getElementById("loader"),m=document.getElementById("search-input");let i=1;const u=18;let p="";m.addEventListener("focus",()=>{m.value=""});I.addEventListener("submit",B);f.addEventListener("click",P);async function B(o){if(o.preventDefault(),p=m.value.trim(),p===""){a("Please enter a search query","info");return}i=1,await y()}async function P(){i+=1,await y(!0),$()}async function y(o=!1){d.style.display="block";try{const{hits:t,totalHits:s}=await L(p,i,u);E(t,o),d.style.display="none",t.length<u||i*u>=s?f.style.display="none":f.style.display="block",i===1&&t.length>0&&a(`Hooray! We found ${s} images.`,"success"),t.length===0&&a("Sorry, there are no images matching your search query. Please try again.","info")}catch(t){d.style.display="none",a(`Error fetching images: ${t.message}`,"error")}}function $(){const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}function a(o,t){b[t]({title:o,position:"topRight"})}
//# sourceMappingURL=index.js.map
