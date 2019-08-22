<template>
  <a-card title="卡券列表">
    <a-table :columns="columns" :dataSource="data" @change="onChange">
      <span slot="actions" slot-scope="text, record">
        <a-tooltip placement="top">
          <template slot="title">
            <span>详情</span>
          </template>
          <a-icon type="form"  @click="getDetail(record.id)"/>
        </a-tooltip>  
        <a-tooltip placement="top" >        
          <template slot="title">
            <span>发放明细</span>
          </template>
           <a-icon type="info-circle" @click="getGrant(record.id)"/>
        </a-tooltip>
      </span>
    </a-table>    
  </a-card>
</template>

<script>
const columns = [{
  title: 'ID',
  dataIndex: 'id',
  sorter: (a, b) => a.id - b.id,
}, 
{
  title: '卡券名称',
  dataIndex: 'coupon_t_title',
},
{
  title: '卡券面额',
  dataIndex: 'coupon_t_money',
  sorter: (a, b) => a.coupon_t_money - b.coupon_t_money,
}, 
{
  title: '使用限制',
  dataIndex: 'coupon_t_limit',
},
{
  title: '制券时间',
  dataIndex: 'coupon_t_created',
},
{
  title: '卡券总量',
  dataIndex: 'coupon_t_total',
},
{
  title: '领取总量',
  dataIndex: 'coupon_t_giveout',
},
{
  title: '核销数量',
  dataIndex: 'coupon_t_used',
},
{
  title: '制券油站',
  dataIndex: 'coupon_t_storename',
  filters: [{
    text: '水碾河加油站',
    value: '水碾河加油站',
  }, {
    text: '成华区加油站',
    value: '成华区加油站',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.coupon_t_storename.indexOf(value) === 0,
},
{
  title: '卡券状态',
  dataIndex: 'coupon_t_state',
  filters: [{
    text: '作废',
    value: '作废',
  }, {
    text: '过期',
    value: '过期',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.coupon_t_state.indexOf(value) === 0,
},
{
  title: '操作',
  key: 'actions',
  dataIndex: 'actions',
  scopedSlots: { customRender: 'actions' },
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


export default {
  data() {
    return {
      data:[],
      columns,
    }
  },
  created() {
    const _this = this;
    _this.$http.post('/coupon/index.html').then(response => {
      if (response.data.code == 200) {
        _this.data = response.data.datas;
        console.log(_this.data);
          this.loaded = true;
      } else {
          _this.$message.error(response.data.datas.error);
      }
    });
  },
  methods: {
    onChange,
    getDetail(id) {
      this.$router.push({name: 'Coupondetail', params: {id: id}});
    }, 
    getGrant(id){
      this.$router.push({name: 'Grant', params: {id: id}});
    }
  }
}
</script>

<style scoped>

</style>
