/*
* Hash.js + all plugins
* author : irmmr
* @irmmr
*/

/* Hash.js | ver: 1.2 */
!function(n){"use strict";var t="1.2",e=(Object.freeze({}),function(){});function r(n){return void 0!==typeof n&&null!==n}function o(n){return r(n)&&"string"==typeof n}function i(n){return r(n)&&"boolean"==typeof n}function a(n){return null!==n&&"object"==typeof n}function c(n){return r(n)&&"function"==typeof n}function s(n,t,e){return n.replace(new RegExp(t,"g"),e)}function f(n){return""==n}function h(n){return null==n}const u={lib:function(t={}){this.hash=n.location.hash,this.href=n.location.href,this.remove=function(t={}){if(r(t)&&a(t)){var e="words"in t?Array.isArray(t.words)?t.words:[t.words]:[];e=(e=Array.from(new Set(e))).filter(n=>""!==n);for(var o=0;o<e.length;o++){var i=n.location.hash;n.location.hash=s(i,e[o],""),n.location.hash=s(i,escape(e[o]),"")}}},this.ref=function(n=""){if(!f(n)&&o(n)){var t=document.referrer;return!f(t)&&t==n}return document.referrer},this.have=function(t=""){var e=n.location.hash;return!f(e)&&(!!f(t)||e.includes(t))},this.clear=function(t={}){if(r(t)&&a(t)){var e=!("sharp"in t)||(!i(t.sharp)||t.sharp);n.location.hash;n.location.hash="",e&&history.pushState(null,null,n.location.href.split("#")[0])}},this.get=function(t=!0,e={}){return r(t)&&i(t)&&r(e)&&a(e)?t?n.location.hash.slice(1):n.location.hash:""},this.set=function(t={}){if(r(t)&&a(t)&&"val"in t){var e=t.val;n.location.hash=e}},this.lock=function(t={}){if(r(t)&&a(t)){const t=n.location.hash;n.onhashchange=function(){n.location.hash=t}}}},info:function(n={}){this.version=r(t)?t:"?",this.addons={load:void 0!==u.load,spa:void 0!==u.spa,server:void 0!==u.server}},el:function(n={}){this.replace=function(n={}){if("text"in n){var t=o(n.text)?n.text:"",e="replace"in n?Array.isArray(n.replace)?n.replace:[n.replace]:[];e=Array.from(new Set(e));for(var r=0;r<e.length;r++){var i=e[r];if(a(i)&&"from"in i&&"to"in i){var c=i.to,f=i.from;h(c)||h(f)||t.includes(f)&&(t=s(t,f,c))}}return t}return""}},event:function(t,i=function(){}){if(r(t)&&o(t)){var a=t.toLowerCase();i=r(i)&&c(i)?i:e;switch(a){case"change":n.addEventListener("hashchange",i)}}},ready:!0};"function"==typeof define&&define.amd?define(u):n.Hash=u,"object"==typeof exports&&(module.exports=u())}(window);

/* Hash.js Load | ver: 1.0.2 */
!function(n){"use strict";Object.freeze({});var e=function(){};function t(n){return void 0!==typeof n&&null!==n}function o(n){return t(n)&&"string"==typeof n}function a(n){return t(n)&&"function"==typeof n}function i(n){return document.getElementById(n)}var r=function(r={}){this.page=function(t={}){var o="do"in t&&a(t.do)?t.do:e,i=setInterval(function(){if(r++,void 0!==document.getElementsByTagName("body")[0]){n.clearInterval(i);var e=n.performance.timing.domContentLoadedEventEnd-n.performance.timing.navigationStart,t={loadTime:e,checkLen:r,startLoad:d,endLoad:Date.now(),load:!0};o.call(this,t)}},10),r=0,d=Date.now()},this.component=function(r={}){if("app"in r&&t(i(r.app))){var d=r.app,c="do"in r&&a(r.do)?r.do:e,l="load"in r&&a(r.load)?r.load:e,f="error"in r&&o(r.error)?r.error:"\x3c!--h:error--\x3e",s=i(d),u=s.innerHTML;n.addEventListener("hashchange",function(){var e=0,t=Date.now();l.call(this,{hash:n.location.hash.slice(1),startTime:t});var o=setInterval(function(){e++;var a=s.innerHTML;(a!==u||a.includes(f))&&(n.clearInterval(o),c.call(this,{hash:n.location.hash.slice(1),startTime:t,endTime:Date.now(),loadTime:Date.now()-t,checkLen:e,load:!0}),u=a)},10)})}}};"undefined"!=typeof Hash&&("function"==typeof define&&define.amd?(define(r),!0):(n.Hash.load=r,!0),"object"==typeof exports&&(module.exports=r()))}(window);

