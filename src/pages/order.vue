<template>
  <a-card title="订单列表">
    <a-range-picker @change="onScreen" />
    <input type="submit" class="btn_download"  value="导出" @click="Download()"/>
    <a-table :columns="columns" :dataSource="data" :pagination=false>
      <span slot="actions" slot-scope="text, record">
        <a-tooltip placement="top" >        
          <template slot="title">
            <span>详情</span>
          </template>
           <a-icon type="info-circle" @click="getDetail(record.id)"/>
        </a-tooltip>
      </span>
    </a-table>
    <template>
      <a-pagination :current="current" :total="pagenum" @change="onChange"/>
    </template>   
  </a-card>
</template>

<script>
const columns = [
{
  title: '订单编号',
  dataIndex: 'order_sn',
},
{
  title: '订单金额',
  dataIndex: 'order_amount',
},
{
  title: '抵扣金额',
  dataIndex: 'order_discount',
},
{
  title: '卡券名称',
  dataIndex: 'coupon_title',
},
{
  title: '实付金额',
  dataIndex: 'pay_amount',
},
{
  title: '支付时间',
  dataIndex: 'payment_time',
},
{
  title: '交易流水号',
  dataIndex: 'trade_no',
},
{
  title: '用户电话',
  dataIndex: 'member_mobile',
},
{
  title: '核销油站',
  dataIndex: 'store_name',
},
{
  title: '操作',
  key: 'actions',
  dataIndex: 'actions',
  scopedSlots: { customRender: 'actions' },
}];

export default {
  data() {
    return {
      data:[],
      columns,
      pagenum:'',
      current:1
    }
  },
  created() {
      const _this = this;
      _this.user= JSON.parse(this.$utils.cookie.get('info'));
      _this.$http.post('/order/index.html',{page:1}).then(response => {
        if (response.data.code == 200) {
          _this.data = response.data.datas.datas;
          _this.pagenum = response.data.datas.count;
          _this.loaded = true;
        } else {
          _this.$message.error(response.data.datas.error);
        }
      });
  },
  methods: {
    getDetail(id){
      this.$router.push({name: 'Detail', params: {id: id}});
    },
    onChange(current) {
        const _this = this;
        _this.current = current;
        _this.$http.post('/order/index.html',{page:current,time_start:_this.startime,time_end:_this.endtime}).then(response => {
          if (response.data.code == 200) {
            _this.data = response.data.datas.datas;
            _this.pagenum = response.data.datas.count;
            console.log(_this.data);
            _this.loaded = true;
          } else {
            _this.$message.error(response.data.datas.error);
          }
        });
    },
    onScreen(date, dateString) {
      var _this = this;
      _this.startime = dateString[0];
      _this.endtime = dateString[1];
      _this.onChange(1)
    },
    Download() {
      var _this = this;
      var time_start = _this.startime;
      var time_end = _this.endtime;
      var token = this.$utils.cookie.get('token');
      console.log(_this.current);
      window.open('https://oil.hkyx365.com/station/order/export.html?' + 'token=' + token + '&time_start=' + time_start + '&time_end=' + time_end);
    },
  }
}
</script>

<style scoped>
.ant-pagination{
  margin-top: 50px;
}
</style>
