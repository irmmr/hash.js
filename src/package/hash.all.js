/* HashJs(v1.2.3) */
!function(r){"use strict";var n="1.2.3",i="1.2.9",t=(Object.freeze({}),function(){});function e(r){return void 0!==typeof r&&null!==r}function o(r){return e(r)&&"string"==typeof r}function a(r){return e(r)&&"boolean"==typeof r}function f(r){return null!==r&&"object"==typeof r}function s(r){return e(r)&&"function"==typeof r}function h(r,n,i){return r.replace(new RegExp(n,"g"),i)}function c(r){return""==r}function u(r){return null==r}function l(r){return e(r)&&Array.isArray(r)}function v(r){return e(r)?o(r)?r:r.toString():""}function p(r){if(o(r)){var n=r.split("&"),i=0;for(var t in n){var e=n[t].split("="),a=e.length;2==a?o(e[0])&&o(e[1])&&i++:1==a&&o(e[0])&&i++}return n.length==i}return!1}function y(r){if(o(r)&&p(r)){var n=r.split("&"),i={};for(var t in n){var e=n[t].split("="),a=e.length;if(2==a){var f=v(e[0]),s=v(e[1]);i[f]=s}else if(1==a){s=null;i[f=v(e[0])]=s}}return i}return{}}function d(r){if(e(r)&&f(r)){var n="",i=function(r){var n,i=0;if(e(r)&&f(r))for(n in r)r.hasOwnProperty(n)&&i++;return i}(r),t=0;for(var a in r)if(r.hasOwnProperty(a)){t++;var s=r[a],h=o(s)?s:s.toString(),c=encodeURIComponent(h);n+=t==i?a+"="+c:a+"="+c+"&"}return n}return""}const w={lib:function(n={}){this.hash=r.location.hash,this.href=r.location.href,this.remove=function(n={}){if(e(n)&&f(n)){if("words"in n){var i=n.words;if(l(i)){i=(i=Array.from(new Set(i))).filter(r=>""!==r);for(var t=0;t<i.length;t++){var o=r.location.hash;r.location.hash=h(o,i[t],""),r.location.hash=h(o,escape(i[t]),"")}}}if("query"in n){var a=n.query;o=r.location.hash.slice(1);if(l(a)&&p(o)){var s=y(o),c={};for(var t in s)if(s.hasOwnProperty(t))for(var u in a)t!==a[u]&&(c[t]=s[t]);r.location.hash=d(c)}}}},this.ref=function(r=""){if(!c(r)&&o(r)){var n=document.referrer;return!c(n)&&n==r}return document.referrer},this.have=function(n="",i=""){if(o(n)){var t=c(i)||!o(i)?"value":i,e=r.location.hash;if(!c(e))switch(e=e.slice(1),t){case"value":return e.includes(n);case"query":if(p(e))return y(e).hasOwnProperty(n)}}return!1},this.clear=function(n={}){if(e(n)&&f(n)){var i=!("sharp"in n)||(!a(n.sharp)||n.sharp);r.location.hash;r.location.hash="",i&&history.pushState(null,null,r.location.href.split("#")[0])}},this.get=function(n=!0,i={}){if(e(n)&&a(n)&&e(i)&&f(i)){var t=r.location.hash.slice(1);if("query"in i){var s=i.query;if(p(t)){var h=y(t),c={};if(o(s)){if("*"==s){for(var u in h)if(h.hasOwnProperty(u)){var v=h[u];c[u]=v}}else for(var u in h)if(u==s&&h.hasOwnProperty(u)){v=h[u];c[u]=v}}else if(l(s))for(var u in s){v=s[u];h.hasOwnProperty(v)&&(c[v]=h[v])}}return c}return n?r.location.hash.slice(1):r.location.hash}return""},this.set=function(n={}){if(e(n)&&f(n))if("val"in n){var i=n.val;o(i)&&(r.location.hash=i)}else if("query"in n){var t=n.query;r.location.hash.slice(1);if(f(t)){var a=d(t);r.location.hash=a}}},this.add=function(n={}){if(e(n)&&f(n))if("val"in n){var i=n.val;o(i)&&(r.location.hash+=i)}else if("query"in n){var t=n.query,a=r.location.hash.slice(1);if(f(t)){var s=d(t);!c(a)&&p(a)?c(s)||(r.location.hash=a.endsWith("&")?a+s:a+"&"+s):c(a)&&(r.location.hash=s)}}},this.lock=function(n={}){if(e(n)&&f(n)){const n=r.location.hash;r.onhashchange=function(){r.location.hash=n}}},this.is=function(n,i={}){if(o(n)&&e(i)&&f(i)){var t=r.location.hash.slice(1);if(!c(n)){if(!("query"in i))return t==n;var a=i.query;if(p(t)&&o(a)){var s=y(t);if(s.hasOwnProperty(a))return s[a]==n}}}return!1}},info:function(r={}){this.hashVersion=e(n)?n:"?",this.packVersion=e(i)?i:"?",this.addons={load:void 0!==w.load,spa:void 0!==w.spa,server:void 0!==w.server}},el:function(r={}){this.replace=function(r={}){if("text"in r){var n=o(r.text)?r.text:"",i="replace"in r?Array.isArray(r.replace)?r.replace:[r.replace]:[];i=Array.from(new Set(i));for(var t=0;t<i.length;t++){var e=i[t];if(f(e)&&"from"in e&&"to"in e){var a=e.to,s=e.from;u(a)||u(s)||n.includes(s)&&(n=h(n,s,a))}}return n}return""}},event:function(n,i=function(){}){if(e(n)&&o(n)){var a=n.toLowerCase();i=e(i)&&s(i)?i:t;switch(a){case"change":r.addEventListener("hashchange",i)}}},ready:!0};"function"==typeof define&&define.amd?define(w):r.Hash=w,"object"==typeof exports&&(module.exports=w())}(window);

