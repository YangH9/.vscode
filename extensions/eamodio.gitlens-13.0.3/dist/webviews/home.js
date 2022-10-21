(()=>{var Ci={277:(ne,te)=>{"use strict";te.byteLength=b,te.toByteArray=Z,te.fromByteArray=G;for(var M=[],C=[],J=typeof Uint8Array<"u"?Uint8Array:Array,X="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",N=0,B=X.length;N<B;++N)M[N]=X[N],C[X.charCodeAt(N)]=N;C["-".charCodeAt(0)]=62,C["_".charCodeAt(0)]=63;function _(v){var S=v.length;if(S%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var x=v.indexOf("=");x===-1&&(x=S);var k=x===S?0:4-x%4;return[x,k]}function b(v){var S=_(v),x=S[0],k=S[1];return(x+k)*3/4-k}function $(v,S,x){return(S+x)*3/4-x}function Z(v){var S,x=_(v),k=x[0],Q=x[1],A=new J($(v,k,Q)),R=0,P=Q>0?k-4:k,D;for(D=0;D<P;D+=4)S=C[v.charCodeAt(D)]<<18|C[v.charCodeAt(D+1)]<<12|C[v.charCodeAt(D+2)]<<6|C[v.charCodeAt(D+3)],A[R++]=S>>16&255,A[R++]=S>>8&255,A[R++]=S&255;return Q===2&&(S=C[v.charCodeAt(D)]<<2|C[v.charCodeAt(D+1)]>>4,A[R++]=S&255),Q===1&&(S=C[v.charCodeAt(D)]<<10|C[v.charCodeAt(D+1)]<<4|C[v.charCodeAt(D+2)]>>2,A[R++]=S>>8&255,A[R++]=S&255),A}function F(v){return M[v>>18&63]+M[v>>12&63]+M[v>>6&63]+M[v&63]}function E(v,S,x){for(var k,Q=[],A=S;A<x;A+=3)k=(v[A]<<16&16711680)+(v[A+1]<<8&65280)+(v[A+2]&255),Q.push(F(k));return Q.join("")}function G(v){for(var S,x=v.length,k=x%3,Q=[],A=16383,R=0,P=x-k;R<P;R+=A)Q.push(E(v,R,R+A>P?P:R+A));return k===1?(S=v[x-1],Q.push(M[S>>2]+M[S<<4&63]+"==")):k===2&&(S=(v[x-2]<<8)+v[x-1],Q.push(M[S>>10]+M[S>>4&63]+M[S<<2&63]+"=")),Q.join("")}},291:(ne,te,M)=>{"use strict";/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var C=M(277),J=M(608),X=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;te.Buffer=b,te.SlowBuffer=A,te.INSPECT_MAX_BYTES=50;var N=2147483647;te.kMaxLength=N,b.TYPED_ARRAY_SUPPORT=B(),!b.TYPED_ARRAY_SUPPORT&&typeof console<"u";function B(){try{var h=new Uint8Array(1),l={foo:function(){return 42}};return Object.setPrototypeOf(l,Uint8Array.prototype),Object.setPrototypeOf(h,l),h.foo()===42}catch{return!1}}Object.defineProperty(b.prototype,"parent",{enumerable:!0,get:function(){if(!!b.isBuffer(this))return this.buffer}}),Object.defineProperty(b.prototype,"offset",{enumerable:!0,get:function(){if(!!b.isBuffer(this))return this.byteOffset}});function _(h){if(h>N)throw new RangeError('The value "'+h+'" is invalid for option "size"');var l=new Uint8Array(h);return Object.setPrototypeOf(l,b.prototype),l}function b(h,l,u){if(typeof h=="number"){if(typeof l=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return E(h)}return $(h,l,u)}b.poolSize=8192;function $(h,l,u){if(typeof h=="string")return G(h,l);if(ArrayBuffer.isView(h))return S(h);if(h==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof h);if(g(h,ArrayBuffer)||h&&g(h.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(g(h,SharedArrayBuffer)||h&&g(h.buffer,SharedArrayBuffer)))return x(h,l,u);if(typeof h=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');var p=h.valueOf&&h.valueOf();if(p!=null&&p!==h)return b.from(p,l,u);var T=k(h);if(T)return T;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof h[Symbol.toPrimitive]=="function")return b.from(h[Symbol.toPrimitive]("string"),l,u);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof h)}b.from=function(h,l,u){return $(h,l,u)},Object.setPrototypeOf(b.prototype,Uint8Array.prototype),Object.setPrototypeOf(b,Uint8Array);function Z(h){if(typeof h!="number")throw new TypeError('"size" argument must be of type number');if(h<0)throw new RangeError('The value "'+h+'" is invalid for option "size"')}function F(h,l,u){return Z(h),h<=0?_(h):l!==void 0?typeof u=="string"?_(h).fill(l,u):_(h).fill(l):_(h)}b.alloc=function(h,l,u){return F(h,l,u)};function E(h){return Z(h),_(h<0?0:Q(h)|0)}b.allocUnsafe=function(h){return E(h)},b.allocUnsafeSlow=function(h){return E(h)};function G(h,l){if((typeof l!="string"||l==="")&&(l="utf8"),!b.isEncoding(l))throw new TypeError("Unknown encoding: "+l);var u=R(h,l)|0,p=_(u),T=p.write(h,l);return T!==u&&(p=p.slice(0,T)),p}function v(h){for(var l=h.length<0?0:Q(h.length)|0,u=_(l),p=0;p<l;p+=1)u[p]=h[p]&255;return u}function S(h){if(g(h,Uint8Array)){var l=new Uint8Array(h);return x(l.buffer,l.byteOffset,l.byteLength)}return v(h)}function x(h,l,u){if(l<0||h.byteLength<l)throw new RangeError('"offset" is outside of buffer bounds');if(h.byteLength<l+(u||0))throw new RangeError('"length" is outside of buffer bounds');var p;return l===void 0&&u===void 0?p=new Uint8Array(h):u===void 0?p=new Uint8Array(h,l):p=new Uint8Array(h,l,u),Object.setPrototypeOf(p,b.prototype),p}function k(h){if(b.isBuffer(h)){var l=Q(h.length)|0,u=_(l);return u.length===0||h.copy(u,0,0,l),u}if(h.length!==void 0)return typeof h.length!="number"||y(h.length)?_(0):v(h);if(h.type==="Buffer"&&Array.isArray(h.data))return v(h.data)}function Q(h){if(h>=N)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+N.toString(16)+" bytes");return h|0}function A(h){return+h!=h&&(h=0),b.alloc(+h)}b.isBuffer=function(l){return l!=null&&l._isBuffer===!0&&l!==b.prototype},b.compare=function(l,u){if(g(l,Uint8Array)&&(l=b.from(l,l.offset,l.byteLength)),g(u,Uint8Array)&&(u=b.from(u,u.offset,u.byteLength)),!b.isBuffer(l)||!b.isBuffer(u))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(l===u)return 0;for(var p=l.length,T=u.length,V=0,q=Math.min(p,T);V<q;++V)if(l[V]!==u[V]){p=l[V],T=u[V];break}return p<T?-1:T<p?1:0},b.isEncoding=function(l){switch(String(l).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},b.concat=function(l,u){if(!Array.isArray(l))throw new TypeError('"list" argument must be an Array of Buffers');if(l.length===0)return b.alloc(0);var p;if(u===void 0)for(u=0,p=0;p<l.length;++p)u+=l[p].length;var T=b.allocUnsafe(u),V=0;for(p=0;p<l.length;++p){var q=l[p];if(g(q,Uint8Array))V+q.length>T.length?b.from(q).copy(T,V):Uint8Array.prototype.set.call(T,q,V);else if(b.isBuffer(q))q.copy(T,V);else throw new TypeError('"list" argument must be an Array of Buffers');V+=q.length}return T};function R(h,l){if(b.isBuffer(h))return h.length;if(ArrayBuffer.isView(h)||g(h,ArrayBuffer))return h.byteLength;if(typeof h!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof h);var u=h.length,p=arguments.length>2&&arguments[2]===!0;if(!p&&u===0)return 0;for(var T=!1;;)switch(l){case"ascii":case"latin1":case"binary":return u;case"utf8":case"utf-8":return L(h).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return u*2;case"hex":return u>>>1;case"base64":return re(h).length;default:if(T)return p?-1:L(h).length;l=(""+l).toLowerCase(),T=!0}}b.byteLength=R;function P(h,l,u){var p=!1;if((l===void 0||l<0)&&(l=0),l>this.length||((u===void 0||u>this.length)&&(u=this.length),u<=0)||(u>>>=0,l>>>=0,u<=l))return"";for(h||(h="utf8");;)switch(h){case"hex":return We(this,l,u);case"utf8":case"utf-8":return He(this,l,u);case"ascii":return st(this,l,u);case"latin1":case"binary":return Ze(this,l,u);case"base64":return Ie(this,l,u);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return le(this,l,u);default:if(p)throw new TypeError("Unknown encoding: "+h);h=(h+"").toLowerCase(),p=!0}}b.prototype._isBuffer=!0;function D(h,l,u){var p=h[l];h[l]=h[u],h[u]=p}b.prototype.swap16=function(){var l=this.length;if(l%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var u=0;u<l;u+=2)D(this,u,u+1);return this},b.prototype.swap32=function(){var l=this.length;if(l%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var u=0;u<l;u+=4)D(this,u,u+3),D(this,u+1,u+2);return this},b.prototype.swap64=function(){var l=this.length;if(l%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var u=0;u<l;u+=8)D(this,u,u+7),D(this,u+1,u+6),D(this,u+2,u+5),D(this,u+3,u+4);return this},b.prototype.toString=function(){var l=this.length;return l===0?"":arguments.length===0?He(this,0,l):P.apply(this,arguments)},b.prototype.toLocaleString=b.prototype.toString,b.prototype.equals=function(l){if(!b.isBuffer(l))throw new TypeError("Argument must be a Buffer");return this===l?!0:b.compare(this,l)===0},b.prototype.inspect=function(){var l="",u=te.INSPECT_MAX_BYTES;return l=this.toString("hex",0,u).replace(/(.{2})/g,"$1 ").trim(),this.length>u&&(l+=" ... "),"<Buffer "+l+">"},X&&(b.prototype[X]=b.prototype.inspect),b.prototype.compare=function(l,u,p,T,V){if(g(l,Uint8Array)&&(l=b.from(l,l.offset,l.byteLength)),!b.isBuffer(l))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof l);if(u===void 0&&(u=0),p===void 0&&(p=l?l.length:0),T===void 0&&(T=0),V===void 0&&(V=this.length),u<0||p>l.length||T<0||V>this.length)throw new RangeError("out of range index");if(T>=V&&u>=p)return 0;if(T>=V)return-1;if(u>=p)return 1;if(u>>>=0,p>>>=0,T>>>=0,V>>>=0,this===l)return 0;for(var q=V-T,fe=p-u,de=Math.min(q,fe),he=this.slice(T,V),we=l.slice(u,p),pe=0;pe<de;++pe)if(he[pe]!==we[pe]){q=he[pe],fe=we[pe];break}return q<fe?-1:fe<q?1:0};function j(h,l,u,p,T){if(h.length===0)return-1;if(typeof u=="string"?(p=u,u=0):u>2147483647?u=2147483647:u<-2147483648&&(u=-2147483648),u=+u,y(u)&&(u=T?0:h.length-1),u<0&&(u=h.length+u),u>=h.length){if(T)return-1;u=h.length-1}else if(u<0)if(T)u=0;else return-1;if(typeof l=="string"&&(l=b.from(l,p)),b.isBuffer(l))return l.length===0?-1:K(h,l,u,p,T);if(typeof l=="number")return l=l&255,typeof Uint8Array.prototype.indexOf=="function"?T?Uint8Array.prototype.indexOf.call(h,l,u):Uint8Array.prototype.lastIndexOf.call(h,l,u):K(h,[l],u,p,T);throw new TypeError("val must be string, number or Buffer")}function K(h,l,u,p,T){var V=1,q=h.length,fe=l.length;if(p!==void 0&&(p=String(p).toLowerCase(),p==="ucs2"||p==="ucs-2"||p==="utf16le"||p==="utf-16le")){if(h.length<2||l.length<2)return-1;V=2,q/=2,fe/=2,u/=2}function de(Fe,Ue){return V===1?Fe[Ue]:Fe.readUInt16BE(Ue*V)}var he;if(T){var we=-1;for(he=u;he<q;he++)if(de(h,he)===de(l,we===-1?0:he-we)){if(we===-1&&(we=he),he-we+1===fe)return we*V}else we!==-1&&(he-=he-we),we=-1}else for(u+fe>q&&(u=q-fe),he=u;he>=0;he--){for(var pe=!0,Be=0;Be<fe;Be++)if(de(h,he+Be)!==de(l,Be)){pe=!1;break}if(pe)return he}return-1}b.prototype.includes=function(l,u,p){return this.indexOf(l,u,p)!==-1},b.prototype.indexOf=function(l,u,p){return j(this,l,u,p,!0)},b.prototype.lastIndexOf=function(l,u,p){return j(this,l,u,p,!1)};function oe(h,l,u,p){u=Number(u)||0;var T=h.length-u;p?(p=Number(p),p>T&&(p=T)):p=T;var V=l.length;p>V/2&&(p=V/2);for(var q=0;q<p;++q){var fe=parseInt(l.substr(q*2,2),16);if(y(fe))return q;h[u+q]=fe}return q}function ie(h,l,u,p){return ce(L(l,h.length-u),h,u,p)}function se(h,l,u,p){return ce(O(l),h,u,p)}function W(h,l,u,p){return ce(re(l),h,u,p)}function De(h,l,u,p){return ce(Y(l,h.length-u),h,u,p)}b.prototype.write=function(l,u,p,T){if(u===void 0)T="utf8",p=this.length,u=0;else if(p===void 0&&typeof u=="string")T=u,p=this.length,u=0;else if(isFinite(u))u=u>>>0,isFinite(p)?(p=p>>>0,T===void 0&&(T="utf8")):(T=p,p=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var V=this.length-u;if((p===void 0||p>V)&&(p=V),l.length>0&&(p<0||u<0)||u>this.length)throw new RangeError("Attempt to write outside buffer bounds");T||(T="utf8");for(var q=!1;;)switch(T){case"hex":return oe(this,l,u,p);case"utf8":case"utf-8":return ie(this,l,u,p);case"ascii":case"latin1":case"binary":return se(this,l,u,p);case"base64":return W(this,l,u,p);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return De(this,l,u,p);default:if(q)throw new TypeError("Unknown encoding: "+T);T=(""+T).toLowerCase(),q=!0}},b.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Ie(h,l,u){return l===0&&u===h.length?C.fromByteArray(h):C.fromByteArray(h.slice(l,u))}function He(h,l,u){u=Math.min(h.length,u);for(var p=[],T=l;T<u;){var V=h[T],q=null,fe=V>239?4:V>223?3:V>191?2:1;if(T+fe<=u){var de,he,we,pe;switch(fe){case 1:V<128&&(q=V);break;case 2:de=h[T+1],(de&192)===128&&(pe=(V&31)<<6|de&63,pe>127&&(q=pe));break;case 3:de=h[T+1],he=h[T+2],(de&192)===128&&(he&192)===128&&(pe=(V&15)<<12|(de&63)<<6|he&63,pe>2047&&(pe<55296||pe>57343)&&(q=pe));break;case 4:de=h[T+1],he=h[T+2],we=h[T+3],(de&192)===128&&(he&192)===128&&(we&192)===128&&(pe=(V&15)<<18|(de&63)<<12|(he&63)<<6|we&63,pe>65535&&pe<1114112&&(q=pe))}}q===null?(q=65533,fe=1):q>65535&&(q-=65536,p.push(q>>>10&1023|55296),q=56320|q&1023),p.push(q),T+=fe}return Ge(p)}var $e=4096;function Ge(h){var l=h.length;if(l<=$e)return String.fromCharCode.apply(String,h);for(var u="",p=0;p<l;)u+=String.fromCharCode.apply(String,h.slice(p,p+=$e));return u}function st(h,l,u){var p="";u=Math.min(h.length,u);for(var T=l;T<u;++T)p+=String.fromCharCode(h[T]&127);return p}function Ze(h,l,u){var p="";u=Math.min(h.length,u);for(var T=l;T<u;++T)p+=String.fromCharCode(h[T]);return p}function We(h,l,u){var p=h.length;(!l||l<0)&&(l=0),(!u||u<0||u>p)&&(u=p);for(var T="",V=l;V<u;++V)T+=H[h[V]];return T}function le(h,l,u){for(var p=h.slice(l,u),T="",V=0;V<p.length-1;V+=2)T+=String.fromCharCode(p[V]+p[V+1]*256);return T}b.prototype.slice=function(l,u){var p=this.length;l=~~l,u=u===void 0?p:~~u,l<0?(l+=p,l<0&&(l=0)):l>p&&(l=p),u<0?(u+=p,u<0&&(u=0)):u>p&&(u=p),u<l&&(u=l);var T=this.subarray(l,u);return Object.setPrototypeOf(T,b.prototype),T};function ve(h,l,u){if(h%1!==0||h<0)throw new RangeError("offset is not uint");if(h+l>u)throw new RangeError("Trying to access beyond buffer length")}b.prototype.readUintLE=b.prototype.readUIntLE=function(l,u,p){l=l>>>0,u=u>>>0,p||ve(l,u,this.length);for(var T=this[l],V=1,q=0;++q<u&&(V*=256);)T+=this[l+q]*V;return T},b.prototype.readUintBE=b.prototype.readUIntBE=function(l,u,p){l=l>>>0,u=u>>>0,p||ve(l,u,this.length);for(var T=this[l+--u],V=1;u>0&&(V*=256);)T+=this[l+--u]*V;return T},b.prototype.readUint8=b.prototype.readUInt8=function(l,u){return l=l>>>0,u||ve(l,1,this.length),this[l]},b.prototype.readUint16LE=b.prototype.readUInt16LE=function(l,u){return l=l>>>0,u||ve(l,2,this.length),this[l]|this[l+1]<<8},b.prototype.readUint16BE=b.prototype.readUInt16BE=function(l,u){return l=l>>>0,u||ve(l,2,this.length),this[l]<<8|this[l+1]},b.prototype.readUint32LE=b.prototype.readUInt32LE=function(l,u){return l=l>>>0,u||ve(l,4,this.length),(this[l]|this[l+1]<<8|this[l+2]<<16)+this[l+3]*16777216},b.prototype.readUint32BE=b.prototype.readUInt32BE=function(l,u){return l=l>>>0,u||ve(l,4,this.length),this[l]*16777216+(this[l+1]<<16|this[l+2]<<8|this[l+3])},b.prototype.readIntLE=function(l,u,p){l=l>>>0,u=u>>>0,p||ve(l,u,this.length);for(var T=this[l],V=1,q=0;++q<u&&(V*=256);)T+=this[l+q]*V;return V*=128,T>=V&&(T-=Math.pow(2,8*u)),T},b.prototype.readIntBE=function(l,u,p){l=l>>>0,u=u>>>0,p||ve(l,u,this.length);for(var T=u,V=1,q=this[l+--T];T>0&&(V*=256);)q+=this[l+--T]*V;return V*=128,q>=V&&(q-=Math.pow(2,8*u)),q},b.prototype.readInt8=function(l,u){return l=l>>>0,u||ve(l,1,this.length),this[l]&128?(255-this[l]+1)*-1:this[l]},b.prototype.readInt16LE=function(l,u){l=l>>>0,u||ve(l,2,this.length);var p=this[l]|this[l+1]<<8;return p&32768?p|4294901760:p},b.prototype.readInt16BE=function(l,u){l=l>>>0,u||ve(l,2,this.length);var p=this[l+1]|this[l]<<8;return p&32768?p|4294901760:p},b.prototype.readInt32LE=function(l,u){return l=l>>>0,u||ve(l,4,this.length),this[l]|this[l+1]<<8|this[l+2]<<16|this[l+3]<<24},b.prototype.readInt32BE=function(l,u){return l=l>>>0,u||ve(l,4,this.length),this[l]<<24|this[l+1]<<16|this[l+2]<<8|this[l+3]},b.prototype.readFloatLE=function(l,u){return l=l>>>0,u||ve(l,4,this.length),J.read(this,l,!0,23,4)},b.prototype.readFloatBE=function(l,u){return l=l>>>0,u||ve(l,4,this.length),J.read(this,l,!1,23,4)},b.prototype.readDoubleLE=function(l,u){return l=l>>>0,u||ve(l,8,this.length),J.read(this,l,!0,52,8)},b.prototype.readDoubleBE=function(l,u){return l=l>>>0,u||ve(l,8,this.length),J.read(this,l,!1,52,8)};function Se(h,l,u,p,T,V){if(!b.isBuffer(h))throw new TypeError('"buffer" argument must be a Buffer instance');if(l>T||l<V)throw new RangeError('"value" argument is out of bounds');if(u+p>h.length)throw new RangeError("Index out of range")}b.prototype.writeUintLE=b.prototype.writeUIntLE=function(l,u,p,T){if(l=+l,u=u>>>0,p=p>>>0,!T){var V=Math.pow(2,8*p)-1;Se(this,l,u,p,V,0)}var q=1,fe=0;for(this[u]=l&255;++fe<p&&(q*=256);)this[u+fe]=l/q&255;return u+p},b.prototype.writeUintBE=b.prototype.writeUIntBE=function(l,u,p,T){if(l=+l,u=u>>>0,p=p>>>0,!T){var V=Math.pow(2,8*p)-1;Se(this,l,u,p,V,0)}var q=p-1,fe=1;for(this[u+q]=l&255;--q>=0&&(fe*=256);)this[u+q]=l/fe&255;return u+p},b.prototype.writeUint8=b.prototype.writeUInt8=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,1,255,0),this[u]=l&255,u+1},b.prototype.writeUint16LE=b.prototype.writeUInt16LE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,2,65535,0),this[u]=l&255,this[u+1]=l>>>8,u+2},b.prototype.writeUint16BE=b.prototype.writeUInt16BE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,2,65535,0),this[u]=l>>>8,this[u+1]=l&255,u+2},b.prototype.writeUint32LE=b.prototype.writeUInt32LE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,4,4294967295,0),this[u+3]=l>>>24,this[u+2]=l>>>16,this[u+1]=l>>>8,this[u]=l&255,u+4},b.prototype.writeUint32BE=b.prototype.writeUInt32BE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,4,4294967295,0),this[u]=l>>>24,this[u+1]=l>>>16,this[u+2]=l>>>8,this[u+3]=l&255,u+4},b.prototype.writeIntLE=function(l,u,p,T){if(l=+l,u=u>>>0,!T){var V=Math.pow(2,8*p-1);Se(this,l,u,p,V-1,-V)}var q=0,fe=1,de=0;for(this[u]=l&255;++q<p&&(fe*=256);)l<0&&de===0&&this[u+q-1]!==0&&(de=1),this[u+q]=(l/fe>>0)-de&255;return u+p},b.prototype.writeIntBE=function(l,u,p,T){if(l=+l,u=u>>>0,!T){var V=Math.pow(2,8*p-1);Se(this,l,u,p,V-1,-V)}var q=p-1,fe=1,de=0;for(this[u+q]=l&255;--q>=0&&(fe*=256);)l<0&&de===0&&this[u+q+1]!==0&&(de=1),this[u+q]=(l/fe>>0)-de&255;return u+p},b.prototype.writeInt8=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,1,127,-128),l<0&&(l=255+l+1),this[u]=l&255,u+1},b.prototype.writeInt16LE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,2,32767,-32768),this[u]=l&255,this[u+1]=l>>>8,u+2},b.prototype.writeInt16BE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,2,32767,-32768),this[u]=l>>>8,this[u+1]=l&255,u+2},b.prototype.writeInt32LE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,4,2147483647,-2147483648),this[u]=l&255,this[u+1]=l>>>8,this[u+2]=l>>>16,this[u+3]=l>>>24,u+4},b.prototype.writeInt32BE=function(l,u,p){return l=+l,u=u>>>0,p||Se(this,l,u,4,2147483647,-2147483648),l<0&&(l=4294967295+l+1),this[u]=l>>>24,this[u+1]=l>>>16,this[u+2]=l>>>8,this[u+3]=l&255,u+4};function at(h,l,u,p,T,V){if(u+p>h.length)throw new RangeError("Index out of range");if(u<0)throw new RangeError("Index out of range")}function Xe(h,l,u,p,T){return l=+l,u=u>>>0,T||at(h,l,u,4,34028234663852886e22,-34028234663852886e22),J.write(h,l,u,p,23,4),u+4}b.prototype.writeFloatLE=function(l,u,p){return Xe(this,l,u,!0,p)},b.prototype.writeFloatBE=function(l,u,p){return Xe(this,l,u,!1,p)};function Ne(h,l,u,p,T){return l=+l,u=u>>>0,T||at(h,l,u,8,17976931348623157e292,-17976931348623157e292),J.write(h,l,u,p,52,8),u+8}b.prototype.writeDoubleLE=function(l,u,p){return Ne(this,l,u,!0,p)},b.prototype.writeDoubleBE=function(l,u,p){return Ne(this,l,u,!1,p)},b.prototype.copy=function(l,u,p,T){if(!b.isBuffer(l))throw new TypeError("argument should be a Buffer");if(p||(p=0),!T&&T!==0&&(T=this.length),u>=l.length&&(u=l.length),u||(u=0),T>0&&T<p&&(T=p),T===p||l.length===0||this.length===0)return 0;if(u<0)throw new RangeError("targetStart out of bounds");if(p<0||p>=this.length)throw new RangeError("Index out of range");if(T<0)throw new RangeError("sourceEnd out of bounds");T>this.length&&(T=this.length),l.length-u<T-p&&(T=l.length-u+p);var V=T-p;return this===l&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(u,p,T):Uint8Array.prototype.set.call(l,this.subarray(p,T),u),V},b.prototype.fill=function(l,u,p,T){if(typeof l=="string"){if(typeof u=="string"?(T=u,u=0,p=this.length):typeof p=="string"&&(T=p,p=this.length),T!==void 0&&typeof T!="string")throw new TypeError("encoding must be a string");if(typeof T=="string"&&!b.isEncoding(T))throw new TypeError("Unknown encoding: "+T);if(l.length===1){var V=l.charCodeAt(0);(T==="utf8"&&V<128||T==="latin1")&&(l=V)}}else typeof l=="number"?l=l&255:typeof l=="boolean"&&(l=Number(l));if(u<0||this.length<u||this.length<p)throw new RangeError("Out of range index");if(p<=u)return this;u=u>>>0,p=p===void 0?this.length:p>>>0,l||(l=0);var q;if(typeof l=="number")for(q=u;q<p;++q)this[q]=l;else{var fe=b.isBuffer(l)?l:b.from(l,T),de=fe.length;if(de===0)throw new TypeError('The value "'+l+'" is invalid for argument "value"');for(q=0;q<p-u;++q)this[q+u]=fe[q%de]}return this};var pt=/[^+/0-9A-Za-z-_]/g;function Ke(h){if(h=h.split("=")[0],h=h.trim().replace(pt,""),h.length<2)return"";for(;h.length%4!==0;)h=h+"=";return h}function L(h,l){l=l||1/0;for(var u,p=h.length,T=null,V=[],q=0;q<p;++q){if(u=h.charCodeAt(q),u>55295&&u<57344){if(!T){if(u>56319){(l-=3)>-1&&V.push(239,191,189);continue}else if(q+1===p){(l-=3)>-1&&V.push(239,191,189);continue}T=u;continue}if(u<56320){(l-=3)>-1&&V.push(239,191,189),T=u;continue}u=(T-55296<<10|u-56320)+65536}else T&&(l-=3)>-1&&V.push(239,191,189);if(T=null,u<128){if((l-=1)<0)break;V.push(u)}else if(u<2048){if((l-=2)<0)break;V.push(u>>6|192,u&63|128)}else if(u<65536){if((l-=3)<0)break;V.push(u>>12|224,u>>6&63|128,u&63|128)}else if(u<1114112){if((l-=4)<0)break;V.push(u>>18|240,u>>12&63|128,u>>6&63|128,u&63|128)}else throw new Error("Invalid code point")}return V}function O(h){for(var l=[],u=0;u<h.length;++u)l.push(h.charCodeAt(u)&255);return l}function Y(h,l){for(var u,p,T,V=[],q=0;q<h.length&&!((l-=2)<0);++q)u=h.charCodeAt(q),p=u>>8,T=u%256,V.push(T),V.push(p);return V}function re(h){return C.toByteArray(Ke(h))}function ce(h,l,u,p){for(var T=0;T<p&&!(T+u>=l.length||T>=h.length);++T)l[T+u]=h[T];return T}function g(h,l){return h instanceof l||h!=null&&h.constructor!=null&&h.constructor.name!=null&&h.constructor.name===l.name}function y(h){return h!==h}var H=function(){for(var h="0123456789abcdef",l=new Array(256),u=0;u<16;++u)for(var p=u*16,T=0;T<16;++T)l[p+T]=h[u]+h[T];return l}()},531:ne=>{"use strict";var te=typeof Reflect=="object"?Reflect:null,M=te&&typeof te.apply=="function"?te.apply:function(P,D,j){return Function.prototype.apply.call(P,D,j)},C;te&&typeof te.ownKeys=="function"?C=te.ownKeys:Object.getOwnPropertySymbols?C=function(P){return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P))}:C=function(P){return Object.getOwnPropertyNames(P)};function J(R){}var X=Number.isNaN||function(P){return P!==P};function N(){N.init.call(this)}ne.exports=N,ne.exports.once=k,N.EventEmitter=N,N.prototype._events=void 0,N.prototype._eventsCount=0,N.prototype._maxListeners=void 0;var B=10;function _(R){if(typeof R!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof R)}Object.defineProperty(N,"defaultMaxListeners",{enumerable:!0,get:function(){return B},set:function(R){if(typeof R!="number"||R<0||X(R))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+R+".");B=R}}),N.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},N.prototype.setMaxListeners=function(P){if(typeof P!="number"||P<0||X(P))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+P+".");return this._maxListeners=P,this};function b(R){return R._maxListeners===void 0?N.defaultMaxListeners:R._maxListeners}N.prototype.getMaxListeners=function(){return b(this)},N.prototype.emit=function(P){for(var D=[],j=1;j<arguments.length;j++)D.push(arguments[j]);var K=P==="error",oe=this._events;if(oe!==void 0)K=K&&oe.error===void 0;else if(!K)return!1;if(K){var ie;if(D.length>0&&(ie=D[0]),ie instanceof Error)throw ie;var se=new Error("Unhandled error."+(ie?" ("+ie.message+")":""));throw se.context=ie,se}var W=oe[P];if(W===void 0)return!1;if(typeof W=="function")M(W,this,D);else for(var De=W.length,Ie=v(W,De),j=0;j<De;++j)M(Ie[j],this,D);return!0};function $(R,P,D,j){var K,oe,ie;if(_(D),oe=R._events,oe===void 0?(oe=R._events=Object.create(null),R._eventsCount=0):(oe.newListener!==void 0&&(R.emit("newListener",P,D.listener?D.listener:D),oe=R._events),ie=oe[P]),ie===void 0)ie=oe[P]=D,++R._eventsCount;else if(typeof ie=="function"?ie=oe[P]=j?[D,ie]:[ie,D]:j?ie.unshift(D):ie.push(D),K=b(R),K>0&&ie.length>K&&!ie.warned){ie.warned=!0;var se=new Error("Possible EventEmitter memory leak detected. "+ie.length+" "+String(P)+" listeners added. Use emitter.setMaxListeners() to increase limit");se.name="MaxListenersExceededWarning",se.emitter=R,se.type=P,se.count=ie.length}return R}N.prototype.addListener=function(P,D){return $(this,P,D,!1)},N.prototype.on=N.prototype.addListener,N.prototype.prependListener=function(P,D){return $(this,P,D,!0)};function Z(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function F(R,P,D){var j={fired:!1,wrapFn:void 0,target:R,type:P,listener:D},K=Z.bind(j);return K.listener=D,j.wrapFn=K,K}N.prototype.once=function(P,D){return _(D),this.on(P,F(this,P,D)),this},N.prototype.prependOnceListener=function(P,D){return _(D),this.prependListener(P,F(this,P,D)),this},N.prototype.removeListener=function(P,D){var j,K,oe,ie,se;if(_(D),K=this._events,K===void 0)return this;if(j=K[P],j===void 0)return this;if(j===D||j.listener===D)--this._eventsCount===0?this._events=Object.create(null):(delete K[P],K.removeListener&&this.emit("removeListener",P,j.listener||D));else if(typeof j!="function"){for(oe=-1,ie=j.length-1;ie>=0;ie--)if(j[ie]===D||j[ie].listener===D){se=j[ie].listener,oe=ie;break}if(oe<0)return this;oe===0?j.shift():S(j,oe),j.length===1&&(K[P]=j[0]),K.removeListener!==void 0&&this.emit("removeListener",P,se||D)}return this},N.prototype.off=N.prototype.removeListener,N.prototype.removeAllListeners=function(P){var D,j,K;if(j=this._events,j===void 0)return this;if(j.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):j[P]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete j[P]),this;if(arguments.length===0){var oe=Object.keys(j),ie;for(K=0;K<oe.length;++K)ie=oe[K],ie!=="removeListener"&&this.removeAllListeners(ie);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(D=j[P],typeof D=="function")this.removeListener(P,D);else if(D!==void 0)for(K=D.length-1;K>=0;K--)this.removeListener(P,D[K]);return this};function E(R,P,D){var j=R._events;if(j===void 0)return[];var K=j[P];return K===void 0?[]:typeof K=="function"?D?[K.listener||K]:[K]:D?x(K):v(K,K.length)}N.prototype.listeners=function(P){return E(this,P,!0)},N.prototype.rawListeners=function(P){return E(this,P,!1)},N.listenerCount=function(R,P){return typeof R.listenerCount=="function"?R.listenerCount(P):G.call(R,P)},N.prototype.listenerCount=G;function G(R){var P=this._events;if(P!==void 0){var D=P[R];if(typeof D=="function")return 1;if(D!==void 0)return D.length}return 0}N.prototype.eventNames=function(){return this._eventsCount>0?C(this._events):[]};function v(R,P){for(var D=new Array(P),j=0;j<P;++j)D[j]=R[j];return D}function S(R,P){for(;P+1<R.length;P++)R[P]=R[P+1];R.pop()}function x(R){for(var P=new Array(R.length),D=0;D<P.length;++D)P[D]=R[D].listener||R[D];return P}function k(R,P){return new Promise(function(D,j){function K(ie){R.removeListener(P,oe),j(ie)}function oe(){typeof R.removeListener=="function"&&R.removeListener("error",K),D([].slice.call(arguments))}A(R,P,oe,{once:!0}),P!=="error"&&Q(R,K,{once:!0})})}function Q(R,P,D){typeof R.on=="function"&&A(R,"error",P,D)}function A(R,P,D,j){if(typeof R.on=="function")j.once?R.once(P,D):R.on(P,D);else if(typeof R.addEventListener=="function")R.addEventListener(P,function K(oe){j.once&&R.removeEventListener(P,K),D(oe)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof R)}},262:(ne,te,M)=>{"use strict";var C=M(707).Buffer,J=M(310).Transform,X=M(111);function N(_,b){if(!C.isBuffer(_)&&typeof _!="string")throw new TypeError(b+" must be a string or a buffer")}function B(_){J.call(this),this._block=C.allocUnsafe(_),this._blockSize=_,this._blockOffset=0,this._length=[0,0,0,0],this._finalized=!1}X(B,J),B.prototype._transform=function(_,b,$){var Z=null;try{this.update(_,b)}catch(F){Z=F}$(Z)},B.prototype._flush=function(_){var b=null;try{this.push(this.digest())}catch($){b=$}_(b)},B.prototype.update=function(_,b){if(N(_,"Data"),this._finalized)throw new Error("Digest already called");C.isBuffer(_)||(_=C.from(_,b));for(var $=this._block,Z=0;this._blockOffset+_.length-Z>=this._blockSize;){for(var F=this._blockOffset;F<this._blockSize;)$[F++]=_[Z++];this._update(),this._blockOffset=0}for(;Z<_.length;)$[this._blockOffset++]=_[Z++];for(var E=0,G=_.length*8;G>0;++E)this._length[E]+=G,G=this._length[E]/4294967296|0,G>0&&(this._length[E]-=4294967296*G);return this},B.prototype._update=function(){throw new Error("_update is not implemented")},B.prototype.digest=function(_){if(this._finalized)throw new Error("Digest already called");this._finalized=!0;var b=this._digest();_!==void 0&&(b=b.toString(_)),this._block.fill(0),this._blockOffset=0;for(var $=0;$<4;++$)this._length[$]=0;return b},B.prototype._digest=function(){throw new Error("_digest is not implemented")},ne.exports=B},608:(ne,te)=>{/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */te.read=function(M,C,J,X,N){var B,_,b=N*8-X-1,$=(1<<b)-1,Z=$>>1,F=-7,E=J?N-1:0,G=J?-1:1,v=M[C+E];for(E+=G,B=v&(1<<-F)-1,v>>=-F,F+=b;F>0;B=B*256+M[C+E],E+=G,F-=8);for(_=B&(1<<-F)-1,B>>=-F,F+=X;F>0;_=_*256+M[C+E],E+=G,F-=8);if(B===0)B=1-Z;else{if(B===$)return _?NaN:(v?-1:1)*(1/0);_=_+Math.pow(2,X),B=B-Z}return(v?-1:1)*_*Math.pow(2,B-X)},te.write=function(M,C,J,X,N,B){var _,b,$,Z=B*8-N-1,F=(1<<Z)-1,E=F>>1,G=N===23?Math.pow(2,-24)-Math.pow(2,-77):0,v=X?0:B-1,S=X?1:-1,x=C<0||C===0&&1/C<0?1:0;for(C=Math.abs(C),isNaN(C)||C===1/0?(b=isNaN(C)?1:0,_=F):(_=Math.floor(Math.log(C)/Math.LN2),C*($=Math.pow(2,-_))<1&&(_--,$*=2),_+E>=1?C+=G/$:C+=G*Math.pow(2,1-E),C*$>=2&&(_++,$/=2),_+E>=F?(b=0,_=F):_+E>=1?(b=(C*$-1)*Math.pow(2,N),_=_+E):(b=C*Math.pow(2,E-1)*Math.pow(2,N),_=0));N>=8;M[J+v]=b&255,v+=S,b/=256,N-=8);for(_=_<<N|b,Z+=N;Z>0;M[J+v]=_&255,v+=S,_/=256,Z-=8);M[J+v-S]|=x*128}},111:ne=>{typeof Object.create=="function"?ne.exports=function(M,C){C&&(M.super_=C,M.prototype=Object.create(C.prototype,{constructor:{value:M,enumerable:!1,writable:!0,configurable:!0}}))}:ne.exports=function(M,C){if(C){M.super_=C;var J=function(){};J.prototype=C.prototype,M.prototype=new J,M.prototype.constructor=M}}},54:(ne,te,M)=>{"use strict";var C=M(111),J=M(262),X=M(707).Buffer,N=new Array(16);function B(){J.call(this,64),this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878}C(B,J),B.prototype._update=function(){for(var E=N,G=0;G<16;++G)E[G]=this._block.readInt32LE(G*4);var v=this._a,S=this._b,x=this._c,k=this._d;v=b(v,S,x,k,E[0],3614090360,7),k=b(k,v,S,x,E[1],3905402710,12),x=b(x,k,v,S,E[2],606105819,17),S=b(S,x,k,v,E[3],3250441966,22),v=b(v,S,x,k,E[4],4118548399,7),k=b(k,v,S,x,E[5],1200080426,12),x=b(x,k,v,S,E[6],2821735955,17),S=b(S,x,k,v,E[7],4249261313,22),v=b(v,S,x,k,E[8],1770035416,7),k=b(k,v,S,x,E[9],2336552879,12),x=b(x,k,v,S,E[10],4294925233,17),S=b(S,x,k,v,E[11],2304563134,22),v=b(v,S,x,k,E[12],1804603682,7),k=b(k,v,S,x,E[13],4254626195,12),x=b(x,k,v,S,E[14],2792965006,17),S=b(S,x,k,v,E[15],1236535329,22),v=$(v,S,x,k,E[1],4129170786,5),k=$(k,v,S,x,E[6],3225465664,9),x=$(x,k,v,S,E[11],643717713,14),S=$(S,x,k,v,E[0],3921069994,20),v=$(v,S,x,k,E[5],3593408605,5),k=$(k,v,S,x,E[10],38016083,9),x=$(x,k,v,S,E[15],3634488961,14),S=$(S,x,k,v,E[4],3889429448,20),v=$(v,S,x,k,E[9],568446438,5),k=$(k,v,S,x,E[14],3275163606,9),x=$(x,k,v,S,E[3],4107603335,14),S=$(S,x,k,v,E[8],1163531501,20),v=$(v,S,x,k,E[13],2850285829,5),k=$(k,v,S,x,E[2],4243563512,9),x=$(x,k,v,S,E[7],1735328473,14),S=$(S,x,k,v,E[12],2368359562,20),v=Z(v,S,x,k,E[5],4294588738,4),k=Z(k,v,S,x,E[8],2272392833,11),x=Z(x,k,v,S,E[11],1839030562,16),S=Z(S,x,k,v,E[14],4259657740,23),v=Z(v,S,x,k,E[1],2763975236,4),k=Z(k,v,S,x,E[4],1272893353,11),x=Z(x,k,v,S,E[7],4139469664,16),S=Z(S,x,k,v,E[10],3200236656,23),v=Z(v,S,x,k,E[13],681279174,4),k=Z(k,v,S,x,E[0],3936430074,11),x=Z(x,k,v,S,E[3],3572445317,16),S=Z(S,x,k,v,E[6],76029189,23),v=Z(v,S,x,k,E[9],3654602809,4),k=Z(k,v,S,x,E[12],3873151461,11),x=Z(x,k,v,S,E[15],530742520,16),S=Z(S,x,k,v,E[2],3299628645,23),v=F(v,S,x,k,E[0],4096336452,6),k=F(k,v,S,x,E[7],1126891415,10),x=F(x,k,v,S,E[14],2878612391,15),S=F(S,x,k,v,E[5],4237533241,21),v=F(v,S,x,k,E[12],1700485571,6),k=F(k,v,S,x,E[3],2399980690,10),x=F(x,k,v,S,E[10],4293915773,15),S=F(S,x,k,v,E[1],2240044497,21),v=F(v,S,x,k,E[8],1873313359,6),k=F(k,v,S,x,E[15],4264355552,10),x=F(x,k,v,S,E[6],2734768916,15),S=F(S,x,k,v,E[13],1309151649,21),v=F(v,S,x,k,E[4],4149444226,6),k=F(k,v,S,x,E[11],3174756917,10),x=F(x,k,v,S,E[2],718787259,15),S=F(S,x,k,v,E[9],3951481745,21),this._a=this._a+v|0,this._b=this._b+S|0,this._c=this._c+x|0,this._d=this._d+k|0},B.prototype._digest=function(){this._block[this._blockOffset++]=128,this._blockOffset>56&&(this._block.fill(0,this._blockOffset,64),this._update(),this._blockOffset=0),this._block.fill(0,this._blockOffset,56),this._block.writeUInt32LE(this._length[0],56),this._block.writeUInt32LE(this._length[1],60),this._update();var E=X.allocUnsafe(16);return E.writeInt32LE(this._a,0),E.writeInt32LE(this._b,4),E.writeInt32LE(this._c,8),E.writeInt32LE(this._d,12),E};function _(E,G){return E<<G|E>>>32-G}function b(E,G,v,S,x,k,Q){return _(E+(G&v|~G&S)+x+k|0,Q)+G|0}function $(E,G,v,S,x,k,Q){return _(E+(G&S|v&~S)+x+k|0,Q)+G|0}function Z(E,G,v,S,x,k,Q){return _(E+(G^v^S)+x+k|0,Q)+G|0}function F(E,G,v,S,x,k,Q){return _(E+(v^(G|~S))+x+k|0,Q)+G|0}ne.exports=B},386:ne=>{"use strict";function te(_,b){_.prototype=Object.create(b.prototype),_.prototype.constructor=_,_.__proto__=b}var M={};function C(_,b,$){$||($=Error);function Z(E,G,v){return typeof b=="string"?b:b(E,G,v)}var F=function(E){te(G,E);function G(v,S,x){return E.call(this,Z(v,S,x))||this}return G}($);F.prototype.name=$.name,F.prototype.code=_,M[_]=F}function J(_,b){if(Array.isArray(_)){var $=_.length;return _=_.map(function(Z){return String(Z)}),$>2?"one of ".concat(b," ").concat(_.slice(0,$-1).join(", "),", or ")+_[$-1]:$===2?"one of ".concat(b," ").concat(_[0]," or ").concat(_[1]):"of ".concat(b," ").concat(_[0])}else return"of ".concat(b," ").concat(String(_))}function X(_,b,$){return _.substr(!$||$<0?0:+$,b.length)===b}function N(_,b,$){return($===void 0||$>_.length)&&($=_.length),_.substring($-b.length,$)===b}function B(_,b,$){return typeof $!="number"&&($=0),$+b.length>_.length?!1:_.indexOf(b,$)!==-1}C("ERR_INVALID_OPT_VALUE",function(_,b){return'The value "'+b+'" is invalid for option "'+_+'"'},TypeError),C("ERR_INVALID_ARG_TYPE",function(_,b,$){var Z;typeof b=="string"&&X(b,"not ")?(Z="must not be",b=b.replace(/^not /,"")):Z="must be";var F;if(N(_," argument"))F="The ".concat(_," ").concat(Z," ").concat(J(b,"type"));else{var E=B(_,".")?"property":"argument";F='The "'.concat(_,'" ').concat(E," ").concat(Z," ").concat(J(b,"type"))}return F+=". Received type ".concat(typeof $),F},TypeError),C("ERR_STREAM_PUSH_AFTER_EOF","stream.push() after EOF"),C("ERR_METHOD_NOT_IMPLEMENTED",function(_){return"The "+_+" method is not implemented"}),C("ERR_STREAM_PREMATURE_CLOSE","Premature close"),C("ERR_STREAM_DESTROYED",function(_){return"Cannot call "+_+" after a stream was destroyed"}),C("ERR_MULTIPLE_CALLBACK","Callback called multiple times"),C("ERR_STREAM_CANNOT_PIPE","Cannot pipe, not readable"),C("ERR_STREAM_WRITE_AFTER_END","write after end"),C("ERR_STREAM_NULL_VALUES","May not write null values to stream",TypeError),C("ERR_UNKNOWN_ENCODING",function(_){return"Unknown encoding: "+_},TypeError),C("ERR_STREAM_UNSHIFT_AFTER_END_EVENT","stream.unshift() after end event"),ne.exports.q=M},879:(ne,te,M)=>{"use strict";var C=Object.keys||function(F){var E=[];for(var G in F)E.push(G);return E};ne.exports=b;var J=M(70),X=M(501);M(111)(b,J);for(var N=C(X.prototype),B=0;B<N.length;B++){var _=N[B];b.prototype[_]||(b.prototype[_]=X.prototype[_])}function b(F){if(!(this instanceof b))return new b(F);J.call(this,F),X.call(this,F),this.allowHalfOpen=!0,F&&(F.readable===!1&&(this.readable=!1),F.writable===!1&&(this.writable=!1),F.allowHalfOpen===!1&&(this.allowHalfOpen=!1,this.once("end",$)))}Object.defineProperty(b.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(b.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(b.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}});function $(){this._writableState.ended||process.nextTick(Z,this)}function Z(F){F.end()}Object.defineProperty(b.prototype,"destroyed",{enumerable:!1,get:function(){return this._readableState===void 0||this._writableState===void 0?!1:this._readableState.destroyed&&this._writableState.destroyed},set:function(E){this._readableState===void 0||this._writableState===void 0||(this._readableState.destroyed=E,this._writableState.destroyed=E)}})},100:(ne,te,M)=>{"use strict";ne.exports=J;var C=M(269);M(111)(J,C);function J(X){if(!(this instanceof J))return new J(X);C.call(this,X)}J.prototype._transform=function(X,N,B){B(null,X)}},70:(ne,te,M)=>{"use strict";ne.exports=W;var C;W.ReadableState=se;var J=M(531).EventEmitter,X=function(y,H){return y.listeners(H).length},N=M(72),B=M(291).Buffer,_=M.g.Uint8Array||function(){};function b(g){return B.from(g)}function $(g){return B.isBuffer(g)||g instanceof _}var Z=M(2),F;Z&&Z.debuglog?F=Z.debuglog("stream"):F=function(){};var E=M(799),G=M(204),v=M(44),S=v.getHighWaterMark,x=M(386).q,k=x.ERR_INVALID_ARG_TYPE,Q=x.ERR_STREAM_PUSH_AFTER_EOF,A=x.ERR_METHOD_NOT_IMPLEMENTED,R=x.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,P,D,j;M(111)(W,N);var K=G.errorOrDestroy,oe=["error","close","destroy","pause","resume"];function ie(g,y,H){if(typeof g.prependListener=="function")return g.prependListener(y,H);!g._events||!g._events[y]?g.on(y,H):Array.isArray(g._events[y])?g._events[y].unshift(H):g._events[y]=[H,g._events[y]]}function se(g,y,H){C=C||M(879),g=g||{},typeof H!="boolean"&&(H=y instanceof C),this.objectMode=!!g.objectMode,H&&(this.objectMode=this.objectMode||!!g.readableObjectMode),this.highWaterMark=S(this,g,"readableHighWaterMark",H),this.buffer=new E,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.paused=!0,this.emitClose=g.emitClose!==!1,this.autoDestroy=!!g.autoDestroy,this.destroyed=!1,this.defaultEncoding=g.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,g.encoding&&(P||(P=M(682).s),this.decoder=new P(g.encoding),this.encoding=g.encoding)}function W(g){if(C=C||M(879),!(this instanceof W))return new W(g);var y=this instanceof C;this._readableState=new se(g,this,y),this.readable=!0,g&&(typeof g.read=="function"&&(this._read=g.read),typeof g.destroy=="function"&&(this._destroy=g.destroy)),N.call(this)}Object.defineProperty(W.prototype,"destroyed",{enumerable:!1,get:function(){return this._readableState===void 0?!1:this._readableState.destroyed},set:function(y){!this._readableState||(this._readableState.destroyed=y)}}),W.prototype.destroy=G.destroy,W.prototype._undestroy=G.undestroy,W.prototype._destroy=function(g,y){y(g)},W.prototype.push=function(g,y){var H=this._readableState,h;return H.objectMode?h=!0:typeof g=="string"&&(y=y||H.defaultEncoding,y!==H.encoding&&(g=B.from(g,y),y=""),h=!0),De(this,g,y,!1,h)},W.prototype.unshift=function(g){return De(this,g,null,!0,!1)};function De(g,y,H,h,l){F("readableAddChunk",y);var u=g._readableState;if(y===null)u.reading=!1,Ze(g,u);else{var p;if(l||(p=He(u,y)),p)K(g,p);else if(u.objectMode||y&&y.length>0)if(typeof y!="string"&&!u.objectMode&&Object.getPrototypeOf(y)!==B.prototype&&(y=b(y)),h)u.endEmitted?K(g,new R):Ie(g,u,y,!0);else if(u.ended)K(g,new Q);else{if(u.destroyed)return!1;u.reading=!1,u.decoder&&!H?(y=u.decoder.write(y),u.objectMode||y.length!==0?Ie(g,u,y,!1):ve(g,u)):Ie(g,u,y,!1)}else h||(u.reading=!1,ve(g,u))}return!u.ended&&(u.length<u.highWaterMark||u.length===0)}function Ie(g,y,H,h){y.flowing&&y.length===0&&!y.sync?(y.awaitDrain=0,g.emit("data",H)):(y.length+=y.objectMode?1:H.length,h?y.buffer.unshift(H):y.buffer.push(H),y.needReadable&&We(g)),ve(g,y)}function He(g,y){var H;return!$(y)&&typeof y!="string"&&y!==void 0&&!g.objectMode&&(H=new k("chunk",["string","Buffer","Uint8Array"],y)),H}W.prototype.isPaused=function(){return this._readableState.flowing===!1},W.prototype.setEncoding=function(g){P||(P=M(682).s);var y=new P(g);this._readableState.decoder=y,this._readableState.encoding=this._readableState.decoder.encoding;for(var H=this._readableState.buffer.head,h="";H!==null;)h+=y.write(H.data),H=H.next;return this._readableState.buffer.clear(),h!==""&&this._readableState.buffer.push(h),this._readableState.length=h.length,this};var $e=1073741824;function Ge(g){return g>=$e?g=$e:(g--,g|=g>>>1,g|=g>>>2,g|=g>>>4,g|=g>>>8,g|=g>>>16,g++),g}function st(g,y){return g<=0||y.length===0&&y.ended?0:y.objectMode?1:g!==g?y.flowing&&y.length?y.buffer.head.data.length:y.length:(g>y.highWaterMark&&(y.highWaterMark=Ge(g)),g<=y.length?g:y.ended?y.length:(y.needReadable=!0,0))}W.prototype.read=function(g){F("read",g),g=parseInt(g,10);var y=this._readableState,H=g;if(g!==0&&(y.emittedReadable=!1),g===0&&y.needReadable&&((y.highWaterMark!==0?y.length>=y.highWaterMark:y.length>0)||y.ended))return F("read: emitReadable",y.length,y.ended),y.length===0&&y.ended?Y(this):We(this),null;if(g=st(g,y),g===0&&y.ended)return y.length===0&&Y(this),null;var h=y.needReadable;F("need readable",h),(y.length===0||y.length-g<y.highWaterMark)&&(h=!0,F("length less than watermark",h)),y.ended||y.reading?(h=!1,F("reading or ended",h)):h&&(F("do read"),y.reading=!0,y.sync=!0,y.length===0&&(y.needReadable=!0),this._read(y.highWaterMark),y.sync=!1,y.reading||(g=st(H,y)));var l;return g>0?l=O(g,y):l=null,l===null?(y.needReadable=y.length<=y.highWaterMark,g=0):(y.length-=g,y.awaitDrain=0),y.length===0&&(y.ended||(y.needReadable=!0),H!==g&&y.ended&&Y(this)),l!==null&&this.emit("data",l),l};function Ze(g,y){if(F("onEofChunk"),!y.ended){if(y.decoder){var H=y.decoder.end();H&&H.length&&(y.buffer.push(H),y.length+=y.objectMode?1:H.length)}y.ended=!0,y.sync?We(g):(y.needReadable=!1,y.emittedReadable||(y.emittedReadable=!0,le(g)))}}function We(g){var y=g._readableState;F("emitReadable",y.needReadable,y.emittedReadable),y.needReadable=!1,y.emittedReadable||(F("emitReadable",y.flowing),y.emittedReadable=!0,process.nextTick(le,g))}function le(g){var y=g._readableState;F("emitReadable_",y.destroyed,y.length,y.ended),!y.destroyed&&(y.length||y.ended)&&(g.emit("readable"),y.emittedReadable=!1),y.needReadable=!y.flowing&&!y.ended&&y.length<=y.highWaterMark,L(g)}function ve(g,y){y.readingMore||(y.readingMore=!0,process.nextTick(Se,g,y))}function Se(g,y){for(;!y.reading&&!y.ended&&(y.length<y.highWaterMark||y.flowing&&y.length===0);){var H=y.length;if(F("maybeReadMore read 0"),g.read(0),H===y.length)break}y.readingMore=!1}W.prototype._read=function(g){K(this,new A("_read()"))},W.prototype.pipe=function(g,y){var H=this,h=this._readableState;switch(h.pipesCount){case 0:h.pipes=g;break;case 1:h.pipes=[h.pipes,g];break;default:h.pipes.push(g);break}h.pipesCount+=1,F("pipe count=%d opts=%j",h.pipesCount,y);var l=(!y||y.end!==!1)&&g!==process.stdout&&g!==process.stderr,u=l?T:Be;h.endEmitted?process.nextTick(u):H.once("end",u),g.on("unpipe",p);function p(Fe,Ue){F("onunpipe"),Fe===H&&Ue&&Ue.hasUnpiped===!1&&(Ue.hasUnpiped=!0,fe())}function T(){F("onend"),g.end()}var V=at(H);g.on("drain",V);var q=!1;function fe(){F("cleanup"),g.removeListener("close",we),g.removeListener("finish",pe),g.removeListener("drain",V),g.removeListener("error",he),g.removeListener("unpipe",p),H.removeListener("end",T),H.removeListener("end",Be),H.removeListener("data",de),q=!0,h.awaitDrain&&(!g._writableState||g._writableState.needDrain)&&V()}H.on("data",de);function de(Fe){F("ondata");var Ue=g.write(Fe);F("dest.write",Ue),Ue===!1&&((h.pipesCount===1&&h.pipes===g||h.pipesCount>1&&ce(h.pipes,g)!==-1)&&!q&&(F("false write response, pause",h.awaitDrain),h.awaitDrain++),H.pause())}function he(Fe){F("onerror",Fe),Be(),g.removeListener("error",he),X(g,"error")===0&&K(g,Fe)}ie(g,"error",he);function we(){g.removeListener("finish",pe),Be()}g.once("close",we);function pe(){F("onfinish"),g.removeListener("close",we),Be()}g.once("finish",pe);function Be(){F("unpipe"),H.unpipe(g)}return g.emit("pipe",H),h.flowing||(F("pipe resume"),H.resume()),g};function at(g){return function(){var H=g._readableState;F("pipeOnDrain",H.awaitDrain),H.awaitDrain&&H.awaitDrain--,H.awaitDrain===0&&X(g,"data")&&(H.flowing=!0,L(g))}}W.prototype.unpipe=function(g){var y=this._readableState,H={hasUnpiped:!1};if(y.pipesCount===0)return this;if(y.pipesCount===1)return g&&g!==y.pipes?this:(g||(g=y.pipes),y.pipes=null,y.pipesCount=0,y.flowing=!1,g&&g.emit("unpipe",this,H),this);if(!g){var h=y.pipes,l=y.pipesCount;y.pipes=null,y.pipesCount=0,y.flowing=!1;for(var u=0;u<l;u++)h[u].emit("unpipe",this,{hasUnpiped:!1});return this}var p=ce(y.pipes,g);return p===-1?this:(y.pipes.splice(p,1),y.pipesCount-=1,y.pipesCount===1&&(y.pipes=y.pipes[0]),g.emit("unpipe",this,H),this)},W.prototype.on=function(g,y){var H=N.prototype.on.call(this,g,y),h=this._readableState;return g==="data"?(h.readableListening=this.listenerCount("readable")>0,h.flowing!==!1&&this.resume()):g==="readable"&&!h.endEmitted&&!h.readableListening&&(h.readableListening=h.needReadable=!0,h.flowing=!1,h.emittedReadable=!1,F("on readable",h.length,h.reading),h.length?We(this):h.reading||process.nextTick(Ne,this)),H},W.prototype.addListener=W.prototype.on,W.prototype.removeListener=function(g,y){var H=N.prototype.removeListener.call(this,g,y);return g==="readable"&&process.nextTick(Xe,this),H},W.prototype.removeAllListeners=function(g){var y=N.prototype.removeAllListeners.apply(this,arguments);return(g==="readable"||g===void 0)&&process.nextTick(Xe,this),y};function Xe(g){var y=g._readableState;y.readableListening=g.listenerCount("readable")>0,y.resumeScheduled&&!y.paused?y.flowing=!0:g.listenerCount("data")>0&&g.resume()}function Ne(g){F("readable nexttick read 0"),g.read(0)}W.prototype.resume=function(){var g=this._readableState;return g.flowing||(F("resume"),g.flowing=!g.readableListening,pt(this,g)),g.paused=!1,this};function pt(g,y){y.resumeScheduled||(y.resumeScheduled=!0,process.nextTick(Ke,g,y))}function Ke(g,y){F("resume",y.reading),y.reading||g.read(0),y.resumeScheduled=!1,g.emit("resume"),L(g),y.flowing&&!y.reading&&g.read(0)}W.prototype.pause=function(){return F("call pause flowing=%j",this._readableState.flowing),this._readableState.flowing!==!1&&(F("pause"),this._readableState.flowing=!1,this.emit("pause")),this._readableState.paused=!0,this};function L(g){var y=g._readableState;for(F("flow",y.flowing);y.flowing&&g.read()!==null;);}W.prototype.wrap=function(g){var y=this,H=this._readableState,h=!1;g.on("end",function(){if(F("wrapped end"),H.decoder&&!H.ended){var p=H.decoder.end();p&&p.length&&y.push(p)}y.push(null)}),g.on("data",function(p){if(F("wrapped data"),H.decoder&&(p=H.decoder.write(p)),!(H.objectMode&&p==null)&&!(!H.objectMode&&(!p||!p.length))){var T=y.push(p);T||(h=!0,g.pause())}});for(var l in g)this[l]===void 0&&typeof g[l]=="function"&&(this[l]=function(T){return function(){return g[T].apply(g,arguments)}}(l));for(var u=0;u<oe.length;u++)g.on(oe[u],this.emit.bind(this,oe[u]));return this._read=function(p){F("wrapped _read",p),h&&(h=!1,g.resume())},this},typeof Symbol=="function"&&(W.prototype[Symbol.asyncIterator]=function(){return D===void 0&&(D=M(978)),D(this)}),Object.defineProperty(W.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),Object.defineProperty(W.prototype,"readableBuffer",{enumerable:!1,get:function(){return this._readableState&&this._readableState.buffer}}),Object.defineProperty(W.prototype,"readableFlowing",{enumerable:!1,get:function(){return this._readableState.flowing},set:function(y){this._readableState&&(this._readableState.flowing=y)}}),W._fromList=O,Object.defineProperty(W.prototype,"readableLength",{enumerable:!1,get:function(){return this._readableState.length}});function O(g,y){if(y.length===0)return null;var H;return y.objectMode?H=y.buffer.shift():!g||g>=y.length?(y.decoder?H=y.buffer.join(""):y.buffer.length===1?H=y.buffer.first():H=y.buffer.concat(y.length),y.buffer.clear()):H=y.buffer.consume(g,y.decoder),H}function Y(g){var y=g._readableState;F("endReadable",y.endEmitted),y.endEmitted||(y.ended=!0,process.nextTick(re,y,g))}function re(g,y){if(F("endReadableNT",g.endEmitted,g.length),!g.endEmitted&&g.length===0&&(g.endEmitted=!0,y.readable=!1,y.emit("end"),g.autoDestroy)){var H=y._writableState;(!H||H.autoDestroy&&H.finished)&&y.destroy()}}typeof Symbol=="function"&&(W.from=function(g,y){return j===void 0&&(j=M(625)),j(W,g,y)});function ce(g,y){for(var H=0,h=g.length;H<h;H++)if(g[H]===y)return H;return-1}},269:(ne,te,M)=>{"use strict";ne.exports=$;var C=M(386).q,J=C.ERR_METHOD_NOT_IMPLEMENTED,X=C.ERR_MULTIPLE_CALLBACK,N=C.ERR_TRANSFORM_ALREADY_TRANSFORMING,B=C.ERR_TRANSFORM_WITH_LENGTH_0,_=M(879);M(111)($,_);function b(E,G){var v=this._transformState;v.transforming=!1;var S=v.writecb;if(S===null)return this.emit("error",new X);v.writechunk=null,v.writecb=null,G!=null&&this.push(G),S(E);var x=this._readableState;x.reading=!1,(x.needReadable||x.length<x.highWaterMark)&&this._read(x.highWaterMark)}function $(E){if(!(this instanceof $))return new $(E);_.call(this,E),this._transformState={afterTransform:b.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,E&&(typeof E.transform=="function"&&(this._transform=E.transform),typeof E.flush=="function"&&(this._flush=E.flush)),this.on("prefinish",Z)}function Z(){var E=this;typeof this._flush=="function"&&!this._readableState.destroyed?this._flush(function(G,v){F(E,G,v)}):F(this,null,null)}$.prototype.push=function(E,G){return this._transformState.needTransform=!1,_.prototype.push.call(this,E,G)},$.prototype._transform=function(E,G,v){v(new J("_transform()"))},$.prototype._write=function(E,G,v){var S=this._transformState;if(S.writecb=v,S.writechunk=E,S.writeencoding=G,!S.transforming){var x=this._readableState;(S.needTransform||x.needReadable||x.length<x.highWaterMark)&&this._read(x.highWaterMark)}},$.prototype._read=function(E){var G=this._transformState;G.writechunk!==null&&!G.transforming?(G.transforming=!0,this._transform(G.writechunk,G.writeencoding,G.afterTransform)):G.needTransform=!0},$.prototype._destroy=function(E,G){_.prototype._destroy.call(this,E,function(v){G(v)})};function F(E,G,v){if(G)return E.emit("error",G);if(v!=null&&E.push(v),E._writableState.length)throw new B;if(E._transformState.transforming)throw new N;return E.push(null)}},501:(ne,te,M)=>{"use strict";ne.exports=se;function C(L,O,Y){this.chunk=L,this.encoding=O,this.callback=Y,this.next=null}function J(L){var O=this;this.next=null,this.entry=null,this.finish=function(){Ke(O,L)}}var X;se.WritableState=oe;var N={deprecate:M(737)},B=M(72),_=M(291).Buffer,b=M.g.Uint8Array||function(){};function $(L){return _.from(L)}function Z(L){return _.isBuffer(L)||L instanceof b}var F=M(204),E=M(44),G=E.getHighWaterMark,v=M(386).q,S=v.ERR_INVALID_ARG_TYPE,x=v.ERR_METHOD_NOT_IMPLEMENTED,k=v.ERR_MULTIPLE_CALLBACK,Q=v.ERR_STREAM_CANNOT_PIPE,A=v.ERR_STREAM_DESTROYED,R=v.ERR_STREAM_NULL_VALUES,P=v.ERR_STREAM_WRITE_AFTER_END,D=v.ERR_UNKNOWN_ENCODING,j=F.errorOrDestroy;M(111)(se,B);function K(){}function oe(L,O,Y){X=X||M(879),L=L||{},typeof Y!="boolean"&&(Y=O instanceof X),this.objectMode=!!L.objectMode,Y&&(this.objectMode=this.objectMode||!!L.writableObjectMode),this.highWaterMark=G(this,L,"writableHighWaterMark",Y),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var re=L.decodeStrings===!1;this.decodeStrings=!re,this.defaultEncoding=L.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(ce){Ze(O,ce)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.emitClose=L.emitClose!==!1,this.autoDestroy=!!L.autoDestroy,this.bufferedRequestCount=0,this.corkedRequestsFree=new J(this)}oe.prototype.getBuffer=function(){for(var O=this.bufferedRequest,Y=[];O;)Y.push(O),O=O.next;return Y},function(){try{Object.defineProperty(oe.prototype,"buffer",{get:N.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch{}}();var ie;typeof Symbol=="function"&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]=="function"?(ie=Function.prototype[Symbol.hasInstance],Object.defineProperty(se,Symbol.hasInstance,{value:function(O){return ie.call(this,O)?!0:this!==se?!1:O&&O._writableState instanceof oe}})):ie=function(O){return O instanceof this};function se(L){X=X||M(879);var O=this instanceof X;if(!O&&!ie.call(se,this))return new se(L);this._writableState=new oe(L,this,O),this.writable=!0,L&&(typeof L.write=="function"&&(this._write=L.write),typeof L.writev=="function"&&(this._writev=L.writev),typeof L.destroy=="function"&&(this._destroy=L.destroy),typeof L.final=="function"&&(this._final=L.final)),B.call(this)}se.prototype.pipe=function(){j(this,new Q)};function W(L,O){var Y=new P;j(L,Y),process.nextTick(O,Y)}function De(L,O,Y,re){var ce;return Y===null?ce=new R:typeof Y!="string"&&!O.objectMode&&(ce=new S("chunk",["string","Buffer"],Y)),ce?(j(L,ce),process.nextTick(re,ce),!1):!0}se.prototype.write=function(L,O,Y){var re=this._writableState,ce=!1,g=!re.objectMode&&Z(L);return g&&!_.isBuffer(L)&&(L=$(L)),typeof O=="function"&&(Y=O,O=null),g?O="buffer":O||(O=re.defaultEncoding),typeof Y!="function"&&(Y=K),re.ending?W(this,Y):(g||De(this,re,L,Y))&&(re.pendingcb++,ce=He(this,re,g,L,O,Y)),ce},se.prototype.cork=function(){this._writableState.corked++},se.prototype.uncork=function(){var L=this._writableState;L.corked&&(L.corked--,!L.writing&&!L.corked&&!L.bufferProcessing&&L.bufferedRequest&&ve(this,L))},se.prototype.setDefaultEncoding=function(O){if(typeof O=="string"&&(O=O.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((O+"").toLowerCase())>-1))throw new D(O);return this._writableState.defaultEncoding=O,this},Object.defineProperty(se.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}});function Ie(L,O,Y){return!L.objectMode&&L.decodeStrings!==!1&&typeof O=="string"&&(O=_.from(O,Y)),O}Object.defineProperty(se.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}});function He(L,O,Y,re,ce,g){if(!Y){var y=Ie(O,re,ce);re!==y&&(Y=!0,ce="buffer",re=y)}var H=O.objectMode?1:re.length;O.length+=H;var h=O.length<O.highWaterMark;if(h||(O.needDrain=!0),O.writing||O.corked){var l=O.lastBufferedRequest;O.lastBufferedRequest={chunk:re,encoding:ce,isBuf:Y,callback:g,next:null},l?l.next=O.lastBufferedRequest:O.bufferedRequest=O.lastBufferedRequest,O.bufferedRequestCount+=1}else $e(L,O,!1,H,re,ce,g);return h}function $e(L,O,Y,re,ce,g,y){O.writelen=re,O.writecb=y,O.writing=!0,O.sync=!0,O.destroyed?O.onwrite(new A("write")):Y?L._writev(ce,O.onwrite):L._write(ce,g,O.onwrite),O.sync=!1}function Ge(L,O,Y,re,ce){--O.pendingcb,Y?(process.nextTick(ce,re),process.nextTick(Ne,L,O),L._writableState.errorEmitted=!0,j(L,re)):(ce(re),L._writableState.errorEmitted=!0,j(L,re),Ne(L,O))}function st(L){L.writing=!1,L.writecb=null,L.length-=L.writelen,L.writelen=0}function Ze(L,O){var Y=L._writableState,re=Y.sync,ce=Y.writecb;if(typeof ce!="function")throw new k;if(st(Y),O)Ge(L,Y,re,O,ce);else{var g=Se(Y)||L.destroyed;!g&&!Y.corked&&!Y.bufferProcessing&&Y.bufferedRequest&&ve(L,Y),re?process.nextTick(We,L,Y,g,ce):We(L,Y,g,ce)}}function We(L,O,Y,re){Y||le(L,O),O.pendingcb--,re(),Ne(L,O)}function le(L,O){O.length===0&&O.needDrain&&(O.needDrain=!1,L.emit("drain"))}function ve(L,O){O.bufferProcessing=!0;var Y=O.bufferedRequest;if(L._writev&&Y&&Y.next){var re=O.bufferedRequestCount,ce=new Array(re),g=O.corkedRequestsFree;g.entry=Y;for(var y=0,H=!0;Y;)ce[y]=Y,Y.isBuf||(H=!1),Y=Y.next,y+=1;ce.allBuffers=H,$e(L,O,!0,O.length,ce,"",g.finish),O.pendingcb++,O.lastBufferedRequest=null,g.next?(O.corkedRequestsFree=g.next,g.next=null):O.corkedRequestsFree=new J(O),O.bufferedRequestCount=0}else{for(;Y;){var h=Y.chunk,l=Y.encoding,u=Y.callback,p=O.objectMode?1:h.length;if($e(L,O,!1,p,h,l,u),Y=Y.next,O.bufferedRequestCount--,O.writing)break}Y===null&&(O.lastBufferedRequest=null)}O.bufferedRequest=Y,O.bufferProcessing=!1}se.prototype._write=function(L,O,Y){Y(new x("_write()"))},se.prototype._writev=null,se.prototype.end=function(L,O,Y){var re=this._writableState;return typeof L=="function"?(Y=L,L=null,O=null):typeof O=="function"&&(Y=O,O=null),L!=null&&this.write(L,O),re.corked&&(re.corked=1,this.uncork()),re.ending||pt(this,re,Y),this},Object.defineProperty(se.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}});function Se(L){return L.ending&&L.length===0&&L.bufferedRequest===null&&!L.finished&&!L.writing}function at(L,O){L._final(function(Y){O.pendingcb--,Y&&j(L,Y),O.prefinished=!0,L.emit("prefinish"),Ne(L,O)})}function Xe(L,O){!O.prefinished&&!O.finalCalled&&(typeof L._final=="function"&&!O.destroyed?(O.pendingcb++,O.finalCalled=!0,process.nextTick(at,L,O)):(O.prefinished=!0,L.emit("prefinish")))}function Ne(L,O){var Y=Se(O);if(Y&&(Xe(L,O),O.pendingcb===0&&(O.finished=!0,L.emit("finish"),O.autoDestroy))){var re=L._readableState;(!re||re.autoDestroy&&re.endEmitted)&&L.destroy()}return Y}function pt(L,O,Y){O.ending=!0,Ne(L,O),Y&&(O.finished?process.nextTick(Y):L.once("finish",Y)),O.ended=!0,L.writable=!1}function Ke(L,O,Y){var re=L.entry;for(L.entry=null;re;){var ce=re.callback;O.pendingcb--,ce(Y),re=re.next}O.corkedRequestsFree.next=L}Object.defineProperty(se.prototype,"destroyed",{enumerable:!1,get:function(){return this._writableState===void 0?!1:this._writableState.destroyed},set:function(O){!this._writableState||(this._writableState.destroyed=O)}}),se.prototype.destroy=F.destroy,se.prototype._undestroy=F.undestroy,se.prototype._destroy=function(L,O){O(L)}},978:(ne,te,M)=>{"use strict";var C;function J(A,R,P){return R in A?Object.defineProperty(A,R,{value:P,enumerable:!0,configurable:!0,writable:!0}):A[R]=P,A}var X=M(738),N=Symbol("lastResolve"),B=Symbol("lastReject"),_=Symbol("error"),b=Symbol("ended"),$=Symbol("lastPromise"),Z=Symbol("handlePromise"),F=Symbol("stream");function E(A,R){return{value:A,done:R}}function G(A){var R=A[N];if(R!==null){var P=A[F].read();P!==null&&(A[$]=null,A[N]=null,A[B]=null,R(E(P,!1)))}}function v(A){process.nextTick(G,A)}function S(A,R){return function(P,D){A.then(function(){if(R[b]){P(E(void 0,!0));return}R[Z](P,D)},D)}}var x=Object.getPrototypeOf(function(){}),k=Object.setPrototypeOf((C={get stream(){return this[F]},next:function(){var R=this,P=this[_];if(P!==null)return Promise.reject(P);if(this[b])return Promise.resolve(E(void 0,!0));if(this[F].destroyed)return new Promise(function(oe,ie){process.nextTick(function(){R[_]?ie(R[_]):oe(E(void 0,!0))})});var D=this[$],j;if(D)j=new Promise(S(D,this));else{var K=this[F].read();if(K!==null)return Promise.resolve(E(K,!1));j=new Promise(this[Z])}return this[$]=j,j}},J(C,Symbol.asyncIterator,function(){return this}),J(C,"return",function(){var R=this;return new Promise(function(P,D){R[F].destroy(null,function(j){if(j){D(j);return}P(E(void 0,!0))})})}),C),x),Q=function(R){var P,D=Object.create(k,(P={},J(P,F,{value:R,writable:!0}),J(P,N,{value:null,writable:!0}),J(P,B,{value:null,writable:!0}),J(P,_,{value:null,writable:!0}),J(P,b,{value:R._readableState.endEmitted,writable:!0}),J(P,Z,{value:function(K,oe){var ie=D[F].read();ie?(D[$]=null,D[N]=null,D[B]=null,K(E(ie,!1))):(D[N]=K,D[B]=oe)},writable:!0}),P));return D[$]=null,X(R,function(j){if(j&&j.code!=="ERR_STREAM_PREMATURE_CLOSE"){var K=D[B];K!==null&&(D[$]=null,D[N]=null,D[B]=null,K(j)),D[_]=j;return}var oe=D[N];oe!==null&&(D[$]=null,D[N]=null,D[B]=null,oe(E(void 0,!0))),D[b]=!0}),R.on("readable",v.bind(null,D)),D};ne.exports=Q},799:(ne,te,M)=>{"use strict";function C(v,S){var x=Object.keys(v);if(Object.getOwnPropertySymbols){var k=Object.getOwnPropertySymbols(v);S&&(k=k.filter(function(Q){return Object.getOwnPropertyDescriptor(v,Q).enumerable})),x.push.apply(x,k)}return x}function J(v){for(var S=1;S<arguments.length;S++){var x=arguments[S]!=null?arguments[S]:{};S%2?C(Object(x),!0).forEach(function(k){X(v,k,x[k])}):Object.getOwnPropertyDescriptors?Object.defineProperties(v,Object.getOwnPropertyDescriptors(x)):C(Object(x)).forEach(function(k){Object.defineProperty(v,k,Object.getOwnPropertyDescriptor(x,k))})}return v}function X(v,S,x){return S in v?Object.defineProperty(v,S,{value:x,enumerable:!0,configurable:!0,writable:!0}):v[S]=x,v}function N(v,S){if(!(v instanceof S))throw new TypeError("Cannot call a class as a function")}function B(v,S){for(var x=0;x<S.length;x++){var k=S[x];k.enumerable=k.enumerable||!1,k.configurable=!0,"value"in k&&(k.writable=!0),Object.defineProperty(v,k.key,k)}}function _(v,S,x){return S&&B(v.prototype,S),x&&B(v,x),v}var b=M(291),$=b.Buffer,Z=M(15),F=Z.inspect,E=F&&F.custom||"inspect";function G(v,S,x){$.prototype.copy.call(v,S,x)}ne.exports=function(){function v(){N(this,v),this.head=null,this.tail=null,this.length=0}return _(v,[{key:"push",value:function(x){var k={data:x,next:null};this.length>0?this.tail.next=k:this.head=k,this.tail=k,++this.length}},{key:"unshift",value:function(x){var k={data:x,next:this.head};this.length===0&&(this.tail=k),this.head=k,++this.length}},{key:"shift",value:function(){if(this.length!==0){var x=this.head.data;return this.length===1?this.head=this.tail=null:this.head=this.head.next,--this.length,x}}},{key:"clear",value:function(){this.head=this.tail=null,this.length=0}},{key:"join",value:function(x){if(this.length===0)return"";for(var k=this.head,Q=""+k.data;k=k.next;)Q+=x+k.data;return Q}},{key:"concat",value:function(x){if(this.length===0)return $.alloc(0);for(var k=$.allocUnsafe(x>>>0),Q=this.head,A=0;Q;)G(Q.data,k,A),A+=Q.data.length,Q=Q.next;return k}},{key:"consume",value:function(x,k){var Q;return x<this.head.data.length?(Q=this.head.data.slice(0,x),this.head.data=this.head.data.slice(x)):x===this.head.data.length?Q=this.shift():Q=k?this._getString(x):this._getBuffer(x),Q}},{key:"first",value:function(){return this.head.data}},{key:"_getString",value:function(x){var k=this.head,Q=1,A=k.data;for(x-=A.length;k=k.next;){var R=k.data,P=x>R.length?R.length:x;if(P===R.length?A+=R:A+=R.slice(0,x),x-=P,x===0){P===R.length?(++Q,k.next?this.head=k.next:this.head=this.tail=null):(this.head=k,k.data=R.slice(P));break}++Q}return this.length-=Q,A}},{key:"_getBuffer",value:function(x){var k=$.allocUnsafe(x),Q=this.head,A=1;for(Q.data.copy(k),x-=Q.data.length;Q=Q.next;){var R=Q.data,P=x>R.length?R.length:x;if(R.copy(k,k.length-x,0,P),x-=P,x===0){P===R.length?(++A,Q.next?this.head=Q.next:this.head=this.tail=null):(this.head=Q,Q.data=R.slice(P));break}++A}return this.length-=A,k}},{key:E,value:function(x,k){return F(this,J({},k,{depth:0,customInspect:!1}))}}]),v}()},204:ne=>{"use strict";function te(B,_){var b=this,$=this._readableState&&this._readableState.destroyed,Z=this._writableState&&this._writableState.destroyed;return $||Z?(_?_(B):B&&(this._writableState?this._writableState.errorEmitted||(this._writableState.errorEmitted=!0,process.nextTick(X,this,B)):process.nextTick(X,this,B)),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(B||null,function(F){!_&&F?b._writableState?b._writableState.errorEmitted?process.nextTick(C,b):(b._writableState.errorEmitted=!0,process.nextTick(M,b,F)):process.nextTick(M,b,F):_?(process.nextTick(C,b),_(F)):process.nextTick(C,b)}),this)}function M(B,_){X(B,_),C(B)}function C(B){B._writableState&&!B._writableState.emitClose||B._readableState&&!B._readableState.emitClose||B.emit("close")}function J(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finalCalled=!1,this._writableState.prefinished=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}function X(B,_){B.emit("error",_)}function N(B,_){var b=B._readableState,$=B._writableState;b&&b.autoDestroy||$&&$.autoDestroy?B.destroy(_):B.emit("error",_)}ne.exports={destroy:te,undestroy:J,errorOrDestroy:N}},738:(ne,te,M)=>{"use strict";var C=M(386).q.ERR_STREAM_PREMATURE_CLOSE;function J(_){var b=!1;return function(){if(!b){b=!0;for(var $=arguments.length,Z=new Array($),F=0;F<$;F++)Z[F]=arguments[F];_.apply(this,Z)}}}function X(){}function N(_){return _.setHeader&&typeof _.abort=="function"}function B(_,b,$){if(typeof b=="function")return B(_,null,b);b||(b={}),$=J($||X);var Z=b.readable||b.readable!==!1&&_.readable,F=b.writable||b.writable!==!1&&_.writable,E=function(){_.writable||v()},G=_._writableState&&_._writableState.finished,v=function(){F=!1,G=!0,Z||$.call(_)},S=_._readableState&&_._readableState.endEmitted,x=function(){Z=!1,S=!0,F||$.call(_)},k=function(P){$.call(_,P)},Q=function(){var P;if(Z&&!S)return(!_._readableState||!_._readableState.ended)&&(P=new C),$.call(_,P);if(F&&!G)return(!_._writableState||!_._writableState.ended)&&(P=new C),$.call(_,P)},A=function(){_.req.on("finish",v)};return N(_)?(_.on("complete",v),_.on("abort",Q),_.req?A():_.on("request",A)):F&&!_._writableState&&(_.on("end",E),_.on("close",E)),_.on("end",x),_.on("finish",v),b.error!==!1&&_.on("error",k),_.on("close",Q),function(){_.removeListener("complete",v),_.removeListener("abort",Q),_.removeListener("request",A),_.req&&_.req.removeListener("finish",v),_.removeListener("end",E),_.removeListener("close",E),_.removeListener("finish",v),_.removeListener("end",x),_.removeListener("error",k),_.removeListener("close",Q)}}ne.exports=B},625:ne=>{ne.exports=function(){throw new Error("Readable.from is not available in the browser")}},718:(ne,te,M)=>{"use strict";var C;function J(v){var S=!1;return function(){S||(S=!0,v.apply(void 0,arguments))}}var X=M(386).q,N=X.ERR_MISSING_ARGS,B=X.ERR_STREAM_DESTROYED;function _(v){if(v)throw v}function b(v){return v.setHeader&&typeof v.abort=="function"}function $(v,S,x,k){k=J(k);var Q=!1;v.on("close",function(){Q=!0}),C===void 0&&(C=M(738)),C(v,{readable:S,writable:x},function(R){if(R)return k(R);Q=!0,k()});var A=!1;return function(R){if(!Q&&!A){if(A=!0,b(v))return v.abort();if(typeof v.destroy=="function")return v.destroy();k(R||new B("pipe"))}}}function Z(v){v()}function F(v,S){return v.pipe(S)}function E(v){return!v.length||typeof v[v.length-1]!="function"?_:v.pop()}function G(){for(var v=arguments.length,S=new Array(v),x=0;x<v;x++)S[x]=arguments[x];var k=E(S);if(Array.isArray(S[0])&&(S=S[0]),S.length<2)throw new N("streams");var Q,A=S.map(function(R,P){var D=P<S.length-1,j=P>0;return $(R,D,j,function(K){Q||(Q=K),K&&A.forEach(Z),!D&&(A.forEach(Z),k(Q))})});return S.reduce(F)}ne.exports=G},44:(ne,te,M)=>{"use strict";var C=M(386).q.ERR_INVALID_OPT_VALUE;function J(N,B,_){return N.highWaterMark!=null?N.highWaterMark:B?N[_]:null}function X(N,B,_,b){var $=J(B,b,_);if($!=null){if(!(isFinite($)&&Math.floor($)===$)||$<0){var Z=b?_:"highWaterMark";throw new C(Z,$)}return Math.floor($)}return N.objectMode?16:16384}ne.exports={getHighWaterMark:X}},72:(ne,te,M)=>{ne.exports=M(531).EventEmitter},310:(ne,te,M)=>{te=ne.exports=M(70),te.Stream=te,te.Readable=te,te.Writable=M(501),te.Duplex=M(879),te.Transform=M(269),te.PassThrough=M(100),te.finished=M(738),te.pipeline=M(718)},707:(ne,te,M)=>{/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */var C=M(291),J=C.Buffer;function X(B,_){for(var b in B)_[b]=B[b]}J.from&&J.alloc&&J.allocUnsafe&&J.allocUnsafeSlow?ne.exports=C:(X(C,te),te.Buffer=N);function N(B,_,b){return J(B,_,b)}N.prototype=Object.create(J.prototype),X(J,N),N.from=function(B,_,b){if(typeof B=="number")throw new TypeError("Argument must not be a number");return J(B,_,b)},N.alloc=function(B,_,b){if(typeof B!="number")throw new TypeError("Argument must be a number");var $=J(B);return _!==void 0?typeof b=="string"?$.fill(_,b):$.fill(_):$.fill(0),$},N.allocUnsafe=function(B){if(typeof B!="number")throw new TypeError("Argument must be a number");return J(B)},N.allocUnsafeSlow=function(B){if(typeof B!="number")throw new TypeError("Argument must be a number");return C.SlowBuffer(B)}},682:(ne,te,M)=>{"use strict";var C=M(707).Buffer,J=C.isEncoding||function(A){switch(A=""+A,A&&A.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function X(A){if(!A)return"utf8";for(var R;;)switch(A){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return A;default:if(R)return;A=(""+A).toLowerCase(),R=!0}}function N(A){var R=X(A);if(typeof R!="string"&&(C.isEncoding===J||!J(A)))throw new Error("Unknown encoding: "+A);return R||A}te.s=B;function B(A){this.encoding=N(A);var R;switch(this.encoding){case"utf16le":this.text=G,this.end=v,R=4;break;case"utf8":this.fillLast=Z,R=4;break;case"base64":this.text=S,this.end=x,R=3;break;default:this.write=k,this.end=Q;return}this.lastNeed=0,this.lastTotal=0,this.lastChar=C.allocUnsafe(R)}B.prototype.write=function(A){if(A.length===0)return"";var R,P;if(this.lastNeed){if(R=this.fillLast(A),R===void 0)return"";P=this.lastNeed,this.lastNeed=0}else P=0;return P<A.length?R?R+this.text(A,P):this.text(A,P):R||""},B.prototype.end=E,B.prototype.text=F,B.prototype.fillLast=function(A){if(this.lastNeed<=A.length)return A.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);A.copy(this.lastChar,this.lastTotal-this.lastNeed,0,A.length),this.lastNeed-=A.length};function _(A){return A<=127?0:A>>5===6?2:A>>4===14?3:A>>3===30?4:A>>6===2?-1:-2}function b(A,R,P){var D=R.length-1;if(D<P)return 0;var j=_(R[D]);return j>=0?(j>0&&(A.lastNeed=j-1),j):--D<P||j===-2?0:(j=_(R[D]),j>=0?(j>0&&(A.lastNeed=j-2),j):--D<P||j===-2?0:(j=_(R[D]),j>=0?(j>0&&(j===2?j=0:A.lastNeed=j-3),j):0))}function $(A,R,P){if((R[0]&192)!==128)return A.lastNeed=0,"\uFFFD";if(A.lastNeed>1&&R.length>1){if((R[1]&192)!==128)return A.lastNeed=1,"\uFFFD";if(A.lastNeed>2&&R.length>2&&(R[2]&192)!==128)return A.lastNeed=2,"\uFFFD"}}function Z(A){var R=this.lastTotal-this.lastNeed,P=$(this,A,R);if(P!==void 0)return P;if(this.lastNeed<=A.length)return A.copy(this.lastChar,R,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);A.copy(this.lastChar,R,0,A.length),this.lastNeed-=A.length}function F(A,R){var P=b(this,A,R);if(!this.lastNeed)return A.toString("utf8",R);this.lastTotal=P;var D=A.length-(P-this.lastNeed);return A.copy(this.lastChar,0,D),A.toString("utf8",R,D)}function E(A){var R=A&&A.length?this.write(A):"";return this.lastNeed?R+"\uFFFD":R}function G(A,R){if((A.length-R)%2===0){var P=A.toString("utf16le",R);if(P){var D=P.charCodeAt(P.length-1);if(D>=55296&&D<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=A[A.length-2],this.lastChar[1]=A[A.length-1],P.slice(0,-1)}return P}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=A[A.length-1],A.toString("utf16le",R,A.length-1)}function v(A){var R=A&&A.length?this.write(A):"";if(this.lastNeed){var P=this.lastTotal-this.lastNeed;return R+this.lastChar.toString("utf16le",0,P)}return R}function S(A,R){var P=(A.length-R)%3;return P===0?A.toString("base64",R):(this.lastNeed=3-P,this.lastTotal=3,P===1?this.lastChar[0]=A[A.length-1]:(this.lastChar[0]=A[A.length-2],this.lastChar[1]=A[A.length-1]),A.toString("base64",R,A.length-P))}function x(A){var R=A&&A.length?this.write(A):"";return this.lastNeed?R+this.lastChar.toString("base64",0,3-this.lastNeed):R}function k(A){return A.toString(this.encoding)}function Q(A){return A&&A.length?this.write(A):""}},737:(ne,te,M)=>{ne.exports=C;function C(X,N){if(J("noDeprecation"))return X;var B=!1;function _(){if(!B){if(J("throwDeprecation"))throw new Error(N);J("traceDeprecation"),B=!0}return X.apply(this,arguments)}return _}function J(X){try{if(!M.g.localStorage)return!1}catch{return!1}var N=M.g.localStorage[X];return N==null?!1:String(N).toLowerCase()==="true"}},15:()=>{},2:()=>{}},Qn={};function dn(ne){var te=Qn[ne];if(te!==void 0)return te.exports;var M=Qn[ne]={exports:{}};return Ci[ne](M,M.exports,dn),M.exports}dn.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}();var ja={};(()=>{"use strict";const ne=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();ne.trustedTypes===void 0&&(ne.trustedTypes={createPolicy:(n,r)=>r});const te={configurable:!1,enumerable:!1,writable:!1};ne.FAST===void 0&&Reflect.defineProperty(ne,"FAST",Object.assign({value:Object.create(null)},te));const M=ne.FAST;if(M.getById===void 0){const n=Object.create(null);Reflect.defineProperty(M,"getById",Object.assign({value(r,i){let s=n[r];return s===void 0&&(s=i?n[r]=i():null),s}},te))}const C=Object.freeze([]),J=ne.FAST.getById(1,()=>{const n=[],r=[];function i(){if(r.length)throw r.shift()}function s(f){try{f.call()}catch(d){r.push(d),setTimeout(i,0)}}function a(){let d=0;for(;d<n.length;)if(s(n[d]),d++,d>1024){for(let m=0,w=n.length-d;m<w;m++)n[m]=n[m+d];n.length-=d,d=0}n.length=0}function c(f){n.length<1&&ne.requestAnimationFrame(a),n.push(f)}return Object.freeze({enqueue:c,process:a})}),X=ne.trustedTypes.createPolicy("fast-html",{createHTML:n=>n});let N=X;const B=`fast-${Math.random().toString(36).substring(2,8)}`,_=`${B}{`,b=`}${B}`,$=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(n){if(N!==X)throw new Error("The HTML policy can only be set once.");N=n},createHTML(n){return N.createHTML(n)},isMarker(n){return n&&n.nodeType===8&&n.data.startsWith(B)},extractDirectiveIndexFromMarker(n){return parseInt(n.data.replace(`${B}:`,""))},createInterpolationPlaceholder(n){return`${_}${n}${b}`},createCustomAttributePlaceholder(n,r){return`${n}="${this.createInterpolationPlaceholder(r)}"`},createBlockPlaceholder(n){return`<!--${B}:${n}-->`},queueUpdate:J.enqueue,processUpdates:J.process,nextUpdate(){return new Promise(J.enqueue)},setAttribute(n,r,i){i==null?n.removeAttribute(r):n.setAttribute(r,i)},setBooleanAttribute(n,r,i){i?n.setAttribute(r,""):n.removeAttribute(r)},removeChildNodes(n){for(let r=n.firstChild;r!==null;r=n.firstChild)n.removeChild(r)},createTemplateWalker(n){return document.createTreeWalker(n,133,null,!1)}});class Z{constructor(r,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=r,this.sub1=i}has(r){return this.spillover===void 0?this.sub1===r||this.sub2===r:this.spillover.indexOf(r)!==-1}subscribe(r){const i=this.spillover;if(i===void 0){if(this.has(r))return;if(this.sub1===void 0){this.sub1=r;return}if(this.sub2===void 0){this.sub2=r;return}this.spillover=[this.sub1,this.sub2,r],this.sub1=void 0,this.sub2=void 0}else i.indexOf(r)===-1&&i.push(r)}unsubscribe(r){const i=this.spillover;if(i===void 0)this.sub1===r?this.sub1=void 0:this.sub2===r&&(this.sub2=void 0);else{const s=i.indexOf(r);s!==-1&&i.splice(s,1)}}notify(r){const i=this.spillover,s=this.source;if(i===void 0){const a=this.sub1,c=this.sub2;a!==void 0&&a.handleChange(s,r),c!==void 0&&c.handleChange(s,r)}else for(let a=0,c=i.length;a<c;++a)i[a].handleChange(s,r)}}class F{constructor(r){this.subscribers={},this.sourceSubscribers=null,this.source=r}notify(r){var i;const s=this.subscribers[r];s!==void 0&&s.notify(r),(i=this.sourceSubscribers)===null||i===void 0||i.notify(r)}subscribe(r,i){var s;if(i){let a=this.subscribers[i];a===void 0&&(this.subscribers[i]=a=new Z(this.source)),a.subscribe(r)}else this.sourceSubscribers=(s=this.sourceSubscribers)!==null&&s!==void 0?s:new Z(this.source),this.sourceSubscribers.subscribe(r)}unsubscribe(r,i){var s;if(i){const a=this.subscribers[i];a!==void 0&&a.unsubscribe(r)}else(s=this.sourceSubscribers)===null||s===void 0||s.unsubscribe(r)}}const E=M.getById(2,()=>{const n=/(:|&&|\|\||if)/,r=new WeakMap,i=new WeakMap,s=$.queueUpdate;let a,c=U=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function f(U){let I=U.$fastController||r.get(U);return I===void 0&&(Array.isArray(U)?I=c(U):r.set(U,I=new F(U))),I}function d(U){let I=i.get(U);if(I===void 0){let z=Reflect.getPrototypeOf(U);for(;I===void 0&&z!==null;)I=i.get(z),z=Reflect.getPrototypeOf(z);I===void 0?I=[]:I=I.slice(0),i.set(U,I)}return I}class m{constructor(I){this.name=I,this.field=`_${I}`,this.callback=`${I}Changed`}getValue(I){return a!==void 0&&a.watch(I,this.name),I[this.field]}setValue(I,z){const ae=this.field,be=I[ae];if(be!==z){I[ae]=z;const ye=I[this.callback];typeof ye=="function"&&ye.call(I,be,z),f(I).notify(this.name)}}}class w extends Z{constructor(I,z,ae=!1){super(I,z),this.binding=I,this.isVolatileBinding=ae,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(I,z){this.needsRefresh&&this.last!==null&&this.disconnect();const ae=a;a=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const be=this.binding(I,z);return a=ae,be}disconnect(){if(this.last!==null){let I=this.first;for(;I!==void 0;)I.notifier.unsubscribe(this,I.propertyName),I=I.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(I,z){const ae=this.last,be=f(I),ye=ae===null?this.first:{};if(ye.propertySource=I,ye.propertyName=z,ye.notifier=be,be.subscribe(this,z),ae!==null){if(!this.needsRefresh){let ot;a=void 0,ot=ae.propertySource[ae.propertyName],a=this,I===ot&&(this.needsRefresh=!0)}ae.next=ye}this.last=ye}handleChange(){this.needsQueue&&(this.needsQueue=!1,s(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let I=this.first;return{next:()=>{const z=I;return z===void 0?{value:void 0,done:!0}:(I=I.next,{value:z,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(U){c=U},getNotifier:f,track(U,I){a!==void 0&&a.watch(U,I)},trackVolatile(){a!==void 0&&(a.needsRefresh=!0)},notify(U,I){f(U).notify(I)},defineProperty(U,I){typeof I=="string"&&(I=new m(I)),d(U).push(I),Reflect.defineProperty(U,I.name,{enumerable:!0,get:function(){return I.getValue(this)},set:function(z){I.setValue(this,z)}})},getAccessors:d,binding(U,I,z=this.isVolatileBinding(U)){return new w(U,I,z)},isVolatileBinding(U){return n.test(U.toString())}})});function G(n,r){E.defineProperty(n,r)}function v(n,r,i){return Object.assign({},i,{get:function(){return E.trackVolatile(),i.get.apply(this)}})}const S=M.getById(3,()=>{let n=null;return{get(){return n},set(r){n=r}}});class x{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return S.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(r){S.set(r)}}E.defineProperty(x.prototype,"index"),E.defineProperty(x.prototype,"length");const k=Object.seal(new x);class Q{constructor(){this.targets=new WeakSet}addStylesTo(r){this.targets.add(r)}removeStylesFrom(r){this.targets.delete(r)}isAttachedTo(r){return this.targets.has(r)}withBehaviors(...r){return this.behaviors=this.behaviors===null?r:this.behaviors.concat(r),this}}Q.create=(()=>{if($.supportsAdoptedStyleSheets){const n=new Map;return r=>new P(r,n)}return n=>new K(n)})();function A(n){return n.map(r=>r instanceof Q?A(r.styles):[r]).reduce((r,i)=>r.concat(i),[])}function R(n){return n.map(r=>r instanceof Q?r.behaviors:null).reduce((r,i)=>i===null?r:(r===null&&(r=[]),r.concat(i)),null)}class P extends Q{constructor(r,i){super(),this.styles=r,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=R(r)}get styleSheets(){if(this._styleSheets===void 0){const r=this.styles,i=this.styleSheetCache;this._styleSheets=A(r).map(s=>{if(s instanceof CSSStyleSheet)return s;let a=i.get(s);return a===void 0&&(a=new CSSStyleSheet,a.replaceSync(s),i.set(s,a)),a})}return this._styleSheets}addStylesTo(r){r.adoptedStyleSheets=[...r.adoptedStyleSheets,...this.styleSheets],super.addStylesTo(r)}removeStylesFrom(r){const i=this.styleSheets;r.adoptedStyleSheets=r.adoptedStyleSheets.filter(s=>i.indexOf(s)===-1),super.removeStylesFrom(r)}}let D=0;function j(){return`fast-style-class-${++D}`}class K extends Q{constructor(r){super(),this.styles=r,this.behaviors=null,this.behaviors=R(r),this.styleSheets=A(r),this.styleClass=j()}addStylesTo(r){const i=this.styleSheets,s=this.styleClass;r=this.normalizeTarget(r);for(let a=0;a<i.length;a++){const c=document.createElement("style");c.innerHTML=i[a],c.className=s,r.append(c)}super.addStylesTo(r)}removeStylesFrom(r){r=this.normalizeTarget(r);const i=r.querySelectorAll(`.${this.styleClass}`);for(let s=0,a=i.length;s<a;++s)r.removeChild(i[s]);super.removeStylesFrom(r)}isAttachedTo(r){return super.isAttachedTo(this.normalizeTarget(r))}normalizeTarget(r){return r===document?document.body:r}}const oe={toView(n){return n?"true":"false"},fromView(n){return!(n==null||n==="false"||n===!1||n===0)}},ie={toView(n){if(n==null)return null;const r=n*1;return isNaN(r)?null:r.toString()},fromView(n){if(n==null)return null;const r=n*1;return isNaN(r)?null:r}};class se{constructor(r,i,s=i.toLowerCase(),a="reflect",c){this.guards=new Set,this.Owner=r,this.name=i,this.attribute=s,this.mode=a,this.converter=c,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in r.prototype,a==="boolean"&&c===void 0&&(this.converter=oe)}setValue(r,i){const s=r[this.fieldName],a=this.converter;a!==void 0&&(i=a.fromView(i)),s!==i&&(r[this.fieldName]=i,this.tryReflectToAttribute(r),this.hasCallback&&r[this.callbackName](s,i),r.$fastController.notify(this.name))}getValue(r){return E.track(r,this.name),r[this.fieldName]}onAttributeChangedCallback(r,i){this.guards.has(r)||(this.guards.add(r),this.setValue(r,i),this.guards.delete(r))}tryReflectToAttribute(r){const i=this.mode,s=this.guards;s.has(r)||i==="fromView"||$.queueUpdate(()=>{s.add(r);const a=r[this.fieldName];switch(i){case"reflect":const c=this.converter;$.setAttribute(r,this.attribute,c!==void 0?c.toView(a):a);break;case"boolean":$.setBooleanAttribute(r,this.attribute,a);break}s.delete(r)})}static collect(r,...i){const s=[];i.push(r.attributes);for(let a=0,c=i.length;a<c;++a){const f=i[a];if(f!==void 0)for(let d=0,m=f.length;d<m;++d){const w=f[d];typeof w=="string"?s.push(new se(r,w)):s.push(new se(r,w.property,w.attribute,w.mode,w.converter))}}return s}}function W(n,r){let i;function s(a,c){arguments.length>1&&(i.property=c),(a.constructor.attributes||(a.constructor.attributes=[])).push(i)}if(arguments.length>1){i={},s(n,r);return}return i=n===void 0?{}:n,s}const De={mode:"open"},Ie={},He=M.getById(4,()=>{const n=new Map;return Object.freeze({register(r){return n.has(r.type)?!1:(n.set(r.type,r),!0)},getByType(r){return n.get(r)}})});class $e{constructor(r,i=r.definition){typeof i=="string"&&(i={name:i}),this.type=r,this.name=i.name,this.template=i.template;const s=se.collect(r,i.attributes),a=new Array(s.length),c={},f={};for(let d=0,m=s.length;d<m;++d){const w=s[d];a[d]=w.attribute,c[w.name]=w,f[w.attribute]=w}this.attributes=s,this.observedAttributes=a,this.propertyLookup=c,this.attributeLookup=f,this.shadowOptions=i.shadowOptions===void 0?De:i.shadowOptions===null?void 0:Object.assign(Object.assign({},De),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?Ie:Object.assign(Object.assign({},Ie),i.elementOptions),this.styles=i.styles===void 0?void 0:Array.isArray(i.styles)?Q.create(i.styles):i.styles instanceof Q?i.styles:Q.create([i.styles])}get isDefined(){return!!He.getByType(this.type)}define(r=customElements){const i=this.type;if(He.register(this)){const s=this.attributes,a=i.prototype;for(let c=0,f=s.length;c<f;++c)E.defineProperty(a,s[c]);Reflect.defineProperty(i,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return r.get(this.name)||r.define(this.name,i,this.elementOptions),this}}$e.forType=He.getByType;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var Ge=function(n,r){return Ge=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,s){i.__proto__=s}||function(i,s){for(var a in s)s.hasOwnProperty(a)&&(i[a]=s[a])},Ge(n,r)};function st(n,r){Ge(n,r);function i(){this.constructor=n}n.prototype=r===null?Object.create(r):(i.prototype=r.prototype,new i)}var Ze=function(){return Ze=Object.assign||function(r){for(var i,s=1,a=arguments.length;s<a;s++){i=arguments[s];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(r[c]=i[c])}return r},Ze.apply(this,arguments)};function We(n,r){var i={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&r.indexOf(s)<0&&(i[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(n);a<s.length;a++)r.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(n,s[a])&&(i[s[a]]=n[s[a]]);return i}function le(n,r,i,s){var a=arguments.length,c=a<3?r:s===null?s=Object.getOwnPropertyDescriptor(r,i):s,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(n,r,i,s);else for(var d=n.length-1;d>=0;d--)(f=n[d])&&(c=(a<3?f(c):a>3?f(r,i,c):f(r,i))||c);return a>3&&c&&Object.defineProperty(r,i,c),c}function ve(n,r){return function(i,s){r(i,s,n)}}function Se(n,r){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(n,r)}function at(n,r,i,s){function a(c){return c instanceof i?c:new i(function(f){f(c)})}return new(i||(i=Promise))(function(c,f){function d(U){try{w(s.next(U))}catch(I){f(I)}}function m(U){try{w(s.throw(U))}catch(I){f(I)}}function w(U){U.done?c(U.value):a(U.value).then(d,m)}w((s=s.apply(n,r||[])).next())})}function Xe(n,r){var i={label:0,sent:function(){if(c[0]&1)throw c[1];return c[1]},trys:[],ops:[]},s,a,c,f;return f={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(f[Symbol.iterator]=function(){return this}),f;function d(w){return function(U){return m([w,U])}}function m(w){if(s)throw new TypeError("Generator is already executing.");for(;i;)try{if(s=1,a&&(c=w[0]&2?a.return:w[0]?a.throw||((c=a.return)&&c.call(a),0):a.next)&&!(c=c.call(a,w[1])).done)return c;switch(a=0,c&&(w=[w[0]&2,c.value]),w[0]){case 0:case 1:c=w;break;case 4:return i.label++,{value:w[1],done:!1};case 5:i.label++,a=w[1],w=[0];continue;case 7:w=i.ops.pop(),i.trys.pop();continue;default:if(c=i.trys,!(c=c.length>0&&c[c.length-1])&&(w[0]===6||w[0]===2)){i=0;continue}if(w[0]===3&&(!c||w[1]>c[0]&&w[1]<c[3])){i.label=w[1];break}if(w[0]===6&&i.label<c[1]){i.label=c[1],c=w;break}if(c&&i.label<c[2]){i.label=c[2],i.ops.push(w);break}c[2]&&i.ops.pop(),i.trys.pop();continue}w=r.call(n,i)}catch(U){w=[6,U],a=0}finally{s=c=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}}function Ne(n,r,i,s){s===void 0&&(s=i),n[s]=r[i]}function pt(n,r){for(var i in n)i!=="default"&&!r.hasOwnProperty(i)&&(r[i]=n[i])}function Ke(n){var r=typeof Symbol=="function"&&Symbol.iterator,i=r&&n[r],s=0;if(i)return i.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&s>=n.length&&(n=void 0),{value:n&&n[s++],done:!n}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")}function L(n,r){var i=typeof Symbol=="function"&&n[Symbol.iterator];if(!i)return n;var s=i.call(n),a,c=[],f;try{for(;(r===void 0||r-- >0)&&!(a=s.next()).done;)c.push(a.value)}catch(d){f={error:d}}finally{try{a&&!a.done&&(i=s.return)&&i.call(s)}finally{if(f)throw f.error}}return c}function O(){for(var n=[],r=0;r<arguments.length;r++)n=n.concat(L(arguments[r]));return n}function Y(){for(var n=0,r=0,i=arguments.length;r<i;r++)n+=arguments[r].length;for(var s=Array(n),a=0,r=0;r<i;r++)for(var c=arguments[r],f=0,d=c.length;f<d;f++,a++)s[a]=c[f];return s}function re(n){return this instanceof re?(this.v=n,this):new re(n)}function ce(n,r,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(n,r||[]),a,c=[];return a={},f("next"),f("throw"),f("return"),a[Symbol.asyncIterator]=function(){return this},a;function f(z){s[z]&&(a[z]=function(ae){return new Promise(function(be,ye){c.push([z,ae,be,ye])>1||d(z,ae)})})}function d(z,ae){try{m(s[z](ae))}catch(be){I(c[0][3],be)}}function m(z){z.value instanceof re?Promise.resolve(z.value.v).then(w,U):I(c[0][2],z)}function w(z){d("next",z)}function U(z){d("throw",z)}function I(z,ae){z(ae),c.shift(),c.length&&d(c[0][0],c[0][1])}}function g(n){var r,i;return r={},s("next"),s("throw",function(a){throw a}),s("return"),r[Symbol.iterator]=function(){return this},r;function s(a,c){r[a]=n[a]?function(f){return(i=!i)?{value:re(n[a](f)),done:a==="return"}:c?c(f):f}:c}}function y(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n[Symbol.asyncIterator],i;return r?r.call(n):(n=typeof Ke=="function"?Ke(n):n[Symbol.iterator](),i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i);function s(c){i[c]=n[c]&&function(f){return new Promise(function(d,m){f=n[c](f),a(d,m,f.done,f.value)})}}function a(c,f,d,m){Promise.resolve(m).then(function(w){c({value:w,done:d})},f)}}function H(n,r){return Object.defineProperty?Object.defineProperty(n,"raw",{value:r}):n.raw=r,n}function h(n){if(n&&n.__esModule)return n;var r={};if(n!=null)for(var i in n)Object.hasOwnProperty.call(n,i)&&(r[i]=n[i]);return r.default=n,r}function l(n){return n&&n.__esModule?n:{default:n}}function u(n,r){if(!r.has(n))throw new TypeError("attempted to get private field on non-instance");return r.get(n)}function p(n,r,i){if(!r.has(n))throw new TypeError("attempted to set private field on non-instance");return r.set(n,i),i}const T=new WeakMap,V={bubbles:!0,composed:!0,cancelable:!0};function q(n){return n.shadowRoot||T.get(n)||null}class fe extends F{constructor(r,i){super(r),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=r,this.definition=i;const s=i.shadowOptions;if(s!==void 0){const c=r.attachShadow(s);s.mode==="closed"&&T.set(r,c)}const a=E.getAccessors(r);if(a.length>0){const c=this.boundObservables=Object.create(null);for(let f=0,d=a.length;f<d;++f){const m=a[f].name,w=r[m];w!==void 0&&(delete r[m],c[m]=w)}}}get isConnected(){return E.track(this,"isConnected"),this._isConnected}setIsConnected(r){this._isConnected=r,E.notify(this,"isConnected")}get template(){return this._template}set template(r){this._template!==r&&(this._template=r,this.needsInitialization||this.renderTemplate(r))}get styles(){return this._styles}set styles(r){this._styles!==r&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=r,!this.needsInitialization&&r!==null&&this.addStyles(r))}addStyles(r){const i=q(this.element)||this.element.getRootNode();if(r instanceof HTMLStyleElement)i.append(r);else if(!r.isAttachedTo(i)){const s=r.behaviors;r.addStylesTo(i),s!==null&&this.addBehaviors(s)}}removeStyles(r){const i=q(this.element)||this.element.getRootNode();if(r instanceof HTMLStyleElement)i.removeChild(r);else if(r.isAttachedTo(i)){const s=r.behaviors;r.removeStylesFrom(i),s!==null&&this.removeBehaviors(s)}}addBehaviors(r){const i=this.behaviors||(this.behaviors=new Map),s=r.length,a=[];for(let c=0;c<s;++c){const f=r[c];i.has(f)?i.set(f,i.get(f)+1):(i.set(f,1),a.push(f))}if(this._isConnected){const c=this.element;for(let f=0;f<a.length;++f)a[f].bind(c,k)}}removeBehaviors(r,i=!1){const s=this.behaviors;if(s===null)return;const a=r.length,c=[];for(let f=0;f<a;++f){const d=r[f];if(s.has(d)){const m=s.get(d)-1;m===0||i?s.delete(d)&&c.push(d):s.set(d,m)}}if(this._isConnected){const f=this.element;for(let d=0;d<c.length;++d)c[d].unbind(f)}}onConnectedCallback(){if(this._isConnected)return;const r=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(r,k);const i=this.behaviors;if(i!==null)for(const[s]of i)s.bind(r,k);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const r=this.view;r!==null&&r.unbind();const i=this.behaviors;if(i!==null){const s=this.element;for(const[a]of i)a.unbind(s)}}onAttributeChangedCallback(r,i,s){const a=this.definition.attributeLookup[r];a!==void 0&&a.onAttributeChangedCallback(this.element,s)}emit(r,i,s){return this._isConnected?this.element.dispatchEvent(new CustomEvent(r,Object.assign(Object.assign({detail:i},V),s))):!1}finishInitialization(){const r=this.element,i=this.boundObservables;if(i!==null){const a=Object.keys(i);for(let c=0,f=a.length;c<f;++c){const d=a[c];r[d]=i[d]}this.boundObservables=null}const s=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(r){const i=this.element,s=q(i)||i;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||$.removeChildNodes(s),r&&(this.view=r.render(i,s,i))}static forCustomElement(r){const i=r.$fastController;if(i!==void 0)return i;const s=$e.forType(r.constructor);if(s===void 0)throw new Error("Missing FASTElement definition.");return r.$fastController=new fe(r,s)}}function de(n){return class extends n{constructor(){super(),fe.forCustomElement(this)}$emit(r,i,s){return this.$fastController.emit(r,i,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(r,i,s){this.$fastController.onAttributeChangedCallback(r,i,s)}}}const he=Object.assign(de(HTMLElement),{from(n){return de(n)},define(n,r){return new $e(n,r).define().type}});function we(n){return function(r){new $e(r,n).define()}}const pe=new Map;"metadata"in Reflect||(Reflect.metadata=function(n,r){return function(i){Reflect.defineMetadata(n,r,i)}},Reflect.defineMetadata=function(n,r,i){let s=pe.get(i);s===void 0&&pe.set(i,s=new Map),s.set(n,r)},Reflect.getOwnMetadata=function(n,r){const i=pe.get(r);if(i!==void 0)return i.get(n)});class Be{constructor(r,i){this.container=r,this.key=i}instance(r){return this.registerResolver(0,r)}singleton(r){return this.registerResolver(1,r)}transient(r){return this.registerResolver(2,r)}callback(r){return this.registerResolver(3,r)}cachedCallback(r){return this.registerResolver(3,rr(r))}aliasTo(r){return this.registerResolver(5,r)}registerResolver(r,i){const{container:s,key:a}=this;return this.container=this.key=void 0,s.registerResolver(a,new Le(a,r,i))}}function Fe(n){const r=n.slice(),i=Object.keys(n),s=i.length;let a;for(let c=0;c<s;++c)a=i[c],ar(a)||(r[a]=n[a]);return r}const Ue=Object.freeze({none(n){throw Error(`${n.toString()} not registered, did you forget to add @singleton()?`)},singleton(n){return new Le(n,1,n)},transient(n){return new Le(n,2,n)}}),pn=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Ue.singleton})}),Yn=new Map;function Jn(n){return r=>Reflect.getOwnMetadata(n,r)}let Zn=null;const ge=Object.freeze({createContainer(n){return new Tt(null,Object.assign({},pn.default,n))},findResponsibleContainer(n){const r=n.$$container$$;return r&&r.responsibleForOwnerRequests?r:ge.findParentContainer(n)},findParentContainer(n){const r=new CustomEvent(nr,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return n.dispatchEvent(r),r.detail.container||ge.getOrCreateDOMContainer()},getOrCreateDOMContainer(n,r){return n?n.$$container$$||new Tt(n,Object.assign({},pn.default,r,{parentLocator:ge.findParentContainer})):Zn||(Zn=new Tt(null,Object.assign({},pn.default,r,{parentLocator:()=>null})))},getDesignParamtypes:Jn("design:paramtypes"),getAnnotationParamtypes:Jn("di:paramtypes"),getOrCreateAnnotationParamTypes(n){let r=this.getAnnotationParamtypes(n);return r===void 0&&Reflect.defineMetadata("di:paramtypes",r=[],n),r},getDependencies(n){let r=Yn.get(n);if(r===void 0){const i=n.inject;if(i===void 0){const s=ge.getDesignParamtypes(n),a=ge.getAnnotationParamtypes(n);if(s===void 0)if(a===void 0){const c=Object.getPrototypeOf(n);typeof c=="function"&&c!==Function.prototype?r=Fe(ge.getDependencies(c)):r=[]}else r=Fe(a);else if(a===void 0)r=Fe(s);else{r=Fe(s);let c=a.length,f;for(let w=0;w<c;++w)f=a[w],f!==void 0&&(r[w]=f);const d=Object.keys(a);c=d.length;let m;for(let w=0;w<c;++w)m=d[w],ar(m)||(r[m]=a[m])}}else r=Fe(i);Yn.set(n,r)}return r},defineProperty(n,r,i,s=!1){const a=`$di_${r}`;Reflect.defineProperty(n,r,{get:function(){let c=this[a];if(c===void 0&&(c=(this instanceof HTMLElement?ge.findResponsibleContainer(this):ge.getOrCreateDOMContainer()).get(i),this[a]=c,s&&this instanceof he)){const d=this.$fastController,m=()=>{const U=ge.findResponsibleContainer(this).get(i),I=this[a];U!==I&&(this[a]=c,d.notify(r))};d.subscribe({handleChange:m},"isConnected")}return c}})},createInterface(n,r){const i=typeof n=="function"?n:r,s=typeof n=="string"?n:n&&"friendlyName"in n&&n.friendlyName||or,a=typeof n=="string"?!1:n&&"respectConnection"in n&&n.respectConnection||!1,c=function(f,d,m){if(f==null||new.target!==void 0)throw new Error(`No registration for interface: '${c.friendlyName}'`);if(d)ge.defineProperty(f,d,c,a);else{const w=ge.getOrCreateAnnotationParamTypes(f);w[m]=c}};return c.$isInterface=!0,c.friendlyName=s??"(anonymous)",i!=null&&(c.register=function(f,d){return i(new Be(f,d??c))}),c.toString=function(){return`InterfaceSymbol<${c.friendlyName}>`},c},inject(...n){return function(r,i,s){if(typeof s=="number"){const a=ge.getOrCreateAnnotationParamTypes(r),c=n[0];c!==void 0&&(a[s]=c)}else if(i)ge.defineProperty(r,i,n[0]);else{const a=s?ge.getOrCreateAnnotationParamTypes(s.value):ge.getOrCreateAnnotationParamTypes(r);let c;for(let f=0;f<n.length;++f)c=n[f],c!==void 0&&(a[f]=c)}}},transient(n){return n.register=function(i){return $t.transient(n,n).register(i)},n.registerInRequestor=!1,n},singleton(n,r=Ni){return n.register=function(s){return $t.singleton(n,n).register(s)},n.registerInRequestor=r.scoped,n}}),Mi=ge.createInterface("Container"),Ha=null;function zt(n){return function(r){const i=function(s,a,c){ge.inject(i)(s,a,c)};return i.$isResolver=!0,i.resolve=function(s,a){return n(r,s,a)},i}}const Wa=ge.inject;function Xn(n){return ge.transient(n)}function za(n){return n==null?Xn:Xn(n)}const Ni={scoped:!1};function qa(n){return ge.singleton(n)}function Ga(n){return typeof n=="function"?ge.singleton(n):function(r){return ge.singleton(r,n)}}function Ui(n){return function(r,i){i=!!i;const s=function(a,c,f){ge.inject(s)(a,c,f)};return s.$isResolver=!0,s.resolve=function(a,c){return n(r,a,c,i)},s}}const Qa=Ui((n,r,i,s)=>i.getAll(n,s)),Ya=zt((n,r,i)=>()=>i.get(n)),Ja=zt((n,r,i)=>{if(i.has(n,!0))return i.get(n)});function gn(n,r,i){ge.inject(gn)(n,r,i)}gn.$isResolver=!0,gn.resolve=()=>{};const Za=zt((n,r,i)=>{const s=Kn(n,r),a=new Le(n,0,s);return i.registerResolver(n,a),s}),Xa=zt((n,r,i)=>Kn(n,r));function Kn(n,r){return r.getFactory(n).construct(r)}class Le{constructor(r,i,s){this.key=r,this.strategy=i,this.state=s,this.resolving=!1}get $isResolver(){return!0}register(r){return r.registerResolver(this.key,this)}resolve(r,i){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=r.getFactory(this.state).construct(i),this.strategy=0,this.resolving=!1,this.state}case 2:{const s=r.getFactory(this.state);if(s===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return s.construct(i)}case 3:return this.state(r,i,this);case 4:return this.state[0].resolve(r,i);case 5:return i.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(r){var i,s,a;switch(this.strategy){case 1:case 2:return r.getFactory(this.state);case 5:return(a=(s=(i=r.getResolver(this.state))===null||i===void 0?void 0:i.getFactory)===null||s===void 0?void 0:s.call(i,r))!==null&&a!==void 0?a:null;default:return null}}}function er(n){return this.get(n)}function Vi(n,r){return r(n)}class ji{constructor(r,i){this.Type=r,this.dependencies=i,this.transformers=null}construct(r,i){let s;return i===void 0?s=new this.Type(...this.dependencies.map(er,r)):s=new this.Type(...this.dependencies.map(er,r),...i),this.transformers==null?s:this.transformers.reduce(Vi,s)}registerTransformer(r){(this.transformers||(this.transformers=[])).push(r)}}const Hi={$isResolver:!0,resolve(n,r){return r}};function qt(n){return typeof n.register=="function"}function Wi(n){return qt(n)&&typeof n.registerInRequestor=="boolean"}function tr(n){return Wi(n)&&n.registerInRequestor}function zi(n){return n.prototype!==void 0}const qi=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),nr="__DI_LOCATE_PARENT__",bn=new Map;class Tt{constructor(r,i){this.owner=r,this.config=i,this._parent=void 0,this.registerDepth=0,this.context=null,r!==null&&(r.$$container$$=this),this.resolvers=new Map,this.resolvers.set(Mi,Hi),r instanceof Node&&r.addEventListener(nr,s=>{s.composedPath()[0]!==this.owner&&(s.detail.container=this,s.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(r,...i){return this.context=r,this.register(...i),this.context=null,this}register(...r){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let i,s,a,c,f;const d=this.context;for(let m=0,w=r.length;m<w;++m)if(i=r[m],!!sr(i))if(qt(i))i.register(this,d);else if(zi(i))$t.singleton(i,i).register(this);else for(s=Object.keys(i),c=0,f=s.length;c<f;++c)a=i[s[c]],sr(a)&&(qt(a)?a.register(this,d):this.register(a));return--this.registerDepth,this}registerResolver(r,i){Gt(r);const s=this.resolvers,a=s.get(r);return a==null?s.set(r,i):a instanceof Le&&a.strategy===4?a.state.push(i):s.set(r,new Le(r,4,[a,i])),i}registerTransformer(r,i){const s=this.getResolver(r);if(s==null)return!1;if(s.getFactory){const a=s.getFactory(this);return a==null?!1:(a.registerTransformer(i),!0)}return!1}getResolver(r,i=!0){if(Gt(r),r.resolve!==void 0)return r;let s=this,a;for(;s!=null;)if(a=s.resolvers.get(r),a==null){if(s.parent==null){const c=tr(r)?this:s;return i?this.jitRegister(r,c):null}s=s.parent}else return a;return null}has(r,i=!1){return this.resolvers.has(r)?!0:i&&this.parent!=null?this.parent.has(r,!0):!1}get(r){if(Gt(r),r.$isResolver)return r.resolve(this,this);let i=this,s;for(;i!=null;)if(s=i.resolvers.get(r),s==null){if(i.parent==null){const a=tr(r)?this:i;return s=this.jitRegister(r,a),s.resolve(i,this)}i=i.parent}else return s.resolve(i,this);throw new Error(`Unable to resolve key: ${r}`)}getAll(r,i=!1){Gt(r);const s=this;let a=s,c;if(i){let f=C;for(;a!=null;)c=a.resolvers.get(r),c!=null&&(f=f.concat(ir(c,a,s))),a=a.parent;return f}else for(;a!=null;)if(c=a.resolvers.get(r),c==null){if(a=a.parent,a==null)return C}else return ir(c,a,s);return C}getFactory(r){let i=bn.get(r);if(i===void 0){if(Gi(r))throw new Error(`${r.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);bn.set(r,i=new ji(r,ge.getDependencies(r)))}return i}registerFactory(r,i){bn.set(r,i)}createChild(r){return new Tt(null,Object.assign({},this.config,r,{parentLocator:()=>this}))}jitRegister(r,i){if(typeof r!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${r}'. Did you forget to register this dependency?`);if(qi.has(r.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${r.name}. Did you forget to add @inject(Key)`);if(qt(r)){const s=r.register(i);if(!(s instanceof Object)||s.resolve==null){const a=i.resolvers.get(r);if(a!=null)return a;throw new Error("A valid resolver was not returned from the static register method")}return s}else{if(r.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${r.friendlyName}`);{const s=this.config.defaultResolver(r,i);return i.resolvers.set(r,s),s}}}}const yn=new WeakMap;function rr(n){return function(r,i,s){if(yn.has(s))return yn.get(s);const a=n(r,i,s);return yn.set(s,a),a}}const $t=Object.freeze({instance(n,r){return new Le(n,0,r)},singleton(n,r){return new Le(n,1,r)},transient(n,r){return new Le(n,2,r)},callback(n,r){return new Le(n,3,r)},cachedCallback(n,r){return new Le(n,3,rr(r))},aliasTo(n,r){return new Le(r,5,n)}});function Gt(n){if(n==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function ir(n,r,i){if(n instanceof Le&&n.strategy===4){const s=n.state;let a=s.length;const c=new Array(a);for(;a--;)c[a]=s[a].resolve(r,i);return c}return[n.resolve(r,i)]}const or="(anonymous)";function sr(n){return typeof n=="object"&&n!==null||typeof n=="function"}const Gi=function(){const n=new WeakMap;let r=!1,i="",s=0;return function(a){return r=n.get(a),r===void 0&&(i=a.toString(),s=i.length,r=s>=29&&s<=100&&i.charCodeAt(s-1)===125&&i.charCodeAt(s-2)<=32&&i.charCodeAt(s-3)===93&&i.charCodeAt(s-4)===101&&i.charCodeAt(s-5)===100&&i.charCodeAt(s-6)===111&&i.charCodeAt(s-7)===99&&i.charCodeAt(s-8)===32&&i.charCodeAt(s-9)===101&&i.charCodeAt(s-10)===118&&i.charCodeAt(s-11)===105&&i.charCodeAt(s-12)===116&&i.charCodeAt(s-13)===97&&i.charCodeAt(s-14)===110&&i.charCodeAt(s-15)===88,n.set(a,r)),r}}(),Qt={};function ar(n){switch(typeof n){case"number":return n>=0&&(n|0)===n;case"string":{const r=Qt[n];if(r!==void 0)return r;const i=n.length;if(i===0)return Qt[n]=!1;let s=0;for(let a=0;a<i;++a)if(s=n.charCodeAt(a),a===0&&s===48&&i>1||s<48||s>57)return Qt[n]=!1;return Qt[n]=!0}default:return!1}}function lr(n){return`${n.toLowerCase()}:presentation`}const Yt=new Map,cr=Object.freeze({define(n,r,i){const s=lr(n);Yt.get(s)===void 0?Yt.set(s,r):Yt.set(s,!1),i.register($t.instance(s,r))},forTag(n,r){const i=lr(n),s=Yt.get(i);return s===!1?ge.findResponsibleContainer(r).get(i):s||null}});class Qi{constructor(r,i){this.template=r||null,this.styles=i===void 0?null:Array.isArray(i)?Q.create(i):i instanceof Q?i:Q.create([i])}applyTo(r){const i=r.$fastController;i.template===null&&(i.template=this.template),i.styles===null&&(i.styles=this.styles)}}class lt extends he{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=cr.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(r){return(i={})=>new Yi(this===lt?class extends lt{}:this,r,i)}}le([G],lt.prototype,"template",void 0),le([G],lt.prototype,"styles",void 0);function Ft(n,r,i){return typeof n=="function"?n(r,i):n}class Yi{constructor(r,i,s){this.type=r,this.elementDefinition=i,this.overrideDefinition=s,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(r,i){const s=this.definition,a=this.overrideDefinition,f=`${s.prefix||i.elementPrefix}-${s.baseName}`;i.tryDefineElement({name:f,type:this.type,baseClass:this.elementDefinition.baseClass,callback:d=>{const m=new Qi(Ft(s.template,d,s),Ft(s.styles,d,s));d.definePresentation(m);let w=Ft(s.shadowOptions,d,s);d.shadowRootMode&&(w?a.shadowOptions||(w.mode=d.shadowRootMode):w!==null&&(w={mode:d.shadowRootMode})),d.defineElement({elementOptions:Ft(s.elementOptions,d,s),shadowOptions:w,attributes:Ft(s.attributes,d,s)})}})}}class ur{createCSS(){return""}createBehavior(){}}function vn(n){const r=n.parentElement;if(r)return r;{const i=n.getRootNode();if(i.host instanceof HTMLElement)return i.host}return null}function Ji(n,r){let i=r;for(;i!==null;){if(i===n)return!0;i=vn(i)}return!1}const Qe=document.createElement("div");function Zi(n){return n instanceof he}class mn{setProperty(r,i){$.queueUpdate(()=>this.target.setProperty(r,i))}removeProperty(r){$.queueUpdate(()=>this.target.removeProperty(r))}}class Xi extends mn{constructor(r){super();const i=new CSSStyleSheet;this.target=i.cssRules[i.insertRule(":host{}")].style,r.$fastController.addStyles(Q.create([i]))}}class Ki extends mn{constructor(){super();const r=new CSSStyleSheet;this.target=r.cssRules[r.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,r]}}class eo extends mn{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:r}=this.style;if(r){const i=r.insertRule(":root{}",r.cssRules.length);this.target=r.cssRules[i].style}}}class fr{constructor(r){this.store=new Map,this.target=null;const i=r.$fastController;this.style=document.createElement("style"),i.addStyles(this.style),E.getNotifier(i).subscribe(this,"isConnected"),this.handleChange(i,"isConnected")}targetChanged(){if(this.target!==null)for(const[r,i]of this.store.entries())this.target.setProperty(r,i)}setProperty(r,i){this.store.set(r,i),$.queueUpdate(()=>{this.target!==null&&this.target.setProperty(r,i)})}removeProperty(r){this.store.delete(r),$.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(r)})}handleChange(r,i){const{sheet:s}=this.style;if(s){const a=s.insertRule(":host{}",s.cssRules.length);this.target=s.cssRules[a].style}else this.target=null}}le([G],fr.prototype,"target",void 0);class to{constructor(r){this.target=r.style}setProperty(r,i){$.queueUpdate(()=>this.target.setProperty(r,i))}removeProperty(r){$.queueUpdate(()=>this.target.removeProperty(r))}}class Ee{setProperty(r,i){Ee.properties[r]=i;for(const s of Ee.roots.values())gt.getOrCreate(Ee.normalizeRoot(s)).setProperty(r,i)}removeProperty(r){delete Ee.properties[r];for(const i of Ee.roots.values())gt.getOrCreate(Ee.normalizeRoot(i)).removeProperty(r)}static registerRoot(r){const{roots:i}=Ee;if(!i.has(r)){i.add(r);const s=gt.getOrCreate(this.normalizeRoot(r));for(const a in Ee.properties)s.setProperty(a,Ee.properties[a])}}static unregisterRoot(r){const{roots:i}=Ee;if(i.has(r)){i.delete(r);const s=gt.getOrCreate(Ee.normalizeRoot(r));for(const a in Ee.properties)s.removeProperty(a)}}static normalizeRoot(r){return r===Qe?document:r}}Ee.roots=new Set,Ee.properties={};const wn=new WeakMap,no=$.supportsAdoptedStyleSheets?Xi:fr,gt=Object.freeze({getOrCreate(n){if(wn.has(n))return wn.get(n);let r;return n===Qe?r=new Ee:n instanceof Document?r=$.supportsAdoptedStyleSheets?new Ki:new eo:Zi(n)?r=new no(n):r=new to(n),wn.set(n,r),r}});class Oe extends ur{constructor(r){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=r.name,r.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${r.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=Oe.uniqueId(),Oe.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(r){return new Oe({name:typeof r=="string"?r:r.name,cssCustomPropertyName:typeof r=="string"?r:r.cssCustomPropertyName===void 0?r.name:r.cssCustomPropertyName})}static isCSSDesignToken(r){return typeof r.cssCustomProperty=="string"}static isDerivedDesignTokenValue(r){return typeof r=="function"}static getTokenById(r){return Oe.tokensById.get(r)}getOrCreateSubscriberSet(r=this){return this.subscribers.get(r)||this.subscribers.set(r,new Set)&&this.subscribers.get(r)}createCSS(){return this.cssVar||""}getValueFor(r){const i=xe.getOrCreate(r).get(this);if(i!==void 0)return i;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${r} or an ancestor of ${r}.`)}setValueFor(r,i){return this._appliedTo.add(r),i instanceof Oe&&(i=this.alias(i)),xe.getOrCreate(r).set(this,i),this}deleteValueFor(r){return this._appliedTo.delete(r),xe.existsFor(r)&&xe.getOrCreate(r).delete(this),this}withDefault(r){return this.setValueFor(Qe,r),this}subscribe(r,i){const s=this.getOrCreateSubscriberSet(i);i&&!xe.existsFor(i)&&xe.getOrCreate(i),s.has(r)||s.add(r)}unsubscribe(r,i){const s=this.subscribers.get(i||this);s&&s.has(r)&&s.delete(r)}notify(r){const i=Object.freeze({token:this,target:r});this.subscribers.has(this)&&this.subscribers.get(this).forEach(s=>s.handleChange(i)),this.subscribers.has(r)&&this.subscribers.get(r).forEach(s=>s.handleChange(i))}alias(r){return i=>r.getValueFor(i)}}Oe.uniqueId=(()=>{let n=0;return()=>(n++,n.toString(16))})(),Oe.tokensById=new Map;class ro{startReflection(r,i){r.subscribe(this,i),this.handleChange({token:r,target:i})}stopReflection(r,i){r.unsubscribe(this,i),this.remove(r,i)}handleChange(r){const{token:i,target:s}=r;this.add(i,s)}add(r,i){gt.getOrCreate(i).setProperty(r.cssCustomProperty,this.resolveCSSValue(xe.getOrCreate(i).get(r)))}remove(r,i){gt.getOrCreate(i).removeProperty(r.cssCustomProperty)}resolveCSSValue(r){return r&&typeof r.createCSS=="function"?r.createCSS():r}}class io{constructor(r,i,s){this.source=r,this.token=i,this.node=s,this.dependencies=new Set,this.observer=E.binding(r,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,k))}}class oo{constructor(){this.values=new Map}set(r,i){this.values.get(r)!==i&&(this.values.set(r,i),E.getNotifier(this).notify(r.id))}get(r){return E.track(this,r.id),this.values.get(r)}delete(r){this.values.delete(r)}all(){return this.values.entries()}}const Ot=new WeakMap,Lt=new WeakMap;class xe{constructor(r){this.target=r,this.store=new oo,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(i,s)=>{const a=Oe.getTokenById(s);if(a&&(a.notify(this.target),Oe.isCSSDesignToken(a))){const c=this.parent,f=this.isReflecting(a);if(c){const d=c.get(a),m=i.get(a);d!==m&&!f?this.reflectToCSS(a):d===m&&f&&this.stopReflectToCSS(a)}else f||this.reflectToCSS(a)}}},Ot.set(r,this),E.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),r instanceof he?r.$fastController.addBehaviors([this]):r.isConnected&&this.bind()}static getOrCreate(r){return Ot.get(r)||new xe(r)}static existsFor(r){return Ot.has(r)}static findParent(r){if(Qe!==r.target){let i=vn(r.target);for(;i!==null;){if(Ot.has(i))return Ot.get(i);i=vn(i)}return xe.getOrCreate(Qe)}return null}static findClosestAssignedNode(r,i){let s=i;do{if(s.has(r))return s;s=s.parent?s.parent:s.target!==Qe?xe.getOrCreate(Qe):null}while(s!==null);return null}get parent(){return Lt.get(this)||null}has(r){return this.assignedValues.has(r)}get(r){const i=this.store.get(r);if(i!==void 0)return i;const s=this.getRaw(r);if(s!==void 0)return this.hydrate(r,s),this.get(r)}getRaw(r){var i;return this.assignedValues.has(r)?this.assignedValues.get(r):(i=xe.findClosestAssignedNode(r,this))===null||i===void 0?void 0:i.getRaw(r)}set(r,i){Oe.isDerivedDesignTokenValue(this.assignedValues.get(r))&&this.tearDownBindingObserver(r),this.assignedValues.set(r,i),Oe.isDerivedDesignTokenValue(i)?this.setupBindingObserver(r,i):this.store.set(r,i)}delete(r){this.assignedValues.delete(r),this.tearDownBindingObserver(r);const i=this.getRaw(r);i?this.hydrate(r,i):this.store.delete(r)}bind(){const r=xe.findParent(this);r&&r.appendChild(this);for(const i of this.assignedValues.keys())i.notify(this.target)}unbind(){this.parent&&Lt.get(this).removeChild(this)}appendChild(r){r.parent&&Lt.get(r).removeChild(r);const i=this.children.filter(s=>r.contains(s));Lt.set(r,this),this.children.push(r),i.forEach(s=>r.appendChild(s)),E.getNotifier(this.store).subscribe(r);for(const[s,a]of this.store.all())r.hydrate(s,this.bindingObservers.has(s)?this.getRaw(s):a)}removeChild(r){const i=this.children.indexOf(r);return i!==-1&&this.children.splice(i,1),E.getNotifier(this.store).unsubscribe(r),r.parent===this?Lt.delete(r):!1}contains(r){return Ji(this.target,r.target)}reflectToCSS(r){this.isReflecting(r)||(this.reflecting.add(r),xe.cssCustomPropertyReflector.startReflection(r,this.target))}stopReflectToCSS(r){this.isReflecting(r)&&(this.reflecting.delete(r),xe.cssCustomPropertyReflector.stopReflection(r,this.target))}isReflecting(r){return this.reflecting.has(r)}handleChange(r,i){const s=Oe.getTokenById(i);!s||this.hydrate(s,this.getRaw(s))}hydrate(r,i){if(!this.has(r)){const s=this.bindingObservers.get(r);Oe.isDerivedDesignTokenValue(i)?s?s.source!==i&&(this.tearDownBindingObserver(r),this.setupBindingObserver(r,i)):this.setupBindingObserver(r,i):(s&&this.tearDownBindingObserver(r),this.store.set(r,i))}}setupBindingObserver(r,i){const s=new io(i,r,this);return this.bindingObservers.set(r,s),s}tearDownBindingObserver(r){return this.bindingObservers.has(r)?(this.bindingObservers.get(r).disconnect(),this.bindingObservers.delete(r),!0):!1}}xe.cssCustomPropertyReflector=new ro,le([G],xe.prototype,"children",void 0);function so(n){return Oe.from(n)}const hr=Object.freeze({create:so,notifyConnection(n){return!n.isConnected||!xe.existsFor(n)?!1:(xe.getOrCreate(n).bind(),!0)},notifyDisconnection(n){return n.isConnected||!xe.existsFor(n)?!1:(xe.getOrCreate(n).unbind(),!0)},registerRoot(n=Qe){Ee.registerRoot(n)},unregisterRoot(n=Qe){Ee.unregisterRoot(n)}}),_n=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),xn=new Map,Jt=new Map;let bt=null;const Dt=ge.createInterface(n=>n.cachedCallback(r=>(bt===null&&(bt=new pr(null,r)),bt))),dr=Object.freeze({tagFor(n){return Jt.get(n)},responsibleFor(n){const r=n.$$designSystem$$;return r||ge.findResponsibleContainer(n).get(Dt)},getOrCreate(n){if(!n)return bt===null&&(bt=ge.getOrCreateDOMContainer().get(Dt)),bt;const r=n.$$designSystem$$;if(r)return r;const i=ge.getOrCreateDOMContainer(n);if(i.has(Dt,!1))return i.get(Dt);{const s=new pr(n,i);return i.register($t.instance(Dt,s)),s}}});function ao(n,r,i){return typeof n=="string"?{name:n,type:r,callback:i}:n}class pr{constructor(r,i){this.owner=r,this.container=i,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>_n.definitionCallbackOnly,r!==null&&(r.$$designSystem$$=this)}withPrefix(r){return this.prefix=r,this}withShadowRootMode(r){return this.shadowRootMode=r,this}withElementDisambiguation(r){return this.disambiguate=r,this}withDesignTokenRoot(r){return this.designTokenRoot=r,this}register(...r){const i=this.container,s=[],a=this.disambiguate,c=this.shadowRootMode,f={elementPrefix:this.prefix,tryDefineElement(d,m,w){const U=ao(d,m,w),{name:I,callback:z,baseClass:ae}=U;let{type:be}=U,ye=I,ot=xn.get(ye),hn=!0;for(;ot;){const qn=a(ye,be,ot);switch(qn){case _n.ignoreDuplicate:return;case _n.definitionCallbackOnly:hn=!1,ot=void 0;break;default:ye=qn,ot=xn.get(ye);break}}hn&&((Jt.has(be)||be===lt)&&(be=class extends be{}),xn.set(ye,be),Jt.set(be,ye),ae&&Jt.set(ae,ye)),s.push(new lo(i,ye,be,c,z,hn))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&hr.registerRoot(this.designTokenRoot)),i.registerWithContext(f,...r);for(const d of s)d.callback(d),d.willDefine&&d.definition!==null&&d.definition.define();return this}}class lo{constructor(r,i,s,a,c,f){this.container=r,this.name=i,this.type=s,this.shadowRootMode=a,this.callback=c,this.willDefine=f,this.definition=null}definePresentation(r){cr.define(this.name,r,this.container)}defineElement(r){this.definition=new $e(this.type,Object.assign(Object.assign({},r),{name:this.name}))}tagFor(r){return dr.tagFor(r)}}function co(n){return dr.getOrCreate(n).withPrefix("vscode")}var Sn=function(n,r){return Sn=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,s){i.__proto__=s}||function(i,s){for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(i[a]=s[a])},Sn(n,r)};function Ka(n,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");Sn(n,r);function i(){this.constructor=n}n.prototype=r===null?Object.create(r):(i.prototype=r.prototype,new i)}var gr=function(){return gr=Object.assign||function(r){for(var i,s=1,a=arguments.length;s<a;s++){i=arguments[s];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(r[c]=i[c])}return r},gr.apply(this,arguments)};function el(n,r){var i={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&r.indexOf(s)<0&&(i[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(n);a<s.length;a++)r.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(n,s[a])&&(i[s[a]]=n[s[a]]);return i}function uo(n,r,i,s){var a=arguments.length,c=a<3?r:s===null?s=Object.getOwnPropertyDescriptor(r,i):s,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(n,r,i,s);else for(var d=n.length-1;d>=0;d--)(f=n[d])&&(c=(a<3?f(c):a>3?f(r,i,c):f(r,i))||c);return a>3&&c&&Object.defineProperty(r,i,c),c}function tl(n,r){return function(i,s){r(i,s,n)}}function nl(n,r){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(n,r)}function rl(n,r,i,s){function a(c){return c instanceof i?c:new i(function(f){f(c)})}return new(i||(i=Promise))(function(c,f){function d(U){try{w(s.next(U))}catch(I){f(I)}}function m(U){try{w(s.throw(U))}catch(I){f(I)}}function w(U){U.done?c(U.value):a(U.value).then(d,m)}w((s=s.apply(n,r||[])).next())})}function il(n,r){var i={label:0,sent:function(){if(c[0]&1)throw c[1];return c[1]},trys:[],ops:[]},s,a,c,f;return f={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(f[Symbol.iterator]=function(){return this}),f;function d(w){return function(U){return m([w,U])}}function m(w){if(s)throw new TypeError("Generator is already executing.");for(;i;)try{if(s=1,a&&(c=w[0]&2?a.return:w[0]?a.throw||((c=a.return)&&c.call(a),0):a.next)&&!(c=c.call(a,w[1])).done)return c;switch(a=0,c&&(w=[w[0]&2,c.value]),w[0]){case 0:case 1:c=w;break;case 4:return i.label++,{value:w[1],done:!1};case 5:i.label++,a=w[1],w=[0];continue;case 7:w=i.ops.pop(),i.trys.pop();continue;default:if(c=i.trys,!(c=c.length>0&&c[c.length-1])&&(w[0]===6||w[0]===2)){i=0;continue}if(w[0]===3&&(!c||w[1]>c[0]&&w[1]<c[3])){i.label=w[1];break}if(w[0]===6&&i.label<c[1]){i.label=c[1],c=w;break}if(c&&i.label<c[2]){i.label=c[2],i.ops.push(w);break}c[2]&&i.ops.pop(),i.trys.pop();continue}w=r.call(n,i)}catch(U){w=[6,U],a=0}finally{s=c=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}}var br=Object.create?function(n,r,i,s){s===void 0&&(s=i);var a=Object.getOwnPropertyDescriptor(r,i);(!a||("get"in a?!r.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(n,s,a)}:function(n,r,i,s){s===void 0&&(s=i),n[s]=r[i]};function ol(n,r){for(var i in n)i!=="default"&&!Object.prototype.hasOwnProperty.call(r,i)&&br(r,n,i)}function yr(n){var r=typeof Symbol=="function"&&Symbol.iterator,i=r&&n[r],s=0;if(i)return i.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&s>=n.length&&(n=void 0),{value:n&&n[s++],done:!n}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")}function fo(n,r){var i=typeof Symbol=="function"&&n[Symbol.iterator];if(!i)return n;var s=i.call(n),a,c=[],f;try{for(;(r===void 0||r-- >0)&&!(a=s.next()).done;)c.push(a.value)}catch(d){f={error:d}}finally{try{a&&!a.done&&(i=s.return)&&i.call(s)}finally{if(f)throw f.error}}return c}function sl(){for(var n=[],r=0;r<arguments.length;r++)n=n.concat(fo(arguments[r]));return n}function al(){for(var n=0,r=0,i=arguments.length;r<i;r++)n+=arguments[r].length;for(var s=Array(n),a=0,r=0;r<i;r++)for(var c=arguments[r],f=0,d=c.length;f<d;f++,a++)s[a]=c[f];return s}function ll(n,r,i){if(i||arguments.length===2)for(var s=0,a=r.length,c;s<a;s++)(c||!(s in r))&&(c||(c=Array.prototype.slice.call(r,0,s)),c[s]=r[s]);return n.concat(c||Array.prototype.slice.call(r))}function Zt(n){return this instanceof Zt?(this.v=n,this):new Zt(n)}function cl(n,r,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(n,r||[]),a,c=[];return a={},f("next"),f("throw"),f("return"),a[Symbol.asyncIterator]=function(){return this},a;function f(z){s[z]&&(a[z]=function(ae){return new Promise(function(be,ye){c.push([z,ae,be,ye])>1||d(z,ae)})})}function d(z,ae){try{m(s[z](ae))}catch(be){I(c[0][3],be)}}function m(z){z.value instanceof Zt?Promise.resolve(z.value.v).then(w,U):I(c[0][2],z)}function w(z){d("next",z)}function U(z){d("throw",z)}function I(z,ae){z(ae),c.shift(),c.length&&d(c[0][0],c[0][1])}}function ul(n){var r,i;return r={},s("next"),s("throw",function(a){throw a}),s("return"),r[Symbol.iterator]=function(){return this},r;function s(a,c){r[a]=n[a]?function(f){return(i=!i)?{value:Zt(n[a](f)),done:a==="return"}:c?c(f):f}:c}}function fl(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n[Symbol.asyncIterator],i;return r?r.call(n):(n=typeof yr=="function"?yr(n):n[Symbol.iterator](),i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i);function s(c){i[c]=n[c]&&function(f){return new Promise(function(d,m){f=n[c](f),a(d,m,f.done,f.value)})}}function a(c,f,d,m){Promise.resolve(m).then(function(w){c({value:w,done:d})},f)}}function hl(n,r){return Object.defineProperty?Object.defineProperty(n,"raw",{value:r}):n.raw=r,n}var ho=Object.create?function(n,r){Object.defineProperty(n,"default",{enumerable:!0,value:r})}:function(n,r){n.default=r};function dl(n){if(n&&n.__esModule)return n;var r={};if(n!=null)for(var i in n)i!=="default"&&Object.prototype.hasOwnProperty.call(n,i)&&br(r,n,i);return ho(r,n),r}function pl(n){return n&&n.__esModule?n:{default:n}}function gl(n,r,i,s){if(i==="a"&&!s)throw new TypeError("Private accessor was defined without a getter");if(typeof r=="function"?n!==r||!s:!r.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return i==="m"?s:i==="a"?s.call(n):s?s.value:r.get(n)}function bl(n,r,i,s,a){if(s==="m")throw new TypeError("Private method is not writable");if(s==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof r=="function"?n!==r||!a:!r.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return s==="a"?a.call(n,i):a?a.value=i:r.set(n,i),i}function yl(n,r){if(r===null||typeof r!="object"&&typeof r!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof n=="function"?r===n:n.has(r)}class Re{}le([W({attribute:"aria-atomic"})],Re.prototype,"ariaAtomic",void 0),le([W({attribute:"aria-busy"})],Re.prototype,"ariaBusy",void 0),le([W({attribute:"aria-controls"})],Re.prototype,"ariaControls",void 0),le([W({attribute:"aria-current"})],Re.prototype,"ariaCurrent",void 0),le([W({attribute:"aria-describedby"})],Re.prototype,"ariaDescribedby",void 0),le([W({attribute:"aria-details"})],Re.prototype,"ariaDetails",void 0),le([W({attribute:"aria-disabled"})],Re.prototype,"ariaDisabled",void 0),le([W({attribute:"aria-errormessage"})],Re.prototype,"ariaErrormessage",void 0),le([W({attribute:"aria-flowto"})],Re.prototype,"ariaFlowto",void 0),le([W({attribute:"aria-haspopup"})],Re.prototype,"ariaHaspopup",void 0),le([W({attribute:"aria-hidden"})],Re.prototype,"ariaHidden",void 0),le([W({attribute:"aria-invalid"})],Re.prototype,"ariaInvalid",void 0),le([W({attribute:"aria-keyshortcuts"})],Re.prototype,"ariaKeyshortcuts",void 0),le([W({attribute:"aria-label"})],Re.prototype,"ariaLabel",void 0),le([W({attribute:"aria-labelledby"})],Re.prototype,"ariaLabelledby",void 0),le([W({attribute:"aria-live"})],Re.prototype,"ariaLive",void 0),le([W({attribute:"aria-owns"})],Re.prototype,"ariaOwns",void 0),le([W({attribute:"aria-relevant"})],Re.prototype,"ariaRelevant",void 0),le([W({attribute:"aria-roledescription"})],Re.prototype,"ariaRoledescription",void 0);class Rn{constructor(){this.targetIndex=0}}class vr extends Rn{constructor(){super(...arguments),this.createPlaceholder=$.createInterpolationPlaceholder}}class mr extends Rn{constructor(r,i,s){super(),this.name=r,this.behavior=i,this.options=s}createPlaceholder(r){return $.createCustomAttributePlaceholder(this.name,r)}createBehavior(r){return new this.behavior(r,this.options)}}function po(n,r){this.source=n,this.context=r,this.bindingObserver===null&&(this.bindingObserver=E.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(n,r))}function go(n,r){this.source=n,this.context=r,this.target.addEventListener(this.targetName,this)}function bo(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function yo(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const n=this.target.$fastView;n!==void 0&&n.isComposed&&(n.unbind(),n.needsBindOnly=!0)}function vo(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function mo(n){$.setAttribute(this.target,this.targetName,n)}function wo(n){$.setBooleanAttribute(this.target,this.targetName,n)}function _o(n){if(n==null&&(n=""),n.create){this.target.textContent="";let r=this.target.$fastView;r===void 0?r=n.create():this.target.$fastTemplate!==n&&(r.isComposed&&(r.remove(),r.unbind()),r=n.create()),r.isComposed?r.needsBindOnly&&(r.needsBindOnly=!1,r.bind(this.source,this.context)):(r.isComposed=!0,r.bind(this.source,this.context),r.insertBefore(this.target),this.target.$fastView=r,this.target.$fastTemplate=n)}else{const r=this.target.$fastView;r!==void 0&&r.isComposed&&(r.isComposed=!1,r.remove(),r.needsBindOnly?r.needsBindOnly=!1:r.unbind()),this.target.textContent=n}}function xo(n){this.target[this.targetName]=n}function So(n){const r=this.classVersions||Object.create(null),i=this.target;let s=this.version||0;if(n!=null&&n.length){const a=n.split(/\s+/);for(let c=0,f=a.length;c<f;++c){const d=a[c];d!==""&&(r[d]=s,i.classList.add(d))}}if(this.classVersions=r,this.version=s+1,s!==0){s-=1;for(const a in r)r[a]===s&&i.classList.remove(a)}}class En extends vr{constructor(r){super(),this.binding=r,this.bind=po,this.unbind=bo,this.updateTarget=mo,this.isBindingVolatile=E.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(r){if(this.originalTargetName=r,r!==void 0)switch(r[0]){case":":if(this.cleanedTargetName=r.substr(1),this.updateTarget=xo,this.cleanedTargetName==="innerHTML"){const i=this.binding;this.binding=(s,a)=>$.createHTML(i(s,a))}break;case"?":this.cleanedTargetName=r.substr(1),this.updateTarget=wo;break;case"@":this.cleanedTargetName=r.substr(1),this.bind=go,this.unbind=vo;break;default:this.cleanedTargetName=r,r==="class"&&(this.updateTarget=So);break}}targetAtContent(){this.updateTarget=_o,this.unbind=yo}createBehavior(r){return new Ro(r,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class Ro{constructor(r,i,s,a,c,f,d){this.source=null,this.context=null,this.bindingObserver=null,this.target=r,this.binding=i,this.isBindingVolatile=s,this.bind=a,this.unbind=c,this.updateTarget=f,this.targetName=d}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(r){x.setEvent(r);const i=this.binding(this.source,this.context);x.setEvent(null),i!==!0&&r.preventDefault()}}let kn=null;class Pn{addFactory(r){r.targetIndex=this.targetIndex,this.behaviorFactories.push(r)}captureContentBinding(r){r.targetAtContent(),this.addFactory(r)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){kn=this}static borrow(r){const i=kn||new Pn;return i.directives=r,i.reset(),kn=null,i}}function Eo(n){if(n.length===1)return n[0];let r;const i=n.length,s=n.map(f=>typeof f=="string"?()=>f:(r=f.targetName||r,f.binding)),a=(f,d)=>{let m="";for(let w=0;w<i;++w)m+=s[w](f,d);return m},c=new En(a);return c.targetName=r,c}const ko=b.length;function wr(n,r){const i=r.split(_);if(i.length===1)return null;const s=[];for(let a=0,c=i.length;a<c;++a){const f=i[a],d=f.indexOf(b);let m;if(d===-1)m=f;else{const w=parseInt(f.substring(0,d));s.push(n.directives[w]),m=f.substring(d+ko)}m!==""&&s.push(m)}return s}function _r(n,r,i=!1){const s=r.attributes;for(let a=0,c=s.length;a<c;++a){const f=s[a],d=f.value,m=wr(n,d);let w=null;m===null?i&&(w=new En(()=>d),w.targetName=f.name):w=Eo(m),w!==null&&(r.removeAttributeNode(f),a--,c--,n.addFactory(w))}}function Po(n,r,i){const s=wr(n,r.textContent);if(s!==null){let a=r;for(let c=0,f=s.length;c<f;++c){const d=s[c],m=c===0?r:a.parentNode.insertBefore(document.createTextNode(""),a.nextSibling);typeof d=="string"?m.textContent=d:(m.textContent=" ",n.captureContentBinding(d)),a=m,n.targetIndex++,m!==r&&i.nextNode()}n.targetIndex--}}function Ao(n,r){const i=n.content;document.adoptNode(i);const s=Pn.borrow(r);_r(s,n,!0);const a=s.behaviorFactories;s.reset();const c=$.createTemplateWalker(i);let f;for(;f=c.nextNode();)switch(s.targetIndex++,f.nodeType){case 1:_r(s,f);break;case 3:Po(s,f,c);break;case 8:$.isMarker(f)&&s.addFactory(r[$.extractDirectiveIndexFromMarker(f)])}let d=0;($.isMarker(i.firstChild)||i.childNodes.length===1&&r.length)&&(i.insertBefore(document.createComment(""),i.firstChild),d=-1);const m=s.behaviorFactories;return s.release(),{fragment:i,viewBehaviorFactories:m,hostBehaviorFactories:a,targetOffset:d}}const An=document.createRange();class To{constructor(r,i){this.fragment=r,this.behaviors=i,this.source=null,this.context=null,this.firstChild=r.firstChild,this.lastChild=r.lastChild}appendTo(r){r.appendChild(this.fragment)}insertBefore(r){if(this.fragment.hasChildNodes())r.parentNode.insertBefore(this.fragment,r);else{const i=r.parentNode,s=this.lastChild;let a=this.firstChild,c;for(;a!==s;)c=a.nextSibling,i.insertBefore(a,r),a=c;i.insertBefore(s,r)}}remove(){const r=this.fragment,i=this.lastChild;let s=this.firstChild,a;for(;s!==i;)a=s.nextSibling,r.appendChild(s),s=a;r.appendChild(i)}dispose(){const r=this.firstChild.parentNode,i=this.lastChild;let s=this.firstChild,a;for(;s!==i;)a=s.nextSibling,r.removeChild(s),s=a;r.removeChild(i);const c=this.behaviors,f=this.source;for(let d=0,m=c.length;d<m;++d)c[d].unbind(f)}bind(r,i){const s=this.behaviors;if(this.source!==r)if(this.source!==null){const a=this.source;this.source=r,this.context=i;for(let c=0,f=s.length;c<f;++c){const d=s[c];d.unbind(a),d.bind(r,i)}}else{this.source=r,this.context=i;for(let a=0,c=s.length;a<c;++a)s[a].bind(r,i)}}unbind(){if(this.source===null)return;const r=this.behaviors,i=this.source;for(let s=0,a=r.length;s<a;++s)r[s].unbind(i);this.source=null}static disposeContiguousBatch(r){if(r.length!==0){An.setStartBefore(r[0].firstChild),An.setEndAfter(r[r.length-1].lastChild),An.deleteContents();for(let i=0,s=r.length;i<s;++i){const a=r[i],c=a.behaviors,f=a.source;for(let d=0,m=c.length;d<m;++d)c[d].unbind(f)}}}}class xr{constructor(r,i){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=r,this.directives=i}create(r){if(this.fragment===null){let w;const U=this.html;if(typeof U=="string"){w=document.createElement("template"),w.innerHTML=$.createHTML(U);const z=w.content.firstElementChild;z!==null&&z.tagName==="TEMPLATE"&&(w=z)}else w=U;const I=Ao(w,this.directives);this.fragment=I.fragment,this.viewBehaviorFactories=I.viewBehaviorFactories,this.hostBehaviorFactories=I.hostBehaviorFactories,this.targetOffset=I.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const i=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,a=new Array(this.behaviorCount),c=$.createTemplateWalker(i);let f=0,d=this.targetOffset,m=c.nextNode();for(let w=s.length;f<w;++f){const U=s[f],I=U.targetIndex;for(;m!==null;)if(d===I){a[f]=U.createBehavior(m);break}else m=c.nextNode(),d++}if(this.hasHostBehaviors){const w=this.hostBehaviorFactories;for(let U=0,I=w.length;U<I;++U,++f)a[f]=w[U].createBehavior(r)}return new To(i,a)}render(r,i,s){typeof i=="string"&&(i=document.getElementById(i)),s===void 0&&(s=i);const a=this.create(s);return a.bind(r,k),a.appendTo(i),a}}const $o=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function me(n,...r){const i=[];let s="";for(let a=0,c=n.length-1;a<c;++a){const f=n[a];let d=r[a];if(s+=f,d instanceof xr){const m=d;d=()=>m}if(typeof d=="function"&&(d=new En(d)),d instanceof vr){const m=$o.exec(f);m!==null&&(d.targetName=m[2])}d instanceof Rn?(s+=d.createPlaceholder(i.length),i.push(d)):s+=d}return s+=n[n.length-1],new xr(s,i)}class Fo{constructor(r,i){this.target=r,this.propertyName=i}bind(r){r[this.propertyName]=this.target}unbind(){}}function ze(n){return new mr("fast-ref",Fo,n)}class Oo{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const Lo=(n,r)=>me`
    <span
        part="end"
        ${ze("endContainer")}
        class=${i=>r.end?"end":void 0}
    >
        <slot name="end" ${ze("end")} @slotchange="${i=>i.handleEndContentChange()}">
            ${r.end||""}
        </slot>
    </span>
`,Do=(n,r)=>me`
    <span
        part="start"
        ${ze("startContainer")}
        class="${i=>r.start?"start":void 0}"
    >
        <slot
            name="start"
            ${ze("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
        >
            ${r.start||""}
        </slot>
    </span>
`,vl=me`
    <span part="end" ${ze("endContainer")}>
        <slot
            name="end"
            ${ze("end")}
            @slotchange="${n=>n.handleEndContentChange()}"
        ></slot>
    </span>
`,ml=me`
    <span part="start" ${ze("startContainer")}>
        <slot
            name="start"
            ${ze("start")}
            @slotchange="${n=>n.handleStartContentChange()}"
        ></slot>
    </span>
`;function Sr(n,...r){r.forEach(i=>{if(Object.getOwnPropertyNames(i.prototype).forEach(s=>{s!=="constructor"&&Object.defineProperty(n.prototype,s,Object.getOwnPropertyDescriptor(i.prototype,s))}),i.attributes){const s=n.attributes||[];n.attributes=s.concat(i.attributes)}})}var Rr;(function(n){n[n.alt=18]="alt",n[n.arrowDown=40]="arrowDown",n[n.arrowLeft=37]="arrowLeft",n[n.arrowRight=39]="arrowRight",n[n.arrowUp=38]="arrowUp",n[n.back=8]="back",n[n.backSlash=220]="backSlash",n[n.break=19]="break",n[n.capsLock=20]="capsLock",n[n.closeBracket=221]="closeBracket",n[n.colon=186]="colon",n[n.colon2=59]="colon2",n[n.comma=188]="comma",n[n.ctrl=17]="ctrl",n[n.delete=46]="delete",n[n.end=35]="end",n[n.enter=13]="enter",n[n.equals=187]="equals",n[n.equals2=61]="equals2",n[n.equals3=107]="equals3",n[n.escape=27]="escape",n[n.forwardSlash=191]="forwardSlash",n[n.function1=112]="function1",n[n.function10=121]="function10",n[n.function11=122]="function11",n[n.function12=123]="function12",n[n.function2=113]="function2",n[n.function3=114]="function3",n[n.function4=115]="function4",n[n.function5=116]="function5",n[n.function6=117]="function6",n[n.function7=118]="function7",n[n.function8=119]="function8",n[n.function9=120]="function9",n[n.home=36]="home",n[n.insert=45]="insert",n[n.menu=93]="menu",n[n.minus=189]="minus",n[n.minus2=109]="minus2",n[n.numLock=144]="numLock",n[n.numPad0=96]="numPad0",n[n.numPad1=97]="numPad1",n[n.numPad2=98]="numPad2",n[n.numPad3=99]="numPad3",n[n.numPad4=100]="numPad4",n[n.numPad5=101]="numPad5",n[n.numPad6=102]="numPad6",n[n.numPad7=103]="numPad7",n[n.numPad8=104]="numPad8",n[n.numPad9=105]="numPad9",n[n.numPadDivide=111]="numPadDivide",n[n.numPadDot=110]="numPadDot",n[n.numPadMinus=109]="numPadMinus",n[n.numPadMultiply=106]="numPadMultiply",n[n.numPadPlus=107]="numPadPlus",n[n.openBracket=219]="openBracket",n[n.pageDown=34]="pageDown",n[n.pageUp=33]="pageUp",n[n.period=190]="period",n[n.print=44]="print",n[n.quote=222]="quote",n[n.scrollLock=145]="scrollLock",n[n.shift=16]="shift",n[n.space=32]="space",n[n.tab=9]="tab",n[n.tilde=192]="tilde",n[n.windowsLeft=91]="windowsLeft",n[n.windowsOpera=219]="windowsOpera",n[n.windowsRight=92]="windowsRight"})(Rr||(Rr={}));const wl=18,_l=40,xl=37,Sl=39,Rl=38,El=8,kl=220,Pl=19,Al=20,Tl=221,$l=186,Fl=59,Ol=188,Ll=17,Dl=46,Il=35,Bl=13,Cl=187,Ml=61,Nl=107,Ul=27,Vl=191,jl=112,Hl=121,Wl=122,zl=123,ql=113,Gl=114,Ql=115,Yl=116,Jl=117,Zl=118,Xl=119,Kl=120,ec=36,tc=45,nc=93,rc=189,ic=109,oc=144,sc=96,ac=97,lc=98,cc=99,uc=100,fc=101,hc=102,dc=103,pc=104,gc=105,bc=111,yc=110,vc=109,mc=106,wc=107,_c=219,xc=34,Sc=33,Rc=190,Ec=44,kc=222,Pc=145,Ac=16,Tc=32,$c=9,Fc=192,Oc=91,Lc=219,Dc=92,Io="ArrowDown",Bo="ArrowLeft",Co="ArrowRight",Mo="ArrowUp",No="Enter",Ic="Escape",Bc="Home",Cc="End",Mc="F2",Nc="PageDown",Uc="PageUp",Vc=" ",jc="Tab",Hc="Backspace",Wc="Delete",zc={ArrowDown:Io,ArrowLeft:Bo,ArrowRight:Co,ArrowUp:Mo},Er="form-associated-proxy",kr="ElementInternals",Pr=kr in window&&"setFormValue"in window[kr].prototype,Ar=new WeakMap;function Tr(n){const r=class extends n{constructor(...i){super(...i),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Pr}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const i=this.proxy.labels,s=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),a=i?s.concat(Array.from(i)):s;return Object.freeze(a)}else return C}valueChanged(i,s){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(i,s){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),$.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(i,s){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),$.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Pr)return null;let i=Ar.get(this);return i||(i=this.attachInternals(),Ar.set(this,i)),i}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(i=>this.proxy.removeEventListener(i,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(i,s,a){this.elementInternals?this.elementInternals.setValidity(i,s,a):typeof s=="string"&&this.proxy.setCustomValidity(s)}formDisabledCallback(i){this.disabled=i}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var i;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(s=>this.proxy.addEventListener(s,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",Er),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",Er)),(i=this.shadowRoot)===null||i===void 0||i.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var i;this.removeChild(this.proxy),(i=this.shadowRoot)===null||i===void 0||i.removeChild(this.proxySlot)}validate(i){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,i)}setFormValue(i,s){this.elementInternals&&this.elementInternals.setFormValue(i,s||i)}_keypressHandler(i){switch(i.key){case No:if(this.form instanceof HTMLFormElement){const s=this.form.querySelector("[type=submit]");s?.click()}break}}stopPropagation(i){i.stopPropagation()}};return W({mode:"boolean"})(r.prototype,"disabled"),W({mode:"fromView",attribute:"value"})(r.prototype,"initialValue"),W({attribute:"current-value"})(r.prototype,"currentValue"),W(r.prototype,"name"),W({mode:"boolean"})(r.prototype,"required"),G(r.prototype,"value"),r}function qc(n){class r extends Tr(n){}class i extends r{constructor(...a){super(a),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(a,c){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),a!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(a,c){this.checked=this.currentChecked}updateForm(){const a=this.checked?this.value:null;this.setFormValue(a,a)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return attr({attribute:"checked",mode:"boolean"})(i.prototype,"checkedAttribute"),attr({attribute:"current-checked",converter:booleanConverter})(i.prototype,"currentChecked"),observable(i.prototype,"defaultChecked"),observable(i.prototype,"checked"),i}class Uo extends lt{}class Vo extends Tr(Uo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class Ve extends Vo{constructor(){super(...arguments),this.handleClick=r=>{var i;this.disabled&&((i=this.defaultSlottedContent)===null||i===void 0?void 0:i.length)<=1&&r.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const r=this.proxy.isConnected;r||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),r||this.detachProxy()},this.handleFormReset=()=>{var r;(r=this.form)===null||r===void 0||r.reset()},this.handleUnsupportedDelegatesFocus=()=>{var r;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&((r=this.$fastController.definition.shadowOptions)===null||r===void 0?void 0:r.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(r,i){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),i==="submit"&&this.addEventListener("click",this.handleSubmission),r==="submit"&&this.removeEventListener("click",this.handleSubmission),i==="reset"&&this.addEventListener("click",this.handleFormReset),r==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var r;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const i=Array.from((r=this.control)===null||r===void 0?void 0:r.children);i&&i.forEach(s=>{s.addEventListener("click",this.handleClick)})}disconnectedCallback(){var r;super.disconnectedCallback();const i=Array.from((r=this.control)===null||r===void 0?void 0:r.children);i&&i.forEach(s=>{s.removeEventListener("click",this.handleClick)})}}le([W({mode:"boolean"})],Ve.prototype,"autofocus",void 0),le([W({attribute:"form"})],Ve.prototype,"formId",void 0),le([W],Ve.prototype,"formaction",void 0),le([W],Ve.prototype,"formenctype",void 0),le([W],Ve.prototype,"formmethod",void 0),le([W({mode:"boolean"})],Ve.prototype,"formnovalidate",void 0),le([W],Ve.prototype,"formtarget",void 0),le([W],Ve.prototype,"type",void 0),le([G],Ve.prototype,"defaultSlottedContent",void 0);class Xt{}le([W({attribute:"aria-expanded"})],Xt.prototype,"ariaExpanded",void 0),le([W({attribute:"aria-pressed"})],Xt.prototype,"ariaPressed",void 0),Sr(Xt,Re),Sr(Ve,Oo,Xt);function Gc(n){return n?function(r,i,s){return r.nodeType===1&&r.matches(n)}:function(r,i,s){return r.nodeType===1}}class jo{constructor(r,i){this.target=r,this.options=i,this.source=null}bind(r){const i=this.options.property;this.shouldUpdate=E.getAccessors(r).some(s=>s.name===i),this.source=r,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(C),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let r=this.getNodes();return this.options.filter!==void 0&&(r=r.filter(this.options.filter)),r}updateTarget(r){this.source[this.options.property]=r}}class Ho extends jo{constructor(r,i){super(r,i)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Wo(n){return typeof n=="string"&&(n={property:n}),new mr("fast-slotted",Ho,n)}const zo=(n,r)=>me`
    <button
        class="control"
        part="control"
        ?autofocus="${i=>i.autofocus}"
        ?disabled="${i=>i.disabled}"
        form="${i=>i.formId}"
        formaction="${i=>i.formaction}"
        formenctype="${i=>i.formenctype}"
        formmethod="${i=>i.formmethod}"
        formnovalidate="${i=>i.formnovalidate}"
        formtarget="${i=>i.formtarget}"
        name="${i=>i.name}"
        type="${i=>i.type}"
        value="${i=>i.value}"
        aria-atomic="${i=>i.ariaAtomic}"
        aria-busy="${i=>i.ariaBusy}"
        aria-controls="${i=>i.ariaControls}"
        aria-current="${i=>i.ariaCurrent}"
        aria-describedby="${i=>i.ariaDescribedby}"
        aria-details="${i=>i.ariaDetails}"
        aria-disabled="${i=>i.ariaDisabled}"
        aria-errormessage="${i=>i.ariaErrormessage}"
        aria-expanded="${i=>i.ariaExpanded}"
        aria-flowto="${i=>i.ariaFlowto}"
        aria-haspopup="${i=>i.ariaHaspopup}"
        aria-hidden="${i=>i.ariaHidden}"
        aria-invalid="${i=>i.ariaInvalid}"
        aria-keyshortcuts="${i=>i.ariaKeyshortcuts}"
        aria-label="${i=>i.ariaLabel}"
        aria-labelledby="${i=>i.ariaLabelledby}"
        aria-live="${i=>i.ariaLive}"
        aria-owns="${i=>i.ariaOwns}"
        aria-pressed="${i=>i.ariaPressed}"
        aria-relevant="${i=>i.ariaRelevant}"
        aria-roledescription="${i=>i.ariaRoledescription}"
        ${ze("control")}
    >
        ${Do(n,r)}
        <span class="content" part="content">
            <slot ${Wo("defaultSlottedContent")}></slot>
        </span>
        ${Lo(n,r)}
    </button>
`;function $r(n,r){const i=[];let s="";const a=[];for(let c=0,f=n.length-1;c<f;++c){s+=n[c];let d=r[c];if(d instanceof ur){const m=d.createBehavior();d=d.createCSS(),m&&a.push(m)}d instanceof Q||d instanceof CSSStyleSheet?(s.trim()!==""&&(i.push(s),s=""),i.push(d)):s+=d}return s+=n[n.length-1],s.trim()!==""&&i.push(s),{styles:i,behaviors:a}}function Ye(n,...r){const{styles:i,behaviors:s}=$r(n,r),a=Q.create(i);return s.length&&a.withBehaviors(...s),a}class qo extends null{constructor(r,i){super(),this.behaviors=i,this.css="";const s=r.reduce((a,c)=>(typeof c=="string"?this.css+=c:a.push(c),a),[]);s.length&&(this.styles=ElementStyles.create(s))}createBehavior(){return this}createCSS(){return this.css}bind(r){this.styles&&r.$fastController.addStyles(this.styles),this.behaviors.length&&r.$fastController.addBehaviors(this.behaviors)}unbind(r){this.styles&&r.$fastController.removeStyles(this.styles),this.behaviors.length&&r.$fastController.removeBehaviors(this.behaviors)}}function Qc(n,...r){const{styles:i,behaviors:s}=$r(n,r);return new qo(i,s)}const Go=":host([hidden]){display:none}";function Qo(n){return`${Go}:host{display:${n}}`}function Yo(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Jo(...n){return n.every(r=>r instanceof HTMLElement)}function Yc(n,r){return!n||!r||!Jo(n)?void 0:Array.from(n.querySelectorAll(r)).filter(s=>s.offsetParent!==null)}function Jc(n){return n===null?null:n.which||n.keyCode||n.charCode}function Zo(){const n=document.querySelector('meta[property="csp-nonce"]');return n?n.getAttribute("content"):null}let et;function Xo(){if(typeof et=="boolean")return et;if(!Yo())return et=!1,et;const n=document.createElement("style"),r=Zo();r!==null&&n.setAttribute("nonce",r),document.head.appendChild(n);try{n.sheet.insertRule("foo:focus-visible {color:inherit}",0),et=!0}catch{et=!1}finally{document.head.removeChild(n)}return et}let yt;function Zc(){if(typeof yt=="boolean")return yt;try{yt=CSS.supports("display","grid")}catch{yt=!1}return yt}function Xc(){return canUseDOM()&&(window.matchMedia("(forced-colors: none)").matches||window.matchMedia("(forced-colors: active)").matches)}function Kc(){yt=void 0,et=void 0}const eu=null,Kt=Xo()?"focus-visible":"focus",Ko="not-allowed";function es(n){window.addEventListener("load",()=>{new MutationObserver(()=>{Fr(n)}).observe(document.body,{attributes:!0,attributeFilter:["class"]}),Fr(n)})}function Fr(n){const r=getComputedStyle(document.body),i=document.querySelector("body");if(i){const s=i.getAttribute("data-vscode-theme-kind");for(const[a,c]of n){let f=r.getPropertyValue(a).toString();s==="vscode-high-contrast"?(f.length===0&&c.name.includes("background")&&(f="transparent"),c.name==="button-icon-hover-background"&&(f="transparent")):c.name==="contrast-active-border"&&(f="transparent"),c.setValueFor(i,f)}}}const Or=new Map;let Lr=!1;function ee(n,r){const i=hr.create(n);if(r){if(r.includes("--fake-vscode-token")){const s="id"+Math.random().toString(16).slice(2);r=`${r}-${s}`}Or.set(r,i)}return Lr||(es(Or),Lr=!0),i}const tu=ee("background","--vscode-editor-background").withDefault("#1e1e1e"),tt=ee("border-width").withDefault(1),ts=ee("contrast-active-border","--vscode-contrastActiveBorder").withDefault("#f38518"),nu=ee("contrast-border","--vscode-contrastBorder").withDefault("#6fc3df"),ru=ee("corner-radius").withDefault(0),Dr=ee("design-unit").withDefault(4),ns=ee("disabled-opacity").withDefault(.4),en=ee("focus-border","--vscode-focusBorder").withDefault("#007fd4"),rs=ee("font-family","--vscode-font-family").withDefault("-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"),iu=ee("font-weight","--vscode-font-weight").withDefault("400"),is=ee("foreground","--vscode-foreground").withDefault("#cccccc"),ou=ee("input-height").withDefault("26"),su=ee("input-min-width").withDefault("100px"),os=ee("type-ramp-base-font-size","--vscode-font-size").withDefault("13px"),ss=ee("type-ramp-base-line-height").withDefault("normal"),au=ee("type-ramp-minus1-font-size").withDefault("11px"),lu=ee("type-ramp-minus1-line-height").withDefault("16px"),cu=ee("type-ramp-minus2-font-size").withDefault("9px"),uu=ee("type-ramp-minus2-line-height").withDefault("16px"),fu=ee("type-ramp-plus1-font-size").withDefault("16px"),hu=ee("type-ramp-plus1-line-height").withDefault("24px"),du=ee("scrollbarWidth").withDefault("10px"),pu=ee("scrollbarHeight").withDefault("10px"),gu=ee("scrollbar-slider-background","--vscode-scrollbarSlider-background").withDefault("#79797966"),bu=ee("scrollbar-slider-hover-background","--vscode-scrollbarSlider-hoverBackground").withDefault("#646464b3"),yu=ee("scrollbar-slider-active-background","--vscode-scrollbarSlider-activeBackground").withDefault("#bfbfbf66"),vu=ee("badge-background","--vscode-badge-background").withDefault("#4d4d4d"),mu=ee("badge-foreground","--vscode-badge-foreground").withDefault("#ffffff"),as=ee("button-border","--vscode-button-border").withDefault("transparent"),Ir=ee("button-icon-background").withDefault("transparent"),ls=ee("button-icon-corner-radius").withDefault("5px"),cs=ee("button-icon-outline-offset").withDefault(0),Br=ee("button-icon-hover-background","--fake-vscode-token").withDefault("rgba(90, 93, 94, 0.31)"),us=ee("button-icon-padding").withDefault("3px"),vt=ee("button-primary-background","--vscode-button-background").withDefault("#0e639c"),Cr=ee("button-primary-foreground","--vscode-button-foreground").withDefault("#ffffff"),Mr=ee("button-primary-hover-background","--vscode-button-hoverBackground").withDefault("#1177bb"),Tn=ee("button-secondary-background","--vscode-button-secondaryBackground").withDefault("#3a3d41"),fs=ee("button-secondary-foreground","--vscode-button-secondaryForeground").withDefault("#ffffff"),hs=ee("button-secondary-hover-background","--vscode-button-secondaryHoverBackground").withDefault("#45494e"),ds=ee("button-padding-horizontal").withDefault("11px"),ps=ee("button-padding-vertical").withDefault("4px"),wu=ee("checkbox-background","--vscode-checkbox-background").withDefault("#3c3c3c"),_u=ee("checkbox-border","--vscode-checkbox-border").withDefault("#3c3c3c"),xu=ee("checkbox-corner-radius").withDefault(3),Su=ee("checkbox-foreground","--vscode-checkbox-foreground").withDefault("#f0f0f0"),Ru=ee("list-active-selection-background","--vscode-list-activeSelectionBackground").withDefault("#094771"),Eu=ee("list-active-selection-foreground","--vscode-list-activeSelectionForeground").withDefault("#ffffff"),ku=ee("list-hover-background","--vscode-list-hoverBackground").withDefault("#2a2d2e"),Pu=ee("divider-background","--vscode-settings-dropdownListBorder").withDefault("#454545"),Au=ee("dropdown-background","--vscode-dropdown-background").withDefault("#3c3c3c"),Tu=ee("dropdown-border","--vscode-dropdown-border").withDefault("#3c3c3c"),$u=ee("dropdown-foreground","--vscode-dropdown-foreground").withDefault("#f0f0f0"),Fu=ee("dropdown-list-max-height").withDefault("200px"),Ou=ee("input-background","--vscode-input-background").withDefault("#3c3c3c"),Lu=ee("input-foreground","--vscode-input-foreground").withDefault("#cccccc"),Du=ee("input-placeholder-foreground","--vscode-input-placeholderForeground").withDefault("#cccccc"),Iu=ee("link-active-foreground","--vscode-textLink-activeForeground").withDefault("#3794ff"),Bu=ee("link-foreground","--vscode-textLink-foreground").withDefault("#3794ff"),Cu=ee("progress-background","--vscode-progressBar-background").withDefault("#0e70c0"),Mu=ee("panel-tab-active-border","--vscode-panelTitle-activeBorder").withDefault("#e7e7e7"),Nu=ee("panel-tab-active-foreground","--vscode-panelTitle-activeForeground").withDefault("#e7e7e7"),Uu=ee("panel-tab-foreground","--vscode-panelTitle-inactiveForeground").withDefault("#e7e7e799"),Vu=ee("panel-view-background","--vscode-panel-background").withDefault("#1e1e1e"),ju=ee("panel-view-border","--vscode-panel-border").withDefault("#80808059"),Hu=ee("tag-corner-radius").withDefault("2px"),gs=Ye`
	${Qo("inline-flex")} :host {
		outline: none;
		font-family: ${rs};
		font-size: ${os};
		line-height: ${ss};
		color: ${Cr};
		background: ${vt};
		border-radius: 2px;
		fill: currentColor;
		cursor: pointer;
	}
	.control {
		background: transparent;
		height: inherit;
		flex-grow: 1;
		box-sizing: border-box;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: ${ps} ${ds};
		white-space: wrap;
		outline: none;
		text-decoration: none;
		border: calc(${tt} * 1px) solid ${as};
		color: inherit;
		border-radius: inherit;
		fill: inherit;
		cursor: inherit;
		font-family: inherit;
	}
	:host(:hover) {
		background: ${Mr};
	}
	:host(:active) {
		background: ${vt};
	}
	.control:${Kt} {
		outline: calc(${tt} * 1px) solid ${en};
		outline-offset: calc(${tt} * 2px);
	}
	.control::-moz-focus-inner {
		border: 0;
	}
	:host([disabled]) {
		opacity: ${ns};
		background: ${vt};
		cursor: ${Ko};
	}
	.content {
		display: flex;
	}
	.start {
		display: flex;
	}
	::slotted(svg),
	::slotted(span) {
		width: calc(${Dr} * 4px);
		height: calc(${Dr} * 4px);
	}
	.start {
		margin-inline-end: 8px;
	}
`,bs=Ye`
	:host([appearance='primary']) {
		background: ${vt};
		color: ${Cr};
	}
	:host([appearance='primary']:hover) {
		background: ${Mr};
	}
	:host([appearance='primary']:active) .control:active {
		background: ${vt};
	}
	:host([appearance='primary']) .control:${Kt} {
		outline: calc(${tt} * 1px) solid ${en};
		outline-offset: calc(${tt} * 2px);
	}
	:host([appearance='primary'][disabled]) {
		background: ${vt};
	}
`,ys=Ye`
	:host([appearance='secondary']) {
		background: ${Tn};
		color: ${fs};
	}
	:host([appearance='secondary']:hover) {
		background: ${hs};
	}
	:host([appearance='secondary']:active) .control:active {
		background: ${Tn};
	}
	:host([appearance='secondary']) .control:${Kt} {
		outline: calc(${tt} * 1px) solid ${en};
		outline-offset: calc(${tt} * 2px);
	}
	:host([appearance='secondary'][disabled]) {
		background: ${Tn};
	}
`,vs=Ye`
	:host([appearance='icon']) {
		background: ${Ir};
		border-radius: ${ls};
		color: ${is};
	}
	:host([appearance='icon']:hover) {
		background: ${Br};
		outline: 1px dotted ${ts};
		outline-offset: -1px;
	}
	:host([appearance='icon']) .control {
		padding: ${us};
		border: none;
	}
	:host([appearance='icon']:active) .control:active {
		background: ${Br};
	}
	:host([appearance='icon']) .control:${Kt} {
		outline: calc(${tt} * 1px) solid ${en};
		outline-offset: ${cs};
	}
	:host([appearance='icon'][disabled]) {
		background: ${Ir};
	}
`,ms=(n,r)=>Ye`
	${gs}
	${bs}
	${ys}
	${vs}
`;class Nr extends Ve{connectedCallback(){if(super.connectedCallback(),!this.appearance){const r=this.getAttribute("appearance");this.appearance=r}}attributeChangedCallback(r,i,s){r==="appearance"&&s==="icon"&&(this.getAttribute("aria-label")||(this.ariaLabel="Icon Button")),r==="aria-label"&&(this.ariaLabel=s),r==="disabled"&&(this.disabled=s!==null)}}uo([W],Nr.prototype,"appearance",void 0);const ws=Nr.compose({baseName:"button",template:zo,styles:ms,shadowOptions:{delegatesFocus:!0}}),Ur=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,Vr=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,_s=null;let ct;const It=new Map;let nt,mt,rt;function Wu(n){typeof n=="string"?n==="system"?nt=void 0:nt=[n]:nt=n??void 0,mt=void 0,rt=void 0,It.clear(),ct=void 0}function zu(n,r){const i=new Date(n.getTime());for(const[s,a]of Object.entries(r))if(!!a)switch(s){case"years":i.setFullYear(i.getFullYear()+a);break;case"months":i.setMonth(i.getMonth()+a);break;case"days":i.setDate(i.getDate()+a);break;case"hours":i.setHours(i.getHours()+a);break;case"minutes":i.setMinutes(i.getMinutes()+a);break;case"seconds":i.setSeconds(i.getSeconds()+a);break}return i}function qu(n,r){const i=(typeof n=="number"?n:n.getTime())-new Date().getTime();for(const[s,a,c,f]of _s){const d=Math.abs(i);if(d>=a||a===1e3)return r?(ct==null&&(rt!=null?ct=rt.resolvedOptions().locale:mt!=null?ct=mt.resolvedOptions().locale:(rt=new Intl.RelativeTimeFormat(nt,{localeMatcher:"best fit",numeric:"always",style:"narrow"}),ct=rt.resolvedOptions().locale)),ct==="en"||ct?.startsWith("en-")?`${Math.round(d/c)}${f}`:(rt==null&&(rt=new Intl.RelativeTimeFormat(nt,{localeMatcher:"best fit",numeric:"always",style:"narrow"})),rt.format(Math.round(i/c),s))):(mt==null&&(mt=new Intl.RelativeTimeFormat(nt,{localeMatcher:"best fit",numeric:"auto",style:"long"})),mt.format(Math.round(i/c),s))}return""}function Gu(n,r,i,s=!0){r=r??void 0;const a=`${i??""}:${r}`;let c=It.get(a);if(c==null){const m=Ss(r);let w;i==null?w=nt:i==="system"?w=void 0:w=[i],c=new Intl.DateTimeFormat(w,m),s&&It.set(a,c)}if(r==null||Vr.test(r))return c.format(n);function f(m){const w=`${i??""}:time:${m}`;let U=It.get(w);if(U==null){const I={localeMatcher:"best fit",timeStyle:m};let z;i==null?z=nt:i==="system"?z=void 0:z=[i],U=new Intl.DateTimeFormat(z,I),s&&It.set(w,U)}return U}const d=c.formatToParts(n);return r.replace(Ur,(m,w,U,I,z,ae,be,ye,ot,hn,qn,zf,qf,Gf,Di)=>{if(w!=null)return w.substring(1,w.length-1);for(const Ii in Di){const Gn=Di[Ii];if(Gn==null)continue;const Wt=d.find(Bi=>Bi.type===Ii);return Gn==="Do"&&Wt?.type==="day"?Rs(Number(Wt.value)):Gn==="a"&&Wt?.type==="dayPeriod"?` ${(f("short").formatToParts(n).find(Va=>Va.type==="dayPeriod")??Wt)?.value??""}`:Wt?.value??""}return""})}function xs(n,r,i){const s=(typeof r=="number"?r:r.getTime())-(typeof n=="number"?n:n.getTime());switch(i){case"days":return Math.floor(s/(1e3*60*60*24));case"hours":return Math.floor(s/(1e3*60*60));case"minutes":return Math.floor(s/(1e3*60));case"seconds":return Math.floor(s/1e3);default:return s}}function Ss(n){if(n==null)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};const r=Vr.exec(n);if(r?.groups!=null){const{dateStyle:s,timeStyle:a}=r.groups;return{localeMatcher:"best fit",dateStyle:s||"full",timeStyle:a||void 0}}const i={localeMatcher:"best fit"};for(const{groups:s}of n.matchAll(Ur))if(s!=null)for(const a in s){const c=s[a];if(c!=null)switch(a){case"year":i.year=c.length===4?"numeric":"2-digit";break;case"month":switch(c.length){case 4:i.month="long";break;case 3:i.month="short";break;case 2:i.month="2-digit";break;case 1:i.month="numeric";break}break;case"day":c==="DD"?i.day="2-digit":i.day="numeric";break;case"weekday":switch(c.length){case 4:i.weekday="long";break;case 3:i.weekday="short";break;case 2:i.weekday="narrow";break}break;case"hour":i.hour=c.length===2?"2-digit":"numeric",i.hour12=c==="hh"||c==="h";break;case"minute":i.minute=c.length===2?"2-digit":"numeric";break;case"second":i.second=c.length===2?"2-digit":"numeric";break;case"fractionalSecond":i.fractionalSecondDigits=3;break;case"dayPeriod":i.dayPeriod="narrow",i.hour12=!0,i.hourCycle="h12";break;case"timeZoneName":i.timeZoneName=c.length===2?"long":"short";break}}return i}const $n=null;function Rs(n){const r=n%100;return`${n}${$n[(r-20)%10]??$n[r]??$n[0]}`}var Es=(n=>(n.Free="free",n.FreePlus="free+",n.Pro="pro",n.Teams="teams",n.Enterprise="enterprise",n))(Es||{}),ue=(n=>(n[n.VerificationRequired=-1]="VerificationRequired",n[n.Free=0]="Free",n[n.FreeInPreviewTrial=1]="FreeInPreviewTrial",n[n.FreePreviewTrialExpired=2]="FreePreviewTrialExpired",n[n.FreePlusInTrial=3]="FreePlusInTrial",n[n.FreePlusTrialExpired=4]="FreePlusTrialExpired",n[n.Paid=5]="Paid",n))(ue||{});function Qu(n){const{account:r,plan:{actual:i,effective:s},previewTrial:a}=n;if(r?.verified===!1)return-1;if(i.id===s.id)switch(s.id){case"free":return a==null?0:2;case"free+":return 4;case"pro":case"teams":case"enterprise":return 5}switch(s.id){case"free":return a==null?0:1;case"free+":return 4;case"pro":return i.id==="free"?1:3;case"teams":case"enterprise":return 5}}function Yu(n,r,i){return{id:n,name:ks(n),startedOn:(r??new Date).toISOString(),expiresOn:i?.toISOString()}}function ks(n){switch(n){case"free+":return"GitLens Free";case"pro":return"GitLens Pro";case"teams":return"GitLens Teams";case"enterprise":return"GitLens Enterprise";case"free":default:return"GitLens"}}const Ps=new Map([[void 0,-1],["free",0],["free+",1],["pro",2],["teams",3],["enterprise",4]]);function Ju(n){return Ps.get(n)}function jr(n,r){return Hr(n.plan.effective.expiresOn,r)}function Hr(n,r){return n!=null?xs(Date.now(),new Date(n),r):void 0}function Zu(n){return As(n.plan.effective.id)}function As(n){return n!=="free"&&n!=="free+"}function Xu(n){const r=jr(n);return r!=null&&r<=0}function Ku(n){return n.plan.actual.id!==n.plan.effective.id}function ef(n){const r=Hr(n.previewTrial?.expiresOn);return r!=null?r<=0:void 0}class Wr{constructor(r,i=!1){this.method=r,this.overwriteable=i}}class wt extends Wr{}class tn extends Wr{}function zr(n,r,i){n.method===r.method&&i(r.params,n)}const Ts=new wt("webview/ready"),$s=new wt("command/execute"),tf=new wt("configuration/preview"),nf=new wt("configuration/update"),rf=new tn("configuration/didChange"),of=new tn("configuration/didPreview"),sf=new tn("webview/didOpenAnchor");var Fs=(n=>(n.DismissedWelcome="dismissed:welcome",n.OpenedSCM="opened:scm",n))(Fs||{});const Os=new wt("home/step/complete"),Ls=new wt("home/section/dismiss"),qr=new tn("subscription/didChange");var ut;(n=>{function r(a,c,f,d){let m=!1;if(typeof a=="string"){const U=function(I){const z=I?.target;!z?.matches(a)||f(I,z)};return document.addEventListener(c,U,d??!0),{dispose:()=>{m||(m=!0,document.removeEventListener(c,U,d??!0))}}}const w=function(U){f(U,this)};return a.addEventListener(c,w,d??!1),{dispose:()=>{m||(m=!0,a.removeEventListener(c,w,d??!1))}}}n.on=r;function i(a,c,f){const d=document.getElementById(a);if(c.replaceChildren(d?.content.cloneNode(!0)),c.className=d.className,f?.visible!=null){const m=c.querySelectorAll("[data-visible]");for(const w of m){const U=w.dataset.visible;!U||(f.visible[U]?w.style.display="initial":w.style.display="none")}}if(f?.bindings!=null){const m=c.querySelectorAll("[data-bind]");for(const w of m){const U=w.dataset.bind;if(!U)continue;const I=f.bindings[U];I!=null&&(w.textContent=String(I))}}}n.insertTemplate=i;function s(a){a.replaceChildren(),a.className=""}n.resetSlot=s})(ut||(ut={}));const Ds=/^(?:(#?)([0-9a-f]{3}|[0-9a-f]{6})|((?:rgb|hsl)a?)\((-?\d+%?)[,\s]+(-?\d+%?)[,\s]+(-?\d+%?)[,\s]*(-?[\d.]+%?)?\))$/i;function Fn(n,r){const i=n+r,s=r<0?i<0?0:i:i>255?255:i;return Math.round(s)}function ke(n,r){return Ae(n,-r)}function Ae(n,r){const i=rn(n);if(i==null)return n;const[s,a,c,f]=i,d=255*r/100;return`rgba(${Fn(s,d)}, ${Fn(a,d)}, ${Fn(c,d)}, ${f})`}function Ce(n,r){const i=rn(n);if(i==null)return n;const[s,a,c,f]=i;return`rgba(${s}, ${a}, ${c}, ${f*(r/100)})`}function af(n,r,i){const s=rn(n),a=rn(r);if(s==null||a==null)return n;const[c,f,d,m]=s,[w,U,I,z]=a;return`rgba(${nn(c,w,i)}, ${nn(f,U,i)}, ${nn(d,I,i)}, ${nn(m,z,i)})`}const nn=(n,r,i)=>n+(r-n)*i/100;function rn(n){n=n.trim();const r=Ds.exec(n);if(r==null)return null;if(r[1]==="#"){const i=r[2];switch(i.length){case 3:return[parseInt(i[0]+i[0],16),parseInt(i[1]+i[1],16),parseInt(i[2]+i[2],16),1];case 6:return[parseInt(i.substring(0,2),16),parseInt(i.substring(2,4),16),parseInt(i.substring(4,6),16),1]}return null}switch(r[3]){case"rgb":return[parseInt(r[4],10),parseInt(r[5],10),parseInt(r[6],10),1];case"rgba":return[parseInt(r[4],10),parseInt(r[5],10),parseInt(r[6],10),parseFloat(r[7])];default:return null}}const Gr=class{constructor(){this._disposed=!1}get event(){return this._event==null&&(this._event=(n,r,i)=>{this.listeners==null&&(this.listeners=new Yr);const s=this.listeners.push(r==null?n:[n,r]),a={dispose:()=>{a.dispose=Gr._noop,this._disposed||s()}};return Array.isArray(i)&&i.push(a),a}),this._event}fire(n){if(this.listeners!=null){this._deliveryQueue==null&&(this._deliveryQueue=new Yr);for(let r=this.listeners.iterator(),i=r.next();!i.done;i=r.next())this._deliveryQueue.push([i.value,n]);for(;this._deliveryQueue.size>0;){const[r,i]=this._deliveryQueue.shift();try{typeof r=="function"?r(i):r[0].call(r[1],i)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let Qr=Gr;Qr._noop=function(){};const Is={done:!0,value:void 0},on=class{constructor(n){this.element=n,this.next=on.Undefined,this.prev=on.Undefined}};let _e=on;_e.Undefined=new on(void 0);class Yr{constructor(){this._first=_e.Undefined,this._last=_e.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===_e.Undefined}clear(){this._first=_e.Undefined,this._last=_e.Undefined,this._size=0}unshift(r){return this._insert(r,!1)}push(r){return this._insert(r,!0)}_insert(r,i){const s=new _e(r);if(this._first===_e.Undefined)this._first=s,this._last=s;else if(i){const c=this._last;this._last=s,s.prev=c,c.next=s}else{const c=this._first;this._first=s,s.next=c,c.prev=s}this._size+=1;let a=!1;return()=>{a||(a=!0,this._remove(s))}}shift(){if(this._first===_e.Undefined)return;const r=this._first.element;return this._remove(this._first),r}pop(){if(this._last===_e.Undefined)return;const r=this._last.element;return this._remove(this._last),r}_remove(r){if(r.prev!==_e.Undefined&&r.next!==_e.Undefined){const i=r.prev;i.next=r.next,r.next.prev=i}else r.prev===_e.Undefined&&r.next===_e.Undefined?(this._first=_e.Undefined,this._last=_e.Undefined):r.next===_e.Undefined?(this._last=this._last.prev,this._last.next=_e.Undefined):r.prev===_e.Undefined&&(this._first=this._first.next,this._first.prev=_e.Undefined);this._size-=1}iterator(){let r,i=this._first;return{next:function(){return i===_e.Undefined?Is:(r==null?r={done:!1,value:i.element}:r.value=i.element,i=i.next,r)}}}toArray(){const r=[];for(let i=this._first;i!==_e.Undefined;i=i.next)r.push(i.element);return r}}const Jr=new Qr,Bs=Jr.event;function Cs(){const n=i=>{const s=document.body,a=window.getComputedStyle(s),c=s.classList.contains("vscode-light")||s.classList.contains("vscode-high-contrast-light"),f=s.style;f.setProperty("--font-family",a.getPropertyValue("--vscode-font-family").trim()),f.setProperty("--font-size",a.getPropertyValue("--vscode-font-size").trim()),f.setProperty("--font-weight",a.getPropertyValue("--vscode-font-weight").trim()),f.setProperty("--editor-font-family",a.getPropertyValue("--vscode-editor-font-family").trim()),f.setProperty("--editor-font-size",a.getPropertyValue("--vscode-editor-font-size").trim()),f.setProperty("--editor-font-weight",a.getPropertyValue("--vscode-editor-font-weight").trim());const d=a.getPropertyValue("--vscode-editor-background").trim();let m=d;f.setProperty("--color-background",m),f.setProperty("--color-background--lighten-05",Ae(m,5)),f.setProperty("--color-background--darken-05",ke(m,5)),f.setProperty("--color-background--lighten-075",Ae(m,7.5)),f.setProperty("--color-background--darken-075",ke(m,7.5)),f.setProperty("--color-background--lighten-10",Ae(m,10)),f.setProperty("--color-background--darken-10",ke(m,10)),f.setProperty("--color-background--lighten-15",Ae(m,15)),f.setProperty("--color-background--darken-15",ke(m,15)),f.setProperty("--color-background--lighten-30",Ae(m,30)),f.setProperty("--color-background--darken-30",ke(m,30)),f.setProperty("--color-background--lighten-50",Ae(m,50)),f.setProperty("--color-background--darken-50",ke(m,50)),m=a.getPropertyValue("--vscode-button-background").trim(),f.setProperty("--color-button-background",m),f.setProperty("--color-button-background--darken-30",ke(m,30)),f.setProperty("--color-highlight",m),f.setProperty("--color-highlight--75",Ce(m,75)),f.setProperty("--color-highlight--50",Ce(m,50)),f.setProperty("--color-highlight--25",Ce(m,25)),m=a.getPropertyValue("--vscode-button-secondaryBackground").trim(),f.setProperty("--color-button-secondary-background",m),f.setProperty("--color-button-secondary-background--darken-30",ke(m,30)),m=a.getPropertyValue("--vscode-button-foreground").trim(),f.setProperty("--color-button-foreground",m);let w=a.getPropertyValue("--vscode-editor-foreground").trim();w||(w=a.getPropertyValue("--vscode-foreground").trim()),f.setProperty("--color-foreground",w),f.setProperty("--color-foreground--85",Ce(w,85)),f.setProperty("--color-foreground--75",Ce(w,75)),f.setProperty("--color-foreground--65",Ce(w,65)),f.setProperty("--color-foreground--50",Ce(w,50)),m=a.getPropertyValue("--vscode-focusBorder").trim(),f.setProperty("--color-focus-border",m),m=a.getPropertyValue("--vscode-textLink-foreground").trim(),f.setProperty("--color-link-foreground",m),f.setProperty("--color-link-foreground--darken-20",ke(m,20)),f.setProperty("--color-link-foreground--lighten-20",Ae(m,20)),m=a.getPropertyValue("--vscode-sideBar-background").trim(),f.setProperty("--color-view-background",m||d),m=a.getPropertyValue("--vscode-sideBar-foreground").trim(),f.setProperty("--color-view-foreground",m||w),f.setProperty("--color-view-header-foreground",a.getPropertyValue("--vscode-sideBarSectionHeader-foreground").trim()||m||w),m=a.getPropertyValue("--vscode-editorHoverWidget-background").trim(),f.setProperty("--color-hover-background",m),m=a.getPropertyValue("--vscode-editorHoverWidget-border").trim(),f.setProperty("--color-hover-border",m),m=a.getPropertyValue("--vscode-editorHoverWidget-foreground").trim(),f.setProperty("--color-hover-foreground",m),m=a.getPropertyValue("--vscode-editorHoverWidget-statusBarBackground").trim(),f.setProperty("--color-hover-statusBarBackground",m),f.setProperty("--graph-theme-opacity-factor",c?"0.5":"1"),f.setProperty("--color-graph-actionbar-background",c?ke(d,5):Ae(d,5)),f.setProperty("--color-graph-actionbar-selectedBackground",c?ke(d,10):Ae(d,10)),f.setProperty("--color-graph-background",c?ke(d,5):Ae(d,5)),f.setProperty("--color-graph-background2",c?ke(d,10):Ae(d,10)),m=a.getPropertyValue("--vscode-list-focusOutline").trim(),f.setProperty("--color-graph-contrast-border-color",m),m=a.getPropertyValue("--vscode-list-activeSelectionBackground").trim(),f.setProperty("--color-graph-selected-row",m),m=a.getPropertyValue("--vscode-list-hoverBackground").trim(),f.setProperty("--color-graph-hover-row",m),m=a.getPropertyValue("--vscode-list-activeSelectionForeground").trim(),f.setProperty("--color-graph-text-selected-row",m),f.setProperty("--color-graph-text-dimmed-selected",Ce(m,50)),f.setProperty("--color-graph-text-dimmed",Ce(w,20)),m=a.getPropertyValue("--vscode-list-hoverForeground").trim(),f.setProperty("--color-graph-text-hovered",m),f.setProperty("--color-graph-text-selected",w),f.setProperty("--color-graph-text-normal",Ce(w,85)),f.setProperty("--color-graph-text-secondary",Ce(w,65)),f.setProperty("--color-graph-text-disabled",Ce(w,50)),m=a.getPropertyValue("--vscode-inputValidation-infoBackground").trim(),f.setProperty("--color-alert-infoHoverBackground",c?ke(m,5):Ae(m,5)),f.setProperty("--color-alert-infoBackground",m),m=a.getPropertyValue("--vscode-inputValidation-warningBackground").trim(),f.setProperty("--color-alert-warningHoverBackground",c?ke(m,5):Ae(m,5)),f.setProperty("--color-alert-warningBackground",m),m=a.getPropertyValue("--vscode-inputValidation-errorBackground").trim(),f.setProperty("--color-alert-errorHoverBackground",c?ke(m,5):Ae(m,5)),f.setProperty("--color-alert-errorBackground",m),m=c?ke(d,5):Ae(d,5),f.setProperty("--color-alert-neutralHoverBackground",c?ke(m,5):Ae(m,5)),f.setProperty("--color-alert-neutralBackground",m),f.setProperty("--color-alert-infoBorder","var(--vscode-inputValidation-infoBorder)"),f.setProperty("--color-alert-warningBorder","var(--vscode-inputValidation-warningBorder)"),f.setProperty("--color-alert-errorBorder","var(--vscode-inputValidation-errorBorder)"),f.setProperty("--color-alert-neutralBorder","var(--vscode-input-foreground)"),f.setProperty("--color-alert-foreground","var(--vscode-input-foreground)"),i!=null&&Jr.fire()};n();const r=new MutationObserver(n);return r.observe(document.body,{attributeFilter:["class"]}),r}const Ms=2**30;let sn=0;function Zr(){return sn===Ms?sn=1:sn++,`webview:${sn}`}class Ns{constructor(r){this.appName=r,this.state=window.bootstrap,window.bootstrap=void 0,this.log(`${this.appName}()`),this._api=acquireVsCodeApi(),this.onThemeUpdated!=null&&Bs(this.onThemeUpdated,this),Cs(),requestAnimationFrame(()=>{this.log(`${this.appName}.initializing`);try{this.onInitialize?.(),this.bind(),this.onMessageReceived!=null&&window.addEventListener("message",this.onMessageReceived.bind(this)),this.sendCommand(Ts,void 0),this.onInitialized?.()}finally{document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}})}bind(){this.bindDisposables?.forEach(r=>r.dispose()),this.bindDisposables=this.onBind?.()}log(r,...i){}getState(){return this._api.getState()}sendCommand(r,i){const s=Zr();this.log(`${this.appName}.sendCommand(${s}): name=${r.method}`),this.postMessage({id:s,method:r.method,params:i})}async sendCommandWithCompletion(r,i,s){const a=Zr();this.log(`${this.appName}.sendCommandWithCompletion(${a}): name=${r.method}`);const c=new Promise((f,d)=>{let m;const w=[ut.on(window,"message",U=>{zr(s,U.data,I=>{U.data.completionId===a&&(w.forEach(z=>z.dispose()),queueMicrotask(()=>f(I)))})}),{dispose:function(){m!=null&&(clearTimeout(m),m=void 0)}}];m=setTimeout(()=>{m=void 0,w.forEach(U=>U.dispose()),d(new Error(`Timed out waiting for completion of ${s.method}`))},6e4)});return this.postMessage({id:a,method:r.method,params:i,completionId:a}),c}setState(r){this.state=r,r!=null&&this._api.setState(r)}postMessage(r){this._api.postMessage(r)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const an=window,On=an.ShadowRoot&&(an.ShadyCSS===void 0||an.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ln=Symbol(),Xr=new WeakMap;class Kr{constructor(r,i,s){if(this._$cssResult$=!0,s!==Ln)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=i}get styleSheet(){let r=this.o;const i=this.t;if(On&&r===void 0){const s=i!==void 0&&i.length===1;s&&(r=Xr.get(i)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),s&&Xr.set(i,r))}return r}toString(){return this.cssText}}const Us=n=>new Kr(typeof n=="string"?n:n+"",void 0,Ln),Vs=(n,...r)=>{const i=n.length===1?n[0]:r.reduce((s,a,c)=>s+(f=>{if(f._$cssResult$===!0)return f.cssText;if(typeof f=="number")return f;throw Error("Value passed to 'css' function must be a 'css' function result: "+f+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+n[c+1],n[0]);return new Kr(i,n,Ln)},js=(n,r)=>{On?n.adoptedStyleSheets=r.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet):r.forEach(i=>{const s=document.createElement("style"),a=an.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,n.appendChild(s)})},ei=On?n=>n:n=>n instanceof CSSStyleSheet?(r=>{let i="";for(const s of r.cssRules)i+=s.cssText;return Us(i)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Dn;const ln=window,ti=ln.trustedTypes,Hs=ti?ti.emptyScript:"",ni=ln.reactiveElementPolyfillSupport,In={toAttribute(n,r){switch(r){case Boolean:n=n?Hs:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,r){let i=n;switch(r){case Boolean:i=n!==null;break;case Number:i=n===null?null:Number(n);break;case Object:case Array:try{i=JSON.parse(n)}catch{i=null}}return i}},ri=(n,r)=>r!==n&&(r==r||n==n),Bn={attribute:!0,type:String,converter:In,reflect:!1,hasChanged:ri};class _t extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(r){var i;(i=this.h)!==null&&i!==void 0||(this.h=[]),this.h.push(r)}static get observedAttributes(){this.finalize();const r=[];return this.elementProperties.forEach((i,s)=>{const a=this._$Ep(s,i);a!==void 0&&(this._$Ev.set(a,s),r.push(a))}),r}static createProperty(r,i=Bn){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(r,i),!i.noAccessor&&!this.prototype.hasOwnProperty(r)){const s=typeof r=="symbol"?Symbol():"__"+r,a=this.getPropertyDescriptor(r,s,i);a!==void 0&&Object.defineProperty(this.prototype,r,a)}}static getPropertyDescriptor(r,i,s){return{get(){return this[i]},set(a){const c=this[r];this[i]=a,this.requestUpdate(r,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)||Bn}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const r=Object.getPrototypeOf(this);if(r.finalize(),this.elementProperties=new Map(r.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const i=this.properties,s=[...Object.getOwnPropertyNames(i),...Object.getOwnPropertySymbols(i)];for(const a of s)this.createProperty(a,i[a])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(r){const i=[];if(Array.isArray(r)){const s=new Set(r.flat(1/0).reverse());for(const a of s)i.unshift(ei(a))}else r!==void 0&&i.push(ei(r));return i}static _$Ep(r,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof r=="string"?r.toLowerCase():void 0}u(){var r;this._$E_=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(r=this.constructor.h)===null||r===void 0||r.forEach(i=>i(this))}addController(r){var i,s;((i=this._$ES)!==null&&i!==void 0?i:this._$ES=[]).push(r),this.renderRoot!==void 0&&this.isConnected&&((s=r.hostConnected)===null||s===void 0||s.call(r))}removeController(r){var i;(i=this._$ES)===null||i===void 0||i.splice(this._$ES.indexOf(r)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((r,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])})}createRenderRoot(){var r;const i=(r=this.shadowRoot)!==null&&r!==void 0?r:this.attachShadow(this.constructor.shadowRootOptions);return js(i,this.constructor.elementStyles),i}connectedCallback(){var r;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(r=this._$ES)===null||r===void 0||r.forEach(i=>{var s;return(s=i.hostConnected)===null||s===void 0?void 0:s.call(i)})}enableUpdating(r){}disconnectedCallback(){var r;(r=this._$ES)===null||r===void 0||r.forEach(i=>{var s;return(s=i.hostDisconnected)===null||s===void 0?void 0:s.call(i)})}attributeChangedCallback(r,i,s){this._$AK(r,s)}_$EO(r,i,s=Bn){var a;const c=this.constructor._$Ep(r,s);if(c!==void 0&&s.reflect===!0){const f=(((a=s.converter)===null||a===void 0?void 0:a.toAttribute)!==void 0?s.converter:In).toAttribute(i,s.type);this._$El=r,f==null?this.removeAttribute(c):this.setAttribute(c,f),this._$El=null}}_$AK(r,i){var s;const a=this.constructor,c=a._$Ev.get(r);if(c!==void 0&&this._$El!==c){const f=a.getPropertyOptions(c),d=typeof f.converter=="function"?{fromAttribute:f.converter}:((s=f.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?f.converter:In;this._$El=c,this[c]=d.fromAttribute(i,f.type),this._$El=null}}requestUpdate(r,i,s){let a=!0;r!==void 0&&(((s=s||this.constructor.getPropertyOptions(r)).hasChanged||ri)(this[r],i)?(this._$AL.has(r)||this._$AL.set(r,i),s.reflect===!0&&this._$El!==r&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(r,s))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(i){Promise.reject(i)}const r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((a,c)=>this[c]=a),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),(r=this._$ES)===null||r===void 0||r.forEach(a=>{var c;return(c=a.hostUpdate)===null||c===void 0?void 0:c.call(a)}),this.update(s)):this._$Ek()}catch(a){throw i=!1,this._$Ek(),a}i&&this._$AE(s)}willUpdate(r){}_$AE(r){var i;(i=this._$ES)===null||i===void 0||i.forEach(s=>{var a;return(a=s.hostUpdated)===null||a===void 0?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(r){return!0}update(r){this._$EC!==void 0&&(this._$EC.forEach((i,s)=>this._$EO(s,this[s],i)),this._$EC=void 0),this._$Ek()}updated(r){}firstUpdated(r){}}_t.finalized=!0,_t.elementProperties=new Map,_t.elementStyles=[],_t.shadowRootOptions={mode:"open"},ni?.({ReactiveElement:_t}),((Dn=ln.reactiveElementVersions)!==null&&Dn!==void 0?Dn:ln.reactiveElementVersions=[]).push("1.4.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Cn;const cn=window,xt=cn.trustedTypes,ii=xt?xt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Je=`lit$${(Math.random()+"").slice(9)}$`,Mn="?"+Je,Ws=`<${Mn}>`,St=document,Bt=(n="")=>St.createComment(n),Ct=n=>n===null||typeof n!="object"&&typeof n!="function",oi=Array.isArray,si=n=>oi(n)||typeof n?.[Symbol.iterator]=="function",Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ai=/-->/g,li=/>/g,ft=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ci=/'/g,ui=/"/g,fi=/^(?:script|style|textarea|title)$/i,hi=n=>(r,...i)=>({_$litType$:n,strings:r,values:i}),zs=hi(1),lf=hi(2),Rt=Symbol.for("lit-noChange"),Pe=Symbol.for("lit-nothing"),di=new WeakMap,Et=St.createTreeWalker(St,129,null,!1),pi=(n,r)=>{const i=n.length-1,s=[];let a,c=r===2?"<svg>":"",f=Mt;for(let m=0;m<i;m++){const w=n[m];let U,I,z=-1,ae=0;for(;ae<w.length&&(f.lastIndex=ae,I=f.exec(w),I!==null);)ae=f.lastIndex,f===Mt?I[1]==="!--"?f=ai:I[1]!==void 0?f=li:I[2]!==void 0?(fi.test(I[2])&&(a=RegExp("</"+I[2],"g")),f=ft):I[3]!==void 0&&(f=ft):f===ft?I[0]===">"?(f=a??Mt,z=-1):I[1]===void 0?z=-2:(z=f.lastIndex-I[2].length,U=I[1],f=I[3]===void 0?ft:I[3]==='"'?ui:ci):f===ui||f===ci?f=ft:f===ai||f===li?f=Mt:(f=ft,a=void 0);const be=f===ft&&n[m+1].startsWith("/>")?" ":"";c+=f===Mt?w+Ws:z>=0?(s.push(U),w.slice(0,z)+"$lit$"+w.slice(z)+Je+be):w+Je+(z===-2?(s.push(void 0),m):be)}const d=c+(n[i]||"<?>")+(r===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ii!==void 0?ii.createHTML(d):d,s]};class Nt{constructor({strings:r,_$litType$:i},s){let a;this.parts=[];let c=0,f=0;const d=r.length-1,m=this.parts,[w,U]=pi(r,i);if(this.el=Nt.createElement(w,s),Et.currentNode=this.el.content,i===2){const I=this.el.content,z=I.firstChild;z.remove(),I.append(...z.childNodes)}for(;(a=Et.nextNode())!==null&&m.length<d;){if(a.nodeType===1){if(a.hasAttributes()){const I=[];for(const z of a.getAttributeNames())if(z.endsWith("$lit$")||z.startsWith(Je)){const ae=U[f++];if(I.push(z),ae!==void 0){const be=a.getAttribute(ae.toLowerCase()+"$lit$").split(Je),ye=/([.?@])?(.*)/.exec(ae);m.push({type:1,index:c,name:ye[2],strings:be,ctor:ye[1]==="."?bi:ye[1]==="?"?yi:ye[1]==="@"?vi:Ut})}else m.push({type:6,index:c})}for(const z of I)a.removeAttribute(z)}if(fi.test(a.tagName)){const I=a.textContent.split(Je),z=I.length-1;if(z>0){a.textContent=xt?xt.emptyScript:"";for(let ae=0;ae<z;ae++)a.append(I[ae],Bt()),Et.nextNode(),m.push({type:2,index:++c});a.append(I[z],Bt())}}}else if(a.nodeType===8)if(a.data===Mn)m.push({type:2,index:c});else{let I=-1;for(;(I=a.data.indexOf(Je,I+1))!==-1;)m.push({type:7,index:c}),I+=Je.length-1}c++}}static createElement(r,i){const s=St.createElement("template");return s.innerHTML=r,s}}function ht(n,r,i=n,s){var a,c,f,d;if(r===Rt)return r;let m=s!==void 0?(a=i._$Co)===null||a===void 0?void 0:a[s]:i._$Cl;const w=Ct(r)?void 0:r._$litDirective$;return m?.constructor!==w&&((c=m?._$AO)===null||c===void 0||c.call(m,!1),w===void 0?m=void 0:(m=new w(n),m._$AT(n,i,s)),s!==void 0?((f=(d=i)._$Co)!==null&&f!==void 0?f:d._$Co=[])[s]=m:i._$Cl=m),m!==void 0&&(r=ht(n,m._$AS(n,r.values),m,s)),r}class gi{constructor(r,i){this.u=[],this._$AN=void 0,this._$AD=r,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(r){var i;const{el:{content:s},parts:a}=this._$AD,c=((i=r?.creationScope)!==null&&i!==void 0?i:St).importNode(s,!0);Et.currentNode=c;let f=Et.nextNode(),d=0,m=0,w=a[0];for(;w!==void 0;){if(d===w.index){let U;w.type===2?U=new kt(f,f.nextSibling,this,r):w.type===1?U=new w.ctor(f,w.name,w.strings,this,r):w.type===6&&(U=new mi(f,this,r)),this.u.push(U),w=a[++m]}d!==w?.index&&(f=Et.nextNode(),d++)}return c}p(r){let i=0;for(const s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(r,s,i),i+=s.strings.length-2):s._$AI(r[i])),i++}}class kt{constructor(r,i,s,a){var c;this.type=2,this._$AH=Pe,this._$AN=void 0,this._$AA=r,this._$AB=i,this._$AM=s,this.options=a,this._$Cm=(c=a?.isConnected)===null||c===void 0||c}get _$AU(){var r,i;return(i=(r=this._$AM)===null||r===void 0?void 0:r._$AU)!==null&&i!==void 0?i:this._$Cm}get parentNode(){let r=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&r.nodeType===11&&(r=i.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,i=this){r=ht(this,r,i),Ct(r)?r===Pe||r==null||r===""?(this._$AH!==Pe&&this._$AR(),this._$AH=Pe):r!==this._$AH&&r!==Rt&&this.g(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):si(r)?this.k(r):this.g(r)}O(r,i=this._$AB){return this._$AA.parentNode.insertBefore(r,i)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}g(r){this._$AH!==Pe&&Ct(this._$AH)?this._$AA.nextSibling.data=r:this.T(St.createTextNode(r)),this._$AH=r}$(r){var i;const{values:s,_$litType$:a}=r,c=typeof a=="number"?this._$AC(r):(a.el===void 0&&(a.el=Nt.createElement(a.h,this.options)),a);if(((i=this._$AH)===null||i===void 0?void 0:i._$AD)===c)this._$AH.p(s);else{const f=new gi(c,this),d=f.v(this.options);f.p(s),this.T(d),this._$AH=f}}_$AC(r){let i=di.get(r.strings);return i===void 0&&di.set(r.strings,i=new Nt(r)),i}k(r){oi(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,a=0;for(const c of r)a===i.length?i.push(s=new kt(this.O(Bt()),this.O(Bt()),this,this.options)):s=i[a],s._$AI(c),a++;a<i.length&&(this._$AR(s&&s._$AB.nextSibling,a),i.length=a)}_$AR(r=this._$AA.nextSibling,i){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,i);r&&r!==this._$AB;){const a=r.nextSibling;r.remove(),r=a}}setConnected(r){var i;this._$AM===void 0&&(this._$Cm=r,(i=this._$AP)===null||i===void 0||i.call(this,r))}}class Ut{constructor(r,i,s,a,c){this.type=1,this._$AH=Pe,this._$AN=void 0,this.element=r,this.name=i,this._$AM=a,this.options=c,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Pe}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(r,i=this,s,a){const c=this.strings;let f=!1;if(c===void 0)r=ht(this,r,i,0),f=!Ct(r)||r!==this._$AH&&r!==Rt,f&&(this._$AH=r);else{const d=r;let m,w;for(r=c[0],m=0;m<c.length-1;m++)w=ht(this,d[s+m],i,m),w===Rt&&(w=this._$AH[m]),f||(f=!Ct(w)||w!==this._$AH[m]),w===Pe?r=Pe:r!==Pe&&(r+=(w??"")+c[m+1]),this._$AH[m]=w}f&&!a&&this.j(r)}j(r){r===Pe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class bi extends Ut{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===Pe?void 0:r}}const qs=xt?xt.emptyScript:"";class yi extends Ut{constructor(){super(...arguments),this.type=4}j(r){r&&r!==Pe?this.element.setAttribute(this.name,qs):this.element.removeAttribute(this.name)}}class vi extends Ut{constructor(r,i,s,a,c){super(r,i,s,a,c),this.type=5}_$AI(r,i=this){var s;if((r=(s=ht(this,r,i,0))!==null&&s!==void 0?s:Pe)===Rt)return;const a=this._$AH,c=r===Pe&&a!==Pe||r.capture!==a.capture||r.once!==a.once||r.passive!==a.passive,f=r!==Pe&&(a===Pe||c);c&&this.element.removeEventListener(this.name,this,a),f&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){var i,s;typeof this._$AH=="function"?this._$AH.call((s=(i=this.options)===null||i===void 0?void 0:i.host)!==null&&s!==void 0?s:this.element,r):this._$AH.handleEvent(r)}}class mi{constructor(r,i,s){this.element=r,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(r){ht(this,r)}}const cf={P:"$lit$",A:Je,M:Mn,C:1,L:pi,R:gi,D:si,V:ht,I:kt,H:Ut,N:yi,U:vi,B:bi,F:mi},wi=cn.litHtmlPolyfillSupport;wi?.(Nt,kt),((Cn=cn.litHtmlVersions)!==null&&Cn!==void 0?Cn:cn.litHtmlVersions=[]).push("2.4.0");const Gs=(n,r,i)=>{var s,a;const c=(s=i?.renderBefore)!==null&&s!==void 0?s:r;let f=c._$litPart$;if(f===void 0){const d=(a=i?.renderBefore)!==null&&a!==void 0?a:null;c._$litPart$=f=new kt(r.insertBefore(Bt(),d),d,void 0,i??{})}return f._$AI(n),f};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Nn,Un;const uf=null;class Vt extends _t{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r,i;const s=super.createRenderRoot();return(r=(i=this.renderOptions).renderBefore)!==null&&r!==void 0||(i.renderBefore=s.firstChild),s}update(r){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Gs(i,this.renderRoot,this.renderOptions)}connectedCallback(){var r;super.connectedCallback(),(r=this._$Do)===null||r===void 0||r.setConnected(!0)}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this._$Do)===null||r===void 0||r.setConnected(!1)}render(){return Rt}}Vt.finalized=!0,Vt._$litElement$=!0,(Nn=globalThis.litElementHydrateSupport)===null||Nn===void 0||Nn.call(globalThis,{LitElement:Vt});const _i=globalThis.litElementPolyfillSupport;_i?.({LitElement:Vt});const ff={_$AK:(n,r,i)=>{n._$AK(r,i)},_$AL:n=>n._$AL};((Un=globalThis.litElementVersions)!==null&&Un!==void 0?Un:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qs=n=>r=>typeof r=="function"?((i,s)=>(customElements.define(i,s),s))(n,r):((i,s)=>{const{kind:a,elements:c}=s;return{kind:a,elements:c,finisher(f){customElements.define(i,f)}}})(n,r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ys=(n,r)=>r.kind==="method"&&r.descriptor&&!("value"in r.descriptor)?{...r,finisher(i){i.createProperty(r.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:r.key,initializer(){typeof r.initializer=="function"&&(this[r.key]=r.initializer.call(this))},finisher(i){i.createProperty(r.key,n)}};function xi(n){return(r,i)=>i!==void 0?((s,a,c)=>{a.constructor.createProperty(c,s)})(n,r,i):Ys(n,r)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Vn;const Js=((Vn=window.HTMLSlotElement)===null||Vn===void 0?void 0:Vn.prototype.assignedElements)!=null?(n,r)=>n.assignedElements(r):(n,r)=>n.assignedNodes(r).filter(i=>i.nodeType===Node.ELEMENT_NODE);function hf(n){const{slot:r,selector:i}=n??{};return o({descriptor:s=>({get(){var a;const c="slot"+(r?`[name=${r}]`:":not([name])"),f=(a=this.renderRoot)===null||a===void 0?void 0:a.querySelector(c),d=f!=null?Js(f,n):[];return i?d.filter(m=>m.matches(i)):d},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function df(n,r,i){let s,a=n;return typeof n=="object"?(a=n.slot,s=n):s={flatten:r},i?t({slot:a,flatten:r,selector:i}):e({descriptor:c=>({get(){var f,d;const m="slot"+(a?`[name=${a}]`:":not([name])"),w=(f=this.renderRoot)===null||f===void 0?void 0:f.querySelector(m);return(d=w?.assignedNodes(s))!==null&&d!==void 0?d:[]},enumerable:!0,configurable:!0})})}var Zs=Object.defineProperty,Xs=Object.getOwnPropertyDescriptor,jn=(n,r,i,s)=>{for(var a=s>1?void 0:s?Xs(r,i):r,c=n.length-1,f;c>=0;c--)(f=n[c])&&(a=(s?f(r,i,a):f(a))||a);return s&&a&&Zs(r,i,a),a};let jt=class extends Vt{constructor(){super(...arguments),this.icon="",this.modifier=""}render(){return zs``}};jt.styles=Vs`
		:host {
			font: normal normal normal 16px/1 codicon;
			display: inline-block;
			text-decoration: none;
			text-rendering: auto;
			text-align: center;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			color: inherit;
			vertical-align: text-bottom;
			letter-spacing: normal;
		}

		:host([icon='add']):before {
			content: '\\ea60';
		}
		:host([icon='plus']):before {
			content: '\\ea60';
		}
		:host([icon='gist-new']):before {
			content: '\\ea60';
		}
		:host([icon='repo-create']):before {
			content: '\\ea60';
		}
		:host([icon='lightbulb']):before {
			content: '\\ea61';
		}
		:host([icon='light-bulb']):before {
			content: '\\ea61';
		}
		:host([icon='repo']):before {
			content: '\\ea62';
		}
		:host([icon='repo-delete']):before {
			content: '\\ea62';
		}
		:host([icon='gist-fork']):before {
			content: '\\ea63';
		}
		:host([icon='repo-forked']):before {
			content: '\\ea63';
		}
		:host([icon='git-pull-request']):before {
			content: '\\ea64';
		}
		:host([icon='git-pull-request-abandoned']):before {
			content: '\\ea64';
		}
		:host([icon='record-keys']):before {
			content: '\\ea65';
		}
		:host([icon='keyboard']):before {
			content: '\\ea65';
		}
		:host([icon='tag']):before {
			content: '\\ea66';
		}
		:host([icon='tag-add']):before {
			content: '\\ea66';
		}
		:host([icon='tag-remove']):before {
			content: '\\ea66';
		}
		:host([icon='person']):before {
			content: '\\ea67';
		}
		:host([icon='person-follow']):before {
			content: '\\ea67';
		}
		:host([icon='person-outline']):before {
			content: '\\ea67';
		}
		:host([icon='person-filled']):before {
			content: '\\ea67';
		}
		:host([icon='git-branch']):before {
			content: '\\ea68';
		}
		:host([icon='git-branch-create']):before {
			content: '\\ea68';
		}
		:host([icon='git-branch-delete']):before {
			content: '\\ea68';
		}
		:host([icon='source-control']):before {
			content: '\\ea68';
		}
		:host([icon='mirror']):before {
			content: '\\ea69';
		}
		:host([icon='mirror-public']):before {
			content: '\\ea69';
		}
		:host([icon='star']):before {
			content: '\\ea6a';
		}
		:host([icon='star-add']):before {
			content: '\\ea6a';
		}
		:host([icon='star-delete']):before {
			content: '\\ea6a';
		}
		:host([icon='star-empty']):before {
			content: '\\ea6a';
		}
		:host([icon='comment']):before {
			content: '\\ea6b';
		}
		:host([icon='comment-add']):before {
			content: '\\ea6b';
		}
		:host([icon='alert']):before {
			content: '\\ea6c';
		}
		:host([icon='warning']):before {
			content: '\\ea6c';
		}
		:host([icon='search']):before {
			content: '\\ea6d';
		}
		:host([icon='search-save']):before {
			content: '\\ea6d';
		}
		:host([icon='log-out']):before {
			content: '\\ea6e';
		}
		:host([icon='sign-out']):before {
			content: '\\ea6e';
		}
		:host([icon='log-in']):before {
			content: '\\ea6f';
		}
		:host([icon='sign-in']):before {
			content: '\\ea6f';
		}
		:host([icon='eye']):before {
			content: '\\ea70';
		}
		:host([icon='eye-unwatch']):before {
			content: '\\ea70';
		}
		:host([icon='eye-watch']):before {
			content: '\\ea70';
		}
		:host([icon='circle-filled']):before {
			content: '\\ea71';
		}
		:host([icon='primitive-dot']):before {
			content: '\\ea71';
		}
		:host([icon='close-dirty']):before {
			content: '\\ea71';
		}
		:host([icon='debug-breakpoint']):before {
			content: '\\ea71';
		}
		:host([icon='debug-breakpoint-disabled']):before {
			content: '\\ea71';
		}
		:host([icon='debug-hint']):before {
			content: '\\ea71';
		}
		:host([icon='primitive-square']):before {
			content: '\\ea72';
		}
		:host([icon='edit']):before {
			content: '\\ea73';
		}
		:host([icon='pencil']):before {
			content: '\\ea73';
		}
		:host([icon='info']):before {
			content: '\\ea74';
		}
		:host([icon='issue-opened']):before {
			content: '\\ea74';
		}
		:host([icon='gist-private']):before {
			content: '\\ea75';
		}
		:host([icon='git-fork-private']):before {
			content: '\\ea75';
		}
		:host([icon='lock']):before {
			content: '\\ea75';
		}
		:host([icon='mirror-private']):before {
			content: '\\ea75';
		}
		:host([icon='close']):before {
			content: '\\ea76';
		}
		:host([icon='remove-close']):before {
			content: '\\ea76';
		}
		:host([icon='x']):before {
			content: '\\ea76';
		}
		:host([icon='repo-sync']):before {
			content: '\\ea77';
		}
		:host([icon='sync']):before {
			content: '\\ea77';
		}
		:host([icon='clone']):before {
			content: '\\ea78';
		}
		:host([icon='desktop-download']):before {
			content: '\\ea78';
		}
		:host([icon='beaker']):before {
			content: '\\ea79';
		}
		:host([icon='microscope']):before {
			content: '\\ea79';
		}
		:host([icon='vm']):before {
			content: '\\ea7a';
		}
		:host([icon='device-desktop']):before {
			content: '\\ea7a';
		}
		:host([icon='file']):before {
			content: '\\ea7b';
		}
		:host([icon='file-text']):before {
			content: '\\ea7b';
		}
		:host([icon='more']):before {
			content: '\\ea7c';
		}
		:host([icon='ellipsis']):before {
			content: '\\ea7c';
		}
		:host([icon='kebab-horizontal']):before {
			content: '\\ea7c';
		}
		:host([icon='mail-reply']):before {
			content: '\\ea7d';
		}
		:host([icon='reply']):before {
			content: '\\ea7d';
		}
		:host([icon='organization']):before {
			content: '\\ea7e';
		}
		:host([icon='organization-filled']):before {
			content: '\\ea7e';
		}
		:host([icon='organization-outline']):before {
			content: '\\ea7e';
		}
		:host([icon='new-file']):before {
			content: '\\ea7f';
		}
		:host([icon='file-add']):before {
			content: '\\ea7f';
		}
		:host([icon='new-folder']):before {
			content: '\\ea80';
		}
		:host([icon='file-directory-create']):before {
			content: '\\ea80';
		}
		:host([icon='trash']):before {
			content: '\\ea81';
		}
		:host([icon='trashcan']):before {
			content: '\\ea81';
		}
		:host([icon='history']):before {
			content: '\\ea82';
		}
		:host([icon='clock']):before {
			content: '\\ea82';
		}
		:host([icon='folder']):before {
			content: '\\ea83';
		}
		:host([icon='file-directory']):before {
			content: '\\ea83';
		}
		:host([icon='symbol-folder']):before {
			content: '\\ea83';
		}
		:host([icon='logo-github']):before {
			content: '\\ea84';
		}
		:host([icon='mark-github']):before {
			content: '\\ea84';
		}
		:host([icon='github']):before {
			content: '\\ea84';
		}
		:host([icon='terminal']):before {
			content: '\\ea85';
		}
		:host([icon='console']):before {
			content: '\\ea85';
		}
		:host([icon='repl']):before {
			content: '\\ea85';
		}
		:host([icon='zap']):before {
			content: '\\ea86';
		}
		:host([icon='symbol-event']):before {
			content: '\\ea86';
		}
		:host([icon='error']):before {
			content: '\\ea87';
		}
		:host([icon='stop']):before {
			content: '\\ea87';
		}
		:host([icon='variable']):before {
			content: '\\ea88';
		}
		:host([icon='symbol-variable']):before {
			content: '\\ea88';
		}
		:host([icon='array']):before {
			content: '\\ea8a';
		}
		:host([icon='symbol-array']):before {
			content: '\\ea8a';
		}
		:host([icon='symbol-module']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-package']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-namespace']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-object']):before {
			content: '\\ea8b';
		}
		:host([icon='symbol-method']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-function']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-constructor']):before {
			content: '\\ea8c';
		}
		:host([icon='symbol-boolean']):before {
			content: '\\ea8f';
		}
		:host([icon='symbol-null']):before {
			content: '\\ea8f';
		}
		:host([icon='symbol-numeric']):before {
			content: '\\ea90';
		}
		:host([icon='symbol-number']):before {
			content: '\\ea90';
		}
		:host([icon='symbol-structure']):before {
			content: '\\ea91';
		}
		:host([icon='symbol-struct']):before {
			content: '\\ea91';
		}
		:host([icon='symbol-parameter']):before {
			content: '\\ea92';
		}
		:host([icon='symbol-type-parameter']):before {
			content: '\\ea92';
		}
		:host([icon='symbol-key']):before {
			content: '\\ea93';
		}
		:host([icon='symbol-text']):before {
			content: '\\ea93';
		}
		:host([icon='symbol-reference']):before {
			content: '\\ea94';
		}
		:host([icon='go-to-file']):before {
			content: '\\ea94';
		}
		:host([icon='symbol-enum']):before {
			content: '\\ea95';
		}
		:host([icon='symbol-value']):before {
			content: '\\ea95';
		}
		:host([icon='symbol-ruler']):before {
			content: '\\ea96';
		}
		:host([icon='symbol-unit']):before {
			content: '\\ea96';
		}
		:host([icon='activate-breakpoints']):before {
			content: '\\ea97';
		}
		:host([icon='archive']):before {
			content: '\\ea98';
		}
		:host([icon='arrow-both']):before {
			content: '\\ea99';
		}
		:host([icon='arrow-down']):before {
			content: '\\ea9a';
		}
		:host([icon='arrow-left']):before {
			content: '\\ea9b';
		}
		:host([icon='arrow-right']):before {
			content: '\\ea9c';
		}
		:host([icon='arrow-small-down']):before {
			content: '\\ea9d';
		}
		:host([icon='arrow-small-left']):before {
			content: '\\ea9e';
		}
		:host([icon='arrow-small-right']):before {
			content: '\\ea9f';
		}
		:host([icon='arrow-small-up']):before {
			content: '\\eaa0';
		}
		:host([icon='arrow-up']):before {
			content: '\\eaa1';
		}
		:host([icon='bell']):before {
			content: '\\eaa2';
		}
		:host([icon='bold']):before {
			content: '\\eaa3';
		}
		:host([icon='book']):before {
			content: '\\eaa4';
		}
		:host([icon='bookmark']):before {
			content: '\\eaa5';
		}
		:host([icon='debug-breakpoint-conditional-unverified']):before {
			content: '\\eaa6';
		}
		:host([icon='debug-breakpoint-conditional']):before {
			content: '\\eaa7';
		}
		:host([icon='debug-breakpoint-conditional-disabled']):before {
			content: '\\eaa7';
		}
		:host([icon='debug-breakpoint-data-unverified']):before {
			content: '\\eaa8';
		}
		:host([icon='debug-breakpoint-data']):before {
			content: '\\eaa9';
		}
		:host([icon='debug-breakpoint-data-disabled']):before {
			content: '\\eaa9';
		}
		:host([icon='debug-breakpoint-log-unverified']):before {
			content: '\\eaaa';
		}
		:host([icon='debug-breakpoint-log']):before {
			content: '\\eaab';
		}
		:host([icon='debug-breakpoint-log-disabled']):before {
			content: '\\eaab';
		}
		:host([icon='briefcase']):before {
			content: '\\eaac';
		}
		:host([icon='broadcast']):before {
			content: '\\eaad';
		}
		:host([icon='browser']):before {
			content: '\\eaae';
		}
		:host([icon='bug']):before {
			content: '\\eaaf';
		}
		:host([icon='calendar']):before {
			content: '\\eab0';
		}
		:host([icon='case-sensitive']):before {
			content: '\\eab1';
		}
		:host([icon='check']):before {
			content: '\\eab2';
		}
		:host([icon='checklist']):before {
			content: '\\eab3';
		}
		:host([icon='chevron-down']):before {
			content: '\\eab4';
		}
		:host([icon='chevron-left']):before {
			content: '\\eab5';
		}
		:host([icon='chevron-right']):before {
			content: '\\eab6';
		}
		:host([icon='chevron-up']):before {
			content: '\\eab7';
		}
		:host([icon='chrome-close']):before {
			content: '\\eab8';
		}
		:host([icon='chrome-maximize']):before {
			content: '\\eab9';
		}
		:host([icon='chrome-minimize']):before {
			content: '\\eaba';
		}
		:host([icon='chrome-restore']):before {
			content: '\\eabb';
		}
		:host([icon='circle-outline']):before {
			content: '\\eabc';
		}
		:host([icon='debug-breakpoint-unverified']):before {
			content: '\\eabc';
		}
		:host([icon='circle-slash']):before {
			content: '\\eabd';
		}
		:host([icon='circuit-board']):before {
			content: '\\eabe';
		}
		:host([icon='clear-all']):before {
			content: '\\eabf';
		}
		:host([icon='clippy']):before {
			content: '\\eac0';
		}
		:host([icon='close-all']):before {
			content: '\\eac1';
		}
		:host([icon='cloud-download']):before {
			content: '\\eac2';
		}
		:host([icon='cloud-upload']):before {
			content: '\\eac3';
		}
		:host([icon='code']):before {
			content: '\\eac4';
		}
		:host([icon='collapse-all']):before {
			content: '\\eac5';
		}
		:host([icon='color-mode']):before {
			content: '\\eac6';
		}
		:host([icon='comment-discussion']):before {
			content: '\\eac7';
		}
		:host([icon='credit-card']):before {
			content: '\\eac9';
		}
		:host([icon='dash']):before {
			content: '\\eacc';
		}
		:host([icon='dashboard']):before {
			content: '\\eacd';
		}
		:host([icon='database']):before {
			content: '\\eace';
		}
		:host([icon='debug-continue']):before {
			content: '\\eacf';
		}
		:host([icon='debug-disconnect']):before {
			content: '\\ead0';
		}
		:host([icon='debug-pause']):before {
			content: '\\ead1';
		}
		:host([icon='debug-restart']):before {
			content: '\\ead2';
		}
		:host([icon='debug-start']):before {
			content: '\\ead3';
		}
		:host([icon='debug-step-into']):before {
			content: '\\ead4';
		}
		:host([icon='debug-step-out']):before {
			content: '\\ead5';
		}
		:host([icon='debug-step-over']):before {
			content: '\\ead6';
		}
		:host([icon='debug-stop']):before {
			content: '\\ead7';
		}
		:host([icon='debug']):before {
			content: '\\ead8';
		}
		:host([icon='device-camera-video']):before {
			content: '\\ead9';
		}
		:host([icon='device-camera']):before {
			content: '\\eada';
		}
		:host([icon='device-mobile']):before {
			content: '\\eadb';
		}
		:host([icon='diff-added']):before {
			content: '\\eadc';
		}
		:host([icon='diff-ignored']):before {
			content: '\\eadd';
		}
		:host([icon='diff-modified']):before {
			content: '\\eade';
		}
		:host([icon='diff-removed']):before {
			content: '\\eadf';
		}
		:host([icon='diff-renamed']):before {
			content: '\\eae0';
		}
		:host([icon='diff']):before {
			content: '\\eae1';
		}
		:host([icon='discard']):before {
			content: '\\eae2';
		}
		:host([icon='editor-layout']):before {
			content: '\\eae3';
		}
		:host([icon='empty-window']):before {
			content: '\\eae4';
		}
		:host([icon='exclude']):before {
			content: '\\eae5';
		}
		:host([icon='extensions']):before {
			content: '\\eae6';
		}
		:host([icon='eye-closed']):before {
			content: '\\eae7';
		}
		:host([icon='file-binary']):before {
			content: '\\eae8';
		}
		:host([icon='file-code']):before {
			content: '\\eae9';
		}
		:host([icon='file-media']):before {
			content: '\\eaea';
		}
		:host([icon='file-pdf']):before {
			content: '\\eaeb';
		}
		:host([icon='file-submodule']):before {
			content: '\\eaec';
		}
		:host([icon='file-symlink-directory']):before {
			content: '\\eaed';
		}
		:host([icon='file-symlink-file']):before {
			content: '\\eaee';
		}
		:host([icon='file-zip']):before {
			content: '\\eaef';
		}
		:host([icon='files']):before {
			content: '\\eaf0';
		}
		:host([icon='filter']):before {
			content: '\\eaf1';
		}
		:host([icon='flame']):before {
			content: '\\eaf2';
		}
		:host([icon='fold-down']):before {
			content: '\\eaf3';
		}
		:host([icon='fold-up']):before {
			content: '\\eaf4';
		}
		:host([icon='fold']):before {
			content: '\\eaf5';
		}
		:host([icon='folder-active']):before {
			content: '\\eaf6';
		}
		:host([icon='folder-opened']):before {
			content: '\\eaf7';
		}
		:host([icon='gear']):before {
			content: '\\eaf8';
		}
		:host([icon='gift']):before {
			content: '\\eaf9';
		}
		:host([icon='gist-secret']):before {
			content: '\\eafa';
		}
		:host([icon='gist']):before {
			content: '\\eafb';
		}
		:host([icon='git-commit']):before {
			content: '\\eafc';
		}
		:host([icon='git-compare']):before {
			content: '\\eafd';
		}
		:host([icon='compare-changes']):before {
			content: '\\eafd';
		}
		:host([icon='git-merge']):before {
			content: '\\eafe';
		}
		:host([icon='github-action']):before {
			content: '\\eaff';
		}
		:host([icon='github-alt']):before {
			content: '\\eb00';
		}
		:host([icon='globe']):before {
			content: '\\eb01';
		}
		:host([icon='grabber']):before {
			content: '\\eb02';
		}
		:host([icon='graph']):before {
			content: '\\eb03';
		}
		:host([icon='gripper']):before {
			content: '\\eb04';
		}
		:host([icon='heart']):before {
			content: '\\eb05';
		}
		:host([icon='home']):before {
			content: '\\eb06';
		}
		:host([icon='horizontal-rule']):before {
			content: '\\eb07';
		}
		:host([icon='hubot']):before {
			content: '\\eb08';
		}
		:host([icon='inbox']):before {
			content: '\\eb09';
		}
		:host([icon='issue-reopened']):before {
			content: '\\eb0b';
		}
		:host([icon='issues']):before {
			content: '\\eb0c';
		}
		:host([icon='italic']):before {
			content: '\\eb0d';
		}
		:host([icon='jersey']):before {
			content: '\\eb0e';
		}
		:host([icon='json']):before {
			content: '\\eb0f';
		}
		:host([icon='kebab-vertical']):before {
			content: '\\eb10';
		}
		:host([icon='key']):before {
			content: '\\eb11';
		}
		:host([icon='law']):before {
			content: '\\eb12';
		}
		:host([icon='lightbulb-autofix']):before {
			content: '\\eb13';
		}
		:host([icon='link-external']):before {
			content: '\\eb14';
		}
		:host([icon='link']):before {
			content: '\\eb15';
		}
		:host([icon='list-ordered']):before {
			content: '\\eb16';
		}
		:host([icon='list-unordered']):before {
			content: '\\eb17';
		}
		:host([icon='live-share']):before {
			content: '\\eb18';
		}
		:host([icon='loading']):before {
			content: '\\eb19';
		}
		:host([icon='location']):before {
			content: '\\eb1a';
		}
		:host([icon='mail-read']):before {
			content: '\\eb1b';
		}
		:host([icon='mail']):before {
			content: '\\eb1c';
		}
		:host([icon='markdown']):before {
			content: '\\eb1d';
		}
		:host([icon='megaphone']):before {
			content: '\\eb1e';
		}
		:host([icon='mention']):before {
			content: '\\eb1f';
		}
		:host([icon='milestone']):before {
			content: '\\eb20';
		}
		:host([icon='mortar-board']):before {
			content: '\\eb21';
		}
		:host([icon='move']):before {
			content: '\\eb22';
		}
		:host([icon='multiple-windows']):before {
			content: '\\eb23';
		}
		:host([icon='mute']):before {
			content: '\\eb24';
		}
		:host([icon='no-newline']):before {
			content: '\\eb25';
		}
		:host([icon='note']):before {
			content: '\\eb26';
		}
		:host([icon='octoface']):before {
			content: '\\eb27';
		}
		:host([icon='open-preview']):before {
			content: '\\eb28';
		}
		:host([icon='package']):before {
			content: '\\eb29';
		}
		:host([icon='paintcan']):before {
			content: '\\eb2a';
		}
		:host([icon='pin']):before {
			content: '\\eb2b';
		}
		:host([icon='play']):before {
			content: '\\eb2c';
		}
		:host([icon='run']):before {
			content: '\\eb2c';
		}
		:host([icon='plug']):before {
			content: '\\eb2d';
		}
		:host([icon='preserve-case']):before {
			content: '\\eb2e';
		}
		:host([icon='preview']):before {
			content: '\\eb2f';
		}
		:host([icon='project']):before {
			content: '\\eb30';
		}
		:host([icon='pulse']):before {
			content: '\\eb31';
		}
		:host([icon='question']):before {
			content: '\\eb32';
		}
		:host([icon='quote']):before {
			content: '\\eb33';
		}
		:host([icon='radio-tower']):before {
			content: '\\eb34';
		}
		:host([icon='reactions']):before {
			content: '\\eb35';
		}
		:host([icon='references']):before {
			content: '\\eb36';
		}
		:host([icon='refresh']):before {
			content: '\\eb37';
		}
		:host([icon='regex']):before {
			content: '\\eb38';
		}
		:host([icon='remote-explorer']):before {
			content: '\\eb39';
		}
		:host([icon='remote']):before {
			content: '\\eb3a';
		}
		:host([icon='remove']):before {
			content: '\\eb3b';
		}
		:host([icon='replace-all']):before {
			content: '\\eb3c';
		}
		:host([icon='replace']):before {
			content: '\\eb3d';
		}
		:host([icon='repo-clone']):before {
			content: '\\eb3e';
		}
		:host([icon='repo-force-push']):before {
			content: '\\eb3f';
		}
		:host([icon='repo-pull']):before {
			content: '\\eb40';
		}
		:host([icon='repo-push']):before {
			content: '\\eb41';
		}
		:host([icon='report']):before {
			content: '\\eb42';
		}
		:host([icon='request-changes']):before {
			content: '\\eb43';
		}
		:host([icon='rocket']):before {
			content: '\\eb44';
		}
		:host([icon='root-folder-opened']):before {
			content: '\\eb45';
		}
		:host([icon='root-folder']):before {
			content: '\\eb46';
		}
		:host([icon='rss']):before {
			content: '\\eb47';
		}
		:host([icon='ruby']):before {
			content: '\\eb48';
		}
		:host([icon='save-all']):before {
			content: '\\eb49';
		}
		:host([icon='save-as']):before {
			content: '\\eb4a';
		}
		:host([icon='save']):before {
			content: '\\eb4b';
		}
		:host([icon='screen-full']):before {
			content: '\\eb4c';
		}
		:host([icon='screen-normal']):before {
			content: '\\eb4d';
		}
		:host([icon='search-stop']):before {
			content: '\\eb4e';
		}
		:host([icon='server']):before {
			content: '\\eb50';
		}
		:host([icon='settings-gear']):before {
			content: '\\eb51';
		}
		:host([icon='settings']):before {
			content: '\\eb52';
		}
		:host([icon='shield']):before {
			content: '\\eb53';
		}
		:host([icon='smiley']):before {
			content: '\\eb54';
		}
		:host([icon='sort-precedence']):before {
			content: '\\eb55';
		}
		:host([icon='split-horizontal']):before {
			content: '\\eb56';
		}
		:host([icon='split-vertical']):before {
			content: '\\eb57';
		}
		:host([icon='squirrel']):before {
			content: '\\eb58';
		}
		:host([icon='star-full']):before {
			content: '\\eb59';
		}
		:host([icon='star-half']):before {
			content: '\\eb5a';
		}
		:host([icon='symbol-class']):before {
			content: '\\eb5b';
		}
		:host([icon='symbol-color']):before {
			content: '\\eb5c';
		}
		:host([icon='symbol-constant']):before {
			content: '\\eb5d';
		}
		:host([icon='symbol-enum-member']):before {
			content: '\\eb5e';
		}
		:host([icon='symbol-field']):before {
			content: '\\eb5f';
		}
		:host([icon='symbol-file']):before {
			content: '\\eb60';
		}
		:host([icon='symbol-interface']):before {
			content: '\\eb61';
		}
		:host([icon='symbol-keyword']):before {
			content: '\\eb62';
		}
		:host([icon='symbol-misc']):before {
			content: '\\eb63';
		}
		:host([icon='symbol-operator']):before {
			content: '\\eb64';
		}
		:host([icon='symbol-property']):before {
			content: '\\eb65';
		}
		:host([icon='wrench']):before {
			content: '\\eb65';
		}
		:host([icon='wrench-subaction']):before {
			content: '\\eb65';
		}
		:host([icon='symbol-snippet']):before {
			content: '\\eb66';
		}
		:host([icon='tasklist']):before {
			content: '\\eb67';
		}
		:host([icon='telescope']):before {
			content: '\\eb68';
		}
		:host([icon='text-size']):before {
			content: '\\eb69';
		}
		:host([icon='three-bars']):before {
			content: '\\eb6a';
		}
		:host([icon='thumbsdown']):before {
			content: '\\eb6b';
		}
		:host([icon='thumbsup']):before {
			content: '\\eb6c';
		}
		:host([icon='tools']):before {
			content: '\\eb6d';
		}
		:host([icon='triangle-down']):before {
			content: '\\eb6e';
		}
		:host([icon='triangle-left']):before {
			content: '\\eb6f';
		}
		:host([icon='triangle-right']):before {
			content: '\\eb70';
		}
		:host([icon='triangle-up']):before {
			content: '\\eb71';
		}
		:host([icon='twitter']):before {
			content: '\\eb72';
		}
		:host([icon='unfold']):before {
			content: '\\eb73';
		}
		:host([icon='unlock']):before {
			content: '\\eb74';
		}
		:host([icon='unmute']):before {
			content: '\\eb75';
		}
		:host([icon='unverified']):before {
			content: '\\eb76';
		}
		:host([icon='verified']):before {
			content: '\\eb77';
		}
		:host([icon='versions']):before {
			content: '\\eb78';
		}
		:host([icon='vm-active']):before {
			content: '\\eb79';
		}
		:host([icon='vm-outline']):before {
			content: '\\eb7a';
		}
		:host([icon='vm-running']):before {
			content: '\\eb7b';
		}
		:host([icon='watch']):before {
			content: '\\eb7c';
		}
		:host([icon='whitespace']):before {
			content: '\\eb7d';
		}
		:host([icon='whole-word']):before {
			content: '\\eb7e';
		}
		:host([icon='window']):before {
			content: '\\eb7f';
		}
		:host([icon='word-wrap']):before {
			content: '\\eb80';
		}
		:host([icon='zoom-in']):before {
			content: '\\eb81';
		}
		:host([icon='zoom-out']):before {
			content: '\\eb82';
		}
		:host([icon='list-filter']):before {
			content: '\\eb83';
		}
		:host([icon='list-flat']):before {
			content: '\\eb84';
		}
		:host([icon='list-selection']):before {
			content: '\\eb85';
		}
		:host([icon='selection']):before {
			content: '\\eb85';
		}
		:host([icon='list-tree']):before {
			content: '\\eb86';
		}
		:host([icon='debug-breakpoint-function-unverified']):before {
			content: '\\eb87';
		}
		:host([icon='debug-breakpoint-function']):before {
			content: '\\eb88';
		}
		:host([icon='debug-breakpoint-function-disabled']):before {
			content: '\\eb88';
		}
		:host([icon='debug-stackframe-active']):before {
			content: '\\eb89';
		}
		:host([icon='debug-stackframe-dot']):before {
			content: '\\eb8a';
		}
		:host([icon='debug-stackframe']):before {
			content: '\\eb8b';
		}
		:host([icon='debug-stackframe-focused']):before {
			content: '\\eb8b';
		}
		:host([icon='debug-breakpoint-unsupported']):before {
			content: '\\eb8c';
		}
		:host([icon='symbol-string']):before {
			content: '\\eb8d';
		}
		:host([icon='debug-reverse-continue']):before {
			content: '\\eb8e';
		}
		:host([icon='debug-step-back']):before {
			content: '\\eb8f';
		}
		:host([icon='debug-restart-frame']):before {
			content: '\\eb90';
		}
		:host([icon='debug-alt']):before {
			content: '\\eb91';
		}
		:host([icon='call-incoming']):before {
			content: '\\eb92';
		}
		:host([icon='call-outgoing']):before {
			content: '\\eb93';
		}
		:host([icon='menu']):before {
			content: '\\eb94';
		}
		:host([icon='expand-all']):before {
			content: '\\eb95';
		}
		:host([icon='feedback']):before {
			content: '\\eb96';
		}
		:host([icon='group-by-ref-type']):before {
			content: '\\eb97';
		}
		:host([icon='ungroup-by-ref-type']):before {
			content: '\\eb98';
		}
		:host([icon='account']):before {
			content: '\\eb99';
		}
		:host([icon='bell-dot']):before {
			content: '\\eb9a';
		}
		:host([icon='debug-console']):before {
			content: '\\eb9b';
		}
		:host([icon='library']):before {
			content: '\\eb9c';
		}
		:host([icon='output']):before {
			content: '\\eb9d';
		}
		:host([icon='run-all']):before {
			content: '\\eb9e';
		}
		:host([icon='sync-ignored']):before {
			content: '\\eb9f';
		}
		:host([icon='pinned']):before {
			content: '\\eba0';
		}
		:host([icon='github-inverted']):before {
			content: '\\eba1';
		}
		:host([icon='server-process']):before {
			content: '\\eba2';
		}
		:host([icon='server-environment']):before {
			content: '\\eba3';
		}
		:host([icon='pass']):before {
			content: '\\eba4';
		}
		:host([icon='issue-closed']):before {
			content: '\\eba4';
		}
		:host([icon='stop-circle']):before {
			content: '\\eba5';
		}
		:host([icon='play-circle']):before {
			content: '\\eba6';
		}
		:host([icon='record']):before {
			content: '\\eba7';
		}
		:host([icon='debug-alt-small']):before {
			content: '\\eba8';
		}
		:host([icon='vm-connect']):before {
			content: '\\eba9';
		}
		:host([icon='cloud']):before {
			content: '\\ebaa';
		}
		:host([icon='merge']):before {
			content: '\\ebab';
		}
		:host([icon='export']):before {
			content: '\\ebac';
		}
		:host([icon='graph-left']):before {
			content: '\\ebad';
		}
		:host([icon='magnet']):before {
			content: '\\ebae';
		}
		:host([icon='notebook']):before {
			content: '\\ebaf';
		}
		:host([icon='redo']):before {
			content: '\\ebb0';
		}
		:host([icon='check-all']):before {
			content: '\\ebb1';
		}
		:host([icon='pinned-dirty']):before {
			content: '\\ebb2';
		}
		:host([icon='pass-filled']):before {
			content: '\\ebb3';
		}
		:host([icon='circle-large-filled']):before {
			content: '\\ebb4';
		}
		:host([icon='circle-large-outline']):before {
			content: '\\ebb5';
		}
		:host([icon='combine']):before {
			content: '\\ebb6';
		}
		:host([icon='gather']):before {
			content: '\\ebb6';
		}
		:host([icon='table']):before {
			content: '\\ebb7';
		}
		:host([icon='variable-group']):before {
			content: '\\ebb8';
		}
		:host([icon='type-hierarchy']):before {
			content: '\\ebb9';
		}
		:host([icon='type-hierarchy-sub']):before {
			content: '\\ebba';
		}
		:host([icon='type-hierarchy-super']):before {
			content: '\\ebbb';
		}
		:host([icon='git-pull-request-create']):before {
			content: '\\ebbc';
		}
		:host([icon='run-above']):before {
			content: '\\ebbd';
		}
		:host([icon='run-below']):before {
			content: '\\ebbe';
		}
		:host([icon='notebook-template']):before {
			content: '\\ebbf';
		}
		:host([icon='debug-rerun']):before {
			content: '\\ebc0';
		}
		:host([icon='workspace-trusted']):before {
			content: '\\ebc1';
		}
		:host([icon='workspace-untrusted']):before {
			content: '\\ebc2';
		}
		:host([icon='workspace-unknown']):before {
			content: '\\ebc3';
		}
		:host([icon='terminal-cmd']):before {
			content: '\\ebc4';
		}
		:host([icon='terminal-debian']):before {
			content: '\\ebc5';
		}
		:host([icon='terminal-linux']):before {
			content: '\\ebc6';
		}
		:host([icon='terminal-powershell']):before {
			content: '\\ebc7';
		}
		:host([icon='terminal-tmux']):before {
			content: '\\ebc8';
		}
		:host([icon='terminal-ubuntu']):before {
			content: '\\ebc9';
		}
		:host([icon='terminal-bash']):before {
			content: '\\ebca';
		}
		:host([icon='arrow-swap']):before {
			content: '\\ebcb';
		}
		:host([icon='copy']):before {
			content: '\\ebcc';
		}
		:host([icon='person-add']):before {
			content: '\\ebcd';
		}
		:host([icon='filter-filled']):before {
			content: '\\ebce';
		}
		:host([icon='wand']):before {
			content: '\\ebcf';
		}
		:host([icon='debug-line-by-line']):before {
			content: '\\ebd0';
		}
		:host([icon='inspect']):before {
			content: '\\ebd1';
		}
		:host([icon='layers']):before {
			content: '\\ebd2';
		}
		:host([icon='layers-dot']):before {
			content: '\\ebd3';
		}
		:host([icon='layers-active']):before {
			content: '\\ebd4';
		}
		:host([icon='compass']):before {
			content: '\\ebd5';
		}
		:host([icon='compass-dot']):before {
			content: '\\ebd6';
		}
		:host([icon='compass-active']):before {
			content: '\\ebd7';
		}
		:host([icon='azure']):before {
			content: '\\ebd8';
		}
		:host([icon='issue-draft']):before {
			content: '\\ebd9';
		}
		:host([icon='git-pull-request-closed']):before {
			content: '\\ebda';
		}
		:host([icon='git-pull-request-draft']):before {
			content: '\\ebdb';
		}
		:host([icon='debug-all']):before {
			content: '\\ebdc';
		}
		:host([icon='debug-coverage']):before {
			content: '\\ebdd';
		}
		:host([icon='run-errors']):before {
			content: '\\ebde';
		}
		:host([icon='folder-library']):before {
			content: '\\ebdf';
		}
		:host([icon='debug-continue-small']):before {
			content: '\\ebe0';
		}
		:host([icon='beaker-stop']):before {
			content: '\\ebe1';
		}
		:host([icon='graph-line']):before {
			content: '\\ebe2';
		}
		:host([icon='graph-scatter']):before {
			content: '\\ebe3';
		}
		:host([icon='pie-chart']):before {
			content: '\\ebe4';
		}
		:host([icon='bracket']):before {
			content: '\\eb0f';
		}
		:host([icon='bracket-dot']):before {
			content: '\\ebe5';
		}
		:host([icon='bracket-error']):before {
			content: '\\ebe6';
		}
		:host([icon='lock-small']):before {
			content: '\\ebe7';
		}
		:host([icon='azure-devops']):before {
			content: '\\ebe8';
		}
		:host([icon='verified-filled']):before {
			content: '\\ebe9';
		}
		:host([icon='newline']):before {
			content: '\\ebea';
		}
		:host([icon='layout']):before {
			content: '\\ebeb';
		}
		:host([icon='layout-activitybar-left']):before {
			content: '\\ebec';
		}
		:host([icon='layout-activitybar-right']):before {
			content: '\\ebed';
		}
		:host([icon='layout-panel-left']):before {
			content: '\\ebee';
		}
		:host([icon='layout-panel-center']):before {
			content: '\\ebef';
		}
		:host([icon='layout-panel-justify']):before {
			content: '\\ebf0';
		}
		:host([icon='layout-panel-right']):before {
			content: '\\ebf1';
		}
		:host([icon='layout-panel']):before {
			content: '\\ebf2';
		}
		:host([icon='layout-sidebar-left']):before {
			content: '\\ebf3';
		}
		:host([icon='layout-sidebar-right']):before {
			content: '\\ebf4';
		}
		:host([icon='layout-statusbar']):before {
			content: '\\ebf5';
		}
		:host([icon='layout-menubar']):before {
			content: '\\ebf6';
		}
		:host([icon='layout-centered']):before {
			content: '\\ebf7';
		}
		:host([icon='target']):before {
			content: '\\ebf8';
		}
		:host([icon='pinned-filled']):before {
			font-family: 'glicons';
			content: '\\f11c';
			position: relative;
			left: 1px;
		}
		:host([icon='graph']):before {
			font-family: 'glicons';
			content: '\\f102';
		}

		@keyframes codicon-spin {
			100% {
				transform: rotate(360deg);
			}
		}

		:host([modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;
		}
		:host([icon='loading'][modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;

			/* custom speed & easing for loading icon */
			animation-duration: 1s !important;
			animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67) !important;
		}
	`,jn([xi()],jt.prototype,"icon",2),jn([xi()],jt.prototype,"modifier",2),jt=jn([Qs("code-icon")],jt);function Te(n,r){const i=typeof r=="function"?r:()=>r;return(s,a)=>n(s,a)?i(s,a):null}const it={toView:function(n){return n.toString()},fromView:function(n){return parseInt(n,10)}};var Ks=Object.defineProperty,ea=Object.getOwnPropertyDescriptor,Ht=(n,r,i,s)=>{for(var a=s>1?void 0:s?ea(r,i):r,c=n.length-1,f;c>=0;c--)(f=n[c])&&(a=(s?f(r,i,a):f(a))||a);return s&&a&&Ks(r,i,a),a};const ta=me`<template role="region">
	${Te(n=>n.noHeading===!1,me`<header>
			<div class="heading" role="heading" aria-level="${n=>n.headingLevel}">
				<slot name="heading"></slot>
				<small class="description"><slot name="description"></slot></small>
			</div>
			${Te(n=>n.dismissable,me`<button
					class="dismiss"
					type="button"
					@click="${(n,r)=>n.handleDismiss(r.event)}"
					title="dismiss"
					aria-label="dismiss"
				>
					<code-icon icon="close"></code-icon>
				</button>`)}
		</header>`)}
	<div class="content"><slot></slot></div>
</template>`,na=Ye`
	* {
		box-sizing: border-box;
	}

	:host {
		display: block;
		padding: 1.2rem;
		background-color: var(--card-background);
		margin-bottom: 1rem;
		border-radius: 0.4rem;
		background-repeat: no-repeat;
		background-size: cover;
		transition: aspect-ratio linear 100ms, background-color linear 100ms;
	}

	:host(:hover) {
		background-color: var(--card-hover-background);
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 0.4rem;
		margin-bottom: 1rem;
	}

	.dismiss {
		width: 2rem;
		height: 2rem;
		padding: 0;
		font-size: var(--vscode-editor-font-size);
		line-height: 2rem;
		font-family: inherit;
		border: none;
		color: inherit;
		background: none;
		text-align: left;
		cursor: pointer;
		opacity: 0.5;
		flex: none;
		text-align: center;
	}

	.dismiss:focus {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: 0.2rem;
	}

	.heading {
		text-transform: uppercase;
	}

	.description {
		margin-left: 0.2rem;
		text-transform: none;
		/* color needs to come from some sort property */
		color: #b68cd8;
	}
`;let Pt=class extends he{constructor(){super(...arguments),this.noHeading=!1,this.headingLevel=2,this.dismissable=!1,this.expanded=!0}handleDismiss(n){this.$emit("dismiss")}};Ht([W({attribute:"no-heading",mode:"boolean"})],Pt.prototype,"noHeading",2),Ht([W({attribute:"heading-level",converter:it})],Pt.prototype,"headingLevel",2),Ht([W({mode:"boolean"})],Pt.prototype,"dismissable",2),Ht([W({mode:"boolean"})],Pt.prototype,"expanded",2),Pt=Ht([we({name:"card-section",template:ta,styles:na})],Pt);var ra=Object.defineProperty,ia=Object.getOwnPropertyDescriptor,Hn=(n,r,i,s)=>{for(var a=s>1?void 0:s?ia(r,i):r,c=n.length-1,f;c>=0;c--)(f=n[c])&&(a=(s?f(r,i,a):f(a))||a);return s&&a&&ra(r,i,a),a};const oa=me`<template role="region">
	<header class="heading" role="heading" aria-level="${n=>n.headingLevel}">
		<button
			id="button"
			class="button"
			type="button"
			aria-expanded="${n=>!n.completed}"
			aria-controls="content"
			@click="${(n,r)=>n.handleClick(r.event)}"
		>
			<slot name="heading"></slot>
			<small class="description"><slot name="description"></slot></small>
		</button>
	</header>
	<div class="content${n=>n.completed?" is-hidden":""}" id="content" aria-labelledby="button">
		<slot></slot>
	</div>
	<span class="checkline">
		<span
			class="checkbox"
			title="${n=>n.completed?"Uncheck step":"Check step"}"
			@click="${(n,r)=>n.handleClick(r.event)}"
			><code-icon
				class="check-icon"
				icon="${n=>n.completed?"pass-filled":"circle-large-outline"}"
			></code-icon
			><code-icon class="check-hover-icon" icon="${n=>n.completed?"pass-filled":"pass"}"></code-icon
		></span>
	</span>
</template>`,sa=Ye`
	* {
		box-sizing: border-box;
	}

	:host {
		display: grid;
		gap: 0 0.8rem;
		grid-template-columns: 16px auto;
		grid-auto-flow: column;
		margin-bottom: 2.4rem;
	}

	.button {
		width: 100%;
		padding: 0.1rem 0 0 0;
		font-size: var(--vscode-editor-font-size);
		line-height: 1.6rem;
		font-family: inherit;
		border: none;
		color: inherit;
		background: none;
		text-align: left;
		text-transform: uppercase;
		cursor: pointer;
	}

	.button:focus {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: 0.2rem;
	}

	.checkline {
		position: relative;
		grid-column: 1;
		grid-row: 1 / span 2;
		color: var(--vscode-textLink-foreground);
	}

	:host(:not(:last-of-type)) .checkline:after {
		content: '';
		position: absolute;
		border-left: 0.1rem solid currentColor;
		width: 0;
		top: 1.6rem;
		bottom: -2.4rem;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.3;
	}

	.checkbox {
		cursor: pointer;
	}
	.checkbox code-icon {
		pointer-events: none;
	}

	.heading:hover ~ .checkline .check-icon,
	.checkbox:hover .check-icon {
		display: none;
	}

	.check-hover-icon {
		display: none;
	}
	.heading:hover ~ .checkline .check-hover-icon,
	.checkbox:hover .check-hover-icon {
		display: unset;
	}

	.content {
		margin-top: 1rem;
	}

	.content.is-hidden {
		display: none;
	}

	.description {
		margin-left: 0.2rem;
		text-transform: none;
		color: var(--gitlens-brand-color-2);
		opacity: 0.6;
		font-style: italic;
	}
`;let un=class extends he{constructor(){super(...arguments),this.headingLevel=2,this.completed=!1}handleClick(n){this.completed=!this.completed,this.$emit("complete",this.completed)}};Hn([W({attribute:"heading-level",converter:it})],un.prototype,"headingLevel",2),Hn([W({mode:"boolean"})],un.prototype,"completed",2),un=Hn([we({name:"stepped-section",template:oa,styles:sa})],un);var pf=dn(54);const{fromCharCode:aa}=String,la=new TextEncoder;function gf(n){let r=typeof n=="string"?la.encode(n):n,i="";for(let s=0,{length:a}=r;s<a;s++)i+=aa(r[s]);return globalThis.btoa(i)}function bf(n){const r=globalThis.atob(n),i=r.length,s=new Uint8Array(i);for(let a=0;a<i;a++)s[a]=r.charCodeAt(a);return s}function yf(){return base64(globalThis.crypto.getRandomValues(new Uint8Array(16)))}function vf(n,r="base64"){return new MD5().update(n).digest(r)}function mf(){return globalThis.crypto.randomUUID()}const wf=80,_f={".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"};var ca=(n=>(n[n.Slash=47]="Slash",n[n.Backslash=92]="Backslash",n[n.A=65]="A",n[n.Z=90]="Z",n[n.a=97]="a",n[n.z=122]="z",n))(ca||{}),ua=(n=>(n.GutterBackgroundColor="gitlens.gutterBackgroundColor",n.GutterForegroundColor="gitlens.gutterForegroundColor",n.GutterUncommittedForegroundColor="gitlens.gutterUncommittedForegroundColor",n.TrailingLineBackgroundColor="gitlens.trailingLineBackgroundColor",n.TrailingLineForegroundColor="gitlens.trailingLineForegroundColor",n.LineHighlightBackgroundColor="gitlens.lineHighlightBackgroundColor",n.LineHighlightOverviewRulerColor="gitlens.lineHighlightOverviewRulerColor",n.ClosedAutolinkedIssueIconColor="gitlens.closedAutolinkedIssueIconColor",n.ClosedPullRequestIconColor="gitlens.closedPullRequestIconColor",n.OpenAutolinkedIssueIconColor="gitlens.openAutolinkedIssueIconColor",n.OpenPullRequestIconColor="gitlens.openPullRequestIconColor",n.MergedPullRequestIconColor="gitlens.mergedPullRequestIconColor",n.UnpublishedChangesIconColor="gitlens.unpublishedChangesIconColor",n.UnpublishedCommitIconColor="gitlens.unpublishedCommitIconColor",n.UnpulledChangesIconColor="gitlens.unpulledChangesIconColor",n))(ua||{}),fa=(n=>(n.ActionPrefix="gitlens.action.",n.AddAuthors="gitlens.addAuthors",n.BrowseRepoAtRevision="gitlens.browseRepoAtRevision",n.BrowseRepoAtRevisionInNewWindow="gitlens.browseRepoAtRevisionInNewWindow",n.BrowseRepoBeforeRevision="gitlens.browseRepoBeforeRevision",n.BrowseRepoBeforeRevisionInNewWindow="gitlens.browseRepoBeforeRevisionInNewWindow",n.ClearFileAnnotations="gitlens.clearFileAnnotations",n.CloseUnchangedFiles="gitlens.closeUnchangedFiles",n.CloseWelcomeView="gitlens.closeWelcomeView",n.CompareWith="gitlens.compareWith",n.CompareHeadWith="gitlens.compareHeadWith",n.CompareWorkingWith="gitlens.compareWorkingWith",n.ComputingFileAnnotations="gitlens.computingFileAnnotations",n.ConnectRemoteProvider="gitlens.connectRemoteProvider",n.CopyAutolinkUrl="gitlens.copyAutolinkUrl",n.CopyCurrentBranch="gitlens.copyCurrentBranch",n.CopyMessageToClipboard="gitlens.copyMessageToClipboard",n.CopyRemoteBranchesUrl="gitlens.copyRemoteBranchesUrl",n.CopyRemoteBranchUrl="gitlens.copyRemoteBranchUrl",n.CopyRemoteCommitUrl="gitlens.copyRemoteCommitUrl",n.CopyRemoteComparisonUrl="gitlens.copyRemoteComparisonUrl",n.CopyRemoteFileUrl="gitlens.copyRemoteFileUrlToClipboard",n.CopyRemoteFileUrlWithoutRange="gitlens.copyRemoteFileUrlWithoutRange",n.CopyRemoteFileUrlFrom="gitlens.copyRemoteFileUrlFrom",n.CopyRemoteIssueUrl="gitlens.copyRemoteIssueUrl",n.CopyRemotePullRequestUrl="gitlens.copyRemotePullRequestUrl",n.CopyRemoteRepositoryUrl="gitlens.copyRemoteRepositoryUrl",n.CopyShaToClipboard="gitlens.copyShaToClipboard",n.CreatePullRequestOnRemote="gitlens.createPullRequestOnRemote",n.DiffDirectory="gitlens.diffDirectory",n.DiffDirectoryWithHead="gitlens.diffDirectoryWithHead",n.DiffWith="gitlens.diffWith",n.DiffWithNext="gitlens.diffWithNext",n.DiffWithNextInDiffLeft="gitlens.diffWithNextInDiffLeft",n.DiffWithNextInDiffRight="gitlens.diffWithNextInDiffRight",n.DiffWithPrevious="gitlens.diffWithPrevious",n.DiffWithPreviousInDiffLeft="gitlens.diffWithPreviousInDiffLeft",n.DiffWithPreviousInDiffRight="gitlens.diffWithPreviousInDiffRight",n.DiffLineWithPrevious="gitlens.diffLineWithPrevious",n.DiffWithRevision="gitlens.diffWithRevision",n.DiffWithRevisionFrom="gitlens.diffWithRevisionFrom",n.DiffWithWorking="gitlens.diffWithWorking",n.DiffWithWorkingInDiffLeft="gitlens.diffWithWorkingInDiffLeft",n.DiffWithWorkingInDiffRight="gitlens.diffWithWorkingInDiffRight",n.DiffLineWithWorking="gitlens.diffLineWithWorking",n.DisconnectRemoteProvider="gitlens.disconnectRemoteProvider",n.DisableDebugLogging="gitlens.disableDebugLogging",n.EnableDebugLogging="gitlens.enableDebugLogging",n.DisableRebaseEditor="gitlens.disableRebaseEditor",n.EnableRebaseEditor="gitlens.enableRebaseEditor",n.ExternalDiff="gitlens.externalDiff",n.ExternalDiffAll="gitlens.externalDiffAll",n.FetchRepositories="gitlens.fetchRepositories",n.GetStarted="gitlens.getStarted",n.InviteToLiveShare="gitlens.inviteToLiveShare",n.OpenAutolinkUrl="gitlens.openAutolinkUrl",n.OpenBlamePriorToChange="gitlens.openBlamePriorToChange",n.OpenBranchesOnRemote="gitlens.openBranchesOnRemote",n.OpenBranchOnRemote="gitlens.openBranchOnRemote",n.OpenCurrentBranchOnRemote="gitlens.openCurrentBranchOnRemote",n.OpenChangedFiles="gitlens.openChangedFiles",n.OpenCommitOnRemote="gitlens.openCommitOnRemote",n.OpenComparisonOnRemote="gitlens.openComparisonOnRemote",n.OpenFileHistory="gitlens.openFileHistory",n.OpenFileFromRemote="gitlens.openFileFromRemote",n.OpenFileOnRemote="gitlens.openFileOnRemote",n.OpenFileOnRemoteFrom="gitlens.openFileOnRemoteFrom",n.OpenFileAtRevision="gitlens.openFileRevision",n.OpenFileAtRevisionFrom="gitlens.openFileRevisionFrom",n.OpenFolderHistory="gitlens.openFolderHistory",n.OpenOnRemote="gitlens.openOnRemote",n.OpenIssueOnRemote="gitlens.openIssueOnRemote",n.OpenPullRequestOnRemote="gitlens.openPullRequestOnRemote",n.OpenAssociatedPullRequestOnRemote="gitlens.openAssociatedPullRequestOnRemote",n.OpenRepoOnRemote="gitlens.openRepoOnRemote",n.OpenRevisionFile="gitlens.openRevisionFile",n.OpenRevisionFileInDiffLeft="gitlens.openRevisionFileInDiffLeft",n.OpenRevisionFileInDiffRight="gitlens.openRevisionFileInDiffRight",n.OpenWalkthrough="gitlens.openWalkthrough",n.OpenWorkingFile="gitlens.openWorkingFile",n.OpenWorkingFileInDiffLeft="gitlens.openWorkingFileInDiffLeft",n.OpenWorkingFileInDiffRight="gitlens.openWorkingFileInDiffRight",n.PullRepositories="gitlens.pullRepositories",n.PushRepositories="gitlens.pushRepositories",n.GitCommands="gitlens.gitCommands",n.GitCommandsBranch="gitlens.gitCommands.branch",n.GitCommandsCherryPick="gitlens.gitCommands.cherryPick",n.GitCommandsMerge="gitlens.gitCommands.merge",n.GitCommandsRebase="gitlens.gitCommands.rebase",n.GitCommandsReset="gitlens.gitCommands.reset",n.GitCommandsRevert="gitlens.gitCommands.revert",n.GitCommandsSwitch="gitlens.gitCommands.switch",n.GitCommandsTag="gitlens.gitCommands.tag",n.GitCommandsWorktree="gitlens.gitCommands.worktree",n.PlusHide="gitlens.plus.hide",n.PlusLearn="gitlens.plus.learn",n.PlusLoginOrSignUp="gitlens.plus.loginOrSignUp",n.PlusLogout="gitlens.plus.logout",n.PlusManage="gitlens.plus.manage",n.PlusPurchase="gitlens.plus.purchase",n.PlusResendVerification="gitlens.plus.resendVerification",n.PlusRestore="gitlens.plus.restore",n.PlusShowPlans="gitlens.plus.showPlans",n.PlusStartPreviewTrial="gitlens.plus.startPreviewTrial",n.PlusValidate="gitlens.plus.validate",n.QuickOpenFileHistory="gitlens.quickOpenFileHistory",n.RefreshGraph="gitlens.graph.refresh",n.RefreshHover="gitlens.refreshHover",n.RefreshTimelinePage="gitlens.refreshTimelinePage",n.ResetAvatarCache="gitlens.resetAvatarCache",n.ResetSuppressedWarnings="gitlens.resetSuppressedWarnings",n.ResetTrackedUsage="gitlens.resetTrackedUsage",n.RevealCommitInView="gitlens.revealCommitInView",n.SearchCommits="gitlens.showCommitSearch",n.SearchCommitsInView="gitlens.views.searchAndCompare.searchCommits",n.SetViewsLayout="gitlens.setViewsLayout",n.ShowBranchesView="gitlens.showBranchesView",n.ShowCommitInView="gitlens.showCommitInView",n.ShowCommitsInView="gitlens.showCommitsInView",n.ShowCommitsView="gitlens.showCommitsView",n.ShowContributorsView="gitlens.showContributorsView",n.ShowHomeView="gitlens.showHomeView",n.ShowFileHistoryView="gitlens.showFileHistoryView",n.ShowInCommitGraph="gitlens.showInCommitGraph",n.ShowInDetailsView="gitlens.showInDetailsView",n.ShowLastQuickPick="gitlens.showLastQuickPick",n.ShowLineHistoryView="gitlens.showLineHistoryView",n.ShowQuickBranchHistory="gitlens.showQuickBranchHistory",n.ShowQuickCommit="gitlens.showQuickCommitDetails",n.ShowQuickCommitFile="gitlens.showQuickCommitFileDetails",n.ShowQuickCurrentBranchHistory="gitlens.showQuickRepoHistory",n.ShowQuickFileHistory="gitlens.showQuickFileHistory",n.ShowQuickRepoStatus="gitlens.showQuickRepoStatus",n.ShowQuickCommitRevision="gitlens.showQuickRevisionDetails",n.ShowQuickCommitRevisionInDiffLeft="gitlens.showQuickRevisionDetailsInDiffLeft",n.ShowQuickCommitRevisionInDiffRight="gitlens.showQuickRevisionDetailsInDiffRight",n.ShowQuickStashList="gitlens.showQuickStashList",n.ShowRemotesView="gitlens.showRemotesView",n.ShowRepositoriesView="gitlens.showRepositoriesView",n.ShowSearchAndCompareView="gitlens.showSearchAndCompareView",n.ShowSettingsPage="gitlens.showSettingsPage",n.ShowSettingsPageAndJumpToBranchesView="gitlens.showSettingsPage#branches-view",n.ShowSettingsPageAndJumpToCommitsView="gitlens.showSettingsPage#commits-view",n.ShowSettingsPageAndJumpToContributorsView="gitlens.showSettingsPage#contributors-view",n.ShowSettingsPageAndJumpToFileHistoryView="gitlens.showSettingsPage#file-history-view",n.ShowSettingsPageAndJumpToLineHistoryView="gitlens.showSettingsPage#line-history-view",n.ShowSettingsPageAndJumpToRemotesView="gitlens.showSettingsPage#remotes-view",n.ShowSettingsPageAndJumpToRepositoriesView="gitlens.showSettingsPage#repositories-view",n.ShowSettingsPageAndJumpToSearchAndCompareView="gitlens.showSettingsPage#search-compare-view",n.ShowSettingsPageAndJumpToStashesView="gitlens.showSettingsPage#stashes-view",n.ShowSettingsPageAndJumpToTagsView="gitlens.showSettingsPage#tags-view",n.ShowSettingsPageAndJumpToWorkTreesView="gitlens.showSettingsPage#worktrees-view",n.ShowSettingsPageAndJumpToViews="gitlens.showSettingsPage#views",n.ShowSettingsPageAndJumpToCommitGraph="gitlens.showSettingsPage#commit-graph",n.ShowSettingsPageAndJumpToAutolinks="gitlens.showSettingsPage#autolinks",n.ShowStashesView="gitlens.showStashesView",n.ShowTagsView="gitlens.showTagsView",n.ShowWorktreesView="gitlens.showWorktreesView",n.ShowCommitDetailsView="gitlens.showCommitDetailsView",n.ShowTimelinePage="gitlens.showTimelinePage",n.ShowTimelineView="gitlens.showTimelineView",n.ShowGraphPage="gitlens.showGraphPage",n.ShowWelcomePage="gitlens.showWelcomePage",n.StashApply="gitlens.stashApply",n.StashSave="gitlens.stashSave",n.StashSaveFiles="gitlens.stashSaveFiles",n.SwitchMode="gitlens.switchMode",n.ToggleCodeLens="gitlens.toggleCodeLens",n.ToggleFileBlame="gitlens.toggleFileBlame",n.ToggleFileBlameInDiffLeft="gitlens.toggleFileBlameInDiffLeft",n.ToggleFileBlameInDiffRight="gitlens.toggleFileBlameInDiffRight",n.ToggleFileChanges="gitlens.toggleFileChanges",n.ToggleFileChangesOnly="gitlens.toggleFileChangesOnly",n.ToggleFileHeatmap="gitlens.toggleFileHeatmap",n.ToggleFileHeatmapInDiffLeft="gitlens.toggleFileHeatmapInDiffLeft",n.ToggleFileHeatmapInDiffRight="gitlens.toggleFileHeatmapInDiffRight",n.ToggleLineBlame="gitlens.toggleLineBlame",n.ToggleReviewMode="gitlens.toggleReviewMode",n.ToggleZenMode="gitlens.toggleZenMode",n.ViewsCopy="gitlens.views.copy",n.ViewsOpenDirectoryDiff="gitlens.views.openDirectoryDiff",n.ViewsOpenDirectoryDiffWithWorking="gitlens.views.openDirectoryDiffWithWorking",n.Deprecated_DiffHeadWith="gitlens.diffHeadWith",n.Deprecated_DiffWorkingWith="gitlens.diffWorkingWith",n.Deprecated_OpenBranchesInRemote="gitlens.openBranchesInRemote",n.Deprecated_OpenBranchInRemote="gitlens.openBranchInRemote",n.Deprecated_OpenCommitInRemote="gitlens.openCommitInRemote",n.Deprecated_OpenFileInRemote="gitlens.openFileInRemote",n.Deprecated_OpenInRemote="gitlens.openInRemote",n.Deprecated_OpenRepoInRemote="gitlens.openRepoInRemote",n.Deprecated_ShowFileHistoryInView="gitlens.showFileHistoryInView",n))(fa||{}),ha=(n=>(n.ActionPrefix="gitlens:action:",n.KeyPrefix="gitlens:key:",n.ActiveFileStatus="gitlens:activeFileStatus",n.AnnotationStatus="gitlens:annotationStatus",n.Debugging="gitlens:debugging",n.DisabledToggleCodeLens="gitlens:disabledToggleCodeLens",n.Disabled="gitlens:disabled",n.Enabled="gitlens:enabled",n.GraphFocused="gitlens:graph:focused",n.HasConnectedRemotes="gitlens:hasConnectedRemotes",n.HasRemotes="gitlens:hasRemotes",n.HasRichRemotes="gitlens:hasRichRemotes",n.HasVirtualFolders="gitlens:hasVirtualFolders",n.Readonly="gitlens:readonly",n.TimelinePageFocused="gitlens:timelinePage:focused",n.Untrusted="gitlens:untrusted",n.ViewsCanCompare="gitlens:views:canCompare",n.ViewsCanCompareFile="gitlens:views:canCompare:file",n.ViewsCommitsMyCommitsOnly="gitlens:views:commits:myCommitsOnly",n.ViewsFileHistoryCanPin="gitlens:views:fileHistory:canPin",n.ViewsFileHistoryCursorFollowing="gitlens:views:fileHistory:cursorFollowing",n.ViewsFileHistoryEditorFollowing="gitlens:views:fileHistory:editorFollowing",n.ViewsLineHistoryEditorFollowing="gitlens:views:lineHistory:editorFollowing",n.ViewsRepositoriesAutoRefresh="gitlens:views:repositories:autoRefresh",n.ViewsSearchAndCompareKeepResults="gitlens:views:searchAndCompare:keepResults",n.Vsls="gitlens:vsls",n.Plus="gitlens:plus",n.PlusEnabled="gitlens:plus:enabled",n.PlusRequired="gitlens:plus:required",n.PlusState="gitlens:plus:state",n))(ha||{}),da=(n=>(n.CloseActiveEditor="workbench.action.closeActiveEditor",n.CloseAllEditors="workbench.action.closeAllEditors",n.CursorMove="cursorMove",n.CustomEditorShowFindWidget="editor.action.webvieweditor.showFind",n.Diff="vscode.diff",n.EditorScroll="editorScroll",n.EditorShowHover="editor.action.showHover",n.ExecuteDocumentSymbolProvider="vscode.executeDocumentSymbolProvider",n.ExecuteCodeLensProvider="vscode.executeCodeLensProvider",n.FocusFilesExplorer="workbench.files.action.focusFilesExplorer",n.InstallExtension="workbench.extensions.installExtension",n.MoveViews="vscode.moveViews",n.Open="vscode.open",n.OpenFolder="vscode.openFolder",n.OpenInTerminal="openInTerminal",n.OpenWalkthrough="workbench.action.openWalkthrough",n.OpenWith="vscode.openWith",n.NextEditor="workbench.action.nextEditor",n.PreviewHtml="vscode.previewHtml",n.RevealLine="revealLine",n.RevealInExplorer="revealInExplorer",n.RevealInFileExplorer="revealFileInOS",n.SetContext="setContext",n.ShowExplorer="workbench.view.explorer",n.ShowReferences="editor.action.showReferences",n.ShowSCM="workbench.view.scm",n.UninstallExtension="workbench.extensions.uninstallExtension",n))(da||{}),pa=(n=>(n.Publish="git.publish",n.Pull="git.pull",n.PullRebase="git.pullRebase",n.Push="git.push",n.PushForce="git.pushForce",n.UndoCommit="git.undoCommit",n))(pa||{}),ga=(n=>(n.AutoRepositoryDetection="git.autoRepositoryDetection",n.RepositoryScanMaxDepth="git.repositoryScanMaxDepth",n.FetchOnPull="git.fetchOnPull",n.UseForcePushWithLease="git.useForcePushWithLease",n))(ga||{}),ba=(n=>(n.AngleBracketLeftHeavy="\u2770",n.AngleBracketRightHeavy="\u2771",n.ArrowBack="\u21A9",n.ArrowDown="\u2193",n.ArrowDownUp="\u21F5",n.ArrowDropRight="\u2937",n.ArrowHeadRight="\u27A4",n.ArrowLeft="\u2190",n.ArrowLeftDouble="\u21D0",n.ArrowLeftRight="\u2194",n.ArrowLeftRightDouble="\u21D4",n.ArrowLeftRightDoubleStrike="\u21CE",n.ArrowLeftRightLong="\u27F7",n.ArrowRight="\u2192",n.ArrowRightDouble="\u21D2",n.ArrowRightHollow="\u21E8",n.ArrowUp="\u2191",n.ArrowUpDown="\u21C5",n.ArrowUpRight="\u2197",n.ArrowsHalfLeftRight="\u21CB",n.ArrowsHalfRightLeft="\u21CC",n.ArrowsLeftRight="\u21C6",n.ArrowsRightLeft="\u21C4",n.Asterisk="\u2217",n.Check="\u2714",n.Dash="\u2014",n.Dot="\u2022",n.Ellipsis="\u2026",n.EnDash="\u2013",n.Envelope="\u2709",n.EqualsTriple="\u2261",n.Flag="\u2691",n.FlagHollow="\u2690",n.MiddleEllipsis="\u22EF",n.MuchLessThan="\u226A",n.MuchGreaterThan="\u226B",n.Pencil="\u270E",n.Space="\xA0",n.SpaceThin="\u2009",n.SpaceThinnest="\u200A",n.SquareWithBottomShadow="\u274F",n.SquareWithTopShadow="\u2750",n.Warning="\u26A0",n.ZeroWidthSpace="\u200B",n))(ba||{}),ya=(n=>(n.DebugConsole="debug",n.File="file",n.Git="git",n.GitHub="github",n.GitLens="gitlens",n.Output="output",n.PRs="pr",n.Vsls="vsls",n.VslsScc="vsls-scc",n.Virtual="vscode-vfs",n))(ya||{});const va=new Intl.Collator(void 0,{sensitivity:"accent"});function ma(n,r){const i=va.compare(n,r);return i===0?0:i>0?1:-1}function xf(n,r){return n==null&&r==null?!0:n==null||r==null?!1:ma(n,r)===0}const Rf=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}).compare;function wa(n,r,i=0,s=n.length,a=0,c=r.length){for(;i<s&&a<c;i++,a++){const m=n.charCodeAt(i),w=r.charCodeAt(a);if(m<w)return-1;if(m>w)return 1}const f=s-i,d=c-a;return f<d?-1:f>d?1:0}function Ef(n,r,i=0,s=n.length,a=0,c=r.length){for(;i<s&&a<c;i++,a++){const m=n.charCodeAt(i),w=r.charCodeAt(a);if(m===w)continue;const U=m-w;if(!(U===32&&Ti(w))&&!(U===-32&&Ti(m)))return Ai(m)&&Ai(w)?U:wa(n.toLowerCase(),r.toLowerCase(),i,s,a,c)}const f=s-i,d=c-a;return f<d?-1:f>d?1:0}function kf(n){return n?.replace(/[<>&"]/g,r=>{switch(r){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case'"':return"&quot;";default:return r}})}const _a=/[\\`*_{}[\]()#+\-.!]/g,xa=/^===/gm,Sa=/\r?\n/g;function Pf(n,r={}){return n=n.replace(_a,"\\$&").replace(xa,"\u200B==="),r.quoted?n.trim().replace(Sa,`	\\
>  `):n}function Af(n){return n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}function Tf(n){const[r,i]=hrtime(n);return r*1e3+Math.floor(i/1e6)}function*$f(n,r=`
`){if(typeof n=="string"){let a=0;for(;a<n.length;){let c=n.indexOf(r,a);c===-1&&(c=n.length),yield n.substring(a,c),a=c+1}return}let i=0,s;for(let a of n){i++,s&&(a=s+a,s=void 0);let c=0;for(;c<a.length;){let f=a.indexOf(r,c);if(f===-1)if(i===n.length)f=a.length;else{s=a.substring(c);break}yield a.substring(c,f),c=f+1}}}const Ra=null;function Ff(n){return Ra[n-1]??""}const Ea=/\$\{('.*?[^\\]'|\W*)?([^|]*?)(?:\|(\d+)(-|\?)?)?('.*?[^\\]'|\W*)?\}/g,fn=/\$\{(?:'.*?[^\\]'|\W*)?(\w*?)(?:'.*?[^\\]'|[\W\d]*)\}/g,Si="'",Ri=/(\\')/g,Ei=/^'?(.*?)'?$/s;function Of(n){const r=[];let i;do{if(i=Ea.exec(n),i==null)break;let[,s,a,c,f,d]=i;s!=null&&(i=Ei.exec(s),i!=null&&([,s]=i,s=s.replace(Ri,Si))),d!=null&&(i=Ei.exec(d),i!=null&&([,d]=i,d=d.replace(Ri,Si))),r.push({key:a,options:{collapseWhitespace:f==="?",padDirection:f==="-"?"left":"right",prefix:s||void 0,suffix:d||void 0,truncateTo:c==null?void 0:parseInt(c,10)}})}while(!0);return r}const ka=null,ki=new Map;function Lf(n,r){if(n==null||n.length===0)return n;if(r==null)return n.replace(fn,"");let i=ki.get(n);return i==null&&(i=new Function(`return \`${n.replace(fn,ka)}\`;`),ki.set(n,i)),i.call(r)}const Pa=Object.getPrototypeOf(async function(){}).constructor,Aa=null,Pi=new Map;async function Df(n,r){if(n==null||n.length===0)return n;if(r==null)return n.replace(fn,"");let i=Pi.get(n);if(i==null){const a=`return \`${n.replace(fn,Aa)}\`;`;i=new Pa(a),Pi.set(n,i)}return await i.call(r)}function Ai(n){return n>=CharCode.a&&n<=CharCode.z}function Ti(n){return n>=CharCode.A&&n<=CharCode.Z}function If(n,r="base64"){return _md5(n,r)}function Bf(n,r=0,i=0,s="\xA0"){return r===0&&i===0?n:`${r===0?"":s.repeat(r)}${n}${i===0?"":s.repeat(i)}`}function $i(n,r,i="\xA0",s){const a=r-(s??Me(n));return a<=0?n:i.repeat(a)+n}function Cf(n,r,i,s){return s=s??Me(n),s<r?$i(n,r,i,s):s>r?Wn(n,r,void 0,s):n}function Fi(n,r,i="\xA0",s){const a=r-(s??Me(n));return a<=0?n:n+i.repeat(a)}function Mf(n,r,i,s){const a=r<0;return r=Math.abs(r),s=s??Me(n),s<r?a?$i(n,r,i,s):Fi(n,r,i,s):s>r?Wn(n,r,void 0,s):n}function Nf(n,r,i,s){return s=s??Me(n),s<r?Fi(n,r,i,s):s>r?Wn(n,r):n}function Oi(n,r,i){if(i==null)return`${r} ${n}${r===1?"":"s"}`;const s=r===1?n:i.plural??`${n}s`;return i.only?s:`${r===0?i.zero??r:i.format?.(r)??r}${i.infix??" "}${s}`}const Ta=/[\\/:*?"<>|\x00-\x1f\x80-\x9f]/g;function Uf(n,r="_"){return n&&n.replace(Ta,r)}function Vf(n,r){const i=n.lastIndexOf(r);return i===-1?[n]:[n.substr(i),n.substring(0,i-1)]}function jf(n,r){const i=n.split(r,1),s=i[0];return s.length===n.length?i:[s,n.substr(s.length+1)]}function Wn(n,r,i="\u2026",s){if(!n)return n;if(r<=1)return i;if(s=s??Me(n),s<=r)return n;if(s===n.length)return`${n.substring(0,r-1)}${i}`;let a=Math.floor(r/(s/n.length)),c=Me(n.substring(0,a));for(;c<r;)c+=Me(n[a++]);return c>=r&&a--,`${n.substring(0,a)}${i}`}function Hf(n,r,i="\u2026",s){if(!n)return n;if(r<=1)return i;if(s=s??Me(n),s<=r)return n;if(s===n.length)return`${i}${n.substring(s-r)}`;let a=Math.floor(r/(s/n.length)),c=Me(n.substring(0,a));for(;c<r;)c+=Me(n[a++]);return c>=r&&a--,`${i}${n.substring(n.length-a)}`}function Wf(n,r,i="\u2026"){if(!n)return n;if(r<=1)return i;const s=Me(n);return s<=r?n:`${n.slice(0,Math.floor(r/2)-1)}${i}${n.slice(s-Math.ceil(r/2))}`}let zn;const $a=/[^\x20-\x7F\u00a0\u2026]/;function Me(n){if(n==null||n.length===0)return 0;if(!$a.test(n))return n.length;if(zn==null&&(zn=ansiRegex()),n=n.replace(zn,""),n.length===0)return 0;let r=0,i=0,s=0;const a=[...n];for(let f=0;f<a.length;f++){const d=a[f].codePointAt(0);if(!(d<=31||d>=127&&d<=159)&&!(d>=768&&d<=879)){if(d>=128512&&d<=128591||d>=127744&&d<=128511||d>=128640&&d<=128767||d>=9728&&d<=9983||d>=9984&&d<=10175||d>=65024&&d<=65039||d>=129280&&d<=129535||d>=65024&&d<=65039||d>=8400&&d<=8447){if(d>=127995&&d<=127999)continue;i++,r+=2;continue}if(d===8205){s++,r-=2;continue}d>65535&&f++,r+=Fa(d)?2:1}}const c=i-s;return c>1&&(r+=c-1),r}function Fa(n){return n>=4352&&(n<=4447||n===9001||n===9002||n>=11904&&n<=12871&&n!==12351||n>=12880&&n<=19903||n>=19968&&n<=42182||n>=43360&&n<=43388||n>=44032&&n<=55203||n>=63744&&n<=64255||n>=65040&&n<=65049||n>=65072&&n<=65131||n>=65281&&n<=65376||n>=65504&&n<=65510||n>=110592&&n<=110593||n>=127488&&n<=127569||n>=131072&&n<=262141)}var Oa=Object.defineProperty,La=Object.getOwnPropertyDescriptor,At=(n,r,i,s)=>{for(var a=s>1?void 0:s?La(r,i):r,c=n.length-1,f;c>=0;c--)(f=n[c])&&(a=(s?f(r,i,a):f(a))||a);return s&&a&&Oa(r,i,a),a};const Da=me`
	${Te(n=>n.state===ue.Free,me`
			<p>All-new, powerful, additional features that enhance your GitLens experience.</p>
			<p>
				GitLens+ features are free for local and public repos, no account required, while upgrading to GitLens
				Pro gives you access on private repos.
			</p>

			<p class="mb-1">
				<vscode-button @click="${n=>n.fireAction("command:gitlens.plus.startPreviewTrial")}"
					>Try GitLens+ features on private repos</vscode-button
				>
			</p>
			<p class="mb-1">
				<a class="minimal" href="command:gitlens.plus.hide">Hide GitLens+ features</a>
			</p>
		`)}
	${Te(n=>n.state===ue.Paid,me`
			<h3>Welcome to ${n=>n.planName}!</h3>
			<p>
				You have access to
				<a title="Learn more about GitLens+ features" href="command:gitlens.plus.learn">GitLens+ features</a>
				on any repo.
			</p>
		`)}
	${Te(n=>n.state===ue.FreeInPreviewTrial,me`
			<h3>GitLens Pro Trial</h3>
			<p>
				You have ${n=>n.daysRemaining} left in your 3-day
				<a title="Learn more about GitLens+ features" href="command:gitlens.plus.learn">GitLens Pro trial</a>.
				Don't worry if you need more time, you can extend your trial for an additional free 7-days of GitLens+
				features on private repos.
			</p>
			<p>
				<vscode-button @click="${n=>n.fireAction("command:gitlens.plus.purchase")}"
					>Upgrade to Pro</vscode-button
				>
			</p>
		`)}
	${Te(n=>n.state===ue.FreePlusInTrial,me`
			<h3>GitLens Pro Trial</h3>
			<p>
				You have ${n=>n.daysRemaining} left in your
				<a title="Learn more about GitLens+ features" href="command:gitlens.plus.learn">GitLens Pro trial</a>.
				Once your trial ends, you'll continue to have access to GitLens+ features on local and public repos,
				while upgrading to GitLens Pro gives you access on private repos.
			</p>
		`)}
	${Te(n=>n.state===ue.FreePreviewTrialExpired,me`
			<h3>Extend Your GitLens Pro Trial</h3>
			<p>
				Your free 3-day GitLens Pro trial has ended, extend your trial to get an additional free 7-days of
				GitLens+ features on private repos.
			</p>
			<p>
				<vscode-button @click="${n=>n.fireAction("command:gitlens.plus.loginOrSignUp")}"
					>Extend Pro Trial</vscode-button
				>
			</p>
		`)}
	${Te(n=>n.state===ue.FreePlusTrialExpired,me`
			<h3>GitLens Pro Trial Expired</h3>
			<p>
				Your GitLens Pro trial has ended, please upgrade to GitLens Pro to continue to use GitLens+ features on
				private repos.
			</p>
			<p>
				<vscode-button @click="${n=>n.fireAction("command:gitlens.plus.purchase")}"
					>Upgrade to Pro</vscode-button
				>
			</p>
		`)}
	${Te(n=>n.state===ue.VerificationRequired,me`
			<h3>Please verify your email</h3>
			<p class="alert__message">
				Before you can also use GitLens+ features on private repos, please verify your email address.
			</p>
			<p class="mb-1">
				<vscode-button @click="${n=>n.fireAction("command:gitlens.plus.resendVerification")}"
					>Resend Verification Email</vscode-button
				>
			</p>
			<p>
				<vscode-button @click="${n=>n.fireAction("command:gitlens.plus.validate")}"
					>Refresh Verification Status</vscode-button
				>
			</p>
		`)}

	<p class="mb-0"><code-icon icon="info"></code-icon> All other GitLens features can always be used on any repo</p>
`,Ia=Ye`
	* {
		box-sizing: border-box;
	}

	:host {
		display: block;
		text-align: center;
	}

	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		outline-color: var(--focus-border);
	}
	a:hover {
		text-decoration: underline;
	}

	p {
		margin-top: 0;
	}

	.mb-1 {
		margin-bottom: 0.4rem;
	}
	.mb-0 {
		margin-bottom: 0;
	}

	.minimal {
		color: var(--color-foreground--50);
		font-size: 1rem;
		position: relative;
		top: -0.2rem;
	}
`;let dt=class extends he{constructor(){super(...arguments),this.days=0,this.state=ue.Free,this.plan="",this.visibility="public"}get daysRemaining(){return this.days<1?"less than one day":Oi("day",this.days)}get isFree(){return["local","public"].includes(this.visibility)}get planName(){switch(this.state){case ue.Free:case ue.FreePreviewTrialExpired:case ue.FreePlusTrialExpired:return"GitLens Free";case ue.FreeInPreviewTrial:case ue.FreePlusInTrial:return"GitLens Pro (Trial)";case ue.VerificationRequired:return`${this.plan} (Unverified)`;default:return this.plan}}fireAction(n){this.$emit("action",n)}};At([W({converter:it})],dt.prototype,"days",2),At([W({converter:it})],dt.prototype,"state",2),At([W],dt.prototype,"plan",2),At([W],dt.prototype,"visibility",2),At([v],dt.prototype,"planName",1),dt=At([we({name:"plus-content",template:Da,styles:Ia})],dt);var Ba=Object.defineProperty,Ca=Object.getOwnPropertyDescriptor,qe=(n,r,i,s)=>{for(var a=s>1?void 0:s?Ca(r,i):r,c=n.length-1,f;c>=0;c--)(f=n[c])&&(a=(s?f(r,i,a):f(a))||a);return s&&a&&Ba(r,i,a),a};const Ma=me`
	<div class="header-card__media"><img class="header-card__image" src="${n=>n.image}" alt="GitLens Logo" /></div>
	<h1 class="header-card__title${n=>n.name===""?" logo":""}">
		${Te(n=>n.name==="",me`Git<span class="brand">Lens</span> 13`)}
		${Te(n=>n.name!=="",me`${n=>n.name}`)}
	</h1>
	<p class="header-card__account">
		<span
			class="status"
			title="Can access GitLens+ features on ${n=>n.isPro?"any repo":"local & public repos"}"
			><span class="repo-access${n=>n.isPro?" is-pro":""}">✨</span>${n=>n.planName}</span
		>
		<span class="account-actions">
			${Te(n=>!n.hasAccount,me`<a class="action" href="command:gitlens.plus.loginOrSignUp">Sign In</a>`)}
			${Te(n=>n.hasAccount,me`
					<a
						class="action is-icon"
						href="command:gitlens.plus.manage"
						aria-label="Manage Account"
						title="Manage Account"
						><code-icon icon="account"></code-icon></a
					>&nbsp;<a
						class="action is-icon"
						href="command:gitlens.plus.logout"
						aria-label="Sign Out"
						title="Sign Out"
						><code-icon icon="sign-out"></code-icon
					></a>
				`)}
		</span>
	</p>
	<div
		class="progress header-card__progress"
		role="progressbar"
		aria-valuemax="${n=>n.progressMax}"
		aria-valuenow="${n=>n.progressNow}"
		aria-label="${n=>n.progressNow} of ${n=>n.progressMax} steps completed"
	>
		<div ${ze("progressNode")} class="progress__indicator"></div>
	</div>
	<span class="actions">
		${Te(n=>n.state===ue.Free,me`<a class="action is-primary" href="command:gitlens.plus.startPreviewTrial"
				>Start Pro Trial</a
			>`)}
		${Te(n=>n.state===ue.FreePreviewTrialExpired,me`<a class="action is-primary" href="command:gitlens.plus.loginOrSignUp"
				>Extend Pro Trial</a
			>`)}
		${Te(n=>n.state===ue.FreeInPreviewTrial||n.state===ue.FreePlusInTrial||n.state===ue.FreePlusTrialExpired,me`<a class="action is-primary" href="command:gitlens.plus.purchase">Upgrade to Pro</a>`)}
		${Te(n=>n.state===ue.VerificationRequired,me`
				<a
					class="action is-primary"
					href="command:gitlens.plus.resendVerification"
					title="Resend Verification Email"
					aria-label="Resend Verification Email"
					>Verify</a
				>&nbsp;<a
					class="action"
					href="command:gitlens.plus.validate"
					title="Refresh Verification Status"
					aria-label="Refresh Verification Status"
					>Refresh</a
				>
			`)}
	</span>
`,Na=Ye`
	* {
		box-sizing: border-box;
	}

	:host {
		position: relative;
		display: grid;
		padding: 1rem 1rem 1.2rem;
		background-color: var(--card-background);
		border-radius: 0.4rem;
		gap: 0 0.8rem;
		grid-template-columns: 3.4rem auto;
		grid-auto-flow: column;
	}

	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		outline-color: var(--focus-border);
	}
	a:hover {
		text-decoration: underline;
	}

	.header-card__media {
		grid-column: 1;
		grid-row: 1 / span 2;
		display: flex;
		align-items: center;
	}

	.header-card__image {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
	}

	.header-card__title {
		font-size: var(--vscode-font-size);
		font-weight: 600;
		margin: 0;
	}

	.header-card__title.logo {
		font-family: 'Segoe UI Semibold', var(--font-family);
		font-size: 1.5rem;
	}

	.header-card__account {
		margin: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0 0.4rem;
	}

	.progress {
		width: 100%;
		overflow: hidden;
	}

	:host-context(.vscode-high-contrast) .progress,
	:host-context(.vscode-dark) .progress {
		background-color: var(--color-background--lighten-15);
	}

	:host-context(.vscode-high-contrast-light) .progress,
	:host-context(.vscode-light) .progress {
		background-color: var(--color-background--darken-15);
	}

	.progress__indicator {
		height: 4px;
		background-color: var(--vscode-progressBar-background);
	}

	.header-card__progress {
		position: absolute;
		bottom: 0;
		left: 0;
		border-bottom-left-radius: 0.4rem;
		border-bottom-right-radius: 0.4rem;
	}

	.brand {
		color: var(--gitlens-brand-color-2);
	}
	.status {
		color: var(--color-foreground--65);
	}

	.repo-access {
		font-size: 1.1em;
		margin-right: 0.2rem;
		cursor: help;
	}
	.repo-access:not(.is-pro) {
		filter: grayscale(1) brightness(0.7);
	}

	.actions {
		position: absolute;
		right: 0.1rem;
		top: 0.1rem;
	}

	.action {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 0.3rem;
		color: var(--color-foreground--75);
	}
	:host-context(.vscode-high-contrast) .action.is-primary,
	:host-context(.vscode-dark) .action.is-primary {
		border: 1px solid var(--color-background--lighten-15);
	}

	:host-context(.vscode-high-contrast-light) .action.is-primary,
	:host-context(.vscode-light) .action.is-primary {
		border: 1px solid var(--color-background--darken-15);
	}

	.action.is-icon {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 2.2rem;
		height: 2.2rem;
		padding: 0;
	}
	.action:hover {
		text-decoration: none;
		color: var(--color-foreground);
	}

	:host-context(.vscode-high-contrast) .action:hover,
	:host-context(.vscode-dark) .action:hover {
		background-color: var(--color-background--lighten-10);
	}

	:host-context(.vscode-high-contrast-light) .action:hover,
	:host-context(.vscode-light) .action:hover {
		background-color: var(--color-background--darken-10);
	}
`;let je=class extends he{constructor(){super(...arguments),this.image="",this.name="",this.days=0,this.steps=4,this.completed=0,this.state=ue.Free,this.plan=""}attributeChangedCallback(n,r,i){super.attributeChangedCallback(n,r,i),!(r===i||this.progressNode==null)&&this.updateProgressWidth()}get daysRemaining(){return this.days<1?"<1 day":Oi("day",this.days)}get progressNow(){return this.completed+1}get progressMax(){return this.steps+1}get progress(){return`${this.progressNow/this.progressMax*100}%`}get planName(){switch(this.state){case ue.Free:case ue.FreePreviewTrialExpired:case ue.FreePlusTrialExpired:return"GitLens Free";case ue.FreeInPreviewTrial:case ue.FreePlusInTrial:return`GitLens Pro (Trial), ${this.daysRemaining} left`;case ue.VerificationRequired:return`${this.plan} (Unverified)`;default:return this.plan}}get hasAccount(){switch(this.state){case ue.Free:case ue.FreePreviewTrialExpired:case ue.FreeInPreviewTrial:return!1}return!0}get isPro(){switch(this.state){case ue.Free:case ue.FreePreviewTrialExpired:case ue.FreePlusTrialExpired:case ue.VerificationRequired:return!1}return!0}updateProgressWidth(){this.progressNode.style.width=this.progress}};qe([W],je.prototype,"image",2),qe([W],je.prototype,"name",2),qe([W({converter:it})],je.prototype,"days",2),qe([W({converter:it})],je.prototype,"steps",2),qe([W({converter:it})],je.prototype,"completed",2),qe([W({converter:it})],je.prototype,"state",2),qe([W],je.prototype,"plan",2),qe([v],je.prototype,"progress",1),qe([v],je.prototype,"planName",1),je=qe([we({name:"header-card",template:Ma,styles:Na})],je);class Ua extends Ns{constructor(){super("HomeApp")}onInitialize(){co().register(ws()),this.$steps=[...document.querySelectorAll("stepped-section[id]")],this.$cards=[...document.querySelectorAll("card-section[id]")],this.updateState()}onBind(){const r=super.onBind?.()??[];return r.push(ut.on("[data-action]","click",(i,s)=>this.onDataActionClicked(i,s))),r.push(ut.on("plus-content","action",(i,s)=>this.onPlusActionClicked(i,s))),r.push(ut.on("stepped-section","complete",(i,s)=>this.onStepComplete(i,s))),r.push(ut.on("card-section","dismiss",(i,s)=>this.onCardDismissed(i,s))),r}onMessageReceived(r){const i=r.data;switch(i.method){case qr.method:this.log(`${this.appName}.onMessageReceived(${i.id}): name=${i.method}`),zr(qr,i,s=>{this.state.subscription=s.subscription,this.state.completedActions=s.completedActions,this.state.avatar=s.avatar,this.updateState()});break;default:super.onMessageReceived?.(r);break}}onStepComplete(r,i){const s=i.id,a=r.detail??!1;this.state.completedSteps=Li(this.state.completedSteps,s,a),this.sendCommand(Os,{id:s,completed:a}),this.updateState()}onCardDismissed(r,i){const s=i.id;this.state.dismissedSections=Li(this.state.dismissedSections,s),this.sendCommand(Ls,{id:s}),this.updateState()}onDataActionClicked(r,i){const s=i.dataset.action;this.onActionClickedCore(s)}onPlusActionClicked(r,i){this.onActionClickedCore(r.detail)}onActionClickedCore(r){r?.startsWith("command:")&&this.sendCommand($s,{command:r.slice(8)})}getDaysRemaining(){return[ue.FreeInPreviewTrial,ue.FreePlusInTrial].includes(this.state.subscription.state)?jr(this.state.subscription,"days")??0:0}forceShowPlus(){return[ue.FreePreviewTrialExpired,ue.FreePlusTrialExpired,ue.VerificationRequired].includes(this.state.subscription.state)}updateHeader(r=this.getDaysRemaining(),i=this.forceShowPlus()){const{subscription:s,completedSteps:a,avatar:c}=this.state,f=document.getElementById("header-card");if(f){c&&f.setAttribute("image",c),f.setAttribute("name",s.account?.name??"");const d=this.$steps?.length;let m=a?.length;i&&a!=null&&this.$steps!=null&&d===m&&(m-=1),f.setAttribute("steps",d?.toString()??""),f.setAttribute("completed",m?.toString()??""),f.setAttribute("state",s.state.toString()),f.setAttribute("plan",s.plan.effective.name),f.setAttribute("days",r.toString())}}updatePlusContent(r=this.getDaysRemaining()){const{subscription:i,visibility:s}=this.state,a=document.getElementById("plus-content");a&&(a.setAttribute("days",r.toString()),a.setAttribute("state",i.state.toString()),a.setAttribute("visibility",s),a.setAttribute("plan",i.plan.effective.name))}updateSteps(r=this.forceShowPlus()){this.$steps==null||this.$steps.length===0||this.state.completedSteps==null||this.state.completedSteps.length===0||this.$steps.forEach(i=>{i.setAttribute("completed",i.id==="plus"&&r||this.state.completedSteps?.includes(i.id)!==!0?"false":"true")})}updateSections(){this.$cards==null||this.$cards.length===0||this.state.dismissedSections==null||this.state.dismissedSections.length===0||this.state.dismissedSections.forEach(r=>{const i=this.$cards.findIndex(s=>s.id===r);i>-1&&(this.$cards[i].remove(),this.$cards.splice(i,1))})}updateState(){const{completedSteps:r,dismissedSections:i,plusEnabled:s}=this.state;document.getElementById("restore-plus")?.classList.toggle("hide",s);const a=r?.length||i?.length;document.getElementById("restore-welcome")?.classList.toggle("hide",!a);const c=this.forceShowPlus(),f=this.getDaysRemaining();this.updateHeader(f,c),this.updatePlusContent(f),this.updateSteps(c),this.updateSections()}}function Li(n=[],r,i=!0){const s=n.includes(r);return!s&&i?n.push(r):s&&!i&&n.splice(n.indexOf(r),1),n}new Ua})()})();
