<template>
    <el-card>
        <!-- 表格 -->
        <el-table :data="skuInfoList" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="width" align="center"></el-table-column>
            <el-table-column prop="skuName" label="名称" width="width" align="center"></el-table-column>
            <el-table-column prop="skuDesc" label="描述" width="width" align="center"></el-table-column>
            <el-table-column prop="prop" label="默认图片" width="200" align="center">
                <template slot-scope="{row,$index}">
                    <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
                </template>
            </el-table-column>        
            <el-table-column prop="weight" label="重量(KG)" width="width" align="center"></el-table-column>
            <el-table-column prop="price" label="价格(元)" width="200" align="center"></el-table-column>
            <el-table-column prop="prop" label="操作" width="width" align="center">
                <template slot-scope="{row,$index}">
                    <myButton type="danger" icon="el-icon-bottom" size="mini" title="下架商品" v-if="row.isSale == 1" @click.native="cancelSale(row)"></myButton>
                    <myButton type="success" icon="el-icon-top" size="mini" title="上架商品" v-else @click.native="sale(row)"></myButton>
                    <myButton type="primary" icon="el-icon-edit" size="mini" title="编辑"></myButton>
                    <myButton type="info" icon="el-icon-info" size="mini" title="详情" @click.native="getSkuInfo(row)"></myButton>
                    <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="successconfirm(row)" style="margin-left:10px"> 
                        <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" slot="reference"></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
       </el-table>
       <el-drawer :visible.sync="drawer" size="50%" :before-close="handleClose">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{sku.skuName}}</el-col>
            </el-row>
             <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{sku.skuDesc}}</el-col>
            </el-row>
             <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{sku.price}}</el-col>
            </el-row>
             <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                    <el-tag type="success" style="margin-right:10px;" v-for="(attr,index) in sku.skuAttrValueList" :key="attr.id">{{attr.attrId}}-{{attr.valueId}}</el-tag>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <el-carousel height="700px">
                        <el-carousel-item v-for="item in sku.skuImageList" :key="item.id">
                            <img :src="item.imgUrl" style="height:100%">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
       <!-- 分页器  
        -->
       <el-pagination
       @current-change="handleCurrentChange"
       @size-change="handleSizeChange"
        align="center"
        :current-page="current"
        :page-sizes="[3, 5, 10]"
        :page-size="size"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total">
       </el-pagination>
    </el-card>
</template>

<script>
    export default {
        name:'sku',
        data() {
            return {
                 drawer: false,

                skuInfoList: [],
                sku:{},
                current:1,
                size:10,
                total:0,
            }
        },
        methods:{
            async getSkuInfoList(){
                let result = await this.$API.sku.reqSkuInfoList(this.current,this.size)
                if (result.code == 200) {
                    this.skuInfoList = result.data.records
                    this.current = result.data.current
                    this.size = result.data.size
                    this.total = result.data.total

                }
            },
            handleCurrentChange(current){
                this.current = current
                this.getSkuInfoList()

            },
            handleSizeChange(size){
                this.size = size
                this.getSkuInfoList()
            },
            //下架
            async cancelSale(row){
                let result = await this.$API.sku.reqCanceSale(row.id)
                if (result.code == 200) {
                    row.isSale = 0 
                    this.$message({message:'下架成功',type:'success'})
                }
            },
            //上架
            async sale(row){
                 let result = await this.$API.sku.reqOnSale(row.id)
                if (result.code == 200) {
                    row.isSale = 1 
                    this.$message({message:'上架成功',type:'success'})
                }
            },
            //sku详情
            async getSkuInfo(row){
                this.sku={}
                this.drawer=true
                let result = await this.$API.sku.reqSkuInfoById(row.id)
                if (result.code == 200) {
                    this.sku = result.data
                }
            },
            async successconfirm(row){
                let result = await this.$API.sku.reqDeleteSku(row.id)
                if (result.code == 200) {
                    this.$message({message:'删除成功',type:'success'})
                    this.getSkuInfoList()
                }
            },
            //退出抽屉
            handleClose(done) {
            done()
            //   this.$confirm('确认关闭？')
            //       .then(_ => {
            //       done();
            //    }).catch(_ => {});
            }
            
        },
        mounted(){
            this.getSkuInfoList()
        }
    }
</script>

<style>
 
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<style  scoped>
    .el-row .el-col-5{
        font-size: 18px;
        text-align: right;
        font-weight: bold;
    }
    .el-col{
        margin: 10px 10px;
    }
</style>