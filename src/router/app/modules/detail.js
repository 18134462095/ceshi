/**
 * 商品页面
 */
export default [
  {
    // 商品详情
    path: 'detail',
    name: 'Detail',
    component: resolve => require(['@/views/app/detail/index'], resolve)
  },
  {
    // 商品详情
    path: 'detail2',
    name: 'Detail2',
    component: resolve => require(['@/views/app/detail/index2'], resolve)
  },
]