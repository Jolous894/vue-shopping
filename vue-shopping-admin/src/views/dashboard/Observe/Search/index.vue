<template>
  <el-card>
    <div slot="header" class="myheader">
      <span>线上热门搜索</span>
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
         <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item >双皮奶</el-dropdown-item>
          <el-dropdown-item >蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
            <lineChart></lineChart>
        </el-col>
        <el-col :span="12">
            <lineChart></lineChart>
        </el-col>
      </el-row>
        <el-row :gutter="10" style="margin-top:10px;">
          <el-col :span="24">
            <el-table style="width: 100%" border>
            <el-table-column type="index" label="排名"  width="80" align="center">
            </el-table-column>
            <el-table-column prop="name" label="搜关键字"  width="180" align="center">
            </el-table-column>
            <el-table-column prop="address" label="用户数" sortable >
            </el-table-column>
             <el-table-column prop="date" label="周涨幅" sortable >
            </el-table-column>
        </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
              <el-pagination
                  align="center"
                  layout="prev, pager, next"
                  :total="1000">
            </el-pagination>
          </el-col>
        </el-row>
    </div>
  </el-card>
</template>

<script>
import lineChart from '@/views/dashboard/Observe/Search/lineChart'
export default {
  name:'',
  components:{
    lineChart,
  }
};
</script>

<style  scoped>
.myheader {
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
}
</style>