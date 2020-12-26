!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).DOMTransformer={})}(this,(function(t){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function c(t,e,i){return(c=h()?Reflect.construct:function(t,e,i){var n=[null];n.push.apply(n,e);var r=new(Function.bind.apply(t,n));return i&&a(r,i.prototype),r}).apply(null,arguments)}function u(t){var e="function"==typeof Map?new Map:void 0;return(u=function(t){if(null===t||(i=t,-1===Function.toString.call(i).indexOf("[native code]")))return t;var i;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return c(t,arguments,s(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),a(n,t)})(t)}function l(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){var e=h();return function(){var i,n=s(t);if(e){var r=s(this).constructor;i=Reflect.construct(n,arguments,r)}else i=n.apply(this,arguments);return l(this,i)}}var p="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};if("undefined"==typeof globalThis&&("undefined"!=typeof window?window.globalThis=window:"undefined"!=typeof self?self.globalThis=self:void 0!==p&&(p.globalThis=p)),String.prototype.contains||(String.prototype.contains=function(t){return-1!=this.indexOf(t)}),String.prototype.startsWith||(String.prototype.startsWith=function(t){return this.length>=t.length&&this.substring(0,t.length)==t}),String.prototype.endsWith||(String.prototype.endsWith=function(t){return this.length>=t.length&&this.substring(this.length-t.length,this.length)==t}),String.prototype.charsCode=function(){return this.split("").reduce((function(t,e){return t+e.charCodeAt(0)}),0)},String.prototype.containsIgnoreCase=function(t){return-1!=this.toUpperCase().indexOf(t.toUpperCase())},String.prototype.toCharArray=function(t){for(var e=t?new Uint8Array(this.length):new Array(this.length),i=0;i<this.length;i++){var n=this.charCodeAt(i);n>255&&(e.bytes=!1),e[i]=n}return e},String.fromCharArray=function(t){var e="";try{e=String.fromCharCode.apply(null,t)}catch(n){for(var i=0;i<t.length;i++)e+=String.fromCharCode(t[i])}return e},String.prototype.pad=function(t,e){return this.length<t?new Array(t-this.length+1).join(e||"-")+this:this.toString()},Number.prototype.pad=function(t){return String(this).length<t?new Array(t-String(this).length+1).join(0)+String(this):this.toString()},Number.prototype.toFloat32=function(){var t=new Float32Array(1);return t[0]=this,t[0]},Object.defineProperty(Array.prototype,"first",{get:function(){return this[0]},configurable:!0}),Object.defineProperty(Array.prototype,"last",{get:function(){return this[this.length-1]},configurable:!0}),Array.prototype.clear=function(){this.length=0},Array.prototype.contains=function(t){return this.indexOf(t)>-1},Array.prototype.clone=function(){return this.map((function(t){return Object.clone(t)}))},Array.prototype.unique=function(){var t=this;return this.filter((function(e,i){return t.indexOf(e)==i}))},Array.prototype.add=function(t){if(!this.contains(t))return this.push(t)},Array.prototype.insert=function(t,e){this.splice(t,0,e)},Array.prototype.remove=function(t){return this.removeAt(this.indexOf(t))},Array.prototype.removeAt=function(t){return t>-1&&this.splice(t,1),this},Array.prototype.replace=function(t,e,i){var n=this.indexOf(t);if(n>-1)if(!i&&e instanceof Array){for(var r=[n,1],o=0;o<e.length;o++)r.push(e[o]);this.splice.apply(this,r)}else this.splice(n,1,e);return this},Array.protoTypedArrays=function(){["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].forEach((function(t){var e=globalThis[t+"Array"];e?(e.from?Array.prototype["to"+t+"Array"]=function(){return e.from(this)}:Array.prototype["to"+t+"Array"]=function(){return new e(this)},Array.from?e.prototype.toArray=function(){return Array.from(this)}:e.prototype.toArray=function(){return Array.prototype.slice.call(this)},e.prototype.clone=function(){return new e(this,this.byteOffset,this.length)},e.prototype.concat=function(){for(var t=this,e=this.length,i=this.length,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];r.forEach((function(i){if(t.constructor!=i.constructor)throw new Error("Concat array from wrong type detected - expected ".concat(t.constructor.name,", found ").concat(i.constructor.name));e+=i.length}));var s=new this.constructor(e);return s.set(this),r.forEach((function(t){s.set(t,i),i+=t.length})),s}):console.warn(t+"Array not found")}))},Array.protoTypedArrays(),delete Array.protoTypedArrays,ArrayBuffer.isTypedArray=function(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)},Function.name||(Function.name="Function"),Array.prototype.constructor.name||(Array.prototype.constructor.name="Array"),Function.create=function(t,e){e||(e=function(){});var i=e.getArguments(),n=new Function("body","return function "+t+"("+i+") {return body.apply(this, arguments);};")(e);return n.toString=function(){return e.toString()},n.toSource=function(){return e.toSource()},n},"name"in Function.prototype||Object.defineProperty(Function.prototype,"name",{configurable:!0,get:function(){var t=this.toString().match(/^function\s([\w$]+)/);return t?t[1]:""}}),Function.prototype.getArguments=function(){var t=this.toString().match(/\((.*?)\)/)[1].replace(/\s*/g,"");return 0==t.length?[]:t.split(",")},Function.prototype.getBody=function(){return this.toString().match(/\{([\s\S]*)\}/m)[1].replace(/^\s*\/\/.*$/gm,"")},Function.prototype.construct=function(t){var e=arguments.callee.caller.arguments;this.getArguments().forEach((function(t,i){this[t]=e[i]}),t)},Function.prototype.createEnum=function(t,e){var i=this;if(this[t])throw new Error("Already exists key: "+t);this[t]=new Object;for(var n=[],r=function(r){var o,s=t+"_"+e[r],a=i[t];a[e[r]]=(o=Object.create(Object.prototype,{constructor:{value:Function.create(s)},type:{value:t},name:{value:e[r]},value:{value:r}}),Object.defineProperty(a,r,{get:function(){return o}}),o),n.push(a[e[r]])},o=0;o<e.length;o++)r(o);Object.defineProperty(this[t],"values",{value:n})},Object.equals=function(t,i){if(t===i)return!0;if(!(t instanceof Object&&i instanceof Object))return!1;if(t.constructor!==i.constructor)return!1;if(t instanceof Array||ArrayBuffer.isTypedArray(t))return t.length==i.length&&t.every((function(t,e){return Object.equals(t,i[e])}));for(var n in t)if(t.hasOwnProperty(n)){if(!i.hasOwnProperty(n))return!1;if(t[n]!==i[n]){if("object"!==e(t[n]))return!1;if(!Object.equals(t[n],i[n]))return!1}}for(var r in i)if(i.hasOwnProperty(r)&&!t.hasOwnProperty(r))return!1;return!0},Object.clone=function(t,i){var n=new Array;return function t(r){if(null===r)return null;if("object"!==e(r)||r.mutable)return r;if("function"==typeof r.clone)return r.clone();for(var o=0;o<n.length;o++)if(n[o][0]===r)return n[o][1];var s=Object.create(Object.getPrototypeOf(r));for(var a in n.push([r,s]),r)i&&"function"==typeof r[a]||r.hasOwnProperty(a)&&(s[a]=t(r[a]));return s}(t)},Object.toSource=function(t,i){if(t&&"object"==e(t)){var n=[];for(var r in t)t.hasOwnProperty(r)&&n.push("".concat(r,": ").concat(Object.toSource(t[r])));return(i?"".concat(i," = "):"")+"{"+n.join(", ")+"};"}if("function"==typeof t){var o=t.toString();return 0!=o.indexOf("function")&&(o="function "+o),o}return t},Object.nameAnonymousFunctions=function(t,e){for(var i in t)"function"!=typeof t[i]||t[i].name||("constructor"==i&&e?Object.defineProperty(t[i],"name",{value:e}):Object.defineProperty(t[i],"name",{value:i}))},JSON.toBase64=function(t){return btoa(JSON.stringify(t))},JSON.fromBase64=function(t){return JSON.parse(atob(t))},JSON.encode=function(t){return JSON.toBase64(t).toCharArray(!0)},JSON.decode=function(t){var e=String.fromCharArray(t);return JSON.fromBase64(e)},Math.toDegrees=function(t){return t*(180/this.PI)},Math.toRadians=function(t){return t*(this.PI/180)},Math.randomInt=function(t,e){return Math.floor(this.random()*(e-t+1))+t},"object"===("undefined"==typeof window?"undefined":e(window))){if(HTMLElement.prototype.getInlineStyle=function(t){return this.style[t]||this.style["-webkit-"+t]||this.style["-khtml-"+t]||this.style["-moz-"+t]||this.style["-ms-"+t]||this.style["-o-"+t]||""},HTMLElement.prototype.setStyle=function(t,e){["-webkit","-khtml","-moz","-ms","-o"].forEach((function(i){this.style[i+"-"+t]=e}),this),this.style[t]=e},HTMLElement.prototype.getStyle=function(t){var e=t,i=t.startsWith("-");i&&(e=t.substring(1));for(var n=e.split("-"),r=n.length-1;r>0;r--)n[r]=n[r].substring(0,1).toUpperCase()+n[r].substring(1);e=n.join("");var o=this.style.display,s=this.style.visibility;"none"==o&&(this.style.visibility="hidden",this.style.display="");var a=window.getComputedStyle(this)[e];if(!i&&void 0===a)for(var h=["-webkit","-khtml","-moz","-ms","-o"],c=0;c<h.length&&"undefined"==(a=this.getStyle(h[c]+"-"+t));c++);return"none"==o&&(this.style.visibility=s,this.style.display="none"),a},HTMLElement.prototype.getMathStyle=function(t,e){var i=e?this.getInlineStyle(t):this.getStyle(t);return"auto"==i&&(i=0),parseFloat(i)},HTMLElement.prototype.getTransformStyle=function(){var t={translate:{x:0,y:0},scale:{x:1,y:1},rotate:{angle:0},skew:{angleX:0,angleY:0},matrix:{a:1,b:0,c:0,d:1,tx:0,ty:0}},e=this.getStyle("transform");if("none"!=e){var i=e.substring(e.indexOf("(")+1,e.indexOf(")")).split(/,\s*/g),n=parseFloat(i[0]),r=parseFloat(i[1]),o=parseFloat(i[2]),s=parseFloat(i[3]),a=parseFloat(i[4]),h=parseFloat(i[5]);t.scale={x:Math.sqrt(n*n+o*o),y:Math.sqrt(s*s+r*r)},t.skew={angleX:Math.tan(o),angleY:Math.tan(r)},t.rotate={angle:Math.atan2(r,n)},t.translate={x:a,y:h},t.matrix={a:n,b:r,c:o,d:s,tx:a,ty:h}}return t},HTMLElement.prototype.toRect=function(){var t=this.style.display,e=this.style.visibility;"none"==t&&(this.style.visibility="hidden",this.style.display="");var i=this.offsetWidth+this.getMathStyle("margin-left")+this.getMathStyle("margin-right"),n=this.offsetHeight+this.getMathStyle("margin-top")+this.getMathStyle("margin-bottom"),r=new DOMRect(this.offsetLeft,this.offsetTop,this.offsetWidth,this.offsetHeight);return r.outerSize=new DOMSize(i,n),"none"==t&&(this.style.visibility=e,this.style.display="none"),r},HTMLImageElement.prototype.toDataURL=function(t){var e=document.createElement("canvas");return e.width=this.width,e.height=this.height,e.getContext("2d").drawImage(this,0,0),e.toDataURL(t||"image/png")},HTMLImageElement.prototype.toBlob=function(t){return new Blob([this.getBytes(t).buffer],{type:t||"image/png"})},HTMLImageElement.prototype.getBytes=function(t){var e=this.toDataURL(t).split(",")[1];return atob(e).toCharArray(!0)},Image.fromBytes=function(t,e,i){var n=new Image;return n.onload=function(){URL.revokeObjectURL(this.src),e&&e.call(this)},n.src=URL.createObjectURL(new Blob([t.buffer||t],{type:"image/"+(i||"png")})),n},CanvasRenderingContext2D.prototype.clearCanvas=function(t){this.clearRect(0,0,this.canvas.width,this.canvas.height),t&&(this.fillStyle=t,this.fillRect(0,0,this.canvas.width,this.canvas.height))},"undefined"==typeof OffscreenCanvas?(window.OffscreenCanvas=function(t,e){var i=document.createElement("canvas");return i.width=t,i.height=e,i},window.OffscreenCanvasRenderingContext2D=CanvasRenderingContext2D):"undefined"!=typeof OffscreenCanvasRenderingContext2D&&(OffscreenCanvasRenderingContext2D.prototype.clearCanvas=CanvasRenderingContext2D.prototype.clearCanvas),Object.defineProperty(Screen.prototype,"deviceWidth",{get:function(){if(90==window.orientation||-90==window.orientation){if(!this.orientation)return this.orientation=!0,this.deviceHeight;delete this.orientation}var t=this.width;return window.matchMedia("(-webkit-device-pixel-ratio)").matches||(t=Math.ceil(t*window.devicePixelRatio))%10!=0&&(t%10>5?t+=10-t%10:t-=t%10),t},configurable:!0}),Object.defineProperty(Screen.prototype,"deviceHeight",{get:function(){if(90==window.orientation||-90==window.orientation){if(!this.orientation)return this.orientation=!0,this.deviceWidth;delete this.orientation}var t=this.height;return window.matchMedia("(-webkit-device-pixel-ratio)").matches||(t=Math.ceil(t*window.devicePixelRatio))%10!=0&&(t%10>5?t+=10-t%10:t-=t%10),t},configurable:!0}),"undefined"==typeof PointerEvent){var y=function(t){o(n,t);var e=f(n);function n(){return i(this,n),e.apply(this,arguments)}return n}(u(Event));window.PointerEvent=y}if("undefined"==typeof TouchEvent){var d=function(t){o(n,t);var e=f(n);function n(){return i(this,n),e.apply(this,arguments)}return n}(u(Event));window.TouchEvent=d}}window.DOMSize=function(t,e){this.width=t,this.height=e},DOMSize.prototype.toJSON=function(){return{width:this.width,height:this.height}},DOMPoint.prototype.transform=function(t){return t instanceof DOMMatrix||(t=DOMMatrix.fromMatrix(t)),this.matrixTransform(t)},DOMPoint.prototype.toString=function(){return"point(".concat(this.x,", ").concat(this.y,", ").concat(this.z,")")},Object.defineProperty(DOMRect.prototype,"size",{get:function(){return new DOMSize(this.width,this.height)},enumerable:!0}),Object.defineProperty(DOMRect.prototype,"center",{get:function(){return new DOMPoint((this.left+this.right)/2,(this.top+this.bottom)/2)},enumerable:!0}),DOMRect.prototype.union=function(t){return t?DOMRect.ofEdges(Math.min(this.left,t.left),Math.min(this.top,t.top),Math.max(this.right,t.right),Math.max(this.bottom,t.bottom)):this},DOMRect.prototype.intersect=function(t){if(t){var e=DOMRect.ofEdges(Math.max(this.left,t.left),Math.max(this.top,t.top),Math.min(this.right,t.right),Math.min(this.bottom,t.bottom));return e.width>0&&e.height>0?e:void 0}},DOMRect.prototype.ceil=function(t){var e=Math.floor(this.left),i=Math.floor(this.top),n=Math.ceil(this.right),r=Math.ceil(this.bottom);if(t){var o=this.width,s=this.height;n=e+(o+=o%2),r=i+(s+=s%2)}return DOMRect.ofEdges(e,i,n,r)},DOMRect.prototype.floor=function(t){var e=Math.ceil(this.left),i=Math.ceil(this.top),n=Math.floor(this.right),r=Math.floor(this.bottom);if(t){var o=this.width,s=this.height;n=e+(o-=o%2),r=i+(s-=s%2)}return DOMRect.ofEdges(e,i,n,r)},DOMRect.prototype.contains=function(t){return this.left<=t.x&&this.right>=t.x&&this.top<=t.y&&this.bottom>=t.y},DOMRect.prototype.transform=function(t){t instanceof DOMMatrix||(t=DOMMatrix.fromMatrix(t));var e=DOMPoint.fromPoint({x:this.left,y:this.top}).transform(t),i=DOMPoint.fromPoint({x:this.right,y:this.top}).transform(t),n=DOMPoint.fromPoint({x:this.left,y:this.bottom}).transform(t),r=DOMPoint.fromPoint({x:this.right,y:this.bottom}).transform(t),o=Math.min(e.x,i.x,n.x,r.x),s=Math.min(e.y,i.y,n.y,r.y),a=Math.max(e.x,i.x,n.x,r.x),h=Math.max(e.y,i.y,n.y,r.y);return DOMRect.ofEdges(o,s,a,h)},DOMRect.prototype.matrixTransform=DOMRect.prototype.transform,DOMRect.prototype.toPath=function(){var t=[];return t.push(this.left,this.top),t.push(this.right,this.top),t.push(this.right,this.bottom),t.push(this.left,this.bottom),t.push(this.left,this.top),t.toFloat32Array()},DOMRect.prototype.toString=function(){return"rect(".concat(this.x,", ").concat(this.y,", ").concat(this.width,", ").concat(this.height,")")},DOMRect.ofEdges=function(t,e,i,n){return new DOMRect(t,e,i-t,n-e)},Object.defineProperty(DOMMatrix.prototype,"tx",{get:function(){return this.e},enumerable:!0}),Object.defineProperty(DOMMatrix.prototype,"dx",{get:function(){return this.e},enumerable:!0}),Object.defineProperty(DOMMatrix.prototype,"ty",{get:function(){return this.f},enumerable:!0}),Object.defineProperty(DOMMatrix.prototype,"dy",{get:function(){return this.f},enumerable:!0}),Object.defineProperty(DOMMatrix.prototype,"multiplicationType",{value:"POST",enumerable:!0,writable:!0}),Object.defineProperty(DOMMatrix,"MultiplicationType",{value:{PRE:"PRE",POST:"POST"},enumerable:!0}),DOMMatrix.nativeFromMatrix=DOMMatrix.fromMatrix,DOMMatrix.prototype.invert=DOMMatrix.prototype.inverse,DOMMatrix.prototype.postMultiply=DOMMatrix.prototype.multiply,DOMMatrix.prototype.postMultiplySelf=DOMMatrix.prototype.multiplySelf,DOMMatrix.prototype.preMultiply=function(t){return t.postMultiply(this)},DOMMatrix.prototype.multiply=function(t){if(t instanceof DOMMatrix||(t=DOMMatrix.fromMatrix(t)),this.multiplicationType==DOMMatrix.MultiplicationType.POST)return this.postMultiply(t);var e=this.preMultiply(t);return e.multiplicationType=DOMMatrix.MultiplicationType.PRE,e},DOMMatrix.prototype.multiplySelf=function(t){t instanceof DOMMatrix||(t=DOMMatrix.fromMatrix(t)),this.multiplicationType==DOMMatrix.MultiplicationType.POST?this.postMultiplySelf(t):this.preMultiplySelf(t)},DOMMatrix.prototype.transformPoint=function(t){return DOMPoint.fromPoint(t).matrixTransform(this)},DOMMatrix.prototype.disassemble=function(){return{translate:{x:this.tx,y:this.ty},rotate:{angle:Math.atan2(this.b,this.a)},skew:{angleX:Math.tan(this.c),angleY:Math.tan(this.b)},scale:{x:Math.sqrt(this.a*this.a+this.c*this.c),y:Math.sqrt(this.d*this.d+this.b*this.b)},matrix:this}},DOMMatrix.fromMatrix=function(t,e){var i;return"string"==typeof t?i=new DOMMatrix(t):("e"in t||(t.e=t.tx||t.dx),"f"in t||(t.f=t.ty||t.dy),i=DOMMatrix.nativeFromMatrix(t)),i.multiplicationType=e||t.multiplicationType||DOMMatrix.MultiplicationType.POST,i},DOMMatrix.fromTranslate=function(t){var e=isFinite(t)?{tx:t,ty:t}:{tx:t.x,ty:t.y};return DOMMatrix.fromMatrix(e)},DOMMatrix.fromRotate=function(t,e){var i=Math.sin(t),n=Math.cos(t),r={a:n,b:i,c:-i,d:n};return e&&(r.tx=e.x-e.x*n+e.y*i,r.ty=e.y-e.x*i-e.y*n),DOMMatrix.fromMatrix(r)},DOMMatrix.fromScale=function(t,e){isFinite(t)&&(t={x:t,y:t});var i={a:t.x,d:t.y};return e&&(i.tx=e.x-e.x*t.x,i.ty=e.y-e.y*t.y),DOMMatrix.fromMatrix(i)};var m=function(){function t(e,n){i(this,t),this.type=e,this.element=n}return r(t,[{key:"reset",value:function(t,e){throw new Error("".concat(this.type,": reset should be implemented"))}},{key:"update",value:function(t){throw new Error("".concat(this.type,": update should be implemented"))}}]),t}(),v=function(t){o(n,t);var e=f(n);function n(t){return i(this,n),e.call(this,"translate",t)}return r(n,[{key:"reset",value:function(t,e){this.lastPoint={x:t.clientX,y:t.clientY}}},{key:"update",value:function(t){var e={x:t.clientX-this.lastPoint.x,y:t.clientY-this.lastPoint.y};return this.lastPoint={x:t.clientX,y:t.clientY},e}}]),n}(m);function g(t,e){var i,n={};return Object.defineProperty(n,"x",{value:e.x-t.x,enumerable:!0}),Object.defineProperty(n,"y",{value:e.y-t.y,enumerable:!0}),Object.defineProperty(n,"length",{get:function(){return isNaN(i)&&(i=Math.sqrt(n.x*n.x+n.y*n.y)),i},enumerable:!0}),n}function M(t,e){var i=t.x*e.x+t.y*e.y,n=t.x*e.y-t.y*e.x;return Math.atan2(n,i)}var x=function(t){o(n,t);var e=f(n);function n(t){return i(this,n),e.call(this,"rotate",t)}return r(n,[{key:"reset",value:function(t,e){var i=this.element.getBoundingClientRect();this.center={x:i.left+i.width/2,y:i.top+i.height/2},this.centerToMouse=g(this.center,{x:t.clientX,y:t.clientY})}},{key:"update",value:function(t){var e=g(this.center,{x:t.clientX,y:t.clientY}),i=M(this.centerToMouse,e);return this.centerToMouse=e,i}}]),n}(m),b={T:"top",B:"bottom",L:"left",R:"right",TL:"top-left",TR:"top-right",BL:"bottom-left",BR:"bottom-right"},O=function(t){o(n,t);var e=f(n);function n(t){var r,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i(this,n),(r=e.call(this,"scale",t)).rotation=o,r.attachHandles(s),r}return r(n,[{key:"attachHandles",value:function(t){var e=this,i=[];(t?["TL","TR","BR","BL"]:["TL","T","TR","R","BR","B","BL","L"]).forEach((function(t){var n=document.createElement("div");n.className="resize-handle ".concat(b[t]),n.type=t,n.onmouseover=function(){return e.updateCursor(n)},e.element.appendChild(n),i.push(n)})),this.handles=i}},{key:"reset",value:function(t,e,i){switch(this.origin=e,this.offsetParent=this.element.offsetParent.getBoundingClientRect(),this.zeroPoint=DOMPoint.fromPoint({x:0,y:0}),t.currentTarget.type){case"TL":this.point=DOMPoint.fromPoint({x:-i.width/2,y:-i.height/2});break;case"T":this.point=DOMPoint.fromPoint({x:0,y:-i.height/2});break;case"TR":this.point=DOMPoint.fromPoint({x:i.width/2,y:-i.height/2});break;case"R":this.point=DOMPoint.fromPoint({x:i.width/2,y:0});break;case"BR":this.point=DOMPoint.fromPoint({x:i.width/2,y:i.height/2});break;case"B":this.point=DOMPoint.fromPoint({x:0,y:i.height/2});break;case"BL":this.point=DOMPoint.fromPoint({x:-i.width/2,y:i.height/2});break;case"L":this.point=DOMPoint.fromPoint({x:-i.width/2,y:0})}this.excludeRotation=!this.rotation||0==this.point.x||0==this.point.y}},{key:"update",value:function(t,e){var i=this.zeroPoint.transform(e),n=this.point.transform(e),r={x:2*i.x-n.x,y:2*i.y-n.y},o=t.clientX,s=t.clientY,a=g(r,{x:o-this.offsetParent.x-this.origin.x,y:s-this.offsetParent.y-this.origin.y}),h=g(r,n),c=this.excludeRotation?0:M(h,a),u=a.length/h.length;return 0==this.point.x?u={x:1,y:u}:0==this.point.y&&(u={x:u,y:1}),{rotate:c,scale:u,point:r}}},{key:"updateCursor",value:function(t){var e,i=this.element.getTransformStyle().rotate.angle;"TR"==t.type||"BL"==t.type?i+=Math.PI/4:"TL"==t.type||"BR"==t.type?i+=3*Math.PI/4:"L"!=t.type&&"R"!=t.type||(i+=Math.PI/2),i<0?i+=2*Math.PI:i>2*Math.PI&&(i-=2*Math.PI),e=i>Math.PI/8&&i<=3*Math.PI/8||i>=9*Math.PI/8&&i<=11*Math.PI/8?"nesw-resize":i>3*Math.PI/8&&i<=5*Math.PI/8||i>=11*Math.PI/8&&i<=13*Math.PI/8?"ew-resize":i>5*Math.PI/8&&i<=7*Math.PI/8||i>=13*Math.PI/8&&i<=15*Math.PI/8?"nwse-resize":"ns-resize",t.style.cursor=e}}]),n}(m),w=function(t){o(n,t);var e=f(n);function n(t){var r,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return i(this,n),(r=e.call(this,"pinch",t)).rotation=o,r}return r(n,[{key:"reset",value:function(t,e){this.origin=e,this.offsetParent=this.element.offsetParent.getBoundingClientRect(),this.lastPinch=this.createPinch(t)}},{key:"update",value:function(t){var e=this.createPinch(t),i=g(this.lastPinch[0],this.lastPinch[1]),n=g(e[0],e[1]),r=(this.lastPinch[0].x+this.lastPinch[1].x)/2,o=(this.lastPinch[0].y+this.lastPinch[1].y)/2,s={x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2},a={x:s.x-r,y:s.y-o},h=this.rotation?M(i,n):0,c=n.length/i.length,u={x:s.x-this.offsetParent.x-this.origin.x,y:s.y-this.offsetParent.y-this.origin.y};return this.lastPinch=e,{pin:u,center:s,origin:this.origin,scale:c,rotation:h,translation:a}}},{key:"createPinch",value:function(t){var e=[];return e[0]={x:t.touches[0].clientX,y:t.touches[0].clientY},e[1]={x:t.touches[1].clientX,y:t.touches[1].clientY},e}}]),n}(m),P=function(){function t(e,n){i(this,t),this.element=e,this.options=n,this.attachEvents()}return r(t,[{key:"reset",value:function(t){this.origin=t}},{key:"detachEvents",value:function(){this.element.removeEventListener("touchstart",this.listener.begin),this.element.removeEventListener("touchmove",this.listener.move),this.element.removeEventListener("touchend",this.listener.end)}},{key:"attachEvents",value:function(){var t=new w(this.element,this.options.rotate);this.listener={begin:this.begin.bind(this,t),move:this.move.bind(this,t),end:this.end.bind(this,t)},this.element.addEventListener("touchstart",this.listener.begin,{passive:!1}),this.element.addEventListener("touchmove",this.listener.move,{passive:!1}),this.element.addEventListener("touchend",this.listener.end,{passive:!1})}},{key:"dispatchEvent",value:function(t,e){t.cancelable&&t.preventDefault(),t.stopPropagation();var i=t.type.replace("touch","pinch").replace("move",""),n=new CustomEvent(i,{detail:e});this.element.dispatchEvent(n)}},{key:"begin",value:function(t,e){var i=this;if(!this.active&&1!=e.touches.length){var n=Array.from(e.touches).filter((function(t){return t.target==i.element||i.element.contains(t.target)}));n.length<2||(this.active=n.map((function(t){return t.identifier})),this.origin||this.reset(this.element.toRect().center),t.reset(e,this.origin),this.dispatchEvent(e))}}},{key:"move",value:function(t,e){if(this.active){var i,n=t.update(e);Object.defineProperty(n,"transform",{get:function(){return i||((i=new DOMMatrix).preMultiplySelf(DOMMatrix.fromRotate(this.rotation,this.pin)),i.preMultiplySelf(DOMMatrix.fromScale(this.scale,this.pin)),i.preMultiplySelf(DOMMatrix.fromTranslate(this.translation))),i}}),this.dispatchEvent(e,n)}}},{key:"end",value:function(t,e){var i=this;!this.active||Array.from(e.touches).filter((function(t){return i.active.includes(t.identifier)})).length>=2||(this.dispatchEvent(e),delete this.active)}}]),t}(),D=[],E={register:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.unregister(t);var i=new P(t,e);return this.debug&&(i.debug=!0),D.push(i),i},unregister:function(t){var e=D.filter((function(e){return e.element==t})).first;e&&(e.detachEvents(),D.remove(e))}},T=function(){function t(e,n){i(this,t),this.element=e,this.options=n,this.minWidth=this.options.minWidth||50,this.minHeight=this.options.minHeight||50,this.phase=t.Phase.END,this.attachEvents()}return r(t,[{key:"attachTransformFrame",value:function(){var t=this;this.frame=document.createElement("div"),this.frame.style.backgroundColor="rgba(0, 255, 0, 0.2)",this.frame.style.display=this.element.style.display,this.frame.style.position="absolute","complete"===document.readyState||"loaded"===document.readyState?this.reset():addEventListener("DOMContentLoaded",(function(e){return t.reset()})),this.element.parentNode.insertBefore(this.frame,this.element)}},{key:"open",value:function(e,i,n){if(this.reset(e),this.element.style.display="",this.debug&&(this.frame.style.display=""),this.phase=t.Phase.READY,i&&!i.isIdentity){var r=i;if(n){DOMMatrix.fromTranslate({x:-n.origin.x,y:-n.origin.y}),DOMMatrix.fromTranslate(n.origin);(r=DOMMatrix.fromMatrix(n.transform)).postMultiplySelf(this.viewTranslate),r.preMultiplySelf(this.originTranslate),r.multiplySelf(i)}this.transform(r)}}},{key:"close",value:function(){this.phase!=t.Phase.END&&(this.dispatchEvent(t.Phase.END),this.element.style.display="none",this.debug&&(this.frame.style.display="none"))}},{key:"reset",value:function(e){var i;e?e=e.ceil(!0):(e=this.element.toRect(),i=DOMMatrix.fromMatrix(this.element.getStyle("transform")),this.phase=t.Phase.READY);var n=e.width<this.minWidth?this.minWidth:e.width,r=e.height<this.minHeight?this.minHeight:e.height;this.bounds=new DOMRect(e.x,e.y,n,r),this.origin=this.bounds.center,this.matrix=new DOMMatrix,this.matrix.multiplicationType=DOMMatrix.MultiplicationType.PRE,this.originTranslate=DOMMatrix.fromTranslate({x:-this.origin.x,y:-this.origin.y}),this.viewTranslate=DOMMatrix.fromTranslate(this.origin),this.pincher.reset(this.bounds.center),this.debug&&(this.frame.style.left=this.bounds.left+"px",this.frame.style.top=this.bounds.top+"px",this.frame.style.width=this.bounds.width+"px",this.frame.style.height=this.bounds.height+"px"),this.applyUI(),i&&!i.isIdentity&&this.transform(i)}},{key:"applyUI",value:function(){var t=this.matrix.disassemble(),e=this.bounds.width*t.scale.x,i=this.bounds.height*t.scale.y,n=this.origin.x-e/2+t.translate.x,r=this.origin.y-i/2+t.translate.y;this.element.style.left=n+"px",this.element.style.top=r+"px",this.element.style.width=e+"px",this.element.style.height=i+"px",0==t.rotate.angle?this.element.style.transform="":this.element.style.transform="rotate("+t.rotate.angle+"rad)",this.debug&&(this.frame.style.transform=this.matrix.toString())}},{key:"detachEvents",value:function(){var t=this;this.listeners.forEach((function(e){if("pinch"==e.type)return t.element.removeEventListener("pinchstart",e.event.begin),t.element.removeEventListener("pinch",e.event.move),t.element.removeEventListener("pinchend",e.event.end),void E.unregister(t.element);e.triggers.forEach((function(t){t.removeEventListener("mousedown",e.event.begin),t.removeEventListener("touchstart",e.event.begin),"scale"==e.type&&t.remove()})),document.removeEventListener("mousemove",e.event.move),document.removeEventListener("touchmove",e.event.move),document.removeEventListener("mouseup",e.event.end),document.removeEventListener("touchend",e.event.end)}))}},{key:"attachEvents",value:function(){var t=this;this.listeners=[];var e={};if(this.options.translate){var i=new v(this.element),n=this.getEventHandlers(i),r=this.options.translateHandle||this.element;this.attachEvent(r,n),this.listeners.push({type:i.type,triggers:[r],event:n}),e.translate=i}if(this.options.rotate){var o=new x(this.element),s=this.getEventHandlers(o);this.options.rotateHandles.forEach((function(e){return t.attachEvent(e,s)})),this.listeners.push({type:o.type,triggers:this.options.rotateHandles,event:s}),e.rotate=o}if(this.options.scale){var a=new O(this.element,this.options.rotate,this.options.keepRatio),h=this.getEventHandlers(a);a.handles.forEach((function(e){return t.attachEvent(e,h)})),this.listeners.push({type:a.type,triggers:a.handles,event:h}),e.scale=a}this.pincher=E.register(this.element,this.options);var c={begin:function(t){this.active&&this.end(e[this.active]),this.active="pinch"}.bind(this),move:function(t){this.transform(t.detail.transform)}.bind(this),end:function(t){delete this.active}.bind(this)};this.element.addEventListener("pinchstart",c.begin),this.element.addEventListener("pinch",c.move),this.element.addEventListener("pinchend",c.end),this.listeners.push({type:"pinch",event:c})}},{key:"getEventHandlers",value:function(t){return{begin:this.begin.bind(this,t),move:this.move.bind(this,t),end:this.end.bind(this,t)}}},{key:"attachEvent",value:function(t,e){t.addEventListener("mousedown",e.begin),document.addEventListener("mousemove",e.move),document.addEventListener("mouseup",e.end),t.addEventListener("touchstart",e.begin,{passive:!1}),document.addEventListener("touchmove",e.move,{passive:!1}),document.addEventListener("touchend",e.end,{passive:!1})}},{key:"dispatchEvent",value:function(e){var i,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"transform",r=arguments.length>2?arguments[2]:void 0;this.phase=e,e==t.Phase.UPDATE?(i={type:n,transform:this.options.origin?this.matrix:this.getViewTransform(this.matrix)},this.options.delta&&r&&(i.delta=this.options.origin?r:this.getViewTransform(r))):e==t.Phase.BEGIN&&(i={origin:this.origin});var o=new CustomEvent(e,{detail:i});this.element.dispatchEvent(o)}},{key:"getTransform",value:function(){return this.options.origin?this.matrix:this.getViewTransform(this.matrix)}},{key:"getOriginTransform",value:function(){return this.matrix}},{key:"getViewTransform",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.matrix,e=new DOMMatrix;return e.multiplicationType=DOMMatrix.MultiplicationType.PRE,e.multiplySelf(this.originTranslate),e.multiplySelf(t),e.multiplySelf(this.viewTranslate),e}},{key:"fixE",value:function(t){var e,i=this;(t.preventDefault(),t.stopPropagation(),t.changedTouches)&&("touchstart"==t.type?(e=t.changedTouches[0],this.touchID=e.identifier):e=Array.from(t.changedTouches).filter((function(t){return t.identifier==i.touchID})).first,e&&(e.currentTarget=e.target),t=e);return t}},{key:"begin",value:function(t,e){isFinite(e.button)&&0!=e.button||this.active||(e=this.fixE(e),"translate"==t.type&&e.currentTarget==this.element&&(this.element.style.cursor="move"),t.reset(e,this.origin,this.bounds.size),this.active=t.type)}},{key:"move",value:function(t,e){if(this.active==t.type&&(e=this.fixE(e))){var i=t.update(e,this.matrix);switch(t.type){case"translate":this.translate(i);break;case"rotate":this.rotate(i);break;case"scale":this.rotate(i.rotate,i.point),this.scale(i.scale,i.point)}}}},{key:"end",value:function(t,e){this.active==t.type&&(e&&!(e=this.fixE(e))||("translate"==t.type&&"move"==this.element.style.cursor&&(this.element.style.cursor=""),delete this.touchID,delete this.active))}},{key:"translate",value:function(e){if(this.phase!=t.Phase.END&&(isFinite(e)&&(e={x:e,y:e}),0!=e.x||0!=e.y)){var i=DOMMatrix.fromTranslate(e);this.transform(i,"translate")}}},{key:"rotate",value:function(e,i){if(this.phase!=t.Phase.END&&0!=e){i||(i=this.getAnchor());var n=DOMMatrix.fromRotate(e,i);this.transform(n,"rotate")}}},{key:"scale",value:function(e,i){if(this.phase!=t.Phase.END&&(isFinite(e)&&(e={x:e,y:e}),1!=e.x||1!=e.y)){i||(i=this.getAnchor());var n=DOMMatrix.fromScale(e,i);this.transform(n,"scale")}}},{key:"transform",value:function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"transform";e instanceof DOMMatrix||(e=DOMMatrix.fromMatrix(e)),e.multiplicationType=this.matrix.multiplicationType;var n=this.matrix.multiply(e);if("scale"==i||"transform"==i){var r=n.disassemble().scale,o=this.bounds.width*r.x,s=this.bounds.height*r.y;if(o<this.minWidth||s<this.minHeight)return}this.matrix=n,this.applyUI(),e.isIdentity||(this.phase==t.Phase.READY&&this.dispatchEvent(t.Phase.BEGIN,i),this.dispatchEvent(t.Phase.UPDATE,i,e))}},{key:"getAnchor",value:function(){return{x:this.matrix.tx,y:this.matrix.ty}}}]),t}();T.Phase={READY:"ready",BEGIN:"transformstart",UPDATE:"transform",END:"transformend"};var S=[],R=!1,A={register:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e.translate&&!e.scale&&!e.rotate)throw new Error("At least one of translate, scale and rotate is required");if(e.rotate){if(!e.rotateHandles)throw new Error("When rotate is available, rotateHandles option is required");if(0==e.rotateHandles.length)throw new Error("When rotate is available, at least one handle is required")}this.unregister(t);var i=new T(t,e);return R&&(i.debug=!0,i.attachTransformFrame()),S.push(i),i},unregister:function(t){var e=S.filter((function(e){return e.element==t})).first;e&&(e.detachEvents(),S.remove(e))}};Object.defineProperty(A,"debug",{get:function(){return R},set:function(t){R=t,E.debug=t},enumerable:!0}),t.PinchEvent=E,t.TransformEvent=A,Object.defineProperty(t,"__esModule",{value:!0})}));
