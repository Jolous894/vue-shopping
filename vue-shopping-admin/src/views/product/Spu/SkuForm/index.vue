<template>
  <!-- :model="form" -->
  <el-card>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input  placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input  placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,$index) in attrInfoList" :key="attr.id">
            <el-select  placeholder="请选择" v-model="attr.attrIdAndattrValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true"  label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,$index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select  placeholder="请选择" v-model="saleAttr.saleAttrIdAndSaleAttrValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table  style="width: 100%" border :data="spuImageList" @selection-change="selectionChange">
          <el-table-column type="selection"  width="80">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width" align="center">
                <template slot-scope="{row,$index}">
                    <img :src="row.imgUrl" style="width:100px;heigth:100px">
                </template>
          </el-table-column>
          <el-table-column prop="prop" label="名称" width="width" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width" align="center">
            <template slot-scope="{row,$index}">
               <el-button type="primary" v-if="row.isDefault == 0" @click="isDefaultChange(row)">设为默认</el-button>
               <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="cancel" >取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "skuForm",
  data() {
    return {
      //服务器返回的
      spuImageList: [],
      //用户选择的
      imageList:[],
      spuSaleAttrList: [],
      attrInfoList: [],

      skuInfo: {
        spuId: 0,
        tmId: 0,
        category3Id: 0,
        price: 0,
        skuName: "",
        weight: "",
        skuDesc: "",
        skuDefaultImg: "",


        skuAttrValueList: [
        ],

        skuImageList: [
        ],

        skuSaleAttrValueList: [
        ],
      },
      spu:{},
    };
  },
  methods: {
    //获取数据
    async getData({ category1Id, category2Id, category3Id }, row) {
        this.skuInfo.category3Id = category3Id
        this.skuInfo.spuId = row.id
        this.skuInfo.tmId = row.tmId
        this.spu = row
      //获取图片数据
      let spuImageListResult = await this.$API.sku.reqSpuImageList(row.id);
      if (spuImageListResult.code == 200) {
        let List = spuImageListResult.data;
        List.forEach(element => {
            element.isDefault = 0
        });
        this.spuImageList = List
      }

      let spuSaleAttrListResult = await this.$API.sku.reqSpuSaleAttrList(
        row.id
      );
      if (spuSaleAttrListResult.code == 200) {
        this.spuSaleAttrList = spuSaleAttrListResult.data;
      }

      let attrInfoListResult = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (attrInfoListResult.code == 200) {
        this.attrInfoList = attrInfoListResult.data;
      }
    },
    //表格勾选回调
    selectionChange(selection){
       this.imageList = selection
    },
    //设为默认
    isDefaultChange(row){
        this.spuImageList.forEach((element)=>{
            element.isDefault = 0 
        })
        row.isDefault = 1
        this.skuInfo.skuDefaultImg = row.imgUrl
    },
    //取消
    cancel(){
        this.$emit('changeScene',0)
        this.skuInfo ={
        spuId: 0,
        tmId: 0,
        category3Id: 0,
        price: 0,
        skuName: "",
        weight: "",
        skuDesc: "",
        skuDefaultImg: "",


        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0,
          },
        ],

        skuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            skuId: 0,
            spuImgId: 0,
          },
        ],

        skuSaleAttrValueList: [
          {
            id: 0,
            saleAttrId: 0,
            saleAttrName: "string",
            saleAttrValueId: 0,
            saleAttrValueName: "string",
            skuId: 0,
            spuId: 0,
          },
        ],
      }
    },
    //保存
    async saveSkuInfo(){
        const {attrInfoList,spuSaleAttrList,skuInfo,imageList} = this
        let arry1 =[]
        let arry2 =[]

        attrInfoList.forEach((item)=>{
            if (item.attrIdAndattrValueId) {
                const [attrId,valueId] = item.attrIdAndattrValueId.split(":")
                arry1.push({
                    attrId,
                    valueId
                })
            }
        })

        spuSaleAttrList.forEach((item)=>{
               if (item.saleAttrIdAndSaleAttrValueId) {
                const [saleAttrId,saleAttrValueId] = item.saleAttrIdAndSaleAttrValueId.split(":")
                arry2.push({
                    saleAttrId,
                    saleAttrValueId
                })
            }
        })

        skuInfo.skuImageList = imageList.map((item)=>{
            return {
                imgName:item.imgName,
                imgUrl:item.imgUrl,
                isDefault:item.isDefault,
                spuImgId:item.id
            }
        })
        
        skuInfo.skuAttrValueList = arry1
        skuInfo.skuSaleAttrValueList = arry2

        let result = await this.$API.sku.reqAddSku(this.skuInfo)
        console.log(result);
        if (result.code == 200) {
            this.$message({message:'保存成功',type:'success'})
            this.$emit('changeScene',0)
        }

    }

  },
};
</script>

<style lang="scss" scoped>
</style>