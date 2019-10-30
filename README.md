# blog-client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---

# 多人共享博客

上一个项目：[仿 CNODE 社区](https://zhuanlan.zhihu.com/p/46791872) 刚完成，感觉有点意犹未尽，对于 登录 这一块老师并没有展开，我先是用了 localStorage 自己瞎搞，跑通之后想了下，vuex 不是专门做全局状态管理的么？那么用 vuex 做登录是最合适不过的呀。于是又搜了些别人用 vuex 做登录状态管理的案例，算是搞明白了。

现在选择了若愚老师的这个项目，主要是巩固一下对 vue 的认识，同时对 vuex 做个更详细的了解。

>本项目做一款多人共享博客，包含首页、用户文章列表、登录、注册、个人管理、编辑、发布等功能。

**测试账号：** hunger10086

**测试密码：** 123456

项目链接：[GitHub](https://github.com/no1harm/blog-client)

预览链接：[Git Pages](https://no1harm.github.io/blog-client/dist/index.html)

实现功能:

- 用户的登录、注册、注销

![注册登录页面](https://ws1.sinaimg.cn/large/006cedGGgy1fwgz5u2ogqj311y0jb0td.jpg)

- 首页多人博客展示

![首页](https://ws1.sinaimg.cn/large/006cedGGgy1fwgz43mv6lj311y1cljvz.jpg)

- 用户博文展示

![博文展示](https://ws1.sinaimg.cn/large/006cedGGgy1fwgzagw706j311y0jbwfm.jpg)

- 我的页面博文展示及管理

![博文展示及管理](https://ws1.sinaimg.cn/large/006cedGGgy1fwgzbt8jyfj311y0jbwfl.jpg)

- 博文的创建、编辑、删除、发布

![创建博文](https://ws1.sinaimg.cn/large/006cedGGgy1fwgz92qt9nj311y0mc0tt.jpg)

使用 Vue.js 技术栈：vue-cli / vue2 / axios / vue-router /vuex / es6 / webpack / element-ui

博客主要记录项目完成过程中学习到的知识点，其他的就一笔带过了。

---

## 项目初始化

老套路了..[使用 vue-cli 创建项目骨架](https://zhuanlan.zhihu.com/p/46215160)

[创建路由](https://github.com/no1harm/blog-client/commit/1037402b385b0e62b4f2d14065873b890e7941bf)

在 vue 项目中使用 less: `<style scoped lang='less'></style>`

如果要在某个组件中引入 less 文件，则在 style 中写入 `@import '../assets/base.less';` 即可(记得 npm 装上 less 和 less-loader 哦)

---

## ElementUI 的使用

ElementUI 的有很详细的[安装使用文档](http://element-cn.eleme.io/#/zh-CN/component/installation)

主要步骤：

1.安装 `cnpm i element-ui`

2.引入

```javascript
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
```

3.挂载到 Vue `Vue.use(ElementUI)`

然后就可以在组件中使用 element-ui 了。

---

## 数据请求接口封装

另外，若愚老师前期还对 axios 底层请求做了进一步的定制和封装，其中一些技巧很值得学习。

1.先把 axios 请求封装成了输入参数更简洁明了、报错信息更「人性化」的 Promise 对象。

```javascript
//  /helpers/request.js
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      console.log(res.data)
      if(res.data.status === 'ok') {
        resolve(res.data)
      }else{
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      Message.error('网络异常')
      reject({ msg: '网络异常' })
    })
  })
}
```

2.再把获取数据的 API 进行封装，使其更易用：

```javascript
import request from '@/helpers/request'

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}

export default {
  // 注册
  register({username, password}) {
    return request(URL.REGISTER, 'POST', { username, password })
  },
    // 登录
  login({username, password}) {
    return request(URL.LOGIN, 'POST', { username, password })
  },
    // 登出
  logout() {
    return request(URL.LOGOUT)
  },
    // 获取信息
  getInfo() {
    return request(URL.GET_INFO)
  }
}
```

这样子处理的话，登录请求就可以不使用 `axios('http://blog-server.hunger-valley.com/auth/login','POST',{username,password})` 那么繁琐了，直接 `auth.login({username,password})` 就完事了~

可以查看此 [commit](https://github.com/no1harm/blog-client/commit/91d89e635f60785fd363df8674391446eff0d4e0)

---

## grid

使用 grid 进行布局。

关于 grid 布局之前有了解过，grid 通过在页面上划分 columns 和 rows ，然后把内容分别放进不同区域来建立布局，也写过 demo，但真正在项目中使用还是第一次。关于 grid 的教程可以参考[这里](https://jirengu.github.io/css-you-should-know/)

如在项目中的使用：

```less
#app {
  display: grid;
  // 分成三列，左右列宽度分别是页面的12%，中间内容宽度自适应
  grid-template-columns: 12% auto 12%;
  // 分成三行，上下行高度自适应，中间内容占满剩余宽度
  grid-template-rows: auto 1fr auto;
  // 划分区域
  grid-template-areas: "header header header"
                       ".      main   .     "
                       "footer footer footer";
  #header{
    grid-area: header;
    padding-left: 12%;
    padding-right: 12%;
  }
  #main{
    grid-area: main;
  }
  #footer{
    grid-area: footer;
    padding-left: 12%;
    padding-right: 12%;
  }
}
```

可以查看此 [commit](https://github.com/no1harm/blog-client/commit/26bcff7762ba9147a39bb9fc118088b29b43c29a)

---

## async/await

在完成项目的过程中接触到了 async/await ：

async/await 是异步编程的一种解决方案。

async 声明一个函数为异步函数，这个函数返回的是一个 Promise 对象；

await 用于等待一个 async 函数的返回值(注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。)

以项目中用户注册为例：

```javascript
// 声明 register 为一个异步函数，他会返回一个 Promise 对象
async register({commit},{username,password}){

    // 用户注册成功后后会返回的一个 Promise 对象，其中包含了用户的信息，let res 就是异步 auth.register 获取的结果
    let res = await auth.register({username,password})
    commit('setUser',{user:res.data})
    commit('setLogin',{isLogin:true})

    // 把 res.data 返回出去，使用 register() 后就可以用 then 来处理这个结果
    return res.data
},
```

对于 async/await，我参考了 边城 在 segmentfault 中的这边[文章](https://segmentfault.com/a/1190000007535316)。

---

## Vuex

如何在项目中使用 vuex 管理状态？(以登录为例)

- 1.创建store，定义 state/getters/mutations/actions

>由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
>为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

在这里针对不同的内容状态管理划分到不同的文件，保持可读性：

```cmd
store
|
│  index.js // 引入子模块
│  
└─modules
        auth.js   // 负责用户注册、登录状态
        blog.js   // 负责用户获取、发布、修改博客等
```

把负责用户注册登录的 state 写在了 auth.js:

```javascript
// auth.js
import auth from '@/api/auth'

const state = {
    // 先定义一个默认的用户状态
    user:null,

    //登录状态
    isLogin:false
}
const getters = {
    // 获取 state 数据
    user:state => state.user,
    isLogin:state => state.isLogin
}
const mutations = {
    // 更新用户数据
    setUser(state,payload){
        state.user = payload.user
    },

    // 更新用户登录状态
    setLogin(state,payload){
        state.isLogin = payload.isLogin
    }
}
const actions = {
    ...
    // 检测用户是否登录
    async checkLogin({commit,state}){

        // 先从本地store的state去看用户是否登录,如果登录了 就返回true
        if(state.isLogin) return true
        let res = await auth.getInfo()
        commit('setLogin',{isLogin:res.isLogin})

        // 如果本地没有这个状态，就发ajax请求去服务器，服务器会返回一个isLogin的响应，根据这个值来确定是否登录
        if(!res.isLogin) return false
        commit('setUser',{user:res.data})

        // 最后的 return true 是为了在实例中then拿到这个true，方便做下一步处理
        return true
    },
    // 用户登录  {commit} 是默认参数，相当于 context.commit，使用了 ES6 的参数结构
    login({commit},{username,password}){

        // 调用底层接口，返回的是一个 Promise 对象
        return auth.login({username,password})
            .then(res => {

        // 把通过 axios 获取回来的用户数据提交 mutation，更新到 state： commit -> setUser -> state
                commit('setUser',{user:res.data})
                commit('setLogin',{isLogin:true})
            })
    },
    ...
}
export default {
    state,
    getters,
    mutations,
    actions
}
```

- 2.在 /store/index.js 把模块引入进来：

```javascript
// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        auth,
    }
})
```

- 3.在相关组件中映射属性，commit 更新

在 Login.vue 中，我们要做的事情就是：点击按钮后，调用 auth.js 中的 `login()` 方法，完成登录，更新 state 中的数据，并给需要的组件更新状态（如 header.vue）

首先映射 login 方法到此组件，这样此组件就可以通过 `this.login` 来调用这个 auth.js 中的方法了：

```javascript
//Login.vue
import {mapActions} from 'vuex'


export default {
  name:'Login',
  methods:{
    ...mapActions([
        'login'
      ]),
  },
}
```

接着设置点击事件，点击按钮会执行 onLogin，调用 this.login ，发送 axios 请求 `auth.login({username,password})`，成功注册后 commit mutation，更新 state 数据，跳转到首页：

```html
<el-button size="medium" @click="onLogin">立即登录</el-button>
```

```javascript
//Login.vue
methods:{
    ...mapActions([
        'login'
      ]),
      onLogin(){
        this.login({username:this.username,password:this.password})
          .then(()=>{
            console.log(`${this.username},${this.password}`)
            this.$router.push({path:'/'})
          })
      }
  },
```

- 4.在相关组件中关联 state 数据，实现状态切换

在 Header 中，登录和未登录，他的样式在两种状态下是不一样的：

未登录的时候，header 会显示提示登录和注册的按钮；登录之后，header 会显示用户头像及其他操作选项。

而这两种状态的切换，就要依靠我们的 state 了，首先引入映射 `{mapGetters,mapActions}`，在页面还未渲染的时候检查 state 中用户登录状态，用户已登录，则返回 `isLogin = true` ，获取用户信息，渲染到页面上；用户未登录，则返回 `isLogin = false`。

```html
<header :class="{login:isLogin,'no-login':!isLogin}">
```

```javascript
// Header.vue
import {mapGetters,mapActions} from 'vuex'

export default {
  name:'Header',
  // 把 store 中 getter 属性映射到此组件
  computed:{
    ...mapGetters([
      'isLogin',
      'user'
    ])
  },
  //在页面没有渲染之前检查用户是否登录
  created(){
    this.checkLogin()
  },
  methods:{
    // 把 auth.js 中的 checkLogin 方法映射到此组件
    ...mapActions([
      'checkLogin'
    ]),
  },
```

这就是 vuex 在在项目中管理登录状态了。

---

## 完善路由

添加[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)。

项目中有一些页面，比如添加文章、编辑文章等等，都需要先确认用户是否登录才能操作，否则将会自动跳转到登录页。

路由元信息做的就是这样一件事情，我们给某段路由添加一个 meta 字段 `meta:{ requiresAuth:true }`，这段路由路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。通过遍历 $route.matched 来检查路由记录中的 meta 字段，对访问的路径做一个状态检查，从而确定是否允许访问。

```javascript
const router = new Router({
  routes: [
    ...
    {
      path: '/Create',
      component: () =>import ('@/pages/Create/Create'),
      // 路由添加 meta 字段
      meta:{ requiresAuth:true }
    },
    ...
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果 store.dispatch('checkLogin') 返回的结果 isLogin 为 false，则说明用户没有登录，就会跳转到 /login
    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})
```

---

## 懒加载

小技巧 - 按需加载，节约性能：

>按需加载的适用场景，比如说「访问某个路由的时候再去加载对应的组件」，用户不一定会访问所有的路由，所以没必要把所有路由对应的组件都先在开始的加载完；更典型的例子是「某些用户他们的权限只能访问某些页面」，所以没必要把他们没权限访问的页面的代码也加载。

```javascript
// before
import Index from '@/pages/Index/Index'
const router = new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    ...
  ]
})

// after
const router = new Router({
  routes: [
    {
      path: '/',
      component: () =>import ('@/pages/Index/Index')
    },
    ...
  ]
})
```

---

## marked

使用 [marked.js](https://github.com/markedjs/marked) 对 markdown 内容进行转换:

文章详情页(Detail)中，通过服务器返回的文章内容是 markdown 格式的，先用 marked.js 库处理一下，再使用 v-html 渲染到页面中。

1.安装 `cnpm install marked`

2.在组件中引入 `import marked from 'marked'`

3.把内容进行转换：

```javascript
computed:{
    markdown(){
      return marked(this.rawContent)  //this.rawContent 是从服务器获取的文章正文
    }
  },
```

4.在页面中引入： `<section class="article" v-html='markdown'></section>`

---

## vue-devTools

最后介绍一款小插件，可以在使用 vue 开发的时候更好地调试和 debug。

>vue-devtools是一款基于chrome游览器的插件，用于调试vue应用，这可以极大地提高我们的调试效率。

GitHub 文档：[vue-devtools](https://github.com/vuejs/vue-devtools)

Chrome 插件下载地址：[Get the Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

>当我们添加完vue-devtools扩展程序之后，我们在调试vue应用的时候，chrome开发者工具中会看一个vue的一栏，点击之后就可以看见当前页面vue对象的一些信息。vue-devtools使用起来还是比较简单的，上手非常的容易，这里就细讲其使用说明了。

![效果](https://raw.githubusercontent.com/vuejs/vue-devtools/master/media/screenshot-shadow.png)

![效果](https://raw.githubusercontent.com/vuejs/vue-devtools/master/media/demo.gif)