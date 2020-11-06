import axios from '../axios'
// 可提现金额
export const canCashMoney = ()=>{
    return axios({
        url:'/settle/canCashMoney',
        method:'get'
    })
}
// 会员收益列表
export const getSettleList = (params)=>{
    return axios({
        url:'/settle/getSettleList',
        method:'get',
        params
    })
}
// 提现记录列表
export const getCashOutList = (params)=>{
    return axios({
        url:'/settle/getCashOutList',
        method:'get',
        params
    })
}
// 支付宝体现收益
export const cashOut = (params)=>{
    return axios({
        url:'/settle/cashOut',
        method:'post',
        params
    })
}