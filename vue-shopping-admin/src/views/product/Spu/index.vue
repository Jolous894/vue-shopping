<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCatedoryId="getCatedoryId"
        @category3IdChange="category3IdChange"
        :isShowTable="scene== 0"
      ></CategorySelect>
    </el-card>
    <el-card v-show="scene==0">
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加spu</el-button>
      </div>
      <el-table style="width: 100%" border :data="spuList">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="spuName" label="SPU名称" width="width" align="center">
        </el-table-column>
        <el-table-column prop="description" label="SPU描述" width="width" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
            <template slot-scope="{row,$index}">
                <el-button type="success" icon="el-icon-plus" size="mini" @click="addSku(row)"></el-button>
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)" ></el-button>
                <el-button type="info" icon="el-icon-info" size="mini" @click="lookSkuList(row)"></el-button>
                <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row)" >
                    <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini" style="margin-left: 10px"></el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="text-align:center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout="  prev, pager, next, jumper,->,sizes,total"
        :total="total">
      </el-pagination>
    </el-card>
    <spuForm v-show="scene==1" @changeScene="changeScene" ref="spuFrom"></spuForm>
    <skuForm v-show="scene==2" @changeScene="changeScene" ref="skuFrom"></skuForm>

  <el-dialog :title="`${spuName}的sku列表`" :visible.sync="dialogTableVisible" @close="closeDialog">
    <el-table :data="skuList"  border   v-loading="loading">
      <el-table-column property="skuName" label="名称" width="width"></el-table-column>
      <el-table-column property="price" label="价格" width="width"></el-table-column>
      <el-table-column property="weight" label="重量"  width="width"></el-table-column>
      <el-table-column property="date" label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" style="width:100px; height:100px;" >
          </template>
      </el-table-column>
    </el-table>
</el-dialog>
  </div>
</template>

<script>
import spuForm from '@/views/product/Spu/SpuForm/index.vue'
import skuForm from '@/views/product/Spu/SkuForm/index.vue'

export default {
  name: "spu",
  data() {
    return {
      dialogTableVisible:false,
      skuList:[],
      spuName:'',
      loading:true,

      category1Id: "",
      category2Id: "",
      category3Id: "",
      scene:0,
      spuList: [],
      page:1,
      limit:5,
      total:0,
    };
  },
  components:{
    skuForm,
    spuForm,
  },
  methods: {
    getCatedoryId(idObj) {
      this.category1Id = idObj.category1Id;
      this.category2Id = idObj.category2Id;
      this.category3Id = idObj.category3Id;
      this.getSpuList();
    },
    category3IdChange(newValue) {
      this.category3Id = newValue;
      if (!this.category3Id) {
        this.spuList = [];
      }
    },
    //获取数据
    async getSpuList() {
        let result = await this.$API.spu.reqSpuList(this.page,this.limit,this.category3Id)
        if (result.code == 200) {
            this.total = result.data.total
            this.spuList =result.data.records
        }
        else{
            this.$message({message:'获取spu数据错误',type:'error'})
        }
    },
    //页数改变
    handleCurrentChange(page){
        this.page = page
        this.getSpuList()
    },
    //页数容量改变
    handleSizeChange(pageSize){
        this.limit = pageSize
        this.getSpuList()
    },
    //添加spu
    addSpu(){
      this.scene = 1
      this.$refs.spuFrom.addSpuData(this.category3Id)
    },
    //修改spu
    updateSpu(row){
      this.scene = 1
      this.$refs.spuFrom.initSpuData(row)
    },
    changeScene(scene){
      this.scene = scene
      this.getSpuList()
    },
    //删除spu
    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code==200) {
        this.$message({message:'删除成功',type:'success'})
        if (this.spuList.length <= 1 && this.page > 1) {
          this.page--
        }
        this.getSpuList()
      }

    },
    addSku(row){
      this.scene = 2
      this.$refs.skuFrom.getData({
        category1Id:this.category1Id,
        category2Id:this.category2Id,
        category3Id:this.category3Id,

      },row)
    },
    //展示sku列表
    async lookSkuList(row){
      this.dialogTableVisible = true
      this.spuName = row.spuName
      let result = await this.$API.sku.reqSkuList(row.id)
      if (result.code == 200) {
        this.loading = false
        this.skuList = result.data
      }
    },
    //关闭对话框
    closeDialog(){
      this.skuList = []
      this.loading = true
    }

  },
};
</script>

<style lang="scss" scoped>
</style>