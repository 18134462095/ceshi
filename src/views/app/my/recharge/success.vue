<template>
  <div class="success">
    <app-title style="color:#fff;">充值结果</app-title>
    <div class="header">
      <img class="back" src="@/assets/my/header.png" alt />
      <div class="abou">
        <!-- 成功 -->
        <div class="chenggong" v-if="$route.query.issuccfail==1">
          <div class="img">
            <img src="@/assets/my/success.png" alt />
          </div>
          <div class="succ">
            <p>充值成功</p>
            <p>感谢您的购买</p>
          </div>
        </div>
        <!-- 失败 -->
        <div v-else class="chenggong">
          <div class="img">
            <img src="@/assets/my/fail.png" alt />
          </div>
          <div class="succ">
            <p>充值失败</p>
            <p>{{$route.query.msg}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="conwidth padd20" v-if="$route.query.issuccfail==1">
      <div class="succxinxi">
        <div class="title">
          <p>￥{{$route.query.money}}</p>
        </div>
        <div class="succp">
          <p v-if="$route.query.cardNo">
            充值卡号：
            <span>{{$route.query.cardNo}}</span>
          </p>
          <p v-if="$route.query.dingdanNo">
            订单号：
            <span>{{$route.query.dingdanNo}}</span>
          </p>
          <p>
            下单时间：
            <span>{{$route.query.createTime}}</span>
          </p>
          <p>
            充值方式：
            <span style="color:#1E0808;">{{$route.query.type}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="confim">
      <!-- 成功 -->
      <div class="button" v-if="$route.query.issuccfail==1" @click="$router.go(-1)">确定</div>
      <!-- 失败 -->
      <div v-else class="button failbtn" @click="$router.go(-1)">重新充值</div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Success",
  methods: {
    
  },
};
</script>
<style lang="scss" scoped>
.success {
  position: relative;
  height: 100vh;
  .header {
    width: 100%;
    height: 5.946667rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    .back {
      width: 100%;
      height: 100%;
    }
    .abou {
      width: 100%;
      position: absolute;
      top: 2.12rem;
      .chenggong {
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 1.573333rem;
          height: 1.866667rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .succ {
          margin-left: 0.146667rem;
          p:first-child {
            font-size: 0.48rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #ffffff;
          }
          p:last-child {
            padding-top: 0.2rem;
            font-size: 0.32rem;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: #ffffff;
          }
        }
      }
    }
  }
  .conwidth {
    position: relative;
    margin-top: 3.8rem;
    .succxinxi {
      width: 100%;
      // height: 6.053333rem;
      background: #ffffff;
      box-shadow: 0px 0px 54px 0px rgba(140, 21, 36, 0.19);
      border-radius: 0.133333rem;
      .title {
        width: 100%;
        text-align: center;
        border-bottom: 1px dashed #d0cfcf;
        p {
          line-height: 1.946667rem;
          font-size: 0.8rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #1e0808;
        }
      }
      .succp {
        padding: 0.4rem 0 1.44rem 0.533333rem;
        p {
          font-size: 0.373333rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #8c8c8c;
          padding-top: 0.4rem;
        }
      }
    }
  }
  .confim {
    width: 100%;
    margin: 0 auto;
    padding: 0 0.666667rem;
    padding-top: 4rem;
    .button {
      height: 1.2rem;
      background: #fe5848;
      box-shadow: 1px 4px 16px 0px rgba(161, 161, 161, 0.41);
      border-radius: 0.133333rem;
      color: #ffffff;
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.48rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
    }
    .failbtn {
      margin-top: 6.666667rem;
    }
  }
}
</style>