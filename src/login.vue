<template>
  <div class="login">
    <div class="conwidth">
      <!-- <div @click="$router.go(-1)" class="login-close">
        <img src="@/assets/app/loginclose.png" alt />
      </div> -->
      <div class="padd50">
        <p class="loginp">{{text}}</p>
        <form class="forminput">
          <div class="flexinput">
            <input type="text" @input="inputChange" v-model="login.phone" placeholder="输入手机号" />
            <p class="namep" @click="clearInput">
              <img src="@/assets/my/guanbi.png" alt />
            </p>
          </div>
          <div class="flexinput">
            <input type="text" @input="inputChange" v-model="login.smsCode" placeholder="输入验证码" />
            <p class="yanzhengma" v-show="yanzhengma" @click="yanzhengClick">获取验证码</p>
            <p class="yanzhengma cxhq" v-show="!yanzhengma">{{time}}秒后重试</p>
          </div>
        </form>
        <div class="button">
          <van-button v-if="login.smsCode=='' || login.phone==''" class="btn1" block>登录</van-button>
          <van-button v-else class="btn2" block @click="submitLogin">登录</van-button>
        </div>
        <!-- <div class="san" v-if="!isiOS && show3" @click="weixinlogin">
          <p>第三方登录</p>
          <img src="@/assets/my/wei-xin.png" alt />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      text: '登录',
      login: {
        phone: "",
        smsCode: "",
        openId: null,
        unionId: null,
        ip: returnCitySN.cip,
      },
      yanzhengma: true,
      time: 60,
      valiphone: /^1[3456789]\d{9}$/,
      code: /^\d{6}$/,
      isiOS,
      show3: true
    };
  },
  methods: {
    clearInput() {
      this.login.phone = "";
      let flexinput = document.querySelectorAll(".flexinput")[0];
      flexinput.style.borderBottom = "1px solid #e9e9e9";
    },
    yanzhengClick() {
      if (this.valiphone.test(this.login.phone)) {
        this.yanzhengma = false;
        let that = this;
        let interval = window.setInterval(function () {
          if (that.time-- <= 0) {
            that.time = 60;
            that.yanzhengma = true;
            window.clearInterval(interval);
          }
        }, 1000);
        let code = {
          phone: this.login.phone,
          ip: returnCitySN.cip,
        };
        this.$api.app.login
          .getLoginSendCode(this.login.phone, returnCitySN.cip)
          .then((res) => {
            console.log(res);
          });
        // this.Toast('已发送验证码');
      } else {
        this.Toast("请输入正确的手机号");
      }
    },
    submitLogin(a) {
      if (!a) {
        if (!this.valiphone.test(this.login.phone)) {
          this.Toast("请输入正确的手机号");
          return
        } else if (!this.code.test(this.login.smsCode)) {
          this.Toast("请输入正确的验证码");
          return
        }
      }
      this.$api.app.login.getLogOrReg(this.login).then((res) => {
        if (res.code == 200) {
          this.Toast("登录成功");
          this.getInfo().then(res => {
            this.$router.replace('/app/index')
          })
        } else {
          this.Toast(res.msg);
        }
      });
    },
    // weixinlogin(){
    //   this.Toast.loading({
    //     message: "加载中",
    //     duration: 0,
    //   });
    //   plus.oauth.getServices((services) => {
    //     // console.log(services, '登录')
    //     let obj = services.filter(i => i.id == 'weixin')[0] || null
    //     if (obj) {
    //       obj.login(e => {
    //         obj.getUserInfo(a => {
    //           this.loginSucc(a.target)
    //         }, er => {
    //           this.Toast.clear();
    //           this.Toast.fail('获取微信用户信息失败，请重试。')
    //         })
    //       },e => {
    //         this.Toast.clear();
    //         this.Toast.fail("登录认证失败: \n"+e.message);
    //       });
    //     } else {
    //       this.Toast.clear();
    //       this.Toast.fail('当前环境不支持微信登录，请检查是否安装微信。')
    //     }
    //   }, err => {
    //     this.Toast.clear();
    //     this.Toast.fail('获取登录权限失败，请重试。')
    //   })
    // },
    inputChange() {
      let flexinput = document.querySelectorAll(".flexinput");
      this.login.phone !== ""
        ? (flexinput[0].style.borderBottom = "1px solid #505050")
        : (flexinput[0].style.borderBottom = "1px solid #e9e9e9");
      this.login.smsCode !== ""
        ? (flexinput[1].style.borderBottom = "1px solid #505050")
        : (flexinput[1].style.borderBottom = "1px solid #e9e9e9");
    },
    loginSucc (obj) {
      // console.log(obj)
      let data = {
        openId: obj.userInfo.openid,
        unionId: obj.userInfo.unionid
      }
      Object.assign(this.login, data)
      this.$api.app.login.checkWxPhone(data).then(res => {
        if (res.code == 200) {
          let a = res.data
          if (a) {
            this.Toast("登录认证成功!");
            this.submitLogin(a)
          } else {
            this.show3 = false
            this.text = '请绑定手机号。'
            this.Toast.clear();
            this.Toast.fail('您已授权微信，请绑定手机号继续使用。')
          }
        }
      })
    }
  },
  beforeDestroy() {
    this.Toast.clear();
  },
};
</script>
<style lang="scss" scoped>
.login {
  overflow: hidden;
  .login-close {
    width: 0.333333rem;
    height: 0.333333rem;
    margin: 0.493333rem 0 0 0.44rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .padd50 {
    padding: 0 0.666667rem;
  }
  .loginp {
    position: relative;
    font-size: 0.533333rem;
    color: #000;
    font-weight: bold;
    margin: 1.653333rem 0 2.733333rem 0;
    &::after {
      position: absolute;
      bottom: -0.15rem;
      left: 0;
      content: "";
      width: 1.1rem;
      height: 2px;
      background: #fc7265;
    }
  }
  .forminput {
    .flexinput {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      margin-top: 0.666667rem;
      input {
        border: none;
        font-size: 0.48rem;
        width: 100%;
        height: 0.9rem;
        background: none;
      }
      .namep {
        img {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .yanzhengma {
        width: 2.5rem;
        height: 0.7rem;
        border: 1px solid #fc7265;
        border-radius: 0.133333rem;
        color: #fc7265;
        text-align: center;
        line-height: 0.7rem;
      }
      .cxhq {
        width: 3rem;
        border: 1px solid #cac2c2;
        color: #cac2c2;
      }
    }
  }
  .button {
    display: flex;
    margin-top: 2rem;
    >>> .van-button {
      color: #fff;
      font-size: 0.5rem;
      font-weight: 600;
      border-radius: 0.15rem;
    }
    .btn1 {
      background: $btnNotAvtive;
      >>> ::before {
        background-color: $btnNotAvtive;
        border-color: $btnNotAvtive;
      }
    }
    .btn2 {
      background: $btnAvtive;
    }
  }

  .san {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3.146667rem;
    p {
      color: #bfbfbf;
      font-size: 0.426667rem;
    }
    img {
      width: 0.853333rem;
      height: 0.853333rem;
    }
  }
}
// html, body, #app{
//   height: 0!important;
// }
</style>