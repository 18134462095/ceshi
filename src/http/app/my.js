import axios from '../axios'

// 获取用户信息
export const getMemberInfo = () => {
        return axios({
            url: '/mine/getMemberInfo',
            method: 'get',
            // params:{phone,ip}
        })
    }
    // 获取用户信息
export const refreshMemberInfo = () => {
    return axios({
        url: '/mine/refreshMemberInfo',
        method: 'get',
        // params:{phone,ip}
    })
}
    // 充值
export const getRechage = data => {
        return axios({
            url: '/pub/mine/rechage',
            method: 'post',
            data
        })
    }
    // 直接充值
export const getUnifiedorder = data => {
        return axios({
            url: '/pay/unifiedorder',
            method: 'post',
            data
        })
    }
    // 支付宝url
export const getZFBAuthUrl = () => {
        return axios({
            url: '/pay/getZFBAuthUrl',
        })
    }
    // 会员使用卡券充值
export const getuseCard = (cardNo, password) => {
        return axios({
            url: '/mine/useCard',
            method: 'post',
            params: { cardNo, password }
        })
    }
    // 充值记录
export const getRechargeList = () => {
        return axios({
            url: '/pub/mine/rechargeList',
            method: 'get',
            // params:{phone,ip}
        })
    }
    // 我的收藏
export const getCollectionList = (params) => {
        return axios({
            url: '/mine/collectionList',
            method: 'get',
            params
        })
    }
    // 新手指引
export const getGuide = () => {
        return axios({
            url: '/mine/getGuide',
            method: 'get',
        })
    }
    // 意见反馈列表
export const getFeedBackList = () => {
        return axios({
            url: '/mine/feedBackList',
            method: 'get',
        })
    }
    // 意见反馈提交
export const getSaveFeedBack = data => {
        return axios({
            url: '/mine/saveFeedBack',
            method: 'post',
            data
        })
    }
    // 官方公告
export const getNotices = (params) => {
        return axios({
            url: '/mine/getNotices',
            method: 'get',
            params
        })
    }
    // 常见问题
export const getProblems = (params) => {
        return axios({
            url: '/mine/getProblems',
            method: 'get',
            params
        })
    }
    // 新增收货地址
export const getSaveAddress = data => {
        return axios({
            url: '/mine/saveAddress',
            method: 'post',
            data
        })
    }
    // 收货地址列表
export const getAddressList = (params) => {
        return axios({
            url: '/mine/addressList',
            method: 'get',
            params
        })
    }
    // 删除收货地址
export const getDeleteAddress = (addressId) => {
        return axios({
            url: '/mine/deleteAddress',
            method: 'post',
            params: { addressId }
        })
    }
    // 昵称修改
export const getChangeNickName = nickName => {
        return axios({
            url: '/mine/changeNickName',
            method: 'post',
            params: { nickName }
        })
    }
    // 头像修改
export const getChangeHeadImg = fileBase64 => {
        return axios({
            url: '/mine/changeHeadImg',
            method: 'post',
            params: { fileBase64 }
        })
    }
    // 我的粉丝
export const getMyfans = (pageIndex) => {
        return axios({
            url: '/mine/myChildren',
            method: 'get',
            params:{pageIndex}
        })
    }
    // 粉丝详情
export const getfansdetail = memberId => {
        return axios({
            url: '/mine/findMemberInfoById',
            method: 'get',
            params: { memberId }
        })
    }
    // 浏览记录
export const getBrowseList = () => {
        return axios({
            url: '/mine/browseList',
            method: 'get'
        })
    }
    // 删除浏览记录
export const delBrowser = () => {
        return axios({
            url: '/mine/delBrowser',
            method: 'get'
        })
    }
    // 删除单个浏览记录
export const delBrowseInfo = (params) => {
    return axios({
        url: '/mine/delBrowseInfo',
        method: 'get',
        params
    })
}
    // 是否收藏
export const getIsCollection = data => {
        return axios({
            url: '/mine/isCollection',
            method: 'post',
            data
        })
    }
    // 获取所有充值规则
export const getRules = () => {
        return axios({
            url: '/pay/getRules',
            method: 'get'
        })
    }

// 获取用户 各平台收益明细
export const memberPlateFormList = (params) => {
        return axios({
            url: '/wallet/memberPlateFormList',
            method: 'get',
            params
        })
    }
    // 获取收益页面信息
export const memberIncomeIndex = (params) => {
    return axios({
        url: '/wallet/memberIncomeIndex',
        method: 'get',
        params
    })
}

//
// 获取用户 日历史概况；月历史概况列表
export const memberEstimateList = (params) => {
    return axios({
        url: '/wallet/memberEstimateList',
        method: 'get',
        params
    })
}


// 支付宝绑定
export const bindZFB = (params) => {
    return axios({
        url: '/wallet/incomeEstimate',
        method: 'get',
        params
    })
}

//充值卡充值记录
export const getUseCardList = (params) => {
    return axios({
        url: '/mine/useCardList',
        method: 'get',
        params
    })
}

//现金充值记录 直接充值
export const getChargeList = (params) => {
    return axios({
        url: '/pay/chargeList',
        method: 'get',
        params
    })
}

//优惠券列表 会员兑换商品积分-兑换记录
export const getExchangeList = (params) => {
        return axios({
        url: '/mine/exchangeList',
        method: 'get',
        params
    })
}

// 详情 使用余额兑换商品优惠券
export const getExchangeGoods = data => {
    return axios({
        url: '/mine/exchangeGoods',
        method: 'post',
        data
    })
}

// 点击商品优惠券列表跳转
export const getClickExchangeGoods = (recordId) => {
    return axios({
        url: '/mine/clickExchangeGoods',
        method: 'post',
        params: { recordId }
    })
}
// 获取抽奖奖项
export const getLotteryOption = () => {
    return axios({
        url: '/mine/getLotteryOption',
        method: 'get'
    })
}
// 用户抽奖
export const getLottery = () => {
    return axios({
        url: '/mine/getLottery',
        method: 'get'
    })
}
// 找回订单
export const findTbOrders = (params) => {
    return axios({
        url: '/taobao/findTbOrders',
        method: 'get',
        params
    })
}

// 收益报表 累计
export const personalAccount = () => {
    return axios({
        url: '/settle/personalAccount',
        method: 'get',
        // params
    })
}
// 收益报表 累计
export const incomeDetail = (params) => {
    return axios({
        url: '/wallet/incomeDetail',
        method: 'get',
        params
    })
}

// 绑定父级邀请人
export const bindParent = (params) => {
    return axios({
        url: '/mine/bindParent',
        method: 'get',
        params
    })
}
