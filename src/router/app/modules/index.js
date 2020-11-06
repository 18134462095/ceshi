/**
 * app 一级页面
 */
export default [{
    // 首页
    path: 'index',
    name: 'AppIndex',
    component: resolve => require(['@/views/app/home/a'], resolve),
    meta: {
      nav: true,
      keepAlive: true
    },
  },
  {
    // 我的
    path: 'my',
    name: 'My',
    component: resolve => require(['@/views/app/my/a'], resolve),
    meta: {
      nav: true
    }
  },
  {
    path: '/app',
    redirect: 'index'
  },
  {
    // 大牌秒杀
    path: 'commission',
    name: 'Commission',
    component: resolve => require(['@/views/app/commission/index'], resolve),
    meta: {
      keepAlive: true,
      nav: true
    }
  },
  {
    // 9.9包邮
    path: 'support',
    name: 'Support',
    component: resolve => require(['@/views/app/support/index'], resolve),
    meta: {
      nav: true,
      keepAlive: true
    }
  },
  {
    // 商品分类
    path: 'commodityclass',
    name: 'Commodityclass',
    component: resolve => require(['@/views/app/support/commodityclass'], resolve),
  }
]
