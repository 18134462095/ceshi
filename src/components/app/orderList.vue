<template>
  <div class="orderList conwidth">
    <div class="orderItem" v-for="(i, index) in list" :key="index">
      <div class="orderNum">
        <p>订单编号: {{i.tradeParentId}}</p>
        <span>{{i.orderStatus}}</span>
      </div>
      <div class="orderName">
        <p>{{i.orderType}}</p>
        <span>{{i.itemTitle}}</span>
      </div>
      <b></b>
      <div class="createTime">
        <p>{{i.createTime}} 创建</p>
        <span>付款￥{{i.alipayTotalPrice}}</span>
      </div>
      <div class="endTime">
        <p>{{i.paidTime}} 到账</p>
        <span>预估收入:{{i.expectedMoney}}<van-icon name="arrow" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    list: {
      type: Array,
      default () {
        return [,,,,,,,,,,]
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.orderList {
  padding: 0 20px;
  .orderItem {
    background: #fff;
    border-radius:.133333rem;
    margin-top: .2rem;
    padding: .3rem .4rem;
    div {
      display: flex;
      justify-content: space-between;
    }
    .orderNum {
      p {
        font-size:.293333rem;
        color:rgba(174,174,174,1);
      }
      span {
        font-size:.293333rem;
        color:rgba(255,80,0,1)
      }
    }
    .orderName {
      margin: .4rem 0;
      p {
        background:rgba(255,245,247,1);
        border-radius:10px 0px 10px 0px;
        font-size:.293333rem;
        color:rgba(254,87,71,1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span {
        flex: 1;
        width: 0;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: .333333rem;
        font-size:.373333rem;
        color:rgba(26,5,5,1);
      }
    }
    .createTime {
      margin: .2rem 0;
      p {
        font-size:.293333rem;
        color:rgba(174,174,174,1);
      }
      span {
        font-size:.32rem;
        color:rgba(60,60,60,1);
      }
    }
    .endTime {
      margin: .2rem 0;
      p {
        font-size:.293333rem;
        color:rgba(174,174,174,1);
      }
      span {
        font-size:.346667rem;
        color:rgba(255,80,0,1);
        line-height: 1;
        i {
          vertical-align: bottom;
        }
      }
    }
    b {
      background:rgba(243,243,244,1);
      display: block;
      height: 1px;
      margin: .4rem 0;
    }
  }
}
</style>