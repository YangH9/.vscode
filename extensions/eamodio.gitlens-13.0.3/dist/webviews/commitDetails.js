(()=>{"use strict";var ts={};function os(s,n){const i=[];let r=0;for(;r<s.length;)i.push(s.slice(r,n+r)),r+=n;return i}function ns(s){let n=0;for(const i of s)n+=i.length;return n}function is(s,n){const i=Object.create(null);for(const r of s){const a=n(r);i[a]=(i[a]??0)+1}return i}function ss(s){return s==null?void 0:Array.isArray(s)?s:[s]}function rs(s,n){let i=0;return s.reduce((r,a)=>{const l=n(a,i++);return l!=null&&r.push(l),r},[])}function as(s,n){let i=0;return s.reduce(async(r,a)=>{const l=await n(a,i++);return l!=null&&r.push(l),r},[])}function cs(s,n){return s.reduce((i,r)=>{const a=n(r),l=i[a];return l===void 0?i[a]=[r]:l.push(r),i},Object.create(null))}function ls(s,n){return s.reduce((i,r)=>{const a=n(r),l=i.get(a);return l===void 0?i.set(a,[r]):l.push(r),i},new Map)}function hs(s,n,i){return s.reduce((r,a)=>{const l=i(a);if(l!=null){const c=n(a),d=r.get(c);d===void 0?r.set(c,[l]):d.push(l)}return r},new Map)}function ds(s){return typeof s[0]=="string"}function qo(s,n,i,r=!1,a){const l={name:"",relativePath:"",children:new Map,descendants:[]};let c=s.reduce((d,h)=>{let u=d,b="";for(const f of n(h)){b=i(b,f),u.children===void 0&&(u.children=new Map);let p=u.children.get(f);p===void 0&&(p={name:f,relativePath:b,parent:u,children:void 0,descendants:void 0},u.children.set(f,p)),u.descendants===void 0&&(u.descendants=[]),u.descendants.push(h),u=p}return u.value=h,d},l);return r&&(c=Pt(c,i,!0,a)),c}function Pt(s,n,i=!0,r){if(s.children===void 0)return s;const a=[...s.children.values()];for(const l of a)Pt(l,n,!1,r);if(!i&&a.length===1){const l=a[0];(l.value===void 0||r?.(l.value))&&(s.name=n(s.name,l.name),s.relativePath=l.relativePath,s.children=l.children,s.descendants=l.descendants,s.value=l.value)}return s}function us(s,n,i){return[...s.reduce((a,l)=>{const c=n(l),d=a.get(c);if(d===void 0)a.set(c,l);else{const h=i(d,l);h!==void 0&&a.set(c,h)}return a},new Map).values()]}class Tt{constructor(n,i=!1){this.method=n,this.overwriteable=i}}class P extends Tt{}class fe extends Tt{}function Et(s,n,i){s.method===n.method&&i(n.params,s)}const Wo=new P("webview/ready"),fs=new P("command/execute"),bs=new P("configuration/preview"),ps=new P("configuration/update"),ms=new fe("configuration/didChange"),gs=new fe("configuration/didPreview"),vs=new fe("webview/didOpenAnchor"),Yo=`\0
\0`,Qo=new P("commit/actions"),Ko=new P("commit/file/actions"),Zo=new P("commit/file/open"),Go=new P("commit/file/openOnRemote"),Xo=new P("commit/file/compareWorking"),Jo=new P("commit/file/comparePrevious"),en=new P("commit/pickCommit"),tn=new P("commit/searchCommit"),on=new P("commit/autolinkSettings"),nn=new P("commit/pin"),Ye=new P("commit/preferences"),Bt=new fe("commit/didChange"),ys=new fe("commit/didChange/rich");var A;(s=>{function n(a,l,c,d){let h=!1;if(typeof a=="string"){const b=function(f){const p=f?.target;!p?.matches(a)||c(f,p)};return document.addEventListener(l,b,d??!0),{dispose:()=>{h||(h=!0,document.removeEventListener(l,b,d??!0))}}}const u=function(b){c(b,this)};return a.addEventListener(l,u,d??!1),{dispose:()=>{h||(h=!0,a.removeEventListener(l,u,d??!1))}}}s.on=n;function i(a,l,c){const d=document.getElementById(a);if(l.replaceChildren(d?.content.cloneNode(!0)),l.className=d.className,c?.visible!=null){const h=l.querySelectorAll("[data-visible]");for(const u of h){const b=u.dataset.visible;!b||(c.visible[b]?u.style.display="initial":u.style.display="none")}}if(c?.bindings!=null){const h=l.querySelectorAll("[data-bind]");for(const u of h){const b=u.dataset.bind;if(!b)continue;const f=c.bindings[b];f!=null&&(u.textContent=String(f))}}}s.insertTemplate=i;function r(a){a.replaceChildren(),a.className=""}s.resetSlot=r})(A||(A={}));const sn=/^(?:(#?)([0-9a-f]{3}|[0-9a-f]{6})|((?:rgb|hsl)a?)\((-?\d+%?)[,\s]+(-?\d+%?)[,\s]+(-?\d+%?)[,\s]*(-?[\d.]+%?)?\))$/i;function Qe(s,n){const i=s+n,r=n<0?i<0?0:i:i>255?255:i;return Math.round(r)}function x(s,n){return S(s,-n)}function S(s,n){const i=Ae(s);if(i==null)return s;const[r,a,l,c]=i,d=255*n/100;return`rgba(${Qe(r,d)}, ${Qe(a,d)}, ${Qe(l,d)}, ${c})`}function B(s,n){const i=Ae(s);if(i==null)return s;const[r,a,l,c]=i;return`rgba(${r}, ${a}, ${l}, ${c*(n/100)})`}function _s(s,n,i){const r=Ae(s),a=Ae(n);if(r==null||a==null)return s;const[l,c,d,h]=r,[u,b,f,p]=a;return`rgba(${Se(l,u,i)}, ${Se(c,b,i)}, ${Se(d,f,i)}, ${Se(h,p,i)})`}const Se=(s,n,i)=>s+(n-s)*i/100;function Ae(s){s=s.trim();const n=sn.exec(s);if(n==null)return null;if(n[1]==="#"){const i=n[2];switch(i.length){case 3:return[parseInt(i[0]+i[0],16),parseInt(i[1]+i[1],16),parseInt(i[2]+i[2],16),1];case 6:return[parseInt(i.substring(0,2),16),parseInt(i.substring(2,4),16),parseInt(i.substring(4,6),16),1]}return null}switch(n[3]){case"rgb":return[parseInt(n[4],10),parseInt(n[5],10),parseInt(n[6],10),1];case"rgba":return[parseInt(n[4],10),parseInt(n[5],10),parseInt(n[6],10),parseFloat(n[7])];default:return null}}const Ot=class{constructor(){this._disposed=!1}get event(){return this._event==null&&(this._event=(s,n,i)=>{this.listeners==null&&(this.listeners=new Mt);const r=this.listeners.push(n==null?s:[s,n]),a={dispose:()=>{a.dispose=Ot._noop,this._disposed||r()}};return Array.isArray(i)&&i.push(a),a}),this._event}fire(s){if(this.listeners!=null){this._deliveryQueue==null&&(this._deliveryQueue=new Mt);for(let n=this.listeners.iterator(),i=n.next();!i.done;i=n.next())this._deliveryQueue.push([i.value,s]);for(;this._deliveryQueue.size>0;){const[n,i]=this._deliveryQueue.shift();try{typeof n=="function"?n(i):n[0].call(n[1],i)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let Nt=Ot;Nt._noop=function(){};const rn={done:!0,value:void 0},Pe=class{constructor(s){this.element=s,this.next=Pe.Undefined,this.prev=Pe.Undefined}};let v=Pe;v.Undefined=new Pe(void 0);class Mt{constructor(){this._first=v.Undefined,this._last=v.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===v.Undefined}clear(){this._first=v.Undefined,this._last=v.Undefined,this._size=0}unshift(n){return this._insert(n,!1)}push(n){return this._insert(n,!0)}_insert(n,i){const r=new v(n);if(this._first===v.Undefined)this._first=r,this._last=r;else if(i){const l=this._last;this._last=r,r.prev=l,l.next=r}else{const l=this._first;this._first=r,r.next=l,l.prev=r}this._size+=1;let a=!1;return()=>{a||(a=!0,this._remove(r))}}shift(){if(this._first===v.Undefined)return;const n=this._first.element;return this._remove(this._first),n}pop(){if(this._last===v.Undefined)return;const n=this._last.element;return this._remove(this._last),n}_remove(n){if(n.prev!==v.Undefined&&n.next!==v.Undefined){const i=n.prev;i.next=n.next,n.next.prev=i}else n.prev===v.Undefined&&n.next===v.Undefined?(this._first=v.Undefined,this._last=v.Undefined):n.next===v.Undefined?(this._last=this._last.prev,this._last.next=v.Undefined):n.prev===v.Undefined&&(this._first=this._first.next,this._first.prev=v.Undefined);this._size-=1}iterator(){let n,i=this._first;return{next:function(){return i===v.Undefined?rn:(n==null?n={done:!1,value:i.element}:n.value=i.element,i=i.next,n)}}}toArray(){const n=[];for(let i=this._first;i!==v.Undefined;i=i.next)n.push(i.element);return n}}const Dt=new Nt,an=Dt.event;function cn(){const s=i=>{const r=document.body,a=window.getComputedStyle(r),l=r.classList.contains("vscode-light")||r.classList.contains("vscode-high-contrast-light"),c=r.style;c.setProperty("--font-family",a.getPropertyValue("--vscode-font-family").trim()),c.setProperty("--font-size",a.getPropertyValue("--vscode-font-size").trim()),c.setProperty("--font-weight",a.getPropertyValue("--vscode-font-weight").trim()),c.setProperty("--editor-font-family",a.getPropertyValue("--vscode-editor-font-family").trim()),c.setProperty("--editor-font-size",a.getPropertyValue("--vscode-editor-font-size").trim()),c.setProperty("--editor-font-weight",a.getPropertyValue("--vscode-editor-font-weight").trim());const d=a.getPropertyValue("--vscode-editor-background").trim();let h=d;c.setProperty("--color-background",h),c.setProperty("--color-background--lighten-05",S(h,5)),c.setProperty("--color-background--darken-05",x(h,5)),c.setProperty("--color-background--lighten-075",S(h,7.5)),c.setProperty("--color-background--darken-075",x(h,7.5)),c.setProperty("--color-background--lighten-10",S(h,10)),c.setProperty("--color-background--darken-10",x(h,10)),c.setProperty("--color-background--lighten-15",S(h,15)),c.setProperty("--color-background--darken-15",x(h,15)),c.setProperty("--color-background--lighten-30",S(h,30)),c.setProperty("--color-background--darken-30",x(h,30)),c.setProperty("--color-background--lighten-50",S(h,50)),c.setProperty("--color-background--darken-50",x(h,50)),h=a.getPropertyValue("--vscode-button-background").trim(),c.setProperty("--color-button-background",h),c.setProperty("--color-button-background--darken-30",x(h,30)),c.setProperty("--color-highlight",h),c.setProperty("--color-highlight--75",B(h,75)),c.setProperty("--color-highlight--50",B(h,50)),c.setProperty("--color-highlight--25",B(h,25)),h=a.getPropertyValue("--vscode-button-secondaryBackground").trim(),c.setProperty("--color-button-secondary-background",h),c.setProperty("--color-button-secondary-background--darken-30",x(h,30)),h=a.getPropertyValue("--vscode-button-foreground").trim(),c.setProperty("--color-button-foreground",h);let u=a.getPropertyValue("--vscode-editor-foreground").trim();u||(u=a.getPropertyValue("--vscode-foreground").trim()),c.setProperty("--color-foreground",u),c.setProperty("--color-foreground--85",B(u,85)),c.setProperty("--color-foreground--75",B(u,75)),c.setProperty("--color-foreground--65",B(u,65)),c.setProperty("--color-foreground--50",B(u,50)),h=a.getPropertyValue("--vscode-focusBorder").trim(),c.setProperty("--color-focus-border",h),h=a.getPropertyValue("--vscode-textLink-foreground").trim(),c.setProperty("--color-link-foreground",h),c.setProperty("--color-link-foreground--darken-20",x(h,20)),c.setProperty("--color-link-foreground--lighten-20",S(h,20)),h=a.getPropertyValue("--vscode-sideBar-background").trim(),c.setProperty("--color-view-background",h||d),h=a.getPropertyValue("--vscode-sideBar-foreground").trim(),c.setProperty("--color-view-foreground",h||u),c.setProperty("--color-view-header-foreground",a.getPropertyValue("--vscode-sideBarSectionHeader-foreground").trim()||h||u),h=a.getPropertyValue("--vscode-editorHoverWidget-background").trim(),c.setProperty("--color-hover-background",h),h=a.getPropertyValue("--vscode-editorHoverWidget-border").trim(),c.setProperty("--color-hover-border",h),h=a.getPropertyValue("--vscode-editorHoverWidget-foreground").trim(),c.setProperty("--color-hover-foreground",h),h=a.getPropertyValue("--vscode-editorHoverWidget-statusBarBackground").trim(),c.setProperty("--color-hover-statusBarBackground",h),c.setProperty("--graph-theme-opacity-factor",l?"0.5":"1"),c.setProperty("--color-graph-actionbar-background",l?x(d,5):S(d,5)),c.setProperty("--color-graph-actionbar-selectedBackground",l?x(d,10):S(d,10)),c.setProperty("--color-graph-background",l?x(d,5):S(d,5)),c.setProperty("--color-graph-background2",l?x(d,10):S(d,10)),h=a.getPropertyValue("--vscode-list-focusOutline").trim(),c.setProperty("--color-graph-contrast-border-color",h),h=a.getPropertyValue("--vscode-list-activeSelectionBackground").trim(),c.setProperty("--color-graph-selected-row",h),h=a.getPropertyValue("--vscode-list-hoverBackground").trim(),c.setProperty("--color-graph-hover-row",h),h=a.getPropertyValue("--vscode-list-activeSelectionForeground").trim(),c.setProperty("--color-graph-text-selected-row",h),c.setProperty("--color-graph-text-dimmed-selected",B(h,50)),c.setProperty("--color-graph-text-dimmed",B(u,20)),h=a.getPropertyValue("--vscode-list-hoverForeground").trim(),c.setProperty("--color-graph-text-hovered",h),c.setProperty("--color-graph-text-selected",u),c.setProperty("--color-graph-text-normal",B(u,85)),c.setProperty("--color-graph-text-secondary",B(u,65)),c.setProperty("--color-graph-text-disabled",B(u,50)),h=a.getPropertyValue("--vscode-inputValidation-infoBackground").trim(),c.setProperty("--color-alert-infoHoverBackground",l?x(h,5):S(h,5)),c.setProperty("--color-alert-infoBackground",h),h=a.getPropertyValue("--vscode-inputValidation-warningBackground").trim(),c.setProperty("--color-alert-warningHoverBackground",l?x(h,5):S(h,5)),c.setProperty("--color-alert-warningBackground",h),h=a.getPropertyValue("--vscode-inputValidation-errorBackground").trim(),c.setProperty("--color-alert-errorHoverBackground",l?x(h,5):S(h,5)),c.setProperty("--color-alert-errorBackground",h),h=l?x(d,5):S(d,5),c.setProperty("--color-alert-neutralHoverBackground",l?x(h,5):S(h,5)),c.setProperty("--color-alert-neutralBackground",h),c.setProperty("--color-alert-infoBorder","var(--vscode-inputValidation-infoBorder)"),c.setProperty("--color-alert-warningBorder","var(--vscode-inputValidation-warningBorder)"),c.setProperty("--color-alert-errorBorder","var(--vscode-inputValidation-errorBorder)"),c.setProperty("--color-alert-neutralBorder","var(--vscode-input-foreground)"),c.setProperty("--color-alert-foreground","var(--vscode-input-foreground)"),i!=null&&Dt.fire()};s();const n=new MutationObserver(s);return n.observe(document.body,{attributeFilter:["class"]}),n}const ln=2**30;let Te=0;function It(){return Te===ln?Te=1:Te++,`webview:${Te}`}class hn{constructor(n){this.appName=n,this.state=window.bootstrap,window.bootstrap=void 0,this.log(`${this.appName}()`),this._api=acquireVsCodeApi(),this.onThemeUpdated!=null&&an(this.onThemeUpdated,this),cn(),requestAnimationFrame(()=>{this.log(`${this.appName}.initializing`);try{this.onInitialize?.(),this.bind(),this.onMessageReceived!=null&&window.addEventListener("message",this.onMessageReceived.bind(this)),this.sendCommand(Wo,void 0),this.onInitialized?.()}finally{document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}})}bind(){this.bindDisposables?.forEach(n=>n.dispose()),this.bindDisposables=this.onBind?.()}log(n,...i){}getState(){return this._api.getState()}sendCommand(n,i){const r=It();this.log(`${this.appName}.sendCommand(${r}): name=${n.method}`),this.postMessage({id:r,method:n.method,params:i})}async sendCommandWithCompletion(n,i,r){const a=It();this.log(`${this.appName}.sendCommandWithCompletion(${a}): name=${n.method}`);const l=new Promise((c,d)=>{let h;const u=[A.on(window,"message",b=>{Et(r,b.data,f=>{b.data.completionId===a&&(u.forEach(p=>p.dispose()),queueMicrotask(()=>c(f)))})}),{dispose:function(){h!=null&&(clearTimeout(h),h=void 0)}}];h=setTimeout(()=>{h=void 0,u.forEach(b=>b.dispose()),d(new Error(`Timed out waiting for completion of ${r.method}`))},6e4)});return this.postMessage({id:a,method:n.method,params:i,completionId:a}),l}setState(n){this.state=n,n!=null&&this._api.setState(n)}postMessage(n){this._api.postMessage(n)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee=window,Ke=Ee.ShadowRoot&&(Ee.ShadyCSS===void 0||Ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),Ft=new WeakMap;class Lt{constructor(n,i,r){if(this._$cssResult$=!0,r!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=i}get styleSheet(){let n=this.o;const i=this.t;if(Ke&&n===void 0){const r=i!==void 0&&i.length===1;r&&(n=Ft.get(i)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),r&&Ft.set(i,n))}return n}toString(){return this.cssText}}const dn=s=>new Lt(typeof s=="string"?s:s+"",void 0,Ze),X=(s,...n)=>{const i=s.length===1?s[0]:n.reduce((r,a,l)=>r+(c=>{if(c._$cssResult$===!0)return c.cssText;if(typeof c=="number")return c;throw Error("Value passed to 'css' function must be a 'css' function result: "+c+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+s[l+1],s[0]);return new Lt(i,s,Ze)},un=(s,n)=>{Ke?s.adoptedStyleSheets=n.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet):n.forEach(i=>{const r=document.createElement("style"),a=Ee.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=i.cssText,s.appendChild(r)})},Rt=Ke?s=>s:s=>s instanceof CSSStyleSheet?(n=>{let i="";for(const r of n.cssRules)i+=r.cssText;return dn(i)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ge;const Be=window,Ht=Be.trustedTypes,fn=Ht?Ht.emptyScript:"",Vt=Be.reactiveElementPolyfillSupport,Xe={toAttribute(s,n){switch(n){case Boolean:s=s?fn:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,n){let i=s;switch(n){case Boolean:i=s!==null;break;case Number:i=s===null?null:Number(s);break;case Object:case Array:try{i=JSON.parse(s)}catch{i=null}}return i}},Ut=(s,n)=>n!==s&&(n==n||s==s),Je={attribute:!0,type:String,converter:Xe,reflect:!1,hasChanged:Ut};class J extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(n){var i;(i=this.h)!==null&&i!==void 0||(this.h=[]),this.h.push(n)}static get observedAttributes(){this.finalize();const n=[];return this.elementProperties.forEach((i,r)=>{const a=this._$Ep(r,i);a!==void 0&&(this._$Ev.set(a,r),n.push(a))}),n}static createProperty(n,i=Je){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(n,i),!i.noAccessor&&!this.prototype.hasOwnProperty(n)){const r=typeof n=="symbol"?Symbol():"__"+n,a=this.getPropertyDescriptor(n,r,i);a!==void 0&&Object.defineProperty(this.prototype,n,a)}}static getPropertyDescriptor(n,i,r){return{get(){return this[i]},set(a){const l=this[n];this[i]=a,this.requestUpdate(n,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)||Je}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const n=Object.getPrototypeOf(this);if(n.finalize(),this.elementProperties=new Map(n.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const i=this.properties,r=[...Object.getOwnPropertyNames(i),...Object.getOwnPropertySymbols(i)];for(const a of r)this.createProperty(a,i[a])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(n){const i=[];if(Array.isArray(n)){const r=new Set(n.flat(1/0).reverse());for(const a of r)i.unshift(Rt(a))}else n!==void 0&&i.push(Rt(n));return i}static _$Ep(n,i){const r=i.attribute;return r===!1?void 0:typeof r=="string"?r:typeof n=="string"?n.toLowerCase():void 0}u(){var n;this._$E_=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(n=this.constructor.h)===null||n===void 0||n.forEach(i=>i(this))}addController(n){var i,r;((i=this._$ES)!==null&&i!==void 0?i:this._$ES=[]).push(n),this.renderRoot!==void 0&&this.isConnected&&((r=n.hostConnected)===null||r===void 0||r.call(n))}removeController(n){var i;(i=this._$ES)===null||i===void 0||i.splice(this._$ES.indexOf(n)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((n,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])})}createRenderRoot(){var n;const i=(n=this.shadowRoot)!==null&&n!==void 0?n:this.attachShadow(this.constructor.shadowRootOptions);return un(i,this.constructor.elementStyles),i}connectedCallback(){var n;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(n=this._$ES)===null||n===void 0||n.forEach(i=>{var r;return(r=i.hostConnected)===null||r===void 0?void 0:r.call(i)})}enableUpdating(n){}disconnectedCallback(){var n;(n=this._$ES)===null||n===void 0||n.forEach(i=>{var r;return(r=i.hostDisconnected)===null||r===void 0?void 0:r.call(i)})}attributeChangedCallback(n,i,r){this._$AK(n,r)}_$EO(n,i,r=Je){var a;const l=this.constructor._$Ep(n,r);if(l!==void 0&&r.reflect===!0){const c=(((a=r.converter)===null||a===void 0?void 0:a.toAttribute)!==void 0?r.converter:Xe).toAttribute(i,r.type);this._$El=n,c==null?this.removeAttribute(l):this.setAttribute(l,c),this._$El=null}}_$AK(n,i){var r;const a=this.constructor,l=a._$Ev.get(n);if(l!==void 0&&this._$El!==l){const c=a.getPropertyOptions(l),d=typeof c.converter=="function"?{fromAttribute:c.converter}:((r=c.converter)===null||r===void 0?void 0:r.fromAttribute)!==void 0?c.converter:Xe;this._$El=l,this[l]=d.fromAttribute(i,c.type),this._$El=null}}requestUpdate(n,i,r){let a=!0;n!==void 0&&(((r=r||this.constructor.getPropertyOptions(n)).hasChanged||Ut)(this[n],i)?(this._$AL.has(n)||this._$AL.set(n,i),r.reflect===!0&&this._$El!==n&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(n,r))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(i){Promise.reject(i)}const n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((a,l)=>this[l]=a),this._$Ei=void 0);let i=!1;const r=this._$AL;try{i=this.shouldUpdate(r),i?(this.willUpdate(r),(n=this._$ES)===null||n===void 0||n.forEach(a=>{var l;return(l=a.hostUpdate)===null||l===void 0?void 0:l.call(a)}),this.update(r)):this._$Ek()}catch(a){throw i=!1,this._$Ek(),a}i&&this._$AE(r)}willUpdate(n){}_$AE(n){var i;(i=this._$ES)===null||i===void 0||i.forEach(r=>{var a;return(a=r.hostUpdated)===null||a===void 0?void 0:a.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(n){return!0}update(n){this._$EC!==void 0&&(this._$EC.forEach((i,r)=>this._$EO(r,this[r],i)),this._$EC=void 0),this._$Ek()}updated(n){}firstUpdated(n){}}J.finalized=!0,J.elementProperties=new Map,J.elementStyles=[],J.shadowRootOptions={mode:"open"},Vt?.({ReactiveElement:J}),((Ge=Be.reactiveElementVersions)!==null&&Ge!==void 0?Ge:Be.reactiveElementVersions=[]).push("1.4.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var et;const Oe=window,ee=Oe.trustedTypes,jt=ee?ee.createPolicy("lit-html",{createHTML:s=>s}):void 0,R=`lit$${(Math.random()+"").slice(9)}$`,tt="?"+R,bn=`<${tt}>`,te=document,be=(s="")=>te.createComment(s),pe=s=>s===null||typeof s!="object"&&typeof s!="function",zt=Array.isArray,qt=s=>zt(s)||typeof s?.[Symbol.iterator]=="function",me=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wt=/-->/g,Yt=/>/g,Y=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qt=/'/g,Kt=/"/g,Zt=/^(?:script|style|textarea|title)$/i,Gt=s=>(n,...i)=>({_$litType$:s,strings:n,values:i}),H=Gt(1),ws=Gt(2),oe=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),Xt=new WeakMap,ne=te.createTreeWalker(te,129,null,!1),Jt=(s,n)=>{const i=s.length-1,r=[];let a,l=n===2?"<svg>":"",c=me;for(let h=0;h<i;h++){const u=s[h];let b,f,p=-1,m=0;for(;m<u.length&&(c.lastIndex=m,f=c.exec(u),f!==null);)m=c.lastIndex,c===me?f[1]==="!--"?c=Wt:f[1]!==void 0?c=Yt:f[2]!==void 0?(Zt.test(f[2])&&(a=RegExp("</"+f[2],"g")),c=Y):f[3]!==void 0&&(c=Y):c===Y?f[0]===">"?(c=a??me,p=-1):f[1]===void 0?p=-2:(p=c.lastIndex-f[2].length,b=f[1],c=f[3]===void 0?Y:f[3]==='"'?Kt:Qt):c===Kt||c===Qt?c=Y:c===Wt||c===Yt?c=me:(c=Y,a=void 0);const _=c===Y&&s[h+1].startsWith("/>")?" ":"";l+=c===me?u+bn:p>=0?(r.push(b),u.slice(0,p)+"$lit$"+u.slice(p)+R+_):u+R+(p===-2?(r.push(void 0),h):_)}const d=l+(s[i]||"<?>")+(n===2?"</svg>":"");if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return[jt!==void 0?jt.createHTML(d):d,r]};class ge{constructor({strings:n,_$litType$:i},r){let a;this.parts=[];let l=0,c=0;const d=n.length-1,h=this.parts,[u,b]=Jt(n,i);if(this.el=ge.createElement(u,r),ne.currentNode=this.el.content,i===2){const f=this.el.content,p=f.firstChild;p.remove(),f.append(...p.childNodes)}for(;(a=ne.nextNode())!==null&&h.length<d;){if(a.nodeType===1){if(a.hasAttributes()){const f=[];for(const p of a.getAttributeNames())if(p.endsWith("$lit$")||p.startsWith(R)){const m=b[c++];if(f.push(p),m!==void 0){const _=a.getAttribute(m.toLowerCase()+"$lit$").split(R),$=/([.?@])?(.*)/.exec(m);h.push({type:1,index:l,name:$[2],strings:_,ctor:$[1]==="."?to:$[1]==="?"?oo:$[1]==="@"?no:ve})}else h.push({type:6,index:l})}for(const p of f)a.removeAttribute(p)}if(Zt.test(a.tagName)){const f=a.textContent.split(R),p=f.length-1;if(p>0){a.textContent=ee?ee.emptyScript:"";for(let m=0;m<p;m++)a.append(f[m],be()),ne.nextNode(),h.push({type:2,index:++l});a.append(f[p],be())}}}else if(a.nodeType===8)if(a.data===tt)h.push({type:2,index:l});else{let f=-1;for(;(f=a.data.indexOf(R,f+1))!==-1;)h.push({type:7,index:l}),f+=R.length-1}l++}}static createElement(n,i){const r=te.createElement("template");return r.innerHTML=n,r}}function Q(s,n,i=s,r){var a,l,c,d;if(n===oe)return n;let h=r!==void 0?(a=i._$Co)===null||a===void 0?void 0:a[r]:i._$Cl;const u=pe(n)?void 0:n._$litDirective$;return h?.constructor!==u&&((l=h?._$AO)===null||l===void 0||l.call(h,!1),u===void 0?h=void 0:(h=new u(s),h._$AT(s,i,r)),r!==void 0?((c=(d=i)._$Co)!==null&&c!==void 0?c:d._$Co=[])[r]=h:i._$Cl=h),h!==void 0&&(n=Q(s,h._$AS(s,n.values),h,r)),n}class eo{constructor(n,i){this.u=[],this._$AN=void 0,this._$AD=n,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(n){var i;const{el:{content:r},parts:a}=this._$AD,l=((i=n?.creationScope)!==null&&i!==void 0?i:te).importNode(r,!0);ne.currentNode=l;let c=ne.nextNode(),d=0,h=0,u=a[0];for(;u!==void 0;){if(d===u.index){let b;u.type===2?b=new ie(c,c.nextSibling,this,n):u.type===1?b=new u.ctor(c,u.name,u.strings,this,n):u.type===6&&(b=new io(c,this,n)),this.u.push(b),u=a[++h]}d!==u?.index&&(c=ne.nextNode(),d++)}return l}p(n){let i=0;for(const r of this.u)r!==void 0&&(r.strings!==void 0?(r._$AI(n,r,i),i+=r.strings.length-2):r._$AI(n[i])),i++}}class ie{constructor(n,i,r,a){var l;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=n,this._$AB=i,this._$AM=r,this.options=a,this._$Cm=(l=a?.isConnected)===null||l===void 0||l}get _$AU(){var n,i;return(i=(n=this._$AM)===null||n===void 0?void 0:n._$AU)!==null&&i!==void 0?i:this._$Cm}get parentNode(){let n=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&n.nodeType===11&&(n=i.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,i=this){n=Q(this,n,i),pe(n)?n===C||n==null||n===""?(this._$AH!==C&&this._$AR(),this._$AH=C):n!==this._$AH&&n!==oe&&this.g(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):qt(n)?this.k(n):this.g(n)}O(n,i=this._$AB){return this._$AA.parentNode.insertBefore(n,i)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}g(n){this._$AH!==C&&pe(this._$AH)?this._$AA.nextSibling.data=n:this.T(te.createTextNode(n)),this._$AH=n}$(n){var i;const{values:r,_$litType$:a}=n,l=typeof a=="number"?this._$AC(n):(a.el===void 0&&(a.el=ge.createElement(a.h,this.options)),a);if(((i=this._$AH)===null||i===void 0?void 0:i._$AD)===l)this._$AH.p(r);else{const c=new eo(l,this),d=c.v(this.options);c.p(r),this.T(d),this._$AH=c}}_$AC(n){let i=Xt.get(n.strings);return i===void 0&&Xt.set(n.strings,i=new ge(n)),i}k(n){zt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,a=0;for(const l of n)a===i.length?i.push(r=new ie(this.O(be()),this.O(be()),this,this.options)):r=i[a],r._$AI(l),a++;a<i.length&&(this._$AR(r&&r._$AB.nextSibling,a),i.length=a)}_$AR(n=this._$AA.nextSibling,i){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,i);n&&n!==this._$AB;){const a=n.nextSibling;n.remove(),n=a}}setConnected(n){var i;this._$AM===void 0&&(this._$Cm=n,(i=this._$AP)===null||i===void 0||i.call(this,n))}}class ve{constructor(n,i,r,a,l){this.type=1,this._$AH=C,this._$AN=void 0,this.element=n,this.name=i,this._$AM=a,this.options=l,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(n,i=this,r,a){const l=this.strings;let c=!1;if(l===void 0)n=Q(this,n,i,0),c=!pe(n)||n!==this._$AH&&n!==oe,c&&(this._$AH=n);else{const d=n;let h,u;for(n=l[0],h=0;h<l.length-1;h++)u=Q(this,d[r+h],i,h),u===oe&&(u=this._$AH[h]),c||(c=!pe(u)||u!==this._$AH[h]),u===C?n=C:n!==C&&(n+=(u??"")+l[h+1]),this._$AH[h]=u}c&&!a&&this.j(n)}j(n){n===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}}class to extends ve{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===C?void 0:n}}const pn=ee?ee.emptyScript:"";class oo extends ve{constructor(){super(...arguments),this.type=4}j(n){n&&n!==C?this.element.setAttribute(this.name,pn):this.element.removeAttribute(this.name)}}class no extends ve{constructor(n,i,r,a,l){super(n,i,r,a,l),this.type=5}_$AI(n,i=this){var r;if((n=(r=Q(this,n,i,0))!==null&&r!==void 0?r:C)===oe)return;const a=this._$AH,l=n===C&&a!==C||n.capture!==a.capture||n.once!==a.once||n.passive!==a.passive,c=n!==C&&(a===C||l);l&&this.element.removeEventListener(this.name,this,a),c&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){var i,r;typeof this._$AH=="function"?this._$AH.call((r=(i=this.options)===null||i===void 0?void 0:i.host)!==null&&r!==void 0?r:this.element,n):this._$AH.handleEvent(n)}}class io{constructor(n,i,r){this.element=n,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(n){Q(this,n)}}const $s={P:"$lit$",A:R,M:tt,C:1,L:Jt,R:eo,D:qt,V:Q,I:ie,H:ve,N:oo,U:no,B:to,F:io},so=Oe.litHtmlPolyfillSupport;so?.(ge,ie),((et=Oe.litHtmlVersions)!==null&&et!==void 0?et:Oe.litHtmlVersions=[]).push("2.4.0");const mn=(s,n,i)=>{var r,a;const l=(r=i?.renderBefore)!==null&&r!==void 0?r:n;let c=l._$litPart$;if(c===void 0){const d=(a=i?.renderBefore)!==null&&a!==void 0?a:null;l._$litPart$=c=new ie(n.insertBefore(be(),d),d,void 0,i??{})}return c._$AI(s),c};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot,nt;const xs=null;class O extends J{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n,i;const r=super.createRenderRoot();return(n=(i=this.renderOptions).renderBefore)!==null&&n!==void 0||(i.renderBefore=r.firstChild),r}update(n){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=mn(i,this.renderRoot,this.renderOptions)}connectedCallback(){var n;super.connectedCallback(),(n=this._$Do)===null||n===void 0||n.setConnected(!0)}disconnectedCallback(){var n;super.disconnectedCallback(),(n=this._$Do)===null||n===void 0||n.setConnected(!1)}render(){return oe}}O.finalized=!0,O._$litElement$=!0,(ot=globalThis.litElementHydrateSupport)===null||ot===void 0||ot.call(globalThis,{LitElement:O});const ro=globalThis.litElementPolyfillSupport;ro?.({LitElement:O});const Cs={_$AK:(s,n,i)=>{s._$AK(n,i)},_$AL:s=>s._$AL};((nt=globalThis.litElementVersions)!==null&&nt!==void 0?nt:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=s=>n=>typeof n=="function"?((i,r)=>(customElements.define(i,r),r))(s,n):((i,r)=>{const{kind:a,elements:l}=r;return{kind:a,elements:l,finisher(c){customElements.define(i,c)}}})(s,n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gn=(s,n)=>n.kind==="method"&&n.descriptor&&!("value"in n.descriptor)?{...n,finisher(i){i.createProperty(n.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:n.key,initializer(){typeof n.initializer=="function"&&(this[n.key]=n.initializer.call(this))},finisher(i){i.createProperty(n.key,s)}};function g(s){return(n,i)=>i!==void 0?((r,a,l)=>{a.constructor.createProperty(l,r)})(s,n,i):gn(s,n)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var it;const vn=((it=window.HTMLSlotElement)===null||it===void 0?void 0:it.prototype.assignedElements)!=null?(s,n)=>s.assignedElements(n):(s,n)=>s.assignedNodes(n).filter(i=>i.nodeType===Node.ELEMENT_NODE);function ks(s){const{slot:n,selector:i}=s??{};return o({descriptor:r=>({get(){var a;const l="slot"+(n?`[name=${n}]`:":not([name])"),c=(a=this.renderRoot)===null||a===void 0?void 0:a.querySelector(l),d=c!=null?vn(c,s):[];return i?d.filter(h=>h.matches(i)):d},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ss(s,n,i){let r,a=s;return typeof s=="object"?(a=s.slot,r=s):r={flatten:n},i?t({slot:a,flatten:n,selector:i}):e({descriptor:l=>({get(){var c,d;const h="slot"+(a?`[name=${a}]`:":not([name])"),u=(c=this.renderRoot)===null||c===void 0?void 0:c.querySelector(h);return(d=u?.assignedNodes(r))!==null&&d!==void 0?d:[]},enumerable:!0,configurable:!0})})}var yn=Object.defineProperty,_n=Object.getOwnPropertyDescriptor,st=(s,n,i,r)=>{for(var a=r>1?void 0:r?_n(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&yn(n,i,a),a};let ye=class extends O{constructor(){super(...arguments),this.icon="",this.modifier=""}render(){return H``}};ye.styles=X`
		:host {
			font: normal normal normal 16px/1 codicon;
			display: inline-block;
			text-decoration: none;
			text-rendering: auto;
			text-align: center;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			color: inherit;
			vertical-align: text-bottom;
			letter-spacing: normal;
		}

		:host([icon='add']):before {
			content: '\\ea60';
		}
		:host([icon='plus']):before {
			content: '\\ea60';
		}
		:host([icon='gist-new']):before {
			content: '\\ea60';
		}
		:host([icon='repo-create']):before {
			content: '\\ea60';
		}
		:host([icon='lightbulb']):before {
			content: '\\ea61';
		}
		:host([icon='light-bulb']):before {
			content: '\\ea61';
		}
		:host([icon='repo']):before {
			content: '\\ea62';
		}
		:host([icon='repo-delete']):before {
			content: '\\ea62';
		}
		:host([icon='gist-fork']):before {
			content: '\\ea63';
		}
		:host([icon='repo-forked']):before {
			content: '\\ea63';
		}
		:host([icon='git-pull-request']):before {
			content: '\\ea64';
		}
		:host([icon='git-pull-request-abandoned']):before {
			content: '\\ea64';
		}
		:host([icon='record-keys']):before {
			content: '\\ea65';
		}
		:host([icon='keyboard']):before {
			content: '\\ea65';
		}
		:host([icon='tag']):before {
			content: '\\ea66';
		}
		:host([icon='tag-add']):before {
			content: '\\ea66';
		}
		:host([icon='tag-remove']):before {
			content: '\\ea66';
		}
		:host([icon='person']):before {
			content: '\\ea67';
		}
		:host([icon='person-follow']):before {
			content: '\\ea67';
		}
		:host([icon='person-outline']):before {
			content: '\\ea67';
		}
		:host([icon='person-filled']):before {
			content: '\\ea67';
		}
		:host([icon='git-branch']):before {
			content: '\\ea68';
		}
		:host([icon='git-branch-create']):before {
			content: '\\ea68';
		}
		:host([icon='git-branch-delete']):before {
			content: '\\ea68';
		}
		:host([icon='source-control']):before {
			content: '\\ea68';
		}
		:host([icon='mirror']):before {
			content: '\\ea69';
		}
		:host([icon='mirror-public']):before {
			content: '\\ea69';
		}
		:host([icon='star']):before {
			content: '\\ea6a';
		}
		:host([icon='star-add']):before {
			content: '\\ea6a';
		}
		:host([icon='star-delete']):before {
			content: '\\ea6a';
		}
		:host([icon='star-empty']):before {
			content: '\\ea6a';
		}
		:host([icon='comment']):before {
			content: '\\ea6b';
		}
		:host([icon='comment-add']):before {
			content: '\\ea6b';
		}
		:host([icon='alert']):before {
			content: '\\ea6c';
		}
		:host([icon='warning']):before {
			content: '\\ea6c';
		}
		:host([icon='search']):before {
			content: '\\ea6d';
		}
		:host([icon='search-save']):before {
			content: '\\ea6d';
		}
		:host([icon='log-out']):before {
			content: '\\ea6e';
		}
		:host([icon='sign-out']):before {
			content: '\\ea6e';
		}
		:host([icon='log-in']):before {
			content: '\\ea6f';
		}
		:host([icon='sign-in']):before {
			content: '\\ea6f';
		}
		:host([icon='eye']):before {
			content: '\\ea70';
		}
		:host([icon='eye-unwatch']):before {
			content: '\\ea70';
		}
		:host([icon='eye-watch']):before {
			content: '\\ea70';
		}
		:host([icon='circle-filled']):before {
			content: '\\ea71';
		}
		:host([icon='primitive-dot']):before {
			content: '\\ea71';
		}
		:host([icon='close-dirty']):before {
			content: '\\ea71';
		}
		:host([icon='debug-breakpoint']):before {
			content: '\\ea71';
		}
		:host([icon='debug-breakpoint-disabled']):before {
			content: '\\ea71';
		}
		:host([icon='debug-hint']):before {
			content: '\\ea71';
		}
		:host([icon='primitive-square']):before {
			content: '\\ea72';
		}
		:host([icon='edit']):before {
			content: '\\ea73';
		}
		:host([icon='pencil']):before {
			content: '\\ea73';
		}
		:host([icon='info']):before {
			content: '\\ea74';
		}
		:host([icon='issue-opened']):before {
			content: '\\ea74';
		}
		:host([icon='gist-private']):before {
			content: '\\ea75';
		}
		:host([icon='git-fork-private']):before {
			content: '\\ea75';
		}
		:host([icon='lock']):before {
			content: '\\ea75';
		}
		:host([icon='mirror-private']):before {
			content: '\\ea75';
		}
		:host([icon='close']):before {
			content: '\\ea76';
		}
		:host([icon='remove-close']):before {
			content: '\\ea76';
		}
		:host([icon='x']):before {
			content: '\\ea76';
		}
		:host([icon='repo-sync']):before {
			content: '\\ea77';
		}
		:host([icon='sync']):before {
			content: '\\ea77';
		}
		:host([icon='clone']):before {
			content: '\\ea78';
		}
		:host([icon='desktop-download']):before {
			content: '\\ea78';
		}
		:host([icon='beaker']):before {
			content: '\\ea79';
		}
		:host([icon='microscope']):before {
			content: '\\ea79';
		}
		:host([icon='vm']):before {
			content: '\\ea7a';
		}
		:host([icon='device-desktop']):before {
			content: '\\ea7a';
		}
		:host([icon='file']):before {
			content: '\\ea7b';
		}
		:host([icon='file-text']):before {
			content: '\\ea7b';
		}
		:host([icon='more']):before {
			content: '\\ea7c';
		}
		:host([icon='ellipsis']):before {
			content: '\\ea7c';
		}
		:host([icon='kebab-horizontal']):before {
			content: '\\ea7c';
		}
		:host([icon='mail-reply']):before {
			content: '\\ea7d';
		}
		:host([icon='reply']):before {
			content: '\\ea7d';
		}
		:host([icon='organization']):before {
			content: '\\ea7e';
		}
		:host([icon='organization-filled']):before {
			content: '\\ea7e';
		}
		:host([icon='organization-outline']):before {
			content: '\\ea7e';
		}
		:host([icon='new-file']):before {
			content: '\\ea7f';
		}
		:host([icon='file-add']):before {
			content: '\\ea7f';
		}
		:host([icon='new-folder']):before {
			content: '\\ea80';
		}
		:host([icon='file-directory-create']):before {
			content: '\\ea80';
		}
		:host([icon='trash']):before {
			content: '\\ea81';
		}
		:host([icon='trashcan']):before {
			content: '\\ea81';
		}
		:host([icon='history']):before {
			content: '\\ea82';
		}
		:host([icon='clock']):before {
			content: '\\ea82';
		}
		:host([icon='folder']):before {
			content: '\\ea83';
		}
		:host([icon='file-directory']):before {
			content: '\\ea83';
		}
		:host([icon='symbol-folder']):before {
			content: '\\ea83';
		}
		:host([icon='logo-github']):before {
			content: '\\ea84';
		}
		:host([icon='mark-github']):before {
			content: '\\ea84';
		}
		:host([icon='github']):before {
			content: '\\ea84';
		}
		:host([icon='terminal']):before {
			content: '\\ea85';
		}
		:host([icon='console']):before {
			content: '\\ea85';
		}
		:host([icon='repl']):before {
			content: '\\ea85';
		}
		:host([icon='zap']):before {
			content: '\\ea86';
		}
		:host([icon='symbol-event']):before {
			content: '\\ea86';
		}
		:host([icon='error']):before {
			content: '\\ea87';
		}
		:host([icon='stop']):before {
			content: '\\ea87';
		}
		:host([icon='variable']):before {
			content: '\\ea88';
		}
		:host([icon='symbol-variable']):before {
			content: '\\ea88';
		}
		:host([icon='array']):before {
			content: '\\ea8a';
		}
		:host([icon='symbol-array']):before {
			content: '\\ea8a';
		}
		:host([icon='symbol-module']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-package']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-namespace']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-object']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-method']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-function']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-constructor']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-boolean']):before {
			content: '\\ea8f';
		}
		:host([icon='symbol-null']):before {
			content: '\\ea8f';
		}
		:host([icon='symbol-numeric']):before {
			content: '\\ea90';
		}
		:host([icon='symbol-number']):before {
			content: '\\ea90';
		}
		:host([icon='symbol-structure']):before {
			content: '\\ea91';
		}
		:host([icon='symbol-struct']):before {
			content: '\\ea91';
		}
		:host([icon='symbol-parameter']):before {
			content: '\\ea92';
		}
		:host([icon='symbol-type-parameter']):before {
			content: '\\ea92';
		}
		:host([icon='symbol-key']):before {
			content: '\\ea93';
		}
		:host([icon='symbol-text']):before {
			content: '\\ea93';
		}
		:host([icon='symbol-reference']):before {
			content: '\\ea94';
		}
		:host([icon='go-to-file']):before {
			content: '\\ea94';
		}
		:host([icon='symbol-enum']):before {
			content: '\\ea95';
		}
		:host([icon='symbol-value']):before {
			content: '\\ea95';
		}
		:host([icon='symbol-ruler']):before {
			content: '\\ea96';
		}
		:host([icon='symbol-unit']):before {
			content: '\\ea96';
		}
		:host([icon='activate-breakpoints']):before {
			content: '\\ea97';
		}
		:host([icon='archive']):before {
			content: '\\ea98';
		}
		:host([icon='arrow-both']):before {
			content: '\\ea99';
		}
		:host([icon='arrow-down']):before {
			content: '\\ea9a';
		}
		:host([icon='arrow-left']):before {
			content: '\\ea9b';
		}
		:host([icon='arrow-right']):before {
			content: '\\ea9c';
		}
		:host([icon='arrow-small-down']):before {
			content: '\\ea9d';
		}
		:host([icon='arrow-small-left']):before {
			content: '\\ea9e';
		}
		:host([icon='arrow-small-right']):before {
			content: '\\ea9f';
		}
		:host([icon='arrow-small-up']):before {
			content: '\\eaa0';
		}
		:host([icon='arrow-up']):before {
			content: '\\eaa1';
		}
		:host([icon='bell']):before {
			content: '\\eaa2';
		}
		:host([icon='bold']):before {
			content: '\\eaa3';
		}
		:host([icon='book']):before {
			content: '\\eaa4';
		}
		:host([icon='bookmark']):before {
			content: '\\eaa5';
		}
		:host([icon='debug-breakpoint-conditional-unverified']):before {
			content: '\\eaa6';
		}
		:host([icon='debug-breakpoint-conditional']):before {
			content: '\\eaa7';
		}
		:host([icon='debug-breakpoint-conditional-disabled']):before {
			content: '\\eaa7';
		}
		:host([icon='debug-breakpoint-data-unverified']):before {
			content: '\\eaa8';
		}
		:host([icon='debug-breakpoint-data']):before {
			content: '\\eaa9';
		}
		:host([icon='debug-breakpoint-data-disabled']):before {
			content: '\\eaa9';
		}
		:host([icon='debug-breakpoint-log-unverified']):before {
			content: '\\eaaa';
		}
		:host([icon='debug-breakpoint-log']):before {
			content: '\\eaab';
		}
		:host([icon='debug-breakpoint-log-disabled']):before {
			content: '\\eaab';
		}
		:host([icon='briefcase']):before {
			content: '\\eaac';
		}
		:host([icon='broadcast']):before {
			content: '\\eaad';
		}
		:host([icon='browser']):before {
			content: '\\eaae';
		}
		:host([icon='bug']):before {
			content: '\\eaaf';
		}
		:host([icon='calendar']):before {
			content: '\\eab0';
		}
		:host([icon='case-sensitive']):before {
			content: '\\eab1';
		}
		:host([icon='check']):before {
			content: '\\eab2';
		}
		:host([icon='checklist']):before {
			content: '\\eab3';
		}
		:host([icon='chevron-down']):before {
			content: '\\eab4';
		}
		:host([icon='chevron-left']):before {
			content: '\\eab5';
		}
		:host([icon='chevron-right']):before {
			content: '\\eab6';
		}
		:host([icon='chevron-up']):before {
			content: '\\eab7';
		}
		:host([icon='chrome-close']):before {
			content: '\\eab8';
		}
		:host([icon='chrome-maximize']):before {
			content: '\\eab9';
		}
		:host([icon='chrome-minimize']):before {
			content: '\\eaba';
		}
		:host([icon='chrome-restore']):before {
			content: '\\eabb';
		}
		:host([icon='circle-outline']):before {
			content: '\\eabc';
		}
		:host([icon='debug-breakpoint-unverified']):before {
			content: '\\eabc';
		}
		:host([icon='circle-slash']):before {
			content: '\\eabd';
		}
		:host([icon='circuit-board']):before {
			content: '\\eabe';
		}
		:host([icon='clear-all']):before {
			content: '\\eabf';
		}
		:host([icon='clippy']):before {
			content: '\\eac0';
		}
		:host([icon='close-all']):before {
			content: '\\eac1';
		}
		:host([icon='cloud-download']):before {
			content: '\\eac2';
		}
		:host([icon='cloud-upload']):before {
			content: '\\eac3';
		}
		:host([icon='code']):before {
			content: '\\eac4';
		}
		:host([icon='collapse-all']):before {
			content: '\\eac5';
		}
		:host([icon='color-mode']):before {
			content: '\\eac6';
		}
		:host([icon='comment-discussion']):before {
			content: '\\eac7';
		}
		:host([icon='credit-card']):before {
			content: '\\eac9';
		}
		:host([icon='dash']):before {
			content: '\\eacc';
		}
		:host([icon='dashboard']):before {
			content: '\\eacd';
		}
		:host([icon='database']):before {
			content: '\\eace';
		}
		:host([icon='debug-continue']):before {
			content: '\\eacf';
		}
		:host([icon='debug-disconnect']):before {
			content: '\\ead0';
		}
		:host([icon='debug-pause']):before {
			content: '\\ead1';
		}
		:host([icon='debug-restart']):before {
			content: '\\ead2';
		}
		:host([icon='debug-start']):before {
			content: '\\ead3';
		}
		:host([icon='debug-step-into']):before {
			content: '\\ead4';
		}
		:host([icon='debug-step-out']):before {
			content: '\\ead5';
		}
		:host([icon='debug-step-over']):before {
			content: '\\ead6';
		}
		:host([icon='debug-stop']):before {
			content: '\\ead7';
		}
		:host([icon='debug']):before {
			content: '\\ead8';
		}
		:host([icon='device-camera-video']):before {
			content: '\\ead9';
		}
		:host([icon='device-camera']):before {
			content: '\\eada';
		}
		:host([icon='device-mobile']):before {
			content: '\\eadb';
		}
		:host([icon='diff-added']):before {
			content: '\\eadc';
		}
		:host([icon='diff-ignored']):before {
			content: '\\eadd';
		}
		:host([icon='diff-modified']):before {
			content: '\\eade';
		}
		:host([icon='diff-removed']):before {
			content: '\\eadf';
		}
		:host([icon='diff-renamed']):before {
			content: '\\eae0';
		}
		:host([icon='diff']):before {
			content: '\\eae1';
		}
		:host([icon='discard']):before {
			content: '\\eae2';
		}
		:host([icon='editor-layout']):before {
			content: '\\eae3';
		}
		:host([icon='empty-window']):before {
			content: '\\eae4';
		}
		:host([icon='exclude']):before {
			content: '\\eae5';
		}
		:host([icon='extensions']):before {
			content: '\\eae6';
		}
		:host([icon='eye-closed']):before {
			content: '\\eae7';
		}
		:host([icon='file-binary']):before {
			content: '\\eae8';
		}
		:host([icon='file-code']):before {
			content: '\\eae9';
		}
		:host([icon='file-media']):before {
			content: '\\eaea';
		}
		:host([icon='file-pdf']):before {
			content: '\\eaeb';
		}
		:host([icon='file-submodule']):before {
			content: '\\eaec';
		}
		:host([icon='file-symlink-directory']):before {
			content: '\\eaed';
		}
		:host([icon='file-symlink-file']):before {
			content: '\\eaee';
		}
		:host([icon='file-zip']):before {
			content: '\\eaef';
		}
		:host([icon='files']):before {
			content: '\\eaf0';
		}
		:host([icon='filter']):before {
			content: '\\eaf1';
		}
		:host([icon='flame']):before {
			content: '\\eaf2';
		}
		:host([icon='fold-down']):before {
			content: '\\eaf3';
		}
		:host([icon='fold-up']):before {
			content: '\\eaf4';
		}
		:host([icon='fold']):before {
			content: '\\eaf5';
		}
		:host([icon='folder-active']):before {
			content: '\\eaf6';
		}
		:host([icon='folder-opened']):before {
			content: '\\eaf7';
		}
		:host([icon='gear']):before {
			content: '\\eaf8';
		}
		:host([icon='gift']):before {
			content: '\\eaf9';
		}
		:host([icon='gist-secret']):before {
			content: '\\eafa';
		}
		:host([icon='gist']):before {
			content: '\\eafb';
		}
		:host([icon='git-commit']):before {
			content: '\\eafc';
		}
		:host([icon='git-compare']):before {
			content: '\\eafd';
		}
		:host([icon='compare-changes']):before {
			content: '\\eafd';
		}
		:host([icon='git-merge']):before {
			content: '\\eafe';
		}
		:host([icon='github-action']):before {
			content: '\\eaff';
		}
		:host([icon='github-alt']):before {
			content: '\\eb00';
		}
		:host([icon='globe']):before {
			content: '\\eb01';
		}
		:host([icon='grabber']):before {
			content: '\\eb02';
		}
		:host([icon='graph']):before {
			content: '\\eb03';
		}
		:host([icon='gripper']):before {
			content: '\\eb04';
		}
		:host([icon='heart']):before {
			content: '\\eb05';
		}
		:host([icon='home']):before {
			content: '\\eb06';
		}
		:host([icon='horizontal-rule']):before {
			content: '\\eb07';
		}
		:host([icon='hubot']):before {
			content: '\\eb08';
		}
		:host([icon='inbox']):before {
			content: '\\eb09';
		}
		:host([icon='issue-reopened']):before {
			content: '\\eb0b';
		}
		:host([icon='issues']):before {
			content: '\\eb0c';
		}
		:host([icon='italic']):before {
			content: '\\eb0d';
		}
		:host([icon='jersey']):before {
			content: '\\eb0e';
		}
		:host([icon='json']):before {
			content: '\\eb0f';
		}
		:host([icon='kebab-vertical']):before {
			content: '\\eb10';
		}
		:host([icon='key']):before {
			content: '\\eb11';
		}
		:host([icon='law']):before {
			content: '\\eb12';
		}
		:host([icon='lightbulb-autofix']):before {
			content: '\\eb13';
		}
		:host([icon='link-external']):before {
			content: '\\eb14';
		}
		:host([icon='link']):before {
			content: '\\eb15';
		}
		:host([icon='list-ordered']):before {
			content: '\\eb16';
		}
		:host([icon='list-unordered']):before {
			content: '\\eb17';
		}
		:host([icon='live-share']):before {
			content: '\\eb18';
		}
		:host([icon='loading']):before {
			content: '\\eb19';
		}
		:host([icon='location']):before {
			content: '\\eb1a';
		}
		:host([icon='mail-read']):before {
			content: '\\eb1b';
		}
		:host([icon='mail']):before {
			content: '\\eb1c';
		}
		:host([icon='markdown']):before {
			content: '\\eb1d';
		}
		:host([icon='megaphone']):before {
			content: '\\eb1e';
		}
		:host([icon='mention']):before {
			content: '\\eb1f';
		}
		:host([icon='milestone']):before {
			content: '\\eb20';
		}
		:host([icon='mortar-board']):before {
			content: '\\eb21';
		}
		:host([icon='move']):before {
			content: '\\eb22';
		}
		:host([icon='multiple-windows']):before {
			content: '\\eb23';
		}
		:host([icon='mute']):before {
			content: '\\eb24';
		}
		:host([icon='no-newline']):before {
			content: '\\eb25';
		}
		:host([icon='note']):before {
			content: '\\eb26';
		}
		:host([icon='octoface']):before {
			content: '\\eb27';
		}
		:host([icon='open-preview']):before {
			content: '\\eb28';
		}
		:host([icon='package']):before {
			content: '\\eb29';
		}
		:host([icon='paintcan']):before {
			content: '\\eb2a';
		}
		:host([icon='pin']):before {
			content: '\\eb2b';
		}
		:host([icon='play']):before {
			content: '\\eb2c';
		}
		:host([icon='run']):before {
			content: '\\eb2c';
		}
		:host([icon='plug']):before {
			content: '\\eb2d';
		}
		:host([icon='preserve-case']):before {
			content: '\\eb2e';
		}
		:host([icon='preview']):before {
			content: '\\eb2f';
		}
		:host([icon='project']):before {
			content: '\\eb30';
		}
		:host([icon='pulse']):before {
			content: '\\eb31';
		}
		:host([icon='question']):before {
			content: '\\eb32';
		}
		:host([icon='quote']):before {
			content: '\\eb33';
		}
		:host([icon='radio-tower']):before {
			content: '\\eb34';
		}
		:host([icon='reactions']):before {
			content: '\\eb35';
		}
		:host([icon='references']):before {
			content: '\\eb36';
		}
		:host([icon='refresh']):before {
			content: '\\eb37';
		}
		:host([icon='regex']):before {
			content: '\\eb38';
		}
		:host([icon='remote-explorer']):before {
			content: '\\eb39';
		}
		:host([icon='remote']):before {
			content: '\\eb3a';
		}
		:host([icon='remove']):before {
			content: '\\eb3b';
		}
		:host([icon='replace-all']):before {
			content: '\\eb3c';
		}
		:host([icon='replace']):before {
			content: '\\eb3d';
		}
		:host([icon='repo-clone']):before {
			content: '\\eb3e';
		}
		:host([icon='repo-force-push']):before {
			content: '\\eb3f';
		}
		:host([icon='repo-pull']):before {
			content: '\\eb40';
		}
		:host([icon='repo-push']):before {
			content: '\\eb41';
		}
		:host([icon='report']):before {
			content: '\\eb42';
		}
		:host([icon='request-changes']):before {
			content: '\\eb43';
		}
		:host([icon='rocket']):before {
			content: '\\eb44';
		}
		:host([icon='root-folder-opened']):before {
			content: '\\eb45';
		}
		:host([icon='root-folder']):before {
			content: '\\eb46';
		}
		:host([icon='rss']):before {
			content: '\\eb47';
		}
		:host([icon='ruby']):before {
			content: '\\eb48';
		}
		:host([icon='save-all']):before {
			content: '\\eb49';
		}
		:host([icon='save-as']):before {
			content: '\\eb4a';
		}
		:host([icon='save']):before {
			content: '\\eb4b';
		}
		:host([icon='screen-full']):before {
			content: '\\eb4c';
		}
		:host([icon='screen-normal']):before {
			content: '\\eb4d';
		}
		:host([icon='search-stop']):before {
			content: '\\eb4e';
		}
		:host([icon='server']):before {
			content: '\\eb50';
		}
		:host([icon='settings-gear']):before {
			content: '\\eb51';
		}
		:host([icon='settings']):before {
			content: '\\eb52';
		}
		:host([icon='shield']):before {
			content: '\\eb53';
		}
		:host([icon='smiley']):before {
			content: '\\eb54';
		}
		:host([icon='sort-precedence']):before {
			content: '\\eb55';
		}
		:host([icon='split-horizontal']):before {
			content: '\\eb56';
		}
		:host([icon='split-vertical']):before {
			content: '\\eb57';
		}
		:host([icon='squirrel']):before {
			content: '\\eb58';
		}
		:host([icon='star-full']):before {
			content: '\\eb59';
		}
		:host([icon='star-half']):before {
			content: '\\eb5a';
		}
		:host([icon='symbol-class']):before {
			content: '\\eb5b';
		}
		:host([icon='symbol-color']):before {
			content: '\\eb5c';
		}
		:host([icon='symbol-constant']):before {
			content: '\\eb5d';
		}
		:host([icon='symbol-enum-member']):before {
			content: '\\eb5e';
		}
		:host([icon='symbol-field']):before {
			content: '\\eb5f';
		}
		:host([icon='symbol-file']):before {
			content: '\\eb60';
		}
		:host([icon='symbol-interface']):before {
			content: '\\eb61';
		}
		:host([icon='symbol-keyword']):before {
			content: '\\eb62';
		}
		:host([icon='symbol-misc']):before {
			content: '\\eb63';
		}
		:host([icon='symbol-operator']):before {
			content: '\\eb64';
		}
		:host([icon='symbol-property']):before {
			content: '\\eb65';
		}
		:host([icon='wrench']):before {
			content: '\\eb65';
		}
		:host([icon='wrench-subaction']):before {
			content: '\\eb65';
		}
		:host([icon='symbol-snippet']):before {
			content: '\\eb66';
		}
		:host([icon='tasklist']):before {
			content: '\\eb67';
		}
		:host([icon='telescope']):before {
			content: '\\eb68';
		}
		:host([icon='text-size']):before {
			content: '\\eb69';
		}
		:host([icon='three-bars']):before {
			content: '\\eb6a';
		}
		:host([icon='thumbsdown']):before {
			content: '\\eb6b';
		}
		:host([icon='thumbsup']):before {
			content: '\\eb6c';
		}
		:host([icon='tools']):before {
			content: '\\eb6d';
		}
		:host([icon='triangle-down']):before {
			content: '\\eb6e';
		}
		:host([icon='triangle-left']):before {
			content: '\\eb6f';
		}
		:host([icon='triangle-right']):before {
			content: '\\eb70';
		}
		:host([icon='triangle-up']):before {
			content: '\\eb71';
		}
		:host([icon='twitter']):before {
			content: '\\eb72';
		}
		:host([icon='unfold']):before {
			content: '\\eb73';
		}
		:host([icon='unlock']):before {
			content: '\\eb74';
		}
		:host([icon='unmute']):before {
			content: '\\eb75';
		}
		:host([icon='unverified']):before {
			content: '\\eb76';
		}
		:host([icon='verified']):before {
			content: '\\eb77';
		}
		:host([icon='versions']):before {
			content: '\\eb78';
		}
		:host([icon='vm-active']):before {
			content: '\\eb79';
		}
		:host([icon='vm-outline']):before {
			content: '\\eb7a';
		}
		:host([icon='vm-running']):before {
			content: '\\eb7b';
		}
		:host([icon='watch']):before {
			content: '\\eb7c';
		}
		:host([icon='whitespace']):before {
			content: '\\eb7d';
		}
		:host([icon='whole-word']):before {
			content: '\\eb7e';
		}
		:host([icon='window']):before {
			content: '\\eb7f';
		}
		:host([icon='word-wrap']):before {
			content: '\\eb80';
		}
		:host([icon='zoom-in']):before {
			content: '\\eb81';
		}
		:host([icon='zoom-out']):before {
			content: '\\eb82';
		}
		:host([icon='list-filter']):before {
			content: '\\eb83';
		}
		:host([icon='list-flat']):before {
			content: '\\eb84';
		}
		:host([icon='list-selection']):before {
			content: '\\eb85';
		}
		:host([icon='selection']):before {
			content: '\\eb85';
		}
		:host([icon='list-tree']):before {
			content: '\\eb86';
		}
		:host([icon='debug-breakpoint-function-unverified']):before {
			content: '\\eb87';
		}
		:host([icon='debug-breakpoint-function']):before {
			content: '\\eb88';
		}
		:host([icon='debug-breakpoint-function-disabled']):before {
			content: '\\eb88';
		}
		:host([icon='debug-stackframe-active']):before {
			content: '\\eb89';
		}
		:host([icon='debug-stackframe-dot']):before {
			content: '\\eb8a';
		}
		:host([icon='debug-stackframe']):before {
			content: '\\eb8b';
		}
		:host([icon='debug-stackframe-focused']):before {
			content: '\\eb8b';
		}
		:host([icon='debug-breakpoint-unsupported']):before {
			content: '\\eb8c';
		}
		:host([icon='symbol-string']):before {
			content: '\\eb8d';
		}
		:host([icon='debug-reverse-continue']):before {
			content: '\\eb8e';
		}
		:host([icon='debug-step-back']):before {
			content: '\\eb8f';
		}
		:host([icon='debug-restart-frame']):before {
			content: '\\eb90';
		}
		:host([icon='debug-alt']):before {
			content: '\\eb91';
		}
		:host([icon='call-incoming']):before {
			content: '\\eb92';
		}
		:host([icon='call-outgoing']):before {
			content: '\\eb93';
		}
		:host([icon='menu']):before {
			content: '\\eb94';
		}
		:host([icon='expand-all']):before {
			content: '\\eb95';
		}
		:host([icon='feedback']):before {
			content: '\\eb96';
		}
		:host([icon='group-by-ref-type']):before {
			content: '\\eb97';
		}
		:host([icon='ungroup-by-ref-type']):before {
			content: '\\eb98';
		}
		:host([icon='account']):before {
			content: '\\eb99';
		}
		:host([icon='bell-dot']):before {
			content: '\\eb9a';
		}
		:host([icon='debug-console']):before {
			content: '\\eb9b';
		}
		:host([icon='library']):before {
			content: '\\eb9c';
		}
		:host([icon='output']):before {
			content: '\\eb9d';
		}
		:host([icon='run-all']):before {
			content: '\\eb9e';
		}
		:host([icon='sync-ignored']):before {
			content: '\\eb9f';
		}
		:host([icon='pinned']):before {
			content: '\\eba0';
		}
		:host([icon='github-inverted']):before {
			content: '\\eba1';
		}
		:host([icon='server-process']):before {
			content: '\\eba2';
		}
		:host([icon='server-environment']):before {
			content: '\\eba3';
		}
		:host([icon='pass']):before {
			content: '\\eba4';
		}
		:host([icon='issue-closed']):before {
			content: '\\eba4';
		}
		:host([icon='stop-circle']):before {
			content: '\\eba5';
		}
		:host([icon='play-circle']):before {
			content: '\\eba6';
		}
		:host([icon='record']):before {
			content: '\\eba7';
		}
		:host([icon='debug-alt-small']):before {
			content: '\\eba8';
		}
		:host([icon='vm-connect']):before {
			content: '\\eba9';
		}
		:host([icon='cloud']):before {
			content: '\\ebaa';
		}
		:host([icon='merge']):before {
			content: '\\ebab';
		}
		:host([icon='export']):before {
			content: '\\ebac';
		}
		:host([icon='graph-left']):before {
			content: '\\ebad';
		}
		:host([icon='magnet']):before {
			content: '\\ebae';
		}
		:host([icon='notebook']):before {
			content: '\\ebaf';
		}
		:host([icon='redo']):before {
			content: '\\ebb0';
		}
		:host([icon='check-all']):before {
			content: '\\ebb1';
		}
		:host([icon='pinned-dirty']):before {
			content: '\\ebb2';
		}
		:host([icon='pass-filled']):before {
			content: '\\ebb3';
		}
		:host([icon='circle-large-filled']):before {
			content: '\\ebb4';
		}
		:host([icon='circle-large-outline']):before {
			content: '\\ebb5';
		}
		:host([icon='combine']):before {
			content: '\\ebb6';
		}
		:host([icon='gather']):before {
			content: '\\ebb6';
		}
		:host([icon='table']):before {
			content: '\\ebb7';
		}
		:host([icon='variable-group']):before {
			content: '\\ebb8';
		}
		:host([icon='type-hierarchy']):before {
			content: '\\ebb9';
		}
		:host([icon='type-hierarchy-sub']):before {
			content: '\\ebba';
		}
		:host([icon='type-hierarchy-super']):before {
			content: '\\ebbb';
		}
		:host([icon='git-pull-request-create']):before {
			content: '\\ebbc';
		}
		:host([icon='run-above']):before {
			content: '\\ebbd';
		}
		:host([icon='run-below']):before {
			content: '\\ebbe';
		}
		:host([icon='notebook-template']):before {
			content: '\\ebbf';
		}
		:host([icon='debug-rerun']):before {
			content: '\\ebc0';
		}
		:host([icon='workspace-trusted']):before {
			content: '\\ebc1';
		}
		:host([icon='workspace-untrusted']):before {
			content: '\\ebc2';
		}
		:host([icon='workspace-unknown']):before {
			content: '\\ebc3';
		}
		:host([icon='terminal-cmd']):before {
			content: '\\ebc4';
		}
		:host([icon='terminal-debian']):before {
			content: '\\ebc5';
		}
		:host([icon='terminal-linux']):before {
			content: '\\ebc6';
		}
		:host([icon='terminal-powershell']):before {
			content: '\\ebc7';
		}
		:host([icon='terminal-tmux']):before {
			content: '\\ebc8';
		}
		:host([icon='terminal-ubuntu']):before {
			content: '\\ebc9';
		}
		:host([icon='terminal-bash']):before {
			content: '\\ebca';
		}
		:host([icon='arrow-swap']):before {
			content: '\\ebcb';
		}
		:host([icon='copy']):before {
			content: '\\ebcc';
		}
		:host([icon='person-add']):before {
			content: '\\ebcd';
		}
		:host([icon='filter-filled']):before {
			content: '\\ebce';
		}
		:host([icon='wand']):before {
			content: '\\ebcf';
		}
		:host([icon='debug-line-by-line']):before {
			content: '\\ebd0';
		}
		:host([icon='inspect']):before {
			content: '\\ebd1';
		}
		:host([icon='layers']):before {
			content: '\\ebd2';
		}
		:host([icon='layers-dot']):before {
			content: '\\ebd3';
		}
		:host([icon='layers-active']):before {
			content: '\\ebd4';
		}
		:host([icon='compass']):before {
			content: '\\ebd5';
		}
		:host([icon='compass-dot']):before {
			content: '\\ebd6';
		}
		:host([icon='compass-active']):before {
			content: '\\ebd7';
		}
		:host([icon='azure']):before {
			content: '\\ebd8';
		}
		:host([icon='issue-draft']):before {
			content: '\\ebd9';
		}
		:host([icon='git-pull-request-closed']):before {
			content: '\\ebda';
		}
		:host([icon='git-pull-request-draft']):before {
			content: '\\ebdb';
		}
		:host([icon='debug-all']):before {
			content: '\\ebdc';
		}
		:host([icon='debug-coverage']):before {
			content: '\\ebdd';
		}
		:host([icon='run-errors']):before {
			content: '\\ebde';
		}
		:host([icon='folder-library']):before {
			content: '\\ebdf';
		}
		:host([icon='debug-continue-small']):before {
			content: '\\ebe0';
		}
		:host([icon='beaker-stop']):before {
			content: '\\ebe1';
		}
		:host([icon='graph-line']):before {
			content: '\\ebe2';
		}
		:host([icon='graph-scatter']):before {
			content: '\\ebe3';
		}
		:host([icon='pie-chart']):before {
			content: '\\ebe4';
		}
		:host([icon='bracket']):before {
			content: '\\eb0f';
		}
		:host([icon='bracket-dot']):before {
			content: '\\ebe5';
		}
		:host([icon='bracket-error']):before {
			content: '\\ebe6';
		}
		:host([icon='lock-small']):before {
			content: '\\ebe7';
		}
		:host([icon='azure-devops']):before {
			content: '\\ebe8';
		}
		:host([icon='verified-filled']):before {
			content: '\\ebe9';
		}
		:host([icon='newline']):before {
			content: '\\ebea';
		}
		:host([icon='layout']):before {
			content: '\\ebeb';
		}
		:host([icon='layout-activitybar-left']):before {
			content: '\\ebec';
		}
		:host([icon='layout-activitybar-right']):before {
			content: '\\ebed';
		}
		:host([icon='layout-panel-left']):before {
			content: '\\ebee';
		}
		:host([icon='layout-panel-center']):before {
			content: '\\ebef';
		}
		:host([icon='layout-panel-justify']):before {
			content: '\\ebf0';
		}
		:host([icon='layout-panel-right']):before {
			content: '\\ebf1';
		}
		:host([icon='layout-panel']):before {
			content: '\\ebf2';
		}
		:host([icon='layout-sidebar-left']):before {
			content: '\\ebf3';
		}
		:host([icon='layout-sidebar-right']):before {
			content: '\\ebf4';
		}
		:host([icon='layout-statusbar']):before {
			content: '\\ebf5';
		}
		:host([icon='layout-menubar']):before {
			content: '\\ebf6';
		}
		:host([icon='layout-centered']):before {
			content: '\\ebf7';
		}
		:host([icon='target']):before {
			content: '\\ebf8';
		}
		:host([icon='pinned-filled']):before {
			font-family: 'glicons';
			content: '\\f11c';
			position: relative;
			left: 1px;
		}
		:host([icon='graph']):before {
			font-family: 'glicons';
			content: '\\f102';
		}

		@keyframes codicon-spin {
			100% {
				transform: rotate(360deg);
			}
		}

		:host([modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;
		}
		:host([icon='loading'][modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;

			/* custom speed & easing for loading icon */
			animation-duration: 1s !important;
			animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67) !important;
		}
	`,st([g()],ye.prototype,"icon",2),st([g()],ye.prototype,"modifier",2),ye=st([K("code-icon")],ye);const ao=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,co=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,wn=[["year",24*60*60*1e3*(365*2-1),24*60*60*1e3*365,"yr"],["month",24*60*60*1e3*365/12,24*60*60*1e3*365/12,"mo"],["week",24*60*60*1e3*7,24*60*60*1e3*7,"wk"],["day",24*60*60*1e3,24*60*60*1e3,"d"],["hour",60*60*1e3,60*60*1e3,"h"],["minute",60*1e3,60*1e3,"m"],["second",1e3,1e3,"s"]];let Z;const _e=new Map;let U,se,j;function As(s){typeof s=="string"?s==="system"?U=void 0:U=[s]:U=s??void 0,se=void 0,j=void 0,_e.clear(),Z=void 0}function Ps(s,n){const i=new Date(s.getTime());for(const[r,a]of Object.entries(n))if(!!a)switch(r){case"years":i.setFullYear(i.getFullYear()+a);break;case"months":i.setMonth(i.getMonth()+a);break;case"days":i.setDate(i.getDate()+a);break;case"hours":i.setHours(i.getHours()+a);break;case"minutes":i.setMinutes(i.getMinutes()+a);break;case"seconds":i.setSeconds(i.getSeconds()+a);break}return i}function $n(s,n){const i=(typeof s=="number"?s:s.getTime())-new Date().getTime();for(const[r,a,l,c]of wn){const d=Math.abs(i);if(d>=a||a===1e3)return n?(Z==null&&(j!=null?Z=j.resolvedOptions().locale:se!=null?Z=se.resolvedOptions().locale:(j=new Intl.RelativeTimeFormat(U,{localeMatcher:"best fit",numeric:"always",style:"narrow"}),Z=j.resolvedOptions().locale)),Z==="en"||Z?.startsWith("en-")?`${Math.round(d/l)}${c}`:(j==null&&(j=new Intl.RelativeTimeFormat(U,{localeMatcher:"best fit",numeric:"always",style:"narrow"})),j.format(Math.round(i/l),r))):(se==null&&(se=new Intl.RelativeTimeFormat(U,{localeMatcher:"best fit",numeric:"auto",style:"long"})),se.format(Math.round(i/l),r))}return""}function xn(s,n,i,r=!0){n=n??void 0;const a=`${i??""}:${n}`;let l=_e.get(a);if(l==null){const h=Cn(n);let u;i==null?u=U:i==="system"?u=void 0:u=[i],l=new Intl.DateTimeFormat(u,h),r&&_e.set(a,l)}if(n==null||co.test(n))return l.format(s);function c(h){const u=`${i??""}:time:${h}`;let b=_e.get(u);if(b==null){const f={localeMatcher:"best fit",timeStyle:h};let p;i==null?p=U:i==="system"?p=void 0:p=[i],b=new Intl.DateTimeFormat(p,f),r&&_e.set(u,b)}return b}const d=l.formatToParts(s);return n.replace(ao,(h,u,b,f,p,m,_,$,L,Ho,ue,St,Vo,G,Uo)=>{if(u!=null)return u.substring(1,u.length-1);for(const jo in Uo){const At=Uo[jo];if(At==null)continue;const ke=d.find(zo=>zo.type===jo);return At==="Do"&&ke?.type==="day"?kn(Number(ke.value)):At==="a"&&ke?.type==="dayPeriod"?` ${(c("short").formatToParts(s).find(es=>es.type==="dayPeriod")??ke)?.value??""}`:ke?.value??""}return""})}function Ts(s,n,i){const r=(typeof n=="number"?n:n.getTime())-(typeof s=="number"?s:s.getTime());switch(i){case"days":return Math.floor(r/(1e3*60*60*24));case"hours":return Math.floor(r/(1e3*60*60));case"minutes":return Math.floor(r/(1e3*60));case"seconds":return Math.floor(r/1e3);default:return r}}function Cn(s){if(s==null)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};const n=co.exec(s);if(n?.groups!=null){const{dateStyle:r,timeStyle:a}=n.groups;return{localeMatcher:"best fit",dateStyle:r||"full",timeStyle:a||void 0}}const i={localeMatcher:"best fit"};for(const{groups:r}of s.matchAll(ao))if(r!=null)for(const a in r){const l=r[a];if(l!=null)switch(a){case"year":i.year=l.length===4?"numeric":"2-digit";break;case"month":switch(l.length){case 4:i.month="long";break;case 3:i.month="short";break;case 2:i.month="2-digit";break;case 1:i.month="numeric";break}break;case"day":l==="DD"?i.day="2-digit":i.day="numeric";break;case"weekday":switch(l.length){case 4:i.weekday="long";break;case 3:i.weekday="short";break;case 2:i.weekday="narrow";break}break;case"hour":i.hour=l.length===2?"2-digit":"numeric",i.hour12=l==="hh"||l==="h";break;case"minute":i.minute=l.length===2?"2-digit":"numeric";break;case"second":i.second=l.length===2?"2-digit":"numeric";break;case"fractionalSecond":i.fractionalSecondDigits=3;break;case"dayPeriod":i.dayPeriod="narrow",i.hour12=!0,i.hourCycle="h12";break;case"timeZoneName":i.timeZoneName=l.length===2?"long":"short";break}}return i}const rt=["th","st","nd","rd"];function kn(s){const n=s%100;return`${s}${rt[(n-20)%10]??rt[n]??rt[0]}`}const Sn=()=>({toAttribute:s=>s.getTime(),fromAttribute:(s,n)=>new Date(parseInt(s,10))});var An=Object.defineProperty,Pn=Object.getOwnPropertyDescriptor,at=(s,n,i,r)=>{for(var a=r>1?void 0:r?Pn(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&An(n,i,a),a};let Ne=class extends O{constructor(){super(...arguments),this.format="MMMM Do, YYYY h:mma",this.date=new Date}render(){return H`<time datetime="${this.date}" title="${xn(this.date,this.format??"MMMM Do, YYYY h:mma")}"
			>${$n(this.date)}</time
		>`}};at([g()],Ne.prototype,"format",2),at([g({converter:Sn(),reflect:!0})],Ne.prototype,"date",2),Ne=at([K("formatted-date")],Ne);var Tn=Object.defineProperty,En=Object.getOwnPropertyDescriptor,z=(s,n,i,r)=>{for(var a=r>1?void 0:r?En(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&Tn(n,i,a),a};let D=class extends O{constructor(){super(...arguments),this.name="",this.email="",this.date="",this.avatar="https://www.gravatar.com/avatar/?s=64&d=robohash",this.dateFormat="MMMM Do, YYYY h:mma",this.committer=!1,this.actionLabel="committed"}render(){const s=this.avatar.replace("s=32","s=64");return H`
			<a class="avatar" href="${this.email?`mailto:${this.email}`:"#"}"
				><img class="thumb" lazy src="${s}" alt="${this.name}"
			/></a>
			<a class="name" href="${this.email?`mailto:${this.email}`:"#"}">${this.name}</a>
			<span class="date"
				>${this.actionLabel} <formatted-date date=${this.date} format="${this.dateFormat}"></formatted-date
			></span>
		`}};D.styles=X`
		:host {
			display: grid;
			gap: 0rem 1rem;
			justify-content: start;
		}
		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}
		.avatar {
			grid-column: 1;
			grid-row: 1 / 3;
			width: 36px;
		}
		.thumb {
			width: 100%;
			height: auto;
			border-radius: 0.4rem;
		}
		.name {
			grid-column: 2;
			grid-row: 1;
			font-size: 1.5rem;
		}
		.date {
			grid-column: 2;
			grid-row: 2;
			font-size: 1.3rem;
		}
	`,z([g()],D.prototype,"name",2),z([g()],D.prototype,"email",2),z([g()],D.prototype,"date",2),z([g()],D.prototype,"avatar",2),z([g()],D.prototype,"dateFormat",2),z([g({type:Boolean,reflect:!0})],D.prototype,"committer",2),z([g()],D.prototype,"actionLabel",2),D=z([K("commit-identity")],D);var Bn=Object.defineProperty,On=Object.getOwnPropertyDescriptor,re=(s,n,i,r)=>{for(var a=r>1?void 0:r?On(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&Bn(n,i,a),a};let q=class extends O{constructor(){super(...arguments),this.url="",this.name="",this.date="",this.status="merged",this.key="#1999"}render(){const s=this.status.toLowerCase()==="merged"?"git-merge":this.status.toLowerCase()==="closed"?"pass":"issues";return H`
			<span class="icon"><code-icon icon=${s}></code-icon></span>
			<p class="title">
				<a href="${this.url}">${this.name}</a>
			</p>
			<p class="date">
				${this.key} ${this.status}
				<formatted-date date="${this.date}"></formatted-date>
			</p>
		`}};q.styles=X`
		:host {
			display: grid;
			gap: 0.25rem 0.6rem;
			justify-content: start;
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.icon {
			grid-column: 1;
			grid-row: 1 / 3;
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
			text-align: center;
			padding-top: 0.1rem;
		}

		.title {
			grid-column: 2;
			grid-row: 1;
			margin: 0;
			font-size: 1.4rem;
		}

		.date {
			grid-column: 2;
			grid-row: 2;
			margin: 0;
			font-size: 1.3rem;
		}
	`,re([g()],q.prototype,"url",2),re([g()],q.prototype,"name",2),re([g()],q.prototype,"date",2),re([g()],q.prototype,"status",2),re([g()],q.prototype,"key",2),q=re([K("issue-pull-request")],q);var Nn=Object.defineProperty,Mn=Object.getOwnPropertyDescriptor,lo=(s,n,i,r)=>{for(var a=r>1?void 0:r?Mn(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&Nn(n,i,a),a};let Me=class extends O{constructor(){super(...arguments),this.lines=1}render(){const s=`--skeleton-lines: ${this.lines};`;return H`<div class="skeleton" style=${s}></div>`}};Me.styles=X`
		:host {
			--skeleton-line-height: 1.2;
			--skeleton-lines: 1;
		}

		.skeleton {
			position: relative;
			display: block;
			overflow: hidden;
			border-radius: 0.25em;
			width: 100%;
			height: calc(1em * var(--skeleton-line-height, 1.2) * var(--skeleton-lines, 1));
			background-color: var(--color-background--lighten-15);
		}

		.skeleton::before {
			content: '';
			position: absolute;
			display: block;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-image: linear-gradient(
				to right,
				transparent 0%,
				var(--color-background--lighten-15) 20%,
				var(--color-background--lighten-30) 60%,
				transparent 100%
			);
			transform: translateX(-100%);
			animation: skeleton-loader 2s ease-in-out infinite;
		}

		@keyframes skeleton-loader {
			100% {
				transform: translateX(100%);
			}
		}
	`,lo([g({type:Number})],Me.prototype,"lines",2),Me=lo([K("skeleton-loader")],Me);var Dn=Object.defineProperty,In=Object.getOwnPropertyDescriptor,De=(s,n,i,r)=>{for(var a=r>1?void 0:r?In(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&Dn(n,i,a),a};let ae=class extends O{constructor(){super(...arguments),this.added=0,this.modified=0,this.removed=0}render(){return H`
			<span class="stat added" title="${this.added} added" aria-label="${this.added} added"
				><span class="label">+${this.added}</span></span
			>
			<span class="stat modified" title="${this.modified} modified" aria-label="${this.modified} modified"
				><span class="label">~${this.modified}</span></span
			>
			<span class="stat deleted" title="${this.removed} removed" aria-label="${this.removed} removed"
				><span class="label">-${this.removed}</span></span
			>
		`}};ae.styles=X`
        :host {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: 1rem;
        }

        .stat {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
        }

        .stat code-icon {
            margin-right: 0.25rem;
        }

        .added {
            color: var(--vscode-gitDecoration-addedResourceForeground);
        }
        .modified {
            color: var(--vscode-gitDecoration-modifiedResourceForeground);
        }
        .deleted {
            color: var(--vscode-gitDecoration-deletedResourceForeground);
        }

        .label {
            flex-basis: 100%;
            text-align: center;
        }
    }
    `,De([g({type:Number})],ae.prototype,"added",2),De([g({type:Number})],ae.prototype,"modified",2),De([g({type:Number})],ae.prototype,"removed",2),ae=De([K("commit-stats")],ae);const W=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();W.trustedTypes===void 0&&(W.trustedTypes={createPolicy:(s,n)=>n});const ho={configurable:!1,enumerable:!1,writable:!1};W.FAST===void 0&&Reflect.defineProperty(W,"FAST",Object.assign({value:Object.create(null)},ho));const we=W.FAST;if(we.getById===void 0){const s=Object.create(null);Reflect.defineProperty(we,"getById",Object.assign({value(n,i){let r=s[n];return r===void 0&&(r=i?s[n]=i():null),r}},ho))}const ct=Object.freeze([]),lt=W.FAST.getById(1,()=>{const s=[],n=[];function i(){if(n.length)throw n.shift()}function r(c){try{c.call()}catch(d){n.push(d),setTimeout(i,0)}}function a(){let d=0;for(;d<s.length;)if(r(s[d]),d++,d>1024){for(let h=0,u=s.length-d;h<u;h++)s[h]=s[h+d];s.length-=d,d=0}s.length=0}function l(c){s.length<1&&W.requestAnimationFrame(a),s.push(c)}return Object.freeze({enqueue:l,process:a})}),uo=W.trustedTypes.createPolicy("fast-html",{createHTML:s=>s});let ht=uo;const $e=`fast-${Math.random().toString(36).substring(2,8)}`,fo=`${$e}{`,dt=`}${$e}`,w=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(s){if(ht!==uo)throw new Error("The HTML policy can only be set once.");ht=s},createHTML(s){return ht.createHTML(s)},isMarker(s){return s&&s.nodeType===8&&s.data.startsWith($e)},extractDirectiveIndexFromMarker(s){return parseInt(s.data.replace(`${$e}:`,""))},createInterpolationPlaceholder(s){return`${fo}${s}${dt}`},createCustomAttributePlaceholder(s,n){return`${s}="${this.createInterpolationPlaceholder(n)}"`},createBlockPlaceholder(s){return`<!--${$e}:${s}-->`},queueUpdate:lt.enqueue,processUpdates:lt.process,nextUpdate(){return new Promise(lt.enqueue)},setAttribute(s,n,i){i==null?s.removeAttribute(n):s.setAttribute(n,i)},setBooleanAttribute(s,n,i){i?s.setAttribute(n,""):s.removeAttribute(n)},removeChildNodes(s){for(let n=s.firstChild;n!==null;n=s.firstChild)s.removeChild(n)},createTemplateWalker(s){return document.createTreeWalker(s,133,null,!1)}});class Ie{constructor(n,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=n,this.sub1=i}has(n){return this.spillover===void 0?this.sub1===n||this.sub2===n:this.spillover.indexOf(n)!==-1}subscribe(n){const i=this.spillover;if(i===void 0){if(this.has(n))return;if(this.sub1===void 0){this.sub1=n;return}if(this.sub2===void 0){this.sub2=n;return}this.spillover=[this.sub1,this.sub2,n],this.sub1=void 0,this.sub2=void 0}else i.indexOf(n)===-1&&i.push(n)}unsubscribe(n){const i=this.spillover;if(i===void 0)this.sub1===n?this.sub1=void 0:this.sub2===n&&(this.sub2=void 0);else{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}notify(n){const i=this.spillover,r=this.source;if(i===void 0){const a=this.sub1,l=this.sub2;a!==void 0&&a.handleChange(r,n),l!==void 0&&l.handleChange(r,n)}else for(let a=0,l=i.length;a<l;++a)i[a].handleChange(r,n)}}class bo{constructor(n){this.subscribers={},this.sourceSubscribers=null,this.source=n}notify(n){var i;const r=this.subscribers[n];r!==void 0&&r.notify(n),(i=this.sourceSubscribers)===null||i===void 0||i.notify(n)}subscribe(n,i){var r;if(i){let a=this.subscribers[i];a===void 0&&(this.subscribers[i]=a=new Ie(this.source)),a.subscribe(n)}else this.sourceSubscribers=(r=this.sourceSubscribers)!==null&&r!==void 0?r:new Ie(this.source),this.sourceSubscribers.subscribe(n)}unsubscribe(n,i){var r;if(i){const a=this.subscribers[i];a!==void 0&&a.unsubscribe(n)}else(r=this.sourceSubscribers)===null||r===void 0||r.unsubscribe(n)}}const k=we.getById(2,()=>{const s=/(:|&&|\|\||if)/,n=new WeakMap,i=new WeakMap,r=w.queueUpdate;let a,l=b=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function c(b){let f=b.$fastController||n.get(b);return f===void 0&&(Array.isArray(b)?f=l(b):n.set(b,f=new bo(b))),f}function d(b){let f=i.get(b);if(f===void 0){let p=Reflect.getPrototypeOf(b);for(;f===void 0&&p!==null;)f=i.get(p),p=Reflect.getPrototypeOf(p);f===void 0?f=[]:f=f.slice(0),i.set(b,f)}return f}class h{constructor(f){this.name=f,this.field=`_${f}`,this.callback=`${f}Changed`}getValue(f){return a!==void 0&&a.watch(f,this.name),f[this.field]}setValue(f,p){const m=this.field,_=f[m];if(_!==p){f[m]=p;const $=f[this.callback];typeof $=="function"&&$.call(f,_,p),c(f).notify(this.name)}}}class u extends Ie{constructor(f,p,m=!1){super(f,p),this.binding=f,this.isVolatileBinding=m,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(f,p){this.needsRefresh&&this.last!==null&&this.disconnect();const m=a;a=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const _=this.binding(f,p);return a=m,_}disconnect(){if(this.last!==null){let f=this.first;for(;f!==void 0;)f.notifier.unsubscribe(this,f.propertyName),f=f.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(f,p){const m=this.last,_=c(f),$=m===null?this.first:{};if($.propertySource=f,$.propertyName=p,$.notifier=_,_.subscribe(this,p),m!==null){if(!this.needsRefresh){let L;a=void 0,L=m.propertySource[m.propertyName],a=this,f===L&&(this.needsRefresh=!0)}m.next=$}this.last=$}handleChange(){this.needsQueue&&(this.needsQueue=!1,r(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let f=this.first;return{next:()=>{const p=f;return p===void 0?{value:void 0,done:!0}:(f=f.next,{value:p,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(b){l=b},getNotifier:c,track(b,f){a!==void 0&&a.watch(b,f)},trackVolatile(){a!==void 0&&(a.needsRefresh=!0)},notify(b,f){c(b).notify(f)},defineProperty(b,f){typeof f=="string"&&(f=new h(f)),d(b).push(f),Reflect.defineProperty(b,f.name,{enumerable:!0,get:function(){return f.getValue(this)},set:function(p){f.setValue(this,p)}})},getAccessors:d,binding(b,f,p=this.isVolatileBinding(b)){return new u(b,f,p)},isVolatileBinding(b){return s.test(b.toString())}})});function po(s,n){k.defineProperty(s,n)}function Fe(s,n,i){return Object.assign({},i,{get:function(){return k.trackVolatile(),i.get.apply(this)}})}const mo=we.getById(3,()=>{let s=null;return{get(){return s},set(n){s=n}}});class xe{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return mo.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(n){mo.set(n)}}k.defineProperty(xe.prototype,"index"),k.defineProperty(xe.prototype,"length");const Le=Object.seal(new xe);class Re{constructor(){this.targetIndex=0}}class go extends Re{constructor(){super(...arguments),this.createPlaceholder=w.createInterpolationPlaceholder}}class vo extends Re{constructor(n,i,r){super(),this.name=n,this.behavior=i,this.options=r}createPlaceholder(n){return w.createCustomAttributePlaceholder(this.name,n)}createBehavior(n){return new this.behavior(n,this.options)}}function Fn(s,n){this.source=s,this.context=n,this.bindingObserver===null&&(this.bindingObserver=k.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(s,n))}function Ln(s,n){this.source=s,this.context=n,this.target.addEventListener(this.targetName,this)}function Rn(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Hn(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const s=this.target.$fastView;s!==void 0&&s.isComposed&&(s.unbind(),s.needsBindOnly=!0)}function Vn(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function Un(s){w.setAttribute(this.target,this.targetName,s)}function jn(s){w.setBooleanAttribute(this.target,this.targetName,s)}function zn(s){if(s==null&&(s=""),s.create){this.target.textContent="";let n=this.target.$fastView;n===void 0?n=s.create():this.target.$fastTemplate!==s&&(n.isComposed&&(n.remove(),n.unbind()),n=s.create()),n.isComposed?n.needsBindOnly&&(n.needsBindOnly=!1,n.bind(this.source,this.context)):(n.isComposed=!0,n.bind(this.source,this.context),n.insertBefore(this.target),this.target.$fastView=n,this.target.$fastTemplate=s)}else{const n=this.target.$fastView;n!==void 0&&n.isComposed&&(n.isComposed=!1,n.remove(),n.needsBindOnly?n.needsBindOnly=!1:n.unbind()),this.target.textContent=s}}function qn(s){this.target[this.targetName]=s}function Wn(s){const n=this.classVersions||Object.create(null),i=this.target;let r=this.version||0;if(s!=null&&s.length){const a=s.split(/\s+/);for(let l=0,c=a.length;l<c;++l){const d=a[l];d!==""&&(n[d]=r,i.classList.add(d))}}if(this.classVersions=n,this.version=r+1,r!==0){r-=1;for(const a in n)n[a]===r&&i.classList.remove(a)}}class ut extends go{constructor(n){super(),this.binding=n,this.bind=Fn,this.unbind=Rn,this.updateTarget=Un,this.isBindingVolatile=k.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(n){if(this.originalTargetName=n,n!==void 0)switch(n[0]){case":":if(this.cleanedTargetName=n.substr(1),this.updateTarget=qn,this.cleanedTargetName==="innerHTML"){const i=this.binding;this.binding=(r,a)=>w.createHTML(i(r,a))}break;case"?":this.cleanedTargetName=n.substr(1),this.updateTarget=jn;break;case"@":this.cleanedTargetName=n.substr(1),this.bind=Ln,this.unbind=Vn;break;default:this.cleanedTargetName=n,n==="class"&&(this.updateTarget=Wn);break}}targetAtContent(){this.updateTarget=zn,this.unbind=Hn}createBehavior(n){return new Yn(n,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class Yn{constructor(n,i,r,a,l,c,d){this.source=null,this.context=null,this.bindingObserver=null,this.target=n,this.binding=i,this.isBindingVolatile=r,this.bind=a,this.unbind=l,this.updateTarget=c,this.targetName=d}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(n){xe.setEvent(n);const i=this.binding(this.source,this.context);xe.setEvent(null),i!==!0&&n.preventDefault()}}let ft=null;class bt{addFactory(n){n.targetIndex=this.targetIndex,this.behaviorFactories.push(n)}captureContentBinding(n){n.targetAtContent(),this.addFactory(n)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){ft=this}static borrow(n){const i=ft||new bt;return i.directives=n,i.reset(),ft=null,i}}function Qn(s){if(s.length===1)return s[0];let n;const i=s.length,r=s.map(c=>typeof c=="string"?()=>c:(n=c.targetName||n,c.binding)),a=(c,d)=>{let h="";for(let u=0;u<i;++u)h+=r[u](c,d);return h},l=new ut(a);return l.targetName=n,l}const Kn=dt.length;function yo(s,n){const i=n.split(fo);if(i.length===1)return null;const r=[];for(let a=0,l=i.length;a<l;++a){const c=i[a],d=c.indexOf(dt);let h;if(d===-1)h=c;else{const u=parseInt(c.substring(0,d));r.push(s.directives[u]),h=c.substring(d+Kn)}h!==""&&r.push(h)}return r}function _o(s,n,i=!1){const r=n.attributes;for(let a=0,l=r.length;a<l;++a){const c=r[a],d=c.value,h=yo(s,d);let u=null;h===null?i&&(u=new ut(()=>d),u.targetName=c.name):u=Qn(h),u!==null&&(n.removeAttributeNode(c),a--,l--,s.addFactory(u))}}function Zn(s,n,i){const r=yo(s,n.textContent);if(r!==null){let a=n;for(let l=0,c=r.length;l<c;++l){const d=r[l],h=l===0?n:a.parentNode.insertBefore(document.createTextNode(""),a.nextSibling);typeof d=="string"?h.textContent=d:(h.textContent=" ",s.captureContentBinding(d)),a=h,s.targetIndex++,h!==n&&i.nextNode()}s.targetIndex--}}function Gn(s,n){const i=s.content;document.adoptNode(i);const r=bt.borrow(n);_o(r,s,!0);const a=r.behaviorFactories;r.reset();const l=w.createTemplateWalker(i);let c;for(;c=l.nextNode();)switch(r.targetIndex++,c.nodeType){case 1:_o(r,c);break;case 3:Zn(r,c,l);break;case 8:w.isMarker(c)&&r.addFactory(n[w.extractDirectiveIndexFromMarker(c)])}let d=0;(w.isMarker(i.firstChild)||i.childNodes.length===1&&n.length)&&(i.insertBefore(document.createComment(""),i.firstChild),d=-1);const h=r.behaviorFactories;return r.release(),{fragment:i,viewBehaviorFactories:h,hostBehaviorFactories:a,targetOffset:d}}const pt=document.createRange();class wo{constructor(n,i){this.fragment=n,this.behaviors=i,this.source=null,this.context=null,this.firstChild=n.firstChild,this.lastChild=n.lastChild}appendTo(n){n.appendChild(this.fragment)}insertBefore(n){if(this.fragment.hasChildNodes())n.parentNode.insertBefore(this.fragment,n);else{const i=n.parentNode,r=this.lastChild;let a=this.firstChild,l;for(;a!==r;)l=a.nextSibling,i.insertBefore(a,n),a=l;i.insertBefore(r,n)}}remove(){const n=this.fragment,i=this.lastChild;let r=this.firstChild,a;for(;r!==i;)a=r.nextSibling,n.appendChild(r),r=a;n.appendChild(i)}dispose(){const n=this.firstChild.parentNode,i=this.lastChild;let r=this.firstChild,a;for(;r!==i;)a=r.nextSibling,n.removeChild(r),r=a;n.removeChild(i);const l=this.behaviors,c=this.source;for(let d=0,h=l.length;d<h;++d)l[d].unbind(c)}bind(n,i){const r=this.behaviors;if(this.source!==n)if(this.source!==null){const a=this.source;this.source=n,this.context=i;for(let l=0,c=r.length;l<c;++l){const d=r[l];d.unbind(a),d.bind(n,i)}}else{this.source=n,this.context=i;for(let a=0,l=r.length;a<l;++a)r[a].bind(n,i)}}unbind(){if(this.source===null)return;const n=this.behaviors,i=this.source;for(let r=0,a=n.length;r<a;++r)n[r].unbind(i);this.source=null}static disposeContiguousBatch(n){if(n.length!==0){pt.setStartBefore(n[0].firstChild),pt.setEndAfter(n[n.length-1].lastChild),pt.deleteContents();for(let i=0,r=n.length;i<r;++i){const a=n[i],l=a.behaviors,c=a.source;for(let d=0,h=l.length;d<h;++d)l[d].unbind(c)}}}}class $o{constructor(n,i){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=n,this.directives=i}create(n){if(this.fragment===null){let u;const b=this.html;if(typeof b=="string"){u=document.createElement("template"),u.innerHTML=w.createHTML(b);const p=u.content.firstElementChild;p!==null&&p.tagName==="TEMPLATE"&&(u=p)}else u=b;const f=Gn(u,this.directives);this.fragment=f.fragment,this.viewBehaviorFactories=f.viewBehaviorFactories,this.hostBehaviorFactories=f.hostBehaviorFactories,this.targetOffset=f.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const i=this.fragment.cloneNode(!0),r=this.viewBehaviorFactories,a=new Array(this.behaviorCount),l=w.createTemplateWalker(i);let c=0,d=this.targetOffset,h=l.nextNode();for(let u=r.length;c<u;++c){const b=r[c],f=b.targetIndex;for(;h!==null;)if(d===f){a[c]=b.createBehavior(h);break}else h=l.nextNode(),d++}if(this.hasHostBehaviors){const u=this.hostBehaviorFactories;for(let b=0,f=u.length;b<f;++b,++c)a[c]=u[b].createBehavior(n)}return new wo(i,a)}render(n,i,r){typeof i=="string"&&(i=document.getElementById(i)),r===void 0&&(r=i);const a=this.create(r);return a.bind(n,Le),a.appendTo(i),a}}const Xn=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function N(s,...n){const i=[];let r="";for(let a=0,l=s.length-1;a<l;++a){const c=s[a];let d=n[a];if(r+=c,d instanceof $o){const h=d;d=()=>h}if(typeof d=="function"&&(d=new ut(d)),d instanceof go){const h=Xn.exec(c);h!==null&&(d.targetName=h[2])}d instanceof Re?(r+=d.createPlaceholder(i.length),i.push(d)):r+=d}return r+=s[s.length-1],new $o(r,i)}function Es(s){return s?function(n,i,r){return n.nodeType===1&&n.matches(s)}:function(n,i,r){return n.nodeType===1}}class Jn{constructor(n,i){this.target=n,this.options=i,this.source=null}bind(n){const i=this.options.property;this.shouldUpdate=k.getAccessors(n).some(r=>r.name===i),this.source=n,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(ct),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let n=this.getNodes();return this.options.filter!==void 0&&(n=n.filter(this.options.filter)),n}updateTarget(n){this.source[this.options.property]=n}}class ei extends Jn{constructor(n,i){super(n,i)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function xo(s){return typeof s=="string"&&(s={property:s}),new vo("fast-slotted",ei,s)}class ti{createCSS(){return""}createBehavior(){}}class I{constructor(){this.targets=new WeakSet}addStylesTo(n){this.targets.add(n)}removeStylesFrom(n){this.targets.delete(n)}isAttachedTo(n){return this.targets.has(n)}withBehaviors(...n){return this.behaviors=this.behaviors===null?n:this.behaviors.concat(n),this}}I.create=(()=>{if(w.supportsAdoptedStyleSheets){const s=new Map;return n=>new oi(n,s)}return s=>new si(s)})();function mt(s){return s.map(n=>n instanceof I?mt(n.styles):[n]).reduce((n,i)=>n.concat(i),[])}function Co(s){return s.map(n=>n instanceof I?n.behaviors:null).reduce((n,i)=>i===null?n:(n===null&&(n=[]),n.concat(i)),null)}class oi extends I{constructor(n,i){super(),this.styles=n,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=Co(n)}get styleSheets(){if(this._styleSheets===void 0){const n=this.styles,i=this.styleSheetCache;this._styleSheets=mt(n).map(r=>{if(r instanceof CSSStyleSheet)return r;let a=i.get(r);return a===void 0&&(a=new CSSStyleSheet,a.replaceSync(r),i.set(r,a)),a})}return this._styleSheets}addStylesTo(n){n.adoptedStyleSheets=[...n.adoptedStyleSheets,...this.styleSheets],super.addStylesTo(n)}removeStylesFrom(n){const i=this.styleSheets;n.adoptedStyleSheets=n.adoptedStyleSheets.filter(r=>i.indexOf(r)===-1),super.removeStylesFrom(n)}}let ni=0;function ii(){return`fast-style-class-${++ni}`}class si extends I{constructor(n){super(),this.styles=n,this.behaviors=null,this.behaviors=Co(n),this.styleSheets=mt(n),this.styleClass=ii()}addStylesTo(n){const i=this.styleSheets,r=this.styleClass;n=this.normalizeTarget(n);for(let a=0;a<i.length;a++){const l=document.createElement("style");l.innerHTML=i[a],l.className=r,n.append(l)}super.addStylesTo(n)}removeStylesFrom(n){n=this.normalizeTarget(n);const i=n.querySelectorAll(`.${this.styleClass}`);for(let r=0,a=i.length;r<a;++r)n.removeChild(i[r]);super.removeStylesFrom(n)}isAttachedTo(n){return super.isAttachedTo(this.normalizeTarget(n))}normalizeTarget(n){return n===document?document.body:n}}function ko(s,n){const i=[];let r="";const a=[];for(let l=0,c=s.length-1;l<c;++l){r+=s[l];let d=n[l];if(d instanceof ti){const h=d.createBehavior();d=d.createCSS(),h&&a.push(h)}d instanceof I||d instanceof CSSStyleSheet?(r.trim()!==""&&(i.push(r),r=""),i.push(d)):r+=d}return r+=s[s.length-1],r.trim()!==""&&i.push(r),{styles:i,behaviors:a}}function ce(s,...n){const{styles:i,behaviors:r}=ko(s,n),a=I.create(i);return r.length&&a.withBehaviors(...r),a}class ri extends null{constructor(n,i){super(),this.behaviors=i,this.css="";const r=n.reduce((a,l)=>(typeof l=="string"?this.css+=l:a.push(l),a),[]);r.length&&(this.styles=ElementStyles.create(r))}createBehavior(){return this}createCSS(){return this.css}bind(n){this.styles&&n.$fastController.addStyles(this.styles),this.behaviors.length&&n.$fastController.addBehaviors(this.behaviors)}unbind(n){this.styles&&n.$fastController.removeStyles(this.styles),this.behaviors.length&&n.$fastController.removeBehaviors(this.behaviors)}}function Bs(s,...n){const{styles:i,behaviors:r}=ko(s,n);return new ri(i,r)}const ai={toView(s){return s?"true":"false"},fromView(s){return!(s==null||s==="false"||s===!1||s===0)}},Os={toView(s){if(s==null)return null;const n=s*1;return isNaN(n)?null:n.toString()},fromView(s){if(s==null)return null;const n=s*1;return isNaN(n)?null:n}};class He{constructor(n,i,r=i.toLowerCase(),a="reflect",l){this.guards=new Set,this.Owner=n,this.name=i,this.attribute=r,this.mode=a,this.converter=l,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in n.prototype,a==="boolean"&&l===void 0&&(this.converter=ai)}setValue(n,i){const r=n[this.fieldName],a=this.converter;a!==void 0&&(i=a.fromView(i)),r!==i&&(n[this.fieldName]=i,this.tryReflectToAttribute(n),this.hasCallback&&n[this.callbackName](r,i),n.$fastController.notify(this.name))}getValue(n){return k.track(n,this.name),n[this.fieldName]}onAttributeChangedCallback(n,i){this.guards.has(n)||(this.guards.add(n),this.setValue(n,i),this.guards.delete(n))}tryReflectToAttribute(n){const i=this.mode,r=this.guards;r.has(n)||i==="fromView"||w.queueUpdate(()=>{r.add(n);const a=n[this.fieldName];switch(i){case"reflect":const l=this.converter;w.setAttribute(n,this.attribute,l!==void 0?l.toView(a):a);break;case"boolean":w.setBooleanAttribute(n,this.attribute,a);break}r.delete(n)})}static collect(n,...i){const r=[];i.push(n.attributes);for(let a=0,l=i.length;a<l;++a){const c=i[a];if(c!==void 0)for(let d=0,h=c.length;d<h;++d){const u=c[d];typeof u=="string"?r.push(new He(n,u)):r.push(new He(n,u.property,u.attribute,u.mode,u.converter))}}return r}}function y(s,n){let i;function r(a,l){arguments.length>1&&(i.property=l),(a.constructor.attributes||(a.constructor.attributes=[])).push(i)}if(arguments.length>1){i={},r(s,n);return}return i=s===void 0?{}:s,r}const So={mode:"open"},Ao={},gt=we.getById(4,()=>{const s=new Map;return Object.freeze({register(n){return s.has(n.type)?!1:(s.set(n.type,n),!0)},getByType(n){return s.get(n)}})});class Ve{constructor(n,i=n.definition){typeof i=="string"&&(i={name:i}),this.type=n,this.name=i.name,this.template=i.template;const r=He.collect(n,i.attributes),a=new Array(r.length),l={},c={};for(let d=0,h=r.length;d<h;++d){const u=r[d];a[d]=u.attribute,l[u.name]=u,c[u.attribute]=u}this.attributes=r,this.observedAttributes=a,this.propertyLookup=l,this.attributeLookup=c,this.shadowOptions=i.shadowOptions===void 0?So:i.shadowOptions===null?void 0:Object.assign(Object.assign({},So),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?Ao:Object.assign(Object.assign({},Ao),i.elementOptions),this.styles=i.styles===void 0?void 0:Array.isArray(i.styles)?I.create(i.styles):i.styles instanceof I?i.styles:I.create([i.styles])}get isDefined(){return!!gt.getByType(this.type)}define(n=customElements){const i=this.type;if(gt.register(this)){const r=this.attributes,a=i.prototype;for(let l=0,c=r.length;l<c;++l)k.defineProperty(a,r[l]);Reflect.defineProperty(i,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return n.get(this.name)||n.define(this.name,i,this.elementOptions),this}}Ve.forType=gt.getByType;const Po=new WeakMap,ci={bubbles:!0,composed:!0,cancelable:!0};function vt(s){return s.shadowRoot||Po.get(s)||null}class yt extends bo{constructor(n,i){super(n),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=n,this.definition=i;const r=i.shadowOptions;if(r!==void 0){const l=n.attachShadow(r);r.mode==="closed"&&Po.set(n,l)}const a=k.getAccessors(n);if(a.length>0){const l=this.boundObservables=Object.create(null);for(let c=0,d=a.length;c<d;++c){const h=a[c].name,u=n[h];u!==void 0&&(delete n[h],l[h]=u)}}}get isConnected(){return k.track(this,"isConnected"),this._isConnected}setIsConnected(n){this._isConnected=n,k.notify(this,"isConnected")}get template(){return this._template}set template(n){this._template!==n&&(this._template=n,this.needsInitialization||this.renderTemplate(n))}get styles(){return this._styles}set styles(n){this._styles!==n&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=n,!this.needsInitialization&&n!==null&&this.addStyles(n))}addStyles(n){const i=vt(this.element)||this.element.getRootNode();if(n instanceof HTMLStyleElement)i.append(n);else if(!n.isAttachedTo(i)){const r=n.behaviors;n.addStylesTo(i),r!==null&&this.addBehaviors(r)}}removeStyles(n){const i=vt(this.element)||this.element.getRootNode();if(n instanceof HTMLStyleElement)i.removeChild(n);else if(n.isAttachedTo(i)){const r=n.behaviors;n.removeStylesFrom(i),r!==null&&this.removeBehaviors(r)}}addBehaviors(n){const i=this.behaviors||(this.behaviors=new Map),r=n.length,a=[];for(let l=0;l<r;++l){const c=n[l];i.has(c)?i.set(c,i.get(c)+1):(i.set(c,1),a.push(c))}if(this._isConnected){const l=this.element;for(let c=0;c<a.length;++c)a[c].bind(l,Le)}}removeBehaviors(n,i=!1){const r=this.behaviors;if(r===null)return;const a=n.length,l=[];for(let c=0;c<a;++c){const d=n[c];if(r.has(d)){const h=r.get(d)-1;h===0||i?r.delete(d)&&l.push(d):r.set(d,h)}}if(this._isConnected){const c=this.element;for(let d=0;d<l.length;++d)l[d].unbind(c)}}onConnectedCallback(){if(this._isConnected)return;const n=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(n,Le);const i=this.behaviors;if(i!==null)for(const[r]of i)r.bind(n,Le);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const n=this.view;n!==null&&n.unbind();const i=this.behaviors;if(i!==null){const r=this.element;for(const[a]of i)a.unbind(r)}}onAttributeChangedCallback(n,i,r){const a=this.definition.attributeLookup[n];a!==void 0&&a.onAttributeChangedCallback(this.element,r)}emit(n,i,r){return this._isConnected?this.element.dispatchEvent(new CustomEvent(n,Object.assign(Object.assign({detail:i},ci),r))):!1}finishInitialization(){const n=this.element,i=this.boundObservables;if(i!==null){const a=Object.keys(i);for(let l=0,c=a.length;l<c;++l){const d=a[l];n[d]=i[d]}this.boundObservables=null}const r=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():r.template&&(this._template=r.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():r.styles&&(this._styles=r.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(n){const i=this.element,r=vt(i)||i;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||w.removeChildNodes(r),n&&(this.view=n.render(i,r,i))}static forCustomElement(n){const i=n.$fastController;if(i!==void 0)return i;const r=Ve.forType(n.constructor);if(r===void 0)throw new Error("Missing FASTElement definition.");return n.$fastController=new yt(n,r)}}function To(s){return class extends s{constructor(){super(),yt.forCustomElement(this)}$emit(n,i,r){return this.$fastController.emit(n,i,r)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(n,i,r){this.$fastController.onAttributeChangedCallback(n,i,r)}}}const le=Object.assign(To(HTMLElement),{from(s){return To(s)},define(s,n){return new Ve(s,n).define().type}});function he(s){return function(n){new Ve(n,s).define()}}var li=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,Eo=(s,n,i,r)=>{for(var a=r>1?void 0:r?hi(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&li(n,i,a),a};const di=N`<template role="navigation"><slot ${xo("actionNodes")}></slot></template>`,ui=ce`
	:host {
		display: flex;
		align-items: center;
		user-select: none;
	}
`;let _t=class extends le{actionNodesChanged(s,n){if(this.actionNodesDisposer?.(),!n?.length)return;const i=this.handleKeydown.bind(this),r=n?.filter(a=>a.nodeType===1).map((a,l)=>(a.setAttribute("tabindex",l===0?"0":"-1"),a.addEventListener("keydown",i,!1),{dispose:()=>{a?.removeEventListener("keydown",i,!1)}}));this.actionNodesDisposer=()=>{r?.forEach(({dispose:a})=>a())}}disconnectedCallback(){this.actionNodesDisposer?.()}handleKeydown(s){if(!s.target||this.actionNodes==null||this.actionNodes.length<2)return;const n=s.target;let i=null;if(s.key==="ArrowLeft"){if(i=n.previousElementSibling,i==null){const r=this.actionNodes.filter(a=>a.nodeType===1);i=r[r.length-1]??null}}else s.key==="ArrowRight"&&(i=n.nextElementSibling,i==null&&(i=this.actionNodes.find(r=>r.nodeType===1)??null));i==null||i===n||(n.setAttribute("tabindex","-1"),i.setAttribute("tabindex","0"),i.focus())}};Eo([po],_t.prototype,"actionNodes",2),_t=Eo([he({name:"action-nav",template:di,styles:ui})],_t);var fi=Object.defineProperty,bi=Object.getOwnPropertyDescriptor,Ue=(s,n,i,r)=>{for(var a=r>1?void 0:r?bi(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&fi(n,i,a),a};let de=class extends O{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1,this.loading=!1}renderTitle(){return this.collapsable?H`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:H`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return H`
			<header class="header">
				${this.renderTitle()}
				<slot name="actions"></slot>
				<progress-indicator active="${this.loading}"></progress-indicator>
			</header>
			<div id="content" role="region" class="content">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};de.styles=X`
		:host {
			display: flex;
			flex-direction: column;
			background-color: var(--vscode-sideBar-background);
		}

		* {
			box-sizing: border-box;
		}

		.header {
			flex: none;
			display: flex;
			background-color: var(--vscode-sideBarSectionHeader-background);
			color: var(--vscode-sideBarSectionHeader-foreground);
			border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
			position: relative;
		}

		.header:focus-within {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: -1px;
		}

		.label {
			appearance: none;
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			padding: 0;
			border: none;
			text-align: left;
			font-family: var(--font-family);
			font-size: 1.1rem;
			line-height: 2.2rem;
			height: 2.2rem;
			background: transparent;
			color: inherit;
			cursor: pointer;
			outline: none;
			text-overflow: ellipsis;
		}

		.title {
			font-weight: bold;
			text-transform: uppercase;
		}

		.subtitle {
			margin-left: 1rem;
			opacity: 0.6;
		}

		.icon {
			font-weight: normal;
			margin: 0 0.2rem;
		}

		.content {
			overflow: auto;
			/*
			scrollbar-gutter: stable;
			box-shadow: #000000 0 0.6rem 0.6rem -0.6rem inset;
			*/
			padding-top: 0.6rem;
		}

		:host([collapsable]:not([expanded])) .content,
		:host([collapsable][expanded='false']) .content {
			display: none;
		}

		slot[name='actions']::slotted(*) {
			flex: none;
			margin-left: auto;
		}
	`,Ue([g({type:Boolean,reflect:!0})],de.prototype,"collapsable",2),Ue([g({type:Boolean,reflect:!0})],de.prototype,"expanded",2),Ue([g({type:Boolean,reflect:!0})],de.prototype,"loading",2),de=Ue([K("webview-pane")],de);var pi=Object.defineProperty,mi=Object.getOwnPropertyDescriptor,wt=(s,n,i,r)=>{for(var a=r>1?void 0:r?mi(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&pi(n,i,a),a};const gi=N`
	<template class="${s=>s.mode}${s=>s.active?" active":""}" role="progressbar">
		<div class="progress-bar"></div>
	</template>
`,vi=ce`
	* {
		box-sizing: border-box;
	}

	:host {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 5;
		height: 2px;
		width: 100%;
		overflow: hidden;
	}

	.progress-bar {
		background-color: var(--vscode-progressBar-background);
		display: none;
		position: absolute;
		left: 0;
		width: 2%;
		height: 2px;
	}

	:host(.active) .progress-bar {
		display: inherit;
	}

	:host(.discrete) .progress-bar {
		left: 0;
		transition: width 0.1s linear;
	}

	:host(.discrete.done) .progress-bar {
		width: 100%;
	}

	:host(.infinite) .progress-bar {
		animation-name: progress;
		animation-duration: 4s;
		animation-iteration-count: infinite;
		animation-timing-function: steps(100);
		transform: translateZ(0);
	}

	@keyframes progress {
		0% {
			transform: translateX(0) scaleX(1);
		}

		50% {
			transform: translateX(2500%) scaleX(3);
		}

		to {
			transform: translateX(4900%) scaleX(1);
		}
	}
`;let je=class extends le{constructor(){super(...arguments),this.mode="infinite",this.active=!1}};wt([y({mode:"reflect"})],je.prototype,"mode",2),wt([y({mode:"boolean"})],je.prototype,"active",2),je=wt([he({name:"progress-indicator",template:gi,styles:vi})],je);var yi=Object.defineProperty,_i=Object.getOwnPropertyDescriptor,Bo=(s,n,i,r)=>{for(var a=r>1?void 0:r?_i(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&yi(n,i,a),a};const wi=N`
	<template role="tree">
		<slot ${xo("itemNodes")}></slot>
	</template>
`,$i=ce`
	::slotted(*) {
		box-sizing: inherit;
	}
`;let $t=class extends le{itemNodesChanged(s,n){if(this.itemNodesDisposer?.(),!n?.length)return;const i=n?.filter(r=>r.nodeType===1).map(r=>{const a=this.handleKeydown.bind(this),l=this.handleBeforeSelected.bind(this),c=this.handleSelected.bind(this);return r.addEventListener("keydown",a,!1),r.addEventListener("select",l,!1),r.addEventListener("selected",c,!1),{dispose:function(){r?.removeEventListener("keydown",a,!1),r?.removeEventListener("select",l,!1),r?.removeEventListener("selected",c,!1)}}});this.itemNodesDisposer=()=>{i?.forEach(({dispose:r})=>r())}}disconnectedCallback(){this.itemNodesDisposer?.()}handleBeforeSelected(s){if(!s.target)return;const n=s.target;this._lastSelected!=null&&this._lastSelected!==n&&this._lastSelected.deselect(),this._lastSelected=n}handleSelected(s){if(!s.target||!s.detail.branch)return;const n=s.target,i=n.getAttribute("level"),r=c=>parseInt(c.getAttribute("level")??"0",10),a=c=>{const d=r(c);let h=c.previousElementSibling;for(;h;){if(r(h)<d)return h;h=h.previousElementSibling}};let l=n.nextElementSibling;for(;l&&l.getAttribute("level")!==i;){const c=a(l);l.setAttribute("parentexpanded",c?.expanded===!1?"false":"true"),l.setAttribute("expanded",s.detail.expanded?"true":"false"),l=l.nextElementSibling}}handleKeydown(s){if(!s.target)return;const n=s.target;s.key==="Enter"||s.key===" "?n.select(s.key==="Enter"?{preserveFocus:!1}:void 0):s.key==="ArrowUp"?n.previousElementSibling?.focus():s.key==="ArrowDown"&&n.nextElementSibling?.focus()}};Bo([po],$t.prototype,"itemNodes",2),$t=Bo([he({name:"list-container",template:wi,styles:$i})],$t);function M(s,n,i){return{index:s,removed:n,addedCount:i}}const Oo=0,No=1,xt=2,Ct=3;function xi(s,n,i,r,a,l){const c=l-a+1,d=i-n+1,h=new Array(c);let u,b;for(let f=0;f<c;++f)h[f]=new Array(d),h[f][0]=f;for(let f=0;f<d;++f)h[0][f]=f;for(let f=1;f<c;++f)for(let p=1;p<d;++p)s[n+p-1]===r[a+f-1]?h[f][p]=h[f-1][p-1]:(u=h[f-1][p]+1,b=h[f][p-1]+1,h[f][p]=u<b?u:b);return h}function Ci(s){let n=s.length-1,i=s[0].length-1,r=s[n][i];const a=[];for(;n>0||i>0;){if(n===0){a.push(xt),i--;continue}if(i===0){a.push(Ct),n--;continue}const l=s[n-1][i-1],c=s[n-1][i],d=s[n][i-1];let h;c<d?h=c<l?c:l:h=d<l?d:l,h===l?(l===r?a.push(Oo):(a.push(No),r=l),n--,i--):h===c?(a.push(Ct),n--,r=c):(a.push(xt),i--,r=d)}return a.reverse(),a}function ki(s,n,i){for(let r=0;r<i;++r)if(s[r]!==n[r])return r;return i}function Si(s,n,i){let r=s.length,a=n.length,l=0;for(;l<i&&s[--r]===n[--a];)l++;return l}function Ai(s,n,i,r){return n<i||r<s?-1:n===i||r===s?0:s<i?n<r?n-i:r-i:r<n?r-s:n-s}function Mo(s,n,i,r,a,l){let c=0,d=0;const h=Math.min(i-n,l-a);if(n===0&&a===0&&(c=ki(s,r,h)),i===s.length&&l===r.length&&(d=Si(s,r,h-c)),n+=c,a+=c,i-=d,l-=d,i-n===0&&l-a===0)return ct;if(n===i){const _=M(n,[],0);for(;a<l;)_.removed.push(r[a++]);return[_]}else if(a===l)return[M(n,[],i-n)];const u=Ci(xi(s,n,i,r,a,l)),b=[];let f,p=n,m=a;for(let _=0;_<u.length;++_)switch(u[_]){case Oo:f!==void 0&&(b.push(f),f=void 0),p++,m++;break;case No:f===void 0&&(f=M(p,[],0)),f.addedCount++,p++,f.removed.push(r[m]),m++;break;case xt:f===void 0&&(f=M(p,[],0)),f.addedCount++,p++;break;case Ct:f===void 0&&(f=M(p,[],0)),f.removed.push(r[m]),m++;break}return f!==void 0&&b.push(f),b}const Do=Array.prototype.push;function Pi(s,n,i,r){const a=M(n,i,r);let l=!1,c=0;for(let d=0;d<s.length;d++){const h=s[d];if(h.index+=c,l)continue;const u=Ai(a.index,a.index+a.removed.length,h.index,h.index+h.addedCount);if(u>=0){s.splice(d,1),d--,c-=h.addedCount-h.removed.length,a.addedCount+=h.addedCount-u;const b=a.removed.length+h.removed.length-u;if(!a.addedCount&&!b)l=!0;else{let f=h.removed;if(a.index<h.index){const p=a.removed.slice(0,h.index-a.index);Do.apply(p,f),f=p}if(a.index+a.removed.length>h.index+h.addedCount){const p=a.removed.slice(h.index+h.addedCount-a.index);Do.apply(f,p)}a.removed=f,h.index<a.index&&(a.index=h.index)}}else if(a.index<h.index){l=!0,s.splice(d,0,a),d++;const b=a.addedCount-a.removed.length;h.index+=b,c+=b}}l||s.push(a)}function Ti(s){const n=[];for(let i=0,r=s.length;i<r;i++){const a=s[i];Pi(n,a.index,a.removed,a.addedCount)}return n}function Ei(s,n){let i=[];const r=Ti(n);for(let a=0,l=r.length;a<l;++a){const c=r[a];if(c.addedCount===1&&c.removed.length===1){c.removed[0]!==s[c.index]&&i.push(c);continue}i=i.concat(Mo(s,c.index,c.index+c.addedCount,c.removed,0,c.removed.length))}return i}let Io=!1;function kt(s,n){let i=s.index;const r=n.length;return i>r?i=r-s.addedCount:i<0&&(i=r+s.removed.length+i-s.addedCount),i<0&&(i=0),s.index=i,s}class Bi extends Ie{constructor(n){super(n),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this.call=this.flush,Reflect.defineProperty(n,"$fastController",{value:this,enumerable:!1})}subscribe(n){this.flush(),super.subscribe(n)}addSplice(n){this.splices===void 0?this.splices=[n]:this.splices.push(n),this.needsQueue&&(this.needsQueue=!1,w.queueUpdate(this))}reset(n){this.oldCollection=n,this.needsQueue&&(this.needsQueue=!1,w.queueUpdate(this))}flush(){const n=this.splices,i=this.oldCollection;if(n===void 0&&i===void 0)return;this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0;const r=i===void 0?Ei(this.source,n):Mo(this.source,0,this.source.length,i,0,i.length);this.notify(r)}}function Oi(){if(Io)return;Io=!0,k.setArrayObserverFactory(h=>new Bi(h));const s=Array.prototype;if(s.$fastPatch)return;Reflect.defineProperty(s,"$fastPatch",{value:1,enumerable:!1});const n=s.pop,i=s.push,r=s.reverse,a=s.shift,l=s.sort,c=s.splice,d=s.unshift;s.pop=function(){const h=this.length>0,u=n.apply(this,arguments),b=this.$fastController;return b!==void 0&&h&&b.addSplice(M(this.length,[u],0)),u},s.push=function(){const h=i.apply(this,arguments),u=this.$fastController;return u!==void 0&&u.addSplice(kt(M(this.length-arguments.length,[],arguments.length),this)),h},s.reverse=function(){let h;const u=this.$fastController;u!==void 0&&(u.flush(),h=this.slice());const b=r.apply(this,arguments);return u!==void 0&&u.reset(h),b},s.shift=function(){const h=this.length>0,u=a.apply(this,arguments),b=this.$fastController;return b!==void 0&&h&&b.addSplice(M(0,[u],0)),u},s.sort=function(){let h;const u=this.$fastController;u!==void 0&&(u.flush(),h=this.slice());const b=l.apply(this,arguments);return u!==void 0&&u.reset(h),b},s.splice=function(){const h=c.apply(this,arguments),u=this.$fastController;return u!==void 0&&u.addSplice(kt(M(+arguments[0],h,arguments.length>2?arguments.length-2:0),this)),h},s.unshift=function(){const h=d.apply(this,arguments),u=this.$fastController;return u!==void 0&&u.addSplice(kt(M(0,[],arguments.length),this)),h}}const Fo=Object.freeze({positioning:!1,recycle:!0});function Ni(s,n,i,r){s.bind(n[i],r)}function Mi(s,n,i,r){const a=Object.create(r);a.index=i,a.length=n.length,s.bind(n[i],a)}class Di{constructor(n,i,r,a,l,c){this.location=n,this.itemsBinding=i,this.templateBinding=a,this.options=c,this.source=null,this.views=[],this.items=null,this.itemsObserver=null,this.originalContext=void 0,this.childContext=void 0,this.bindView=Ni,this.itemsBindingObserver=k.binding(i,this,r),this.templateBindingObserver=k.binding(a,this,l),c.positioning&&(this.bindView=Mi)}bind(n,i){this.source=n,this.originalContext=i,this.childContext=Object.create(i),this.childContext.parent=n,this.childContext.parentContext=this.originalContext,this.items=this.itemsBindingObserver.observe(n,this.originalContext),this.template=this.templateBindingObserver.observe(n,this.originalContext),this.observeItems(!0),this.refreshAllViews()}unbind(){this.source=null,this.items=null,this.itemsObserver!==null&&this.itemsObserver.unsubscribe(this),this.unbindAllViews(),this.itemsBindingObserver.disconnect(),this.templateBindingObserver.disconnect()}handleChange(n,i){n===this.itemsBinding?(this.items=this.itemsBindingObserver.observe(this.source,this.originalContext),this.observeItems(),this.refreshAllViews()):n===this.templateBinding?(this.template=this.templateBindingObserver.observe(this.source,this.originalContext),this.refreshAllViews(!0)):this.updateViews(i)}observeItems(n=!1){if(!this.items){this.items=ct;return}const i=this.itemsObserver,r=this.itemsObserver=k.getNotifier(this.items),a=i!==r;a&&i!==null&&i.unsubscribe(this),(a||n)&&r.subscribe(this)}updateViews(n){const i=this.childContext,r=this.views,a=this.bindView,l=this.items,c=this.template,d=this.options.recycle,h=[];let u=0,b=0;for(let f=0,p=n.length;f<p;++f){const m=n[f],_=m.removed;let $=0,L=m.index;const Ho=L+m.addedCount,ue=r.splice(m.index,_.length);for(b=h.length+ue.length;L<Ho;++L){const St=r[L],Vo=St?St.firstChild:this.location;let G;d&&b>0?($<=b&&ue.length>0?(G=ue[$],$++):(G=h[u],u++),b--):G=c.create(),r.splice(L,0,G),a(G,l,L,i),G.insertBefore(Vo)}ue[$]&&h.push(...ue.slice($))}for(let f=u,p=h.length;f<p;++f)h[f].dispose();if(this.options.positioning)for(let f=0,p=r.length;f<p;++f){const m=r[f].context;m.length=p,m.index=f}}refreshAllViews(n=!1){const i=this.items,r=this.childContext,a=this.template,l=this.location,c=this.bindView;let d=i.length,h=this.views,u=h.length;if((d===0||n||!this.options.recycle)&&(wo.disposeContiguousBatch(h),u=0),u===0){this.views=h=new Array(d);for(let b=0;b<d;++b){const f=a.create();c(f,i,b,r),h[b]=f,f.insertBefore(l)}}else{let b=0;for(;b<d;++b)if(b<u){const p=h[b];c(p,i,b,r)}else{const p=a.create();c(p,i,b,r),h.push(p),p.insertBefore(l)}const f=h.splice(b,u-b);for(b=0,d=f.length;b<d;++b)f[b].dispose()}}unbindAllViews(){const n=this.views;for(let i=0,r=n.length;i<r;++i)n[i].unbind()}}class Ii extends Re{constructor(n,i,r){super(),this.itemsBinding=n,this.templateBinding=i,this.options=r,this.createPlaceholder=w.createBlockPlaceholder,Oi(),this.isItemsBindingVolatile=k.isVolatileBinding(n),this.isTemplateBindingVolatile=k.isVolatileBinding(i)}createBehavior(n){return new Di(n,this.itemsBinding,this.isItemsBindingVolatile,this.templateBinding,this.isTemplateBindingVolatile,this.options)}}function Fi(s,n,i=Fo){const r=typeof n=="function"?n:()=>n;return new Ii(s,r,Object.assign(Object.assign({},Fo),i))}function ze(s,n){const i=typeof n=="function"?n:()=>n;return(r,a)=>s(r,a)?i(r,a):null}const Lo={toView:function(s){return s.toString()},fromView:function(s){return parseInt(s,10)}};var Li=Object.defineProperty,Ri=Object.getOwnPropertyDescriptor,V=(s,n,i,r)=>{for(var a=r>1?void 0:r?Ri(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&Li(n,i,a),a};const Hi=N`
	<template
		role="treeitem"
		aria-expanded="${s=>s.expanded===!0?"true":"false"}"
		aria-hidden="${s=>s.isHidden}"
	>
		<button id="item" class="item" type="button" @click="${(s,n)=>s.onItemClick(n.event)}">
			${Fi(s=>s.treeLeaves,N`<span class="node node--connector"><code-icon name="blank"></code-icon></span>`)}
			${ze(s=>s.branch,N`<span class="node"
					><code-icon
						class="branch"
						icon="${s=>s.expanded?"chevron-down":"chevron-right"}"
					></code-icon
				></span>`)}
			<span class="icon"><slot name="icon"></slot></span>
			<span class="text">
				<span class="main"><slot></slot></span>
				<span class="description"><slot name="description"></slot></span>
			</span>
		</button>
		<nav class="actions"><slot name="actions"></slot></nav>
	</template>
`,Vi=ce`
	:host {
		box-sizing: border-box;
		padding-left: var(--gitlens-gutter-width);
		padding-right: var(--gitlens-scrollbar-gutter-width);
		padding-top: 0.1rem;
		padding-bottom: 0.1rem;
		line-height: 2.2rem;
		height: 2.2rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: var(--vscode-font-size);
		color: var(--vscode-sideBar-foreground);
	}

	:host(:hover) {
		color: var(--vscode-list-hoverForeground);
		background-color: var(--vscode-list-hoverBackground);
	}

	:host([active]) {
		color: var(--vscode-list-inactiveSelectionForeground);
		background-color: var(--vscode-list-inactiveSelectionBackground);
	}

	:host(:focus-within) {
		outline: 1px solid var(--vscode-list-focusOutline);
		outline-offset: -0.1rem;
		color: var(--vscode-list-activeSelectionForeground);
		background-color: var(--vscode-list-activeSelectionBackground);
	}

	:host([aria-hidden='true']) {
		display: none;
	}

	* {
		box-sizing: border-box;
	}

	.item {
		appearance: none;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 0.6rem;
		width: 100%;
		padding: 0;
		text-decoration: none;
		color: inherit;
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
		min-width: 0;
	}

	.icon {
		display: inline-block;
		width: 1.6rem;
		text-align: center;
	}

	slot[name='icon']::slotted(*) {
		width: 1.6rem;
		aspect-ratio: 1;
		vertical-align: text-bottom;
	}

	.node {
		display: inline-block;
		width: 1.6rem;
		text-align: center;
	}

	.node--connector {
		position: relative;
	}
	.node--connector::before {
		content: '';
		position: absolute;
		height: 2.2rem;
		border-left: 1px solid transparent;
		top: 50%;
		transform: translate(-50%, -50%);
		left: 0.8rem;
		width: 0.1rem;
		transition: border-color 0.1s linear;
		opacity: 0.4;
	}

	:host-context(.indentGuides-always) .node--connector::before,
	:host-context(.indentGuides-onHover:focus-within) .node--connector::before,
	:host-context(.indentGuides-onHover:hover) .node--connector::before {
		border-color: var(--vscode-tree-indentGuidesStroke);
	}

	.text {
		overflow: hidden;
		white-space: nowrap;
		text-align: left;
		text-overflow: ellipsis;
		flex: 1;
	}

	.description {
		opacity: 0.7;
		margin-left: 0.3rem;
	}

	.actions {
		flex: none;
		user-select: none;
		color: var(--vscode-icon-foreground);
	}

	:host(:focus-within) .actions {
		color: var(--vscode-list-activeSelectionIconForeground);
	}

	:host(:not(:hover):not(:focus-within)) .actions {
		display: none;
	}

	slot[name='actions']::slotted(*) {
		display: flex;
		align-items: center;
	}
`;let F=class extends le{constructor(){super(...arguments),this.tree=!1,this.branch=!1,this.expanded=!0,this.parentexpanded=!0,this.level=1,this.active=!1}get treeLeaves(){const s=this.level-1;return s<1?[]:Array.from({length:s},(n,i)=>i+1)}get isHidden(){return this.parentexpanded===!1||!this.branch&&!this.expanded?"true":"false"}onItemClick(s){this.select()}select(s,n=!1){this.$emit("select"),this.branch&&(this.expanded=!this.expanded),this.active=!0,n||window.requestAnimationFrame(()=>{this.$emit("selected",{tree:this.tree,branch:this.branch,expanded:this.expanded,level:this.level})})}deselect(){this.active=!1}focus(s){this.shadowRoot?.getElementById("item")?.focus(s)}};V([y({mode:"boolean"})],F.prototype,"tree",2),V([y({mode:"boolean"})],F.prototype,"branch",2),V([y({mode:"boolean"})],F.prototype,"expanded",2),V([y({mode:"boolean"})],F.prototype,"parentexpanded",2),V([y({converter:Lo})],F.prototype,"level",2),V([y({mode:"boolean"})],F.prototype,"active",2),V([Fe],F.prototype,"treeLeaves",1),V([Fe],F.prototype,"isHidden",1),F=V([he({name:"list-item",template:Hi,styles:Vi})],F);class Ui{constructor(n,i){this.target=n,this.propertyName=i}bind(n){n[this.propertyName]=this.target}unbind(){}}function ji(s){return new vo("fast-ref",Ui,s)}var zi=Object.defineProperty,qi=Object.getOwnPropertyDescriptor,E=(s,n,i,r)=>{for(var a=r>1?void 0:r?qi(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&zi(n,i,a),a};const Wi=N`
	<list-item
		${ji("base")}
		tree="${s=>s.tree}"
		level="${s=>s.level}"
		active="${s=>s.active}"
		expanded="${s=>s.expanded}"
		parentexpanded="${s=>s.parentexpanded}"
		@selected="${(s,n)=>s.onComparePrevious(n.event)}"
	>
		<img slot="icon" src="${s=>s.icon}" title="${s=>s.statusName}" alt="${s=>s.statusName}" />
		${s=>s.fileName}
		${ze(s=>!s.tree,N`<span slot="description">${s=>s.filePath}</span>`)}
		<span slot="actions">
			<a
				class="change-list__action"
				@click="${(s,n)=>s.onOpenFile(n.event)}"
				href="#"
				title="Open file"
				aria-label="Open file"
				><code-icon icon="go-to-file"></code-icon
			></a>
			${ze(s=>!s.uncommitted,N`
					<a
						class="change-list__action"
						@click="${(s,n)=>s.onCompareWorking(n.event)}"
						href="#"
						title="Open Changes with Working File"
						aria-label="Open Changes with Working File"
						><code-icon icon="git-compare"></code-icon
					></a>
					${ze(s=>!s.stash,N`<a
								class="change-list__action"
								@click="${(s,n)=>s.onOpenFileOnRemote(n.event)}"
								href="#"
								title="Open on remote"
								aria-label="Open on remote"
								><code-icon icon="globe"></code-icon></a
							><a
								class="change-list__action"
								@click="${(s,n)=>s.onMoreActions(n.event)}"
								href="#"
								title="Show more actions"
								aria-label="Show more actions"
								><code-icon icon="ellipsis"></code-icon
							></a>`)}
				`)}
		</span>
	</list-item>
`,Yi=ce`
	.change-list__action {
		box-sizing: border-box;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.25em;
		color: inherit;
		padding: 2px;
		vertical-align: text-bottom;
		text-decoration: none;
	}
	.change-list__action:focus {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}
	.change-list__action:hover {
		background-color: var(--vscode-toolbar-hoverBackground);
	}
	.change-list__action:active {
		background-color: var(--vscode-toolbar-activeBackground);
	}
`,Qi={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Conflict",AU:"Conflict",UA:"Conflict",DD:"Conflict",DU:"Conflict",UD:"Conflict",UU:"Conflict",T:"Modified",U:"Updated but Unmerged"};let T=class extends le{constructor(){super(...arguments),this.tree=!1,this.expanded=!0,this.parentexpanded=!0,this.level=1,this.active=!1,this.stash=!1,this.uncommitted=!1,this.icon="",this.path="",this.repo="",this.status=""}select(s){this.base?.select(s)}deselect(){this.base?.deselect()}focus(s){this.base?.focus(s)}get isHidden(){return this.base?.isHidden??"false"}get pathIndex(){return this.path.lastIndexOf("/")}get fileName(){return this.pathIndex>-1?this.path.substring(this.pathIndex+1):this.path}get filePath(){return!this.tree&&this.pathIndex>-1?this.path.substring(0,this.pathIndex):""}get statusName(){return this.status!==""?Qi[this.status]:""}getEventDetail(s){return{path:this.path,repoPath:this.repo,showOptions:s}}onOpenFile(s){s.preventDefault(),this.$emit("file-open",this.getEventDetail())}onOpenFileOnRemote(s){s.preventDefault(),this.$emit("file-open-on-remote",this.getEventDetail())}onCompareWorking(s){s.preventDefault(),this.$emit("file-compare-working",this.getEventDetail())}onComparePrevious(s,n){s?.preventDefault(),this.$emit("file-compare-previous",this.getEventDetail(n))}onMoreActions(s){s.preventDefault(),this.$emit("file-more-actions",this.getEventDetail())}};E([y({mode:"boolean"})],T.prototype,"tree",2),E([y({mode:"boolean"})],T.prototype,"expanded",2),E([y({mode:"boolean"})],T.prototype,"parentexpanded",2),E([y({converter:Lo})],T.prototype,"level",2),E([y({mode:"boolean"})],T.prototype,"active",2),E([y({mode:"boolean"})],T.prototype,"stash",2),E([y({mode:"boolean"})],T.prototype,"uncommitted",2),E([y],T.prototype,"icon",2),E([y],T.prototype,"path",2),E([y],T.prototype,"repo",2),E([y],T.prototype,"status",2),E([Fe],T.prototype,"fileName",1),E([Fe],T.prototype,"filePath",1),T=E([he({name:"file-change-list-item",template:Wi,styles:Yi})],T);var Ki=Object.defineProperty,Zi=Object.getOwnPropertyDescriptor,qe=(s,n,i,r)=>{for(var a=r>1?void 0:r?Zi(n,i):n,l=s.length-1,c;l>=0;l--)(c=s[l])&&(a=(r?c(n,i,a):c(a))||a);return r&&a&&Ki(n,i,a),a};const Gi=N`<a
	role="${s=>s.href?null:"button"}"
	type="${s=>s.href?null:"button"}"
	aria-label="${s=>s.label}"
	title="${s=>s.label}"
	><code-icon icon="${s=>s.icon}"></code-icon
></a>`,Xi=ce`
	:host {
		box-sizing: border-box;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		color: inherit;
		padding: 0.2rem;
		vertical-align: text-bottom;
		text-decoration: none;
		cursor: pointer;
	}
	:host(:focus) {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}
	:host(:hover) {
		background-color: var(--vscode-toolbar-hoverBackground);
	}
	:host(:active) {
		background-color: var(--vscode-toolbar-activeBackground);
	}
`;let Ce=class extends le{constructor(){super(...arguments),this.label="",this.icon=""}};qe([y],Ce.prototype,"href",2),qe([y],Ce.prototype,"label",2),qe([y],Ce.prototype,"icon",2),Ce=qe([he({name:"action-item",template:Gi,styles:Xi})],Ce);const We="0000000000000000000000000000000000000000";class Ji extends hn{constructor(){super("CommitDetailsApp")}onInitialize(){this.log(`${this.appName}.onInitialize`),this.renderContent()}onBind(){return[A.on("file-change-list-item","file-open-on-remote",i=>this.onOpenFileOnRemote(i.detail)),A.on("file-change-list-item","file-open",i=>this.onOpenFile(i.detail)),A.on("file-change-list-item","file-compare-working",i=>this.onCompareFileWithWorking(i.detail)),A.on("file-change-list-item","file-compare-previous",i=>this.onCompareFileWithPrevious(i.detail)),A.on("file-change-list-item","file-more-actions",i=>this.onFileMoreActions(i.detail)),A.on('[data-action="dismiss-banner"]',"click",i=>this.onDismissBanner(i)),A.on('[data-action="commit-actions"]',"click",i=>this.onCommitActions(i)),A.on('[data-action="pick-commit"]',"click",i=>this.onPickCommit(i)),A.on('[data-action="search-commit"]',"click",i=>this.onSearchCommit(i)),A.on('[data-action="autolink-settings"]',"click",i=>this.onAutolinkSettings(i)),A.on("[data-switch-value]","click",i=>this.onTreeSetting(i)),A.on('[data-action="pin"]',"click",i=>this.onTogglePin(i)),A.on('[data-region="rich-pane"]',"expanded-change",i=>this.onExpandedChange(i.detail))]}onMessageReceived(n){const i=n.data;switch(this.log(`${this.appName}.onMessageReceived(${i.id}): name=${i.method}`),i.method){case Bt.method:Et(Bt,i,r=>{r.state,this.state=r.state,this.renderContent()});break;default:super.onMessageReceived?.(n)}}onDismissBanner(n){const i=this.state.preferences?.dismissed??[];if(i.includes("sidebar"))return;i.push("sidebar"),this.state.preferences={...this.state.preferences,dismissed:i};const r=n.target?.closest('[data-region="sidebar-banner"]')??void 0;this.renderBanner(this.state,r),this.sendCommand(Ye,{dismissed:i})}onTreeSetting(n){const i=n.target?.getAttribute("data-switch-value")==="list-tree";!i!==this.state.preferences?.filesAsTree&&(this.state.preferences={...this.state.preferences,filesAsTree:!i},this.renderFiles(this.state),this.sendCommand(Ye,{filesAsTree:!i}))}onExpandedChange(n){this.sendCommand(Ye,{autolinksExpanded:n.expanded})}onTogglePin(n){n.preventDefault(),this.sendCommand(nn,{pin:!this.state.pinned})}onAutolinkSettings(n){n.preventDefault(),this.sendCommand(on,void 0)}onSearchCommit(n){this.sendCommand(tn,void 0)}onPickCommit(n){this.sendCommand(en,void 0)}onOpenFileOnRemote(n){this.sendCommand(Go,n)}onOpenFile(n){this.sendCommand(Zo,n)}onCompareFileWithWorking(n){this.sendCommand(Xo,n)}onCompareFileWithPrevious(n){this.sendCommand(Jo,n)}onFileMoreActions(n){this.sendCommand(Ko,n)}onCommitActions(n){if(n.preventDefault(),this.state.selected===void 0){n.stopPropagation();return}const i=n.target?.getAttribute("data-action-type");i!=null&&this.sendCommand(Qo,{action:i,alt:n.altKey})}renderCommit(n){const i=n.selected!==void 0,r=document.getElementById("empty"),a=document.getElementById("main");return r?.setAttribute("aria-hidden",i?"true":"false"),a?.setAttribute("aria-hidden",i?"false":"true"),i}renderRichContent(){!this.renderCommit(this.state)||(this.renderMessage(this.state),this.renderPullRequestAndAutolinks(this.state))}renderContent(){!this.renderCommit(this.state)||(this.renderBanner(this.state),this.renderActions(this.state),this.renderPin(this.state),this.renderSha(this.state),this.renderMessage(this.state),this.renderAuthor(this.state),this.renderStats(this.state),this.renderFiles(this.state),this.renderPullRequestAndAutolinks(this.state))}renderBanner(n,i){!n.preferences?.dismissed?.includes("sidebar")||(i||(i=document.querySelector('[data-region="sidebar-banner"]')??void 0),i?.remove())}renderActions(n){const i=n.selected?.sha===We?"true":"false";for(const a of document.querySelectorAll('[data-action-type="graph"],[data-action-type="more"]'))a.setAttribute("aria-hidden",i);const r=n.selected?.sha!==We?"true":"false";for(const a of document.querySelectorAll('[data-action-type="scm"]'))a.setAttribute("aria-hidden",r)}renderPin(n){const i=document.querySelector('[data-action="pin"]');if(i==null)return;const r=n.pinned?"Unpin this Commit":"Pin this Commit";i.setAttribute("aria-label",r),i.setAttribute("title",r),i.classList.toggle("is-active",n.pinned),i.querySelector('[data-region="commit-pin"]')?.setAttribute("icon",n.pinned?"pinned-filled":"pin")}renderSha(n){const i=[...document.querySelectorAll('[data-region="shortsha"]')];if(i.length!==0)for(const r of i)r.textContent=n.selected.shortSha}renderChoices(){const n=document.querySelector('[data-region="choices"]');n!=null&&(n.setAttribute("aria-hidden","true"),n.innerHTML="")}renderStats(n){const i=document.querySelector('[data-region="stats"]');if(i!=null){if(n.selected.stats?.changedFiles==null){i.innerHTML="";return}if(typeof n.selected.stats.changedFiles=="number")i.innerHTML=`
			<commit-stats added="?" modified="${n.selected.stats.changedFiles}" removed="?"></commit-stats>
		`;else{const{added:r,deleted:a,changed:l}=n.selected.stats.changedFiles;i.innerHTML=`
			<commit-stats added="${r}" modified="${l}" removed="${a}"></commit-stats>
		`}}}renderFiles(n){const i=document.querySelector('[data-region="files"]');if(i==null)return;const r=n.preferences?.filesAsTree===!0,a=document.querySelector("[data-switch-value]");if(a&&(a.setAttribute("data-switch-value",r?"list-tree":"list"),a.setAttribute("icon",r?"list-flat":"list-tree"),a.setAttribute("label",r?"View as List":"View as Tree")),!n.selected.files?.length){i.innerHTML="";return}const l=n.selected.isStash?"stash ":n.selected.sha===We?"uncommitted ":"";if(r){const c=qo(n.selected.files,h=>h.path.split("/"),(...h)=>h.join("/"),!0),d=Ro(c);i.innerHTML=`
					<li class="change-list__item">
						<list-container class="indentGuides-${n.indentGuides}">
							${d.map(({level:h,item:u})=>u.name===""?"":u.value==null?`
											<list-item level="${h}" tree branch>
												<code-icon slot="icon" icon="folder" title="Directory" aria-label="Directory"></code-icon>
												${u.name}
											</list-item>
										`:`
										<file-change-list-item
											tree
											level="${h}"
											${l}
											path="${u.value.path}"
											repo="${u.value.repoPath}"
											icon="${u.value.icon.dark}"
											status="${u.value.status}"
										></file-change-list-item>
									`).join("")}
						</list-container>
					</li>`}else i.innerHTML=`
				<li class="change-list__item">
					<list-container>
						${n.selected.files.map(c=>`
										<file-change-list-item
											${l}
											path="${c.path}"
											repo="${c.repoPath}"
											icon="${c.icon.dark}"
											status="${c.status}"
										></file-change-list-item>
									`).join("")}
					</list-container>
				</li>`;i.setAttribute("aria-hidden","false")}renderAuthor(n){const i=document.querySelector('[data-region="author"]');i!=null&&(n.selected?.isStash===!0?(i.innerHTML=`
				<div class="commit-stashed">
					<span class="commit-stashed__media"><code-icon class="commit-stashed__icon" icon="inbox"></code-icon></span>
					<span class="commit-stashed__date">stashed <formatted-date date=${n.selected.author.date} dateFormat="${n.dateFormat}"></formatted-date></span>
				</div>
			`,i.setAttribute("aria-hidden","false")):n.selected?.author!=null?(i.innerHTML=`
				<commit-identity
					name="${n.selected.author.name}"
					email="${n.selected.author.email}"
					date=${n.selected.author.date}
					dateFormat="${n.dateFormat}"
					avatar="${n.selected.author.avatar}"
					actionLabel="${n.selected.sha===We?"modified":"committed"}"
				></commit-identity>
			`,i.setAttribute("aria-hidden","false")):(i.innerHTML="",i.setAttribute("aria-hidden","true")))}renderTitle(n){const i=document.querySelector('[data-region="commit-title"]');i!=null&&(i.innerHTML=n.selected.shortSha)}renderMessage(n){const i=document.querySelector('[data-region="message"]');if(i==null)return;const r=n.selected.message.indexOf(Yo);r===-1?i.innerHTML=`<strong>${n.selected.message}</strong>`:i.innerHTML=`<strong>${n.selected.message.substring(0,r)}</strong><br />${n.selected.message.substring(r+3)}`}renderPullRequestAndAutolinks(n){const i=document.querySelector('[data-region="rich-pane"]');if(i==null)return;i.expanded=this.state.preferences?.autolinksExpanded??!0,i.loading=!n.includeRichContent;const r=i.querySelector('[data-region="rich-info"]'),a=i.querySelector('[data-region="autolinks"]');n.pullRequest!=null||n.autolinkedIssues?.length?(a?.setAttribute("aria-hidden","false"),r?.setAttribute("aria-hidden","true"),this.renderPullRequest(n),this.renderIssues(n)):(a?.setAttribute("aria-hidden","true"),r?.setAttribute("aria-hidden","false"));const l=i.querySelector('[data-region="autolink-count"]');if(l==null)return;const c=(n.pullRequest!=null?1:0)+(n.autolinkedIssues?.length??0);l.innerHTML=n.includeRichContent?`${c} found`:"\u2026"}renderPullRequest(n){const i=document.querySelector('[data-region="pull-request"]');i!=null&&(n.pullRequest!=null?(i.innerHTML=`
				<issue-pull-request
					name="${n.pullRequest.title}"
					url="${n.pullRequest.url}"
					key="#${n.pullRequest.id}"
					status="${n.pullRequest.state}"
					date=${n.pullRequest.date}
					dateFormat="${n.dateFormat}"
				></issue-pull-request>
			`,i.setAttribute("aria-hidden","false")):(i.innerHTML="",i.setAttribute("aria-hidden","true")))}renderIssues(n){const i=document.querySelector('[data-region="issue"]');i!=null&&(n.autolinkedIssues?.length?(i.innerHTML=n.autolinkedIssues.map(r=>`
						<issue-pull-request
							name="${r.title}"
							url="${r.url}"
							key="${r.id}"
							status="${r.closed?"closed":"opened"}"
							date="${r.closed?r.closedDate:r.date}"
						></issue-pull-request>
					`).join(""),i.setAttribute("aria-hidden","false")):(i.innerHTML="",i.setAttribute("aria-hidden","true")))}}function Ns(s){}function Ro(s,n=0){const i=[];if(s==null)return i;if(i.push({level:n,item:s}),s.children!=null){const r=Array.from(s.children.values());r.sort((a,l)=>!a.value||!l.value?(a.value?1:-1)-(l.value?1:-1):a.relativePath<l.relativePath?-1:a.relativePath>l.relativePath?1:0),r.forEach(a=>{i.push(...Ro(a,n+1))})}return i}new Ji})();
