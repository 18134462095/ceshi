<template>
  <div class="recharge">
    <!-- 充值 -->
    <app-title>充值</app-title>
    <p
      class="czjl"
      @click="$router.push({ path: 'czjl', query: { act: activetitle } })"
    >
      充值记录
    </p>
    <van-tabs v-model="activetitle" :line-width="linewidth" @change="qiehuan">
      <van-tab title="充值卡充值">
        <div class="recharge-input conwidth">
          <!-- <div class="chongzhi">
            <input @input="focusChange()" type="text" v-model="recharge.zhanghao" placeholder="输入账号" />
            <img @click="closeClick" src="@/assets/my/guanbi.png" alt />
          </div>-->
          <div class="chongzhi">
            <input
              @focus="focusChange(1)"
              @blur="blurChange(1)"
              type="text"
              v-model="recharge.cardNo"
              placeholder="输入充值卡卡号"
            />
            <img
              v-show="closeshow"
              @click="closeClick(1)"
              src="@/assets/my/guanbi.png"
              alt
            />
          </div>
          <div class="chongzhi">
            <input
              @focus="focusChange(2)"
              @blur="blurChange(2)"
              type="password"
              v-model="recharge.password"
              placeholder="输入充值卡的密码"
            />
            <img
              v-show="closeshow2"
              @click="closeClick(2)"
              src="@/assets/my/guanbi.png"
              alt
            />
          </div>
          <div class="button">
            <van-button
              v-if="recharge.cardNo == '' || recharge.password == ''"
              class="btn1"
              disabled
              block
              >去充值</van-button
            >
            <van-button v-else class="btn2" @click="chongzhiSubmit" block
              >去充值</van-button
            >
            <!-- <van-button class="btn2" @click="scan" block>扫码充值</van-button> -->
          </div>
        </div>
      </van-tab>
      <van-tab title="直接充值">
        <div class="conwidth">
          <div class="padd20">
            <p class="title">充值金额</p>
            <div class="boxmoney">
              <div
                @click="active(index, i)"
                :class="{ active: index == ins }"
                v-for="(i, index) in moneylist"
                :key="index"
              >
                <p>
                  <span class="chong" :style="cssline"
                    >充{{ i.originalPrice }}元</span
                  >
                  <span class="shou" v-if="i.originalPrice != i.presentPrice"
                    >售{{ i.presentPrice }}元</span
                  >
                </p>
                <!-- <p v-else>
                  <span :style="cssline">充{{i.originalPrice}}元</span>
                  <span>售{{i.presentPrice}}元</span>
                </p> -->
                <p>
                  {{ i.amount }}元代金券
                  <span v-if="i.sendAmount > 0">+{{ i.sendAmount }}</span>
                </p>
              </div>
            </div>
            <p class="boxtip">优惠活动优惠活动</p>
            <div class="line"></div>
            <p class="title t2">选择支付方式</p>
            <van-radio-group
              @change="radioChange"
              v-model="radio"
              class="radio"
            >
              <van-cell-group>
                <div class="group">
                  <img src="@/assets/my/zfb.png" alt />
                  <van-cell title="支付宝支付" @click="radio = 0">
                    <template #right-icon>
                      <van-radio :name="0" />
                    </template>
                  </van-cell>
                </div>
                <!-- <div class="group">
                  <img src="@/assets/my/wxzf.png" alt />
                  <van-cell title="微信支付" @click="radio = 1">
                    <template #right-icon>
                      <van-radio :name="1" />
                    </template>
                  </van-cell>
                </div> -->
              </van-cell-group>
            </van-radio-group>
            <van-button class="czbtn" @click="rechageClick" block
              >立即充值</van-button
            >
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- <van-dialog v-model="rechargeShow" title="请确认卡号和密码" @confirm="goChongzhi" show-cancel-button>
      <div class="dialogp">
        <p>卡号：{{recharge.cardNo}}</p>
        <p>密码：{{recharge.password}}</p>
      </div>
    </van-dialog>-->
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "Recharge",
  data() {
    return {
      rechargeShow: false,
      closeshow: false,
      closeshow2: false,
      activetitle: 0,
      recharge: {
        cardNo: "",
        password: "",
      },
      //直接充值
      radio: 0,
      ins: 0,
      moneylist: [],
      price: 0,
      getAmmount: 0,
      linewidth: 95,
      priceshow: true,
      cssline: {
        // textDecoration: "line-through",
        fontSize: "16px",
        display: "inline",
      },
      czlx: "",
    };
  },
  created() {
    this.$api.app.my.getRules().then((res) => {
      this.moneylist = res.data;
      this.price = this.moneylist[0].presentPrice;
      this.getAmmount = this.moneylist[0].amount + this.moneylist[0].sendAmount;
    });
  },
  methods: {
    qiehuan(e) {
      let bakinput = document.querySelectorAll(".van-tabs__nav span");
      this.linewidth = bakinput[e].offsetWidth + 10;
    },
    closeClick(num) {
      let bakinput = document.querySelectorAll(".chongzhi>input");
      if (num === 1) {
        this.recharge.cardNo = "";
        bakinput[0].style.background = "#E9E9E9";
        this.closeshow = false;
      } else if (num === 2) {
        this.recharge.password = "";
        bakinput[1].style.background = "#E9E9E9";
        this.closeshow2 = false;
      }
      // this.focusChange();
    },

    //获取焦点
    focusChange(i) {
      this.closeshow = true;
      let bakinput = document.querySelectorAll(".chongzhi>input");

      if (i == 1) {
        this.closeshow2 = false;
        bakinput[0].style.background = "#fff";
        this.closeshow = true;
      }
      if (i == 2) {
        this.closeshow = false;
        bakinput[1].style.background = "#fff";
        this.closeshow2 = true;
      }
    },
    //失去焦点
    blurChange(i) {
      let bakinput = document.querySelectorAll(".chongzhi>input");
      if (this.recharge.cardNo == "") {
        bakinput[0].style.background = "#E9E9E9";
        this.closeshow = false;
      } else {
        bakinput[0].style.background = "#fff";
        this.closeshow = true;
      }
      if (this.recharge.password == "") {
        bakinput[1].style.background = "#E9E9E9";
        this.closeshow2 = false;
      } else {
        bakinput[1].style.background = "#fff";
        this.closeshow2 = true;
      }
    },
    // chongzhiSubmit() {
    //   this.rechargeShow = true;
    // },
    chongzhiSubmit() {
      this.$api.app.my
        .getuseCard(this.recharge.cardNo, this.recharge.password)
        .then((res) => {
          if (res.code == 200) {
            // this.Toast("充值成功");
            this.getInfo();

            this.$router.push({
              path: "success",
              query: {
                issuccfail: 1,
                cardNo: res.data.cardNo,
                createTime: this.formatDate(new Date()),
                type: "充值卡充值",
                money: res.data.amount,
              },
            });
            this.recharge = {
              cardNo: "",
              password: "",
            };
          } else {
            this.$router.push({
              path: "success",
              query: { issuccfail: 2, msg: res.msg },
            });
            this.recharge = {
              cardNo: "",
              password: "",
            };
          }
        });
    },
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
    radioChange(val) {},
    scan() {
      this.Scan().then((result) => {
        // alert(result);
      });
    },
    getstring(data, str) {
      let num = data.indexOf(str);
      let slicestr = data.slice(num + str.length + 2);
      let result = slicestr.split(',"')[0];
      if (result[0] == '"') {
        result = result.slice(1, -1);
      }
      return result;
    },
    active(index, item) {
      this.ins = index;
      this.price = item.presentPrice;
      this.getAmmount = item.amount + item.sendAmount;
    },
    rechageClick() {
      let rtype;
      if (this.radio == 0) {
        rtype = "ZFB";
        this.czlx = "支付宝充值";
      } else if (this.radio == 1) {
        rtype = "WX_app";
        this.czlx = "微信充值";
      }
      this.$api.app.my
        .getUnifiedorder({
          ip: returnCitySN.cip,
          getAmmount: this.getAmmount,
          orderName: "充" + this.price + "元 送" + this.getAmmount + "元代金券",
          payType: rtype,
          payMoney: this.price,
        })
        .then((res) => {
          // console.log(res, "res");
          let statement;
          statement = JSON.parse(res.msg).aliPayBody;
          // console.log(statement);
          plus.payment.getChannels(
            (success) => {
              // console.log(success, "success", this.radio);
              let channel;
              success.forEach((i) => {
                if (rtype == "ZFB") {
                  if (i.id == "alipay") {
                    channel = i;
                  }
                } else {
                  if (i.id == "wxpay") {
                    channel = i;
                  }
                }
              });
              plus.payment.request(
                channel,
                statement,
                (ress) => {
                  // console.log(ress,"充值成功");
                  // ress.resultStatus.result.alipay_trade_app_pay_response.total_amount  价格
                  // ress.resultStatus.result.alipay_trade_app_pay_response.timestamp  时间
                  // ress.resultStatus.result.alipay_trade_app_pay_response.out_trade_no 订单号
                  let data = JSON.parse(ress.resultStatus);
                  let out_trade_no = this.getstring(data, "out_trade_no");
                  let total_amount = this.getstring(data, "total_amount");
                  let timestamp = this.getstring(data, "timestamp");
                  // this.Toast('充值成功')
                  // console.log(out_trade_no,total_amount,timestamp)
                  this.getInfo();
                  this.$router.push({
                    path: "success",
                    query: {
                      issuccfail: 1,
                      dingdanNo: out_trade_no,
                      createTime: timestamp,
                      type: this.czlx,
                      money: total_amount,
                    },
                  });
                },
                (errr) => {
                  // console.log(errr, "err");
                  // this.Toast("充值失败");
                  this.$router.push({
                    path: "success",
                    query: {
                      issuccfail: 2,
                    },
                  });
                }
              );
            },
            (errar) => {
              // console.log(errar);
            }
          );
        });
      //成功失败页面条件还没写，等支付宝和微信支付
    },
  },
};
</script>
<style lang="scss" scoped>
.recharge {
  position: relative;
  .czjl {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(140, 140, 140, 1);
    padding: 12px 20px 0 0;
    z-index: 1000;
  }
  .recharge-input {
    padding: 0 0.533333rem;
    padding-top: 0.72rem;
    .chongzhi {
      position: relative;
      width: 100%;
      height: 1.146667rem;
      background: rgba(233, 233, 233, 1);
      border-radius: 0.133333rem;
      margin: 0.4rem 0;
      overflow: hidden;
      input {
        width: 100%;
        height: 100%;
        border: none;
        font-size: 0.43rem;
        padding-left: 0.3rem;
        background: none;
      }
      img {
        width: 0.226667rem;
        height: 0.226667rem;
        position: absolute;
        right: 0.3rem;
        top: 50%;
        margin-top: -0.11rem;
      }
    }
    .button {
      // display: flex;
      margin-top: 2rem;
      >>> .van-button {
        color: #fff;
        font-size: 0.48rem;
        font-weight: 600;
        border-radius: 0.15rem;
        width: 100%;
        height: 1.2rem;
        margin-top: 0.2rem;
        opacity: 1;
      }
      .btn1 {
        background: #a3a2a2;
      }
      .btn2 {
        background: #fe5747;
      }
    }
  }
  .padd20 {
    // padding: 0 0.533333rem;
    .title {
      font-size: 0.426667rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(26, 5, 5, 1);
      margin-top: 0.4rem;
    }
    .boxmoney {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      div {
        width: 48%;
        height: 2rem;
        border: 1px solid #aeaeae;
        border-radius: 0.133333rem;
        margin-top: 0.533333rem;
        padding: 0.4rem;
        line-height: 0.7rem;
        p:first-child {
          font-size: 0.426667rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(60, 60, 60, 1);
          .shou {
            font-size: 0.346667rem;
            font-weight: 400;
            color: rgba(140, 140, 140, 1);
          }
        }
        p:last-child {
          font-size: 0.346667rem;
          font-weight: 400;
          color: rgba(140, 140, 140, 1);
        }
      }
      .active {
        border: none;
        box-shadow: 0px 0px 6px 0px rgba(252, 47, 72, 0.3);
        background: linear-gradient(
          150deg,
          rgba(254, 87, 71, 1),
          rgba(251, 33, 72, 1)
        );
        p:first-child {
          color: #fff;
          .chong {
            color: #fff;
          }
          .shou {
            font-size: 0.346667rem;
            font-weight: 400;
            color: #fef0f0;
          }
        }
        p:last-child {
          color: #fef0f0;
        }
      }
    }
    .boxtip {
      font-size: 0.32rem;
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
      >>> .van-radio__icon {
        height: 0.4rem;
      }
      >>> .van-radio__icon .van-icon {
        width: 0.4rem;
        height: 0.4rem;
        font-size: 0.6em;
      }
    }
    .czbtn {
      height: 1.2rem;
      background: rgba(254, 87, 71, 1);
      box-shadow: 0px 4px 16px 0px rgba(161, 161, 161, 0.41);
      border-radius: 0.133333rem;
      color: #fff;
      font-size: 0.533333rem;
      font-weight: 500;
      margin-top: 1.733333rem;
    }
  }
  >>> #barcode {
    z-index: 999;
  }
}
>>> .van-tab {
  font-size: 0.32rem;
  font-weight: 400;
  color: rgba(26, 5, 5, 1);
}
>>> .van-tabs__line {
  background: #fe5747;
}
>>> .van-tab--active {
  font-size: 0.373333rem;
  font-weight: 400;
  color: rgba(254, 87, 71, 1);
}
>>> .van-tabs__nav {
  background: none;
}
>>> .van-dialog__header {
  color: #fe5747;
}
>>> .van-dialog__confirm,
.van-dialog__confirm:active {
  color: #fe5747;
}
.dialogp {
  padding: 0.3rem 0px 0.5rem 1rem;
  line-height: 0.75rem;
}
</style>