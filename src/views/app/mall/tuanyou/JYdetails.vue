<template>
  <div class="details">
    <app-title>加油详情</app-title>
    <div class="content">
      <h3>
        <van-icon name="checked" color="#fb2148" />{{ list.orderStatusName }}
      </h3>
      <div class="con">
        <h4>支付明细</h4>
        <p>
          <span>交易单号</span>
          <span>{{ list.orderId }}</span>
        </p>
        <p>
          <span>加油站名称</span>
          <span>{{ list.gasName }}</span>
        </p>
        <p>
          <span>地址</span>
          <span>{{list.address}}</span>
        </p>
        <p>
          <span>油号</span>
          <span>{{ list.oilNo }}</span>
        </p>
        <p>
          <span>枪号</span>
          <span>{{ list.gunNo }}号</span>
        </p>
        <p>
          <span>油枪金额</span>
          <span>￥{{ list.amountGun }}</span>
        </p>
        <p>
          <span>加油升数</span>
          <span>{{ list.litre }}</span>
        </p>
        <p>
          <!-- <span>团油优惠</span>
          <span>￥{{ list.amountDiscounts }}</span> -->
          <van-collapse v-model="activeNames">
            <van-collapse-item
              title="团油优惠"
              name="2"
              :value="'￥' + (list.amountDiscounts - list.amountServiceCharge)"
            >
              <van-cell-group>
                <van-cell title="优惠" :value="'￥' + list.amountDiscounts" />
                <van-cell
                  title="服务费"
                  :value="'-￥' + list.amountServiceCharge"
                />
              </van-cell-group>
            </van-collapse-item>
          </van-collapse>
        </p>
        <p>
          <span>优惠券</span>
          <!-- <span v-if="!list.couponCode">未使用</span> -->
          <span>{{ list.couponMoney }}</span>
        </p>
        <p class="zhifu">
          <span>加油支付</span>
          <span class="qian">￥{{ list.amountPay }}</span>
        </p>
        <p>
          <span>下单时间</span>
          <span>{{ list.payTime }}</span>
        </p>
        <p>
          <span>{{ list.payType }}</span>
          <span>￥{{ list.amountPay }}</span>
        </p>
        <p class="tishi">
          <span>本服务由团油提供,如有问题清咨询客服:400-0835-999</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      activeNames: ["1"],
    };
  },
  created(){
    this.list = this.$route.query.data
  }
};
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  height: 100vh;
  .content {
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    h3 {
      font-size: 0.506667rem;
      line-height: 0.506667rem;
      margin-top: 0.533333rem;
      margin-left: 20px;
    }
    .con {
      width: 9.173333rem;
      margin: 0 auto;
      // height: 12.666667rem;
      background: #fff;
      border-radius: 0.266667rem;
      box-shadow: 0 0 0.066667rem 0.066667rem rgba(170, 170, 170, 0.2);
      padding: 0 0.266667rem;
      overflow: hidden;
      margin-top: 0.4rem;
      h4 {
        font-size: 0.48rem;
        color: #333;
        margin: 0.266667rem 0;
      }
      .zhifu {
        font-size: 0.64rem;
        height: 1.2rem;
        border-bottom: 1px solid #666;
        border-top: 1px solid #666;
        line-height: 1.2rem;
        .qian {
          color: $activeNav;
        }
      }
      .tishi {
        font-size: 0.266667rem;
        margin-top: .266667rem;
        span {
          text-align: center;
          display: block;
          width: 100%;
        }
      }
      p {
        display: flex;
        justify-content: space-between;
        color: #333;
        font-size: 0.453333rem;
        margin: 0.266667rem 0;
        width: 100%;
        >>> .van-collapse {
          width: 100%;
          .van-cell {
            padding: 0;
            color: #333;
            font-size: 0.453333rem;
            // margin: 0.266667rem 0;
            .van-cell__value {
              color: #ef5747;
            }
          }
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>