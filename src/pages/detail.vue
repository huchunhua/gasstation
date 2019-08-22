<template>
  <div>
    <a-card title="订单详情">
      <h2>SN:{{data.order_sn}}</h2>
      <div class="content">
        <a-row>
          <a-col  :span="12">
            <a-row>
              <a-col :span="6" class="title">订单金额</a-col>
              <a-col :span="18" class="info">{{data.order_amount}}</a-col>
            </a-row>          
            <a-row>
              <a-col :span="6" class="title">支付金额</a-col>
              <a-col :span="18" class="info">{{data.pay_amount}}</a-col>
            </a-row>         
            <a-row>
              <a-col :span="6" class="title">优惠金额</a-col>
              <a-col :span="18" class="info">{{data.order_discount}}</a-col>
            </a-row>         
            <a-row>
              <a-col :span="6" class="title">下单时间</a-col>
              <a-col :span="18" class="info">{{data.payment_time}}</a-col>
            </a-row>          
            <a-row>
              <a-col :span="6" class="title">支付时间</a-col>
              <a-col :span="18" class="info">{{data.payment_time}}</a-col>
            </a-row>         
            <a-row>
              <a-col :span="6" class="title">交易流水号</a-col>
              <a-col :span="18" class="info">{{data.trade_no}}</a-col>
            </a-row>  
          </a-col> 
          <a-col :span="12">     
            <a-row>
              <a-col :span="6" class="title">卡券名称</a-col>
              <a-col :span="18" class="info">{{data.coupon_info.coupon_title}}</a-col>
            </a-row>       
            <a-row>
              <a-col :span="6" class="title">卡券类型</a-col>
              <a-col :span="18" class="info">{{data.coupon_info.coupon_type}}</a-col>
            </a-row>          
            <a-row>
              <a-col :span="6" class="title">卡券面额</a-col>
              <a-col :span="18" class="info">{{data.coupon_info.coupon_money}}</a-col>
            </a-row>          
            <a-row>
              <a-col :span="6" class="title">卡券说明</a-col>
              <a-col :span="18" class="info" v-html="data.coupon_info.coupon_desc"></a-col>
            </a-row>         
            <a-row>
              <a-col :span="6" class="title">归属油站</a-col>
              <a-col :span="18" class="info">{{data.coupon_info.coupon_storename}}</a-col>
            </a-row>         
            <a-row>
              <a-col :span="6" class="title">油站地址</a-col>
              <a-col :span="18" class="info">{{data.station_info.seller_address}}</a-col>
            </a-row> 
          </a-col>
         </a-row>     
        <a-table :columns="columns" :dataSource="data.order_goods"></a-table>                
      </div>
    </a-card>
  </div>
</template>

<script>
const columns = [{
  title: '商品名称',
  dataIndex: 'goods_name',
},{
  title: '商品类型',
  dataIndex: 'goods_type', 
},{
  title: '商品单价',
  dataIndex: 'goods_price',   
},{
  title: '购买数量',
  dataIndex: 'goods_num',    
},{
  title: '商品总价',
  dataIndex: 'goods_price',      
}]
  export default {
    name: "index",
    data() {
      return {
        loaded: false,
        data:'',
        columns
      }
    },
    created() {
      const _this = this;
      const id = _this.$route.params.id;
      _this.$http.post('/order/detail.html',{id:id}).then(response => {
        if (response.data.code == 200) {
          _this.data = response.data.datas;
          console.log(_this.data);
          _this.loaded = true;
        } else {
          _this.$message.error(response.data.datas.error);
        }
      });
    },
    methods: {
      onView(id) {
        this.$router.push({name: 'View', params: {id: id}});
      }
    }
  }
</script>

<style scoped>
.content{
  width: 1280px;
  margin:0 auto;
}
.content>div{
  margin:10px 0;
}
.title{
  text-align: right;
  padding:10px 20px;
}
.info{
  padding:10px 20px;
  border-radius: 2px;
}
p{
  margin-bottom: 0
}
</style>
