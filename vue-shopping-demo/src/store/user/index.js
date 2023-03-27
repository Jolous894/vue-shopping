//登录与注册
import { reqGetCode, reqRegister, reqLogin,reqUserInfo,reqLogout } from '../../api/index'

const state = {
    userInfo:{}
}

const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            return result.data
        }
        else {
            return Promise.reject(new Error('fali'))
        }
    },
    //用户注册
    async userRegister({ commit }, params) {
        let result = await reqRegister(params)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        }
        else {
            return Promise.reject(new Error(result.message))
        }
    },
    //用户登录
    async userLogin({ commit }, params) {
        let result = await reqLogin(params)
        if (result.code == 200) {
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        }
        else {
            return Promise.reject(new Error(result.message))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO',result.data)
            return 'ok'
        }
        else {
            console.log(result);
            commit('CLEARUSERINFO')
            localStorage.removeItem('TOKEN')
            return Promise.reject(new Error('登录身份已过期,请重新登录'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200) {
            commit('CLEARUSERINFO')
            localStorage.removeItem('TOKEN')
            return 'ok'
        }
        else{
            return Promise.reject(new Error(result.message))
        }
    },

}

const mutations = {
    //获取用户信息
    GETUSERINFO(state,data){
        state.userInfo = data
    },
    //清除用户信息
    CLEARUSERINFO(state){
        state.userInfo ={}
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}