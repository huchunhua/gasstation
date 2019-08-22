<template>
  <div>
    <a-card title="优惠券详情">
      <a-spin class="index-loading" tip="加载中..." v-if="!loaded" />
      <div class="content"  v-if="loaded">
        <a-row>
          <a-col :span="6" class="title">优惠券名称</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_title}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">一句话简介</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_jingle}}</a-col>
        </a-row>                   
        <a-row>
          <a-col :span="6" class="title">关联方案</a-col>
          <a-col :span="8" class="info">{{data.scheme_title}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">资金渠道</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_channel}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="6" class="title">卡券类型</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_type}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="6" class="title">加油站</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_storename}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">批次开始时间</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_starttime}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">批次结束时间</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_endtime}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="6" class="title">子券生存时间</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_subsurvival}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="6" class="title">优惠券面额</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_money}}</a-col>
        </a-row>          
        <a-row>
          <a-col :span="6" class="title">获取类型</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_gettype}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">优惠券销售价格</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_price}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">优惠券限额</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_limit}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="6" class="title">优惠券总张数</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_total}}</a-col>
        </a-row>                  
        <a-row>
          <a-col :span="6" class="title">单日发放限制</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_daylimit}}</a-col>
        </a-row>          
        <a-row>
          <a-col :span="6" class="title">限领张数</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_eachlimit}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">描述说明</a-col>
          <a-col :span="8" class="info" v-html="data.coupon_t_desc"></a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">使用规则提示文本</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_tips}}</a-col>
        </a-row>          
        <a-row>
          <a-col :span="6" class="title">绑定的SKU</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_bindsku}}</a-col>
        </a-row>         
        <a-row>
          <a-col :span="6" class="title">是否推荐到精选</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_ischoice}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="6" class="title">推送到支付成功页面</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_ispayed}}</a-col>
        </a-row>        
        <a-row>
          <a-col :span="6" class="title">活动专用</a-col>
          <a-col :span="8" class="info">{{data.coupon_t_isact}}</a-col>
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
      }
    },
    created() {
        const _this = this;
        const id = _this.$route.params.id;
        _this.$http.post('/coupon/info.html?id=id',{id:id}).then(response => {
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
