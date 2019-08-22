<template>
  <div>
    <a-card title="发放明细">
      <div class="content">
          <h3>{{data.coupon_title}}</h3>   
          <p>合计发放{{data.coupon_count}}</p>  
          <!-- <a-button>导出</a-button> -->
          <a-table :columns="columns" :dataSource="data.data" class="table"></a-table>   
      </div>
    </a-card>
  </div>
</template>

<script>
const columns = [{
  title: '卡券编码',
  dataIndex: 'id'
},{
  title: '卡券状态',
  dataIndex: 'coupon_state'  
},{
  title: '领取用户',
  dataIndex: 'coupon_owner'    
},{
  title: '领取时间',
  dataIndex: 'coupon_actived'    
},{
  title: '核销状态 ',
  dataIndex: 'coupon_used'    
},{
  title: '核销时间',
  dataIndex: 'coupon_used'    
}
]
  export default {
    name: "index",
    data() {
      return {
        loaded: false,
        data:'',
        columns,
      }
    },
    created() {
        const _this = this;
        const id = _this.$route.params.id;
        _this.$http.post('/coupon/detail.html',{id:id}).then(response => {
          if (response.data.code == 200) {
            _this.data = response.data.datas;
            console.log(response.data.datas);
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
  width: 980px;
  margin:0 auto;
}
.table{
  margin-top: 20px;
}
</style>
