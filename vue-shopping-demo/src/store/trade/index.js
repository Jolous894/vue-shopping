import { reqUserAddressList, reqOrderInfo } from '../../api/index'

const state = {
    addressList: [
        {
            consignee: "张三",
            fullAddress: "北京市昌平区宏福科技园综合楼6层",
            id: 147,
            isDefault: "0",
            phoneNum: "13684696452",
            provinceId: 8,
            regionId: 2,
            userAddress: "",
            userId: 2,

        },
        {
            consignee:"林志鸿",
            fullAddress:"深圳市宝安区区未来科技园综合楼4层 ",
            id:148,
            isDefault:"1",
            phoneNum:"18998525319",
            provinceId:17,
            regionId:3,
            userAddress:" ",
            userId:2,

        }
    ],
    orderInfo: {}
}

const actions = {
    //获取用户地址信息
    async getUserAddressList({ commit }) {
        let result = await reqUserAddressList()
        if (result.code == 200) {
            // commit('GETUSERADDRESSLIST', result.data)
        }
    },
    //订单交易信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    },
}

const mutations = {
    //获取用户地址信息
    // GETUSERADDRESSLIST(state, data) {
    //     state.addressList = data
    // },
    //订单交易信息
    GETORDERINFO(state, data) {
        state.orderInfo = data

    }

}

const getters = {}



export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}