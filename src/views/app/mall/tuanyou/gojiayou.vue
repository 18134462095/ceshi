<template>
  <div class="gojiayou">
    <app-title>油站详情</app-title>
    <div class="conwidth">
      <div class="xinxi">
        <van-cell title="加油订单" icon="cash-back-record"></van-cell>
        <van-cell title="油站名称" :value="jylist.gasName"></van-cell>
        <van-cell title="油号/枪号" :value="jylist.oilName+' '+jylist.gunNo.gunNo+'号'"></van-cell>
        <div class="jymoney">
          <p class="title">加油金额</p>
          <div class="money">
            <p class="m1">￥</p>
            <input
              class="m2"
              v-model="jiagemoney"
              type="text"
              placeholder="请输入消费金额"
            />
            <p class="m3">约36.70L</p>
          </div>
          <div class="jiage">
            <div
              v-for="(i, index) in moneyList"
              :key="i.money"
              @click="jiageact(index, i)"
              :class="{ moneyactive: index == moneycuract }"
            >
              <p>￥{{ i.money }}</p>
              <p>可优惠￥{{ i.youhui }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="jyyouhui">
        <van-cell title="加油优惠" icon="coupon-o"></van-cell>

        <van-cell class="firstcell" :value="'-￥' + youhuilist.yhj">
          <template #title>
            <span class="custom-title">优惠直降</span>
            <van-icon @click="yhzjshow = true" name="question-o" />
          </template>
        </van-cell>
        <!-- <van-cell
          @click="youhuiquanshow = true"
          class="lastcell"
          title="优惠券"
          is-link
          value="本单暂无可用优惠券"
        /> -->
      </div>
      <div class="yhgz">
        <img src="@/assets/app/guize.png" alt="" />
        <p>优惠规则</p>
      </div>
      <div class="zhifu">
        <div class="zfflex">
          <div class="yhjg">
            <p>
              <span>已优惠￥</span><span>{{ youhuilist.yhj }}</span>
            </p>
          </div>
          <div class="mxzf">
            <div class="mingxi">
              <p>明细</p>
              <van-icon
                v-if="!mingxishow"
                @click="mingxishow = true"
                name="arrow-up"
              />
              <van-icon v-else @click="mingxishow = false" name="arrow-down" />
            </div>
            <div class="zf" @click="gozhifushow = true">
              <p>￥{{ youhuilist.zhj }}</p>
              <p>去支付</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 明细弹出 -->
    <van-popup class="mingxipopup" position="bottom" v-model="mingxishow">
      <van-cell-group class="mingxicell">
        <van-cell title="总金额" :value="'￥' + jiagemoney" />
        <!-- <van-cell class="cellred" title="直降优惠" value="-￥0.00" /> -->
        <van-collapse v-model="activeNames">
          <van-collapse-item
            class="cellred"
            title="直降优惠"
            :value="'-￥' + youhuilist.yhj"
            name="2"
          >
            <van-cell-group class="qianhui">
              <!-- todo -->
              <van-cell title="优惠" value="￥14.68" />
              <van-cell title="服务费" value="-￥1.47" />
            </van-cell-group>
          </van-collapse-item>
        </van-collapse>
        <van-cell title="优惠券" value="￥0.00" />
      </van-cell-group>
    </van-popup>
    <!-- 优惠直降弹出 -->
    <van-popup class="yhzjpopup" position="bottom" v-model="yhzjshow">
      <p class="hjmoney">￥{{ youhuilist.yhj }}</p>
      <p class="heji">合计优惠</p>
      <van-cell-group class="mingxicell">
        <!-- todo -->
        <van-cell title="优惠" value="￥14.68" />
        <van-cell title="服务费" value="-￥1.47" />
      </van-cell-group>
      <p class="tips">服务费：服务费根据享受直降折扣情况每笔订单收取0-5元</p>
    </van-popup>
    <!-- 去支付弹出 -->
    <van-popup class="zfpopup" v-model="gozhifushow" round position="bottom">
      <div class="wxzfb">
        <div class="wx">
          <img src="@/assets/app/wxzf.png" alt="" />
          <p>微信支付</p>
        </div>
        <div class="wx">
          <img src="@/assets/app/zfbzf.png" alt="" />
          <p>支付宝支付</p>
        </div>
      </div>
    </van-popup>
    <!-- 优惠券弹出 -->
    <van-popup
      class="couponpopup"
      v-model="youhuiquanshow"
      round
      position="bottom"
    >
      <!-- <van-coupon-list
        :show-exchange-bar="false"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      /> -->
      <div class="heightcalc">
        <van-tabs v-model="activeyouhui" :sticky="false">
          <van-tab title="可用优惠券">
            <van-radio-group v-model="radio" class="radiogroup">
              <!-- <p class="title">本单可用优惠券</p> -->
              <van-cell-group>
                <van-cell
                  class="radiolist"
                  clickable
                  @click="radio = index"
                  v-for="(i, index) in 5"
                  :key="index"
                >
                  <div class="couponlist">
                    <div class="coupon">
                      <p class="p1">25元认证加油券</p>
                      <p class="p2">适用于团油部分合作加油站</p>
                      <p class="p3">2020-09-25 09:25-2020-10-09 09:25</p>
                    </div>
                    <div class="manmoney">
                      <p>
                        ￥
                        <span style="font-size: 25px">25.09</span>
                      </p>
                      <p>满300元可以使用</p>
                    </div>
                  </div>
                  <template #right-icon>
                    <van-radio :name="index" />
                  </template>
                  <p class="bky">不可与直降优惠同享</p>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-tab>
          <van-tab title="不可用优惠券">
            <div class="bkycoupon">
              <!-- <p class="title">不可用优惠券</p> -->
              <div class="bkylist" v-for="i in 3" :key="i">
                <div class="couponlist">
                  <div class="coupon">
                    <p class="p1">25元认证加油券</p>
                    <p class="p2">适用于团油部分合作加油站</p>
                    <p class="p3">2020-09-25 09:25-2020-10-09 09:25</p>
                  </div>
                  <div class="manmoney">
                    <p>
                      ￥
                      <span style="font-size: 25px">25.09</span>
                    </p>
                    <p>满300元可以使用</p>
                  </div>
                </div>
                <p class="bky">订单金额不满300元</p>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </div>
</template>
<script>
// const coupon = {
//   available: 1,
//   condition: "满300元可以使用",
//   reason: "订单金额不满300元",
//   value: 150,
//   name: "25元认证加油券",
//   startAt: 1489104000,
//   endAt: 1514592000,
//   valueDesc: "25.9",
//   unitDesc: "元",
//   description: "不可与直降优惠同享",
// };
export default {
  name: "gojiayou",
  data() {
    return {
      youhuiquanshow: false,
      gozhifushow: false,
      mingxishow: false,
      yhzjshow: false,
      moneycuract: null,
      jiagemoney: "",
      activeNames: ["1"],
      youhuilist: {
        yhj: null,
        zhj: null,
      },
      moneyList: [
        {
          money: 200,
          youhui: 13.21,
        },
        {
          money: 300,
          youhui: 14.21,
        },
        {
          money: 400,
          youhui: 15.21,
        },
      ],
      // chosenCoupon: -1,
      // coupons: [coupon],
      // disabledCoupons: [coupon],
      radio: "1",
      activeyouhui: 1,
      jylist:{}
    };
  },
  created() {
    // console.log(this.$route.query)
    this.jylist = this.$route.query
    // this.jiagemoney = this.moneyList[0].money;
    this.youhuilist.yhj = this.moneyList[0].youhui;
    this.youhuilist.zhj = this.moneyList[0].money - this.moneyList[0].youhui;
  },
  methods: {
    jiageact(index, item) {
      this.moneycuract = index;
      this.jiagemoney = item.money;
      this.youhuilist.yhj = item.youhui;
      this.youhuilist.zhj = item.money - item.youhui;
    },
    // onChange(index) {
    //   this.youhuiquanshow = false;
    //   this.chosenCoupon = index;
    // },
    // onExchange(code) {
    //   this.coupons.push(coupon);
    // },
  },
};
</script>
<style lang="scss" scoped>
.gojiayou {
  .xinxi {
    width: 100%;
    background: #ffffff;
    padding-bottom: 0.533333rem;
    >>> .van-cell {
      color: #000;
      font-size: 0.373333rem;
      padding: 0.266667rem 0.533333rem;
      .van-cell__value {
        color: #000;
      }
    }
    .jymoney {
      padding: 0 0.533333rem;
      .title {
        font-size: 0.373333rem;
        color: #000;
        padding: 0.266667rem 0;
      }
      .money {
        width: 100%;
        height: 1.066667rem;
        border: 1px solid #d4d4d4;
        border-radius: 0.266667rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // margin: .266667rem 0;
        .m1 {
          font-size: 0.533333rem;
          color: #000;
          // padding: 0 .266667rem;
          padding-left: 0.266667rem;
          font-weight: 400;
        }
        .m2 {
          width: 60%;
          height: 100%;
          border: none;
          font-size: 0.48rem;
        }
        .m3 {
          // width: 30%;
          color: #8c8c8c;
          font-size: 0.373333rem;
          padding: 0 0.266667rem;
          border-left: 1px solid #8c8c8c;
        }
      }
      .jiage {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.266667rem;
        div {
          border: 1px solid #8c8c8c;
          border-radius: 0.133333rem;
          text-align: center;
          line-height: 0.533333rem;
          padding: 0.15rem;
          p:first-child {
            font-size: 0.48rem;
            color: #000;
            font-weight: 400;
          }
          p:last-child {
            font-size: 0.373333rem;
            color: #636262;
          }
        }
        .moneyactive {
          border: 1px solid #ef5747;
          p {
            color: #ef5747 !important;
          }
        }
      }
    }
  }
  .jyyouhui {
    background: #ffffff;
    width: 100%;
    margin-top: 0.4rem;
    >>> .van-cell {
      color: #000;
      font-size: 0.373333rem;
      padding: 0.266667rem 0.533333rem;
    }
    .firstcell {
      .van-cell__value {
        color: #ef5747;
      }
    }
    .lastcell {
      .van-cell__value {
        color: #000;
      }
    }
  }
  .yhgz {
    width: 100%;
    padding: 0.3rem 0.533333rem;
    display: flex;
    align-items: center;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
    p {
      font-size: 0.373333rem;
      color: #272626;
      margin-left: 0.133333rem;
    }
  }
  .zhifu {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rem;
    background: #ffffff;
    z-index: 9999;
    .zfflex {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .yhjg {
        margin-left: 0.533333rem;
        p {
          color: #ef5747;
          span:first-child {
            font-size: 0.32rem;
          }
          span:last-child {
            font-size: 0.666667rem;
            font-weight: 600;
          }
        }
      }
      .mxzf {
        display: flex;
        align-items: center;
        .mingxi {
          display: flex;
          align-items: center;
          margin-right: 0.666667rem;
          >>> .van-icon {
            font-size: 0.4rem;
            padding: 0 0.1rem;
          }
          p {
            font-size: 0.373333rem;
            color: #000;
          }
        }
        .zf {
          padding-top: 0.28rem;
          width: 3.2rem;
          height: 2rem;
          text-align: center;
          line-height: 0.68rem;
          color: #ffffff;
          background: #ef5747;
          font-size: 0.533333rem;
        }
      }
    }
  }
  .mingxipopup {
    z-index: 0;
    .mingxicell {
      padding-bottom: 2rem;
      .qianhui {
        >>> .van-cell {
          color: #8c8c8c;
          font-size: 0.373333rem;
          .van-cell__value {
            color: #8c8c8c;
          }
        }
      }
    }
    >>> .van-cell {
      color: #000;
      font-size: 0.373333rem;
      padding: 0.266667rem 0.533333rem;
      .van-cell__value {
        color: #000;
      }
    }
    .cellred {
      >>> .van-cell__value {
        color: #ef5747;
      }
    }
  }
  .yhzjpopup {
    position: relative;
    padding: 0.533333rem;
    z-index: 99999 !important;
    >>> .van-cell {
      color: #000;
      font-size: 0.373333rem;
      padding: 0.266667rem 0.533333rem;
      .van-cell__value {
        color: #ef5747;
      }
    }
    .hjmoney {
      font-size: 0.666667rem;
      color: #ef5747;
      text-align: center;
    }
    .heji {
      font-size: 0.373333rem;
      color: #8c8c8c;
      text-align: center;
    }
    .tips {
      // margin-top: .266667rem;
      font-size: 0.373333rem;
      color: #8c8c8c;
      background: #ececec;
      padding: 0.2rem;
      line-height: 0.613333rem;
      border-radius: 0.133333rem;
    }
  }
  .zfpopup {
    // position: relative;
    z-index: 99999 !important;
    .wxzfb {
      padding: 0.533333rem;
      .wx {
        display: flex;
        align-items: center;
        padding: 0.3rem 0;
        border-bottom: 1px solid #cfcdcd;
        img {
          width: 0.533333rem;
          height: 0.533333rem;
        }
        p {
          font-size: 0.373333rem;
          color: #000;
          margin-left: 0.133333rem;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
  .couponpopup {
    z-index: 99999 !important;
    background: #f3f2f2;
    height: 80vh;
    .heightcalc {
      // height: 100%;
      >>> .van-tabs {
        height: 80vh;
        // overflow-y: scroll;
        .van-tabs__content {
          position: relative;
          height: calc(100% - 50px);
          overflow-y: scroll;
        }
      }
    }
    .radiogroup {
      padding: 0.266667rem;
      >>> .van-cell-group {
        background: none;
      }
      .title {
        font-size: 0.533333rem;
        color: #000;
        padding: 0.266667rem 0.533333rem;
      }
      .radiolist {
        margin: 0.266667rem 0;
        padding: 0.266667rem;
        border-radius: 0.266667rem;
        .couponlist {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 0.2rem;
          padding-bottom: 0.266667rem;
          border-bottom: 1px dashed #e2e1e1;
          .coupon {
            .p1 {
              font-size: 0.48rem;
              color: #000;
              font-weight: 400;
            }
            .p2,
            .p3 {
              font-size: 0.32rem;
              color: #8c8c8c;
              margin-top: 0.05rem;
            }
          }
          .manmoney {
            p:first-child {
              color: #ef5747;
            }
            p:last-child {
              font-size: 0.32rem;
              color: #8c8c8c;
            }
          }
        }
        .bky {
          margin-top: 0.266667rem;
          font-size: 0.373333rem;
          color: #ef5747;
        }
        &::after {
          display: none;
        }
      }
    }
    .bkycoupon {
      .title {
        font-size: 0.533333rem;
        color: #000;
        padding: 0.266667rem 0.533333rem;
      }
      .bkylist {
        background: #ffffff;
        border-radius: 0.266667rem;
        padding: 0.266667rem;
        width: 95%;
        margin: 0.266667rem auto;
        .couponlist {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 0.2rem;
          padding-bottom: 0.266667rem;
          border-bottom: 1px dashed #e2e1e1;
          .coupon {
            .p1 {
              font-size: 0.48rem;
              color: #000;
              font-weight: 400;
            }
            .p2,
            .p3 {
              font-size: 0.32rem;
              color: #8c8c8c;
              margin-top: 0.2rem;
            }
          }
          .manmoney {
            p:first-child {
              color: #8c8c8c;
            }
            p:last-child {
              font-size: 0.32rem;
              color: #8c8c8c;
            }
          }
        }
        .bky {
          margin-top: 0.266667rem;
          font-size: 0.373333rem;
          color: #8c8c8c;
        }
      }
    }
  }
}
</style>