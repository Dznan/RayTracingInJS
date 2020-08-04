var RayTracing=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=function(){function t(t,e,n){this.imageData="number"==typeof t?new ImageData(t,e):new ImageData(t,e,n),this.data=this.imageData.data}return t.prototype.getPixel=function(t,e){var n=e*this.imageData.width+t<<2;return[this.data[n],this.data[n+1],this.data[n+2],this.data[n+3]]},t.prototype.setPixel=function(t,e,n){var r=e*this.imageData.width+t<<2;this.data[r]=n[0],this.data[r+1]=n[1],this.data[r+2]=n[2],this.data[r+3]=n.length>3?this.data[3]:255},Object.defineProperty(t.prototype,"width",{get:function(){return this.imageData.width},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.imageData.height},enumerable:!1,configurable:!0}),t}(),i=function(){function t(){}return t.degreeToRadians=function(t){return t*Math.PI/180},t.random=function(t,e){return t?(e-t)*Math.random()+t:Math.random()},t.clamp=function(t,e,n){return Math.min(Math.max(t,e),n)},t.sampleColor=function(e){for(var n=e.length,r=new o(0,0,0),i=0,a=e;i<a.length;i++){var u=a[i];r=r.add(u)}return(r=(r=r.scale(1/n)).apply(Math.sqrt).apply((function(e){return t.clamp(e,0,.99999)}))).scale(256)},t.randomInUnitSphere=function(){for(;;){var t=o.random(-1,1);if(!(t.magnitude()>=1))return t}},t.randomUnitVector=function(){var e=t.random(0,2*Math.PI),n=t.random(-1,1),r=Math.sqrt(1-n*n);return new o(r*Math.cos(e),r*Math.sin(e),n)},t.randomInHemisphere=function(e){var n=t.randomInUnitSphere();return o.dot(n,e)>0?n:n.neg()},t.reflect=function(t,e){return t.sub(e.scale(2*o.dot(t,e)))},t.refract=function(t,e,n){var r=o.dot(t.neg(),e),i=t.add(e.scale(r)).scale(n),a=e.scale(-Math.sqrt(Math.abs(1-i.magnitude()*i.magnitude())));return i.add(a)},t}(),o=function(){function t(e,n,r){var i=[0,0,0];"number"==typeof e?i=[e,n,r]:Array.isArray(e)?i=t.fromValues.apply(t,e):e instanceof t&&(i=t.fromValues(e[0],e[1],e[2])),this[0]=i[0],this[1]=i[1],this[2]=i[2]}return t.zeros=function(){return new t(0,0,0)},t.random=function(e,n){return e?new t(i.random(e,n),i.random(e,n),i.random(e,n)):new t(i.random(),i.random(),i.random())},t.fromValues=function(t,e,n){return Array.isArray(t)?[t[0],t[1],t[2]]:[t,e,n]},t.add=function(e,n,r){return e||(e=t.zeros()),e[0]=n[0]+r[0],e[1]=n[1]+r[1],e[2]=n[2]+r[2],e},t.sub=function(e,n,r){return e||(e=t.zeros()),e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],e},t.mul=function(e,n,r){return e||(e=t.zeros()),e[0]=n[0]*r[0],e[1]=n[1]*r[1],e[2]=n[2]*r[2],e},t.scale=function(e,n,r){return e||(e=t.zeros()),e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e},t.divide=function(e,n,r){return e||(e=t.zeros()),e[0]=n[0]/r,e[1]=n[1]/r,e[2]=n[2]/r,e},t.neg=function(e,n){return e||(e=t.zeros()),e[0]=-n[0],e[1]=-n[1],e[2]=-n[2],e},t.dot=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]},t.magnitude=function(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])},t.uniform=function(e){return t.divide(void 0,e,t.magnitude(e))},t.apply=function(e,n,r){return e||(e=t.zeros()),e[0]=n(r[0]),e[1]=n(r[1]),e[2]=n(r[2]),e},t.clone=function(t,e){t[0]=e[0],t[1]=e[1],t[2]=e[2]},t.prototype.clone=function(){return new t(this[0],this[1],this[2])},t.prototype.add=function(e){return t.add(void 0,this,e)},t.prototype.sub=function(e){return t.sub(void 0,this,e)},t.prototype.mul=function(e){return t.mul(void 0,this,e)},t.prototype.scale=function(e){return t.scale(void 0,this,e)},t.prototype.divide=function(e){return t.divide(void 0,this,e)},t.prototype.neg=function(){return t.neg(void 0,this)},t.prototype.dot=function(e){return t.dot(this,e)},t.prototype.magnitude=function(){return t.magnitude(this)},t.prototype.uniform=function(){return t.uniform(this)},t.prototype.apply=function(e){return t.apply(void 0,e,this)},Object.defineProperty(t.prototype,"length",{get:function(){return 3},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"x",{get:function(){return this[0]},set:function(t){this[0]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this[1]},set:function(t){this[1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return this[2]},set:function(t){this[2]=t},enumerable:!1,configurable:!0}),t}(),a=function(){function t(t,e){this.origin=t?new o(t):o.zeros(),this.direction=e?new o(e):o.zeros()}return t.prototype.at=function(t){return this.direction.scale(t).add(this.origin)},t.clone=function(t,e){t.origin=new o(e.origin),t.direction=new o(e.direction)},t}(),u=function(){function t(){}return t.prototype.setFaceNormal=function(t,e){this.isFrontFace=o.dot(t.direction,e)<0,this.normal=this.isFrontFace?e:e.neg()},t.clone=function(t,e){t.p=new o(e.p),t.normal=new o(e.normal),t.t=e.t,t.isFrontFace=e.isFrontFace,t.material=e.material},t}(),c=function(){function t(){this.hittableObjects=[]}return t.prototype.hit=function(t,e,n,r){for(var i=new u,o=!1,a=n,c=0,s=this.hittableObjects;c<s.length;c++)s[c].hit(t,e,a,i)&&(o=!0,a=i.t,u.clone(r,i));return o},t.prototype.clear=function(){this.hittableObjects=[]},t.prototype.add=function(t){this.hittableObjects.push(t)},t}(),s=function(){function t(t,e,n){this.center=t||new o(t),this.radius=e||1,this.material=n||void 0}return t.prototype.hit=function(t,e,n,r){var i=t.origin.sub(this.center),a=o.dot(t.direction,t.direction),u=o.dot(i,t.direction),c=u*u-a*(o.dot(i,i)-this.radius*this.radius);if(c>0)for(var s=Math.sqrt(c),d=0,f=[(-u-s)/a,(-u+s)/a];d<f.length;d++){var h=f[d];if(h<n&&h>e)return r.t=h,r.p=new o(t.at(r.t)),r.setFaceNormal(t,new o(r.p.sub(this.center).divide(this.radius))),r.material=this.material,!0}return!1},t}(),d=function(){function t(t){this.aspectRatio=t,this.viewportHeight=2,this.viewportWidth=t*this.viewportHeight,this.focalLength=1,this.origin=new o(0,0,0),this.horizontal=new o(this.viewportWidth,0,0),this.vertical=new o(0,this.viewportHeight,0),this.lowerLeftCorner=this.origin.sub(this.horizontal.scale(.5)).sub(this.vertical.scale(.5)).sub(new o(0,0,this.focalLength))}return t.prototype.getRay=function(t,e){return new a(this.origin,this.lowerLeftCorner.add(this.horizontal.scale(t)).add(this.vertical.scale(e)).sub(this.origin))},t}(),f=function(){function t(t){this.albedo=t}return t.prototype.scatter=function(t,e,n,r){var u=e.normal.add(i.randomUnitVector());return a.clone(r,new a(e.p,u)),o.clone(n,this.albedo),!0},t}(),h=function(){function t(t,e){this.albedo=t,this.fuzziness=e}return t.prototype.scatter=function(t,e,n,r){var u=i.reflect(o.uniform(t.direction),e.normal);return a.clone(r,new a(e.p,u.add(i.randomInUnitSphere().scale(this.fuzziness)))),o.clone(n,this.albedo),o.dot(r.direction,e.normal)>0},t}(),l=function(){function t(t){this.refIdx=t}return t.prototype.scatter=function(t,e,n,r){o.clone(n,new o(1,1,1));var u=e.isFrontFace?1/this.refIdx:this.refIdx,c=o.uniform(t.direction),s=i.refract(c,e.normal,u);return a.clone(r,new a(e.p,s)),!0},t}();function p(t,e,n){if(n<=0)return o.zeros();var r=new u;if(e.hit(t,1e-5,1/0,r)){var i=new a,c=o.zeros();return r.material.scatter(t,r,c,i)?c.mul(p(i,e,n-1)):new o(0,0,0)}var s=.5*(o.uniform(t.direction).y+1);return new o(1,1,1).scale(1-s).add(new o(.5,.7,1).scale(s))}window.render=function(){var t=document.querySelector("#canvas");if(t.getContext){var e=t.getContext("2d"),n=document.querySelector("#spp").value,a=document.querySelector("#depth").value;return n=n||4,a=a||50,new Promise((function(u){!function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:50,u=t.width,m=t.height,g=u/m,y=new r(u,m),w=new d(g),v=new c,b=new f(new o(.8,.8,0)),z=new f(new o(.7,.3,.3)),M=new l(1.5),j=new h(new o(.8,.6,.2),1);v.add(new s(new o(0,-100.5,-1),100,b)),v.add(new s(new o(0,0,-1),.5,z)),v.add(new s(new o(-1,0,-1),.5,M)),v.add(new s(new o(1,0,-1),.5,j));for(var O=0;O<u;++O)for(var P=0;P<m;++P){for(var x=[],F=0;F<n;++F){var I=(O+i.random())/(u-1),S=(P+i.random())/(m-1),D=w.getRay(I,S);x.push(p(D,v,a))}y.setPixel(O,m-P-1,i.sampleColor(x))}e.putImageData(y.imageData,0,0)}(t,e,n,a),u()}))}}}]);