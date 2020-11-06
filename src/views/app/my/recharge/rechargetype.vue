<template>
  <div class="rechargetype">
    <!-- 充值方式 -->
    <app-title>账号充值</app-title>
    <p class="czjl">充值记录</p>
    <div class="conwidth">
      <div class="padd20">
        <p class="title">充值金额</p>
        <div class="boxmoney">
          <div
            @click="active(index,i.money)"
            :class="{active:index==ins}"
            v-for="(i,index) in moneylist"
            :key="index"
          >充{{i.money}}元</div>
        </div>
        <p class="boxtip">优惠活动优惠活动</p>
        <div class="line"></div>
        <p class="title t2">选择支付方式</p>
        <van-radio-group @change="radioChange" v-model="radio" class="radio">
          <van-cell-group>
            <div class="group">
              <img src="@/assets/my/zfb.png" alt />
              <van-cell title="支付宝支付" @click="radio = 1">
                <template #right-icon>
                  <van-radio :name="1" />
                </template>
              </van-cell>
            </div>
            <div class="group">
              <img src="@/assets/my/wxzf.png" alt />
              <van-cell title="微信支付" @click="radio = 2">
                <template #right-icon>
                  <van-radio :name="2" />
                </template>
              </van-cell>
            </div>
          </van-cell-group>
        </van-radio-group>
        <van-button class="czbtn" @click="rechageClick" block>立即充值</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 1,
      ins: 0,
      moneylist:[
        {
          money:100
        },
        {
          money:200
        },
        {
          money:300
        },
        {
          money:400
        },
      ],
      price:100
    };
  },
  methods: {
    radioChange(val) {
      // .log(val,'val')
    },
    active(index,money) {
      this.ins = index;
      this.price = money
    },
    rechageClick(){

    }
  },
};
</script>
<style lang="scss" scoped>
.rechargetype {
  position: relative;
  .czjl {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(140, 140, 140, 1);
    padding: 12px 20px 0 0;
  }
  .padd20 {
    // padding: 0 0.533333rem;
    .title {
      font-size: 0.426667rem;
      font-weight: bold;
      color: rgba(26, 5, 5, 1);
      margin-top: 1.026667rem;
    }
    .boxmoney {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      div {
        width: 48%;
        height: 2rem;
        border: 1px solid #fc2f48;
        border-radius: 0.133333rem;
        font-size: 0.48rem;
        font-weight: bold;
        color: rgba(60, 60, 60, 1);
        text-align: center;
        line-height: 2rem;
        margin-top: 0.533333rem;
      }
      .active {
        box-shadow: 0px 0px 6px 0px rgba(252, 47, 72, 0.3);
        background: linear-gradient(
          150deg,
          rgba(254, 87, 71, 1),
          rgba(251, 33, 72, 1)
        );
        color: #fff;
      }
    }
    .boxtip {
      font-size: 0.35rem;
      font-weight: 400;
      color: rgba(254, 87, 71, 1);
      margin-top: 0.4rem;
    }
    .line {
      height: 1px;
      background: rgba(233, 233, 233, 1);
      margin: 0.2rem;
    }
    .t2 {
      margin-top: 0.586667rem;
    }
    .radio {
      margin-top: 0.4rem;

      >>> .van-cell-group {
        background: none;
      }
      .group {
        display: flex;
        align-items: center;
        >>> .van-cell {
          background: none;
        }
        img {
          width: 0.706667rem;
          height: 0.706667rem;
        }
        >>> .van-radio__icon--checked .van-icon {
          color: #fd5f50;
          border-color: #fd5f50;
          background: none;
        }
      }
    }
    .czbtn {
      height: 1.2rem;
      background: rgba(254, 87, 71, 1);
      box-shadow: 0px 4px 16px 0px rgba(161, 161, 161, 0.41);
      border-radius: 0.133333rem;
      color: #fff;
      font-size: 0.533333rem;
      font-weight: bold;
      margin-top: 1.733333rem;
    }
  }
}
</style>