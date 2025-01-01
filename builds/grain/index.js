window.HYPUR={LOADING:!1};function f(){window.HYPUR.LOADING=!0}function b(){window.HYPUR.LOADING=!1}var a={start:f,end:b};var i=new WeakMap,p=new WeakMap,l=new WeakMap;class s{name;base;onClick(e){}onChange(e){}onInput(e){}onMouseOver(e){}onMouseOut(e){}onKeyDown(e){}onKeyUp(e){}constructor(e,t){this.name=e,this.base=t||s.last(e).base,!t&&y(this)}mount(){s.all(this.name).forEach((e)=>new s(this.name,e.base))}innerText(e){this.base.innerText=e}innerHTML(e){this.base.innerHTML=e}outerHTML(e){this.base.outerHTML=e}static within(e,t){let o=e.querySelector(`[grain="${t}"]`);if(!o)throw new Error(`No Grain of name ${t} found within requested element`);return new s(t,o)}within(e){return s.within(e,this.name)}static last(e){let t=Array.from(document.querySelectorAll(`[grain="${e}"]`));if(!t.length)throw new Error(`No Grain of name ${e} could be found`);let o=t[t.length-1];return new s(e,o)}last(){return s.last(this.name)}static first(e){let t=document.querySelector(`[grain="${e}"]`);if(!t)throw new Error(`No Grain of name ${e} could be found`);return new s(e,t)}first(){return s.first(this.name)}static all(e){let t=Array.from(document.querySelectorAll(`[grain="${e}"]`));if(!t.length)throw new Error(`No Grain of name ${e} could be found`);return t.map((o)=>new s(e,o))}all(){return s.all(this.name)}static append(e,t){e.base.append(t.base)}append(e){s.append(this,e)}static prepend(e,t){e.base.prepend(t.base)}prepend(e){s.prepend(this,e)}}class h extends s{constructor(e,t,o){super(e,o);p.set(this.base,t||{}),i.set(this.base,t||{})}seedState(){let e=this.base.getAttribute("grain-state");if(!e)throw new Error(`Grain ${this.name} could not seed state. Make sure The "grain-state" attribute is set.`);let t=JSON.parse(e);i.set(this.base,t)}mount(){s.all(this.name).forEach((e)=>new h(this.name,this.defaultState,e.base))}get state(){return i.get(this.base)}get defaultState(){return p.get(this.base)}set state(e){i.set(this.base,e)}async fetcher(e,t){a.start();let o=new URL(window.origin,e),n=await fetch(o,{method:t,body:i.get(this.base)});return a.end(),n}async delete(e,t){let o=await this.fetcher(e,"DELETE");if(t)await Promise.resolve(t(o))}async put(e,t){let o=await this.fetcher(e,"PUT");if(t)await Promise.resolve(t(o))}async post(e,t){let o=await this.fetcher(e,"POST");if(t)await Promise.resolve(t(o))}async get(e,t){let o=await this.fetcher(e,"GET");if(t)await Promise.resolve(t(o))}async hypermedia(e,t,o){let r=await(await this.fetcher(e,t)).text();if(o)await Promise.resolve(o(r))}}function y(e){let t=l.get(e.base)||[];if(s.prototype.onClick!==e.onClick)e.base.addEventListener("click",e.onClick.bind(e)),t.push({eventType:"click",logic:e.onClick.bind(e)});if(s.prototype.onChange!==e.onChange)e.base.addEventListener("change",e.onChange.bind(e)),t.push({eventType:"change",logic:e.onChange.bind(e)});if(s.prototype.onInput!==e.onInput)e.base.addEventListener("input",e.onInput.bind(e)),t.push({eventType:"input",logic:e.onInput.bind(e)});if(s.prototype.onMouseOver!==e.onMouseOver)e.base.addEventListener("mouseover",e.onMouseOver.bind(e)),t.push({eventType:"mouseover",logic:e.onMouseOver.bind(e)});if(s.prototype.onMouseOut!==e.onMouseOut)e.base.addEventListener("mouseout",e.onMouseOut.bind(e)),t.push({eventType:"mouseout",logic:e.onMouseOut.bind(e)});if(s.prototype.onKeyDown!==e.onKeyDown)e.base.addEventListener("keydown",e.onKeyDown.bind(e)),t.push({eventType:"keydown",logic:e.onKeyDown.bind(e)});if(s.prototype.onKeyUp!==e.onKeyUp)e.base.addEventListener("keyup",e.onKeyUp.bind(e)),t.push({eventType:"keyup",logic:e.onKeyUp.bind(e)});l.set(e.base,t)}class E{base;constructor(e){let t=document.querySelector(`form[grain=${e}]`);if(t===null)throw new Error(`GrainForm of name ${e} does not exist`);this.base=t,this.base.addEventListener("submit",async(o)=>{o.preventDefault();let n=this.base.getAttribute("method"),r=this.base.getAttribute("action"),d=new FormData(this.base),c={};d.forEach((v,w)=>{c[w]=v});let u=new URL(window.location.origin,r);await Promise.resolve(this.handleData(c));let m=await this.fetcher(u,n,d);await Promise.resolve(this.handleResponse(m))})}async fetcher(e,t,o){a.start();let n=await fetch(e,{method:t,body:o});return a.end(),n}handleData(e){}handleResponse(e){}}var H=window.HYPUR.LOADING;export{i as stateContext,H as loading,y as listeners,l as listenerContext,p as defaultStateContext,h as ReactiveGrain,E as GrainForm,s as Grain};
