/**
 * 商城页面
 */
export default [{
    // 淘宝
    path: 'TB',
    name: 'TB',
    component: resolve => require(['@/views/app/mall/taobao'], resolve),
    meta: {
      keepAlive: true,
    }
  },
  {
    // 京东
    path: 'JD',
    name: 'JD',
    component: resolve => require(['@/views/app/mall/jingdong'], resolve),
    meta: {
      keepAlive: true,
    }
  },
  {
    // 拼多多
    path: 'PDD',
    name: 'PDD',
    component: resolve => require(['@/views/app/mall/pinduoduo'], resolve),
    meta: {
      keepAlive: true,
    }
  },
  {
    // 团油
    path: 'tuanyou',
    name: 'tuanyou',
    component: resolve => require(['@/views/app/mall/tuanyou/tuanyou'], resolve),
    meta: {
      keepAlive: true,
    }
  },
  {
    // 团油 一键加油
    path: 'yjjy',
    name: 'yjjy',
    component: resolve => require(['@/views/app/mall/tuanyou/yjjy'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 一键加油搜索
    path: 'yjjyserch',
    name: 'yjjyserch',
    component: resolve => require(['@/views/app/mall/tuanyou/yjjyserch'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 加油站详情
    path: 'jiayoudetail',
    name: 'jiayoudetail',
    component: resolve => require(['@/views/app/mall/tuanyou/jiayoudetail'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 优惠券
    path: 'coupon',
    name: 'coupon',
    component: resolve => require(['@/views/app/mall/tuanyou/coupon'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 加油订单
    path: 'JYorder',
    name: 'JYorder',
    component: resolve => require(['@/views/app/mall/tuanyou/JYorder'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 加油订单
    path: 'help',
    name: 'help',
    component: resolve => require(['@/views/app/mall/tuanyou/help'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 订单详情
    path: 'JYdetails',
    name: 'JYdetails',
    component: resolve => require(['@/views/app/mall/tuanyou/JYdetails'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 订单详情
    path: 'mapview',
    name: 'mapview',
    component: resolve => require(['@/views/app/mall/tuanyou/mapview'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
  {
    // 团油 去加油
    path: 'gojiayou',
    name: 'gojiayou',
    component: resolve => require(['@/views/app/mall/tuanyou/gojiayou'], resolve),
    // meta: {
    //     keepAlive: true,
    // }
  },
]
