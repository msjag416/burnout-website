(()=>{var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var U=([e,a,t])=>{let r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(a).forEach(o=>{r.setAttribute(o,String(a[o]))}),t?.length&&t.forEach(o=>{let u=U(o);r.appendChild(u)}),r},O=(e,a={})=>{let r={...d,...a};return U(["svg",r,e])};var E=(...e)=>{let a=new Set;for(let t of e)if(typeof t=="string")for(let r of t.split(/\s+/))r&&a.add(r);return[...a].join(" ")};var G=e=>{if(e==null||typeof e!="object")return!1;for(let a in e)if(Object.prototype.hasOwnProperty.call(e,a)&&(a.startsWith("aria-")||a==="role"||a==="title")&&e[a]!=null)return!0;return!1};var V=e=>{let a="",t=!1;for(let r of e){if(r==="-"||r==="_"||r<=" "){t=a.length>0;continue}a.length===0?a+=r.toLowerCase():a+=t?r.toUpperCase():r,t=!1}return a};var W=e=>{let a=V(e);return a.charAt(0).toUpperCase()+a.slice(1)};var Z=e=>Array.from(e.attributes).reduce((a,t)=>(a[t.name]=t.value,a),{}),z=e=>typeof e=="string"?e.split(" ").filter(Boolean):!e||!e.class?[]:e.class&&typeof e.class=="string"?e.class.split(" ").filter(Boolean):e.class&&Array.isArray(e.class)?e.class.filter(Boolean):[],i=(e,{nameAttr:a,icons:t,attrs:r})=>{let o=e.getAttribute(a);if(o==null)return;let u=W(o),f=t[u];if(!f)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let l=Z(e),I=G(l)?{}:{"aria-hidden":"true"},v={...d,"data-lucide":o,...I,...r,...l},X=z(l),N=z(r),H=E("lucide",`lucide-${o}`,...X,...N);H&&Object.assign(v,{class:H});let K=O(f,v);return e.parentNode?.replaceChild(K,e)};var n=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];var c=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var C=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var h=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];var S=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];var g=[["path",{d:"m15 18-6-6 6-6"}]];var w=[["path",{d:"m9 18 6-6-6-6"}]];var p=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];var A=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var P=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];var k=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]];var L=[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]];var M=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}],["path",{d:"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"}]];var B=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];var m=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var D=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var F=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];var q=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];var x=[["path",{d:"M12 17v4"}],["path",{d:"M18 11a6 6 0 00-3-5.197"}],["path",{d:"M2 11a10 10 0 015-8.662"}],["path",{d:"M22 11a10 10 0 00-5-8.662"}],["path",{d:"M6 11a6 6 0 013-5.197"}],["path",{d:"M9 21h6"}],["rect",{x:"10",y:"9",width:"4",height:"8",rx:"2"}]];var R=[["path",{d:"m18 13-.654-4.736a4 4 0 00-2.756-3.266l-9.163-2.9a2 2 0 00-2.017.493l-.82.819a2 2 0 00-.492 2.017l2.9 9.163a4 4 0 003.266 2.756L13 18"}],["path",{d:"M18.648 12.352a1.205 1.205 0 011.704 0l1.296 1.296a1.205 1.205 0 010 1.704l-6.296 6.296a1.205 1.205 0 01-1.704 0l-1.296-1.296a1.205 1.205 0 010-1.704z"}],["path",{d:"m3 3 6.586 6.586"}],["circle",{cx:"11",cy:"11",r:"2"}]];var y=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var s=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var T=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var b=({icons:e={},nameAttr:a="data-lucide",attrs:t={},root:r=document,inTemplates:o}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${a}]`)).forEach(f=>i(f,{nameAttr:a,icons:e,attrs:t})),o&&Array.from(r.querySelectorAll("template")).forEach(l=>b({icons:e,nameAttr:a,attrs:t,root:l.content,inTemplates:o})),a==="data-lucide"){let f=r.querySelectorAll("[icon-name]");f.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(f).forEach(l=>i(l,{nameAttr:"icon-name",icons:e,attrs:t})))}};var J={Activity:n,AlertTriangle:s,ArrowLeft:c,ArrowRight:C,ArrowUpRight:h,BookOpen:S,CheckCircle:p,ChevronLeft:g,ChevronRight:w,Download:A,ExternalLink:P,Flame:k,Headphones:L,Heart:B,HeartPulse:M,House:m,Instagram:[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"}]],Linkedin:[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]],Lock:D,Mail:F,Menu:q,PenTool:R,Plus:y,Podcast:x,X:T};window.lucide={createIcons:(e={})=>b({...e,icons:{...J,...e.icons||{}}})};})();
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide/dist/esm/replaceElement.mjs:
lucide/dist/esm/icons/activity.mjs:
lucide/dist/esm/icons/arrow-left.mjs:
lucide/dist/esm/icons/arrow-right.mjs:
lucide/dist/esm/icons/arrow-up-right.mjs:
lucide/dist/esm/icons/book-open.mjs:
lucide/dist/esm/icons/chevron-left.mjs:
lucide/dist/esm/icons/chevron-right.mjs:
lucide/dist/esm/icons/circle-check-big.mjs:
lucide/dist/esm/icons/download.mjs:
lucide/dist/esm/icons/external-link.mjs:
lucide/dist/esm/icons/flame.mjs:
lucide/dist/esm/icons/headphones.mjs:
lucide/dist/esm/icons/heart-pulse.mjs:
lucide/dist/esm/icons/heart.mjs:
lucide/dist/esm/icons/house.mjs:
lucide/dist/esm/icons/lock.mjs:
lucide/dist/esm/icons/mail.mjs:
lucide/dist/esm/icons/menu.mjs:
lucide/dist/esm/icons/mic-signal.mjs:
lucide/dist/esm/icons/pen-tool.mjs:
lucide/dist/esm/icons/plus.mjs:
lucide/dist/esm/icons/triangle-exclamation-point.mjs:
lucide/dist/esm/icons/x.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.76.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
