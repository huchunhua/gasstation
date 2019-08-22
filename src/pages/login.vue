<template>
  <div class="login-form">
    <a-form @submit="onSubmit" :autoFormCreate="(form)=>{this.form = form}">
      <div class="login-form-info">
        <div class="login-form-title">站点后台</div>
      </div>
      <a-form-item
        fieldDecoratorId="name"
        label="用户名"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}">
        <a-input placeholder='请输入用户名'>
          <a-icon type='user' :style="{color:'rgba(255,255,255,.25)'}" slot="prefix"/>
        </a-input>
      </a-form-item>
      <a-form-item
        fieldDecoratorId="password"
        label="密码"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}">
        <a-input type='password' placeholder='请输入密码'>
          <a-icon type='lock' :style="{color:'rgba(255,255,255,.25)'}" slot="prefix"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type='primary' htmlType='submit' class='login-form-button'>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {}
    },
    methods: {
      onSubmit(e) {
        const _this = this;
        e.preventDefault();
        _this.form.validateFields(
          (err) => {
            if (!err) {
              _this.$http.post('/login/index',_this.form.getFieldsValue()).then(response => {
                if(response.data.code == 200){
                  _this.$utils.cookie.set("token", response.data.datas.token);
                  _this.$utils.cookie.set("islogin", "station");
                  _this.$utils.cookie.set("info", JSON.stringify(response.data.datas.user_info));
                  this.$router.push({name:'Index'});
                }else{
                  _this.$message.error(response.data.datas.error);
                }
              });
            }
          },
        )
      }
    }
  }
</script>

<style>
  body {
    background: url(http://app.allhouse.cc/img/backend/index.jpg) no-repeat bottom;
  }

  .login-form {
    width: 430px;
    padding-top: 250px;
    margin: auto;
  }

  .login-form .ant-form {
    background: #36393f;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
    box-sizing: border-box;
    color: #72767d;
    font-size: 16px;
    padding: 40px;
  }

  .login-form-button {
    width: 100%;
    background-color: #7289da;
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    margin-top: 20px;
    height: 44px;
    min-height: 44px;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
  }

  .login-form-info {
    margin-bottom: 20px;
  }

  .login-form-info .login-form-title {
    font-size: 26px;
    line-height: 32px;
    font-weight: 300;
    color: #fff;
    text-align: center;
  }
</style>
