var ct=Object.defineProperty;var F=(me,ce)=>ct(me,"name",{value:ce,configurable:!0});exports.id=457;exports.ids=[457];exports.modules={5186:(me,ce,S)=>{var P=S(3698),Z=S(2505),k=S(6417),W=Function.bind,V=W.bind(W);function le(de,he,Q){var xe=V(k,null).apply(null,Q?[he,Q]:[he]);de.api={remove:xe},de.remove=xe,["before","error","after","wrap"].forEach(function(te){var $e=Q?[he,te,Q]:[he,te];de[te]=de.api[te]=V(Z,null).apply(null,$e)})}F(le,"bindApi");function X(){var de="h",he={registry:{}},Q=P.bind(null,he,de);return le(Q,he,de),Q}F(X,"HookSingular");function pe(){var de={registry:{}},he=P.bind(null,de);return le(he,de),he}F(pe,"HookCollection");var ie=!1;function ge(){return ie||(console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'),ie=!0),pe()}F(ge,"Hook"),ge.Singular=X.bind(),ge.Collection=pe.bind(),me.exports=ge,me.exports.Hook=ge,me.exports.Singular=ge.Singular,me.exports.Collection=ge.Collection},2505:me=>{me.exports=ce;function ce(S,P,Z,k){var W=k;S.registry[Z]||(S.registry[Z]=[]),P==="before"&&(k=F(function(V,le){return Promise.resolve().then(W.bind(null,le)).then(V.bind(null,le))},"hook")),P==="after"&&(k=F(function(V,le){var X;return Promise.resolve().then(V.bind(null,le)).then(function(pe){return X=pe,W(X,le)}).then(function(){return X})},"hook")),P==="error"&&(k=F(function(V,le){return Promise.resolve().then(V.bind(null,le)).catch(function(X){return W(X,le)})},"hook")),S.registry[Z].push({hook:k,orig:W})}F(ce,"addHook")},3698:me=>{me.exports=ce;function ce(S,P,Z,k){if(typeof Z!="function")throw new Error("method for before hook must be a function");return k||(k={}),Array.isArray(P)?P.reverse().reduce(function(W,V){return ce.bind(null,S,V,W,k)},Z)():Promise.resolve().then(function(){return S.registry[P]?S.registry[P].reduce(function(W,V){return V.hook.bind(null,W,k)},Z)():Z(k)})}F(ce,"register")},6417:me=>{me.exports=ce;function ce(S,P,Z){if(!!S.registry[P]){var k=S.registry[P].map(function(W){return W.orig}).indexOf(Z);k!==-1&&S.registry[P].splice(k,1)}}F(ce,"removeHook")},8026:(me,ce,S)=>{"use strict";S.r(ce),S.d(ce,{GitHubApi:()=>ne});function P(){return typeof navigator=="object"&&"userAgent"in navigator?navigator.userAgent:typeof process=="object"&&"version"in process?`Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`:"<environment undetectable>"}F(P,"getUserAgent");var Z=S(5186);/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function k(c){return Object.prototype.toString.call(c)==="[object Object]"}F(k,"isObject");function W(c){var n,s;return k(c)===!1?!1:(n=c.constructor,n===void 0?!0:(s=n.prototype,!(k(s)===!1||s.hasOwnProperty("isPrototypeOf")===!1)))}F(W,"isPlainObject");function V(c){return c?Object.keys(c).reduce((n,s)=>(n[s.toLowerCase()]=c[s],n),{}):{}}F(V,"lowercaseKeys");function le(c,n){const s=Object.assign({},c);return Object.keys(n).forEach(i=>{W(n[i])?i in c?s[i]=le(c[i],n[i]):Object.assign(s,{[i]:n[i]}):Object.assign(s,{[i]:n[i]})}),s}F(le,"mergeDeep");function X(c){for(const n in c)c[n]===void 0&&delete c[n];return c}F(X,"removeUndefinedProperties");function pe(c,n,s){if(typeof n=="string"){let[u,a]=n.split(" ");s=Object.assign(a?{method:u,url:a}:{url:u},s)}else s=Object.assign({},n);s.headers=V(s.headers),X(s),X(s.headers);const i=le(c||{},s);return c&&c.mediaType.previews.length&&(i.mediaType.previews=c.mediaType.previews.filter(u=>!i.mediaType.previews.includes(u)).concat(i.mediaType.previews)),i.mediaType.previews=i.mediaType.previews.map(u=>u.replace(/-preview/,"")),i}F(pe,"merge");function ie(c,n){const s=/\?/.test(c)?"&":"?",i=Object.keys(n);return i.length===0?c:c+s+i.map(u=>u==="q"?"q="+n.q.split("+").map(encodeURIComponent).join("+"):`${u}=${encodeURIComponent(n[u])}`).join("&")}F(ie,"addQueryParameters");const ge=/\{[^}]+\}/g;function de(c){return c.replace(/^\W+|\W+$/g,"").split(/,/)}F(de,"removeNonChars");function he(c){const n=c.match(ge);return n?n.map(de).reduce((s,i)=>s.concat(i),[]):[]}F(he,"extractUrlVariableNames");function Q(c,n){return Object.keys(c).filter(s=>!n.includes(s)).reduce((s,i)=>(s[i]=c[i],s),{})}F(Q,"omit");function xe(c){return c.split(/(%[0-9A-Fa-f]{2})/g).map(function(n){return/%[0-9A-Fa-f]/.test(n)||(n=encodeURI(n).replace(/%5B/g,"[").replace(/%5D/g,"]")),n}).join("")}F(xe,"encodeReserved");function te(c){return encodeURIComponent(c).replace(/[!'()*]/g,function(n){return"%"+n.charCodeAt(0).toString(16).toUpperCase()})}F(te,"encodeUnreserved");function $e(c,n,s){return n=c==="+"||c==="#"?xe(n):te(n),s?te(s)+"="+n:n}F($e,"encodeValue");function re(c){return c!=null}F(re,"isDefined");function Ee(c){return c===";"||c==="&"||c==="?"}F(Ee,"isKeyOperator");function ke(c,n,s,i){var u=c[s],a=[];if(re(u)&&u!=="")if(typeof u=="string"||typeof u=="number"||typeof u=="boolean")u=u.toString(),i&&i!=="*"&&(u=u.substring(0,parseInt(i,10))),a.push($e(n,u,Ee(n)?s:""));else if(i==="*")Array.isArray(u)?u.filter(re).forEach(function(l){a.push($e(n,l,Ee(n)?s:""))}):Object.keys(u).forEach(function(l){re(u[l])&&a.push($e(n,u[l],l))});else{const l=[];Array.isArray(u)?u.filter(re).forEach(function(d){l.push($e(n,d))}):Object.keys(u).forEach(function(d){re(u[d])&&(l.push(te(d)),l.push($e(n,u[d].toString())))}),Ee(n)?a.push(te(s)+"="+l.join(",")):l.length!==0&&a.push(l.join(","))}else n===";"?re(u)&&a.push(te(s)):u===""&&(n==="&"||n==="?")?a.push(te(s)+"="):u===""&&a.push("");return a}F(ke,"getValues");function Ie(c){return{expand:Ve.bind(null,c)}}F(Ie,"parseUrl");function Ve(c,n){var s=["+","#",".","/",";","?","&"];return c.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(i,u,a){if(u){let d="";const g=[];if(s.indexOf(u.charAt(0))!==-1&&(d=u.charAt(0),u=u.substr(1)),u.split(/,/g).forEach(function(p){var y=/([^:\*]*)(?::(\d+)|(\*))?/.exec(p);g.push(ke(n,d,y[1],y[2]||y[3]))}),d&&d!=="+"){var l=",";return d==="?"?l="&":d!=="#"&&(l=d),(g.length!==0?d:"")+g.join(l)}else return g.join(",")}else return xe(a)})}F(Ve,"expand");function Te(c){let n=c.method.toUpperCase(),s=(c.url||"/").replace(/:([a-z]\w+)/g,"{$1}"),i=Object.assign({},c.headers),u,a=Q(c,["method","baseUrl","url","headers","request","mediaType"]);const l=he(s);s=Ie(s).expand(a),/^http/.test(s)||(s=c.baseUrl+s);const d=Object.keys(c).filter(y=>l.includes(y)).concat("baseUrl"),g=Q(a,d);if(!/application\/octet-stream/i.test(i.accept)&&(c.mediaType.format&&(i.accept=i.accept.split(/,/).map(y=>y.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,`application/vnd$1$2.${c.mediaType.format}`)).join(",")),c.mediaType.previews.length)){const y=i.accept.match(/[\w-]+(?=-preview)/g)||[];i.accept=y.concat(c.mediaType.previews).map(U=>{const N=c.mediaType.format?`.${c.mediaType.format}`:"+json";return`application/vnd.github.${U}-preview${N}`}).join(",")}return["GET","HEAD"].includes(n)?s=ie(s,g):"data"in g?u=g.data:Object.keys(g).length&&(u=g),!i["content-type"]&&typeof u<"u"&&(i["content-type"]="application/json; charset=utf-8"),["PATCH","PUT"].includes(n)&&typeof u>"u"&&(u=""),Object.assign({method:n,url:s,headers:i},typeof u<"u"?{body:u}:null,c.request?{request:c.request}:null)}F(Te,"parse");function Pe(c,n,s){return Te(pe(c,n,s))}F(Pe,"endpointWithDefaults");function J(c,n){const s=pe(c,n),i=Pe.bind(null,s);return Object.assign(i,{DEFAULTS:s,defaults:J.bind(null,s),merge:pe.bind(null,s),parse:Te})}F(J,"withDefaults");const w=`octokit-endpoint.js/7.0.2 ${P()}`,ye=J(null,{method:"GET",baseUrl:"https://api.github.com",headers:{accept:"application/vnd.github.v3+json","user-agent":w},mediaType:{format:"",previews:[]}});var Se=S(5568);class Fe extends Error{constructor(n){super(n),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="Deprecation"}}F(Fe,"Deprecation");var Le=S(778),je=S.n(Le);const We=je()(c=>console.warn(c)),ze=je()(c=>console.warn(c));class ve extends Error{constructor(n,s,i){super(n),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="HttpError",this.status=s;let u;"headers"in i&&typeof i.headers<"u"&&(u=i.headers),"response"in i&&(this.response=i.response,u=i.response.headers);const a=Object.assign({},i.request);i.request.headers.authorization&&(a.headers=Object.assign({},i.request.headers,{authorization:i.request.headers.authorization.replace(/ .*$/," [REDACTED]")})),a.url=a.url.replace(/\bclient_secret=\w+/g,"client_secret=[REDACTED]").replace(/\baccess_token=\w+/g,"access_token=[REDACTED]"),this.request=a,Object.defineProperty(this,"code",{get(){return We(new Fe("[@octokit/request-error] `error.code` is deprecated, use `error.status`.")),s}}),Object.defineProperty(this,"headers",{get(){return ze(new Fe("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`.")),u||{}}})}}F(ve,"RequestError");const Oe="6.2.1";function Xe(c){return c.arrayBuffer()}F(Xe,"getBufferResponse");function Ge(c){const n=c.request&&c.request.log?c.request.log:console;(W(c.body)||Array.isArray(c.body))&&(c.body=JSON.stringify(c.body));let s={},i,u;return(c.request&&c.request.fetch||globalThis.fetch||Se.ZP)(c.url,Object.assign({method:c.method,body:c.body,headers:c.headers,redirect:c.redirect},c.request)).then(async l=>{u=l.url,i=l.status;for(const d of l.headers)s[d[0]]=d[1];if("deprecation"in s){const d=s.link&&s.link.match(/<([^>]+)>; rel="deprecation"/),g=d&&d.pop();n.warn(`[@octokit/request] "${c.method} ${c.url}" is deprecated. It is scheduled to be removed on ${s.sunset}${g?`. See ${g}`:""}`)}if(!(i===204||i===205)){if(c.method==="HEAD"){if(i<400)return;throw new ve(l.statusText,i,{response:{url:u,status:i,headers:s,data:void 0},request:c})}if(i===304)throw new ve("Not modified",i,{response:{url:u,status:i,headers:s,data:await M(l)},request:c});if(i>=400){const d=await M(l);throw new ve(fe(d),i,{response:{url:u,status:i,headers:s,data:d},request:c})}return M(l)}}).then(l=>({status:i,url:u,headers:s,data:l})).catch(l=>{throw l instanceof ve||l.name==="AbortError"?l:new ve(l.message,500,{request:c})})}F(Ge,"fetchWrapper");async function M(c){const n=c.headers.get("content-type");return/application\/json/.test(n)?c.json():!n||/^text\/|charset=utf-8$/.test(n)?c.text():Xe(c)}F(M,"getResponseData");function fe(c){return typeof c=="string"?c:"message"in c?Array.isArray(c.errors)?`${c.message}: ${c.errors.map(JSON.stringify).join(", ")}`:c.message:`Unknown error: ${JSON.stringify(c)}`}F(fe,"toErrorMessage");function Ne(c,n){const s=c.defaults(n);return Object.assign(F(function(u,a){const l=s.merge(u,a);if(!l.request||!l.request.hook)return Ge(s.parse(l));const d=F((g,p)=>Ge(s.parse(s.merge(g,p))),"request");return Object.assign(d,{endpoint:s,defaults:Ne.bind(null,s)}),l.request.hook(d,l)},"newApi"),{endpoint:s,defaults:Ne.bind(null,s)})}F(Ne,"dist_web_withDefaults");const De=Ne(ye,{headers:{"user-agent":`octokit-request.js/${Oe} ${P()}`}}),_e="5.0.1";function qe(c){return`Request failed due to following response errors:
`+c.errors.map(n=>` - ${n.message}`).join(`
`)}F(qe,"_buildMessageForResponseErrors");class Be extends Error{constructor(n,s,i){super(qe(i)),this.request=n,this.headers=s,this.response=i,this.name="GraphqlResponseError",this.errors=i.errors,this.data=i.data,Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}F(Be,"GraphqlResponseError");const E=["method","baseUrl","url","headers","request","query","mediaType"],Ke=["query","method","url"],H=/\/api\/v3\/?$/;function e(c,n,s){if(s){if(typeof n=="string"&&"query"in s)return Promise.reject(new Error('[@octokit/graphql] "query" cannot be used as variable name'));for(const l in s)if(!!Ke.includes(l))return Promise.reject(new Error(`[@octokit/graphql] "${l}" cannot be used as variable name`))}const i=typeof n=="string"?Object.assign({query:n},s):n,u=Object.keys(i).reduce((l,d)=>E.includes(d)?(l[d]=i[d],l):(l.variables||(l.variables={}),l.variables[d]=i[d],l),{}),a=i.baseUrl||c.endpoint.DEFAULTS.baseUrl;return H.test(a)&&(u.url=a.replace(H,"/api/graphql")),c(u).then(l=>{if(l.data.errors){const d={};for(const g of Object.keys(l.headers))d[g]=l.headers[g];throw new Be(u,d,l.data)}return l.data.data})}F(e,"graphql");function r(c,n){const s=c.defaults(n);return Object.assign(F((u,a)=>e(s,u,a),"newApi"),{defaults:r.bind(null,s),endpoint:De.endpoint})}F(r,"graphql_dist_web_withDefaults");const t=r(De,{headers:{"user-agent":`octokit-graphql.js/${_e} ${P()}`},method:"POST",url:"/graphql"});function o(c){return r(c,{method:"POST",url:"/graphql"})}F(o,"withCustomRequest");const m=/^v1\./,h=/^ghs_/,v=/^ghu_/;async function f(c){const n=c.split(/\./).length===3,s=m.test(c)||h.test(c),i=v.test(c);return{type:"token",token:c,tokenType:n?"app":s?"installation":i?"user-to-server":"oauth"}}F(f,"auth");function C(c){return c.split(/\./).length===3?`bearer ${c}`:`token ${c}`}F(C,"withAuthorizationPrefix");async function $(c,n,s,i){const u=n.endpoint.merge(s,i);return u.headers.authorization=C(c),n(u)}F($,"hook");const T=F(function(n){if(!n)throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");if(typeof n!="string")throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");return n=n.replace(/^(token|bearer) +/i,""),Object.assign(f.bind(null,n),{hook:$.bind(null,n)})},"createTokenAuth"),R="4.0.5";class I{constructor(n={}){const s=new Z.Collection,i={baseUrl:De.endpoint.DEFAULTS.baseUrl,headers:{},request:Object.assign({},n.request,{hook:s.bind(null,"request")}),mediaType:{previews:[],format:""}};if(i.headers["user-agent"]=[n.userAgent,`octokit-core.js/${R} ${P()}`].filter(Boolean).join(" "),n.baseUrl&&(i.baseUrl=n.baseUrl),n.previews&&(i.mediaType.previews=n.previews),n.timeZone&&(i.headers["time-zone"]=n.timeZone),this.request=De.defaults(i),this.graphql=o(this.request).defaults(i),this.log=Object.assign({debug:()=>{},info:()=>{},warn:console.warn.bind(console),error:console.error.bind(console)},n.log),this.hook=s,n.authStrategy){const{authStrategy:a,...l}=n,d=a(Object.assign({request:this.request,log:this.log,octokit:this,octokitOptions:l},n.auth));s.wrap("request",d.hook),this.auth=d}else if(!n.auth)this.auth=async()=>({type:"unauthenticated"});else{const a=T(n.auth);s.wrap("request",a.hook),this.auth=a}this.constructor.plugins.forEach(a=>{Object.assign(this,a(this,n))})}static defaults(n){return F(class extends this{constructor(...i){const u=i[0]||{};if(typeof n=="function"){super(n(u));return}super(Object.assign({},n,u,u.userAgent&&n.userAgent?{userAgent:`${u.userAgent} ${n.userAgent}`}:null))}},"OctokitWithDefaults")}static plugin(...n){var s;const i=this.plugins;return s=F(class extends this{},"_a"),s.plugins=i.concat(n.filter(a=>!i.includes(a))),s}}F(I,"Octokit"),I.VERSION=R,I.plugins=[];var D=S(9496),q=S(1149),x=S(4673),B=S(9179),b=S(5396),L=S(5059),G=S(3082),_=S(7530),Y=S(2436),O=S(1999),A=S(7369),oe=S(9417),z=S(2971),se=S(565),Me=S(8301),we=Object.defineProperty,at=Object.getOwnPropertyDescriptor,lt=F((c,n,s)=>n in c?we(c,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):c[n]=s,"__defNormalProp"),ae=F((c,n,s,i)=>{for(var u=i>1?void 0:i?at(n,s):n,a=c.length-1,l;a>=0;a--)(l=c[a])&&(u=(i?l(n,s,u):l(u))||u);return i&&u&&we(n,s,u),u},"__decorateClass"),He=F((c,n,s)=>(lt(c,typeof n!="symbol"?n+"":n,s),s),"__publicField");const Ce=Object.freeze({values:[]}),Je=Object.freeze({ranges:[]});class ne{constructor(n){He(this,"_onDidReauthenticate",new D.EventEmitter),He(this,"_disposable"),He(this,"_proxyAgent",null),He(this,"_enterpriseVersions",new Map),He(this,"_octokits",new Map),this._disposable=D.Disposable.from(B.DN.onDidChange(s=>{(B.DN.changed(s,"proxy")||B.DN.changed(s,"outputLevel"))&&this.resetCaches()}),B.DN.onDidChangeAny(s=>{(s.affectsConfiguration("http.proxy")||s.affectsConfiguration("http.proxyStrictSSL"))&&this.resetCaches()}))}get onDidReauthenticate(){return this._onDidReauthenticate.event}dispose(){var n;(n=this._disposable)==null||n.dispose()}resetCaches(){this._proxyAgent=null,this._octokits.clear(),this._enterpriseVersions.clear()}get proxyAgent(){if(!x.$L)return this._proxyAgent===null&&(this._proxyAgent=(0,q.Nx)()),this._proxyAgent}async getAccountForCommit(n,s,i,u,a,l){var d,g;const p=(0,A.UH)();try{const y=`query getAccountForCommit(
	$owner: String!
	$repo: String!
	$ref: GitObjectID!
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $ref) {
			... on Commit {
				author {
					name
					email
					avatarUrl(size: $avatarSize)
				}
			}
		}
	}
}`,U=await this.graphql(n,s,y,{...l,owner:i,repo:u,ref:a},p),N=(g=(d=U?.repository)==null?void 0:d.object)==null?void 0:g.author;return N==null?void 0:{provider:n,name:N.name??void 0,email:N.email??void 0,avatarUrl:!N.avatarUrl||Qe(l)?N.avatarUrl??void 0:N.email&&l?.baseUrl!=null?await this.createEnterpriseAvatarUrl(n,s,l.baseUrl,N.email,l.avatarSize):void 0}}catch(y){if(y instanceof b.Ww)return;throw this.handleException(y,n,p)}}async getAccountForEmail(n,s,i,u,a,l){var d,g;const p=(0,A.UH)();try{const y=`query getAccountForEmail(
	$emailQuery: String!
	$avatarSize: Int
) {
	search(type: USER, query: $emailQuery, first: 1) {
		nodes {
			... on User {
				name
				email
				avatarUrl(size: $avatarSize)
			}
		}
	}
}`,U=await this.graphql(n,s,y,{...l,owner:i,repo:u,emailQuery:`in:email ${a}`},p),N=(g=(d=U?.search)==null?void 0:d.nodes)==null?void 0:g[0];return N==null?void 0:{provider:n,name:N.name??void 0,email:N.email??void 0,avatarUrl:!N.avatarUrl||Qe(l)?N.avatarUrl??void 0:N.email&&l?.baseUrl!=null?await this.createEnterpriseAvatarUrl(n,s,l.baseUrl,N.email,l.avatarSize):void 0}}catch(y){if(y instanceof b.Ww)return;throw this.handleException(y,n,p)}}async getDefaultBranch(n,s,i,u,a){var l,d;const g=(0,A.UH)();try{const p=`query getDefaultBranch(
	$owner: String!
	$repo: String!
) {
	repository(name: $repo, owner: $owner) {
		defaultBranchRef {
			name
		}
	}
}`,y=await this.graphql(n,s,p,{...a,owner:i,repo:u},g),U=((d=(l=y?.repository)==null?void 0:l.defaultBranchRef)==null?void 0:d.name)??void 0;return U==null?void 0:{provider:n,name:U}}catch(p){if(p instanceof b.Ww)return;throw this.handleException(p,n,g)}}async getIssueOrPullRequest(n,s,i,u,a,l){var d;const g=(0,A.UH)();try{const p=`query getIssueOrPullRequest(
	$owner: String!
	$repo: String!
	$number: Int!
) {
	repository(name: $repo, owner: $owner) {
		issueOrPullRequest(number: $number) {
			__typename
			... on Issue {
				createdAt
				closed
				closedAt
				title
				url
			}
			... on PullRequest {
				createdAt
				closed
				closedAt
				title
				url
			}
		}
	}
}`,y=await this.graphql(n,s,p,{...l,owner:i,repo:u,number:a},g),U=(d=y?.repository)==null?void 0:d.issueOrPullRequest;return U==null?void 0:{provider:n,type:U.type,id:String(a),date:new Date(U.createdAt),title:U.title,closed:U.closed,closedDate:U.closedAt==null?void 0:new Date(U.closedAt),url:U.url}}catch(p){if(p instanceof b.Ww)return;throw this.handleException(p,n,g)}}async getPullRequestForBranch(n,s,i,u,a,l){var d,g,p,y;const U=(0,A.UH)();try{const N=`query getPullRequestForBranch(
	$owner: String!
	$repo: String!
	$branch: String!
	$limit: Int!
	$include: [PullRequestState!]
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		refs(query: $branch, refPrefix: "refs/heads/", first: 1) {
			nodes {
				associatedPullRequests(first: $limit, orderBy: {field: UPDATED_AT, direction: DESC}, states: $include) {
					nodes {
						author {
							login
							avatarUrl(size: $avatarSize)
							url
						}
						permalink
						number
						title
						state
						updatedAt
						closedAt
						mergedAt
						repository {
							isFork
							owner {
								login
							}
						}
					}
				}
			}
		}
	}
}`,K=await this.graphql(n,s,N,{...l,owner:i,repo:u,branch:a,limit:10},U),j=(y=(p=(g=(d=K?.repository)==null?void 0:d.refs.nodes[0])==null?void 0:g.associatedPullRequests)==null?void 0:p.nodes)==null?void 0:y.filter(ee=>ee!=null&&(!ee.repository.isFork||ee.repository.owner.login===i));return j==null||j.length===0?void 0:(j.length>1&&j.sort((ee,ue)=>(ee.repository.owner.login===i?-1:1)-(ue.repository.owner.login===i?-1:1)||(ee.state==="OPEN"?-1:1)-(ue.state==="OPEN"?-1:1)||new Date(ue.updatedAt).getTime()-new Date(ee.updatedAt).getTime()),Me.GitHubPullRequest.from(j[0],n))}catch(N){if(N instanceof b.Ww)return;throw this.handleException(N,n,U)}}async getPullRequestForCommit(n,s,i,u,a,l){var d,g,p,y;const U=(0,A.UH)();try{const N=`query getPullRequestForCommit(
	$owner: String!
	$repo: String!
	$ref: GitObjectID!
	$avatarSize: Int
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $ref) {
			... on Commit {
				associatedPullRequests(first: 2, orderBy: {field: UPDATED_AT, direction: DESC}) {
					nodes {
						author {
							login
							avatarUrl(size: $avatarSize)
							url
						}
						permalink
						number
						title
						state
						updatedAt
						closedAt
						mergedAt
						repository {
							isFork
							owner {
								login
							}
						}
					}
				}
			}
		}
	}
}`,K=await this.graphql(n,s,N,{...l,owner:i,repo:u,ref:a},U),j=(y=(p=(g=(d=K?.repository)==null?void 0:d.object)==null?void 0:g.associatedPullRequests)==null?void 0:p.nodes)==null?void 0:y.filter(ee=>ee!=null&&(!ee.repository.isFork||ee.repository.owner.login===i));return j==null||j.length===0?void 0:(j.length>1&&j.sort((ee,ue)=>(ee.repository.owner.login===i?-1:1)-(ue.repository.owner.login===i?-1:1)||(ee.state==="MERGED"?-1:1)-(ue.state==="MERGED"?-1:1)||new Date(ue.updatedAt).getTime()-new Date(ee.updatedAt).getTime()),Me.GitHubPullRequest.from(j[0],n))}catch(N){if(N instanceof b.Ww)return;throw this.handleException(N,n,U)}}async getBlame(n,s,i,u,a){var l,d,g,p,y;const U=(0,A.UH)();try{const N=`query getBlameRanges(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String!
) {
	viewer { name }
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			...on Commit {
				blame(path: $path) {
					ranges {
						startingLine
						endingLine
						commit {
							oid
							parents(first: 3) { nodes { oid } }
							message
							additions
							changedFiles
							deletions
							author {
								avatarUrl
								date
								email
								name
							}
							committer {
								date
								email
								name
							}
						}
					}
				}
			}
		}
	}
}`,K=await this.graphql(void 0,n,N,{owner:s,repo:i,ref:u,path:a},U);if(K==null)return Je;const j=(g=(d=(l=K.repository)==null?void 0:l.object)==null?void 0:d.blame)==null?void 0:g.ranges;return j==null||j.length===0?{ranges:[],viewer:(p=K.viewer)==null?void 0:p.name}:{ranges:j,viewer:(y=K.viewer)==null?void 0:y.name}}catch(N){if(N instanceof b.Ww)return Je;throw this.handleException(N,void 0,U)}}async getBranches(n,s,i,u){var a;const l=(0,A.UH)();try{const d=`query getBranches(
	$owner: String!
	$repo: String!
	$branchQuery: String
	$cursor: String
	$limit: Int = 100
) {
	repository(owner: $owner, name: $repo) {
		refs(query: $branchQuery, refPrefix: "refs/heads/", first: $limit, after: $cursor, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			pageInfo {
				endCursor
				hasNextPage
			}
			nodes {
				name
				target {
					oid
					commitUrl
					...on Commit {
						authoredDate
						committedDate
					}
				}
			}
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:s,repo:i,branchQuery:u?.query,cursor:u?.cursor,limit:Math.min(100,u?.limit??100)},l);if(g==null)return Ce;const p=(a=g.repository)==null?void 0:a.refs;return p==null?Ce:{paging:{cursor:p.pageInfo.endCursor,more:p.pageInfo.hasNextPage},values:p.nodes}}catch(d){if(d instanceof b.Ww)return Ce;throw this.handleException(d,void 0,l)}}async getCommit(n,s,i,u){var a,l,d,g,p,y,U,N,K,j;const ee=(0,A.UH)();try{const ue=await this.request(void 0,n,"GET /repos/{owner}/{repo}/commits/{ref}",{owner:s,repo:i,ref:u},ee),be=ue?.data;if(be==null)return;const{commit:Re}=be;return{oid:be.sha,parents:{nodes:be.parents.map(Ye=>({oid:Ye.sha}))},message:Re.message,additions:(a=be.stats)==null?void 0:a.additions,changedFiles:(l=be.files)==null?void 0:l.length,deletions:(d=be.stats)==null?void 0:d.deletions,author:{avatarUrl:((g=be.author)==null?void 0:g.avatar_url)??void 0,date:((p=Re.author)==null?void 0:p.date)??new Date().toString(),email:((y=Re.author)==null?void 0:y.email)??void 0,name:((U=Re.author)==null?void 0:U.name)??""},committer:{date:((N=Re.committer)==null?void 0:N.date)??new Date().toString(),email:((K=Re.committer)==null?void 0:K.email)??void 0,name:((j=Re.committer)==null?void 0:j.name)??""},files:be.files}}catch(ue){if(ue instanceof b.Ww)return;throw this.handleException(ue,void 0,ee)}}async getCommitForFile(n,s,i,u,a){if(G.p.isSha(u))return this.getCommit(n,s,i,u);const l=await this.getCommits(n,s,i,u,{limit:1,path:a});return l.values.length===0?void 0:{...await this.getCommit(n,s,i,l.values[0].oid)??l.values[0],viewer:l.viewer}}async getCommitBranches(n,s,i,u,a){var l,d;const g=(0,A.UH)();try{const p=`query getCommitBranches(
	$owner: String!
	$repo: String!
	$since: GitTimestamp!
	$until: GitTimestamp!
) {
	repository(owner: $owner, name: $repo) {
		refs(first: 20, refPrefix: "refs/heads/", orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			nodes {
				name
				target {
					... on Commit {
						history(first: 3, since: $since until: $until) {
							nodes { oid }
						}
					}
				}
			}
		}
	}
}`,y=await this.graphql(void 0,n,p,{owner:s,repo:i,since:a.toISOString(),until:a.toISOString()},g),U=(d=(l=y?.repository)==null?void 0:l.refs)==null?void 0:d.nodes;if(U==null)return[];const N=[];for(const K of U)for(const j of K.target.history.nodes)if(j.oid===u){N.push(K.name);break}return N}catch(p){if(p instanceof b.Ww)return[];throw this.handleException(p,void 0,g)}}async getCommitCount(n,s,i,u){var a,l;const d=(0,A.UH)();try{const g=`query getCommitCount(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	repository(owner: $owner, name: $repo) {
		ref(qualifiedName: $ref) {
			target {
				... on Commit {
					history(first: 1) {
						totalCount
					}
				}
			}
		}
	}
}`,p=await this.graphql(void 0,n,g,{owner:s,repo:i,ref:u},d);return(l=(a=p?.repository)==null?void 0:a.ref)==null?void 0:l.target.history.totalCount}catch(g){if(g instanceof b.Ww)return;throw this.handleException(g,void 0,d)}}async getCommitOnBranch(n,s,i,u,a,l){var d;const g=(0,A.UH)();try{const p=`query getCommitOnBranch(
	$owner: String!
	$repo: String!
	$ref: String!
	$since: GitTimestamp!
	$until: GitTimestamp!
) {
	repository(owner: $owner, name: $repo) {
		ref(qualifiedName: $ref) {
			target {
				... on Commit {
					history(first: 3, since: $since until: $until) {
						nodes { oid }
					}
				}
			}
		}
	}
}`,y=await this.graphql(void 0,n,p,{owner:s,repo:i,ref:`refs/heads/${u}`,since:l.toISOString(),until:l.toISOString()},g),U=(d=y?.repository)==null?void 0:d.ref.target.history.nodes;if(U==null)return[];const N=[];for(const K of U)if(K.oid===a){N.push(u);break}return N}catch(p){if(p instanceof b.Ww)return[];throw this.handleException(p,void 0,g)}}async getCommits(n,s,i,u,a){var l,d,g,p;const y=(0,A.UH)();if(a?.limit===1&&a?.path==null)return this.getCommitsCoreSingle(n,s,i,u);try{const U=`query getCommits(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String
	$author: CommitAuthor
	$after: String
	$before: String
	$limit: Int = 100
	$since: GitTimestamp
	$until: GitTimestamp
) {
	viewer { name }
	repository(name: $repo, owner: $owner) {
		object(expression: $ref) {
			... on Commit {
				history(first: $limit, author: $author, path: $path, after: $after, before: $before, since: $since, until: $until) {
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
					nodes {
						... on Commit {
							oid
							message
							parents(first: 3) { nodes { oid } }
							additions
							changedFiles
							deletions
							author {
								avatarUrl
								date
								email
								name
							}
							committer {
								 date
								 email
								 name
							 }
						}
					}
				}
			}
		}
	}
}`;let N;if(a?.authors!=null)if(a.authors.length===1){const[ee]=a.authors;N={id:ee.id,emails:ee.email?[ee.email]:void 0}}else{const ee=a.authors.filter(ue=>ue.email).map(ue=>ue.email);N=ee.length?{emails:ee}:void 0}const K=await this.graphql(void 0,n,U,{owner:s,repo:i,ref:u,after:a?.after,before:a?.before,path:a?.path,author:N,limit:Math.min(100,a?.limit??100),since:typeof a?.since=="string"?a?.since:(l=a?.since)==null?void 0:l.toISOString(),until:typeof a?.until=="string"?a?.until:(d=a?.until)==null?void 0:d.toISOString()},y),j=(p=(g=K?.repository)==null?void 0:g.object)==null?void 0:p.history;return j==null?Ce:{paging:j.pageInfo.endCursor!=null?{cursor:j.pageInfo.endCursor??void 0,more:j.pageInfo.hasNextPage}:void 0,values:j.nodes,viewer:K?.viewer.name}}catch(U){if(U instanceof b.Ww)return Ce;throw this.handleException(U,void 0,y)}}async getCommitsCoreSingle(n,s,i,u){var a;const l=(0,A.UH)();try{const d=`query getCommit(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	viewer { name }
	repository(name: $repo owner: $owner) {
		object(expression: $ref) {
			...on Commit {
				oid
				parents(first: 3) { nodes { oid } }
				message
				additions
				changedFiles
				deletions
				author {
					avatarUrl
					date
					email
					name
				}
				committer {
					date
					email
					name
				}
			}
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:s,repo:i,ref:u},l);if(g==null)return Ce;const p=(a=g.repository)==null?void 0:a.object;return p!=null?{values:[p],viewer:g.viewer.name}:Ce}catch(d){if(d instanceof b.Ww)return Ce;throw this.handleException(d,void 0,l)}}async getCommitRefs(n,s,i,u,a){var l,d;const g=(0,A.UH)();try{const p=`query getCommitRefs(
	$owner: String!
	$repo: String!
	$ref: String!
	$after: String
	$before: String
	$first: Int
	$last: Int
	$path: String
	$since: GitTimestamp
	$until: GitTimestamp
) {
	repository(name: $repo, owner: $owner) {
		object(expression: $ref) {
			... on Commit {
				history(first: $first, last: $last, path: $path, since: $since, until: $until, after: $after, before: $before) {
					pageInfo { startCursor, endCursor, hasNextPage, hasPreviousPage }
					totalCount
					nodes { oid }
				}
			}
		}
	}
}`,y=await this.graphql(void 0,n,p,{owner:s,repo:i,ref:u,path:a?.path,first:a?.first,last:a?.last,after:a?.after,before:a?.before,since:a?.since,until:a?.until},g),U=(d=(l=y?.repository)==null?void 0:l.object)==null?void 0:d.history;return U==null?void 0:{pageInfo:U.pageInfo,totalCount:U.totalCount,values:U.nodes}}catch(p){if(p instanceof b.Ww)return;throw this.handleException(p,void 0,g)}}async getNextCommitRefs(n,s,i,u,a,l){const d=await this.getCommitDate(n,s,i,l);if(d==null)return[];let g=await this.getCommitRefs(n,s,i,u,{path:a,first:1,since:d});if(g==null)return[];const p=`${g.pageInfo.startCursor.split(" ",1)[0]} ${g.totalCount}`;let y;if([,y]=p.split(" ",2),y=Math.min(parseInt(y,10),5),g=await this.getCommitRefs(n,s,i,u,{path:a,last:y,before:p}),g==null)return[];const U=[];for(const{oid:N}of g.values){if(N===l)break;U.push(N)}return U.reverse()}async getCommitDate(n,s,i,u){var a,l;const d=(0,A.UH)();try{const g=`query getCommitDate(
	$owner: String!
	$repo: String!
	$sha: GitObjectID!
) {
	repository(name: $repo, owner: $owner) {
		object(oid: $sha) {
			... on Commit { committer { date } }
		}
	}
}`,p=await this.graphql(void 0,n,g,{owner:s,repo:i,sha:u},d);return(l=(a=p?.repository)==null?void 0:a.object)==null?void 0:l.committer.date}catch(g){if(g instanceof b.Ww)return;throw this.handleException(g,void 0,d)}}async getContributors(n,s,i){const u=(0,A.UH)();try{const a=await this.request(void 0,n,"GET /repos/{owner}/{repo}/contributors",{owner:s,repo:i,per_page:100},u);return a?.data==null?[]:a.data}catch(a){if(a instanceof b.Ww)return[];throw this.handleException(a,void 0,u)}}async getDefaultBranchName(n,s,i){var u,a;const l=(0,A.UH)();try{const d=`query getDefaultBranch(
	$owner: String!
	$repo: String!
) {
	repository(owner: $owner, name: $repo) {
		defaultBranchRef {
			name
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:s,repo:i},l);return g==null?void 0:((a=(u=g.repository)==null?void 0:u.defaultBranchRef)==null?void 0:a.name)??void 0}catch(d){if(d instanceof b.Ww)return;throw this.handleException(d,void 0,l)}}async getCurrentUser(n,s,i){var u,a,l,d;const g=(0,A.UH)();try{const p=`query getCurrentUser(
	$owner: String!
	$repo: String!
) {
	viewer { name, email, login, id }
	repository(owner: $owner, name: $repo) { viewerPermission }
}`,y=await this.graphql(void 0,n,p,{owner:s,repo:i},g);return y==null?void 0:{name:(u=y.viewer)==null?void 0:u.name,email:(a=y.viewer)==null?void 0:a.email,username:(l=y.viewer)==null?void 0:l.login,id:(d=y.viewer)==null?void 0:d.id}}catch(p){if(p instanceof b.Ww)return;throw this.handleException(p,void 0,g)}}async getRepositoryVisibility(n,s,i){var u;const a=(0,A.UH)();try{const l=`query getRepositoryVisibility(
	$owner: String!
	$repo: String!
) {
	repository(owner: $owner, name: $repo) {
		visibility
	}
}`,d=await this.graphql(void 0,n,l,{owner:s,repo:i},a);return((u=d?.repository)==null?void 0:u.visibility)==null?void 0:d.repository.visibility==="PUBLIC"?L.q.Public:L.q.Private}catch(l){if(l instanceof b.Ww)return;throw this.handleException(l,void 0,a)}}async getTags(n,s,i,u){var a;const l=(0,A.UH)();try{const d=`query getTags(
	$owner: String!
	$repo: String!
	$tagQuery: String
	$cursor: String
	$limit: Int = 100
) {
	repository(owner: $owner, name: $repo) {
		refs(query: $tagQuery, refPrefix: "refs/tags/", first: $limit, after: $cursor, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
			pageInfo {
				endCursor
				hasNextPage
			}
			nodes {
				name
				target {
					oid
					commitUrl
					...on Commit {
						authoredDate
						committedDate
						message
					}
					...on Tag {
						message
						tagger { date }
					}
				}
			}
		}
	}
}`,g=await this.graphql(void 0,n,d,{owner:s,repo:i,tagQuery:u?.query,cursor:u?.cursor,limit:Math.min(100,u?.limit??100)},l);if(g==null)return Ce;const p=(a=g.repository)==null?void 0:a.refs;return p==null?Ce:{paging:{cursor:p.pageInfo.endCursor,more:p.pageInfo.hasNextPage},values:p.nodes}}catch(d){if(d instanceof b.Ww)return Ce;throw this.handleException(d,void 0,l)}}async resolveReference(n,s,i,u,a){var l,d,g,p,y,U;const N=(0,A.UH)();try{if(!a){const ee=`query resolveReference(
	$owner: String!
	$repo: String!
	$ref: String!
) {
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			oid
		}
	}
}`,ue=await this.graphql(void 0,n,ee,{owner:s,repo:i,ref:u},N);return((d=(l=ue?.repository)==null?void 0:l.object)==null?void 0:d.oid)??void 0}const K=`query resolveReference(
	$owner: String!
	$repo: String!
	$ref: String!
	$path: String!
) {
	repository(owner: $owner, name: $repo) {
		object(expression: $ref) {
			... on Commit {
				history(first: 1, path: $path) {
					nodes { oid }
				}
			}
		}
	}
}`,j=await this.graphql(void 0,n,K,{owner:s,repo:i,ref:u,path:a},N);return((U=(y=(p=(g=j?.repository)==null?void 0:g.object)==null?void 0:p.history.nodes)==null?void 0:y[0])==null?void 0:U.oid)??void 0}catch(K){if(K instanceof b.Ww)return;throw this.handleException(K,void 0,N)}}async searchCommits(n,s,i){const u=(0,A.UH)(),a=Math.min(100,i?.limit??100);let l,d,g;i?.cursor!=null?([l,d,g]=i.cursor.split(" ",3),l=parseInt(l,10),d=parseInt(d,10),g=parseInt(g,10)):(l=1,d=a,g=0);try{const p=await this.request(void 0,n,"GET /search/commits",{q:s,sort:i?.sort,order:i?.order,per_page:d,page:l},u),y=p?.data;if(y==null||y.items.length===0)return;const U=y.items.map(j=>{var ee,ue,be,Re,Ye,Ze,et,tt,rt,nt,it,ot,st;return{oid:j.sha,parents:{nodes:j.parents.map(ut=>({oid:ut.sha}))},message:j.commit.message,author:{avatarUrl:((ee=j.author)==null?void 0:ee.avatar_url)??void 0,date:((ue=j.commit.author)==null?void 0:ue.date)??((be=j.commit.author)==null?void 0:be.date)??new Date().toString(),email:((Re=j.author)==null?void 0:Re.email)??((Ye=j.commit.author)==null?void 0:Ye.email)??void 0,name:((Ze=j.author)==null?void 0:Ze.name)??((et=j.commit.author)==null?void 0:et.name)??""},committer:{date:((tt=j.commit.committer)==null?void 0:tt.date)??((rt=j.committer)==null?void 0:rt.date)??new Date().toString(),email:((nt=j.committer)==null?void 0:nt.email)??((it=j.commit.committer)==null?void 0:it.email)??void 0,name:((ot=j.committer)==null?void 0:ot.name)??((st=j.commit.committer)==null?void 0:st.name)??""}}}),N=g+y.items.length,K=y.incomplete_results||y.total_count>N;return{pageInfo:{startCursor:`${l} ${d} ${g}`,endCursor:K?`${l+1} ${d} ${N}`:void 0,hasPreviousPage:y.total_count>0&&l>1,hasNextPage:K},totalCount:y.total_count,values:U}}catch(p){if(p instanceof b.Ww)return;throw this.handleException(p,void 0,u)}}async searchCommitShas(n,s,i){const u=(0,A.UH)(),a=Math.min(100,i?.limit??100);let l,d,g;i?.cursor!=null?([l,d,g]=i.cursor.split(" ",3),l=parseInt(l,10),d=parseInt(d,10),g=parseInt(g,10)):(l=1,d=a,g=0);try{const p=await this.request(void 0,n,"GET /search/commits",{q:s,sort:i?.sort,order:i?.order,per_page:d,page:l},u),y=p?.data;if(y==null||y.items.length===0)return;const U=g+y.items.length,N=y.incomplete_results||y.total_count>U;return{pageInfo:{startCursor:`${l} ${d} ${g}`,endCursor:N?`${l+1} ${d} ${U}`:void 0,hasPreviousPage:y.total_count>0&&l>1,hasNextPage:N},totalCount:y.total_count,values:y.items.map(K=>{var j;return{sha:K.sha,authorDate:new Date(K.commit.author.date).getTime(),committerDate:new Date(((j=K.commit.committer)==null?void 0:j.date)??K.commit.author.date).getTime()}})}}catch(p){if(p instanceof b.Ww)return;throw this.handleException(p,void 0,u)}}async getEnterpriseVersion(n,s,i){var u;let a=this._enterpriseVersions.get(s);if(a!=null)return a;if(a===null)return;const l=(0,A.UH)();try{const d=await this.request(n,s,"GET /meta",i,l),g=(u=d?.data)==null?void 0:u.installed_version;a=g?(0,se.mL)(g):null}catch{a=null}return this._enterpriseVersions.set(s,a),a??void 0}octokit(n,s){let i=this._octokits.get(n);if(i==null){let a;if(x.$L){let l=F(function(d,g){if(g.headers!=null){const{"user-agent":p,...y}=g.headers;p&&(g.headers=y)}return(0,q.he)(d,g)},"fetchCore2");var u=l;a=I.defaults({auth:`token ${n}`,request:{fetch:l}})}else a=I.defaults({auth:`token ${n}`,request:{agent:this.proxyAgent}});i=new a(s),this._octokits.set(n,i),(Y.Y.logLevel===Y.i.Debug||Y.Y.isDebugging)&&i.hook.wrap("request",async(l,d)=>{const g=new oe.u(`[GITHUB] ${d.method} ${d.url}`,{log:!1});try{return await l(d)}finally{let p;try{if(typeof d.query=="string"){const y=/(^[^({\n]+)/.exec(d.query);p=` ${y?.[1].trim()??d.query}`}}catch{}g.stop({message:p})}})}return i}async graphql(n,s,i,u,a){var l,d,g,p,y;try{return await(0,q.a_)(n?.getIgnoreSSLErrors()??!1,()=>this.octokit(s).graphql(i,u))}catch(U){if(U instanceof Be){switch((d=(l=U.errors)==null?void 0:l[0])==null?void 0:d.type){case"NOT_FOUND":throw new b.Ww(U);case"FORBIDDEN":throw new b._7("github",b.Jx.Forbidden,U);case"RATE_LIMITED":{let N;const K=(g=U.headers)==null?void 0:g["x-ratelimit-reset"];throw K!=null&&(N=parseInt(K,10),Number.isNaN(N)&&(N=void 0)),new b.yx(U,s,N)}}Y.Y.isDebugging&&D.window.showErrorMessage(`GitHub request failed: ${((y=(p=U.errors)==null?void 0:p[0])==null?void 0:y.message)??U.message}`)}else U instanceof ve?this.handleRequestError(n,s,U,a):Y.Y.isDebugging&&D.window.showErrorMessage(`GitHub request failed: ${U.message}`);throw U}}async request(n,s,i,u,a){try{return await(0,q.a_)(n?.getIgnoreSSLErrors()??!1,()=>this.octokit(s).request(i,u))}catch(l){throw l instanceof ve?this.handleRequestError(n,s,l,a):Y.Y.isDebugging&&D.window.showErrorMessage(`GitHub request failed: ${l.message}`),l}}handleRequestError(n,s,i,u){var a,l,d,g,p;switch(i.status){case 404:case 410:case 422:throw new b.Ww(i);case 401:throw new b._7("github",b.Jx.Unauthorized,i);case 403:if(i.message.includes("rate limit")){let y;const U=(l=(a=i.response)==null?void 0:a.headers)==null?void 0:l["x-ratelimit-reset"];throw U!=null&&(y=parseInt(U,10),Number.isNaN(y)&&(y=void 0)),new b.yx(i,s,y)}throw new b._7("github",b.Jx.Forbidden,i);case 500:Y.Y.error(i,u),i.response!=null&&(n?.trackRequestException(),(0,O.vF)(`${n?.name??"GitHub"} failed to respond and might be experiencing issues.${n?.custom?"":" Please visit the [GitHub status page](https://githubstatus.com) for more information."}`));return;case 502:if(Y.Y.error(i,u),i.message.includes("timeout")){n?.trackRequestException(),(0,O.s$)(n?.name??"GitHub");return}break;default:if(i.status>=400&&i.status<500)throw new b.Bn(i);break}Y.Y.error(i,u),Y.Y.isDebugging&&D.window.showErrorMessage(`GitHub request failed: ${((p=(g=(d=i.response)==null?void 0:d.errors)==null?void 0:g[0])==null?void 0:p.message)??i.message}`)}handleException(n,s,i){return Y.Y.error(n,i),n instanceof b._7&&this.showAuthenticationErrorMessage(n,s),n}async showAuthenticationErrorMessage(n,s){if(n.reason===b.Jx.Unauthorized||n.reason===b.Jx.Forbidden){const i="Reauthenticate";await D.window.showErrorMessage(`${n.message}. Would you like to try reauthenticating${n.reason===b.Jx.Forbidden?" to provide additional access":""}?`,i)===i&&(await s?.reauthenticate(),this._onDidReauthenticate.fire())}else D.window.showErrorMessage(n.message)}async createEnterpriseAvatarUrl(n,s,i,u,a){a=a??16;const l=await this.getEnterpriseVersion(n,s,{baseUrl:i});if((0,se.L5)(l,">= 3.0.0")){let d;const g=(0,_.at)(u);g!=null&&D.Uri.parse(i).authority===g.authority&&(g.userId!=null?d=`${i}/enterprise/avatars/u/${encodeURIComponent(g.userId)}?s=${a}`:g.login!=null&&(d=`${i}/enterprise/avatars/${encodeURIComponent(g.login)}?s=${a}`)),d==null&&(d=`${i}/enterprise/avatars/u/e?email=${encodeURIComponent(u)}&s=${a}`);const p=await(0,q.a_)(n?.getIgnoreSSLErrors()??!1,()=>(0,q.he)(d,{method:"GET",headers:{Authorization:`Bearer ${s}`}}));if(p.ok){const y=(0,z.US)(new Uint8Array(await p.arrayBuffer()));return`data:${p.headers.get("content-type")};base64,${y}`}}return`https://avatars.githubusercontent.com/u/e?email=${encodeURIComponent(u)}&s=${a}`}}F(ne,"GitHubApi"),ae([(0,A.fF)({args:{0:c=>c.name,1:"<token>"}})],ne.prototype,"getAccountForCommit",1),ae([(0,A.fF)({args:{0:c=>c.name,1:"<token>"}})],ne.prototype,"getAccountForEmail",1),ae([(0,A.fF)({args:{0:c=>c.name,1:"<token>"}})],ne.prototype,"getDefaultBranch",1),ae([(0,A.fF)({args:{0:c=>c.name,1:"<token>"}})],ne.prototype,"getIssueOrPullRequest",1),ae([(0,A.fF)({args:{0:c=>c.name,1:"<token>"}})],ne.prototype,"getPullRequestForBranch",1),ae([(0,A.fF)({args:{0:c=>c.name,1:"<token>"}})],ne.prototype,"getPullRequestForCommit",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getBlame",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getBranches",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCommit",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCommitForFile",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCommitBranches",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCommitCount",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCommitOnBranch",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCommits",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCommitRefs",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getNextCommitRefs",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getContributors",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getDefaultBranchName",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getCurrentUser",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getRepositoryVisibility",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getTags",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"resolveReference",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"searchCommits",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"searchCommitShas",1),ae([(0,A.fF)({args:{0:"<token>"}})],ne.prototype,"getEnterpriseVersion",1);function Qe(c){return c?.baseUrl==null||c.baseUrl==="https://api.github.com"}F(Qe,"isGitHubDotCom")},3333:(me,ce,S)=>{"use strict";S.r(ce),S.d(ce,{GitHubGitProvider:()=>E});var P=S(9496),Z=S(7267),k=S(9179),W=S(1045),V=S(313),le=S(2721),X=S(5396),pe=S(6532),ie=S(3497),ge=S(5059),de=S(2324),he=S(2742),Q=S(8031),xe=S(9735),te=S(3901),$e=S(4905),re=S(3082),Ee=S(2804),ke=S(8991),Ie=S(3492),Ve=S(6016),Te=S(189),Pe=S(3969),J=S(2436),Ue=S(5861),w=S(7369),Ae=S(2886),ye=S(516),Se=S(680),Fe=S(8587),Le=S(2378);async function je(H){try{const e=P.extensions.getExtension("ms-vscode.remote-repositories")??P.extensions.getExtension("GitHub.remotehub");if(e==null)throw J.Y.log("GitHub Repositories extension is not installed or enabled"),new X.R5("GitHub Repositories","GitHub.remotehub");return e.isActive?e.exports:await e.activate()}catch(e){if(J.Y.error(e,"Unable to get required api from the GitHub Repositories extension"),e instanceof X.R5,H)return;throw e}}F(je,"getRemoteHubApi");var We=(H=>(H[H.Branch=0]="Branch",H[H.RemoteBranch=1]="RemoteBranch",H[H.Tag=2]="Tag",H[H.Commit=3]="Commit",H))(We||{}),ze=(H=>(H[H.Branch=0]="Branch",H[H.Tag=1]="Tag",H[H.Commit=2]="Commit",H[H.PullRequest=3]="PullRequest",H[H.Tree=4]="Tree",H))(ze||{}),ve=S(8301),Oe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,Ge=F((H,e,r)=>e in H?Oe(H,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):H[e]=r,"__defNormalProp"),M=F((H,e,r,t)=>{for(var o=t>1?void 0:t?Xe(e,r):e,m=H.length-1,h;m>=0;m--)(h=H[m])&&(o=(t?h(e,r,o):h(o))||o);return t&&o&&Oe(e,r,o),o},"__decorateClass"),fe=F((H,e,r)=>(Ge(H,typeof e!="symbol"?e+"":e,r),r),"__publicField");const Ne=/"/g,De=Object.freeze({values:[]}),_e=Promise.resolve(void 0),qe=["repo","read:user","user:email"],Be=/^[^/](?!.*\/\.)(?!.*\.\.)(?!.*\/\/)(?!.*@\{)[^\000-\037\177 ~^:?*[\\]+[^./]$/;class E{constructor(e){this.container=e,fe(this,"descriptor",{id:ge.p.GitHub,name:"GitHub",virtual:!0}),fe(this,"supportedSchemes",new Set([W.sN.Virtual,W.sN.GitHub,W.sN.PRs])),fe(this,"_onDidChangeRepository",new P.EventEmitter),fe(this,"_onDidCloseRepository",new P.EventEmitter),fe(this,"_onDidOpenRepository",new P.EventEmitter),fe(this,"_branchesCache",new Map),fe(this,"_repoInfoCache",new Map),fe(this,"_tagsCache",new Map),fe(this,"_disposables",[]),fe(this,"_github"),fe(this,"_remotehub"),fe(this,"_remotehubPromise"),fe(this,"_sessionPromise"),this._disposables.push(P.authentication.onDidChangeSessions(this.onAuthenticationSessionsChanged,this))}get onDidChangeRepository(){return this._onDidChangeRepository.event}get onDidCloseRepository(){return this._onDidCloseRepository.event}get onDidOpenRepository(){return this._onDidOpenRepository.event}dispose(){this._disposables.forEach(e=>void e.dispose())}onAuthenticationSessionsChanged(e){e.provider.id==="github"&&(this._sessionPromise=void 0,this.ensureSession(!1,!0))}onRepositoryChanged(e,r){this._branchesCache.delete(e.path),this._tagsCache.delete(e.path),this._repoInfoCache.delete(e.path),this._onDidChangeRepository.fire(r)}async discoverRepositories(e){if(!this.supportedSchemes.has(e.scheme))return[];try{const{remotehub:r}=await this.ensureRepositoryContext(e.toString(),!0),t=r.getVirtualWorkspaceUri(e);return t==null?[]:this.openRepository(void 0,t,!0)}catch{return[]}}updateContext(){(0,V.v)(W.zf.HasVirtualFolders,this.container.git.hasOpenRepositories(this.descriptor.id))}openRepository(e,r,t,o,m){return[new ke._j(this.container,this.onRepositoryChanged.bind(this),this.descriptor,e,r,t,o??!P.window.state.focused,m)]}async supports(e){switch(e){case pe.A.Stashes:case pe.A.Worktrees:return!1;default:return!0}}async visibility(e){const r=await this.getRemotes(e);if(r.length===0)return ge.q.Local;const t=r.find(o=>o.name==="origin");return t!=null?this.getRemoteVisibility(t):ge.q.Private}async getRemoteVisibility(e){var r;switch((r=e.provider)==null?void 0:r.id){case"github":{const{github:t,metadata:o,session:m}=await this.ensureRepositoryContext(e.repoPath);return await t.getRepositoryVisibility(m.accessToken,o.repo.owner,o.repo.name)??ge.q.Private}default:return ge.q.Private}}async getOpenScmRepositories(){return[]}async getScmRepository(e){}async getOrOpenScmRepository(e){}canHandlePathOrUri(e,r){if(!!this.supportedSchemes.has(e))return typeof r=="string"?r:r.toString()}getAbsoluteUri(e,r){if(typeof r=="string")if((0,ye.tE)(r))r=P.Uri.parse(r,!0);else throw P.window.showErrorMessage(`Unable to get absolute uri between ${typeof e=="string"?e:e.toString(!0)} and ${r}; Base path '${r}' must be a uri`),new Error(`Base path '${r}' must be a uri`);if(typeof e=="string"&&!(0,ye.tE)(e)&&!(0,ye.YP)(e))return P.Uri.joinPath(r,(0,ye.AH)(e));const t=this.getRelativePath(e,r);return P.Uri.joinPath(r,t)}async getBestRevisionUri(e,r,t){return t?this.createProviderUri(e,t,r):this.createVirtualUri(e,t,r)}getRelativePath(e,r){if(typeof r=="string")if((0,ye.tE)(r))r=P.Uri.parse(r,!0);else throw P.window.showErrorMessage(`Unable to get relative path between ${typeof e=="string"?e:e.toString(!0)} and ${r}; Base path '${r}' must be a uri`),new Error(`Base path '${r}' must be a uri`);let t;if(typeof e=="string")if((0,ye.tE)(e))e=P.Uri.parse(e,!0);else return e=(0,ye.AH)(e),t=(0,ye.YP)(e)&&e.startsWith(r.path)?e.slice(r.path.length):e,t.charCodeAt(0)===W.mN.Slash&&(t=t.slice(1)),t;return t=(0,ye.AH)((0,ye.Gf)(r.path.slice(1),e.path.slice(1))),t}getRevisionUri(e,r,t){const o=this.createProviderUri(e,t,r);return t===re.p.deletedOrMissing?o.with({query:"~"}):o}async getWorkingUri(e,r){return this.createVirtualUri(e,void 0,r.path)}async addRemote(e,r,t){}async pruneRemote(e,r){}async applyChangesToWorkingFile(e,r,t){}async branchContainsCommit(e,r,t){return!1}async checkout(e,r,t){}resetCaches(...e){(e.length===0||e.includes("branches"))&&this._branchesCache.clear(),(e.length===0||e.includes("tags"))&&this._tagsCache.clear(),e.length===0&&this._repoInfoCache.clear()}async excludeIgnoredUris(e,r){return r}async fetch(e,r){}async findRepositoryUri(e,r){const t=(0,w.UH)();try{return(await this.ensureRemoteHubApi()).getProviderRootUri(e).with({scheme:W.sN.Virtual})}catch(o){o instanceof X.R5,J.Y.error(o,t);return}}async getAheadBehindCommitCount(e,r){}async getBlame(e,r){const t=(0,w.UH)();if(r?.isDirty)return;let o="blame";e.sha!=null&&(o+=`:${e.sha}`);const m=await this.container.tracker.getOrAdd(e);if(m.state!=null){const v=m.state.getBlame(o);if(v!=null)return J.Y.debug(t,`Cache hit: '${o}'`),v.item}J.Y.debug(t,`Cache miss: '${o}'`),m.state==null&&(m.state=new Le.p2);const h=this.getBlameCore(e,m,o,t);if(m.state!=null){J.Y.debug(t,`Cache add: '${o}'`);const v={item:h};m.state.setBlame(o,v)}return h}async getBlameCore(e,r,t,o){var m,h;try{const v=await this.ensureRepositoryContext(e.repoPath);if(v==null)return;const{metadata:f,github:C,remotehub:$,session:T}=v,R=$.getVirtualUri($.getProviderRootUri(e)),I=this.getRelativePath(e,R);if(e.scheme===W.sN.Virtual){const[G,_]=await Promise.allSettled([P.workspace.fs.stat(e),P.workspace.fs.stat(e.with({scheme:W.sN.GitHub}))]);if(G.status!=="fulfilled"||_.status!=="fulfilled"||G.value.mtime!==_.value.mtime)return}const D=!e.sha||e.sha==="HEAD"?(await f.getRevision()).revision:e.sha,q=await C.getBlame(T.accessToken,f.repo.owner,f.repo.name,D,I),x=new Map,B=new Map,b=[];for(const G of q.ranges){const _=G.commit,{viewer:Y=T.account.label}=q,O=Y!=null&&_.author.name===Y?"You":_.author.name,A=Y!=null&&_.committer.name===Y?"You":_.committer.name;let oe=x.get(O);oe==null&&(oe={name:O,lineCount:0},x.set(O,oe)),oe.lineCount+=G.endingLine-G.startingLine+1;let z=B.get(_.oid);z==null&&(z=new Q.aM(this.container,e.repoPath,_.oid,new Q._j(O,_.author.email,new Date(_.author.date),_.author.avatarUrl),new Q._j(A,_.committer.email,new Date(_.author.date)),_.message.split(`
`,1)[0],(m=_.parents.nodes[0])!=null&&m.oid?[(h=_.parents.nodes[0])==null?void 0:h.oid]:[],_.message,new te.K8(R.toString(),I,te.NV.Modified),{changedFiles:_.changedFiles??0,additions:_.additions??0,deletions:_.deletions??0},[]),B.set(_.oid,z));for(let se=G.startingLine;se<=G.endingLine;se++){const Me={sha:_.oid,originalLine:se,line:se};z.lines.push(Me),b[se-1]=Me}}const L=new Map([...x.entries()].sort((G,_)=>_[1].lineCount-G[1].lineCount));return{repoPath:e.repoPath,authors:L,commits:B,lines:b}}catch(v){if(r.state!=null&&!String(v).includes("No provider registered with")){const f=v?.toString()??"";J.Y.debug(o,`Cache replace (with empty promise): '${t}'`);const C={item:_e,errorMessage:f};return r.state.setBlame(t,C),r.setBlameFailure(),_e}return}}async getBlameContents(e,r){}async getBlameForLine(e,r,t,o){var m,h;const v=(0,w.UH)();if(!t?.isDirty){if(!o?.forceSingleLine){const f=await this.getBlame(e);if(f==null)return;let C=f.lines[r];if(C==null){if(f.lines.length!==r)return;C=f.lines[r-1]}const $=f.commits.get(C.sha);return $==null?void 0:{author:{...f.authors.get($.author.name),lineCount:$.lines.length},commit:$,line:C}}try{const f=await this.ensureRepositoryContext(e.repoPath);if(f==null)return;const{metadata:C,github:$,remotehub:T,session:R}=f,I=T.getVirtualUri(T.getProviderRootUri(e)),D=this.getRelativePath(e,I),q=!e.sha||e.sha==="HEAD"?(await C.getRevision()).revision:e.sha,x=await $.getBlame(R.accessToken,C.repo.owner,C.repo.name,q,D),B=r+1,b=x.ranges.find(A=>A.startingLine===B);if(b==null)return;const L=b.commit,{viewer:G=R.account.label}=x,_=G!=null&&L.author.name===G?"You":L.author.name,Y=G!=null&&L.committer.name===G?"You":L.committer.name,O=new Q.aM(this.container,e.repoPath,L.oid,new Q._j(_,L.author.email,new Date(L.author.date),L.author.avatarUrl),new Q._j(Y,L.committer.email,new Date(L.author.date)),L.message.split(`
`,1)[0],(m=L.parents.nodes[0])!=null&&m.oid?[(h=L.parents.nodes[0])==null?void 0:h.oid]:[],L.message,new te.K8(I.toString(),D,te.NV.Modified),{changedFiles:L.changedFiles??0,additions:L.additions??0,deletions:L.deletions??0},[]);for(let A=b.startingLine;A<=b.endingLine;A++){const oe={sha:L.oid,originalLine:A,line:A};O.lines.push(oe)}return{author:{name:_,lineCount:b.endingLine-b.startingLine+1},commit:O,line:{sha:L.oid,originalLine:b.startingLine,line:b.startingLine}}}catch(f){J.Y.error(v,f);return}}}async getBlameForLineContents(e,r,t,o){}async getBlameForRange(e,r){const t=await this.getBlame(e);if(t!=null)return this.getBlameRange(t,e,r)}async getBlameForRangeContents(e,r,t){const o=await this.getBlameContents(e,t);if(o!=null)return this.getBlameRange(o,e,r)}getBlameRange(e,r,t){if(e.lines.length===0)return{allLines:e.lines,...e};if(t.start.line===0&&t.end.line===e.lines.length-1)return{allLines:e.lines,...e};const o=e.lines.slice(t.start.line,t.end.line+1),m=new Set(o.map(T=>T.sha)),h=t.start.line+1,v=t.end.line+1,f=new Map,C=new Map;for(const T of e.commits.values()){if(!m.has(T.sha))continue;const R=T.with({lines:T.lines.filter(D=>D.line>=h&&D.line<=v)});C.set(T.sha,R);let I=f.get(R.author.name);I==null&&(I={name:R.author.name,lineCount:0},f.set(I.name,I)),I.lineCount+=R.lines.length}const $=new Map([...f.entries()].sort((T,R)=>R[1].lineCount-T[1].lineCount));return{repoPath:r.repoPath,authors:$,commits:C,lines:o,allLines:e.lines}}async getBranch(e){const{values:[r]}=await this.getBranches(e,{filter:t=>t.current});return r}async getBranches(e,r){if(e==null)return De;const t=(0,w.UH)();let o=r?.cursor?void 0:this._branchesCache.get(e);if(o==null){async function h(){var v;try{const{metadata:f,github:C,session:$}=await this.ensureRepositoryContext(e),T=await f.getRevision(),R=T.type===0?T.name:void 0,I=[];let D=r?.cursor;const q=D==null;for(;;){const x=await C.getBranches($.accessToken,f.repo.owner,f.repo.name,{cursor:D});for(const B of x.values){const b=new Date(k.DN.get("advanced.commitOrdering")==="author-date"?B.target.authoredDate:B.target.committedDate),L=B.target.oid;I.push(new he.XI(e,B.name,!1,B.name===R,b,L,{name:`origin/${B.name}`,missing:!1}),new he.XI(e,`origin/${B.name}`,!0,!1,b,L))}if(!((v=x.paging)!=null&&v.more)||!q)return{...x,values:I};D=x.paging.cursor}}catch(f){return J.Y.error(f,t),this._branchesCache.delete(e),De}}F(h,"load"),o=h.call(this),r?.cursor==null&&this._branchesCache.set(e,o)}let m=await o;return r?.filter!=null&&(m={...m,values:m.values.filter(r.filter)}),r?.sort!=null&&(0,he.YF)(m.values,typeof r.sort=="boolean"?void 0:r.sort),m}async getChangedFilesCount(e,r){if(!r)return;const t=await this.getCommit(e,r);if(t?.stats==null)return;const{stats:o}=t,m=typeof o.changedFiles=="number"?o.changedFiles:o.changedFiles.added+o.changedFiles.changed+o.changedFiles.deleted;return{additions:o.additions,deletions:o.deletions,changedFiles:m}}async getCommit(e,r){var t;if(e==null)return;const o=(0,w.UH)();try{const{metadata:m,github:h,session:v}=await this.ensureRepositoryContext(e),f=await h.getCommit(v.accessToken,m.repo.owner,m.repo.name,r);if(f==null)return;const{viewer:C=v.account.label}=f,$=C!=null&&f.author.name===C?"You":f.author.name,T=C!=null&&f.committer.name===C?"You":f.committer.name;return new Q.aM(this.container,e,f.oid,new Q._j($,f.author.email,new Date(f.author.date),f.author.avatarUrl),new Q._j(T,f.committer.email,new Date(f.committer.date)),f.message.split(`
`,1)[0],f.parents.nodes.map(R=>R.oid),f.message,((t=f.files)==null?void 0:t.map(R=>new te.K8(e,R.filename??"",(0,ve.fromCommitFileStatus)(R.status)??te.NV.Modified,R.previous_filename,void 0,{additions:R.additions??0,deletions:R.deletions??0,changes:R.changes??0})))??[],{changedFiles:f.changedFiles??0,additions:f.additions??0,deletions:f.deletions??0},[])}catch(m){J.Y.error(m,o);return}}async getCommitBranches(e,r,t){if(e==null||t?.commitDate==null)return[];const o=(0,w.UH)();try{const{metadata:m,github:h,session:v}=await this.ensureRepositoryContext(e);let f;return t?.branch?f=await h.getCommitOnBranch(v.accessToken,m.repo.owner,m.repo.name,t?.branch,r,t?.commitDate):f=await h.getCommitBranches(v.accessToken,m.repo.owner,m.repo.name,r,t?.commitDate),f}catch(m){return J.Y.error(m,o),[]}}async getCommitCount(e,r){if(e==null)return;const t=(0,w.UH)();try{const{metadata:o,github:m,session:h}=await this.ensureRepositoryContext(e);return await m.getCommitCount(h?.accessToken,o.repo.owner,o.repo.name,r)}catch(o){J.Y.error(o,t);return}}async getCommitForFile(e,r,t){var o;if(e==null)return;const m=(0,w.UH)();try{const{metadata:h,github:v,remotehub:f,session:C}=await this.ensureRepositoryContext(e),$=this.getRelativePath(r,f.getProviderRootUri(r)),T=!t?.ref||t.ref==="HEAD"?(await h.getRevision()).revision:t.ref,R=await v.getCommitForFile(C.accessToken,h.repo.owner,h.repo.name,T,$);if(R==null)return;const{viewer:I=C.account.label}=R,D=I!=null&&R.author.name===I?"You":R.author.name,q=I!=null&&R.committer.name===I?"You":R.committer.name,x=(o=R.files)==null?void 0:o.map(b=>new te.K8(e,b.filename??"",(0,ve.fromCommitFileStatus)(b.status)??te.NV.Modified,b.previous_filename,void 0,{additions:b.additions??0,deletions:b.deletions??0,changes:b.changes??0})),B=x?.find(b=>b.path===$);return new Q.aM(this.container,e,R.oid,new Q._j(D,R.author.email,new Date(R.author.date),R.author.avatarUrl),new Q._j(q,R.committer.email,new Date(R.committer.date)),R.message.split(`
`,1)[0],R.parents.nodes.map(b=>b.oid),R.message,{file:B,files:x},{changedFiles:R.changedFiles??0,additions:R.additions??0,deletions:R.deletions??0},[])}catch(h){J.Y.error(h,m);return}}async getCommitsForGraph(e,r,t){var o,m;const h=t?.limit??k.DN.get("graph.defaultItemLimit")??5e3,v=k.DN.get("graph.commitOrdering",void 0,"date"),f=k.DN.get("graph.avatars",void 0,!0),[C,$,T,R,I]=await Promise.allSettled([this.getLog(e,{all:!0,ordering:v,limit:h}),this.getBranch(e),this.getRemotes(e),this.getTags(e),this.getCurrentUser(e)]),D=new Map,q=new Set;return this.getCommitsForGraphCore(e,r,(0,Se.Sb)(C),(0,Se.Sb)($),(o=(0,Se.Sb)(T))==null?void 0:o[0],(m=(0,Se.Sb)(R))==null?void 0:m.values,(0,Se.Sb)(I),D,q,{...t,useAvatars:f})}async getCommitsForGraphCore(e,r,t,o,m,h,v,f,C,$){var T,R,I,D,q;const x=m!=null?new Map([[m.name,m]]):new Map;if(t==null)return{repoPath:e,avatars:f,ids:C,remotes:x,rows:[]};const B=(R=((T=t.pagedCommits)==null?void 0:T.call(t))??t.commits)==null?void 0:R.values();if(B==null)return{repoPath:e,avatars:f,ids:C,remotes:x,rows:[]};const b=[];let L=!1,G=!1,_,Y,O,A;const oe=o?.sha!=null&&m!=null;for(const z of B){if(C.add(z.sha),L=z.sha===o?.sha,oe&&L?(_=[{id:(0,he.Vx)(e,!1,o.name),name:o.name,isCurrentHead:!0,context:(0,Fe.BH)({webviewItem:`gitlens:branch${L?"+current":""}${o?.upstream!=null?"+tracking":""}`,webviewItemValue:{type:"branch",ref:re.W.create(o.name,e,{refType:"branch",name:o.name,remote:!1,upstream:o.upstream})}})}],Y=[{id:(0,he.Vx)(e,!0,o.name),name:o.name,owner:m.name,url:m.url,avatarUrl:(D=($?.useAvatars?(I=m.provider)==null?void 0:I.avatarUri:void 0)??(0,Ee.dM)(this.container,m,r))==null?void 0:D.toString(!0),context:(0,Fe.BH)({webviewItem:"gitlens:branch+remote",webviewItemValue:{type:"branch",ref:re.W.create(o.name,e,{refType:"branch",name:o.name,remote:!0,upstream:{name:m.name,missing:!1}})}})}]):(_=[],Y=[]),h!=null?O=[...(0,Ae.DZ)(h,se=>{if(se.sha===z.sha)return{id:se.id,name:se.name,annotated:Boolean(se.message),context:(0,Fe.BH)({webviewItem:"gitlens:tag",webviewItemValue:{type:"tag",ref:re.W.create(se.name,e,{refType:"tag",name:se.name})}})}})]:O=[],z.author.email&&!f.has(z.author.email)){const se=z.getCachedAvatarUri();se!=null&&f.set(z.author.email,se.toString(!0))}G=z.author.name==="You",A={row:(0,Fe.BH)({webviewItem:`gitlens:commit${oe&&z.sha===o.sha?"+HEAD":""}+current`,webviewItemValue:{type:"commit",ref:re.W.create(z.sha,e,{refType:"revision",message:z.message})}}),avatar:(0,Fe.BH)({webviewItem:`gitlens:contributor${G?"+current":""}`,webviewItemValue:{type:"contributor",repoPath:e,name:G&&v?.name!=null?v.name:z.author.name,email:z.author.email,current:G}})},b.push({sha:z.sha,parents:z.parents,author:z.author.name,email:z.author.email??"",date:z.committer.date.getTime(),message:(0,le.X)(z.message&&String(z.message).length?z.message:z.summary),type:z.parents.length>1?$e.e.MergeCommit:$e.e.Commit,heads:_,remotes:Y,tags:O,contexts:A})}return $?.ref==="HEAD"?$.ref=(q=(0,Ae.Ps)(t.commits.values()))==null?void 0:q.sha:$?.ref!=null&&($.ref=void 0),{repoPath:e,avatars:f,ids:C,remotes:x,rows:b,id:$?.ref,paging:{limit:t.limit,startingCursor:t.startingCursor,hasMore:t.hasMore},more:async z=>{var se;const Me=await((se=t.more)==null?void 0:se.call(t,z));return this.getCommitsForGraphCore(e,r,Me,o,m,h,v,f,C,$)}}}async getOldestUnpushedRefForFile(e,r){}async getContributors(e,r){if(e==null)return[];const t=(0,w.UH)();try{const{metadata:o,github:m,session:h}=await this.ensureRepositoryContext(e),v=await m.getContributors(h.accessToken,o.repo.owner,o.repo.name),f=await this.getCurrentUser(e),C=[];for(const $ of v)$.type==="User"&&C.push(new xe.V(e,$.name,$.email,$.contributions,void 0,(0,Ve.o)(f,$.name,$.email,$.login),void 0,$.login,$.avatar_url,$.node_id));return C}catch(o){return J.Y.error(o,t),[]}}async getCurrentUser(e){if(!e)return;const r=(0,w.UH)(),t=this._repoInfoCache.get(e);let o=t?.user;if(o!=null)return o;if(o!==null)try{const{metadata:m,github:h,session:v}=await this.ensureRepositoryContext(e);return o=await h.getCurrentUser(v.accessToken,m.repo.owner,m.repo.name),this._repoInfoCache.set(e,{...t,user:o??null}),o}catch(m){J.Y.error(m,r),this._repoInfoCache.set(e,{...t,user:null});return}}async getDefaultBranchName(e,r){if(e==null)return;const t=(0,w.UH)();try{const{metadata:o,github:m,session:h}=await this.ensureRepositoryContext(e);return await m.getDefaultBranchName(h.accessToken,o.repo.owner,o.repo.name)}catch(o){J.Y.error(o,t);return}}async getDiffForFile(e,r,t){}async getDiffForFileContents(e,r,t){}async getDiffForLine(e,r,t,o){}async getDiffStatus(e,r,t,o){}async getFileStatusForCommit(e,r,t){if(t===re.p.deletedOrMissing||re.p.isUncommitted(t))return;const o=await this.getCommitForFile(e,r,{ref:t});if(o!=null)return o.findFile(r)}async getLastFetchedTimestamp(e){}async getLog(e,r){var t,o,m;if(e==null)return;const h=(0,w.UH)(),v=this.getPagingLimit(r?.limit);try{const{metadata:f,github:C,session:$}=await this.ensureRepositoryContext(e),T=!r?.ref||r.ref==="HEAD"?(await f.getRevision()).revision:r.ref,R=await C.getCommits($.accessToken,f.repo.owner,f.repo.name,T,{all:r?.all,authors:r?.authors,after:r?.cursor,limit:v,since:r?.since?new Date(r.since):void 0}),I=new Map,{viewer:D=$.account.label}=R;for(const x of R.values){const B=D!=null&&x.author.name===D?"You":x.author.name,b=D!=null&&x.committer.name===D?"You":x.committer.name;let L=I.get(x.oid);L==null&&(L=new Q.aM(this.container,e,x.oid,new Q._j(B,x.author.email,new Date(x.author.date),x.author.avatarUrl),new Q._j(b,x.committer.email,new Date(x.committer.date)),x.message.split(`
`,1)[0],x.parents.nodes.map(G=>G.oid),x.message,(t=x.files)==null?void 0:t.map(G=>new te.K8(e,G.filename??"",(0,ve.fromCommitFileStatus)(G.status)??te.NV.Modified,G.previous_filename,void 0,{additions:G.additions??0,deletions:G.deletions??0,changes:G.changes??0})),{changedFiles:x.changedFiles??0,additions:x.additions??0,deletions:x.deletions??0},[]),I.set(x.oid,L))}const q={repoPath:e,commits:I,sha:T,range:void 0,count:I.size,limit:v,hasMore:((o=R.paging)==null?void 0:o.more)??!1,endingCursor:(m=R.paging)==null?void 0:m.cursor,query:x=>this.getLog(e,{...r,limit:x})};return q.hasMore&&(q.more=this.getLogMoreFn(q,r)),q}catch(f){J.Y.error(f,h);return}}async getLogRefsOnly(e,r){const t=await this.getLog(e,r);if(t!=null)return new Set([...t.commits.values()].map(o=>o.ref))}getLogMoreFn(e,r){return async t=>{var o;const m=t!=null&&typeof t=="object"?t.until:void 0;let h=typeof t=="number"?t:void 0;if(m&&(0,Ae.G)(e.commits.values(),$=>$.ref===m))return e;h=this.getPagingLimit(h);const v=await this.getLog(e.repoPath,{...r,limit:h,cursor:e.endingCursor});if(v==null)return{...e,hasMore:!1,more:void 0};const f=new Map([...e.commits,...v.commits]),C={repoPath:e.repoPath,commits:f,sha:e.sha,range:void 0,count:f.size,limit:m==null?(e.limit??0)+h:void 0,hasMore:m==null?v.hasMore:!0,startingCursor:(o=(0,Ae.Z$)(e.commits))==null?void 0:o[0],endingCursor:v.endingCursor,pagedCommits:()=>{for(const $ of e.commits.keys())v.commits.delete($);return v.commits},query:e.query};return C.hasMore&&(C.more=this.getLogMoreFn(C,r)),C}}async getLogForFile(e,r,t){if(e==null)return;const o=(0,w.UH)(),m=this.getRelativePath(r,e);if(e!=null&&e===m)throw new Error(`File name cannot match the repository path; path=${m}`);t={reverse:!1,...t},t.renames=!1,t.all=!1;let h="log";t.ref!=null&&(h+=`:${t.ref}`),t.limit=this.getPagingLimit(t?.limit),t.limit&&(h+=`:n${t.limit}`),t.renames&&(h+=":follow"),t.reverse&&(h+=":reverse"),t.since&&(h+=`:since=${t.since}`),t.skip&&(h+=`:skip${t.skip}`),t.cursor&&(h+=`:cursor=${t.cursor}`);const v=await this.container.tracker.getOrAdd(de.YY.fromFile(m,e,t.ref));if(!t.force&&t.range==null){if(v.state!=null){const C=v.state.getLog(h);if(C!=null)return J.Y.debug(o,`Cache hit: '${h}'`),C.item;if(t.ref!=null||t.limit!=null){const $=v.state.getLog(`log${t.renames?":follow":""}${t.reverse?":reverse":""}`);if($!=null){if(t.ref==null)return J.Y.debug(o,`Cache hit: ~'${h}'`),$.item;J.Y.debug(o,`Cache ?: '${h}'`);let T=await $.item;if(T!=null&&!T.hasMore&&T.commits.has(t.ref)){J.Y.debug(o,`Cache hit: '${h}'`);let R=!0,I=0;const D=new Map((0,Ae.DZ)(T.commits.entries(),([x,B])=>{if(R){if(x!==t?.ref)return;R=!1}if(I++,!(t?.limit!=null&&I>t.limit))return[x,B]})),q={...t};return T={...T,limit:t.limit,count:D.size,commits:D,query:x=>this.getLogForFile(e,r,{...q,limit:x})},T}}}}J.Y.debug(o,`Cache miss: '${h}'`),v.state==null&&(v.state=new Le.p2)}const f=this.getLogForFileCore(e,m,v,h,o,t);if(v.state!=null&&t.range==null){J.Y.debug(o,`Cache add: '${h}'`);const C={item:f};v.state.setLog(h,C)}return f}async getLogForFileCore(e,r,t,o,m,h){var v,f,C;if(e==null)return;const $=this.getPagingLimit(h?.limit);try{const T=await this.ensureRepositoryContext(e);if(T==null)return;const{metadata:R,github:I,remotehub:D,session:q}=T,x=this.getAbsoluteUri(r,e),B=this.getRelativePath(x,D.getProviderRootUri(x)),b=!h?.ref||h.ref==="HEAD"?(await R.getRevision()).revision:h.ref,L=await I.getCommits(q.accessToken,R.repo.owner,R.repo.name,b,{all:h?.all,after:h?.cursor,path:B,limit:$,since:h?.since?new Date(h.since):void 0}),G=new Map,{viewer:_=q.account.label}=L;for(const O of L.values){const A=_!=null&&O.author.name===_?"You":O.author.name,oe=_!=null&&O.committer.name===_?"You":O.committer.name;let z=G.get(O.oid);if(z==null){const se=(v=O.files)==null?void 0:v.map(we=>new te.K8(e,we.filename??"",(0,ve.fromCommitFileStatus)(we.status)??te.NV.Modified,we.previous_filename,void 0,{additions:we.additions??0,deletions:we.deletions??0,changes:we.changes??0})),Me=(0,ye.Mh)(B)?void 0:se?.find(we=>we.path===B)??new te.K8(e,B,te.NV.Modified,void 0,void 0,O.changedFiles===1?{additions:O.additions??0,deletions:O.deletions??0,changes:0}:void 0);z=new Q.aM(this.container,e,O.oid,new Q._j(A,O.author.email,new Date(O.author.date),O.author.avatarUrl),new Q._j(oe,O.committer.email,new Date(O.committer.date)),O.message.split(`
`,1)[0],O.parents.nodes.map(we=>we.oid),O.message,{file:Me,files:se},{changedFiles:O.changedFiles??0,additions:O.additions??0,deletions:O.deletions??0},[]),G.set(O.oid,z)}}const Y={repoPath:e,commits:G,sha:b,range:void 0,count:G.size,limit:$,hasMore:((f=L.paging)==null?void 0:f.more)??!1,endingCursor:(C=L.paging)==null?void 0:C.cursor,query:O=>this.getLogForFile(e,r,{...h,limit:O})};return Y.hasMore&&(Y.more=this.getLogForFileMoreFn(Y,r,h)),Y}catch(T){if(t.state!=null&&h?.range==null&&!h?.reverse){const R=T?.toString()??"";J.Y.debug(m,`Cache replace (with empty promise): '${o}'`);const I={item:_e,errorMessage:R};return t.state.setLog(o,I),_e}return}}getLogForFileMoreFn(e,r,t){return async o=>{const m=o!=null&&typeof o=="object"?o.until:void 0;let h=typeof o=="number"?o:void 0;if(m&&(0,Ae.G)(e.commits.values(),$=>$.ref===m))return e;h=this.getPagingLimit(h);const v=await this.getLogForFile(e.repoPath,r,{...t,limit:m==null?h:0,cursor:e.endingCursor});if(v==null)return{...e,hasMore:!1,more:void 0};const f=new Map([...e.commits,...v.commits]),C={repoPath:e.repoPath,commits:f,sha:e.sha,range:e.range,count:f.size,limit:m==null?(e.limit??0)+h:void 0,hasMore:m==null?v.hasMore:!0,endingCursor:v.endingCursor,query:e.query};return C.hasMore&&(C.more=this.getLogForFileMoreFn(C,r,t)),C}}async getMergeBase(e,r,t,o){}async getMergeStatus(e){}async getRebaseStatus(e){}async getNextComparisonUris(e,r,t,o=0){if(!t)return;const m=(0,w.UH)();try{const h=await this.ensureRepositoryContext(e);if(h==null)return;const{metadata:v,github:f,remotehub:C,session:$}=h,T=this.getRelativePath(r,C.getProviderRootUri(r)),R=(await v.getRevision()).revision;t==="HEAD"&&(t=R);const I=await f.getNextCommitRefs($.accessToken,v.repo.owner,v.repo.name,R,T,t);return{current:o===0?de.YY.fromFile(T,e,t):new de.YY(await this.getBestRevisionUri(e,T,I[o-1])),next:new de.YY(await this.getBestRevisionUri(e,T,I[o]))}}catch(h){throw J.Y.error(h,m),h}}async getPreviousComparisonUris(e,r,t,o=0,m=!1){var h,v;if(t===re.p.deletedOrMissing)return;const f=(0,w.UH)();t===re.p.uncommitted&&(t=void 0);try{const C=await this.ensureRepositoryContext(e);if(C==null)return;const{metadata:$,github:T,remotehub:R,session:I}=C,D=this.getRelativePath(r,R.getProviderRootUri(r)),q=t!=null?1:0,x=await T.getCommitRefs(I.accessToken,$.repo.owner,$.repo.name,!t||t==="HEAD"?(await $.getRevision()).revision:t,{path:D,first:q+o+1});if(x==null)return;const B=o===0?de.YY.fromFile(D,e,t):new de.YY(await this.getBestRevisionUri(e,D,((h=x.values[q+o-1])==null?void 0:h.oid)??re.p.deletedOrMissing));return B==null||B.sha===re.p.deletedOrMissing?void 0:{current:B,previous:new de.YY(await this.getBestRevisionUri(e,D,((v=x.values[q+o])==null?void 0:v.oid)??re.p.deletedOrMissing))}}catch(C){throw J.Y.error(C,f),C}}async getPreviousComparisonUrisForLine(e,r,t,o,m=0){var h,v;if(o===re.p.deletedOrMissing)return;const f=(0,w.UH)();try{const C=await this.ensureRepositoryContext(e);if(C==null)return;const{remotehub:$}=C;let T=this.getRelativePath(r,$.getProviderRootUri(r)),R=de.YY.fromFile(T,e,o),I=t,D,q=t,x=t;for(let B=0;B<Math.max(0,m)+2;B++){const b=await this.getBlameForLine(D??R,x,void 0,{forceSingleLine:!0});if(b==null)break;o=b.commit.sha,T=((h=b.commit.file)==null?void 0:h.path)??((v=b.commit.file)==null?void 0:v.originalPath)??T,x=b.line.originalLine-1;const L=de.YY.fromFile(T,e,o);D==null?(D=L,q=x):(R=D,I=q,D=L,q=x)}return R==null?void 0:{current:R,previous:D,line:(I??t)+1}}catch(C){throw J.Y.error(C,f),C}}async getIncomingActivity(e,r){}async getRemotes(e,r){if(e==null)return[];const t=r?.providers??(0,Te.v)(k.DN.get("remotes",null)),o=P.Uri.parse(e,!0),[,m,h]=o.path.split("/",3),v=`https://github.com/${m}/${h}.git`,f="github.com",C=`${m}/${h}`;return[new Ee.ss(e,`${f}/${C}`,"origin","https",f,C,(0,Te.B)(this.container,t)(v,f,C),[{type:Ee.XG.Fetch,url:v},{type:Ee.XG.Push,url:v}])]}async getRevisionContent(e,r,t){const o=t?this.createProviderUri(e,t,r):this.createVirtualUri(e,t,r);return P.workspace.fs.readFile(o)}async getStash(e){}async getStatusForFile(e,r){}async getStatusForFiles(e,r){}async getStatusForRepo(e){}async getTags(e,r){if(e==null)return De;const t=(0,w.UH)();let o=r?.cursor?void 0:this._tagsCache.get(e);if(o==null){async function h(){var v,f,C;try{const{metadata:$,github:T,session:R}=await this.ensureRepositoryContext(e),I=[];let D=r?.cursor;const q=D==null;for(;;){const x=await T.getTags(R.accessToken,$.repo.owner,$.repo.name,{cursor:D});for(const B of x.values)I.push(new Ie.gE(e,B.name,B.target.oid,B.target.message??"",new Date(B.target.authoredDate??((v=B.target.tagger)==null?void 0:v.date)),new Date(B.target.committedDate??((f=B.target.tagger)==null?void 0:f.date))));if(!((C=x.paging)!=null&&C.more)||!q)return{...x,values:I};D=x.paging.cursor}}catch($){return J.Y.error($,t),this._tagsCache.delete(e),De}}F(h,"load"),o=h.call(this),r?.cursor==null&&this._tagsCache.set(e,o)}let m=await o;return r?.filter!=null&&(m={...m,values:m.values.filter(r.filter)}),r?.sort!=null&&(0,Ie.Pj)(m.values,typeof r.sort=="boolean"?void 0:r.sort),m}async getTreeEntryForRevision(e,r,t){if(e==null||!r)return;if(t==="HEAD"){const h=await this.ensureRepositoryContext(e);if(h==null)return;const v=await h.metadata.getRevision();t=v?.revision}const o=t?this.createProviderUri(e,t,r):this.createVirtualUri(e,t,r),m=await P.workspace.fs.stat(o);if(m!=null)return{path:this.getRelativePath(o,e),commitSha:t,size:m.size,type:(m.type&P.FileType.Directory)===P.FileType.Directory?"tree":"blob"}}async getTreeForRevision(e,r){if(e==null)return[];if(r==="HEAD"){const h=await this.ensureRepositoryContext(e);if(h==null)return[];const v=await h.metadata.getRevision();r=v?.revision}const t=r?this.createProviderUri(e,r):this.createVirtualUri(e,r),o=await P.workspace.fs.readDirectory(t);if(o==null)return[];const m=[];for(const[h,v]of o){const f=this.getAbsoluteUri(h,t);m.push({path:this.getRelativePath(h,f),commitSha:r,size:0,type:(v&P.FileType.Directory)===P.FileType.Directory?"tree":"blob"})}return[]}async hasBranchOrTag(e,r){var t,o;const[{values:m},{values:h}]=await Promise.all([this.getBranches(e,{filter:(t=r?.filter)==null?void 0:t.branches,sort:!1}),this.getTags(e,{filter:(o=r?.filter)==null?void 0:o.tags,sort:!1})]);return m.length!==0||h.length!==0}async hasCommitBeenPushed(e,r){return!0}isTrackable(e){return this.supportedSchemes.has(e.scheme)}async isTracked(e){if(!this.isTrackable(e)||this.container.git.getRepository(e)==null)return!1;const r=e.with({scheme:W.sN.GitHub});return await P.workspace.fs.stat(r)!=null}async getDiffTool(e){}async openDiffTool(e,r,t){}async openDirectoryCompare(e,r,t,o){}async resolveReference(e,r,t,o){if(!r||r===re.p.deletedOrMissing||t==null&&re.p.isSha(r)||t!=null&&re.p.isUncommitted(r))return r;let m;if(t!=null)m=this.getRelativePath(t,e);else if(!re.p.isShaLike(r)||r.endsWith("^3"))return r;const h=await this.ensureRepositoryContext(e);if(h==null)return r;const{metadata:v,github:f,session:C}=h,$=await f.resolveReference(C.accessToken,v.repo.owner,v.repo.name,r,m);return $??(m?re.p.deletedOrMissing:r)}async richSearchCommits(e,r,t){var o,m,h;if(e==null)return;const v=(0,w.UH)(),f=(0,Pe.pD)(r);let C,$=f.get("commit:");if($!=null){const D=await this.getCommit(e,$[0]);return D==null?void 0:{repoPath:e,commits:new Map([[D.sha,D]]),sha:D.sha,range:void 0,count:1,limit:1,hasMore:!1}}const T=[];for([C,$]of f.entries())switch(C){case"message:":T.push(...$.map(D=>D.replace(/ /g,"+")));break;case"author:":T.push(...$.map(D=>(D=D.replace(/ /g,"+"),D.startsWith("@")?`author:${D.slice(1)}`:D.startsWith('"@')?`author:"${D.slice(2)}`:D.includes("@")?`author-email:${D}`:`author-name:${D}`)));break}if(T.length===0)return;const R=this.getPagingLimit(t?.limit);try{const{metadata:D,github:q,session:x}=await this.ensureRepositoryContext(e),B=await q.searchCommits(x.accessToken,`repo:${D.repo.owner}/${D.repo.name}+${T.join("+").trim()}`,{cursor:t?.cursor,limit:R,sort:t?.ordering==="date"?"committer-date":t?.ordering==="author-date"?"author-date":void 0});if(B==null)return;const b=new Map,L=x.account.label;for(const _ of B.values){const Y=L!=null&&_.author.name===L?"You":_.author.name,O=L!=null&&_.committer.name===L?"You":_.committer.name;let A=b.get(_.oid);A==null&&(A=new Q.aM(this.container,e,_.oid,new Q._j(Y,_.author.email,new Date(_.author.date),_.author.avatarUrl),new Q._j(O,_.committer.email,new Date(_.committer.date)),_.message.split(`
`,1)[0],_.parents.nodes.map(oe=>oe.oid),_.message,(o=_.files)==null?void 0:o.map(oe=>new te.K8(e,oe.filename??"",(0,ve.fromCommitFileStatus)(oe.status)??te.NV.Modified,oe.previous_filename,void 0,{additions:oe.additions??0,deletions:oe.deletions??0,changes:oe.changes??0})),{changedFiles:_.changedFiles??0,additions:_.additions??0,deletions:_.deletions??0},[]),b.set(_.oid,A))}const G={repoPath:e,commits:b,sha:void 0,range:void 0,count:b.size,limit:R,hasMore:((m=B.pageInfo)==null?void 0:m.hasNextPage)??!1,endingCursor:((h=B.pageInfo)==null?void 0:h.endCursor)??void 0,query:_=>this.getLog(e,{...t,limit:_})};if(G.hasMore){let _=F(function(Y){return async O=>{O=this.getPagingLimit(O);const A=await this.richSearchCommits(Y.repoPath,r,{...t,limit:O,cursor:Y.endingCursor});if(A==null)return{...Y,hasMore:!1,more:void 0};const oe=new Map([...Y.commits,...A.commits]),z={repoPath:Y.repoPath,commits:oe,sha:Y.sha,range:void 0,count:oe.size,limit:(Y.limit??0)+O,hasMore:A.hasMore,endingCursor:A.endingCursor,query:Y.query};return z.hasMore&&(z.more=_.call(this,z)),z}},"richSearchCommitsCore2");var I=_;G.more=_.call(this,G)}return G}catch(D){J.Y.error(D,v);return}}async searchCommits(e,r,t){r={matchAll:!1,matchCase:!1,matchRegex:!0,...r};const o=(0,Pe.FL)(r);try{const m=new Map,h=(0,Pe.pD)(r);let v,f=h.get("commit:");if(f!=null){const q=await Promise.allSettled(f.map(B=>this.getCommit(e,B.replace(Ne,""))));let x=0;for(const B of q){const b=(0,Se.Sb)(B);b!=null&&m.set(b.sha,{i:x++,date:Number(t?.ordering==="author-date"?b.author.date:b.committer.date)})}return{repoPath:e,query:r,comparisonKey:o,results:m}}const C=[];for([v,f]of h.entries())switch(v){case"message:":C.push(...f.map(q=>q.replace(/ /g,"+")));break;case"author:":C.push(...f.map(q=>(q=q.replace(/ /g,"+"),q.startsWith("@")?`author:${q.slice(1)}`:q.startsWith('"@')?`author:"${q.slice(2)}`:q.includes("@")?`author-email:${q}`:`author-name:${q}`)));break}if(C.length===0)return{repoPath:e,query:r,comparisonKey:o,results:m};const{metadata:$,github:T,session:R}=await this.ensureRepositoryContext(e),I=`repo:${$.repo.owner}/${$.repo.name}+${C.join("+").trim()}`;async function D(q,x){var B,b,L,G;if((B=t?.cancellation)!=null&&B.isCancellationRequested)return{repoPath:e,query:r,comparisonKey:o,results:m};q=this.getPagingLimit(q??k.DN.get("advanced.maxSearchItems"));const _=await T.searchCommitShas(R.accessToken,I,{cursor:x,limit:q,sort:t?.ordering==="date"?"committer-date":t?.ordering==="author-date"?"author-date":void 0});if(_==null||((b=t?.cancellation)==null?void 0:b.isCancellationRequested))return{repoPath:e,query:r,comparisonKey:o,results:m};for(const Y of _.values)m.set(Y.sha,{i:m.size,date:Number(t?.ordering==="author-date"?Y.authorDate:Y.committerDate)});return x=((L=_.pageInfo)==null?void 0:L.endCursor)??void 0,{repoPath:e,query:r,comparisonKey:o,results:m,paging:(G=_.pageInfo)!=null&&G.hasNextPage?{limit:q,hasMore:!0}:void 0,more:async Y=>D.call(this,Y,x)}}return F(D,"searchForCommitsCore"),D.call(this,t?.limit)}catch(m){throw m instanceof ie.l0?m:new ie.l0(m)}}async validateBranchOrTagName(e,r){return Be.test(e)}async validateReference(e,r){return!0}async stageFile(e,r){}async stageDirectory(e,r){}async unStageFile(e,r){}async unStageDirectory(e,r){}async stashApply(e,r,t){}async stashDelete(e,r,t){}async stashSave(e,r,t,o){}async ensureRepositoryContext(e,r){let t=P.Uri.parse(e,!0);if(!/^github\+?/.test(t.authority))throw new X.kX(e,X.sh.NotAGitHubRepository);if(!r){const f=this.container.git.getRepository(t);if(f==null)throw new X.kX(e,X.sh.NotAGitHubRepository);t=f.uri}let o=this._remotehub;if(o==null)try{o=await this.ensureRemoteHubApi()}catch(f){throw f instanceof X.R5,new X.kX(e,X.sh.RemoteHubApiNotFound,f)}const m=await o?.getMetadata(t);if(m?.provider.id!=="github")throw new X.kX(e,X.sh.NotAGitHubRepository);let h,v;try{[h,v]=await Promise.all([this.ensureGitHub(),this.ensureSession()])}catch(f){throw f instanceof X._7?new X.kX(e,f.reason===X.Jx.UserDidNotConsent?X.sh.GitHubAuthenticationDenied:X.sh.GitHubAuthenticationNotFound,f):new X.kX(e)}if(h==null)throw new X.kX(e);return{github:h,metadata:m,remotehub:o,session:v}}async ensureGitHub(){if(this._github==null){const e=await this.container.github;e!=null&&this._disposables.push(e.onDidReauthenticate(()=>void this.ensureSession(!0))),this._github=e}return this._github}async ensureRemoteHubApi(e){if(this._remotehubPromise==null&&(this._remotehubPromise=je(),this._remotehubPromise.then(r=>this._remotehub=r,()=>this._remotehub=void 0)),!e)return this._remotehubPromise;try{return await this._remotehubPromise}catch{return}}async ensureSession(e=!1,r=!1){if(e||this._sessionPromise==null){async function t(){let o=this.container.storage.get(`provider:authentication:skip:${this.descriptor.id}`,!1);try{if(e)return o=!1,this.container.storage.delete(`provider:authentication:skip:${this.descriptor.id}`),await P.authentication.getSession("github",qe,{forceNewSession:!0});if(!o&&!r)return await P.authentication.getSession("github",qe,{createIfNone:!0});const m=await P.authentication.getSession("github",qe,{createIfNone:!1,silent:r});if(m!=null)return m;throw new Error("User did not consent")}catch(m){if(m instanceof Error&&m.message.includes("User did not consent")){if(!r&&(await this.container.storage.store(`provider:authentication:skip:${this.descriptor.id}`,!0),!o))return e||queueMicrotask(async()=>{const h="Re-enable";await P.window.showInformationMessage("GitLens has been disabled. Authentication is required for GitLens to work with remote GitHub repositories.",h)===h&&this.ensureSession(!0)}),e=!1,t.call(this);throw new X._7("github",X.Jx.UserDidNotConsent)}throw J.Y.error(m),new X._7("github",void 0,m)}}F(t,"getSession"),this._sessionPromise=t.call(this)}return this._sessionPromise}createVirtualUri(e,r,t){let o;if(typeof r=="string")r&&(re.p.isSha(r)?o={v:1,ref:{id:r,type:2}}:o={v:1,ref:{id:r,type:4}});else switch(r?.refType){case"revision":case"stash":o={v:1,ref:{id:r.ref,type:2}};break;case"branch":case"tag":o={v:1,ref:{id:r.name,type:4}};break}if(typeof e=="string"&&(e=P.Uri.parse(e,!0)),t){let m=e.path;m.endsWith("/")&&(m=m.slice(0,-1)),t=this.getRelativePath(t,e),t=`${m}/${t.startsWith("/")?t.slice(0,-1):t}`}return e.with({scheme:W.sN.Virtual,authority:Ke("github",o),path:t??e.path})}createProviderUri(e,r,t){const o=this.createVirtualUri(e,r,t);return this._remotehub==null?o.scheme!==W.sN.Virtual?o:o.with({scheme:W.sN.GitHub}):this._remotehub.getProviderUri(o)}getPagingLimit(e){return e=Math.min(100,e??k.DN.get("advanced.maxListItems")??100),e===0&&(e=100),e}async resolveReferenceCore(e,r,t){var o,m,h,v;if(t==null||t==="HEAD")return(await r.getRevision()).revision;if(re.p.isSha(t))return t;if(re.p.isRange(t))return;const[f,C]=await Promise.allSettled([this.getBranches(e,{filter:$=>$.name===t}),this.getTags(e,{filter:$=>$.name===t})]);return t=((m=(o=(0,Se.Sb)(f))==null?void 0:o.values[0])==null?void 0:m.sha)??((v=(h=(0,Se.Sb)(C))==null?void 0:h.values[0])==null?void 0:v.sha),t==null,t}}F(E,"GitHubGitProvider"),M([(0,w.cM)()],E.prototype,"getBestRevisionUri",1),M([(0,w.cM)()],E.prototype,"getWorkingUri",1),M([(0,w.cM)()],E.prototype,"addRemote",1),M([(0,w.cM)()],E.prototype,"pruneRemote",1),M([(0,w.cM)()],E.prototype,"applyChangesToWorkingFile",1),M([(0,w.cM)()],E.prototype,"branchContainsCommit",1),M([(0,w.cM)()],E.prototype,"checkout",1),M([(0,w.cM)({singleLine:!0})],E.prototype,"resetCaches",1),M([(0,w.cM)({args:{1:H=>H.length}})],E.prototype,"excludeIgnoredUris",1),M([(0,w.cM)()],E.prototype,"fetch",1),M([(0,Ue.H)(),(0,w.fF)()],E.prototype,"findRepositoryUri",1),M([(0,w.cM)({args:{1:H=>H.join(",")}})],E.prototype,"getAheadBehindCommitCount",1),M([(0,Ue.H)((H,e)=>`${H.toString()}|${e?.isDirty}`),(0,w.cM)({args:{1:H=>H?.isDirty}})],E.prototype,"getBlame",1),M([(0,w.cM)({args:{1:"<contents>"}})],E.prototype,"getBlameContents",1),M([(0,Ue.H)((H,e,r,t)=>`${H.toString()}|${e}|${r?.isDirty}|${t?.forceSingleLine}`),(0,w.cM)({args:{2:H=>H?.isDirty}})],E.prototype,"getBlameForLine",1),M([(0,w.cM)({args:{2:"<contents>"}})],E.prototype,"getBlameForLineContents",1),M([(0,w.cM)()],E.prototype,"getBlameForRange",1),M([(0,w.cM)({args:{2:"<contents>"}})],E.prototype,"getBlameForRangeContents",1),M([(0,w.cM)({args:{0:"<blame>"}})],E.prototype,"getBlameRange",1),M([(0,w.cM)()],E.prototype,"getBranch",1),M([(0,w.cM)({args:{1:!1}})],E.prototype,"getBranches",1),M([(0,w.cM)()],E.prototype,"getChangedFilesCount",1),M([(0,w.cM)()],E.prototype,"getCommit",1),M([(0,w.cM)()],E.prototype,"getCommitBranches",1),M([(0,w.cM)()],E.prototype,"getCommitCount",1),M([(0,w.cM)()],E.prototype,"getCommitForFile",1),M([(0,w.cM)()],E.prototype,"getCommitsForGraph",1),M([(0,w.cM)()],E.prototype,"getOldestUnpushedRefForFile",1),M([(0,w.cM)()],E.prototype,"getContributors",1),M([(0,Ue.H)(),(0,w.cM)()],E.prototype,"getCurrentUser",1),M([(0,w.cM)()],E.prototype,"getDefaultBranchName",1),M([(0,w.cM)()],E.prototype,"getDiffForFile",1),M([(0,w.cM)({args:{1:H=>"<contents>"}})],E.prototype,"getDiffForFileContents",1),M([(0,w.cM)()],E.prototype,"getDiffForLine",1),M([(0,w.cM)()],E.prototype,"getDiffStatus",1),M([(0,w.cM)()],E.prototype,"getFileStatusForCommit",1),M([(0,w.cM)()],E.prototype,"getLog",1),M([(0,w.cM)()],E.prototype,"getLogRefsOnly",1),M([(0,w.cM)()],E.prototype,"getLogForFile",1),M([(0,w.cM)()],E.prototype,"getMergeBase",1),M([(0,w.cM)()],E.prototype,"getMergeStatus",1),M([(0,w.cM)()],E.prototype,"getRebaseStatus",1),M([(0,w.cM)()],E.prototype,"getNextComparisonUris",1),M([(0,w.cM)()],E.prototype,"getPreviousComparisonUris",1),M([(0,w.cM)()],E.prototype,"getPreviousComparisonUrisForLine",1),M([(0,w.cM)()],E.prototype,"getIncomingActivity",1),M([(0,w.cM)({args:{1:!1}})],E.prototype,"getRemotes",1),M([(0,w.cM)()],E.prototype,"getRevisionContent",1),M([(0,w.cM)()],E.prototype,"getStash",1),M([(0,w.cM)()],E.prototype,"getStatusForFile",1),M([(0,w.cM)()],E.prototype,"getStatusForFiles",1),M([(0,w.cM)()],E.prototype,"getStatusForRepo",1),M([(0,w.cM)({args:{1:!1}})],E.prototype,"getTags",1),M([(0,w.cM)()],E.prototype,"getTreeEntryForRevision",1),M([(0,w.cM)()],E.prototype,"getTreeForRevision",1),M([(0,w.cM)()],E.prototype,"hasBranchOrTag",1),M([(0,w.cM)()],E.prototype,"hasCommitBeenPushed",1),M([(0,w.cM)()],E.prototype,"getDiffTool",1),M([(0,w.cM)()],E.prototype,"openDiffTool",1),M([(0,w.cM)()],E.prototype,"openDirectoryCompare",1),M([(0,w.cM)()],E.prototype,"resolveReference",1),M([(0,w.cM)()],E.prototype,"richSearchCommits",1),M([(0,w.cM)()],E.prototype,"searchCommits",1),M([(0,w.cM)()],E.prototype,"validateBranchOrTagName",1),M([(0,w.cM)()],E.prototype,"validateReference",1),M([(0,w.cM)()],E.prototype,"stageFile",1),M([(0,w.cM)()],E.prototype,"stageDirectory",1),M([(0,w.cM)()],E.prototype,"unStageFile",1),M([(0,w.cM)()],E.prototype,"unStageDirectory",1),M([(0,w.cM)()],E.prototype,"stashApply",1),M([(0,w.cM)()],E.prototype,"stashDelete",1),M([(0,w.cM)({args:{2:H=>H?.length}})],E.prototype,"stashSave",1),M([(0,Ue.H)()],E.prototype,"ensureRepositoryContext",1),M([(0,Ue.H)()],E.prototype,"ensureGitHub",1);function Ke(H,e){return`${H}${e!=null?`+${(0,Z.e)(JSON.stringify(e))}`:""}`}F(Ke,"encodeAuthority")},8301:(me,ce,S)=>{"use strict";S.r(ce),S.d(ce,{GitHubPullRequest:()=>k,fromCommitFileStatus:()=>W});var P=S(3901),Z=S(9052),k;(V=>{function le(ie,ge){return new Z.i7(ge,{name:ie.author.login,avatarUrl:ie.author.avatarUrl,url:ie.author.url},String(ie.number),ie.title,ie.permalink,X(ie.state),new Date(ie.updatedAt),ie.closedAt==null?void 0:new Date(ie.closedAt),ie.mergedAt==null?void 0:new Date(ie.mergedAt))}F(le,"from"),V.from=le;function X(ie){return ie==="MERGED"?Z.o0.Merged:ie==="CLOSED"?Z.o0.Closed:Z.o0.Open}F(X,"fromState"),V.fromState=X;function pe(ie){return ie===Z.o0.Merged?"MERGED":ie===Z.o0.Closed?"CLOSED":"OPEN"}F(pe,"toState"),V.toState=pe})(k||(k={}));function W(V){switch(V){case"added":return P.NV.Added;case"changed":case"modified":return P.NV.Modified;case"removed":return P.NV.Deleted;case"renamed":return P.NV.Renamed;case"copied":return P.NV.Copied}}F(W,"fromCommitFileStatus")},778:(me,ce,S)=>{var P=S(2479);me.exports=P(Z),me.exports.strict=P(k),Z.proto=Z(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return Z(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return k(this)},configurable:!0})});function Z(W){var V=F(function(){return V.called?V.value:(V.called=!0,V.value=W.apply(this,arguments))},"f");return V.called=!1,V}F(Z,"once");function k(W){var V=F(function(){if(V.called)throw new Error(V.onceError);return V.called=!0,V.value=W.apply(this,arguments)},"f"),le=W.name||"Function wrapped with `once`";return V.onceError=le+" shouldn't be called more than once",V.called=!1,V}F(k,"onceStrict")},2479:me=>{me.exports=ce;function ce(S,P){if(S&&P)return ce(S)(P);if(typeof S!="function")throw new TypeError("need wrapper function");return Object.keys(S).forEach(function(k){Z[k]=S[k]}),Z;function Z(){for(var k=new Array(arguments.length),W=0;W<k.length;W++)k[W]=arguments[W];var V=S.apply(this,k),le=k[k.length-1];return typeof V=="function"&&V!==le&&Object.keys(le).forEach(function(X){V[X]=le[X]}),V}F(Z,"wrapper")}F(ce,"wrappy")}};
