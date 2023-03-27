//SKUform管理接口
//  /admin/product/spuImageList/{spuId} /admin/product/spuSaleAttrList/{spuId} /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
import request from '@/utils/request'

//获取图片数据
export const reqSpuImageList = (spuId)=>{
    return request({
        url:`/admin/product/spuImageList/${spuId}`,
        method:'get',
    })
}

//获取销售属性数据
export const reqSpuSaleAttrList = (spuId)=>{
    return request({
        url:`/admin/product/spuSaleAttrList/${spuId}`,
        method:'get',
    })
}


//获取平台属性数据

export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>{
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get',
    })
}

//添加sku /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo)=>{
        return request({
            url:`/admin/product/saveSkuInfo`,
            method:'post',
            data:skuInfo
        })
}

//获取sku列表接口  /admin/product/findBySpuId/{spuId}  get
export const reqSkuList = (spuId)=>{
    return request({
        url:`/admin/product/findBySpuId/${spuId}`,
        method:'get',
    })
}


//sku管理接口


//获取sku数据列表 /admin/product/list/{page}/{limit} get
export const reqSkuInfoList = (page,limit)=>{
    return request({
        url:`/admin/product/list/${page}/${limit}`,
        method:'get',
    })
}

//上架 /admin/product/onSale/{skuId} get
export const reqOnSale = (skuId)=>{
    return request({
        url:`/admin/product/onSale/${skuId}`,
        method:'get',
    })
}

//下架  /admin/product/cancelSale/{skuId} get
export const reqCanceSale = (skuId)=>{
    return request({
        url:`/admin/product/cancelSale/${skuId}`,
        method:'get',
    })
}

//获取sku详情信息 /admin/product/getSkuById/{skuId} get
export const reqSkuInfoById=(skuId)=>{
    return request({
        url:`/admin/product/getSkuById/${skuId}`,
        method:'get',
    })
}

export const reqDeleteSku = (skuId)=>{
    return request({
        url:`/admin/product/deleteSku/${skuId}`,
        method:'delete',
    })
}

