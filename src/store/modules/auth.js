import auth from '@/api/auth'

const state = {
    // 用户数据
    user: null,

    //登录状态
    isLogin: false
}
const getters = {
    user: state => state.user,
    isLogin: state => state.isLogin
}
const mutations = {
    // 更新用户
    setUser(state, payload) {
        state.user = payload.user
    },

    // 更新用户登录状态
    setLogin(state, payload) {
        state.isLogin = payload.isLogin
    }
}
const actions = {
    // 用户登录  {commit} 是默认参数，相当于 context.commit，使用了 ES6 的参数结构
    login({commit}, {username, password}) {
        // 调用底层接口，返回的是一个 Promise 对象
        return auth.login({username, password})
            .then(res => {
                // 把通过 axios 获取回来的用户数据提交 mutation，更新到 state： commit -> setUser -> state
                commit('setUser', {user: res.data})
                commit('setLogin', {isLogin: true})
            })
    },

    // 用户注册
    async register({commit}, {username, password}) {
        // let res 就是异步 auth.register 获取的结果
        let res = await auth.register({username, password})
        commit('setUser', {user: res.data})
        commit('setLogin', {isLogin: true})
        return res.data
    },

    // 检测用户是否登录
    async checkLogin({commit, state}) {

        // 先从本地store的state去看用户是否登录,如果登录了 就返回true，继续执行下去
        if (state.isLogin) {
            return true
        }

        // 如果本地没有这个状态，就发ajax请求去服务器，服务器会返回一个isLogin的响应，根据这个值来确定是否登录
        let res = await auth.getInfo()
        commit('setLogin', {isLogin: res.isLogin})
        if (!res.isLogin) return false

        commit('setUser', {user: res.data})
        return true
    },

    // 注销
    async logout({commit}) {
        await auth.logout()
        commit('setUser', {user: null})
        commit('setLogin', {isLogin: false})
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}