<template>
  <div id="login">
    <h4>用户名</h4>
    <el-input v-model="username" placeholder="用户名" style='width:300px'></el-input>
    <h4>密码</h4>
    <el-input v-model="password" type="password" placeholder="密码" @keyup.enter="onLogin" ></el-input>
    <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">没有账号？<router-link to="/register">注册新用户</router-link></p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name:'Login',
  data() {
    return {
      username:'',
      password:''
    }
  },
  methods:{
    ...mapActions([
        'login'
      ]),
      onLogin(){
        this.login({username:this.username,password:this.password})
          .then(()=>{
            console.log(`${this.username},${this.password}`)
            this.$router.push({path:this.$route.query.redirect || '/'})
          })
      }
  },
  components: {

  }
}
</script>

<style scoped lang='less'>
@import url('../../assets/base.less');
#login, #register {
  display: grid;
  justify-content: center;
  padding-top: 30px;
  
  h4 {
    margin: 10px 0 5px;
  }

  p {
    margin: 5px 0;
  }

  input {
    width: 400px;
  }

  .error {
    font-size: 12px;
    color: #f00;
  }

  button {
    margin-top: 30px;
    justify-self: start;
  }

  .notice {
    font-size: 12px;
    color: @textLighterColor;
    text-align: center;
    margin-top: 30px;

    a {
      color: @themeColor;
    }
  }
}
</style>
