<template>
    <a :title="title" style="margin-left:10px">
        <el-button :type="type" :icon="icon" :size='size'></el-button>
    </a>
</template>

<script>
    export default {
        name:'myButton',
        props:['title','type','icon','size']
    }
</script>

<style lang="scss" scoped>

</style>