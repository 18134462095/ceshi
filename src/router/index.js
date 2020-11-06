import Vue from 'vue'
import Router from 'vue-router'
import app from './app'
import manager from './manager'
import store from '@/store'
import api from '@/http/api'

Vue.use(Router)

let router = new Router({
    routes: [
        app,
        manager,
        {
            path: '*',
            redirect: '/app'
        },
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/login'], resolve),
        },
        {
            path: '/start',
            name: 'Start',
            component: resolve => require(['@/start'], resolve),
        },
        {
            path: '/advertising',
            name: 'advertising',
            component: resolve => require(['@/advertising'], resolve),
        },
    ],
})

router.beforeEach((to, from, next) => {
    // console.log(to.path,'router')
    if (to.name == 'Login') {
        next()
        return
    }
    // 启动页
    if (store.getters.info != null) {
        next()
    } else {
        api.app.my.getMemberInfo().then(res => {
            if (res.code == 200) {
                store.commit('memberInfo', res.data)
                    // 通知公告
                let pageIndex0 = 0
                api.app.my.getNotices({
                    pageIndex: pageIndex0
                }).then(rs => {
                    store.commit('changeInform', rs.data.data.content)
                })
                next()
            } else {
                if (to.name == 'AppIndex') {
                    next()
                } else {
                    next('/login')
                }
            }
        })
    }
})

export default router