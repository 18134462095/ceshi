<template>
  <div class="login conwidth">
    <van-cell-group class="inputs">
      <van-field
        class="inputtext"
        v-model="username"
        label="账号"
        placeholder="请输入账号"
      />
      <van-field
        class="inputtext"
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <div class="btn">
      <van-button class="btn_bgk" type="primary" block @click="agentSubmit">代理登录</van-button>
      <van-button class="btn_bgk" type="primary" block @click="businessSubmit">商家登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        username: '',
        password: ''
    }
  },
  methods:{
    regclick () {
      if(this.username === ''){
        this.Toast('账号不能为空');
      }else if(this.password === ''){
        this.Toast('密码不能为空');
      }
    },
    agentSubmit () {
      this.regclick()
      this.$router.push('/manager/home')
    },
    businessSubmit () {}
  }
};
</script>

<style lang="scss" scoped>
.login{
  margin: 0 auto;
  .inputs{
    padding: .2rem;
    border: none;
    .inputtext{
      font-size: .373333rem /* 28/75 */;
    }
  }
  // .btn{
  //   display: flex;
  //   justify-content: space-between;
  //   .btn_bgk{
  //     height: .9rem /* 30/75 */;
  //     background: #cb1212;
  //     border: none;
  //     margin: .8rem .6rem;
  //     line-height: .9rem;
  //     font-size: .373333rem /* 28/75 */;
  //   }
  // }
}
>>> .van-field__label{
  width: .8rem /* 60/75 */;
}
>>> .van-hairline--top-bottom::after{
  border: none;
  margin: 0 .2rem;
}
</style>
