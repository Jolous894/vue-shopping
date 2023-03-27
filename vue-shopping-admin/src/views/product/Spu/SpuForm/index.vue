<template>
  <el-card>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, $index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}种未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`" v-for="(unSelect) in unSelectSaleAttr" :key="unSelect.id" ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称列表"
            width="width"
            align="center"
          >
            <template slot-scope="{row, $index}">
                <!-- @close="handleClose(tag)" -->
                <!--  @keyup.enter.native="handleInputConfirm"
                 inputVisible:false,
                inputValue:'',
                    @click="showInput"-->
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false"  @close="row.spuSaleAttrValueList.splice(index,1)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small"  @blur="handleInputConfirm(row)" >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{row,$index}">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdate" :disabled="existInput">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,


      spu: {
        category3Id: 0,
        tmId: '',
        description: "",
        spuName: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
        
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      //未选择销售属性id
      attrIdAndAttrName:'',
    };
  },
  computed:{
    unSelectSaleAttr(){
        let result = this.saleAttrList.filter((item)=>{
            return this.spu.spuSaleAttrList.every((item1)=>{
                return item.name != item1.saleAttrName
            })
        })
        return result
    },
    existInput(){
      return this.spu.spuSaleAttrList.some((item)=>{
        return item.inputVisible
      })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //照片上传成功回调
    handleSuccess(response, file, fileList){
        this.spuImageList = fileList
    },
    //获取数据
    async initSpuData(spu) {
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }

      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }

      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        spuImageResult.data.forEach((element) => {
          element.name = element.imgName;
          element.url = element.imgUrl;
        });
        this.spuImageList = spuImageResult.data;
      }

      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //添加新销售属性
    addSaleAttr(){
        let arry = this.attrIdAndAttrName.split(":")
        const [baseSaleAttrId,saleAttrName] = arry
       this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[]
       })
       this.attrIdAndAttrName=''
    },
    //添加销售属性值
    addSaleAttrValue(row){
        this.$set(row,"inputVisible",true)
        this.$set(row,"inputValue",'')
        this.$nextTick(()=>{
            this.$refs.saveTagInput.focus()
        })
    },
    //属性值表单收集
    handleInputConfirm(row){
        const {baseSaleAttrId,inputValue} = row
        if (!inputValue.trim()) {
           this.$message({message:'属性值不能为空',}) 
            this.$refs.saveTagInput.focus()
           return 
        }

        let result = row.spuSaleAttrValueList.some((item)=>{
            return item.saleAttrValueName == inputValue
        })
        if (result) {
            this.$message({message:'属性值重复',}) 
            return
        }
        row.inputVisible = false
        row.spuSaleAttrValueList.push({
            baseSaleAttrId,
            saleAttrValueName:inputValue
        })
    },
    //提交
    async addOrUpdate(){
        this.spu.spuImageList = this.spuImageList.map((item)=>{
            return {
                imgName:item.name,
                imgUrl:(item.response && item.response.data) || item.url
            }
        })
        let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
        if (result.code == 200) {
            this.$message({
                message:'保存成功',
                type:'success'
            })
            this.$emit('changeScene', 0)
        }
    },
    //添加spu
    async addSpuData(category3Id){
         this.spu={
        category3Id: 0,
        tmId: '',
        description: "",
        spuName: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
        
        ],
      }
        this.spu.category3Id = category3Id
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
         if (tradeMarkResult.code == 200) {
            this.tradeMarkList = tradeMarkResult.data;
       }

          let saleResult = await this.$API.spu.reqBaseSaleAttrList();
          if (saleResult.code == 200) {
            this.saleAttrList = saleResult.data;
        }

    }
  },
};
</script>


<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>