!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=1)}([function(t,e,n){t.exports=n(4)},function(t,e,n){n(2),t.exports=n(5)},function(t,e,n){"use strict";n.r(e),function(t){var r=n(0),o=n.n(r);function i(t,e,n,r,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function c(t){i(a,r,o,c,s,"next",t)}function s(t){i(a,r,o,c,s,"throw",t)}c(void 0)}))}}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}t.ibox=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;c(this,t),null===e?(this.object_name="i"+ibox_utils.randomString(4)+"x",this.create()):this.object_name=e}var e,n;return u(t,[{key:"create",value:function(){null!=document.querySelector(".ibox.frame."+this.object_name)&&this.remove(),null!=document.querySelector("body")?(document.querySelector("body").innerHTML+='\n    <div class="ibox frame '.concat(this.object_name,'" data-allow-close="true" data-content="true" data-open="false" onclick="(new ibox(\'').concat(this.object_name,'\')).close(event)">\n        <div style="display:none" class="ibox scrollHandler ').concat(this.object_name,'" data-id="').concat(this.object_name,'" data-toTop=""></div>\n        <span class="ibox close ').concat(this.object_name,'" data-id="').concat(this.object_name,'" onclick="(new ibox(\'').concat(this.object_name,'\')).close(event)">&times;</span>\n        <div class="ibox loader ').concat(this.object_name,'" data-id="').concat(this.object_name,'">\n            <div class="ibox bounce1"></div>\n            <div class="ibox bounce2"></div>\n            <div class="ibox bounce3"></div>\n        </div>\n        <div class="ibox content ').concat(this.object_name,'" data-id="').concat(this.object_name,'"></div>\n        <div style="clear:both; width:0;height:0;"></div>\n    </div>\n        '),this.fire("created"),this.content_hide(),this.allow_close(!0)):console.error("There is no body to add the iBox to. Please run the creation (or object instantiation) later, e.g. at the end of the body.")}},{key:"remove",value:function(){this.fire("destroy"),this.allow_close(!0),this.close(),this.get_dom().remove()}},{key:"scroll_handle",value:function(t){"true"===this.get_dom().dataset.changed&&(this.get_dom().dataset.changed="false",this.get_dom().scrollTop=0),t?(document.querySelector(".ibox.scrollHandler."+this.object_name).dataset.toTop=window.scrollY,document.querySelector("body").style.overflowY="hidden",document.querySelector("body").style.marginTop=(-1*window.scrollY).toString()+"px",document.querySelector("body").style.paddingRight=ibox_utils.getScrollbarWidth()+"px"):(document.querySelector("body").style.overflowY="auto",document.querySelector("body").style.marginTop="0px",document.querySelector("body").style.paddingRight="0px",window.scroll(window.scrollX,document.querySelector(".ibox.scrollHandler."+this.object_name).dataset.toTop))}},{key:"close",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(null==t||"true"==this.get_dom().dataset.open&&(t.target==this.get_dom()||t.target==this.get_dom().querySelector(".close")))return this.display(!1)}},{key:"hide",value:function(){return this.close()}},{key:"allow_close",value:function(t){this.get_dom().dataset.allowClose=t.toString(),t?this.get_dom().querySelector(".close").classList.add("visible"):this.get_dom().querySelector(".close").classList.remove("visible")}},{key:"open",value:function(){return this.display(!0)}},{key:"show",value:function(){return this.open()}},{key:"display",value:function(t){ibox_utils.closeable(this.object_name)||0!=t?(this.scroll_handle(t),this.get_dom().dataset.open=t.toString(),t?(this.fire("open"),this.get_dom().classList.add("visible"),"true"==this.get_dom().dataset.content&&this.content_show()):(this.fire("close"),this.content_display()?this.get_dom().dataset.content="true":this.get_dom().dataset.content="false",this.get_dom().classList.remove("visible"),this.content_hide())):this.fire("close_failed")}},{key:"event_add",value:function(t,e){return this.get_dom().addEventListener(t,e)}},{key:"content_set",value:function(t){this.get_dom().querySelector(".content").innerHTML=t,ibox_utils.exec_body_scripts(this.get_dom().querySelector(".content"))}},{key:"content_get",value:function(){return this.get_dom().querySelector(".content").innerHTML}},{key:"content_append",value:function(t){this.get_dom().querySelector(".content").innerHTML+=t,ibox_utils.exec_body_scripts(this.get_dom().querySelector(".content"))}},{key:"content_clear",value:function(){return this.content_set("")}},{key:"content_display",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(null==t)return this.get_dom().querySelector(".content").classList.contains("visible");t?(this.fire("content_show"),this.get_dom().querySelector(".loader").classList.remove("visible"),this.get_dom().querySelector(".content").classList.add("visible")):(this.fire("content_hide"),this.get_dom().querySelector(".loader").classList.add("visible"),this.get_dom().querySelector(".content").classList.remove("visible"))}},{key:"content_show",value:function(){return this.content_display(!0)}},{key:"content_hide",value:function(){return this.content_display(!1)}},{key:"content_async_set",value:(n=a(o.a.mark((function t(e){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.fire("content_asnyc_loading"),this.content_hide(),t.next=4,fetch(e);case 4:return n=t.sent,t.next=7,n.text();case 7:r=t.sent,this.content_set(r),this.content_show(),this.fire("content_asnyc_loaded");case 11:case"end":return t.stop()}}),t,this)}))),function(t){return n.apply(this,arguments)})},{key:"content_async_append",value:(e=a(o.a.mark((function t(e){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.fire("content_asnyc_loading"),this.content_hide(),t.next=4,fetch(e);case 4:return n=t.sent,t.next=7,n.text();case 7:r=t.sent,this.content_append(r),this.content_show(),this.fire("content_asnyc_loaded");case 11:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)})},{key:"get_dom",value:function(){return document.querySelector(".ibox.frame."+this.object_name)}},{key:"fire",value:function(t){return ibox.event_fire(t,this.object_name)}}],[{key:"get_instance",value:function(t){return new ibox(t)}},{key:"event_fire",value:function(t,e){return document.querySelector(".ibox.frame."+e).dispatchEvent(new Event(t))}}]),t}(),t.ibox_utils=function(){function t(){c(this,t)}var e;return u(t,null,[{key:"randomString",value:function(t){for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<t;o++)e+=n.charAt(Math.floor(Math.random()*r));return e}},{key:"sleep",value:(e=a(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){return setTimeout(t,e)})));case 1:case"end":return t.stop()}}),t)}))),function(t){return e.apply(this,arguments)})},{key:"isset",value:function(t){return void 0!==t}},{key:"closeable",value:function(t){return"true"==document.querySelector(".ibox.frame."+t).dataset.allowClose}},{key:"getScrollbarWidth",value:function(){var t=document.createElement("div");t.style.visibility="hidden",t.style.overflow="scroll",t.style.msOverflowStyle="scrollbar",document.body.appendChild(t);var e=document.createElement("div");t.appendChild(e);var n=t.offsetWidth-e.offsetWidth;return t.parentNode.removeChild(t),n}},{key:"exec_body_scripts",value:function(t){function e(t){var e=t.text||t.textContent||t.innerHTML||"",n=document.getElementsByTagName("head")[0]||document.documentElement,r=document.createElement("script");r.type="text/javascript";try{r.appendChild(document.createTextNode(e))}catch(t){r.text=e}n.insertBefore(r,n.firstChild),n.removeChild(r)}var n,r,o,i,a,c=[],s=t.childNodes;for(o=0;s[o];o++)r=s[o],a="script",!(i=r).nodeName||i.nodeName.toUpperCase()!==a.toUpperCase()||r.type&&"text/javascript"!==r.type.toLowerCase()||c.push(r);for(o=0;c[o];o++)(n=c[o]).parentNode&&n.parentNode.removeChild(n),e(c[o])}}]),t}(),e.default=ibox}.call(this,n(3))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new S(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return k()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=b(a,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=u(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(t,n,a),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l={};function d(){}function h(){}function f(){}var y={};y[o]=function(){return this};var v=Object.getPrototypeOf,p=v&&v(v(L([])));p&&p!==e&&n.call(p,o)&&(y=p);var m=f.prototype=d.prototype=Object.create(y);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){var r;this._invoke=function(o,i){function a(){return new e((function(r,a){!function r(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==typeof d&&n.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(d).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,c)}))}c(s.arg)}(o,i,r,a)}))}return r=r?r.then(a,a):a()}}function b(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function L(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return h.prototype=m.constructor=f,f.constructor=h,h.displayName=c(f,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,f):(t.__proto__=f,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(_.prototype),_.prototype[i]=function(){return this},t.AsyncIterator=_,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new _(s(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),c(m,a,"Generator"),m[o]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=L,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),x(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;x(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:L(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},function(t,e){}]);