/**
 * 首页 子级页面
 */
export default [{
        // 搜索
        path: 'search',
        name: 'Search',
        component: resolve => require(['@/views/app/home/search'], resolve),
        beforeEnter(to, from, next) {
            to.meta.keepAlive = true
            next()
        }
    },
    {
        // 看新闻
        path: 'news',
        name: 'News',
        component: resolve => require(['@/views/app/home/news/index'], resolve),
    },
]