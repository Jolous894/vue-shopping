<template>
    <div ref="charts" class="charts">
    </div>
</template>

<script>
    import * as echarts from 'echarts'  
    export default {
        name:'barCharts',
        mounted(){
            let lineCharts = echarts.init(this.$refs.charts) 
            lineCharts.setOption({
                 xAxis: {
                    type: 'category',
                    show:false
                },
                yAxis: {
                    show:false,
                },
                series: [
                    {
                        data: [10, 7, 33, 12, 48, 9,29,10,44,33,22,8],
                        type: 'bar',
                    }
                ],
                tooltip:{},
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                },
            })  
        },
    }
</script>

<style  scoped>
    .charts{
        height: 100%;
        width: 100%;
    }
</style>