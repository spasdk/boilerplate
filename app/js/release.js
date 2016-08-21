/*! spa-boilerplate v1.0.0 (webpack: v1.13.2) */
!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var i=n(1);i.once("dom",function(){i.pages={init:n(7),main:n(10)},i.route(i.pages.init)}),i.once("load",function(){i.route(i.pages.main)})},function(t,e,n){"use strict";var i=n(2),s=n(6);Object.keys(s).forEach(function(t){window.addEventListener(t,s[t])}),t.exports=i},function(t,e,n){"use strict";function i(t,e){return!(!t||t.active)&&(t.$node.classList.add("active"),t.active=!0,r.activePage=t,t.events.show&&t.emit("show",{page:t,data:e}),!0)}function s(t){return!(!t||!t.active)&&(t.$node.classList.remove("active"),t.active=!1,r.activePage=null,t.events.hide&&t.emit("hide",{page:t}),!0)}var o=n(3),a=n(4).parse,r=new o;r.query=a(document.location.search.substring(1)),r.config=n(5),r.activePage=null,r.route=function(t,e){var n=r.activePage;return t&&!t.active?(s(r.activePage),i(t,e),this.events.route&&this.emit("route",{from:n,to:t}),!0):(debug.warn("invalid page to route: "+t.id,null,{tags:["route","page",t.id]}),!1)},t.exports=r},function(t,e,n){"use strict";function i(){this.events={}}i.prototype={addListener:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},once:function(t,e){var n=this;this.events[t]=this.events[t]||[],this.events[t].push(function i(){e.apply(n,arguments),n.removeListener(t,i)})},addListeners:function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.addListener(e,t[e])},removeListener:function(t,e){this.events[t]&&(this.events[t]=this.events[t].filter(function(t){return t!==e}),0===this.events[t].length&&(this.events[t]=void 0))},emit:function(t){var e,n=this.events[t];if(n)for(e=0;e<n.length;e++)n[e].apply(this,Array.prototype.slice.call(arguments,1))}},i.prototype.constructor=i,t.exports=i},function(t,e){"use strict";t.exports={parse:function(t){var e={};return t.split("&").forEach(function(t){t=t.split("="),2===t.length&&(e[t[0]]=decodeURIComponent(t[1]))}),e},stringify:function(t){var e=[];return Object.keys(t).forEach(function(n){e.push(n+"="+encodeURIComponent(t[n]))}),e.join("&")}}},function(t,e){"use strict";t.exports={}},function(t,e,n){"use strict";var i=n(2);t.exports={DOMContentLoaded:function(t){i.events.dom&&i.emit("dom",t)},load:function(t){i.events[t.type]&&i.emit(t.type,t)},unload:function(t){i.events[t.type]&&i.emit(t.type,t)},error:function(t){debug.fail("app event: "+t.message,t,{tags:[t.type,"event"]})},keydown:function(t){var e,n=i.activePage;e=n.activeComponent,e&&e!==n&&e.events[t.type]&&e.emit(t.type,t),t.stop||(n.events[t.type]&&n.emit(t.type,t),t.stop||i.events[t.type]&&i.emit(t.type,t))},keypress:function(t){var e=i.activePage;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t)},mousewheel:function(t){var e=i.activePage;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t),t.stop||e.events[t.type]&&e.emit(t.type,t)}}},function(t,e,n){"use strict";var i=n(8),s=new i({$node:window.pageInit});t.exports=s},function(t,e,n){"use strict";function i(t){t=t||{},this.active=!1,this.activeComponent=null,t.className="page "+(t.className||""),s.call(this,t),this.active=this.$node.classList.contains("active"),null===this.$node.parentNode&&document.body.appendChild(this.$node),this.page=this}var s=n(9);i.prototype=Object.create(s.prototype),i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";function i(t){var e,n=this;if(t=t||{},this.visible=!0,this.focusable=!0,this.$node=null,this.$body=null,this.parent=null,this.children=[],this.propagate=!!t.propagate,o.call(this,t.data),this.$node=t.$node||document.createElement("div"),this.$body=t.$body||this.$node,this.$node.className+=" component "+(t.className||""),this.id=t.id||this.$node.id||"cid"+a++,t.parent&&t.parent.add(this),t.visible===!1&&this.hide(),t.focusable===!1&&(this.focusable=!1),this.defaultEvents){t.events=t.events||{};for(e in this.defaultEvents)t.events[e]=t.events[e]||this.defaultEvents[e]}t.events&&Object.keys(t.events).forEach(function(e){n.addListener(e,t.events[e])}),t.children&&this.add.apply(this,t.children),this.$node.addEventListener("click",function(t){n.focus(),n.events.click&&n.emit("click",t),t.stopPropagation()})}var s=n(2),o=n(3),a=0;i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.defaultEvents=null,i.prototype.add=function(t){var e;for(e=0;e<arguments.length;e++)t=arguments[e],this.children.push(t),t.parent=this,t.$node&&null===t.$node.parentNode&&this.$body.appendChild(t.$node),this.events.add&&this.emit("add",{item:t})},i.prototype.remove=function(){this.parent&&(s.activePage.activeComponent===this&&(this.blur(),this.parent.focus()),this.parent.children.splice(this.parent.children.indexOf(this),1)),this.children.forEach(function(t){t.remove()}),this.events={},this.$node.parentNode.removeChild(this.$node),this.events.remove&&this.emit("remove")},i.prototype.focus=function(t){var e=s.activePage,n=e.activeComponent;return!(!this.focusable||this===n)&&(n&&n.blur(),e.activeComponent=n=this,n.$node.classList.add("focus"),n.events.focus&&n.emit("focus",t),!0)},i.prototype.blur=function(){var t=s.activePage,e=t.activeComponent;return this.$node.classList.remove("focus"),this===e?(t.activeComponent=null,this.events.blur&&this.emit("blur"),!0):(debug.warn("component "+this.constructor.name+"#"+this.id+" attempt to blur without link to a page",null,{tags:["blur","component",this.constructor.name,this.id]}),!1)},i.prototype.show=function(t){return!!this.visible||(this.$node.classList.remove("hidden"),this.visible=!0,this.events.show&&this.emit("show",t),!0)},i.prototype.hide=function(){return!this.visible||(this.$node.classList.add("hidden"),this.visible=!1,this.events.hide&&this.emit("hide"),!0)},t.exports=i},function(t,e,n){"use strict";var i=n(8),s=new i({$node:window.pageMain});t.exports=s}]);
//# sourceMappingURL=release.map