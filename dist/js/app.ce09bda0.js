(function(e){function n(n){for(var t,o,l=n[0],u=n[1],c=n[2],s=0,f=[];s<l.length;s++)o=l[s],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(t in u)Object.prototype.hasOwnProperty.call(u,t)&&(e[t]=u[t]);p&&p(n);while(f.length)f.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,n=0;n<i.length;n++){for(var r=i[n],t=!0,o=1;o<r.length;o++){var l=r[o];0!==a[l]&&(t=!1)}t&&(i.splice(n--,1),e=u(u.s=r[0]))}return e}var t={},o={app:0},a={app:0},i=[];function l(e){return u.p+"js/"+({home:"home",player:"player"}[e]||e)+"."+{home:"4b002cd5",player:"4a09ea2f"}[e]+".js"}function u(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var n=[],r={player:1};o[e]?n.push(o[e]):0!==o[e]&&r[e]&&n.push(o[e]=new Promise((function(n,r){for(var t="css/"+({home:"home",player:"player"}[e]||e)+"."+{home:"31d6cfe0",player:"5e0caeae"}[e]+".css",a=u.p+t,i=document.getElementsByTagName("link"),l=0;l<i.length;l++){var c=i[l],s=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(s===t||s===a))return n()}var f=document.getElementsByTagName("style");for(l=0;l<f.length;l++){c=f[l],s=c.getAttribute("data-href");if(s===t||s===a)return n()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=n,p.onerror=function(n){var t=n&&n.target&&n.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=t,delete o[e],p.parentNode.removeChild(p),r(i)},p.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(p)})).then((function(){o[e]=0})));var t=a[e];if(0!==t)if(t)n.push(t[2]);else{var i=new Promise((function(n,r){t=a[e]=[n,r]}));n.push(t[2]=i);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=l(e);var f=new Error;c=function(n){s.onerror=s.onload=null,clearTimeout(p);var r=a[e];if(0!==r){if(r){var t=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+t+": "+o+")",f.name="ChunkLoadError",f.type=t,f.request=o,r[1](f)}a[e]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}return Promise.all(n)},u.m=e,u.c=t,u.d=function(e,n,r){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)u.d(r,t,function(n){return e[n]}.bind(null,t));return r},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/media/apis/html-player/",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=n,c=c.slice();for(var f=0;f<c.length;f++)n(c[f]);var p=s;i.push([0,"chunk-vendors"]),r()})({0:function(e,n,r){e.exports=r("cd49")},cd49:function(e,n,r){"use strict";r.r(n);r("cadf"),r("551c"),r("f751"),r("097d");var t=r("2b0e"),o=r("5f5b"),a=r("a925"),i=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{staticClass:"container-fluid",attrs:{id:"app"}},[r("router-view")],1)},l=[],u=r("2877"),c={},s=Object(u["a"])(c,i,l,!1,null,null,null),f=s.exports,p=r("8c4f");t["default"].use(p["a"]);var d=new p["a"]({mode:"hash",base:"/media/apis/html-player/",routes:[{path:"/",name:"home",component:function(){return r.e("home").then(r.bind(null,"bb51"))}},{path:"/player/:identifier",name:"player",component:function(){return r.e("player").then(r.bind(null,"bf5c"))}}]}),h=r("9483");Object(h["a"])("".concat("/media/apis/html-player/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});r("f9e3"),r("2dd8");t["default"].config.productionTip=!1,t["default"].use(a["a"]),t["default"].use(o["a"]);var m={en:{message:{loadingPlayer:"Loading player"}}},g=new a["a"]({locale:"en",messages:m});new t["default"]({i18n:g,router:d,render:function(e){return e(f)}}).$mount("#app")}});
//# sourceMappingURL=app.ce09bda0.js.map