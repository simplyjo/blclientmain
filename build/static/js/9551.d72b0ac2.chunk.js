"use strict";(self.webpackChunkblastarians=self.webpackChunkblastarians||[]).push([[9551],{39551:(t,e,s)=>{s.d(e,{MetaMaskConnector:()=>d});var i=s(17370),n=s(61921),c=s(61766),a=s(97144),o=s(93635),h=s(48987),r=s(2511),u=(s(73026),new WeakMap);class d extends o.s{constructor(t){const e={...{name:"MetaMask",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:r.g},...t.options};super({chains:t.chains,options:e,connectorStorage:t.connectorStorage}),(0,n._)(this,"id",a.w.metamask),(0,i._)(this,u,{writable:!0,value:void 0}),(0,i.a)(this,u,e.UNSTABLE_shimOnConnectSelectAccount)}async connect(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{var e,s;const o=await this.getProvider();if(!o)throw new c.a;this.setupListeners(),this.emit("message",{type:"connecting"});let r=null;if((0,i.b)(this,u)&&null!==(e=this.options)&&void 0!==e&&e.shimDisconnect&&!Boolean(this.connectorStorage.getItem(this.shimDisconnectKey))){r=await this.getAccount().catch((()=>null));if(!!r)try{await o.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}catch(n){if(this.isUserRejectedRequestError(n))throw new c.U(n)}}if(!r){const t=await o.request({method:"eth_requestAccounts"});r=h.getAddress(t[0])}let d=await this.getChainId(),w=this.isChainUnsupported(d);if(t.chainId&&d!==t.chainId)try{await this.switchChain(t.chainId),d=t.chainId,w=this.isChainUnsupported(t.chainId)}catch(a){console.error("Could not switch to chain id : ".concat(t.chainId),a)}null!==(s=this.options)&&void 0!==s&&s.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");const l={chain:{id:d,unsupported:w},provider:o,account:r};return this.emit("connect",l),l}catch(n){if(this.isUserRejectedRequestError(n))throw new c.U(n);if(-32002===n.code)throw new c.R(n);throw n}}async switchAccount(){const t=await this.getProvider();await t.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}}}}]);
//# sourceMappingURL=9551.d72b0ac2.chunk.js.map