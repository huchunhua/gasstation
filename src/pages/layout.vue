<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="wrapper">
        <div class="logo"/>
        <a-menu mode="horizontal" :defaultSelectedKeys="selectKeys" :style="{ lineHeight: '64px',cssFloat:'left',maxWidth:'600px' }">
          <a-menu-item key="info" @click="onChange('info')">油站信息</a-menu-item>
          <a-menu-item key="coupon" @click="onChange('coupon')">油站优惠</a-menu-item>
          <a-menu-item key="order" @click="onChange('order')">订单信息</a-menu-item>
          <a-menu-item key="dashboard" @click="onChange('dashboard')">数据概览</a-menu-item>
          <a-menu-item key="report" @click="onChange('report')">报表导出</a-menu-item>
        </a-menu>
        <div class="user">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" href="#">
              {{info.name}}<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a href="/">返回首页</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" @click="onLogout">退出</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="wrapper">
        <div :style="{padding: '24px'}">
          <router-view/>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      中油优宝 ©2018 Powered by 富为科技.
    </a-layout-footer>
  </a-layout>
</template>

<script>
  export default {
    name: "layout",
    data() {
      return {
        pageIndex: 'wait',
        info:{},
        selectKeys: ['info']
      }
    },
    created() {
      const _this = this;
      this.info = JSON.parse(this.$utils.cookie.get('info'));
      if(this.$route.path == '/record'){
        this.pageIndex = 'log'
      };
      const route = this.$route.name;
      if (route == 'Index'){
        _this.selectKeys = ['info']
      }else if(route == 'Coupon' || route == 'Coupondetail' || route == 'Grant'){
        _this.selectKeys = ['coupon']        
      }else if(route == 'Order' || route == 'Detail'){
        _this.selectKeys = ['order']           
      }else if(route == 'Dashboard'){
        _this.selectKeys = ['dashboard']           
      }else if(route == 'Report'){
        _this.selectKeys = ['report']           
      }
    },
    methods: {
      onChange(e) {
        switch (e){
          case 'info':
            this.$router.push({name:'Index'});
            break;
          case 'coupon':
            this.$router.push({name:'Coupon'});
            break;
          case 'order':
            this.$router.push({name:'Order'});
            break;          
          case 'dashboard':
            this.$router.push({name:'Dashboard'});
            break;          
          case 'report':
            this.$router.push({name:'Report'});
            break;
        }
      },
      onLogout() {
        this.$utils.cookie.del('token');
        this.$utils.cookie.del('info');
        this.$router.push({name:'Login'});
      }
    }
  }
</script>
<style scoped>
  .layout .ant-layout-header {
    background: #7289da;
    padding: 0 24px;
  }

  .layout .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, .2);
    margin: 16px 24px 16px 0;
    float: left;
  }

  .layout .ant-layout-header .wrapper .ant-menu {
    background: transparent;
  }

  .layout .ant-layout-header .wrapper .ant-menu-item {
    color: #eee;
    border: none;
  }

  .layout .ant-layout-header .wrapper .ant-menu-item-selected {
    color: #eee;
    line-height: 64px;
    border: 0;
    background: rgba(0, 0, 0, .25);
    top: 0;
    margin: 0;
  }

  .wrapper {
    /*width: 1200px;*/
    /*margin: auto;*/
  }

  .page-action {
    text-align: center;
  }
  .user .ant-dropdown-link{
    float: right;
  }
  .user .ant-dropdown-link{
    color: #fff;
  }
</style>
