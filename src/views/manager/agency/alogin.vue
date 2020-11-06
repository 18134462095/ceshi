<template>
  <div class="alogin conwidth">
    <!-- alogin -->
    <div class="loginimg">
      <img src="@/assets/my/bak.jpg" alt />
      <div class="mask">
        <p class="title">话费购物管理系统</p>
        <van-radio-group v-model="radio" @change="onChange" class="radioc">
          <van-radio class="radio" :name="1">管理员</van-radio>
          <van-radio class="radio" :name="2">代理</van-radio>
          <van-radio class="radio" :name="3">商家</van-radio>
        </van-radio-group>
        <van-cell-group class="inputs">
          <van-field class="inputtext" v-model="ausername" label="用户名" placeholder="请输入用户名" />
          <van-field
            class="inputtext"
            v-model="apassword"
            type="password"
            label="密码"
            placeholder="请输入密码"
          />
          <div class="slotinput">
            <van-field class="inputtext" v-model="yanma" label="验证码" placeholder="请输入验证码" />
            <canvasid :identifyCode="identifyCode" />
          </div>
        </van-cell-group>
        <van-checkbox class="checkbox" :value="checked" @change="onChangecheck">记住密码</van-checkbox>
        <div class="btn">
          <van-button class="btn_bgk" type="primary" block @click="aloginSubmit">代理登录</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 1,
      checked: true,
      ausername: "",
      apassword: "",
      yanma: "",
      identifyCode:'',
      identifyCodes:'1234567890'
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    onChange(e) {
      // console.log(e,'event')
      this.radio = e
    },
    onChangecheck(){},
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    aloginSubmit(){
      // console.log(this.identifyCode,'this.identifyCodes')
      if(this.ausername === ''){
        this.Toast('请输入用户名')
      }else if(this.apassword === ''){
        this.Toast('请输入密码')
      }else if(this.yanma != this.identifyCode){
        this.Toast('验证码错误')
      }else{
        this.$router.push('/manager/agency/ahome')
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.alogin {
  .loginimg {
    position: relative;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mask {
      position: absolute;
      top: 20%;
      width: 100%;
      // height: 9rem /* 400/75 */;
      // border: 1px solid;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 0.266667rem /* 20/75 */;
      .title {
        font-size: 0.64rem /* 48/75 */;
        color: #000;
        font-weight: bold;
        text-align: center;
        line-height: 2rem /* 50/75 */;
      }
      .radioc {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 0.533333rem /* 40/75 */;
        font-size: 0.373333rem /* 28/75 */;
        .radio {
          margin-right: 0.266667rem /* 20/75 */;
        }
      }
      .inputs {
        margin: 0.533333rem 0.533333rem;
        // border-radius: 0.266667rem /* 20/75 */;
        .slotinput{
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      .checkbox{
        padding:0 .533333rem ;
      }
    }
  }
}
>>> .van-field__label {
  width: 1.5rem /* 60/75 */;
}
</style>