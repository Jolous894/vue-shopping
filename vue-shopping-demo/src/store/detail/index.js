import {reqGetGoodDetail,reqAddOrUpdateShopCart} from '../../api/index'
import getUUID from "../../utils/uuid_token.js"
export default {
    namespaced: true,
    state:{
        goodInfo:{},
        UUID:getUUID(),
    },
    actions:{
       async getGoodInfo(context,skuid){
          let result = await reqGetGoodDetail(skuid)
          if(result.code ==200) {
            context.commit("GETGOODINFO",result.data)
          }
        },
        async addOrUpdateShopCart(context,{skuID,skuNum}){
           let result = await reqAddOrUpdateShopCart(skuID,skuNum)
           if(result.code==200){
            return 'ok'
           }
           else{
            return Promise.reject(new Error('fali'))
           }
        },
    },
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo=goodInfo
        }
    },
    getters:{
        categoryView(state){
            return state.goodInfo.categoryView || {}
        },
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || {}
        },
    },
}