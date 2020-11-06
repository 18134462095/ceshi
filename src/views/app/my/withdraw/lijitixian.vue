<template>
  <div class="withdraw">
    <app-title style="color: #1d0707">提现</app-title>
    <p class="txjl" @click="txjl">提现记录</p>
    <div class="bdzfb" v-if="!$store.getters.info.zfbAccount">
      <img class="zfb" src="@/assets/my/zfb.png" alt />
      <div class="tishi">
        <span>您还未绑定支付宝账号</span>
        <p>我们保证不泄露您的支付宝信息</p>
      </div>
      <button class="bangding" @click="zfb_bangding">去绑定</button>
    </div>
    <div class="ketixian">
      <h4>可提现金额(元)</h4>
      <div class="ktx_shuru">
        <div class="left">
          <span>￥</span>
          <span class="lastspan">{{ $route.query.money }}</span>
          <!-- <input @input="inpclick1(money)" v-if="money" type="number" v-model="money" />
          <input @input="inpclick2(nomoney)" v-else type="number" v-model="nomoney" /> -->
        </div>
        <div class="right">
          <!-- <img src="@/assets/my/guanbi.png" alt @click="qingkong" />
          <span @click="quanbu">全部</span> -->
        </div>
      </div>
    </div>
    <button v-if="$route.query.money <= 0" class="tixianhui">提现</button>
    <button v-else class="tixian" @click="tixian">提现</button>
  </div>
</template>

<script>
import CryptoJS from "@/utils/crypto-js"
import { formatWithSeperator } from "@/utils/datetime";
export default {
  data() {
    return {
      money: "",
      nomoney: "0.00",
    };
  },
  created() {
    // this.money = this.$route.query.money;
    console.log(this.$store.getters.info)
    this.getInfo();
  },
  methods: {
    inpclick1(v) {
      console.log(v, "v1");
    },
    inpclick2(v) {
      console.log(v, "v2");
    },
    qingkong() {
      this.money = "";
      this.nomoney = "";
    },
    quanbu() {
      this.money = this.$route.query.money;
    },
    txjl() {
      this.$router.push({ path: "record" });
    },
    zfb_bangding() {
      this.$api.app.my.getZFBAuthUrl().then((res) => {
        if (res.code == 200) {
          plus.runtime.openURL(
            "alipays://platformapi/startapp?appId=20000067&url=" +
              encodeURIComponent(res.msg)
          );
        } else {
          this.Toast.fail("绑定失败");
        }
      });
    },
    formatDate(date) {
      return formatWithSeperator(date, "-", ":");
    },
    EncryptData(data){
      var key  = CryptoJS.enc.Latin1.parse('quanwanggou@2020')
      var srcs = CryptoJS.enc.Utf8.parse(data);
      var encrypted = CryptoJS.AES.encrypt(srcs,key,{
        mode:CryptoJS.mode.ECB,
        padding:CryptoJS.pad.Pkcs7
      })
      return encrypted.toString();
    },
    tixian() {
      // if(this.$store.getters.info.id == 11){

      // }
      let amount = {amount: this.$route.query.money}
      this.$api.app.settle
        .cashOut(amount)
        .then((res) => {
          if(res.code==200){
            let date = this.formatDate(new Date().getTime());
            this.$router.push({
              path: "tixianjieguo",
              query: {
                money: this.$route.query.money,
                date: date,
              },
            });
          }
        });
      // } else {
      //   this.Toast('余额不足')
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.withdraw {
  position: relative;
  width: 100%;
  height: 100vh;
  .txjl {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(140, 140, 140, 1);
    padding: 12px 20px 0 0;
    z-index: 1000;
  }
  .bdzfb {
    width: 100%;
    height: 1.786667rem;
    background-color: #fff;
    display: flex;
    .zfb {
      width: 0.706667rem;
      height: 0.706667rem;
      margin: 0.546667rem 0.493333rem 0.373333rem;
    }
    .tishi {
      margin-top: 0.44rem;
      span {
        font-size: 0.373333rem;
        color: #3b3b3b;
        line-height: 0.36rem;
      }
      p {
        font-size: 0.32rem;
        color: #adadad;
        line-height: 0.32rem;
        margin-top: 0.226667rem;
      }
    }
    .bangding {
      width: 1.6rem;
      height: 0.666667rem;
      background: $lineBg;
      // background: none;
      border: none;
      border-radius: 0.133333rem;
      color: #fff;
      margin-left: 1.986667rem;
      margin-top: 0.56rem;
      font-size: 0.32rem;
    }
  }

  .ketixian {
    width: 100%;
    height: 2.8rem;
    background: #fff;
    margin-top: 0.2rem;
    padding: 0.4rem;
    h4 {
      color: #8b8b8b;
      font-size: 0.32rem;
    }
    .ktx_shuru {
      display: flex;
      justify-content: space-between;
      margin-top: 0.52rem;
      .left {
        line-height: 0.546667rem;
        color: #1b0606;
        span {
          font-size: 0.373333rem;
        }
        .lastspan {
          font-size: 0.666667rem;
          font-weight: bold;
        }
        input {
          border: none;
          background: none;
          outline: none;
          font-size: 0.666667rem;
          width: 7rem;
          font-weight: bold;
        }
      }
      .right {
        line-height: 0.546667rem;
        display: flex;
        img {
          width: 0.226667rem;
          height: 0.226667rem;
          // line-height: .546667rem;
          display: block;
          margin-top: 0.28rem;
          margin-right: 0.133333rem;
        }
        span {
          margin-left: 0.266667rem;
          color: #fd5747;
          font-size: 0.24rem;
          // line-height: .386667rem;
          margin-top: 0.12rem;
        }
      }
    }
  }

  .tixian {
    width: 8.64rem;
    height: 1.2rem;
    margin: 0 auto;
    border: none;
    border-radius: 0.133333rem;
    background: #fd5747;
    color: #fff;
    font-size: 0.48rem;
    position: absolute;
    bottom: 1.333333rem;
    left: 0.68rem;
    right: 0.68rem;
  }
  .tixianhui {
    width: 8.64rem;
    height: 1.2rem;
    margin: 0 auto;
    border: none;
    border-radius: 0.133333rem;
    background: #ccc4c4;
    color: #fff;
    font-size: 0.48rem;
    position: absolute;
    bottom: 1.333333rem;
    left: 0.68rem;
    right: 0.68rem;
  }
}
</style>