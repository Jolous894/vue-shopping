import {reqGetSearchInfo} from '../../api/index'

export default {
    namespaced:true,
    state:{
        searchList:{},
    },
    actions: {
       async getSearchList(context,params={}){
            const result = await reqGetSearchInfo(params)
            if(result.code==200) {
                context.commit("GETSEARCHINFO",result.data)
            }
       }
    },
    mutations:{
        GETSEARCHINFO(state,value){
            state.searchList = value
        }
    },
    getters:{
        pageNo(state){
            return state.searchList.pageNo
        },
        pageSize(state){
            return state.searchList.pageSize
        },
        total(state){
            return state.searchList.total
        },
        totalPages(state){
            return state.searchList.totalPages
        },
    }
}