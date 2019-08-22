<template>
  <a-card title="统计概览">
    <a-row>
      <a-col :span="8">
        <a-row class="info_block">
          <a-col :span="4" class="title">总销售额</a-col>
          <a-col :span="18">{{info.sale_all}}</a-col>
        </a-row>        
      </a-col>
      <a-col :span="8">
        <a-row class="info_block">
          <a-col :span="4" class="title">总优惠金额</a-col>
          <a-col :span="18">{{info.discount_all}}</a-col>
        </a-row> 
      </a-col>
      <a-col :span="8">       
        <a-row class="info_block">
          <a-col :span="4" class="title">总支付笔数</a-col>
          <a-col :span="18">{{info.order_all}}</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="chart">
        <h5 class="chart-title">增长曲线</h5>
        <p class="chart-subtitle">过去一周的数据增长曲线</p>
        <div :class="className" :id="id" :style="{height:height,width:width}" ref="statIncrease"></div>        
      </a-col>      
      <a-col :span="12" class="chart">
        <h5 class="chart-title">流水统计</h5>
        <p class="chart-subtitle">系统运行至今的所有流水总额</p>
        <div :class="className" :id="id" :style="{height:height,width:width}" ref="statFinance"></div>        
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'yourID'
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      chart: null,
      info:[]
    }
  },
  created() {
      const _this = this;
      _this.$http.post('/index/dashboard.html').then(response => {
        if (response.data.code == 200) {
          _this.info = response.data.datas;
          _this.loaded = true;
        } else {
          _this.$message.error(response.data.datas.error);
        }
      });
      // 过去七天数据
      _this.$http.post('/index/dashboard_week.html').then(response => {
        if (response.data.code == 200) {
          var data = response.data.datas;
          var date = new Array;
          var member_count = new Array;
          var order_count = new Array;
          for(var i = 0;i<data.length;i++){
            date.push(data[i].date);
            member_count.push(data[i].member_count);
            order_count.push(data[i].order_count)
          }
          _this.loaded = true;
          this.chart = echarts.init(this.$refs.statIncrease);
          // 把配置和数据放这里
          this.chart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['会员数', '订单数']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '会员数',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: member_count
                    },
                    {
                        name: '订单数',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: order_count
                    }
                ]
          })
        } else {
          _this.$message.error(response.data.datas.error);
        }
      });
      // 流水统计
      _this.$http.post('/index/dashboard_money.html').then(response => {
        if (response.data.code == 200) {
          var data = response.data.datas;
          var order_amount = new Array;
          var pay_amount = new Array;
          var discount_amount = new Array;
          for(var i = 0 ; i<data.length;i++){
            order_amount.push(data[i].order_amount);
            pay_amount.push(data[i].pay_amount );
            discount_amount.push(data[i].discount_amount)
          };
          _this.loaded = true;
          this.chart = echarts.init(this.$refs.statFinance);
          this.chart.setOption({
            tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['流水总额', '实付总额', '优惠总额']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: ['总计', '油品', '非油']
                    }
                ],
                series: [
                    {
                        name: '流水总额',
                        type: 'bar',
                        data: order_amount
                    },
                    {
                        name: '实付总额',
                        type: 'bar',
                        data: pay_amount
                    },
                    {
                        name: '优惠总额',
                        type: 'bar',
                        data: discount_amount
                    }
                ]
          })
         
        } else {
          _this.$message.error(response.data.datas.error);
        }
      });
  },
  mounted() {
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
  }
}
</script>

<style scoped>
.info_block{
  padding:0 30px;
  text-align: right;
}
.info_block .title{
  text-align: left;
}
.chart{
  margin-top: 30px;
}
</style>