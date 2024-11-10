import{S as b,a as v,i}from"./assets/vendor-BzajH6aU.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();let f;function g(t,r=!1){const n=document.getElementById("gallery"),s=t.map(e=>`<div class="photo-card">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" title="${e.tags}" loading="lazy" />
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
    </div>`).join("");r?n.insertAdjacentHTML("beforeend",s):n.innerHTML=s,f&&f.destroy(),f=new b(".gallery a",{captionsData:"alt",captionDelay:250})}function L(){const t=document.getElementById("gallery");t.innerHTML=""}const E="46804414-b7542e140c58663107171b647",w="https://pixabay.com/api/";async function p(t,r,n){try{return(await v.get(w,{params:{key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:n}})).data.hits}catch(s){throw new Error(`HTTP error! status: ${s.response.status}`)}}const m=document.getElementById("search-input"),B=document.getElementById("search-form"),I=document.getElementById("loader");document.getElementById("gallery");const a=document.createElement("button");a.id="load-more-button";a.textContent="Load more";a.style.display="none";document.body.appendChild(a);let l="",c=1;const h=15;function d(t){I.style.display=t?"block":"none"}function y(t){a.style.display=t?"block":"none"}m.addEventListener("focus",()=>{m.value=""});B.addEventListener("submit",async t=>{if(t.preventDefault(),l=m.value.trim(),c=1,!l){i.error({title:"Error",message:"Please enter a search term!"});return}L(),d(!0),y(!1);try{const r=await p(l,c,h);r.length===0?i.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):(g(r),y(!0))}catch{i.error({title:"Error",message:"An error occurred while fetching images. Please try again later."})}finally{d(!1)}});a.addEventListener("click",async()=>{c+=1,d(!0);try{const t=await p(l,c,h);t.length===0?(i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}),y(!1)):g(t,!0)}catch{i.error({title:"Error",message:"An error occurred while fetching images. Please try again later."})}finally{d(!1);const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}});
//# sourceMappingURL=index.js.map
