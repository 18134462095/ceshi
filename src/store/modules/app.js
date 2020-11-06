export default {
	state: {
		dockType: [],
		tbwl: [],
		hotrec: [],
		inform: null,
		info: null,
		detail: null,
		exList:[]
	},
	getters: {
		dockType (state) {
			return state.dockType
		},
		tbwl (state) {
			return state.tbwl
		},
		hotrec (state) {
			return state.hotrec
		},
		inform (state) {
			return state.inform
		},
		info(state){
			return state.info
		},
		detail(state){
			return state.detail
		},
		exList(state){
			return state.exList
		}
	},
	mutations: {
		changeDockTpye (state, data) {
			state.dockType = data
		},
		changeTbwl (state, data) {
			state.tbwl = data
		},
		changeHotrec (state, data) {
			state.hotrec = data
		},
		changeInform (state, data) {
			state.inform = Object.assign({}, data)
		},
		memberInfo(state, data){
			state.info = data
		},
		changeDetail(state, data){
			state.detail = Object.assign({}, data)
		},
		exChangeList(state,data){
			state.exList = data
		}
	},
	actions: {
	}
}