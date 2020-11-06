import axios from '../axios'

// 获取验证码
export const getLoginSendCode = (phone,ip) => {
    return axios({
        url: '/login/sendCode',
        method:'get',
        params:{phone,ip}
    })
}
// 判断微信是否已绑定手机号
export const checkWxPhone = params => {
    return axios({
        url: '/login/checkWxPhone',
        method:'post',
        params
    })
}
// 登录
export const getLogOrReg = data => {
    return axios({
        url: '/login/logOrReg',
        method:'post',
        data
    })
}
// 退出登录
export const getLogOut = data => {
    return axios({
        url: '/login/logout',
        method:'post',
        data
    })
}