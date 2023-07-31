!function(e){"function"==typeof define&&define.amd?define("mainPage",e):e()}((function(){"use strict";var e,t;e=function(e){!function(t,n){var a=function(e,t,n){var a,i;if(function(){var t,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in i=e.lazySizesConfig||e.lazysizesConfig||{},n)t in i||(i[t]=n[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:i,noSupport:!0};var o,s,r,l,d,c,u,f,m,y,h,z,p,g,v,C,b,E,A,w,_,M,N,L,x,W,S,B,F,T,R,$,D,P,k,H,O,q,I,j,U,G,J,K,Q,V=t.documentElement,X=e.HTMLPictureElement,Y="addEventListener",Z="getAttribute",ee=e[Y].bind(e),te=e.setTimeout,ne=e.requestAnimationFrame||te,ae=e.requestIdleCallback,ie=/^picture$/i,oe=["load","error","lazyincluded","_lazyloaded"],se={},re=Array.prototype.forEach,le=function(e,t){return se[t]||(se[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),se[t].test(e[Z]("class")||"")&&se[t]},de=function(e,t){le(e,t)||e.setAttribute("class",(e[Z]("class")||"").trim()+" "+t)},ce=function(e,t){var n;(n=le(e,t))&&e.setAttribute("class",(e[Z]("class")||"").replace(n," "))},ue=function(e,t,n){var a=n?Y:"removeEventListener";n&&ue(e,t),oe.forEach((function(n){e[a](n,t)}))},fe=function(e,n,i,o,s){var r=t.createEvent("Event");return i||(i={}),i.instance=a,r.initEvent(n,!o,!s),r.detail=i,e.dispatchEvent(r),r},me=function(t,n){var a;!X&&(a=e.picturefill||i.pf)?(n&&n.src&&!t[Z]("srcset")&&t.setAttribute("srcset",n.src),a({reevaluate:!0,elements:[t]})):n&&n.src&&(t.src=n.src)},ye=function(e,t){return(getComputedStyle(e,null)||{})[t]},he=function(e,t,n){for(n=n||e.offsetWidth;n<i.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},ze=(G=[],J=U=[],K=function(){var e=J;for(J=U.length?G:U,I=!0,j=!1;e.length;)e.shift()();I=!1},Q=function(e,n){I&&!n?e.apply(this,arguments):(J.push(e),j||(j=!0,(t.hidden?te:ne)(K)))},Q._lsFlush=K,Q),pe=function(e,t){return t?function(){ze(e)}:function(){var t=this,n=arguments;ze((function(){e.apply(t,n)}))}},ge=function(e){var t,a=0,o=i.throttleDelay,s=i.ricTimeout,r=function(){t=!1,a=n.now(),e()},l=ae&&s>49?function(){ae(r,{timeout:s}),s!==i.ricTimeout&&(s=i.ricTimeout)}:pe((function(){te(r)}),!0);return function(e){var i;(e=!0===e)&&(s=33),t||(t=!0,(i=o-(n.now()-a))<0&&(i=0),e||i<9?l():te(l,i))}},ve=function(e){var t,a,i=99,o=function(){t=null,e()},s=function(){var e=n.now()-a;e<i?te(s,i-e):(ae||o)(o)};return function(){a=n.now(),t||(t=te(s,i))}},Ce=(b=/^img$/i,E=/^iframe$/i,A="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),w=0,_=0,M=0,N=-1,L=function(e){M--,(!e||M<0||!e.target)&&(M=0)},x=function(e){return null==C&&(C="hidden"==ye(t.body,"visibility")),C||!("hidden"==ye(e.parentNode,"visibility")&&"hidden"==ye(e,"visibility"))},W=function(e,n){var a,i=e,o=x(e);for(z-=n,v+=n,p-=n,g+=n;o&&(i=i.offsetParent)&&i!=t.body&&i!=V;)(o=(ye(i,"opacity")||1)>0)&&"visible"!=ye(i,"overflow")&&(a=i.getBoundingClientRect(),o=g>a.left&&p<a.right&&v>a.top-1&&z<a.bottom+1);return o},B=ge(S=function(){var e,n,o,s,r,l,u,m,b,E,L,S,B=a.elements;if((f=i.loadMode)&&M<8&&(e=B.length)){for(n=0,N++;n<e;n++)if(B[n]&&!B[n]._lazyRace)if(!A||a.prematureUnveil&&a.prematureUnveil(B[n]))k(B[n]);else if((m=B[n][Z]("data-expand"))&&(l=1*m)||(l=_),E||(E=!i.expand||i.expand<1?V.clientHeight>500&&V.clientWidth>500?500:370:i.expand,a._defEx=E,L=E*i.expFactor,S=i.hFac,C=null,_<L&&M<1&&N>2&&f>2&&!t.hidden?(_=L,N=0):_=f>1&&N>1&&M<6?E:w),b!==l&&(y=innerWidth+l*S,h=innerHeight+l,u=-1*l,b=l),o=B[n].getBoundingClientRect(),(v=o.bottom)>=u&&(z=o.top)<=h&&(g=o.right)>=u*S&&(p=o.left)<=y&&(v||g||p||z)&&(i.loadHidden||x(B[n]))&&(c&&M<3&&!m&&(f<3||N<4)||W(B[n],l))){if(k(B[n]),r=!0,M>9)break}else!r&&c&&!s&&M<4&&N<4&&f>2&&(d[0]||i.preloadAfterLoad)&&(d[0]||!m&&(v||g||p||z||"auto"!=B[n][Z](i.sizesAttr)))&&(s=d[0]||B[n]);s&&!r&&k(s)}}),T=pe(F=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(L(e),de(t,i.loadedClass),ce(t,i.loadingClass),ue(t,R),fe(t,"lazyloaded"))}),R=function(e){T({target:e.target})},$=function(e,t){var n=e.getAttribute("data-load-mode")||i.iframeLoadMode;0==n?e.contentWindow.location.replace(t):1==n&&(e.src=t)},D=function(e){var t,n=e[Z](i.srcsetAttr);(t=i.customMedia[e[Z]("data-media")||e[Z]("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},P=pe((function(e,t,n,a,o){var s,r,l,d,c,f;(c=fe(e,"lazybeforeunveil",t)).defaultPrevented||(a&&(n?de(e,i.autosizesClass):e.setAttribute("sizes",a)),r=e[Z](i.srcsetAttr),s=e[Z](i.srcAttr),o&&(d=(l=e.parentNode)&&ie.test(l.nodeName||"")),f=t.firesLoad||"src"in e&&(r||s||d),c={target:e},de(e,i.loadingClass),f&&(clearTimeout(u),u=te(L,2500),ue(e,R,!0)),d&&re.call(l.getElementsByTagName("source"),D),r?e.setAttribute("srcset",r):s&&!d&&(E.test(e.nodeName)?$(e,s):e.src=s),o&&(r||d)&&me(e,{src:s})),e._lazyRace&&delete e._lazyRace,ce(e,i.lazyClass),ze((function(){var t=e.complete&&e.naturalWidth>1;f&&!t||(t&&de(e,i.fastLoadedClass),F(c),e._lazyCache=!0,te((function(){"_lazyCache"in e&&delete e._lazyCache}),9)),"lazy"==e.loading&&M--}),!0)})),k=function(e){if(!e._lazyRace){var t,n=b.test(e.nodeName),a=n&&(e[Z](i.sizesAttr)||e[Z]("sizes")),o="auto"==a;(!o&&c||!n||!e[Z]("src")&&!e.srcset||e.complete||le(e,i.errorClass)||!le(e,i.lazyClass))&&(t=fe(e,"lazyunveilread").detail,o&&be.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,M++,P(e,t,o,a,n))}},H=ve((function(){i.loadMode=3,B()})),q=function(){c||(n.now()-m<999?te(q,999):(c=!0,i.loadMode=3,B(),ee("scroll",O,!0)))},{_:function(){m=n.now(),a.elements=t.getElementsByClassName(i.lazyClass),d=t.getElementsByClassName(i.lazyClass+" "+i.preloadClass),ee("scroll",B,!0),ee("resize",B,!0),ee("pageshow",(function(e){if(e.persisted){var n=t.querySelectorAll("."+i.loadingClass);n.length&&n.forEach&&ne((function(){n.forEach((function(e){e.complete&&k(e)}))}))}})),e.MutationObserver?new MutationObserver(B).observe(V,{childList:!0,subtree:!0,attributes:!0}):(V[Y]("DOMNodeInserted",B,!0),V[Y]("DOMAttrModified",B,!0),setInterval(B,999)),ee("hashchange",B,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(e){t[Y](e,B,!0)})),/d$|^c/.test(t.readyState)?q():(ee("load",q),t[Y]("DOMContentLoaded",B),te(q,2e4)),a.elements.length?(S(),ze._lsFlush()):B()},checkElems:B,unveil:k,_aLSL:O=function(){3==i.loadMode&&(i.loadMode=2),H()}}),be=(s=pe((function(e,t,n,a){var i,o,s;if(e._lazysizesWidth=a,a+="px",e.setAttribute("sizes",a),ie.test(t.nodeName||""))for(o=0,s=(i=t.getElementsByTagName("source")).length;o<s;o++)i[o].setAttribute("sizes",a);n.detail.dataAttr||me(e,n.detail)})),r=function(e,t,n){var a,i=e.parentNode;i&&(n=he(e,i,n),(a=fe(e,"lazybeforesizes",{width:n,dataAttr:!!t})).defaultPrevented||(n=a.detail.width)&&n!==e._lazysizesWidth&&s(e,i,a,n))},{_:function(){o=t.getElementsByClassName(i.autosizesClass),ee("resize",l)},checkElems:l=ve((function(){var e,t=o.length;if(t)for(e=0;e<t;e++)r(o[e])})),updateElem:r}),Ee=function(){!Ee.i&&t.getElementsByClassName&&(Ee.i=!0,be._(),Ce._())};return te((function(){i.init&&Ee()})),a={cfg:i,autoSizer:be,loader:Ce,init:Ee,uP:me,aC:de,rC:ce,hC:le,fire:fe,gW:he,rAF:ze}}(t,t.document,Date);t.lazySizes=a,e.exports&&(e.exports=a)}("undefined"!=typeof window?window:{})},e(t={exports:{}},t.exports);window.addEventListener("load",(e=>{const t=window.location.origin,n=window.innerWidth<=767;setTimeout((()=>{((e,t,n)=>{const a=n||`s-${t}`;if(document.getElementById(a))return!1;const i=document.querySelector("body"),o=document.createElement("script");o.id=a,o.src=e,o.type="module",o.async=!0,i.appendChild(o)})(`${t}/wp-content/themes/FFerma/js/loaded/pages/main/animations.js`,"animations","animations")}),n?3e3:0)}))}));