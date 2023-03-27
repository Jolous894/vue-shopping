<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCatedoryId="getCatedoryId"
        @category3IdChange="category3IdChange"
        :isShowTable="isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 数据table结构 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!--:data="data" -->
        <el-table border :data="attrList" style="width: 100%">
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="100px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="300px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 0px 10px"
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                style="margin:0px 20px;"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
                >修改</el-button
              >
               <el-popconfirm
                :title="`确定删除?`"
                @onConfirm='deleteAttr(row)'
                >       
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" icon="el-icon-plus" style="margin: 0px 20px" @click="addAttrValue" :disabled="!attrInfo.attrName || isExistEdit"
            >添加属性值</el-button
          >
        </div>
        <el-table border style="width: 100%; margin: 20px" :data="attrInfo.attrValueList">
          <el-table-column type="index" prop="prop" label="序号" width="80px">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="属性值名称"
          >
            <template slot-scope="{row,$index}">
                <el-input v-model="row.valueName" placeholder="请输入属性值" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" ref="elmInput"></el-input>
                <span v-else @click="toEdit(row)" style="display:block">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
          <template slot-scope="row,$index">
                <el-popconfirm
                :title="`确定删除?`"
                @onConfirm='deleteAttrValue($index)'
                >       
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" :disabled="isExistEdit"></el-button>
                </el-popconfirm>
          </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="submitAddOrUpdateAttr" :disabled="isExistEdit">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      //收集或修改属性
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 0,
        id: undefined,
      },
    };
  },
  computed:{
    isExistEdit(){
        return this.attrInfo.attrValueList.some((item)=>{
            return item.flag == true
        })
    }
  },
  methods: {
    //选择完三级联动的回调
    getCatedoryId(idObj) {
      this.category1Id = idObj.category1Id;
      this.category2Id = idObj.category2Id;
      this.category3Id = idObj.category3Id;
      this.getAttrList();
    },
    //获取平台属性数据
    async getAttrList() {
      let result = await this.$API.attr.reqAttrList(this);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    category3IdChange(newValue) {
      this.category3Id = newValue;
      if (!this.category3Id) {
        this.attrList = [];
      }
    },
    //添加属性值回调
    addAttrValue(){
        this.attrInfo.attrValueList.push({
            attrId:this.attrInfo.id ,
            valueName:'',
            flag:true

        })
         this.$nextTick(()=>{
            this.$refs.elmInput.focus()
        })
    },
    //添加属性
    addAttr(){
        this.isShowTable = false
        this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
        }
    },
    //修改属性
    updateAttr(row){
        this.isShowTable = false
        //深拷贝
        this.attrInfo = cloneDeep(row)
    },
    //
    toLook(row){
        if (row.valueName.trim()== '') {
            this.$message({message:'请输入合法的属性值',type:'warning'})
            this.$nextTick(()=>{
             this.$refs.elmInput.focus()
          })
            return
        }
        let isRepeat = this.attrInfo.attrValueList.some((item)=>{
            if (row != item) {
                return row.valueName == item.valueName
            }
            return false
        })
        if (isRepeat) {
               this.$message({message:'该属性值已存在',type:'warning'})
             this.$nextTick(()=>{
             this.$refs.elmInput.focus()
          })
            return
        }
        row.flag=false
    },
    //显示input
    toEdit(row){
        if (!row.flag) {
            this.$set(row,'flag',false)
        }
        row.flag=true
         this.$nextTick(()=>{
        this.$refs.elmInput.focus()
          })
    },
    //删除属性值
    deleteAttrValue(index){
        this.attrInfo.attrValueList.splice(index,1)
    },
    //提交新增或修改数据
    async submitAddOrUpdateAttr(){
        if (this.attrInfo.attrValueList.length >=1) {
            this.attrInfo.attrValueList.forEach((item)=>{
            delete item.flag
        })
            let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
            if (result.code == 200) {
                console.log(result);
                this.isShowTable = true,
                this.getAttrList()
                this.$message({message:'保存成功',type:'success'})
            }
        }else{
            this.$message({message:'请添加属性值',type:"warning"})
        }
    },
    async deleteAttr(row){
        let result = await this.$API.attr.reqDeleteAttr(row.id)
        if (result.code == 200) {
            this.$message({message:'删除成功',type:'success'})
            this.getAttrList()
        }
        else{
            this.$message({message:'删除失败',type:'error'})
        }
    }
    
  },
};
</script>

<style lang="scss" scoped>
</style>