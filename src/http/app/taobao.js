import axios from '../axios'

// 获取淘宝类目
export const getTbProductCate = () => {
	return axios({
		url: '/taobao/getTbProductCate'
	})
}

// 获取淘宝高佣类目
export const getTbWlGyb = () => {
	return axios({
		url: '/taobao/getTbWlGyb'
	})
}

// 获取淘宝品牌券类目
export const getTbWlPpq = () => {
	return axios({
		url: '/taobao/getTbWlPpq'
	})
}

// 获取淘宝官方物料信息
export const getTbWl = () => {
	return axios({
		url: '/taobao/getTbWl'
	})
}

// 物料精选 【需要二次转链】
export const dgOptimusMaterial = params => {
	return axios({
		url: '/taobao/dgOptimusMaterial',
		params
	})
}

// 9.9包邮 【需要二次转链】
export const spkJiuKuaiJiu = params => {
	return axios({
		url: '/taobao/spkJiuKuaiJiu',
		params
	})
}

// 商品筛选 【按淘宝类目获取】
export const materialOptional = params => {
	return axios({
		url: '/taobao/materialOptional',
		params
	})
}

// 淘宝转链
export const tbkIdPrivilege = id => {
	return axios({
		url: '/taobao/tbkIdPrivilege',
		params: { id }
	})
}

// 淘宝转链
export const getAuthUrl = (params) => {
	return axios({
		url: '/taobao/getAuthUrl',
		params
	})
}
