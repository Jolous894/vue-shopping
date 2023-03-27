//当前的这个模块  API进行统一管理
import request from './request'
import mockRequests from './mockAjax'

//三级联动接口
///api/product/getBaseCategoryList   get   无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = ()=> {
    return request({url:'/product/getBaseCategoryList',method:'get'})
}

//home里的轮播图
export const reqGetBannerList = ()=> {
    return mockRequests({url:'/banner',method:'get'})
}

//home里的floor
export const reqGetFloorList = ()=>{
    return mockRequests({url:'/floor',method:'get'})
}

//获取search组件中的数据
//当前接口,给服务器传递参数至少是空对象 否则请求会失败
export const reqGetSearchInfo = (params)=> {
    return request({
        url:'/list',
        method:'post',
        data:params,
    })
}
//获取商品详情(Detail)组件
export const reqGetGoodDetail = (skuid)=>{
    return request({
        url:`/item/${skuid}`,
        method:'get',
    })
}

//添加到购物车(对已有物品进行数量改动)
export const reqAddOrUpdateShopCart = (skuID,skuNum)=> {
    return request({
        url:`/cart/addToCart/${skuID}/${skuNum}`,
        method:'post',
    })
}

//获取购物车列表接口
export const reqCartList = ()=>{
 return  request({
       url:'/cart/cartList',
       method:'get',
    })
}

//删除购物车商品
export const reqDeleteCart = (skuID)=>{
    return  request({
        url:`/cart/deleteCart/${skuID}`,
        method:'delete',
     })
}

//切换商品选中状态
export const reqChangeCheckCart = (skuID,isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuID}/${isChecked}`,   
        method:'get',
    })
}

//获取验证码
export const reqGetCode= (phone)=>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
    })
}

//注册用户
export const reqRegister = (params)=>{
    return request({
        url:`/user/passport/register`,
        method:'post',
        data:params
    })
} 

//用户登录
export const reqLogin =(userParams)=>{
    return request({
        url:'/user/passport/login',
        method:'POST',
        data:userParams
    })
}


//根据token获取用户信息
export const reqUserInfo = ()=>{
    return request({
        url:'/user/passport/auth/getUserInfo',
        method:'get',
    })
}

//退出登录
export const reqLogout = ()=>{
    return request({
        url:'/user/passport/logout',
        method:'get',
    })
}

//获取用户地址信息
export const reqUserAddressList = ()=>{
    return request({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get',
    })
}

//获取订单交易信息
export const reqOrderInfo = ()=>{
    return request({
        url:'/order/auth/trade',
        method:'get',
    })
}

// //提交订单
// export const reqSubmitOrder = (traderNo,data)=>{
//     return request({
//         url:`/order/auth/submitOrder?tradeNo=${traderNo}`,
//         method:'post',
//         data:data,
//     })
// }


//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post

export const reqSubmitOrder = (tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});


//获取订单支付信息  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>{
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get',
    })
}

//查询订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqQueryPayStatus = (orderId)=>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

//获取我的订单列表 /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit)=>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get',
    })
}



