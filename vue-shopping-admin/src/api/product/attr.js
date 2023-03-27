import request from '@/utils/request'

///admin/product/getCategory1  get  一级分类
export const reqCategory1List = ()=>{
    return request({
        url:'/admin/product/getCategory1',
        method:'get'
    })
}

///admin/product/getCategory2/{category1Id} get 二级分类
export const reqCategory2List = (category1Id)=>{
    return request({
        url:`/admin/product/getCategory2/${category1Id}`,
        method:'get'
    })
}

// /admin/product/getCategory3/{category2Id} get 三级分类
export const reqCategory3List = (category2Id)=>{
    return request({
        url:`/admin/product/getCategory3/${category2Id}`,
        method:'get'
    })
}

//获取平台属性 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = ({category1Id,category2Id,category3Id})=> {
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get'
    })
}

//添加属性名与属性值 /admin/product/saveAttrInfo post   
export const reqAddOrUpdateAttr = (data)=>{
    return request({
        url:'/admin/product/saveAttrInfo',
        method:'post',
        data,
    })
}
/*
    {
  "attrName": "string",  
  "attrValueList": [      
    {
      "attrId": 0, 
      "valueName": "string"
    }
  ],
  "categoryId": 0,        
  "categoryLevel": 0,     
}
*/



//删除属性接口  /admin/product/deleteAttr/{attrId}  delete
export const reqDeleteAttr = (attrId)=>{
    return request({
        url:`/admin/product/deleteAttr/${attrId}`,
        method:'delete'
    })
}