/* Hash.js Server | ver: 1.0.0 */
!function(e){"use strict";var t=Object.freeze({}),n=function(){};function r(e){return void 0!==typeof e&&null!==e}function o(e){return r(e)&&"string"==typeof e}function i(e){return null!==e&&"object"==typeof e}function s(e){return r(e)&&"function"==typeof e}function u(e){return""==e}var a=function(a={}){this.ajax=((a={})=>{if("type"in a&&"url"in a){var f=a.type.toLowerCase(),c=a.url;if(o(f)&&o(c)&&("get"==f||"post"==f)){var p="data"in a&&i(a.data)?a.data:t,d="result"in a&&i(a.result)?a.result:t,l="success"in d&&s(d.success)?d.success:n,v="error"in d&&s(d.error)?d.error:n;if("get"==f){var y=null;if(y=e.XMLHttpRequest?new XMLHttpRequest:!!e.ActiveXObject&&new ActiveXObject("Microsoft.XMLHTTP")){y.onreadystatechange=function(){if(y.readyState===XMLHttpRequest.DONE){var e=y.status;200===e?l.call(this,y.responseText):v.call(this,e)}};var w="",h=function(e){var t,n=0;if(r(e)&&i(e))for(t in e)e.hasOwnProperty(t)&&n++;return n}(p),H=0;for(var T in p)if(p.hasOwnProperty(T)){H++;var j=encodeURIComponent(p[T]);w+=H==h?T+"="+j:T+"="+j+"&"}"get"==f&&(u(w)?y.open("GET",c):y.open("GET",c+"?"+w),y.send()),"post"==f&&(y.open("GET",c),y.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u(w)?y.send():y.send(w))}}}}})};"undefined"!=typeof Hash&&("function"==typeof define&&define.amd?(define(a),!0):(e.Hash.server=a,!0),"object"==typeof exports&&(module.exports=a()))}(window);

/* Hash.js Spa | ver: 1.2.1 */
!function(n){"use strict";var t=Object.freeze({}),i=function(){};function e(n){return void 0!==typeof n&&null!==n}function o(n){return e(n)&&"string"==typeof n}function r(n){return!!e(n)&&(function(n){return e(n)&&"boolean"==typeof n}(n)?n:!!o(n)&&"true"==n.toLowerCase())}function a(n,t){return n.hasAttribute(t)?n.getAttribute(t):""}function u(n){return null!==n&&"object"==typeof n}function c(n){return e(n)&&"function"==typeof n}function l(n){return null==n}function f(n){return document.getElementById(n)}class s extends HTMLElement{constructor(){super();var t=a(this,"link"),i=!1;this.hasAttribute("h-top")&&(i=r(a(this,"h-top"))),this.onclick=function(){this.hasAttribute("link")&&(n.location.hash=t),i&&(document.body.scrollTop=0,document.documentElement.scrollTop=0)}}}function h(n){return"main"in n&&o(n.main)?n.main:""}function d(n){return"title"in n&&o(n.title)?n.title:""}function p(t){for(var i=t.split("/"),o=n.location.hash.slice(1).split("/"),r=[],a=[],u=0;u<i.length;u++){var c=i[u];"{any}"==c?r[u]=1:a[u]=c}if(o.length==i.length){for(var l=0,f=[],s=0;s<o.length;s++){o[s]==a[s]?l++:e(r[s])&&1==r[s]&&(l++,f.push(o[s]))}return{status:o.length==l,data:f}}return{status:!1}}function v(t,i){var e=p(t);if(e.status){var o=e.data,r=n.location.hash;i.call(this,o,{hash:r,router:t})}}function m(i,r,a,s,v,m){var y=n.location.hash;""!=y||l(v)||(n.location.hash=v);for(var b=0,g=0;g<m.length;g++){p(m[g]).status&&b++}if(0==b)if(r.hasOwnProperty(a)){var k=r[a];if("main"in k){var A=k.main;e(A)&&(f(i).innerHTML=A)}if("title"in k){var E=k.title;o(E)&&(document.title=E)}if("do"in k){var L=k.do;c(L)&&L.call(this,a,{main:h(k),title:d(k)})}}else if("404"in s){var H="404"in s&&e(s[404])&&u(s[404])?s[404]:t;if("main"in H){var T=h(H);f(i).innerHTML=T}if("title"in H){var w=d(H);document.title=w}if("do"in H){var j=H.do;c(j)&&j.call(this,a)}}}var y=function(r={}){this.app=function(i={}){if("el"in i){var r=i.el;if(o(r)&&!l(f(r))){var a="component"in i&&e(i.component)&&u(i.component)?i.component:t,c="error"in i&&e(i.error)&&u(i.error)?i.error:t,s="def"in i&&o(i.def)&&i.def in a?i.def:null,h="block"in i&&function(n){return e(n)&&Array.isArray(n)}(i.block)?i.block:[],d=n.location.hash.slice(1);m(r,a,d,c,s,h),n.onhashchange=function(){var t=n.location.hash.slice(1);m(r,a,t,c,s,h)}}}},this.router=function(t={}){if("router"in t){var e=t.router;if(o(e)){var r="do"in t&&c(t.do)?t.do:i;v(e,r),n.addEventListener("hashchange",function(){v(e,r)})}}}},b=!1;"undefined"!=typeof Hash&&("function"==typeof define&&define.amd?(define(y),b=!0):(n.Hash.spa=y,b=!0),"object"==typeof exports&&(module.exports=y(),b=!0),b&&n.addEventListener("load",function(){customElements.define("h-link",s)}))}(window);