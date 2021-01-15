import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

const routes: Array<RouteRecordRaw> = [

    {
        path: '/login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

// 全局路由守卫(登录拦截)
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === '/login') {
        next()
        NProgress.done()
    } else {
        if ((store.getters as any)['base/token']) {
            next();
            NProgress.done()
            return
        } else {
            next('/login');
            NProgress.done()
            return
        }
    }

})
router.afterEach(() => {
    NProgress.done()
})


export default router
