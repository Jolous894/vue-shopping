<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <Search></Search>
        </el-col>
        <el-col :span="12">
            <Category></Category>
        </el-col>
      
    </el-row>
</template>

<script>
import Category from '@/views/dashboard/Observe/Category'
import Search from '@/views/dashboard/Observe/Search'

    export default {
        name:'Observe',
        components:{
           Category,
           Search,
        }
    }
</script>

<style lang="scss" scoped>

</style>