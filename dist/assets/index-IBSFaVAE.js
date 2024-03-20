(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function i(n,r){let o=new Array;function l(t){const s=new Set(o);s.has(t)&&(s.delete(t),o=Array.from(s.values()))}function e(t=window,s){return o.push(t),t.addEventListener(n,r,s),{attach:e,clean:l}}return{attach:e,clean:l}}function d(n=1e3){return new Promise(r=>setTimeout(r,n))}let a=!1;const u={};i("load",()=>{const{stage:n,title:r,fullscreen:o}=m();Object.assign(u,{stage:n,title:r,fullscreen:o}),p("Demo"),i("dblclick",()=>c(n)).attach(n),i("click",()=>c(n)).attach(o),i("fullscreenchange",()=>{document.fullscreenElement?o.classList.remove("enabled"):o.classList.add("enabled")}).attach(),f()}).attach();async function f(){await d(4e4),console.log("load completed.")}function p(n){a&&(u.title=n)}function c(n){document.fullscreenElement?document.exitFullscreen():n.requestFullscreen()}function m(){var t;document.querySelector("body").innerHTML=`
		<div class="stage"><div class="title">Demo</div><div class="fullscreen">F</div><canvas>not support canvas.</canvas></div>
	`;const n=document.createElement("style");n.textContent=`
		html { height: 100%; } * { box-sizing: border-box; user-select: none; --t_color: #333333; }
		body { height: 100%; margin: 0; padding: 0; border-radius: 8px;
			display: flex; flex-direction: column; }

		.stage { max-height: 100%; margin-bottom: 0.5px; flex: 1; display: flex; flex-direction: column; position: relative;
			border-radius: 8px; border: 1px solid transparent; background: white; }
		.stage > canvas { flex: 1; min-height: 0; }
		.stage > .title { position: fixed; top: 8px; left: 16px; pointer-events: none; }

		.stage:not(:hover) .fullscreen { color: transparent; opacity: 0.1; border: 1px solid #333; background: none; }

		.fullscreen { position: fixed; right: 8px; bottom: 8px; width: 1em; height: 1em; cursor: pointer;
			border-radius: 4px; padding: 12px; font-weight: bolder; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.4); opacity: 0.4 }
		.fullscreen:hover { opacity: 1; }
		.fullscreen.enabled { opacity: 1; color: white; border: 1px solid transparent; }
		.fullscreen.hover { border-color: white; }
	`,(t=document.querySelector("body"))==null||t.append(n);const r=document.querySelector(".stage"),o="demo",l=document.querySelector(".fullscreen"),e=r.querySelector("canvas");return a=!0,{stage:r,title:o,fullscreen:l,canvas:e}}
