webpackJsonp([8],{"F/pk":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t("Dd8w"),o=t.n(s),r=t("NYxO"),a={name:"Login",data:function(){return{username:"",password:""}},methods:o()({},Object(r.b)(["login"]),{onLogin:function(){var e=this;this.login({username:this.username,password:this.password}).then(function(){console.log(e.username+","+e.password),e.$router.push({path:e.$route.query.redirect||"/"})})}}),components:{}},i={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"login"}},[t("h4",[e._v("用户名")]),e._v(" "),t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"用户名"},model:{value:e.username,callback:function(n){e.username=n},expression:"username"}}),e._v(" "),t("h4",[e._v("密码")]),e._v(" "),t("el-input",{attrs:{type:"password",placeholder:"密码"},on:{keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13,n.key,"Enter")?e.onLogin(n):null}},model:{value:e.password,callback:function(n){e.password=n},expression:"password"}}),e._v(" "),t("el-button",{attrs:{size:"medium"},on:{click:e.onLogin}},[e._v("立即登录")]),e._v(" "),t("p",{staticClass:"notice"},[e._v("没有账号？"),t("router-link",{attrs:{to:"/register"}},[e._v("注册新用户")])],1)],1)},staticRenderFns:[]};var u=t("VU/8")(a,i,!1,function(e){t("cM7Y")},"data-v-001e6946",null);n.default=u.exports},cM7Y:function(e,n){}});
//# sourceMappingURL=8.fe1ee582b17618881a8f.js.map