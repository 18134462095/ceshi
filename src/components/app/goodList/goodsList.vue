<template>
  <div class="goodsList">
    <div class="goodsItem" v-for="(i, index) in list" :key="index">
      <div class="ticketBox">
        <img :src="require('@/assets/app/ticket.png')" alt="" class="ticket">
        <p>可抵扣</p>
        <p>¥1000.0</p>
      </div>
      <div class="goodsImg">
        <img src="" alt="">
      </div>
      <div class="goodsMsg">
        <h6>
          <img src="" alt="">
          <span>洗衣机【买二送一】水电费凯撒奖够懒得管水电费科罗娜老妇女额 的房间里开车时间长距</span>
        </h6>
        <div class="goodsMake">
          <p>赚10.0</p>
          <span>123548人已买</span>
        </div>
        <div class="price">
          <span>券后价：¥5000.0</span>
          <del>¥6000.0</del>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 第一版一排两个(go无忧)
  name: 'GoodsList',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.goodsList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #eee;
  padding: 0 .1rem;
  padding-bottom: .1rem;
  .goodsItem {
    width: 49.5%;
    background: #fff;
    margin-top: .1rem;
    border-radius: .26667rem;
    position: relative;
    overflow: hidden;
    .ticketBox {
      position: absolute;
      width: 1.28rem;
      height: .866667rem;
      right: .266667rem;
      top: 0;
      img {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 0;
      }
      p {
        font-size: .2rem;
        text-align: center;
        color: #fff;
        position: relative;
        z-index: 1;
      }
    }
    .goodsImg {
      height: 4rem;
      img {
        width: 100%;
        background: #000;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
    .goodsMsg {
      padding: .133333rem;
      h6 {
        font-size: .25rem;
        white-space: pre;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        img {
          width: .333333rem;
          height: .333333rem;
          background: #000;
          display: inline-block;
        }
      }
    }
    .goodsMake {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: .066667rem 0;
      p {
        color: #c00;
        padding: .02rem .066667rem;
        font-size: .213333rem;
        border-radius: .133333rem;
        border: 1px solid currentColor;
      }
      span {
        color: #999;
      }
    }
    .price {
      span {
        color: #c00;
        font-size: .233333rem;
        margin-right: .266667rem;
      }
      del {
        color: #999;
        font-size: .16rem;
      }
    }
  }
}
</style>