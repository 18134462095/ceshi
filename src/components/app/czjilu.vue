<template>
  <div class="list">
    <div class="top">
      <div class="top_left">
        <img src="@/assets/my/czjl.png" alt />
        <span>充值记录</span>
      </div>
      <span class="top_right">充值成功</span>
    </div>
    <div class="bottom">
      <h4>{{nametitle}}</h4>
      <span>充值时间：{{data.createTime}}</span>
      <span>充值卡号：{{data.cardNo}}</span>
    </div>
    <div class="txje">
      <span>充值金额</span>
      <i>￥{{data.cardAmount}}</i>
    </div>
  </div>
</template>

<script>
// import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "Czjilu",
  data() {
    return {};
  },
  props: ["title", "icon", "data", "nametitle"],
  methods: {
  //   formatDate(date) {
  //     return formatWithSeperator(date, ".", ":");
  //   },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 9.16rem;
  height: 3.426667rem;
  background: #ffffff;
  border-radius: 0.133333rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    height: 1.2rem;
    width: 8.893333rem;
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