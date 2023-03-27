
import { reqCategoryList, reqGetBannerList ,reqGetFloorList,reqUserInfo } from '../../api/index'
export default {
    namespaced: true,
    state: {
        categoryListData: [],
        bannerList: [],
        floorList:[],
    },
    actions: {
        async categoryList(context) {
            let result = await reqCategoryList()
            if (result.code === 200) {
                context.commit('CATEGORYLIST', result.data)
            }
        },
        async getBannerList(context) {
            let result = await reqGetBannerList()
            if (result.code === 200) {
                context.commit('GETBANNERLIST', result.data)
            }
        },
        async getFloorList(context) {
            let result = await reqGetFloorList()
            if (result.code === 200) {
                context.commit('GETFLOORLIST', result.data)
            }
        },
    },
    mutations: {
        CATEGORYLIST(state, value) {
            state.categoryListData = value
        },
        GETBANNERLIST(state,value) {
            state.bannerList = value

        },
        GETFLOORLIST(state,value) {
            state.floorList = value
        },
    },
    getters: {

    }
}