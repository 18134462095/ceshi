<template>
  <div class="jiayoudetail">
    <app-title>一键加油</app-title>
    <div class="conwidth">
      <div class="header">
        <img class="bakimg" :src="gasLogoBig" alt="" />
        <!-- <img class="bakimg" v-else src="https://static.czb365.com/1592810196465.jpg?x-oss-process=image/resize,m_lfit,h_420,w_630/format,png" alt="" /> -->
        <div class="tips">
          <div class="tip">
            <div class="img">
              <img src="@/assets/app/tips.png" alt="" />
            </div>
            <div class="line"></div>
            <div class="tiptext">
              <p>站内禁止使用手机，请去前台操作。</p>
              <p>请告知加油员本次服务由团油提供。</p>
            </div>
          </div>
        </div>
        <div class="position">
          <div class="youzhandetail">
            <div class="zhan">
              <p v-if="result" class="zhanname">{{ result.gasName }}</p>
              <div class="address" @click="godaohang">
                <van-icon name="location" />
                <p class="gongli">{{ distance }}km</p>
                <p class="dizhi" v-if="gasAddress">
                  {{
                    gasAddress.length > 15
                      ? gasAddress.slice(0, 15) + "..."
                      : gasAddress
                  }}
                </p>
              </div>
              <div class="zhandate">
                <van-icon name="clock-o" />
                <p class="date">00:00-23:59</p>
                <van-icon name="records" />
                <p>站内开票</p>
              </div>
            </div>
            <div class="youjia" v-if="oilPrice">
              <div class="youtype">
                <van-dropdown-menu v-if="options">
                  <van-dropdown-item
                    @change="youhao"
                    :options="options"
                    v-model="value1"
                  />
                </van-dropdown-menu>
              </div>
              <div class="youtype colorred afters">
                <p class="first">团油价</p>
                <p class="last">
                  <span style="font-size: 12px">￥</span
                  ><span>{{ oilPrice.priceYfq }}</span>
                </p>
              </div>
              <div class="youtype afters">
                <p class="first">油站价</p>
                <p class="last">
                  <span style="font-size: 12px">￥</span
                  ><span>{{ oilPrice.priceGun }}</span>
                </p>
              </div>
              <div class="youtype">
                <p class="first">国标价</p>
                <p class="last">
                  <span style="font-size: 12px">￥</span
                  ><span>{{ oilPrice.priceOfficial }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="youqiang">
            <p class="xuanyq">选择油枪</p>
            <p class="queren">请务必和加油员确认油枪号</p>
            <div class="yqbtn" v-if="oilPrice">
              <div
                v-for="(i, index) in oilPrice.gunNos"
                :key="index"
                @click="yqactive(index)"
              >
                <p :class="{ yqactive: index == yqcurractive }">
                  {{ i.gunNo }}号
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="content">
            <p class="fujin">车友印象</p>
            <div class="yinxiang">
              <p>服务一流(124)</p>
              <p>非常好(24)</p>
              <p>方便快捷(12)</p>
              <p>老司机都爱不释手(424)</p>
            </div>
          </div> -->
          <div class="xiayibu">
            <van-button @click="gojiayou" class="xyb" block>下一步</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付提示弹出 -->
    <van-popup class="zfpopup" v-model="zfshow" :close-on-click-overlay="false">
      <img class="titleimg" src="@/assets/app/jinggao.png" alt="" />
      <p class="firstp1">您当前位置不在该油站内！</p>
      <p class="firstp2">您当前位置距离油站过远，请在油站内进行支付</p>
      <div class="zhanimgname">
        <img :src="gasLogoBig" alt="" />
        <!-- <img v-else src="https://static.czb365.com/1592810196465.jpg?x-oss-process=image/resize,m_lfit,h_420,w_630/format,png" alt="" /> -->
        <p>郑州市汇邦石化有限公司</p>
      </div>
      <div class="zhanbtn">
        <p @click="zfshow = false" class="wzdl">我知道了</p>
        <div class="daohang" @click="godaohang">
          <van-icon name="success" />
          <p>导航到油站</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "jiayoudetail",
  data() {
    return {
      yqcurractive: 0,
      youcurractive: 0,
      value1: "",
      result: null,
      gasAddress: "",
      distance: null,
      oilPrice: null,
      options: null,
      oilPriceList: null,
      zfshow: false,
      juli: null,
      gasLogoBig: "",
    };
  },
  mounted() {
    // let gasId = 'GJ000011533';
    // console.log(this.options, "iii");
    this.$api.app.home
      .getGasStationStatus({
        gasId: this.$route.query.gasId,
      })
      .then((res) => {
        // console.log(res);
        this.gasLogoBig = res.data.gasLogoBig;
        this.gasAddress = res.data.gasAddress;
        this.result = res.data.result[0];
        // this.option = res.data.result[0].oilPriceList;
        this.diyData(res.data.result[0].oilPriceList);
        this.oilPriceList = res.data.result[0].oilPriceList;
        // console.log(this.value1,'this.oilPriceList')
        this.oilPrice = this.oilPriceList[this.value1];
      });
  },
  created() {
    // this.value1 = this.$route.query.oilName
    this.distance = this.$route.query.distance;
    // console.log(this.options, "iii");
  },
  methods: {
    yqactive(i) {
      // console.log(i);
      this.yqcurractive = i;
    },

    gojiayou() {
      let distance = Number(this.$route.query.distance);
      // console.log(distance,'this.$route.query.distance')

      // if (distance > 0.5) {
      // this.zfshow = true;
      // } else {
      let gunnos = this.oilPrice.gunNos[this.yqcurractive];
      let data = {
        // gasName: this.result.gasName,
        oilNo: this.oilPrice.oilNo,
        gunNo: gunnos.gunNo,
        gasId: this.$route.query.gasId,
      };
      this.$api.app.home.getPayOrder(data).then((res) => {
        // console.log(res, "res**");
        if (res.code == 200) {
          // plus.runtime.openURL(res.msg);
          this.openWeb(res.msg, this.$route.query.gasId);
        }
      });   
      // }
    },
    openWeb(url, id) {
      // console.log(url, id, "urlid");
      let _this = this
      let nw = plus.webview.create(url, id, {
        plusrequire:"none",
        titleNView: {
          buttons: [
            {
              type: "back",
              onclick: function (event) {
                nw.canBack(function (e) {
                  // console.log("是否可返回：" + e.canBack);
                  if (e.canBack) {
                    _this.backapi()
                    nw.back();
                  } else {
                    _this.backapi()
                    nw.close();
                  }
                });
              },
              float: "left",
            },
            {
              type: "close",
              onclick: function () {
                _this.backapi()
                nw.close();
              },
              float: "left",
            },
          ],
        },
      });
      plus.key.addEventListener(
        "backbutton",
        function () {
          nw.canBack(function (e) {
            // console.log("是否可返回：" + e.canBack);
            if (e.canBack) {
              _this.backapi()
              nw.back();
            } else {
              _this.backapi()
              nw.close();
            }
          });
        },
        false
      );
      nw.show();
    },
    backapi(){
      this.$api.app.home.getSaveOrderInfo().then(res=>{
        console.log(res,'backapi====>')
      })
    },
    godaohang() {
      let i = this.$route.query;
      this.$router.push({
        name: "mapview",
        query: {
          zdlng: i.zdlng,
          zdlat: i.zdlat,
          zdaddress: i.zdaddress,
          qdlng: i.qdlng,
          qdlat: i.qdlat,
          qdaddress: i.qdaddress,
        },
      });
    },
    youhao(value) {
      // console.log(value);
      this.oilPrice = this.oilPriceList[value];
      // console.log(this.oilPrice);
    },
    diyData(list) {
      // console.log(list, "11111");
      let iolname = this.$route.query.oilName;
      this.options = list.map((i, index) => {
        return {
          text: i.oilName,
          value: index,
        };
      });

      this.options.map((i) => {
        if (iolname == i.text) {
          this.value1 = i.value;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.jiayoudetail {
  height: 100vh;
  .conwidth {
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
  .header {
    position: relative;
    width: 100%;
    min-height: 50vh;
    .bakimg {
      width: 100%;
      height: 45vh;
      object-fit: cover;
    }
    .tips {
      position: absolute;
      top: 4.666667rem;
      left: 0.533333rem;
      width: 85%;
      border-radius: 1.333333rem;
      background: #ffe2b6;
      overflow: hidden;
      padding: 0.266667rem 0;
      padding-left: 0.4rem;
      .tip {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .img {
          width: 0.533333rem;
          height: 0.533333rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .line {
          width: 2px;
          height: 1.066667rem;
          background: #65453a;
          margin: 0 0.266667rem;
        }
        .tiptext {
          font-size: 0.373333rem;
          line-height: 0.586667rem;
        }
      }
    }
    .position {
      position: absolute;
      top: 6.666667rem;
      left: 0;
      right: 0;
      .youzhandetail {
        background: #ffffff;
        width: 100%;
        // height: 5.333333rem;
        border-radius: 0.666667rem 0.666667rem 0 0;
        overflow: hidden;
        .zhan {
          width: 100%;
          padding: 0.266667rem 0.533333rem;
          box-shadow: 0px 12px 8px -12px #efeeee;
          border-radius: 0.533333rem;
          .zhanname {
            font-size: 0.48rem;
            color: #000;
            font-weight: 400;
          }
          .address {
            display: flex;
            align-items: center;
            margin-top: 0.266667rem;
            >>> .van-icon {
              font-size: 0.426667rem;
              color: #8c8c8c;
            }
            .gongli {
              font-size: 0.373333rem;
              color: #000;
              margin: 0 0.106667rem;
            }
            .dizhi {
              font-size: 0.4rem;
              color: #8c8c8c;
            }
          }
          .zhandate {
            margin-top: 0.666667rem;
            display: flex;
            align-items: center;
            font-size: 0.4rem;
            color: #333333;
            p {
              margin-left: 0.133333rem;
            }
            .date {
              margin-right: 0.533333rem;
            }
          }
        }
        .youjia {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0.533333rem;
          .youtype {
            flex: 1;
            margin: 0 auto;
            text-align: center;
            color: #666666;
            >>> .van-dropdown-menu__bar {
              background: #f1f1f1;
              // padding: .4rem;
              border-radius: 0.533333rem;
              box-shadow: none;
              // height: 0;
            }
            .first {
              font-size: 0.4rem;
              margin-bottom: 0.133333rem;
            }
            .last {
              span {
                font-size: 0.666667rem;
              }
            }
            .youtypedetail {
              // margin: 0.4rem 0;
              .youtitle {
                font-size: 0.373333rem;
                color: #000;
                font-weight: 400;
                margin: 0.266667rem 0;
                text-align: left;
              }
              .youbtn {
                display: flex;
                align-items: center;
                // justify-content: space-between;
                flex-wrap: wrap;
                .btn {
                  width: 25%;
                  height: 0.7rem;
                  padding: 0 0.133333rem;
                  margin-bottom: 0.35rem;
                  p {
                    width: 100%;
                    height: 100%;
                    color: #8c8c8c;
                    font-size: 0.373333rem;
                    border: 1px solid #8c8c8c;
                    border-radius: 0.133333rem;
                    text-align: center;
                    line-height: 0.7rem;
                  }
                  .youactive {
                    border: 1px solid #fe5747;
                    color: #fe5747;
                  }
                }
              }
            }
          }
          .colorred {
            p {
              color: #fd5747;
            }
          }
          .afters {
            position: relative;
            &::after {
              position: absolute;
              bottom: 0;
              right: 0;
              content: "";
              width: 1px;
              height: 0.9rem;
              background: #eeeded;
            }
          }
        }
      }
      .youqiang {
        width: 100%;
        // height: 4rem;
        background: #ffffff;
        margin-top: 0.266667rem;
        padding: 0.533333rem;
        .xuanyq {
          font-size: 0.506667rem;
          color: #000;
          font-weight: 400;
        }
        .queren {
          font-size: 0.373333rem;
          color: #000;
          font-weight: 400;
          margin-top: 0.266667rem;
        }
        .yqbtn {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 0.266667rem;
          div {
            width: 25%;
            padding: 0.133333rem;
            p {
              border-radius: 0.133333rem;
              border: 1px solid #8c8c8c;
              padding: 0.1rem 0.3rem;
              color: #000;
              font-size: 0.373333rem;
              text-align: center;
            }
            .yqactive {
              border: 1px solid #fe5747;
              color: #fe5747;
            }
          }
        }
      }
      .content {
        margin-top: 0.266667rem;
        width: 100%;
        padding: 0.533333rem;
        background: #ffffff;
        .fujin {
          font-size: 0.506667rem;
          color: #000;
          font-weight: 400;
        }
        .yinxiang {
          margin-top: 0.266667rem;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          p {
            font-size: 0.373333rem;
            color: #000;
            padding: 0.133333rem;
            background: #f3f3f4;
            margin: 0.133333rem;
            border-radius: 0.133333rem;
          }
        }
      }
      .xiayibu {
        margin-top: 0.266667rem;
        background: #ffffff;
        padding: 0.533333rem;
        .xyb {
          background: linear-gradient(-60deg, #fb2148, #fd5747);
          color: #ffffff;
          border-radius: 0.266667rem;
          border: none;
        }
      }
    }
  }
  .zfpopup {
    width: 90%;
    background: #ffffff;
    border-radius: 0.266667rem;
    text-align: center;
    padding: 0.7rem 0;
    .titleimg {
      width: 1.333333rem;
      height: 1.333333rem;
    }
    .firstp1 {
      font-size: 0.6rem;
      color: #000;
      font-weight: 500;
      margin-top: 0.266667rem;
    }
    .firstp2 {
      font-size: 0.373333rem;
      color: #3f3e3e;
      margin-top: 0.4rem;
    }
    .zhanimgname {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        object-fit: cover;
      }
      p {
        font-size: 0.48rem;
        color: #000;
        font-weight: 500;
        margin-left: 0.266667rem;
      }
    }
    .zhanbtn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 0.8rem;
      .wzdl {
        width: 40%;
        font-size: 0.48rem;
        border: 1px solid #cac8c8;
        border-radius: 0.133333rem;
        padding: 5px 0;
      }
      .daohang {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #fe5747;
        // border: 1px solid #8c8c8c;
        border-radius: 0.133333rem;
        padding: 5px 0;
        >>> .van-icon {
          font-size: 0.666667rem;
          color: #fff;
        }
        p {
          font-size: 0.48rem;
          color: #fff;
        }
      }
    }
  }
}
</style>