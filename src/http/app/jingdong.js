import axios from '../axios'

// 京东转链
export const jdByUnionidPromotion = link => {
	return axios({
    url: '/jd/jdByUnionidPromotion',
    params: { link }
	})
}

// 获取京东类目
export const getGoodsCategory = params => {
	return axios({
    url: '/jd/getGoodsCategory',
    params: { params }
	})
}

// 京东同一商品查询
export const getJdGoodsList = params => {
	return axios({
    url: '/jd/getJdGoodsList',
    params
	})
}

// 京东相似推荐
export const jdSimilarRecommend = skuId => {
	return axios({
    url: '/jd/jdSimilarRecommend',
    params: { skuId }
	})
}