/* HashLoad(v1.1) */
!function(n){"use strict";Object.freeze({});var e=function(){};function t(n){return void 0!==typeof n&&null!==n}function o(n){return t(n)&&"string"==typeof n}function a(n){return t(n)&&"function"==typeof n}function i(n){return document.getElementById(n)}var r=function(r={}){this.page=function(t={}){var o="do"in t&&a(t.do)?t.do:e;("load"in t&&a(t.load)?t.load:e).call(this,{startTime:Date.now()});var i=setInterval(function(){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",c):c()},10),r=0,d=Date.now();function c(){if(r++,void 0!==document.getElementsByTagName("body")[0]){n.clearInterval(i);var e={loadTime:n.performance.timing.domContentLoadedEventEnd-n.performance.timing.navigationStart,checkLen:r,startLoad:d,endLoad:Date.now(),load:!0};o.call(this,e)}}},this.component=function(r={}){if("app"in r&&t(i(r.app))){var d=r.app,c="do"in r&&a(r.do)?r.do:e,l="load"in r&&a(r.load)?r.load:e,f="error"in r&&o(r.error)?r.error:"\x3c!--h:error--\x3e",s=i(d),u=s.innerHTML;n.addEventListener("hashchange",function(){var e=0,t=Date.now();l.call(this,{hash:n.location.hash.slice(1),startTime:t});var o=setInterval(function(){e++;var a=s.innerHTML;(a!==u||a.includes(f)||e>200)&&(n.clearInterval(o),c.call(this,{hash:n.location.hash.slice(1),startTime:t,endTime:Date.now(),loadTime:Date.now()-t,checkLen:e,load:!0}),u=a)},10)})}}};"undefined"!=typeof Hash&&("function"==typeof define&&define.amd?(define(r),!0):(n.Hash.load=r,!0),"object"==typeof exports&&(module.exports=r()))}(window);

/* HashServer(v1.2) */
!function(e){"use strict";var t=Object.freeze({}),n=function(){};function o(e){return void 0!==typeof e&&null!==e}function r(e){return o(e)&&"string"==typeof e}function s(e){return null!==e&&"object"==typeof e}function i(e){return o(e)&&"function"==typeof e}function u(e){return""==e}var a=function(a={}){this.ajax=((a={})=>{if("type"in a&&"url"in a){var c=a.type.toLowerCase(),f=a.url;if(r(c)&&r(f)&&("get"==c||"post"==c)){var p="data"in a&&s(a.data)?a.data:t,d="result"in a&&s(a.result)?a.result:t,l="success"in d&&i(d.success)?d.success:n,y="error"in d&&i(d.error)?d.error:n,v="encode"in d&&r(Result.encode)?Result.encode:"json",w=null;if(w=e.XMLHttpRequest?new XMLHttpRequest:!!e.ActiveXObject&&new ActiveXObject("Microsoft.XMLHTTP")){if(w.onreadystatechange=function(){if(w.readyState===XMLHttpRequest.DONE){var e=w.status;200===e?l.call(this,w.responseText):y.call(this,e)}},"form"==v){var j="",H=function(e){var t,n=0;if(o(e)&&s(e))for(t in e)e.hasOwnProperty(t)&&n++;return n}(p),R=0;for(var T in p)if(p.hasOwnProperty(T)){R++;var h=encodeURIComponent(p[T]);j+=R==H?T+"="+h:T+"="+h+"&"}}else"json"==v&&(j=JSON.stringify(p));"get"==c?(u(j)?w.open("GET",f):w.open("GET",f+"?"+j),w.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),w.send()):"post"==c&&(w.open("POST",f),"form"==v?w.setRequestHeader("Content-Type","application/x-www-form-urlencoded"):w.setRequestHeader("Content-Type","application/json"),u(j)?w.send():w.send(j))}}}})};"undefined"!=typeof Hash&&("function"==typeof define&&define.amd?(define(a),!0):(e.Hash.server=a,!0),"object"==typeof exports&&(module.exports=a()))}(window);

/* HashSpa(v1.5) */
!function(t){"use strict";var n=Object.freeze({}),e=function(){},i={hash_get:"{hash:get}",href_get:"{href:get}"};function r(t){return void 0!==typeof t&&null!==t}function o(t){return r(t)&&"string"==typeof t}function a(t){return r(t)&&"boolean"==typeof t}function u(t,n){return t.hasAttribute(n)?t.getAttribute(n):""}function l(t){return null!==t&&"object"==typeof t}function c(t){return r(t)&&"function"==typeof t}function s(t,n,e){return t.replace(new RegExp(n,"g"),e)}function f(t,n=null){return c(t)?null!==n?t.call(this,n):t.call(this):null}function h(t){return null==t}function d(t){return document.getElementById(t)}class v extends HTMLElement{constructor(){super()}}class p extends HTMLElement{constructor(){super();var n,e=u(this,"link"),i=!1;this.hasAttribute("h-top")&&(n=u(this,"h-top"),i=!!r(n)&&(a(n)?n:!!o(n)&&"true"==n.toLowerCase())),this.onclick=function(){this.hasAttribute("link")&&(t.location.hash=e),i&&(document.body.scrollTop=0,document.documentElement.scrollTop=0)}}}function m(t){return"main"in t&&o(t.main)?t.main:""}function g(t){return"title"in t&&o(t.title)?t.title:""}function y(n){return o(n)&&(n=s(n,i.hash_get,t.location.hash.slice(1)),n=s(n,i.href_get,t.location.href)),n}function w(t){return t}function b(n){for(var e=n.split("/"),i=t.location.hash.slice(1).split("/"),o=[],a=[],u=0;u<e.length;u++){var l=e[u];"{any}"==l?o[u]=1:a[u]=l}if(i.length==e.length){for(var c=0,s=[],f=0;f<i.length;f++){i[f]==a[f]?c++:r(o[f])&&1==o[f]&&(c++,s.push(i[f]))}return{status:i.length==c,data:s}}return{status:!1}}function E(n,e){var i=b(n);if(i.status){var r=i.data,o=t.location.hash;e.call(this,r,{hash:o,router:n})}}function T(e,i,a,u,s,d,v){var p=t.location.hash;""!=p||h(s)||(t.location.hash=s);for(var w=0,E=0;E<d.length;E++){b(d[E]).status&&w++}if(0==w)if(i.hasOwnProperty(a)){var T=i[a];if("main"in T){var L=T.main;r(L)&&(L=y(L),e.innerHTML=f(v,L))}if("title"in T){var H=T.title;o(H)&&(H=y(H),document.title=H)}if("do"in T){var k=T.do;c(k)&&k.call(this,a,{main:f(v,m(T)),title:f(v,g(T))})}}else if("404"in u){var x="404"in u&&r(u[404])&&l(u[404])?u[404]:n;if("main"in x){var A=m(x);A=y(A),e.innerHTML=f(v,A)}if("title"in x){var M=g(x);M=y(M),document.title=M}if("do"in x){var _=x.do;c(_)&&_.call(this,a)}}}var L=function(i={}){this.app=function(e={}){if("el"in e){var i=e.el;if(o(i)&&!h(d(i))){var a="component"in e&&r(e.component)&&l(e.component)?e.component:n,u="error"in e&&r(e.error)&&l(e.error)?e.error:n,s="def"in e&&o(e.def)&&e.def in a?e.def:null,f="app"in e&&o(e.app)?e.app:"<h-router-view></h-router-view>",v="filter"in e&&c(e.filter)?e.filter:w,p="block"in e&&function(t){return r(t)&&Array.isArray(t)}(e.block)?e.block:[],m=t.location.hash.slice(1);d(i).innerHTML=f;var g=d(i).getElementsByTagName("h-router-view")[0],y=h(g)?d(i):g;T(y,a,m,u,s,p,v),t.onhashchange=function(){var n=t.location.hash.slice(1);T(y,a,n,u,s,p,v)}}}},this.router=function(n={}){if("router"in n){var i=n.router;if(o(i)){var r="do"in n&&c(n.do)?n.do:e;E(i,r),t.addEventListener("hashchange",function(){E(i,r)})}}},this.exports=function(t={}){this.render=function(t={}){if("el"in t){var n=t.el;if(o(n)&&!h(d(n))&&"render"in t){var e="view"in t&&!!a(t.view)&&t.view,i=t.render;if(o(i)){var r=d(n).getElementsByTagName("h-router-view")[0];(!h(r)&&e?r:d(n)).innerHTML=i}}}},this.title=function(t,n={}){o(t)&&(document.title=t)}}},H=!1;"undefined"!=typeof Hash&&("function"==typeof define&&define.amd?(define(L),H=!0):(t.Hash.spa=L,H=!0),"object"==typeof exports&&(module.exports=L(),H=!0),H&&t.addEventListener("load",function(){"undefined"!=typeof customElements&&(customElements.define("h-link",p),customElements.define("h-router-view",v))}))}(window);