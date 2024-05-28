"use strict";(self.webpackChunkblastarians=self.webpackChunkblastarians||[]).push([[8935],{61857:(t,e,i)=>{i.d(e,{W:()=>a});var s=i(32177),n=i(73026);class a extends n.A{constructor(t){let{chains:e=s.k9b,options:i}=t;super(),this.chains=e,this.options=i}getBlockExplorerUrls(t){var e,i;const s=null!==(e=null===(i=t.explorers)||void 0===i?void 0:i.map((t=>t.url)))&&void 0!==e?e:[];return s.length>0?s:void 0}isChainUnsupported(t){return!this.chains.some((e=>e.chainId===t))}updateChains(t){this.chains=t}}},61766:(t,e,i)=>{i.d(e,{A:()=>o,C:()=>r,R:()=>h,S:()=>d,U:()=>l,a:()=>c});var s=i(61921);class n extends Error{constructor(t,e){const{cause:i,code:s,data:n}=e;if(!Number.isInteger(s))throw new Error('"code" must be an integer.');if(!t||"string"!==typeof t)throw new Error('"message" must be a nonempty string.');super("".concat(t,". Cause: ").concat(JSON.stringify(i))),this.cause=i,this.code=s,this.data=n}}class a extends n{constructor(t,e){const{cause:i,code:s,data:n}=e;if(!(Number.isInteger(s)&&s>=1e3&&s<=4999))throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');super(t,{cause:i,code:s,data:n})}}class o extends Error{constructor(){super(...arguments),(0,s._)(this,"name","AddChainError"),(0,s._)(this,"message","Error adding chain")}}class r extends Error{constructor(t){let{chainId:e,connectorId:i}=t;super('Chain "'.concat(e,'" not configured for connector "').concat(i,'".')),(0,s._)(this,"name","ChainNotConfigured")}}class c extends Error{constructor(){super(...arguments),(0,s._)(this,"name","ConnectorNotFoundError"),(0,s._)(this,"message","Connector not found")}}class h extends n{constructor(t){super("Resource unavailable",{cause:t,code:-32002}),(0,s._)(this,"name","ResourceUnavailable")}}class d extends a{constructor(t){super("Error switching chain",{cause:t,code:4902}),(0,s._)(this,"name","SwitchChainError")}}class l extends a{constructor(t){super("User rejected request",{cause:t,code:4001}),(0,s._)(this,"name","UserRejectedRequestError")}}},67430:(t,e,i)=>{i.d(e,{g:()=>a,i:()=>n});var s=i(32177);function n(t){const e=new URL(t).hostname;return e.endsWith(".thirdweb.com")||"localhost"===e||"0.0.0.0"===e}function a(t){return(0,s.aSY)(t).map((t=>{try{const e=new URL(t);return e.hostname.endsWith(".thirdweb.com")&&(e.pathname="",e.search=""),e.toString()}catch(e){return t}}))}},8935:(t,e,i)=>{i.d(e,{WalletConnectConnector:()=>W});var s=i(44518),n=i(17370),a=i(61921),o=i(48987),r=i(38045),c=i(89106),h=i(97144),d=i(67430),l=i(61857),u=i(61766);i(73026);const p=new Set([1,137,10,42161,56]),w="eip155",g="wagmi.requestedChains",m="wallet_addEthereumChain",v="last-used-chain-id";var f=new WeakMap,C=new WeakMap,b=new WeakMap,y=new WeakSet,I=new WeakSet,_=new WeakSet,S=new WeakSet,E=new WeakSet,k=new WeakSet,N=new WeakSet,U=new WeakSet;class W extends l.W{constructor(t){super({...t,options:{isNewChainsStale:!0,...t.options}}),(0,s._)(this,U),(0,s._)(this,N),(0,s._)(this,k),(0,s._)(this,E),(0,s._)(this,S),(0,s._)(this,_),(0,s._)(this,I),(0,s._)(this,y),(0,a._)(this,"id",h.w.walletConnect),(0,a._)(this,"name","WalletConnect"),(0,a._)(this,"ready",!0),(0,n._)(this,f,{writable:!0,value:void 0}),(0,n._)(this,C,{writable:!0,value:void 0}),(0,n._)(this,b,{writable:!0,value:void 0}),(0,a._)(this,"onAccountsChanged",(t=>{0===t.length?this.emit("disconnect"):this.emit("change",{account:o.getAddress(t[0])})})),(0,a._)(this,"onChainChanged",(async t=>{const e=Number(t),i=this.isChainUnsupported(e);await(0,n.b)(this,b).setItem(v,String(t)),this.emit("change",{chain:{id:e,unsupported:i}})})),(0,a._)(this,"onDisconnect",(async()=>{await(0,s.a)(this,E,P).call(this,[]),await(0,n.b)(this,b).removeItem(v),this.emit("disconnect")})),(0,a._)(this,"onDisplayUri",(t=>{this.emit("message",{type:"display_uri",data:t})})),(0,a._)(this,"onConnect",(()=>{this.emit("connect",{provider:(0,n.b)(this,f)})})),(0,n.a)(this,b,t.options.storage),(0,s.a)(this,y,x).call(this),this.filteredChains=this.chains.length>50?this.chains.filter((t=>p.has(t.chainId))):this.chains}async connect(){let{chainId:t,pairingTopic:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{let a=t;if(!a){const t=await(0,n.b)(this,b).getItem(v),e=t?parseInt(t):void 0;var i;if(e&&!this.isChainUnsupported(e))a=e;else a=null===(i=this.filteredChains[0])||void 0===i?void 0:i.chainId}if(!a)throw new Error("No chains found on connector.");const c=await this.getProvider();this.setupListeners();const h=await(0,s.a)(this,_,M).call(this);if(c.session&&h&&await c.disconnect(),!c.session||h){const t=this.filteredChains.filter((t=>t.chainId!==a)).map((t=>t.chainId));this.emit("message",{type:"connecting"}),await c.connect({pairingTopic:e,chains:[a],optionalChains:t.length>0?t:[a]}),await(0,s.a)(this,E,P).call(this,this.filteredChains.map((t=>{let{chainId:e}=t;return e})))}const d=await c.enable();if(0===d.length)throw new Error("No accounts found on provider.");const l=o.getAddress(d[0]),u=await this.getChainId();return{account:l,chain:{id:u,unsupported:this.isChainUnsupported(u)},provider:new r.j(c)}}catch(a){if(/user rejected/i.test(null===a||void 0===a?void 0:a.message))throw new u.U(a);throw a}}async disconnect(){const t=()=>{if("undefined"!==typeof localStorage)for(const t in localStorage)t.startsWith("wc@2")&&localStorage.removeItem(t)};t();const e=await this.getProvider();(async()=>{try{await e.disconnect()}catch(i){if(!/No matching key/i.test(i.message))throw i}finally{(0,s.a)(this,S,L).call(this),await(0,s.a)(this,E,P).call(this,[]),t()}})()}async getAccount(){const{accounts:t}=await this.getProvider();if(0===t.length)throw new Error("No accounts found on provider.");return o.getAddress(t[0])}async getChainId(){const{chainId:t}=await this.getProvider();return t}async getProvider(){let{chainId:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if((0,n.b)(this,f)||await(0,s.a)(this,y,x).call(this),t&&await this.switchChain(t),!(0,n.b)(this,f))throw new Error("No provider found.");return(0,n.b)(this,f)}async getSigner(){let{chainId:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const[e,i]=await Promise.all([this.getProvider({chainId:t}),this.getAccount()]);return new r.j(e,t).getSigner(i)}async isAuthorized(){try{const[t,e]=await Promise.all([this.getAccount(),this.getProvider()]),i=await(0,s.a)(this,_,M).call(this);if(!t)return!1;if(i&&e.session){try{await e.disconnect()}catch{}return!1}return!0}catch{return!1}}async switchChain(t){const e=this.chains.find((e=>e.chainId===t));if(!e)throw new u.S("Chain with ID: ".concat(t,", not found on connector."));try{const n=await this.getProvider(),a=(0,s.a)(this,N,D).call(this),o=(0,s.a)(this,U,j).call(this);if(!a.includes(t)&&o.includes(m)){var i;const a=null!==(i=e.explorers)&&void 0!==i&&i.length?{blockExplorerUrls:[e.explorers[0].url]}:{};await n.request({method:m,params:[{chainId:c.hexValue(e.chainId),chainName:e.name,nativeCurrency:e.nativeCurrency,rpcUrls:(0,d.g)(e),...a}]});const o=await(0,s.a)(this,k,O).call(this);o.push(t),await(0,s.a)(this,E,P).call(this,o)}return await n.request({method:"wallet_switchEthereumChain",params:[{chainId:c.hexValue(t)}]}),e}catch(n){const t="string"===typeof n?n:null===n||void 0===n?void 0:n.message;if(/user rejected request/i.test(t))throw new u.U(n);throw new u.S(n)}}async setupListeners(){(0,n.b)(this,f)&&((0,s.a)(this,S,L).call(this),(0,n.b)(this,f).on("accountsChanged",this.onAccountsChanged),(0,n.b)(this,f).on("chainChanged",this.onChainChanged),(0,n.b)(this,f).on("disconnect",this.onDisconnect),(0,n.b)(this,f).on("session_delete",this.onDisconnect),(0,n.b)(this,f).on("display_uri",this.onDisplayUri),(0,n.b)(this,f).on("connect",this.onConnect))}}async function x(){return(0,n.b)(this,C)||(0,n.a)(this,C,(0,s.a)(this,I,A).call(this)),(0,n.b)(this,C)}async function A(){const{default:t,OPTIONAL_EVENTS:e,OPTIONAL_METHODS:s}=await i.e(442).then(i.bind(i,50442)),[a,...o]=this.filteredChains.map((t=>{let{chainId:e}=t;return e}));a&&(0,n.a)(this,f,await t.init({showQrModal:!1!==this.options.qrcode,projectId:this.options.projectId,optionalMethods:s,optionalEvents:e,chains:[a],optionalChains:o,metadata:{name:this.options.dappMetadata.name,description:this.options.dappMetadata.description||"",url:this.options.dappMetadata.url,icons:[this.options.dappMetadata.logoUrl||""]},rpcMap:Object.fromEntries(this.filteredChains.map((t=>[t.chainId,t.rpc[0]]))),qrModalOptions:this.options.qrModalOptions}))}async function M(){if((0,s.a)(this,U,j).call(this).includes(m))return!1;if(!this.options.isNewChainsStale)return!1;const t=await(0,s.a)(this,k,O).call(this),e=this.filteredChains.map((t=>{let{chainId:e}=t;return e})),i=(0,s.a)(this,N,D).call(this);return!(i.length&&!i.some((t=>e.includes(t))))&&!e.every((e=>t.includes(e)))}function L(){(0,n.b)(this,f)&&((0,n.b)(this,f).removeListener("accountsChanged",this.onAccountsChanged),(0,n.b)(this,f).removeListener("chainChanged",this.onChainChanged),(0,n.b)(this,f).removeListener("disconnect",this.onDisconnect),(0,n.b)(this,f).removeListener("session_delete",this.onDisconnect),(0,n.b)(this,f).removeListener("display_uri",this.onDisplayUri),(0,n.b)(this,f).removeListener("connect",this.onConnect))}async function P(t){await(0,n.b)(this,b).setItem(g,JSON.stringify(t))}async function O(){const t=await(0,n.b)(this,b).getItem(g);return t?JSON.parse(t):[]}function D(){var t;if(!(0,n.b)(this,f))return[];const e=null===(t=(0,n.b)(this,f).session)||void 0===t||null===(t=t.namespaces[w])||void 0===t||null===(t=t.chains)||void 0===t?void 0:t.map((t=>parseInt(t.split(":")[1]||"")));return null!==e&&void 0!==e?e:[]}function j(){var t;if(!(0,n.b)(this,f))return[];const e=null===(t=(0,n.b)(this,f).session)||void 0===t||null===(t=t.namespaces[w])||void 0===t?void 0:t.methods;return null!==e&&void 0!==e?e:[]}}}]);
//# sourceMappingURL=8935.eed7ce1f.chunk.js.map