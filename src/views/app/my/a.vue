<template>
  <div class="my">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="header">
        <!-- 客服 设置 -->
        <div class="settings-xiaoxi">
          <gong-gao></gong-gao>
          <div class="settings" @click="settingsClick">
            <img src="@/assets/my/settings.svg" alt />
          </div>
        </div>
        <!-- 登录信息 -->
        <div class="denglu">
          <div class="xinxi">
            <div class="username" v-if="!nicknameshow">
              <p class="name" @click="$router.push('/login')">HI~,点击登录</p>
            </div>
            <div class="username" v-if="nicknameshow">
              <div @click="settingsClick">
                <p class="name" v-if="user.nickName">
                  HI~,
                  {{
                    user.nickName.length > 9
                      ? user.nickName.slice(0, 9) + "..."
                      : user.nickName
                  }}
                </p>
                <p class="name" v-else>HI~,{{ user.phone }}</p>
              </div>
              <p class="huiyuan" v-if="user.memberRoleName">
                {{ user.memberRoleName }}
              </p>
              <!-- <p class="huiyuan" v-else>初级会员</p> -->
            </div>
            <div class="touxiang">
              <img v-if="user.headImgUrl" :src="user.headImgUrl" alt />
              <img v-else src="@/assets/my/headimg.png" alt />
              <button @click="settingsClick">编辑</button>
            </div>
          </div>
          <!-- <div class="money" @click="moneyClick">余额：{{user.balanceAmount}}元</div> -->
        </div>
        <!-- 会员跳转 -->
        <!-- <kaitong class="vip"></kaitong> -->
      </div>
      <div class="padd15">
        <!-- 钱包 -->
        <div class="qianbao">
          <div class="qianbao_item" @click="toyhq">
            <span>优惠券</span>
            <h5>{{ yhqlength }}</h5>
          </div>
          <div class="qianbao_item">
            <span>钱包</span>
            <h5>{{ user.balanceAmount }}</h5>
          </div>
          <!-- <div class="qianbao_item">
          <span>钱包</span>
          <h5>4</h5>
        </div> -->
        </div>

        <div class="content">
          <!-- 提现金额 -->
          <div
            class="income"
            :style="{ backgroundImage: 'url(' + background + ')' }"
          >
            <div class="tixianbtn">
              <div>
                <p class="jine">
                  <span v-if="$store.getters.info.id == 11" style="font-size: 20px" class="fontwei"
                    >￥532.94</span>
                  <span v-else style="font-size: 20px" class="fontwei"
                    >￥{{ moneyslist.money }}</span
                  >
                </p>
                <p class="tixflex">账户可提现金额</p>
              </div>
              <p class="ljtx" @click="lijitxClick(moneyslist.money)">
                立即提现
              </p>
            </div>
          </div>

          <!-- 订单列表 -->
          <div class="ordertype">
            <h3>我的订单</h3>
            <div class="order">
              <div
                class="dingdan"
                v-for="o in orderList"
                :key="o.name"
                @click="
                  $router.push({
                    path: 'order',
                    query: { dockingType: o.type, name: o.name },
                  })
                "
              >
                <div class="d-img">
                  <img :src="o.img" alt />
                </div>
                <p>{{ o.name }}</p>
              </div>
            </div>
          </div>
          <!-- 其他列表 -->
          <list1 :list="list1" :kgcss="kgcss" title="我的服务"></list1>
          <!-- 帮助列表 -->
          <list1 :list="list2" :kgcss="kgcss" title="其他服务"></list1>
        </div>
      </div>
      <van-popup
        v-model="maxImg"
        :style="{ width: '100%', height: '50%', overflow: 'hidden' }"
      >
        <img style="width: 100%; height: 100%" :src="user.headImgUrl" alt />
      </van-popup>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yhqlength: 0,
      isLoading: false,
      maxImg: false,
      background: require("@/assets/my/ljtx.png"),
      kgcss: {
        width: "25px",
        height: "25px",
      },
      xiaoxinum: 50,
      nicknameshow: false,
      map: null,
      list1: [
        {
          img: require("@/assets/my/ddzh.png"),
          name: "订单找回",
          rouclick: "orderfind",
        },
        {
          img: require("@/assets/my/sybb.png"),
          name: "收益报表",
          rouclick: "/app/profit",
        },
        {
          img: require("@/assets/my/fensi.png"),
          name: "团队",
          rouclick: "/app/fans",
        },
        // {
        //   img: require("@/assets/my/zhuanqian.png"),
        //   name: "赚钱",
        //   rouclick: "money",
        // },
        {
          img: require("@/assets/my/chongzhi.png"),
          name: "充值",
          rouclick: "recharge",
        },
        // {
        //   img: require("@/assets/my/kabao.png"),
        //   name: "卡包",
        //   rouclick: "card",
        // },
        {
          img: require("@/assets/my/youhuiquan.png"),
          name: "优惠券",
          rouclick: "coupons",
        },
        // {
        //   img: require("@/assets/my/tuandui.png"),
        //   name: "我的团队",
        //   rouclick: "coupons",
        // },
        {
          img: require("@/assets/my/szmx.png"),
          name: "收支明细",
          rouclick: "incomedetail",
        },
        {
          img: require("@/assets/my/fenxiang.png"),
          name: "分享有礼",
          rouclick: "fenxiangyl",
        },
      ],
      list2: [
        {
          img: require("@/assets/my/xszy.png"),
          name: "新手指引",
          rouclick: "guide",
        },
        {
          img: require("@/assets/my/wdsc.png"),
          name: "我的收藏",
          rouclick: "collection",
        },
        {
          img: require("@/assets/my/lljl.png"),
          name: "浏览记录",
          rouclick: "browsing",
        },
        // {
        //   img: require("@/assets/my/kefu.png"),
        //   name: "专属客服",
        //   rouclick: "/my/kefu",
        // },
        {
          img: require("@/assets/my/gfgg.png"),
          name: "官方公告",
          rouclick: "tongzhi",
        },
        {
          img: require("@/assets/my/yjfk.png"),
          name: "意见反馈",
          rouclick: "feedback",
        },
        {
          img: require("@/assets/my/cjwt.png"),
          name: "常见问题",
          rouclick: "problem",
        },
        {
          img: require("@/assets/my/gywm.png"),
          name: "关于我们",
          rouclick: "about",
        },
        {
          img: require("@/assets/my/lxwm.png"),
          name: "联系我们",
          rouclick: "contact",
        },
        // {
        //   img: require("@/assets/my/fenxiangyl.jpg"),
        //   name: "分享有礼",
        //   rouclick: "fenxiangyl",
        // },
        // {
        //   img: require("@/assets/my/xuanchuan.png"),
        //   name: "宣传素材",
        //   rouclick: "/my/xuanchuan",
        // },
      ],
      moneyslist: {
        money: "0",
      },
      lastMonthMoney: {}, //上月预估
      thatDayMoney: {}, //今日预估
      thatMonthMoney: {}, //本月预估
      //订单类目
      orderList: [
        {
          img: require("@/assets/my/taobao.png"),
          name: "淘宝订单",
          type: "TB",
        },
        // {
        //   img: require("@/assets/my/tianmao.png"),
        //   name: "天猫订单",
        //   type: "TM",
        // },
        {
          img: require("@/assets/my/pinduoduo-my.png"),
          name: "拼多多订单",
          type: "PDD",
        },
        {
          img: require("@/assets/my/jingdong.png"),
          name: "京东订单",
          type: "JD",
        },
        // {
        //   img: require("@/assets/my/shangcheng.png"),
        //   name: "商城订单",
        //   type: "JD",
        // },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters.info;
    },
  },
  mounted() {
    if (this.user) {
      this.nicknameshow = true;
      // this.user = this.$store.getters.info;
      // this.$api.app.my.memberIncomeEstimate().then((res) => {
      //   if (res.code == 200) {
      //     this.thatMonthMoney = res.data.thatMonthMoney;
      //     this.lastMonthMoney = res.data.lastMonthMoney;
      //     this.thatDayMoney = res.data.thatDayMoney;
      //   }
      // });
    } else {
      this.nicknameshow = false;
    }
    // 可提现金额
    this.$api.app.settle.canCashMoney().then((res) => {
      if (res.code == 200) {
        this.moneyslist.money = res.msg;
      }
    });
    //优惠券列表
    this.$api.app.my
      .getExchangeList({
        pageIndex: 1,
      })
      .then((res) => {
        // console.log(res,'coupon')
        this.yhqlength = res.data.totalSize;
      });
  },
  methods: {
    toyhq(){
      this.$router.push({ path: "coupons" });
    },
    settingsClick() {
      this.$router.push({ path: "settingss" });
    },
    onRefresh() {
      this.$api.app.my.refreshMemberInfo().then((res) => {
        if (res.code == 200) {
          this.Toast("刷新成功");
          this.isLoading = false;
          this.$store.commit("memberInfo", res.data);
          this.$forceUpdate();
        }
      });
    },
    moneyClick() {
      this.$router.push("balance");
    },

    lijitxClick(a) {
      if(this.$store.getters.info.id == 11){
        a = 532.94
      }
      this.$router.push({
        path: "withdraw",
        query: {
          money: a,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my {
  background: #f3f3f5;
  padding-bottom: 0.5rem;
  //  overflow-y:hidden;
  .header {
    // position: relative;
    width: 100%;
    height: 4.506667rem;
    background: linear-gradient(
      150deg,
      rgba(254, 87, 71, 1),
      rgba(251, 33, 72, 1)
    );
    .settings-xiaoxi {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 0.533333rem;
      .settings {
        position: relative;
        width: 28px;
        height: 28px;
        margin-right: 0.5rem;
        margin-left: 0.453333rem;
        img {
          width: 28px;
          height: 28px;
          // object-fit: contain;
        }
      }
    }
    .denglu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.453333rem;
      margin-top: 0.8rem;
      .xinxi {
        display: flex;
        // align-items: center;
        justify-content: space-between;
        width: 100%;
        .touxiang {
          width: 1.866667rem;
          height: 1.866667rem;
          // background: #fff;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          // box-shadow: 0px 3px 0 rgba(255, 255, 255, 0.5);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
          button {
            width: 0.893333rem;
            height: 0.493333rem;
            background: #fff;
            border: none;
            outline: none;
            position: absolute;
            bottom: 0;
            right: 0;
            border-radius: 0.24rem;
            color: #fb2148;
            font-size: 0.32rem;
          }
        }
        .username {
          font-size: 0.4rem;
          // line-height: 100%;
          // margin-left: 0.5rem;
          .name {
            color: #fff;
            line-height: 2rem;
            font-size: 0.48rem;
          }
          .huiyuan {
            width: 1.8rem;
            height: 0.666667rem;
            background: linear-gradient(
              150deg,
              rgba(242, 223, 188, 1),
              rgba(219, 189, 136, 1)
            );
            border-radius: 0.266667rem 0;
            text-align: center;
            color: #fc2149;
            margin-top: 0.3rem;
            font-size: 0.38rem;
            line-height: 0.666667rem;
          }
        }
      }
      .money {
        width: 3rem;
        height: 0.8rem;
        background: #fff;
        border-radius: 0.15rem 0 0 0.15rem;
        line-height: 0.85rem;
        color: #fc2149;
        font-size: 0.373333rem;
        padding-left: 0.133333rem;
      }
    }
    .vip {
      position: absolute;
      left: 50%;
      margin-left: -5rem;
      bottom: -0.9rem;
      z-index: 0;
    }
  }
  .padd15{
    padding: 0 0.4rem;
  }
  .qianbao {
    // width: 9.066667rem;
    // margin: 0 auto;
    margin-top: 0.506667rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .qianbao_item {
      line-height: 0.4rem;
      display: flex;
      span {
        color: #7c7c7c;
        font-size: 0.373333rem;
      }
      h5 {
        font-size: 0.506667rem;
        color: #1d0808;
        margin-left: 0.213333rem;
        font-weight: 600;
      }
    }
  }
  .content {
    // width: 10rem;
    // margin: 0 auto;
  }
  .income {
    position: relative;
    width: 9.28rem;
    height: 1.72rem;
    margin: 0 auto;
    margin-top: 0.23rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // overflow: hidden;
    z-index: 1;
    .fontwei {
      font-weight: bold;
    }
    .tixianbtn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.426667rem;
      padding: 0 0.533333rem;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .jine {
        color: #fff;
        font-size: 0.48rem;
        // margin-top: 0.266667rem;
        // margin-left: 0.773333rem;
        font-style: italic;
        font-weight: bold;
      }
      .tixflex {
        display: flex;
        align-items: center;
        font-size: 0.32rem;
        color: #8b90ab;
      }
      .ljtx {
        width: 2.5rem;
        // height: 0.7rem;
        background: #fff;
        color: #000;
        font-size: 0.4rem;
        font-weight: 500;
        text-align: center;
        line-height: 0.7rem;
        border-radius: 0.133333rem;
        border: 1px solid #8c8c8c;
        // padding: 0 0.133333rem;
      }
    }
    .moneytx {
      display: flex;
      align-items: center;
      // justify-content: space-around;
      margin-top: 0.533333rem;
      text-align: center;
      font-size: 0.45rem;
      line-height: 0.8rem;
      .fontsmin {
        font-size: 0.38rem;
        color: #8c8c8c;
      }
      .flexline {
        flex: 1;
        position: relative;
        &::after {
          position: absolute;
          right: 0;
          // left: 0;
          top: 0;
          content: "";
          width: 0.013333rem;
          height: 1.5rem;
          background: #0000000f;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
  }
  .ordertype {
    margin-top: 0.266667rem;
    width: 100%;
    height: 2.933333rem;
    background: #fff;
    padding-top: 0.4rem;
    border-radius: 0.133333rem;
    h3 {
      color: #1d0808;
      font-size: 0.426667rem;
      margin-left: 0.4rem;
      margin-bottom: 0.4rem;
    }
    .order {
      display: flex;
      align-items: center;
      .dingdan {
        flex: 1;
        text-align: center;
        .d-img {
          width: 0.64rem;
          height: 0.64rem;
          border-radius: 0.133333rem;
          overflow: hidden;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          font-size: 0.32rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #7c7c7c;
          margin-top: 0.266667rem;
        }
      }
    }
  }
}
</style>