webpackJsonp([6],{"3vFf":function(t,e){},RHcW:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("ZYmg"),a={name:"Edit",data:function(){return{blogId:null,atIndex:!1,title:"",description:"",content:""}},computed:{textLimit:function(){return this.title.length},descriptionLimit:function(){return this.description.length}},created:function(){var t=this;this.blogId=this.$route.params.blogId,i.a.getDetail({blogId:this.blogId}).then(function(e){t.title=e.data.title,t.description=e.data.description,t.content=e.data.content,t.atIndex=e.data.atIndex})},methods:{onEdit:function(){var t=this;i.a.updateBlog({blogId:this.blogId},{title:this.title,content:this.content,description:this.description,atIndex:this.atIndex}).then(function(e){t.$message.success(e.msg),t.$router.push({path:"/detail/"+e.data.id})})}},components:{}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"edit"}},[n("h1",[t._v("创建文章")]),t._v(" "),n("h3",[t._v("文章标题")]),t._v(" "),n("el-input",{attrs:{maxlength:20},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),t._v(" "),n("p",{staticClass:"msg"},[t._v("限"+t._s(t.textLimit)+"/30个字")]),t._v(" "),n("h3",[t._v("内容简介")]),t._v(" "),n("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},maxlength:140},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),t._v(" "),n("p",{staticClass:"msg"},[t._v("限"+t._s(t.descriptionLimit)+"/140个字")]),t._v(" "),n("h3",[t._v("文章内容")]),t._v(" "),n("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:30}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),t._v(" "),n("p",[n("label",[t._v("是否展示在首页")]),t._v(" "),n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.atIndex,callback:function(e){t.atIndex=e},expression:"atIndex"}})],1),t._v(" "),n("el-button",{staticClass:"confirmBtn",on:{click:t.onEdit}},[t._v("确定")])],1)},staticRenderFns:[]};var s=n("VU/8")(a,o,!1,function(t){n("3vFf")},"data-v-2fb3f1dc",null);e.default=s.exports}});
//# sourceMappingURL=6.495a6e0b2bb16dfdea60.js.map