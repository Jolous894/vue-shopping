<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!--    v-model="value1" -->
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 显示 -->
    <div>
        <el-row :gutter="10">
            <el-col :span="18">
                <div class="charts" ref="charts">
                </div>
            </el-col>
            <el-col :span="6" class="right">
                <h3>门店{{title}}排名</h3>
                <ul>
                    <li>
                        <span class="rindex">1</span>
                        <span>肯德基</span>
                        <span class="rvalue">1234</span>
                    </li>
                    <li>
                        <span class="rindex">2</span>
                        <span>肯德基</span>
                        <span class="rvalue">1234</span>
                    </li>
                    <li>
                        <span class="rindex">3</span>
                        <span>肯德基</span>
                        <span class="rvalue">1234</span>
                    </li>
                    <li>
                        <span class="rindex">4</span>
                        <span>肯德基</span>
                        <span class="rvalue">1234</span>
                    </li>
                    <li>
                        <span class="rindex" >5</span>
                        <span>肯德基</span>
                        <span class="rvalue">1234</span>
                    </li>
                    <li>
                        <span class="rindex">6</span>
                        <span>肯德基</span>
                        <span class="rvalue">1234</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
  </el-card>
</template>

<script>
//引入echarts
import * as echarts from 'echarts'  
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      //收集日历数据
      date: [],
    };
  },
  methods:{
    setDay(){
        const day = dayjs().format('YYYY-MM-DD')
        this.date = [day,day]
    },
    setWeek(){
        const start = dayjs().day(1).format('YYYY-MM-DD')
        const end = dayjs().day(7).format('YYYY-MM-DD')
        this.date = [start,end]
    },
    setMonth(){
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('month').format('YYYY-MM-DD')
        this.date = [start,end]
    },
    setYear(){
        const start = dayjs().startOf('year').format('YYYY-MM-DD')
        const end = dayjs().endOf('year').format('YYYY-MM-DD')
        this.date = [start,end]
    }
  },
  computed:{
    ...mapState('home',['list']),
    title(){
        return this.activeName=='sale'?'销售额':'访问量'
    }
  },
  watch:{
    title(){
        this.myCharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.title == "销售额"
              ? this.list.orderFullYearAxis
              : this.list.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title == "销售额"
                ? this.list.orderFullYear
                : this.list.userFullYear,
            color: "yellowgreen",
          },
        ],
      });
    },
     list(){
     this.myCharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.list.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.list.orderFullYear,
          color: "yellowgreen",
        },
      ],
    });

    }
  },
  mounted(){
    this.myCharts = echarts.init(this.$refs.charts)
    this.myCharts.setOption({
                title:{
                    text:'销售额趋势'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                    }
                ],
                yAxis: [
                    {
                    type: 'value'
                    }
                ],
                series: [
                    {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                    }
                ]
            })
  },
};
</script>

<style scoped>

.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}


</style>
