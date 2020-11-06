<template>
  <div class="conwidth">
    <div class="padd20">
      <div class="list">
        <div class="top">
          <div class="top_left">
            <img src="@/assets/my/txjl.png" alt />
            <span>{{data.orderName}}</span>
          </div>
          <span class="top_right" v-if="data.status == '成功'">{{data.status.title}}</span>
          <span class="top_right" v-else style="color: #1A0505">{{data.status.title}}</span>
        </div>
        <div class="bottom">
          <h4>支付宝账户：{{data.zfbAccount}}</h4>
          <span>提现时间：{{formatDate(data.cashTime)}}</span>
          <span>订 单 号：{{data.cashOutTradeNo}}</span>
        </div>
        <div class="txje">
          <span>提现金额</span>
          <i>￥{{data.outAmmount}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "Txjilu",
  data() {
    return {};
  },
  props: ["data"],
  methods:{
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
  }
};
</script>

<style lang="scss" scoped>
.list {
  // width: 9.16rem;
  height: 3.426667rem;
  background: #ffffff;
  border-radius: 0.133333rem;
  padding: 0 .133333rem;
  margin-top: 0.2rem;
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    height: 1.2rem;
    // width: 8.893333rem;
    border-bottom: 0.013333rem solid #f3f3f3;
    .top_left {
      margin-left: 0.173333rem;
      display: flex;
      img {
        width: 0.333333rem;
        height: 0.36rem;
        display: block;
        margin-top: 0.4rem;
        margin-right: 0.12rem;
      }
      span {
        display: block;
        line-height: 1.2rem;
        font-size: 0.32rem;
        font-weight: 400;
        background: $activeIcon;
        color: transparent;
        -webkit-background-clip: text;
      }
    }
    .top_right {
      color: #ff4f00;
      font-size: 0.293333rem;
      line-height: 1.2rem;
    }
  }

  .bottom {
    width: 8.893333rem;
    height: auto;
    margin: 0 auto;
    margin-top: 0.266667rem;

    h4 {
      color: #190404;
      font-size: 0.373333rem;
      line-height: 0.36rem;
    }

    span {
      font-size: 0.293333rem;
      color: #adadad;
      display: block;
      line-height: 0.28rem;
      margin-top: 0.253333rem;
    }
  }

  .txje {
    position: absolute;
    bottom: 0.48rem;
    right: 0.12rem;
    color: #3b3b3b;
    font-weight: 400;
    span {
      font-size: 0.32rem;
    }
    i {
      font-size: 0.373333rem;
      font-style: normal;
    }
  }
}
</style>