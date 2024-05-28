"use strict";(self.webpackChunkblastarians=self.webpackChunkblastarians||[]).push([[8497],{87788:(t,a,r)=>{r.d(a,{S:()=>n});var e=r(54705),s=r(18886);class n{get chainId(){return this._chainId}constructor(t,a,r){(0,e.A)(this,"transfer",(0,s.dt)((async(t,a)=>this.erc20.transfer.prepare(t,a)))),(0,e.A)(this,"transferFrom",(0,s.dt)((async(t,a,r)=>this.erc20.transferFrom.prepare(t,a,r)))),(0,e.A)(this,"setAllowance",(0,s.dt)((async(t,a)=>this.erc20.setAllowance.prepare(t,a)))),(0,e.A)(this,"transferBatch",(0,s.dt)((async t=>this.erc20.transferBatch.prepare(t)))),this.contractWrapper=t,this.storage=a,this.erc20=new s.au(this.contractWrapper,this.storage,r),this._chainId=r}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async get(){return this.erc20.get()}async balance(){return await this.erc20.balance()}async balanceOf(t){return this.erc20.balanceOf(t)}async totalSupply(){return await this.erc20.totalSupply()}async allowance(t){return await this.erc20.allowance(t)}async allowanceOf(t,a){return await this.erc20.allowanceOf(t,a)}}},98497:(t,a,r)=>{r.r(a),r.d(a,{TokenDrop:()=>i});var e=r(54705),s=r(18886),n=r(87788),c=r(81237);r(6373),r(3198),r(122),r(75838),r(99038),r(92377);class i extends n.S{constructor(t,a,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,o=arguments.length>5?arguments[5]:void 0;super(arguments.length>6&&void 0!==arguments[6]?arguments[6]:new s.ds(t,a,c,n,r),r,o),(0,e.A)(this,"claim",(0,s.dt)((()=>{var t=this;return async function(a){let r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t.claimTo.prepare(await t.contractWrapper.getSignerAddress(),a,r)}})())),(0,e.A)(this,"claimTo",(0,s.dt)((()=>{var t=this;return async function(a,r){let e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return t.erc20.claimTo.prepare(a,r,{checkERC20Allowance:e})}})())),(0,e.A)(this,"delegateTo",(0,s.dt)((async t=>s.aW.fromContractWrapper({contractWrapper:this.contractWrapper,method:"delegate",args:[await(0,s.cG)(t)]})))),(0,e.A)(this,"burnTokens",(0,s.dt)((async t=>this.erc20.burn.prepare(t)))),(0,e.A)(this,"burnFrom",(0,s.dt)((async(t,a)=>this.erc20.burnFrom.prepare(t,a)))),this.abi=s.e.parse(c||[]),this.metadata=new s.ah(this.contractWrapper,s.dZ,this.storage),this.app=new s.b0(this.contractWrapper,this.metadata,this.storage),this.roles=new s.ai(this.contractWrapper,i.contractRoles),this.encoder=new s.ag(this.contractWrapper),this.estimator=new s.aQ(this.contractWrapper),this.events=new s.aR(this.contractWrapper),this.sales=new s.ak(this.contractWrapper),this.platformFees=new s.aT(this.contractWrapper),this.interceptor=new s.aS(this.contractWrapper),this.claimConditions=new s.am(this.contractWrapper,this.metadata,this.storage)}async getVoteBalance(){return await this.getVoteBalanceOf(await this.contractWrapper.getSignerAddress())}async getVoteBalanceOf(t){return await this.erc20.getValue(await this.contractWrapper.readContract.getVotes(await(0,s.cG)(t)))}async getDelegation(){return await this.getDelegationOf(await this.contractWrapper.getSignerAddress())}async getDelegationOf(t){return await this.contractWrapper.readContract.delegates(await(0,s.cG)(t))}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole((0,s.bI)("transfer"),c.L)}async prepare(t,a,r){return s.aW.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:a,overrides:r})}async call(t,a,r){return this.contractWrapper.call(t,a,r)}}(0,e.A)(i,"contractRoles",s.dY)}}]);
//# sourceMappingURL=8497.73bb105b.chunk.js.map