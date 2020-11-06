import axios from '../axios'

// 拼多多转链
export const createUrl = params => {
	return axios({
        url: '/pdd/createUrl',
        params
	})
}

// 拼多多类目
export const getFirstCatList = () => {
	return axios({
        url: '/pdd/getFirstCatList',
	})
}

// 拼多多商品列表
export const getDuoDuoGoodsList = params => {
	return axios({
        url: '/pdd/getDuoDuoGoodsList',
        params
	})
}
