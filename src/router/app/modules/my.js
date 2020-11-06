/**
 * 个人中心 子级页面
 */
export default [
  {
    // 订单
    path: 'order',
    name: 'Order',
    component: resolve => require(['@/views/app/my/order/order'], resolve),
  },
  {
    // 订单找回
    path: 'orderfind',
    name: 'orderfind',
    component: resolve => require(['@/views/app/my/orderfind/index'], resolve),
  },
  {
    // 充值
    path: 'recharge',
    name: 'Recharge',
    component: resolve => require(['@/views/app/my/recharge/index'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    // 粉丝
    path: 'fans',
    name: 'Fans',
    component: resolve => require(['@/views/app/my/fans/fans'], resolve),
  },
  {
    // 粉丝详情
    path: 'fansMsg',
    name: 'FansMsg',
    component: resolve => require(['@/views/app/my/fans/fansMsg'], resolve),
  },
  {
    // 充值方式
    path: 'rechargetype',
    name: 'Rechargetype',
    component: resolve => require(['@/views/app/my/recharge/rechargetype'], resolve),
  },
  {
    // 充值记录
    path: 'czjl',
    name: 'Czjl',
    component: resolve => require(['@/views/app/my/recharge/czjl'], resolve),
  },
  {
    // 充值成功
    path: 'success',
    name: 'Success',
    component: resolve => require(['@/views/app/my/recharge/success'], resolve),
  },
  {
    // 收益
    path: 'profit',
    name: 'Profit',
    component: resolve => require(['@/views/app/my/profit/index'], resolve),
  },
  {
    // 收益 收支明细
    path: 'incomedetail',
    name: 'incomedetail',
    component: resolve => require(['@/views/app/my/profit/incomedetail'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    // 收益 历史概况
    path: 'survey',
    name: 'survey',
    component: resolve => require(['@/views/app/my/profit/survey'], resolve),
    beforeEnter: (to, from, next) => {
      to.meta.keepAlive = true;
      next();
    }
  },
  {
    // 收益 详情
    path: 'profitdetail',
    name: 'profitdetail',
    component: resolve => require(['@/views/app/my/profit/profitdetail'], resolve),
  },
  {
    // 新手指引
    path: 'guide',
    name: 'Guide',
    component: resolve => require(['@/views/app/my/guide/index'], resolve),
  },
  {
    // 个人设置
    path: 'settingss',
    name: 'Settingss',
    component: resolve => require(['@/views/app/my/settingss/index'], resolve),
  },
  {
    // 昵称修改
    path: 'nickname',
    name: 'Nickname',
    component: resolve => require(['@/views/app/my/settingss/nickname'], resolve),
  },
  {
    // 卡包
    path: 'card',
    name: 'Card',
    component: resolve => require(['@/views/app/my/card/index'], resolve),
  },
  {
    // 我的收藏
    path: 'collection',
    name: 'Collection',
    component: resolve => require(['@/views/app/my/collection/index'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    // 优惠券
    path: 'coupons',
    name: 'Coupons',
    component: resolve => require(['@/views/app/my/coupons/index'], resolve),
  },
  {
    // 浏览记录
    path: 'browsing',
    name: 'Browsing',
    component: resolve => require(['@/views/app/my/browsing/index'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    // 相似推荐
    path: 'similarity',
    name: 'Similarity',
    component: resolve => require(['@/views/app/my/browsing/similarity'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    // 收货地址
    path: 'goodsaddress',
    name: 'Goodsaddress',
    component: resolve => require(['@/views/app/my/settingss/goodsaddress'], resolve),
  },
  {
    // 新增收货地址
    path: 'addgoods',
    name: 'Addgoods',
    component: resolve => require(['@/views/app/my/settingss/addgoods'], resolve),
  },
  {
    // 签到
    path: 'signin',
    name: 'Signin',
    component: resolve => require(['@/views/app/my/signin/index'], resolve),
  },
  {
    // 抽大奖
    path: 'Lottery',
    name: 'Lottery',
    component: resolve => require(['@/views/app/my/Lottery/index'], resolve),
  },
  {
    // 赚钱
    path: 'money',
    name: 'Money',
    component: resolve => require(['@/views/app/my/money/index'], resolve),
  },
  {
    // 意见反馈
    path: 'feedback',
    name: 'Feedback',
    component: resolve => require(['@/views/app/my/feedback/index'], resolve),
  },
  {
    // 关于我们
    path: 'about',
    name: 'About',
    component: resolve => require(['@/views/app/my/about/index'], resolve),
  },
  {
    // 联系我们
    path: 'contact',
    name: 'Contact',
    component: resolve => require(['@/views/app/my/contact/index'], resolve),
  },
  {
    // 分享有礼
    path: 'fenxiangyl',
    name: 'Fenxiangyl',
    component: resolve => require(['@/views/app/my/fenxiangyl/index'], resolve),
  },
  {
    // 官方公告
    path: 'notice',
    name: 'Notice',
    component: resolve => require(['@/views/app/my/notice/index'], resolve),
  },
  {
    // 常见问题
    path: 'problem',
    name: 'Problem',
    component: resolve => require(['@/views/app/my/problem/index'], resolve),
  },
  {
    // 提现详情
    path: 'withdraw',
    name: 'withdraw',
    component: resolve => require(['@/views/app/my/withdraw/index'], resolve),
  },
  {
    // 提现操作
    path: 'lijitixian',
    name: 'lijitixian',
    component: resolve => require(['@/views/app/my/withdraw/lijitixian'], resolve),
  },
  {
    // 提现记录
    path: 'record',
    name: 'record',
    component: resolve => require(['@/views/app/my/withdraw/record'], resolve),
  },
  {
    // 提现结果
    path: 'tixianjieguo',
    name: 'tixianjieguo',
    component: resolve => require(['@/views/app/my/withdraw/tixianjieguo'], resolve),
  },
  {
    // 余额
    path: 'balance',
    name: 'Balance',
    component: resolve => require(['@/views/app/my/balance/index'], resolve),
  },
  {
    // 会员支付
    path: 'vip',
    name: 'Vip',
    component: resolve => require(['@/views/app/my/vip/index'], resolve),
  },
  {
    // 系统通知
    path: 'tongzhi',
    name: 'Tongzhi',
    component: resolve => require(['@/views/app/my/tongzhi/index'], resolve),
  },
  {
    // 系统通知详情
    path: 'tzDetail',
    name: 'TzDetail',
    component: resolve => require(['@/views/app/my/tongzhi/tzDetail'], resolve),
  },
]