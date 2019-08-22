<template>
  <a-card title="报表导出">
    <p>相关文件报表导出</p>
    <a-row>
      <a-col :span="8" class="block">
        <h3 class="block_tit">支付明细</h3>
        <p>请选择时间</p>
        <a-range-picker suffixIcon="ab" @change="onChange" showTime format="YYYY-MM-DD HH:mm:ss"/>
        <input type="submit" class="btn_download" value="下载" @click="Download('payment')"/>
        <p class="font-s12 text-muted">中油优宝微信翼支付分站明细表</p>
      </a-col>      
      <a-col :span="8" class="block">
        <h3 class="block_tit">核销明细</h3>
        <p>请选择时间</p>
        <a-range-picker suffixIcon="ab" @change="onChange" showTime format="YYYY-MM-DD HH:mm:ss"/>
        <input type="submit" class="btn_download" value="下载" @click="Download('verify')"/>
        <p class="font-s12 text-muted">中油优宝电子券核销分站明细表</p>
      </a-col>      
      <a-col :span="8" class="block">
        <h3 class="block_tit">消费明细</h3>
        <p>请选择时间</p>
        <a-range-picker suffixIcon="ab" @change="onChange" showTime format="YYYY-MM-DD HH:mm:ss"/>
        <input type="submit" class="btn_download"  value="下载" @click="Download(consume)"/>
        <p class="font-s12 text-muted">中油优宝加油站消费明细</p>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
    export default {
      name: "report",
      data () {
        return {
          loading: true,
          data: [],
          startime:'',
          endtime:'',
          // payment,
          verify:'',
          consume:'',
          token:''
        }
      },
  methods: {
    Download(type) {
      var _this = this;
      var time_start = _this.startime;
      var time_end = _this.endtime;
      var token = this.$utils.cookie.get('token');
      window.open('https://oil.hkyx365.com/station/index/report.html?' + 'token=' + token +'&type=' + type + '&time_start=' + time_start + '&time_end=' + time_end);
    },
    onChange(date, dateString) {
      var _this = this;
      _this.startime = dateString[0];
      _this.endtime = dateString[1]
    }
  },
    }
</script>

<style scoped>
.block{
  text-align: center;
  padding:0 30px;
}
.block_tit{
  text-align: center;
  margin:30px 0;
}
.block .label{
  text-align: left;
}
.time_block{
  margin-top: 20px;
}
.btn_download{
  min-width: 110px;
  line-height: 30px;
  height: 30px;
  text-align: center;
  border-radius: 30px;
  color: #fff;
  background-color: #46c37b;
  border:none;
  margin:20px auto;
  display: block;
}
</style>
