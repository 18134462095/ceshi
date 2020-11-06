<template>
  <div class="signin">
    <div class="header">
      <app-title style="color:#fff;">签到</app-title>
      <div class="header-img">
        <img src="@/assets/my/qiandao.png" alt />
      </div>
      <div class="hdgz">活动规则</div>
      <div class="conwidth padd20">
        <div class="qiandao">
          <div class="dayflex">
            <div class="day" v-for="(i,index) in qiandaolist" :key="index">
              <p :style="i.numday">{{i.day}}天</p>
              <div class="dayimg" data-attr>
                <img class="lipin" v-if="i.day==7" src="@/assets/my/qdlipin.png" alt />
                <img class="liuday" v-else-if="i.day<=liangstatus" src="@/assets/my/qdhong.png" alt />
                <img class="liuday" v-else src="@/assets/my/qdhui.png" alt />
              </div>
            </div>
          </div>
          <div class="daybtn">
            <p
              v-if="isqiandao"
              @click="lijiqiandao()"
              style="background:linear-gradient(-60deg, #fb2148, #fd5747)"
            >立即签到</p>
            <p v-else style="background:#8c8c8c">已签到</p>
          </div>
          <p class="lianxuqd">已连续签到{{liangstatus}}天</p>
        </div>
      </div>
    </div>
    <tuiswiper @toHot="toHot" style="margin-top: 1.626667rem;" class="tuiswiper"></tuiswiper>
    <sigintabs v-if="tabs.length" :tabs="tabs"></sigintabs>
    <van-popup v-model="qiandaojifen" :close-on-click-overlay="false">
      <div class="qiandaobak">
        <img src="@/assets/app/qiandao.png" alt />
        <div class="qiandaotext">
          <div class="jifentip">
            <p>恭喜你!</p>
            <p>
              今天签到
              <span style="color:#FFF20E">+{{jifen}} </span>积分
            </p>
          </div>
          <div class="qdbtn" @click="qiandaojifen = false">
            <p>确定</p>
          </div>
        </div>
      </div>
      <!-- <div @click="qiandaojifen = false" class="img">
        <img src="@/assets/app/close.png" alt="">
      </div>-->
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "Signin",
  data() {
    return {
      qiandaojifen: false,
      isqiandao: null,
      jifen: 0,
      tabs: [],
      liangstatus: null,
      lijiqdshow: true,
      qiandaolist: [
        {
          day: 1,
          qdshow: true,
          numday: "color:#AEAEAE",
        },
        {
          day: 2,
          qdshow: true,
          numday: "color:#AEAEAE",
        },
        {
          day: 3,
          qdshow: true,
          numday: "color:#AEAEAE",
        },
        {
          day: 4,
          qdshow: true,
          numday: "color:#AEAEAE",
        },
        {
          day: 5,
          qdshow: true,
          numday: "color:#AEAEAE",
        },
        {
          day: 6,
          qdshow: true,
          numday: "color:#AEAEAE",
        },
        {
          day: 7,
          qdshow: true,
          numday: "color:#AEAEAE",
        },
      ],
    };
  },
  mounted() {
    this.getSignList();
  },
  methods: {
    toHot(params) {
      this.$router.push({
        name: "Detail",
        params,
      });
    },
    getSignList() {
      this.$api.app.home.getSignRecord().then((res) => {
        // console.log(res, "签到记录");
        if (res.code == 200) {
          this.liangstatus = res.data.record.weekSignCount;
          this.isqiandao = res.data.canSign;
        }
      });
    },
    lijiqiandao() {
      this.$api.app.home.getSign().then((res) => {
        // console.log(res, "签到");
        if (res.code == 200) {
          // this.Toast("签到成功");
          this.getSignList();
          this.jifen = res.data.todayScore;
          this.qiandaojifen = true;
        } else {
          this.Toast(res.msg);
        }
      });
    },
  },
  beforeMount() {
    this.$api.app.taobao.getTbWlPpq().then((res) => {
      this.tabs = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.signin {
  .header {
    position: relative;
    width: 100%;
    height: 7rem;
    background: $lineBg;
    border-radius: 0 0 25% 25%;
    .header-img {
      width: 50%;
      height: 1.333333rem;
      margin: 0.5rem auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .hdgz {
      position: absolute;
      right: 0;
      top: 2.48rem;
      width: 1.866667rem;
      height: 0.533333rem;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0px 0px 46px 0px rgba(255, 255, 255, 0.3);
      // opacity:0.25;
      border-radius: 0.133333rem 0px 0px 0.133333rem;
      font-size: 0.293333rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 0.533333rem;
    }
    .qiandao {
      width: 100%;
      height: 4.893333rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 54px 0px rgba(140, 21, 35, 0.19);
      border-radius: 0.133333rem;
      padding: 0.666667rem;
      .dayflex {
        display: flex;
        justify-content: space-around;
        .day {
          text-align: center;
          font-size: 0.32rem;
          font-weight: 400;
          // .numday {
          //   color: rgba(174, 174, 174, 1);
          // }
          .dayimg {
            position: relative;
            width: 1.04rem;
            height: 1.04rem;
            .liuday {
              position: relative;
              z-index: 1;
              width: 100%;
              height: 100%;
              padding: 0.18rem;
            }
            .lipin {
              width: 100%;
              height: 100%;
            }
            &::after {
              position: absolute;
              top: 50%;
              left: 55%;
              content: attr(data-attr);
              width: 100%;
              height: 0.04rem;
              background: rgba(243, 243, 244, 1);
              border-radius: 1px;
              z-index: 0;
            }
          }
          &:last-child {
            ::after {
              display: none;
            }
          }
        }
      }
      .daybtn {
        // width:9.2rem;
        padding: 0.266667rem 0.866667rem;
        p {
          height: 1.013333rem;
          border-radius: 0.133333rem;
          width: 100%;
          background: $lineBg;
          box-shadow: 0px 0px 8px 0px rgba(140, 21, 35, 0.3);
          font-size: 0.373333rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 1.013333rem;
        }
      }
      .lianxuqd {
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(174, 174, 174, 1);
        text-align: center;
      }
    }
  }
  .commodity {
    padding: 0;
  }
}
.tuiswiper {
  width: 9.2rem;
  margin: 0 auto;
}
>>> .van-popup {
  width: 100%;
  background: none;
  // position: relative;
  .qiandaobak {
    position: relative;
    width: 70%;
    height: 7rem;
    display: block;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
    .qiandaotext {
      position: absolute;
      bottom: 0.666667rem;
      left: 25%;
      color: #fff;
      text-align: center;
      line-height: 0.666667rem;
      width: 50%;
      .jifentip {
        p:first-child {
          font-size: 0.48rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
        }
        p:last-child {
          font-size: 0.32rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
        }
      }
    }
    .qdbtn {
      width: 2.52rem;
      height: 0.68rem;
      border-radius: 0.133333rem;
      background: #ffe23a;
      margin: 0 auto;
      line-height: 0.68rem;
      margin-top: 0.266667rem;
      p {
        color: #f0524a;
        font-size: 0.266667rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
      }
    }
  }
}
</style>