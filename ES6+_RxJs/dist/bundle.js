!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t,n){const r=document.createElement("div");r.className="login-component",e.appendChild(r);const l=document.createElement("label");if(l.innerHTML=t,r.appendChild(l),n){const e=document.createElement("select");e.name="Category",e.multiple=!0,r.appendChild(e),o(e,"50m Freestyle","50free"),o(e,"100m Freesyle","100free"),o(e,"200m Freesyle","200free"),o(e,"50m Backstroke","50back"),o(e,"100m Backstroke","100back"),o(e,"200m Backstroke","200back"),o(e,"50m Butterfly","50fly"),o(e,"100m Butterfly","100fly"),o(e,"200m Butterfly","200fly"),o(e,"50m Breastsroke","50breast"),o(e,"100m Breaststroke","100breast"),o(e,"200m Breaststroke","200breast"),o(e,"200m Individual Medley","200IM"),o(e,"400m Individual Medley","400IM")}else{const e=document.createElement("input");r.appendChild(e)}}function o(e,t,n){let r=document.createElement("option");r.innerHTML=t,r.value=n,e.appendChild(r)}n.r(t),function(e){const t=document.createElement("div");t.className="login-form",e.appendChild(t);let n=document.createElement("label");n.innerHTML="Swimmer registration",e.appendChild(n),r(t,"First name",!1),r(t,"Last name",!1),r(t,"Club",!1),r(t,"Select events(Use CTRL for multiple selection)",!0)}(document.body)}]);