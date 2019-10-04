import Vue from 'vue'
import Router from 'vue-router'
// import Create from '@/pages/Create/Create'
// import Detail from '@/pages/Detail/Detail'
// import Edit from '@/pages/Edit/Edit'
// import Index from '@/pages/Index/Index'
// import Login from '@/pages/Login/Login'
// import My from '@/pages/My/My'
// import Register from '@/pages/Register/Register'
// import User from '@/pages/User/User'
import store from '../store'


Vue.use(Router)
window.store = store

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import ('@/pages/Index/Index')
        },
        {
            path: '/Login',
            component: () => import ('@/pages/Login/Login')
        },
        {
            path: '/Register',
            component: () => import ('@/pages/Register/Register')
        },
        {
            path: '/Create',
            component: () => import ('@/pages/Create/Create'),
            meta: {requiresAuth: true}
        },
        {
            path: '/Detail/:blogId',
            component: () => import ('@/pages/Detail/Detail')
        },
        {
            path: '/Edit/:blogId',
            component: () => import ('@/pages/Edit/Edit'),
            meta: {requiresAuth: true}
        },
        {
            path: '/My',
            component: () => import ('@/pages/My/My'),
            meta: {requiresAuth: true}
        },
        {
            path: '/User/:userId',
            component: () => import ('@/pages/User/User'),
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        store.dispatch('checkLogin').then(isLogin => {
            if (!isLogin) {
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
            } else {
                next()
            }
        })
    } else {
        next() // 确保一定要调用 next()
    }
})
export default router