(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();async function u(){const s=c("/partials/header.html"),n=c("/partials/footer.html"),r=document.getElementById("main-header"),o=document.getElementById("main-footer");l(s,r),l(n,o)}async function l(s,n,r,o,e="afterbegin",t=!0){t&&(n.innerHTML="");const i=await s(r);n.insertAdjacentHTML(e,i),o&&o(r)}function c(s){return async function(){const n=await fetch(s);if(n.ok)return await n.text()}}function m(){var s=document.getElementById("newsletter"),n=document.createElement("p");n.textContent="Don't miss out on your FlapNews- sign up for our monthly newsletter!",n.classList.add("signup-heading");var r=document.createElement("form");r.id="newsletterForm";var o=document.createElement("input");o.type="email",o.id="emailInput",o.placeholder="Enter your email address",o.required=!0;var e=document.createElement("input");e.type="submit",e.value="Subscribe",r.appendChild(o),r.appendChild(e),s.appendChild(n),s.appendChild(r);var t=document.getElementById("popup"),i=document.createElement("button");i.textContent="OK",i.classList.add("close-button");var a=document.createElement("p");a.textContent="Thanks for subscribing!",t.appendChild(a),t.appendChild(i),r.addEventListener("submit",function(d){d.preventDefault(),t.style.display="block"}),i.addEventListener("click",function(){t.style.display="none"})}u();m();