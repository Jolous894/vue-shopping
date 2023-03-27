//品牌管理
import request from '@/utils/request'
//获取品牌列表
//admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => {
    return request({
        url: `admin/product/baseTrademark/${page}/${limit}`,
        method:'get'
    })
}

//添加品牌
///admin/product/baseTrademark/save           post

//更新品牌信息
///admin/product/baseTrademark/update          put 
export const reqAddOrUpdateTrademark = (trademark)=>{
    if (trademark.id) {
        return request({
            url:'admin/product/baseTrademark/update',
            method:'put',
            data:trademark,
        })
    }
    else {
        return request({
            url:'admin/product/baseTrademark/save',
            method:'post',
            data:trademark,
        })
    }
}

//删除品牌  /admin/product/baseTrademark/remove/{id}  delete
export const reqDeleteTrademark = (id)=>{
    return request({
        url:`/admin/product/baseTrademark/remove/${id}`,
        method:'delete'
    })
}




