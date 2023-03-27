<template>
    <div ref="charts" class="charts">
    </div>
</template>

<script>
    import * as echarts from 'echarts'  
    export default {
        name:'lineCharts',
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
                        data: [10, 7, 33, 12, 48, 9,29,10,44],
                        type: 'line',
                        itemStyle:{
                            opacity:0
                        },
                        lineStyle: {
                            color: "purple",
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                    offset: 0,
                                    color: "purple", // 0% 处的颜色
                                    },
                                    {
                                    offset: 1,
                                    color: "#fff", // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                    }
                ],
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