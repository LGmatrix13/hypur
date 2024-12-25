window.HYPUR={LOADING:!1};function T(){window.HYPUR.LOADING=!0}function c(){window.HYPUR.LOADING=!1}var d={start:T,end:c};var i=new WeakMap;function S(t,e){return o(t,e,"p")}function l(t,e){return o(t,e,"button")}function m(t,e){return o(t,e,"section")}function v(t,e){return o(t,e,"h1")}function y(t,e){return o(t,e,"h2")}function f(t,e){return o(t,e,"h2")}function b(t,e){return o(t,e,"div")}function o(t,e,n){let r=document.querySelector(`${n}[hypur="${t}"]`);if(!r)throw new Error(`${n} HTMLElement element ${t} does not exist`);return new s(t,r,e)}function g(t,e){let n=document.querySelector(`[hypur="${t}"]`);if(!n)throw new Error(`HTMLElement ${t} does not exist`);return new s(t,n,e)}async function a(t,e,n){d.start();let r=await fetch(t,{method:e,body:i.get(n)});return d.end(),r}class s{name;baseElement;bindState=!1;key;constructor(t,e,n){this.name=t,this.baseElement=e;let r=this.baseElement.dataset.key;if(r)this.key=Number(r);i.set(this.baseElement,n)}get element(){return this.baseElement}get state(){return i.get(this.baseElement)}setState(t){this.state={...this.state,...t(this.state)}}set state(t){if(i.set(this.baseElement,t),this.bindState)Object.keys(t).forEach((e)=>{let n=this.baseElement.querySelector(`[hypur="${e}"]`);if(n!==null)n.innerText=t[e]&&t[e]})}setChildren(t){this.baseElement.innerHTML=t.baseElement.innerHTML}onEvent(t,e){this.baseElement.addEventListener(t,(n)=>{e(this,n)})}bind(){return this.bindState=!0,this}onClick(t){this.onEvent("click",t)}onChange(t){this.onEvent("change",t)}onInput(t){this.onEvent("input",t)}onMouseOver(t){this.onEvent("mouseover",t)}onMouseOut(t){this.onEvent("mouseout",t)}onKeyDown(t){this.onEvent("keydown",t)}onKeyUp(t){this.onEvent("keyup",t)}get parent(){let t=this.baseElement.parentElement;if(!t)throw new Error(`HypurElement ${this.name} does not have parent`);return t}duplicate(){let t=this.baseElement.cloneNode(!0);if(!this.baseElement.parentNode)throw new Error(`HypurElement with id ${this.baseElement.id} does not have parent to run duplicate`);this.baseElement.parentNode?.appendChild(t)}remove(){this.baseElement.remove()}async delete(t,e){let n=await a(t,"DELETE",this.baseElement);if(e)await Promise.resolve(e(n))}async put(t,e){let n=await a(t,"PUT",this.baseElement);if(e)await Promise.resolve(e(n))}async post(t,e){let n=await a(t,"POST",this.baseElement);if(e)await Promise.resolve(e(n))}async get(t,e){let n=await a(t,"GET",this.baseElement);if(e)await Promise.resolve(e(n))}}function L(t,e){let n=document.querySelectorAll(`[hypur="${t}"]`);if(!n.length)throw new Error(`Elements ${t} do not exist`);let r=Array.from(n).map((u)=>new s(t,u,e));return new E(r)}class E extends Array{constructor(t){super();this.push(...t)}onEvent(t,e){this.forEach((n)=>{n.baseElement.addEventListener(t,(r)=>{e(n,r)})})}bind(){return this.forEach((t)=>{t.bind()}),this}onClick(t){this.onEvent("click",t)}onChange(t){this.onEvent("change",t)}onInput(t){this.onEvent("input",t)}onMouseOver(t){this.onEvent("mouseover",t)}onMouseOut(t){this.onEvent("mouseout",t)}onKeyDown(t){this.onEvent("keydown",t)}onKeyUp(t){this.onEvent("keyup",t)}append(t){let e=this[this.length-1],n=new s(e.name,e.baseElement,t).bind();n.setState(()=>t),this.append(n)}}function H(t){document.addEventListener("DOMContentLoaded",t)}var M=window.HYPUR.LOADING;export{m as section,S as p,H as onLoad,M as loading,f as h3,y as h2,v as h1,L as elements,g as element,b as div,l as button,E as HypurElements,s as HypurElement};
