(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d23459d"],{"00f2":function(e,t,s){},"0169":function(e,t,s){},"03bc":function(e,t,s){},"0dc6":function(e,t,s){},"113e":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"task"},[1===e.step&&e.taskRequire.isThreeShops?s("Step1",{ref:"step1",attrs:{taskRequire:e.taskRequire,ruleForm:e.ruleForm},on:{submit:e.submit}}):e._e(),2===e.step?s("Step2",{ref:"step2",attrs:{taskRequire:e.taskRequire,steps:e.steps,ruleForm:e.ruleForm.targetGoods},on:{submit:e.submit}}):e._e(),3===e.step?s("Step3",{ref:"step3",attrs:{taskRequire:e.taskRequire,steps:e.steps,ruleForm:e.ruleForm.isChatBeforeShooting},on:{submit:e.submit}}):e._e(),4===e.step?s("Step4",{ref:"step4",attrs:{taskRequire:e.taskRequire,steps:e.steps,ruleForm:e.ruleForm.isBrowseEvaluation},on:{submit:e.submit}}):e._e(),5===e.step?s("Step5",{ref:"step5",attrs:{taskRequire:e.taskRequire,steps:e.steps,ruleForm:e.ruleForm.isBrowseBaby},on:{submit:e.submit}}):e._e(),6===e.step?s("Step6",{ref:"step6",attrs:{taskRequire:e.taskRequire,steps:e.steps,ruleForm:e.ruleForm.isShoppingCart},on:{submit:e.submit}}):e._e(),7===e.step?s("Step7",{ref:"step7",attrs:{taskRequire:e.taskRequire,steps:e.steps,ruleForm:e.ruleForm.isCollectionBaby},on:{submit:e.submit}}):e._e(),8===e.step?s("Step8",{ref:"step8",attrs:{taskRequire:e.taskRequire,steps:e.steps,ruleForm:e.ruleForm.payment,loading:e.submiting},on:{submit:e.submit}}):e._e()],1)},i=[],a=(s("8e6e"),s("456d"),s("ac6a"),s("bd86")),o=(s("96cf"),s("3b8d")),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"step1"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm.isThreeShops,rules:e.rules}},[s("h4",[e._v("一、 "+e._s(e.threeShops[e.taskRequire.isThreeShops]||e.threeShops[0]))]),s("p",[e._v("1、每家至少停留1分钟，进入货比商品页面，找到他家店铺名称，填写在下方空格中")]),s("p",[e._v("2、请确认使用买号【"+e._s(e.taskRequire.userAccount)+"】登录")]),s("p",[e._v("3、点击搜索粘贴指定的关键词【"+e._s(e.taskRequire.searchTerms)+"】")]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.copyTextToClipboard(e.taskRequire.searchTerms)}}},[e._v("复制关键词")]),s("p",[e._v("4、请输入货比商品店铺名称")]),e._l(3,(function(t){return s("el-form-item",{key:t,attrs:{prop:"value"+t}},[s("el-input",{attrs:{placeholder:"商品店铺"+t},model:{value:e.ruleForm.isThreeShops["value"+t],callback:function(s){e.$set(e.ruleForm.isThreeShops,"value"+t,s)},expression:"ruleForm.isThreeShops['value'+item]"}})],1)})),e.taskRequire.isScreenshot?s("p",[e._v("5、截图上传")]):e._e(),e._l(e.taskRequire.isThreeShops,(function(t){return e.taskRequire.isScreenshot?s("el-form-item",{attrs:{prop:"top",labelWidth:"0"}},[s("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading,expression:"uploadLoading"}],staticClass:"avatar-uploader",attrs:{"on-progress":e.handelAvatarProgress,"before-upload":e.validateSize,action:"/api/attachment/upload","show-file-list":!1,data:{type:"ORDERS_CHART"},name:"file",accept:"image/png,image/gif,image/jpg,image/jpeg","on-success":function(s,r){e.handleAvatarSuccess(s,r,"picture"+t)}}},[e.ruleForm.isThreeShops["picture"+t]?s("img",{staticClass:"avatar",attrs:{src:e.ruleForm.isThreeShops["picture"+t]}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e()})),this.timeDown(e.taskRequire)>0?s("p",[e._v("下单剩余时间："),s("span",{domProps:{textContent:e._s(e.taskRequire.timeDown)}},[e._v("00:59：59")]),e._v("（一小时倒计时）")]):e._e(),s("div",{staticClass:"button"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],2)],1)},l=[],u={name:"startTask",props:["taskRequire","ruleForm"],data:function(){return{uploadLoading:!1,threeShops:{0:"不需要",1:"货比一家",2:"货比两家",3:"货比三家 "},rules:{value1:[{required:!0,message:"不能为空",trigger:"blur"}],value2:[{required:!0,message:"不能为空",trigger:"blur"}],value3:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{validateSize:function(e){var t=e.size/1024/1024<5;return t||this.$message.error("上传头像图片大小不能超过 5MB!"),t},handelAvatarProgress:function(){this.uploadLoading=!0},copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},handleAvatarSuccess:function(e,t,s){this.uploadLoading=!1,this.ruleForm.isThreeShops[s]=e.msg},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;if(t.taskRequire.isScreenshot){var s=t.taskRequire.isThreeShops;if(1===s){if(!t.ruleForm.isThreeShops.picture1)return void t.$message.info("请上传截图");t.$emit("submit",2)}else if(2===s){if(!t.ruleForm.isThreeShops.picture1||!t.ruleForm.isThreeShops.picture2)return void t.$message.info("请上传截图");t.$emit("submit",2)}else if(3===s){if(!(t.ruleForm.isThreeShops.picture1&&t.ruleForm.isThreeShops.picture2&&t.ruleForm.isThreeShops.picture3))return void t.$message.info("请上传截图");t.$emit("submit",2)}else t.$emit("submit",2)}else t.$emit("submit",2)}))},timeDown:function(e){var t,s=this,r=e.times;return r?(this.int=setInterval((function(){var i=r%60<10?"0"+r%60:r%60,a=r/3600<10?"0"+parseInt(r/3600):parseInt(r/3600),o=(r-3600*a)/60<10?"0"+parseInt((r-3600*a)/60):parseInt((r-3600*a)/60);t=a+" : "+o+" : "+i,r--,e.timeDown=t,e.times=r,s.taskRequire=e}),1e3),r<0&&clearInterval(this.int),t):0}}},c=u,p=(s("f461"),s("2877")),m=Object(p["a"])(c,n,l,!1,null,null,null),d=m.exports,h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"step"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[s("h4",[e._v(e._s(e.taskRequire.isThreeShops?"二":"一")+"、 查找目标宝贝")]),s("p",[e._v("1.关键词："+e._s(e.taskRequire.searchTerms))]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.copyTextToClipboard(e.taskRequire.searchTerms)}}},[e._v("复制关键词")]),s("p",[e._v("2、参考宝贝主图")]),s("img",{attrs:{src:e.taskRequire.picture1,alt:""}}),s("p",[e._v("3、请录入已正确找到的商家旺旺号名称")]),s("el-form-item",{attrs:{prop:"value1"}},[s("el-input",{attrs:{placeholder:"用户名"},model:{value:e.ruleForm.value1,callback:function(t){e.$set(e.ruleForm,"value1",t)},expression:"ruleForm.value1"}})],1),this.timeDown(e.taskRequire)>0?s("p",[e._v("下单剩余时间："),s("span",{domProps:{textContent:e._s(e.taskRequire.timeDown)}},[e._v("00:59：59")]),e._v("（一小时倒计时）")]):e._e(),s("div",{staticClass:"button"},[e.steps.indexOf(2)>0?s("el-button",{attrs:{type:"primary"},on:{click:e.goPrev}},[e._v("上一步")]):e._e(),s("el-button",{staticStyle:{"margin-left":"40px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],1)],1)},g=[],f={name:"startTask",props:["taskRequire","steps","ruleForm"],data:function(){return{rules:{value1:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},goPrev:function(){this.$emit("submit",this.steps[this.steps.indexOf(2)-1])},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.ruleForm.value1===t.taskRequire.shopName?t.$emit("submit",t.steps[t.steps.indexOf(2)+1]):t.$message.info("输入的旺旺号有误")}))},timeDown:function(e){var t,s=this,r=e.times;return r?(this.int=setInterval((function(){var i=r%60<10?"0"+r%60:r%60,a=r/3600<10?"0"+parseInt(r/3600):parseInt(r/3600),o=(r-3600*a)/60<10?"0"+parseInt((r-3600*a)/60):parseInt((r-3600*a)/60);t=a+" : "+o+" : "+i,r--,e.timeDown=t,e.times=r,s.taskRequire=e}),1e3),r<0&&clearInterval(this.int),t):0}}},v=f,b=(s("f38a"),Object(p["a"])(v,h,g,!1,null,null,null)),y=b.exports,k=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"step"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[s("h4",[e._v(e._s(e.indexDesc[e.steps.indexOf(3)+1])+"、 拍前聊天")]),s("p",[e._v("1、与目标店家客服聊天，至少3问")]),e.taskRequire.isScreenshot?s("p",[e._v("2、截图上传")]):e._e(),e.taskRequire.isScreenshot?s("el-form-item",{attrs:{prop:"top",labelWidth:"0"}},[s("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading,expression:"uploadLoading"}],staticClass:"avatar-uploader",attrs:{"on-progress":e.handelAvatarProgress,"before-upload":e.validateSize,action:"/api/attachment/upload","show-file-list":!1,data:{type:"ORDERS_CHART"},name:"file",accept:"image/png,image/gif,image/jpg,image/jpeg","on-success":function(t,s){e.handleAvatarSuccess(t,s,"picture1")}}},[e.ruleForm.picture1?s("img",{staticClass:"avatar",attrs:{src:e.ruleForm.picture1}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e(),s("div",{staticClass:"button"},[s("el-button",{attrs:{type:"primary"},on:{click:e.goPrev}},[e._v("上一步")]),s("el-button",{staticStyle:{"margin-left":"40px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],1)],1)},S=[],_={name:"startTask",props:["taskRequire","steps","ruleForm"],data:function(){return{uploadLoading:!1,indexDesc:{1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七"},rules:{value1:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{validateSize:function(e){var t=e.size/1024/1024<5;return t||this.$message.error("上传头像图片大小不能超过 5MB!"),t},handelAvatarProgress:function(){this.uploadLoading=!0},copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},handleAvatarSuccess:function(e){this.uploadLoading=!1,this.ruleForm.picture1=e.msg},goPrev:function(){this.$emit("submit",this.steps[this.steps.indexOf(3)-1])},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.ruleForm.picture1||!t.taskRequire.isScreenshot?t.$emit("submit",t.steps[t.steps.indexOf(3)+1]):t.$message.info("请上传截图")}))}}},F=_,x=(s("e5a6"),Object(p["a"])(F,k,S,!1,null,null,null)),C=x.exports,R=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"step"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("h4",[e._v(e._s(e.indexDesc[e.steps.indexOf(4)+1])+"、 浏览评价")]),r("p",[e._v("1、浏览时间不低于2分钟")]),e.taskRequire.isScreenshot?r("p",[e._v("2、截图上传 "),r("a",{on:{click:e.showDialog}},[e._v("截图示例")])]):e._e(),e.taskRequire.isScreenshot?r("el-form-item",{attrs:{prop:"top",labelWidth:"0"}},[r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading,expression:"uploadLoading"}],staticClass:"avatar-uploader",attrs:{"on-progress":e.handelAvatarProgress,"before-upload":e.validateSize,action:"/api/attachment/upload","show-file-list":!1,data:{type:"ORDERS_CHART"},name:"file",accept:"image/png,image/gif,image/jpg,image/jpeg","on-success":function(t,s){e.handleAvatarSuccess(t,s,"picture1")}}},[e.ruleForm.picture1?r("img",{staticClass:"avatar",attrs:{src:e.ruleForm.picture1}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e(),r("div",{staticClass:"button"},[r("el-button",{attrs:{type:"primary"},on:{click:e.goPrev}},[e._v("上一步")]),r("el-button",{staticStyle:{"margin-left":"40px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:s("43f3"),alt:""}})])],1)},w=[],q={name:"startTask",props:["taskRequire","steps","ruleForm"],data:function(){return{dialogVisible:!1,uploadLoading:!1,indexDesc:{1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七"},rules:{value1:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{showDialog:function(){this.dialogVisible=!0},validateSize:function(e){var t=e.size/1024/1024<5;return t||this.$message.error("上传头像图片大小不能超过 5MB!"),t},handelAvatarProgress:function(){this.uploadLoading=!0},copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},handleAvatarSuccess:function(e){this.uploadLoading=!1,this.ruleForm.picture1=e.msg},goPrev:function(){this.$emit("submit",this.steps[this.steps.indexOf(4)-1])},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.ruleForm.picture1||!t.taskRequire.isScreenshot?t.$emit("submit",t.steps[t.steps.indexOf(4)+1]):t.$message.info("请上传截图")}))}}},$=q,T=(s("a7c5"),Object(p["a"])($,R,w,!1,null,null,null)),O=T.exports,D=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"step5"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[s("h4",[e._v(e._s(e.indexDesc[e.steps.indexOf(5)+1])+"、 浏览副宝贝")]),s("p",[e._v("1、浏览副宝贝数量为："+e._s(e.taskRequire.isBrowseBaby))]),e.taskRequire.isScreenshot?s("p",[e._v("2、截图上传")]):e._e(),e._l(e.taskRequire.isBrowseBaby,(function(t){return e.taskRequire.isScreenshot?s("el-form-item",{attrs:{prop:"top",labelWidth:"0"}},[s("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading,expression:"uploadLoading"}],staticClass:"avatar-uploader",attrs:{"on-progress":e.handelAvatarProgress,"before-upload":e.validateSize,action:"/api/attachment/upload","show-file-list":!1,data:{type:"ORDERS_CHART"},name:"file",accept:"image/png,image/gif,image/jpg,image/jpeg","on-success":function(s,r){e.handleAvatarSuccess(s,r,"picture"+t)}}},[e.ruleForm["picture"+t]?s("img",{staticClass:"avatar",attrs:{src:e.ruleForm["picture"+t]}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e()})),s("div",{staticClass:"button"},[s("el-button",{attrs:{type:"primary"},on:{click:e.goPrev}},[e._v("上一步")]),s("el-button",{staticStyle:{"margin-left":"40px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],2)],1)},P=[],A={name:"startTask",props:["taskRequire","steps","ruleForm"],data:function(){return{uploadLoading:!1,indexDesc:{1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七"},rules:{name:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{validateSize:function(e){var t=e.size/1024/1024<5;return t||this.$message.error("上传头像图片大小不能超过 5MB!"),t},handelAvatarProgress:function(){this.uploadLoading=!0},copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},handleAvatarSuccess:function(e,t,s){this.uploadLoading=!1,this.ruleForm[s]=e.msg},goPrev:function(){this.$emit("submit",this.steps[this.steps.indexOf(5)-1])},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.ruleForm.picture1||!t.taskRequire.isScreenshot?t.$emit("submit",t.steps[t.steps.indexOf(5)+1]):t.$message.info("请上传截图")}))}}},j=A,L=(s("d59e"),Object(p["a"])(j,D,P,!1,null,null,null)),E=L.exports,B=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"step"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("h4",[e._v(e._s(e.indexDesc[e.steps.indexOf(6)+1])+"、 宝贝加购物车")]),r("p",[e._v("1、预购买的宝贝提前加入购物车")]),e.taskRequire.isScreenshot?r("p",[e._v("2、截图上传 "),r("a",{on:{click:e.showDialog}},[e._v("截图示例")])]):e._e(),e.taskRequire.isScreenshot?r("el-form-item",{attrs:{prop:"top",labelWidth:"0"}},[r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading,expression:"uploadLoading"}],staticClass:"avatar-uploader",attrs:{"on-progress":e.handelAvatarProgress,"before-upload":e.validateSize,action:"/api/attachment/upload","show-file-list":!1,data:{type:"ORDERS_CHART"},name:"file",accept:"image/png,image/gif,image/jpg,image/jpeg","on-success":function(t,s){e.handleAvatarSuccess(t,s,"picture1")}}},[e.ruleForm.picture1?r("img",{staticClass:"avatar",attrs:{src:e.ruleForm.picture1}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e(),r("div",{staticClass:"button"},[r("el-button",{attrs:{type:"primary"},on:{click:e.goPrev}},[e._v("上一步")]),r("el-button",{staticStyle:{"margin-left":"40px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:s("351c"),alt:""}})])],1)},I=[],z={name:"startTask",props:["taskRequire","steps","ruleForm"],data:function(){return{dialogVisible:!1,uploadLoading:!1,indexDesc:{1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七"},rules:{name:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{showDialog:function(){this.dialogVisible=!0},validateSize:function(e){var t=e.size/1024/1024<5;return t||this.$message.error("上传头像图片大小不能超过 5MB!"),t},handelAvatarProgress:function(){this.uploadLoading=!0},copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},handleAvatarSuccess:function(e){this.uploadLoading=!1,this.ruleForm.picture1=e.msg},goPrev:function(){this.$emit("submit",this.steps[this.steps.indexOf(6)-1])},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.ruleForm.picture1||!t.taskRequire.isScreenshot?t.$emit("submit",t.steps[t.steps.indexOf(6)+1]):t.$message.info("请上传截图")}))}}},V=z,N=(s("cc86"),Object(p["a"])(V,B,I,!1,null,null,null)),H=N.exports,M=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"step"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("h4",[e._v(e._s(e.indexDesc[e.steps.indexOf(7)+1])+"、 收藏宝贝")]),r("p",[e._v("1、预购买的宝贝提前收藏")]),e.taskRequire.isScreenshot?r("p",[e._v("2、截图上传 "),r("a",{on:{click:e.showDialog}},[e._v("截图示例")])]):e._e(),e.taskRequire.isScreenshot?r("el-form-item",{attrs:{prop:"top",labelWidth:"0"}},[r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading,expression:"uploadLoading"}],staticClass:"avatar-uploader",attrs:{"on-progress":e.handelAvatarProgress,"before-upload":e.validateSize,action:"/api/attachment/upload","show-file-list":!1,data:{type:"ORDERS_CHART"},name:"file",accept:"image/png,image/gif,image/jpg,image/jpeg","on-success":function(t,s){e.handleAvatarSuccess(t,s,"picture1")}}},[e.ruleForm.picture1?r("img",{staticClass:"avatar",attrs:{src:e.ruleForm.picture1}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e(),r("div",{staticClass:"button"},[r("el-button",{attrs:{type:"primary"},on:{click:e.goPrev}},[e._v("上一步")]),r("el-button",{staticStyle:{"margin-left":"40px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:s("3344"),alt:""}})])],1)},W=[],G={name:"startTask",props:["taskRequire","steps","ruleForm"],data:function(){return{dialogVisible:!1,uploadLoading:!1,indexDesc:{1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七"},rules:{name:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{showDialog:function(){this.dialogVisible=!0},validateSize:function(e){var t=e.size/1024/1024<5;return t||this.$message.error("上传头像图片大小不能超过 5MB!"),t},handelAvatarProgress:function(){this.uploadLoading=!0},copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},handleAvatarSuccess:function(e){this.uploadLoading=!1,this.ruleForm.picture1=e.msg},goPrev:function(){this.$emit("submit",this.steps[this.steps.indexOf(7)-1])},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.ruleForm.picture1||!t.taskRequire.isScreenshot?t.$emit("submit",t.steps[t.steps.indexOf(7)+1]):t.$message.info("请上传截图")}))}}},J=G,K=(s("79cc"),Object(p["a"])(J,M,W,!1,null,null,null)),Q=K.exports,U=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"step"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("h4",[e._v(e._s(e.indexDesc[e.steps.indexOf(8)+1])+"、 拍下宝贝")]),r("p",[e._v("1、预购买的宝贝提前收藏")]),r("p",[e._v("2、请输入你实际支付的金额")]),r("el-form-item",{attrs:{prop:"value1"}},[r("el-input",{attrs:{placeholder:"实际支付的金额"},model:{value:e.ruleForm.value1,callback:function(t){e.$set(e.ruleForm,"value1",t)},expression:"ruleForm.value1"}})],1),r("p",[e._v("3、请输入宝贝订单编号")]),r("el-form-item",{attrs:{prop:"value2"}},[r("el-input",{attrs:{placeholder:"宝贝订单编号"},model:{value:e.ruleForm.value2,callback:function(t){e.$set(e.ruleForm,"value2",t)},expression:"ruleForm.value2"}})],1),e.taskRequire.isPaymentScreenshot?r("p",[e._v("4、付款截图上传 "),r("a",{on:{click:e.showDialog}},[e._v("截图示例")])]):e._e(),e.taskRequire.isPaymentScreenshot?r("el-form-item",{attrs:{prop:"top",labelWidth:"0"}},[r("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading,expression:"uploadLoading"}],staticClass:"avatar-uploader",attrs:{"on-progress":e.handelAvatarProgress,"before-upload":e.validateSize,action:"/api/attachment/upload","show-file-list":!1,data:{type:"ORDERS_CHART"},name:"file",accept:"image/png,image/gif,image/jpg,image/jpeg","on-success":function(t,s){e.handleAvatarSuccess(t,s,"picture1")}}},[e.ruleForm.picture1?r("img",{staticClass:"avatar",attrs:{src:e.ruleForm.picture1}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e(),r("div",{staticClass:"button"},[r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提交")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:s("c185"),alt:""}})])],1)},X=[],Y={name:"startTask",props:["taskRequire","steps","ruleForm","loading"],data:function(){return{dialogVisible:!1,uploadLoading:!1,indexDesc:{1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七"},rules:{value1:[{required:!0,message:"不能为空",trigger:"blur"}],value2:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{showDialog:function(){this.dialogVisible=!0},validateSize:function(e){var t=e.size/1024/1024<5;return t||this.$message.error("上传头像图片大小不能超过 5MB!"),t},handelAvatarProgress:function(){this.uploadLoading=!0},copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},handleAvatarSuccess:function(e){this.uploadLoading=!1,this.ruleForm.picture1=e.msg},goPrev:function(){this.$emit("submit",this.steps[this.steps.indexOf(8)-1])},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.$emit("submit",9)}))}}},Z=Y,ee=(s("5faa"),Object(p["a"])(Z,U,X,!1,null,null,null)),te=ee.exports;function se(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function re(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?se(s,!0).forEach((function(t){Object(a["a"])(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):se(s).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var ie={name:"startTask",data:function(){return{step:1,submiting:!1,loading:!1,taskRequire:{},steps:[],ruleForm:{isThreeShops:{value1:"",value2:"",value3:"",picture1:"",picture2:"",picture3:""},targetGoods:{value1:""},isChatBeforeShooting:{picture1:""},isBrowseEvaluation:{picture1:""},isBrowseBaby:{picture1:"",picture2:"",picture3:""},isShoppingCart:{picture1:""},isCollectionBaby:{picture1:""},payment:{value1:"",value2:"",picture1:""}}}},created:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,s,r,i,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.$route.params.taskId,s=this.$route.params.taskSubId,r=this.$route.params.buyerNumberId,i=this.$route.params.id,this.loading=!0,e.next=7,this.$API.request(this.$API.taskDetail,"POST",{taskId:t,taskSubId:s,buyNumberId:r,id:i});case 7:a=e.sent,this.loading=!1,a&&a.success?(o=a.data,this.taskRequire=re({},a.data,{times:(new Date(o.endDate).getTime()-new Date(o.currentDate).getTime())/1e3,timeDown:""}),o.isThreeShops?this.steps.push(1,2):this.steps.push(2),o.isChatBeforeShooting&&this.steps.push(3),o.isBrowseEvaluation&&this.steps.push(4),o.isBrowseBaby&&this.steps.push(5),o.isShoppingCart&&this.steps.push(6),o.isCollectionBaby&&this.steps.push(7),this.steps.push(8),this.step=this.steps[0]):"token is invalid,please login again!"===a.msg&&this.$router.push("/login");case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),methods:{copyTextToClipboard:function(e){var t=document.createElement("textarea");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="2em",t.style.height="2em",t.style.padding=0,t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message.success("复制成功"),document.body.removeChild(t)},submit:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var s,r,i,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(9!==t){e.next=13;break}return s=[],r=this,i=this.$route.params.id,Object.keys(this.ruleForm).forEach((function(e){s.push(re({name:e},r.ruleForm[e],{ordersId:i}))})),this.submiting=!0,e.next=8,this.$API.request(this.$API.startTask,"POST",s);case 8:a=e.sent,this.submiting=!1,a&&a.success?(this.$message.success("操作成功"),o=this,setTimeout((function(){o.$router.push("/myTask")}),1e3)):this.$message.info(a.msg),e.next=14;break;case 13:this.step=t;case 14:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},components:{Step1:d,Step2:y,Step3:C,Step4:O,Step5:E,Step6:H,Step7:Q,Step8:te}},ae=ie,oe=Object(p["a"])(ae,r,i,!1,null,"05ae4f53",null);t["default"]=oe.exports},3344:function(e,t,s){e.exports=s.p+"img/stepShow3.d3b1ba67.png"},"351c":function(e,t,s){e.exports=s.p+"img/stepShow2.359dd93a.png"},"43f3":function(e,t,s){e.exports=s.p+"img/stepShow1.44fa6cd7.png"},"5faa":function(e,t,s){"use strict";var r=s("642f"),i=s.n(r);i.a},"642f":function(e,t,s){},"79cc":function(e,t,s){"use strict";var r=s("0169"),i=s.n(r);i.a},"944b":function(e,t,s){},a7c5:function(e,t,s){"use strict";var r=s("00f2"),i=s.n(r);i.a},b81e:function(e,t,s){},c185:function(e,t,s){e.exports=s.p+"img/stepShow4.3e6be7f6.png"},cc86:function(e,t,s){"use strict";var r=s("0dc6"),i=s.n(r);i.a},d59e:function(e,t,s){"use strict";var r=s("b81e"),i=s.n(r);i.a},e5a6:function(e,t,s){"use strict";var r=s("03bc"),i=s.n(r);i.a},f38a:function(e,t,s){"use strict";var r=s("944b"),i=s.n(r);i.a},f461:function(e,t,s){"use strict";var r=s("fb37"),i=s.n(r);i.a},fb37:function(e,t,s){}}]);