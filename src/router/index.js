import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/index',
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/pages/home/index')
    },
]
const router = new VueRouter({
    routes
})
router.beforeEach((to, from ,next) => {
    next()
})

export default router