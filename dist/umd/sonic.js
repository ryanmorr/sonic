/*! @ryanmorr/sonic v1.0.2 | https://github.com/ryanmorr/sonic */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).sonic={})}(this,(function(e){"use strict";
/*! @ryanmorr/parselector v1.0.1 | https://github.com/ryanmorr/parselector */const t=new Map,s=/^(?:\\.|[\w\-\u00c0-\uFFFF])+/,n=/\\(?:([0-9a-f]{1,6} ?)|(.))/gi,r=/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^)]+\)|[^()]*)+)\2\))?/,u=/^\[((?:\\.|[\w\u00c0-\uFFFF-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF-])*)|)|)\s*(i)?\]/;const o=window.document,l=[].filter,a={" ":(e,t,s)=>s.concat(l.call(e.querySelectorAll(t.selector),(e=>i(e,t.filters)))),">":(e,t,s)=>s.concat(l.call(e.querySelectorAll(t.selector),(s=>s.parentNode===e&&i(s,t.filters)))),"+":(e,t,s)=>{const n=e.nextElementSibling;return n&&n.matches(t.selector)&&i(n,t.filters)&&s.push(n),s},"~":(e,t,s)=>{let n=e.nextElementSibling;for(;n;)n.matches(t.selector)&&i(n,t.filters)&&s.push(n),n=n.nextElementSibling;return s}};function i(e,t){return t.every((({name:t,value:s})=>p[t](e,s)))}function c(e){return function(e){if(e=e.trim(),t.has(e))return t.get(e);let o,l=[],a=!1;const i=[],c=()=>{const t=e.match(s)[0];return p(t.length),m(t)},p=t=>{e=e.substring(t)},f=t=>{for(;h(e.charAt(t));)t++;p(t)},h=e=>" "===e||"\n"===e||"\t"===e||"\f"===e||"\r"===e,m=e=>e.replace(n,((e,t,s)=>t?String.fromCharCode(parseInt(t,16)):s)),d=()=>{o={nodeName:null,attributes:[],pseudoClasses:[],pseudoElement:null}};for(d();""!==e;){const t=e.charAt(0);if(h(t))a=!0,f(1);else if(">"===t||"<"===t||"~"===t||"+"===t)(o.nodeName||o.attributes.length>0||o.pseudoClasses.length>0)&&l.push(o),l.push(t),d(),a=!1,f(1);else if(","===t)l.push(o),i.push(l),d(),l=[],a=!1,f(1);else if(a&&(l.push(o),l.push(" "),d(),a=!1),"*"===t)p(1),o.nodeName="*";else if("#"===t)p(1),o.attributes.push({name:"id",operator:"=",value:c(),ignoreCase:!1});else if("."===t)p(1),o.attributes.push({name:"class",operator:"~=",value:c(),ignoreCase:!1});else if("["===t){const t=e.match(u);p(t[0].length);const s=m(t[1]);o.attributes.push({name:s,operator:t[2]||"",value:m(t[4]||t[5]||""),ignoreCase:!!t[6]})}else if(":"===t)if(":"===e[1])p(2),o.pseudoElement=c();else{const t=e.match(r);p(t[0].length);const s=m(t[1]);o.pseudoClasses.push({name:s,value:m(t[3]||"")})}else s.test(e)&&(o.nodeName=c().toLowerCase())}return l.push(o),i.push(l),t.set(e,i),i}(e).map((e=>e.map((e=>{if("string"==typeof e)return e;const t=[],s=[];return e.nodeName&&t.push(e.nodeName),e.attributes.forEach((({name:e,value:s,operator:n,ignoreCase:r})=>{"id"===e?t.push("#",s):"class"===e?t.push(".",s):(t.push("[",e),""!==n&&(t.push(n,'"',s,'"'),r&&t.push(" i")),t.push("]"))})),e.pseudoClasses.forEach((({name:e,value:n})=>{e in p?s.push({name:e,value:n}):(t.push(":",e),""!==n&&t.push("(",n,")"))})),{filters:s,selector:0===t.length?"*":t.join("")}}))))}const p=Object.create(null);function f(e,t){return h(e,t)[0]||null}function h(e,t=o){return"string"==typeof t&&(t=f(t)),t=[t],c(e).reduce(((e,s)=>{let n=t,r=0;const u=s.length;for(;r<u;){let e=s[r++],t=a[" "];e in a&&(t=a[e],e=s[r++]),n=n.reduce(((s,n)=>t(n,e,s)),[])}return n.forEach((t=>{e.includes(t)||e.push(t)})),e}),[]).sort(((e,t)=>3-(6&e.compareDocumentPosition(t))))}e.find=f,e.is=function(e,t){const s=c(t)[0][0];return e.matches(s.selector)&&i(e,s.filters)},e.pseudos=p,e.query=h}));
