(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04f2f386"],{5117:function(e,t,r){},"825d":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"realName"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("p",[e._v("已发送验证码到您的手机")]),r("h4",{domProps:{textContent:e._s(e.phone)}}),r("el-form-item",{attrs:{prop:"verificationCode",label:""}},[r("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.verificationCode,callback:function(t){e.$set(e.ruleForm,"verificationCode",t)},expression:"ruleForm.verificationCode"}}),r("span",{directives:[{name:"loading",rawName:"v-loading",value:e.sendLoading,expression:"sendLoading"}],staticClass:"code",on:{click:function(t){return t.preventDefault(),e.sendCode(t)}}},[e._v(e._s(e.codeDesc))])],1),r("el-form-item",[r("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提交")])],1)],1)],1)},o=[],s=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),a=(r("96cf"),r("3b8d"));function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(r,!0).forEach((function(t){Object(s["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var c={name:"phoneAuth",data:function(){return{sendLoading:!1,loading:!1,phone:"",codeDesc:"发送验证码",total:180,ruleForm:{verificationCode:""},rules:{verificationCode:[{required:!0,message:"不能为空",trigger:"blur"}]}}},created:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$API.request(this.$API.getUserInfo,"POST");case 2:t=e.sent,t&&t.success&&(r=t.data,this.phone=r.phone),"OVERTIME"===t.code&&this.$router.push("/login");case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),methods:{sendCode:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.phone){e.next=3;break}return this.$message({message:"请输入手机号",type:"warning"}),e.abrupt("return");case 3:if(180===this.total){e.next=5;break}return e.abrupt("return");case 5:return t=this,this.sendLoading=!0,e.next=9,this.$API.request(this.$API.getSmsCode,"POST",{phone:this.phone,type:"phoneAuth"});case 9:r=e.sent,this.sendLoading=!1,r&&r.success?n=setInterval((function(){t.total-=1,t.codeDesc=t.total+"s",t.total<1&&(t.codeDesc="发送验证码",t.total=180,clearInterval(n))}),1e3):this.$message.info(r.msg);case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(r){var n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=9;break}return t.loading=!0,e.next=4,t.$API.request(t.$API.phoneAuth,"POST",u({},t.ruleForm));case 4:n=e.sent,t.loading=!1,n&&n.success?(t.$message.success("提交成功"),o=t,setTimeout((function(){o.$router.push("/userInfo")}),1e3)):t.$message.error(n.msg),e.next=10;break;case 9:return e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},l=c,d=(r("d72d"),r("2877")),p=Object(d["a"])(l,n,o,!1,null,null,null);t["default"]=p.exports},d72d:function(e,t,r){"use strict";var n=r("5117"),o=r.n(n);o.a}}]);
//# sourceMappingURL=chunk-04f2f386.js.map