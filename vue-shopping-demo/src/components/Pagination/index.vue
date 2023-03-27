<template>
  <el-pagination 
  class="pagination"
  background layout="prev, pager, next" 
  :total="1000">
  </el-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.pagination{
    text-align: center;
}
</style>
