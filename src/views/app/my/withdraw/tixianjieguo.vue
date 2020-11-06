<template>
  <div class="txjg">
    <div class="appTitle">
      <div class="placeholder" />
      <div class="titleName">
        <van-icon class="backIcon" @click="$router.go(-3)" name="arrow-left" />
        <p>账户提现</p>
      </div>
    </div>
    <div class="txcontent">
      <div class="img">
        <img src="@/assets/my/tijiao.png" alt="" />
        <p>申请已提交</p>
      </div>
      <div class="content">
        <div class="cp">
          <p>提现方式 : 支付宝</p>
          <p>提现时间 : {{ $route.query.date }}</p>
          <p>
            提现金额 : <span style="color: #000">{{ $route.query.money }}</span>
          </p>
          <p>预计到账时间1分钟</p>
        </div>
      </div>
      <div class="qdbtn" @click="$router.go(-3)">
        <p>确定</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
    };
  },
  created(){
    
  },
  methods: {
    
  },
};
</script>
<style lang="scss" scoped>
.txjg {
  height: 100vh;
  .appTitle {
    height: 40px;
    position: relative;
    z-index: 999;
    .placeholder {
      height: 100%;
    }
    .titleName {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      text-align: center;
      transition: background 0.3s;
      background: none;
      .backIcon {
        line-height: 40px;
        padding: 0 20px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .txcontent {
    width: 100%;
    .img {
      text-align: center;
      margin-top: 1.866667rem;
      img {
        width: 1.333333rem;
        height: 1.6rem;
      }
      p {
        margin-top: 0.266667rem;
        font-size: 0.426667rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #8c8c8c;
      }
    }
    .content {
      margin-top: 0.666667rem;
      padding: 0.533333rem;
      .cp {
        background: #ffffff;
        box-shadow: 0px 0px 54px 0px rgba(140, 21, 35, 0.19);
        border-radius: 10px;
        padding: 0.506667rem;
        line-height: 0.8rem;
        p {
          font-size: 0.373333rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #8c8c8c;
        }
      }
    }
    .qdbtn {
      margin: 0 auto;
      width: 8.64rem;
      height: 1.2rem;
      background: #fe5747;
      box-shadow: 0px 4px 16px 0px rgba(161, 161, 161, 0.41);
      border-radius: 0.133333rem;
      text-align: center;
      color: #ffffff;
      line-height: 1.2rem;
      font-size: 0.48rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      margin-top: 4.5rem;
    }
  }
}
</style>