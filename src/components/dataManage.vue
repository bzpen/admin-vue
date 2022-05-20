<template>
  <div>
    <!-- <h1>数据管理</h1> -->
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="main" style="width: 90%; height: 600px"></div>
  </div>
</template>

<script>
import api from "../api/api";
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      charts: "",
      /*	opinion: ["1", "3", "3", "4", "5"],*/
      // opinionData: [3, 2, 4, 4, 5,8,5],
      option:{
        xAxis: {
          type: "category",

          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        legend:{
          x:'center'
        },
        series: [
          {
						name: '当周管理员登录人数',
						type: 'line',
						stack: '总量',
						data: []
					},
          {
						name: '当周用户登录人数',
						type: 'line',
						stack: '总量',
						data: []
					}
        ],
      },
    };
  },
  methods: {
    drawLine(id) {
      
      this.charts = echarts.init(document.getElementById(id));
      // this.charts.setOption(this.option);
    },
  },
  //调用
  activated() {
    this.$nextTick(function () {
      this.drawLine("main");
    });
  },
  created(){
    const res = api.getLog()
    res.then((data)=>{
      console.log(data)
    this.option.series[0].data = data.data.admin
    this.option.series[1].data = data.data.user
    this.charts.setOption(this.option);
    
    // console.log(this.opinionData)
    });
    
    
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>