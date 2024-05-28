"use strict";(self.webpackChunkblastarians=self.webpackChunkblastarians||[]).push([[1355],{3610:(t,r,e)=>{e.d(r,{S:()=>s});var a=e(54705),n=e(18886);class s{get chainId(){return this._chainId}constructor(t,r,e){(0,a.A)(this,"transfer",(0,n.dt)((async(t,r)=>this.erc721.transfer.prepare(t,r)))),(0,a.A)(this,"setApprovalForAll",(0,n.dt)((async(t,r)=>this.erc721.setApprovalForAll.prepare(t,r)))),(0,a.A)(this,"setApprovalForToken",(0,n.dt)((async(t,r)=>n.aW.fromContractWrapper({contractWrapper:this.contractWrapper,method:"approve",args:[await(0,n.cG)(t),r]})))),this.contractWrapper=t,this.storage=r,this.erc721=new n.aD(this.contractWrapper,this.storage,e),this._chainId=e}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async getAll(t){return this.erc721.getAll(t)}async getOwned(t){return t&&(t=await(0,n.cG)(t)),this.erc721.getOwned(t)}async getOwnedTokenIds(t){return t&&(t=await(0,n.cG)(t)),this.erc721.getOwnedTokenIds(t)}async totalSupply(){return this.erc721.totalCirculatingSupply()}async get(t){return this.erc721.get(t)}async ownerOf(t){return this.erc721.ownerOf(t)}async balanceOf(t){return this.erc721.balanceOf(t)}async balance(){return this.erc721.balance()}async isApproved(t,r){return this.erc721.isApproved(t,r)}}},32971:(t,r,e)=>{e.d(r,{h:()=>s});var a=e(96337),n=e(18886);async function s(t,r,e){const s=t.getProvider(),o=new n.ds(s,r,a,{},t.storage),c=await t.getSignerAddress(),i=t.address;return(await o.read("allowance",[c,i])).gte(e)}},81355:(t,r,e)=>{e.r(r),e.d(r,{Multiwrap:()=>i});var a=e(54705),n=e(18886),s=e(3610),o=e(73594),c=e(32971);e(6373),e(3198),e(122),e(75838),e(99038),e(92377);class i extends s.S{constructor(t,r,e){let s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0;super(arguments.length>6&&void 0!==arguments[6]?arguments[6]:new n.ds(t,r,o,s,e),e,c),(0,a.A)(this,"wrap",(0,n.dt)((async(t,r,e)=>{const a=await(0,n.dQ)(r,this.storage),s=await(0,n.cG)(e||await this.contractWrapper.getSignerAddress()),o=await this.toTokenStructList(t);return n.aW.fromContractWrapper({contractWrapper:this.contractWrapper,method:"wrap",args:[o,a,s],parse:t=>{const r=this.contractWrapper.parseLogs("TokensWrapped",null===t||void 0===t?void 0:t.logs);if(0===r.length)throw new Error("TokensWrapped event not found");const e=r[0].args.tokenIdOfWrappedToken;return{id:e,receipt:t,data:()=>this.get(e)}}})}))),(0,a.A)(this,"unwrap",(0,n.dt)((async(t,r)=>{const e=await(0,n.cG)(r||await this.contractWrapper.getSignerAddress());return n.aW.fromContractWrapper({contractWrapper:this.contractWrapper,method:"unwrap",args:[t,e]})}))),this.abi=n.e.parse(o||[]),this.metadata=new n.ah(this.contractWrapper,n.dP,this.storage),this.app=new n.b0(this.contractWrapper,this.metadata,this.storage),this.roles=new n.ai(this.contractWrapper,i.contractRoles),this.encoder=new n.ag(this.contractWrapper),this.estimator=new n.aQ(this.contractWrapper),this.events=new n.aR(this.contractWrapper),this.royalties=new n.aj(this.contractWrapper,this.metadata),this.owner=new n.aV(this.contractWrapper)}async getWrappedContents(t){const r=await this.contractWrapper.readContract.getWrappedContents(t),e=[],a=[],s=[];for(const c of r)switch(c.tokenType){case 0:{const t=await(0,n.bb)(this.contractWrapper.getProvider(),c.assetContract);e.push({contractAddress:c.assetContract,quantity:o.formatUnits(c.totalAmount,t.decimals)});break}case 1:a.push({contractAddress:c.assetContract,tokenId:c.tokenId});break;case 2:s.push({contractAddress:c.assetContract,tokenId:c.tokenId,quantity:c.totalAmount.toString()})}return{erc20Tokens:e,erc721Tokens:a,erc1155Tokens:s}}async toTokenStructList(t){const r=[],e=this.contractWrapper.getProvider(),a=await this.contractWrapper.getSignerAddress();if(t.erc20Tokens)for(const s of t.erc20Tokens){const t=await(0,n.ba)(e,s.quantity,s.contractAddress);if(!await(0,c.h)(this.contractWrapper,s.contractAddress,t))throw new Error('ERC20 token with contract address "'.concat(s.contractAddress,'" does not have enough allowance to transfer.\n\nYou can set allowance to the multiwrap contract to transfer these tokens by running:\n\nawait sdk.getToken("').concat(s.contractAddress,'").setAllowance("').concat(this.getAddress(),'", ').concat(s.quantity,");\n\n"));r.push({assetContract:s.contractAddress,totalAmount:t,tokenId:0,tokenType:0})}if(t.erc721Tokens)for(const s of t.erc721Tokens){if(!await(0,n.dC)(this.contractWrapper.getProvider(),this.getAddress(),s.contractAddress,s.tokenId,a))throw new Error('ERC721 token "'.concat(s.tokenId,'" with contract address "').concat(s.contractAddress,'" is not approved for transfer.\n\nYou can give approval the multiwrap contract to transfer this token by running:\n\nawait sdk.getNFTCollection("').concat(s.contractAddress,'").setApprovalForToken("').concat(this.getAddress(),'", ').concat(s.tokenId,");\n\n"));r.push({assetContract:s.contractAddress,totalAmount:0,tokenId:s.tokenId,tokenType:1})}if(t.erc1155Tokens)for(const s of t.erc1155Tokens){if(!await(0,n.dC)(this.contractWrapper.getProvider(),this.getAddress(),s.contractAddress,s.tokenId,a))throw new Error('ERC1155 token "'.concat(s.tokenId,'" with contract address "').concat(s.contractAddress,'" is not approved for transfer.\n\nYou can give approval the multiwrap contract to transfer this token by running:\n\nawait sdk.getEdition("').concat(s.contractAddress,'").setApprovalForAll("').concat(this.getAddress(),'", true);\n\n'));r.push({assetContract:s.contractAddress,totalAmount:s.quantity,tokenId:s.tokenId,tokenType:2})}return r}async prepare(t,r,e){return n.aW.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}}(0,a.A)(i,"contractRoles",n.dO)}}]);
//# sourceMappingURL=1355.4e87c894.chunk.js.map