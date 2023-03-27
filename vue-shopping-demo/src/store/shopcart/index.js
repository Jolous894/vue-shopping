import { reqCartList,reqDeleteCart,reqChangeCheckCart} from '../../api/index'
export default {
    namespaced: true,
    state: {
        carList: [],
    },
    actions: {
        //获取购物车信息
        async getCarList({commit}) {
            let result = await reqCartList()
            if(result.code ==200){
                commit("REQCARTLIST",result.data)
            }
        },
        //删除购物车商品
        async deleteCart({commit},skuID){
            let result = await reqDeleteCart(skuID)
            if(result.code == 200){
                return 'ok'
            }
            else{
                return Promise.reject(new Error('fali'))
            }
        },
        //改变商品选中状态
        async reqChangeCheckCart({commit},{skuID,isChecked}){
            let result = await reqChangeCheckCart(skuID,isChecked)
            if(result.code == 200){
                return 'ok'
            }
            else{
                return Promise.reject(new Error('fali'))
            }
        },
        //删除全部选中商品
        reqDeleteAllCheckedCart({ dispatch, getters }){
            let promiseAll =[]
            getters.carList.cartInfoList.forEach(element => {
                if (element.isChecked==1) {
                    dispatch("deleteCart",element.skuId)
                    promiseAll.push(element)
                }
            });
            return Promise.all(promiseAll)
        },
        //全选改变选中状态
        reqAllCheckChange({ dispatch, getters },newChecked){
            let promiseAll = []
            getters.carList.cartInfoList.forEach((item)=>{
               if (item.isChecked!=newChecked?1:0) {
                let p = dispatch("reqChangeCheckCart",{skuID:item.skuId,isChecked:newChecked?1:0})
                promiseAll.push(p)
               }
            })
           return Promise.all(promiseAll)
        },
    },
    mutations: {
        REQCARTLIST(state,value){
            state.carList=value
        }
    },
    getters: {
        carList(state){
            return state.carList[0] || {}
        }
    }
}