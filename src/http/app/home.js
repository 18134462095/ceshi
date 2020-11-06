import axios from '../axios'

// 获取支持平台类型
export const getDockingType = () => {
  return axios({
    url: '/query/getDockingType'
  })
}

// 获取首页轮播
export const getCarousels = () => {
  return axios({
    url: '/index/getCarousels'
  })
}

// 获取首页菜单
export const getMenuList = (params) => {
  return axios({
    url: '/index/getMenuList',
    method: 'get',
    params
  })
}

// 获取推荐搜索
export const getHotSearch = () => {
  return axios({
    url: '/index/getHotSearch'
  })
}

// 首页统一商品搜索
export const query = data => {
  return axios({
    url: '/query/query',
    method: 'post',
    data
  })
}
// 首页搜索PDD
export const recordPdd = () => {
  return axios({
    url: '/pdd/recordPdd',
    method: 'get',
  })
}

// 商品详情图片
export const goodsDetails = params => {
  return axios({
    url: '/query/goodsDetails',
    params
  })
}

// 排序枚举
export const getSort = () => {
  return axios({
    url: '/query/getSort'
  })
}

// 商品详情
export const saveOrUnSaveCollection = data => {
  return axios({
    url: '/mine/saveOrUnSaveCollection',
    method: 'post',
    data
  })
}

// 阅读通知
export const readNotice = noticeId => {
  return axios({
    url: '/index/readNotice',
    method: 'post',
    params: { noticeId }
  })
}

// 用户订单
export const getMemberOrder = (params) => {
  return axios({
    url: '/order/getMemberOrder',
    method: 'get',
    params
  })
}
// 获取签到记录
export const getSignRecord = () => {
  return axios({
    url: '/mine/getSignRecord',
    method: 'get',
  })
}
// 用户签到
export const getSign = () => {
  return axios({
    url: '/mine/sign',
    method: 'get',
  })
}
// 加油站详情
export const getGasStationStatus = params => {
  return axios({
    url: '/gas/getGasStationStatus',
    method: 'get',
    params
  })
}
// 附近加油站列表
export const getLocalGasStation = params => {
  return axios({
    url: '/gas/getLocalGasStation',
    method: 'get',
    params
  })
}
// 团油，付款
export const getPayOrder = params => {
  return axios({
    url: '/gas/payOrder',
    method: 'get',
    params
  })
}
// 团油，订单
export const getOrderList = params => {
  return axios({
    url: '/gas/getOrderList',
    method: 'get',
    params
  })
}
// 团油，同步用户订单
export const getSaveOrderInfo = () => {
  return axios({
    url: '/gas/saveOrderInfo',
    method: 'get',
  })
}
// 团油，消息订单
export const getRollMessage = () => {
  return axios({
    url: '/index/getRollMessage',
    method: 'get',
  })
}
// 分享 二维码 接口
export const getInviteQrCode = () => {
  return axios({
    url: '/mine/getInviteQrCode',
    method: 'get',
  })
}
// 搜索 联想
// export const getSuggest = () => {
//   return axios({
//     url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + antistop,
//     method: 'get',
//     // params:{antistop}
//   })
// }
