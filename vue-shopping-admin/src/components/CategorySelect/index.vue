<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" v-model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="!isShowTable"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          ref="c2"
            :disabled="!isShowTable"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
            :disabled="!isShowTable"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props:['isShowTable'],
  watch:{
    'cForm.category3Id':{
        handler(newValue){
            this.$emit('category3IdChange',newValue)
        }
    }
  },
  methods: {
    //一级数据
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.category1List = result.data;
      }
    },
    //动态获取二级数据
    async handler1() {
      this.category2List = [];
      this.category3List = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      let result = await this.$API.attr.reqCategory2List(
        this.cForm.category1Id
      );
      if (result.code == 200) {
        this.category2List = result.data;
      }
    },
    //动态获取三级数据
    async handler2() {
      this.category3List = [];
      this.cForm.category3Id = "";
      let result = await this.$API.attr.reqCategory3List(
        this.cForm.category2Id
      );
      if (result.code == 200) {
        this.category3List = result.data;
      }
    },
    handler3() {
        let {category1Id,category2Id,category3Id} = this.cForm
        this.$emit('getCatedoryId',{category1Id,category2Id,category3Id})
    },
  },
  mounted() {
    this.getCategory1List();
  },
};
</script>

<style lang="scss" scoped>
</style>