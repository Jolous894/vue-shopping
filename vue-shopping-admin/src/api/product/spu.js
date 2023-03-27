//spu管理接口
import request from '@/utils/request'
//获取spu列表 /admin/product/{page}/{limit} get page limit category3Id
export const reqSpuList = (page, limit, category3Id) => {
    return request({
        url: `/admin/product/${page}/${limit}`,
        method: 'get',
        params: { category3Id }
    })
}

//获取spu基本信息 /admin/product/getSpuById/{spuId} get
export const reqSpu = (spuId) => {
    return request({
        url: `/admin/product/getSpuById/${spuId}`,
        method: 'get',
    })
}

//获取品牌的信息  /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = () => {
    return request({
        url: "/admin/product/baseTrademark/getTrademarkList",
        method: 'get',
    })
}

//获取SPU图片接口 /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get',
    })
}

// 获取平台全部的销售属性        /admin/product/baseSaleAttrList  get
export const reqBaseSaleAttrList = () => {
    return request({
        url: `/admin/product/baseSaleAttrList`,
        method: 'get',
    })
}

//提交添加或者修改spu  /admin/product/saveSpuInfo post
/*
    {
    "category3Id": 0,
    "tmId": 0,
    "description": "string",
    "spuName": "string",
    "spuImageList": [
      {
        "id": 0,
        "imgName": "string",
        "imgUrl": "string",
        "spuId": 0
      }
    ],
    "spuSaleAttrList": [
      {
        "baseSaleAttrId": 0,
        "id": 0,
        "saleAttrName": "string",
        "spuId": 0,
        "spuSaleAttrValueList": [
          {
            "baseSaleAttrId": 0,
            "id": 0,
            "isChecked": "string",
            "saleAttrName": "string",
            "saleAttrValueName": "string",
            "spuId": 0
          }
        ]
      }
    ],
  }
 */

//修改或者添加一个spu
export const reqAddOrUpdateSpu = (spuInfo)=>{
    if (spuInfo.id) {
        return request({
            url:"/admin/product/updateSpuInfo",
            method:"post",
            data:spuInfo,
        })
    }
    else{
        return request({
            url:"/admin/product/saveSpuInfo",
            method:"post",
            data:spuInfo,
        })
    }
}

//删除spu /admin/product/deleteSpu/{spuId}  DELETE
export const reqDeleteSpu = (spuId)=>{
    return request({
        url:`/admin/product/deleteSpu/${spuId}`,
        method:'delete',
    })
}