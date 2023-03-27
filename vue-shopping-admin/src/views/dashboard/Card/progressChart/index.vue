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
                    show:false,
                    min:0,
                    max:100,
                },
                yAxis: {
                    type: 'category',
                    show:false,
                },
                series: [
                    {
                        data: [78],
                        type: 'bar',
                        color:'yellowgreen',
                        barWidth:'10',
                        showBackground:true,
                        Style:{
                            color:'#eee',
                        },
                        label:{
                            show:true,
                            formatter:'|',
                            position:'right',
                        }
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