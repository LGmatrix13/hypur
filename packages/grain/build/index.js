class s extends HTMLElement{onClick(t){}onChange(t){}onInput(t){}onMouseOver(t){}onMouseOut(t){}onKeyDown(t){}onKeyUp(t){}constructor(){super()}prop(t,e){let o=this.getAttribute(t);if(!o)throw new Error(`Grain does not have prop ${t}`);return e?e(o):o}connectedCallback(){if(s.prototype.onClick!==this.onClick)this.addEventListener("click",this.onClick.bind(this));if(s.prototype.onChange!==this.onChange)this.addEventListener("change",this.onChange.bind(this));if(s.prototype.onInput!==this.onInput)this.addEventListener("input",this.onInput.bind(this));if(s.prototype.onMouseOver!==this.onMouseOver)this.addEventListener("mouseover",this.onMouseOver.bind(this));if(s.prototype.onMouseOut!==this.onMouseOut)this.addEventListener("mouseout",this.onMouseOut.bind(this));if(s.prototype.onKeyDown!==this.onKeyDown)this.addEventListener("keydown",this.onKeyDown.bind(this));if(s.prototype.onKeyUp!==this.onKeyUp)this.addEventListener("keyup",this.onKeyUp.bind(this))}disconnectedCallback(){if(s.prototype.onClick!==this.onClick)this.removeEventListener("click",this.onClick.bind(this));if(s.prototype.onChange!==this.onChange)this.removeEventListener("change",this.onChange.bind(this));if(s.prototype.onInput!==this.onInput)this.removeEventListener("input",this.onInput.bind(this));if(s.prototype.onMouseOver!==this.onMouseOver)this.removeEventListener("mouseover",this.onMouseOver.bind(this));if(s.prototype.onMouseOut!==this.onMouseOut)this.removeEventListener("mouseout",this.onMouseOut.bind(this));if(s.prototype.onKeyDown!==this.onKeyDown)this.removeEventListener("keydown",this.onKeyDown.bind(this));if(s.prototype.onKeyUp!==this.onKeyUp)this.removeEventListener("keyup",this.onKeyUp.bind(this))}static mount(t,e){customElements.define(t,e)}}window.HYPUR={LOADING:!1};function l(){window.HYPUR.LOADING=!0}function u(){window.HYPUR.LOADING=!1}var a={start:l,end:u};var p={};class i{static within(t,e){let o=t.querySelector(`[sow="${e}"]`);if(!o)throw new Error(`No Grain of name ${e} found within requested element`);return o}static last(t){let e=Array.from(document.querySelectorAll(`[sow="${t}"]`));if(!e.length)throw new Error(`No Grain of name ${t} could be found`);return e[e.length-1]}static first(t){return i.find(t)}static all(t){let e=Array.from(document.querySelectorAll(`[sow="${t}"]`));if(!e.length)throw new Error(`Sow could not find ${t}`);return e}static append(t,e){t.append(e)}static prepend(t,e){t.prepend(e)}static clone(t){return t.cloneNode(!0)}static find(t){let e=document.querySelector(`[sow="${t}"]`);if(!e)throw new Error(`Sow could not find ${t}`);return e}static snapshot(t){let e=i.find(t).cloneNode(!0);p[t]=e}static restore(t){let e=p[t];if(!e)throw new Error(`Sow could not find snapshot ${t}`);return delete p[t],e}static spread(t,e){Object.keys(e).forEach((o)=>{let n=t.querySelector(`[sow="${o}"]`);if(!n){let r=t.querySelector(o);if(!r)throw new Error(`Grain of nam ${o} could not be found`);r.innerText=e[o]}else n.innerText=e[o]})}static remove(t){t.remove()}static async fetcher(t,e,o){a.start();let n=new URL(window.origin,t),r=await fetch(n,{method:e,body:JSON.stringify(o)});return a.end(),r}static async delete(t,e,o){let n=await i.fetcher(t,"DELETE",e);if(o)await Promise.resolve(o(n))}static async put(t,e,o){let n=await i.fetcher(t,"PUT",e);if(o)await Promise.resolve(o(n))}static async post(t,e,o){let n=await i.fetcher(t,"POST",e);if(o)await Promise.resolve(o(n))}static async get(t,e,o){let n=await i.fetcher(t,"GET",e);if(o)await Promise.resolve(o(n))}static async hypermedia(t,e,o,n){let d=await(await i.fetcher(t,e,o)).text();if(n)await Promise.resolve(n(d))}}class v extends s{state;constructor(){super();this.state={}}async delete(t,e){await i.delete(t,this.state,e)}async put(t,e){await i.put(t,this.state,e)}async post(t,e){await i.post(t,this.state,e)}async get(t,e){await i.get(t,this.state,e)}async hypermedia(t,e,o){await i.hypermedia(t,e,this.state,o)}}class f extends HTMLElement{constructor(){super();let t=this.firstChild;t.addEventListener("submit",async(e)=>{e.preventDefault();let o=t.getAttribute("method"),n=t.getAttribute("action"),r=new FormData(t),d={};if(r.forEach((c,h)=>{d[h]=c}),o&&n){let c=new URL(window.location.origin,n),h=await Promise.resolve(this.beforeSubmit(d));await Promise.resolve(this.onSubmit(h));let m=await this.fetcher(c,o,r);await Promise.resolve(this.afterSubmit(m))}else{let c=await Promise.resolve(this.beforeSubmit(d));await Promise.resolve(this.onSubmit(c))}})}async fetcher(t,e,o){a.start();let n=await fetch(t,{method:e,body:o});return a.end(),n}beforeSubmit(t){return t}onSubmit(t){}afterSubmit(t){}static mount(t,e){customElements.define(t,e)}}var H=window.HYPUR.LOADING;export{H as loading,v as StatefulGrain,i as Sow,f as GrainForm,s as Grain};
