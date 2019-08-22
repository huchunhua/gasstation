<template>
  <div>
    <a-card title="油站信息">
      <div class="content">
        <a-row>
          <a-col :span="4" class="title">油站名称</a-col>
          <a-col :span="8" class="info">{{data.seller_name}}</a-col>
        </a-row>          
        <a-row>
          <a-col :span="4" class="title">油站编码</a-col>
          <a-col :span="8" class="info">{{data.seller_company}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="4" class="title">油站电话</a-col>
          <a-col :span="8" class="info">{{data.seller_phone?data.seller_phone : '无'}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="4" class="title">经营油品</a-col>
          <a-col :span="8" class="info">{{data.seller_oil}}</a-col>
        </a-row>          
        <a-row>
          <a-col :span="4" class="title">油站服务</a-col>
          <a-col :span="8" class="info">{{data.seller_service?data.seller_service : '无'}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="4" class="title">开始营业时间</a-col>
          <a-col :span="8" class="info">{{data.seller_time_start}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="4" class="title">结束营业时间</a-col>
          <a-col :span="8" class="info">{{data.seller_time_end}}</a-col>
        </a-row>       
        <a-row>
          <a-col :span="4" class="title">油站地址</a-col>
          <a-col :span="8" class="info">{{data.seller_address}}</a-col>
        </a-row>          
        <a-row>
          <a-col :span="4" class="title">油站经度</a-col>
          <a-col :span="8" class="info">{{data.seller_longitude}}</a-col>
        </a-row>          
        <a-row>
          <a-col :span="4" class="title">油站纬度</a-col>
          <a-col :span="8" class="info">{{data.seller_latitude}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="4" class="title">是否推荐</a-col>
          <a-col :span="8" class="info">{{data.seller_recommend}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="4" class="title">油站状态</a-col>
          <a-col :span="8" class="info">{{data.seller_state}}</a-col>
        </a-row>        
      </div>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        loaded: false,
        data:''
      }
    },
    created() {
      const _this = this;
      _this.$http.post('/index/index.html').then(response => {
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
  width: 980px;
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
  background-color: #eeeeee;
  padding:10px 20px;
  border-radius: 2px;
}
</style>
