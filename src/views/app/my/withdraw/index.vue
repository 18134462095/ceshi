<template>
  <div class="balance">
    <!-- 余额 -->
    <div class="header">
      <app-title style="color:#fff;">提现</app-title>
      <p class="txjl" @click="txjl">提现记录</p>
      <div>
        <p class="p1">可提现金额(元)</p>
        <div class="tixian">
          <span>{{money}}</span>
          <div class="lijitx" @click="lijitx">立即提现</div>
        </div>
        <p class="p3">
          订单收入本月确认收货下个月25号后可提现
        </p>
      </div>
    </div>
    <div class="conwidth">
      <div class="padd20">
        <div class="b-title" v-if="$store.getters.info.id != 11">
          <p>收益明细</p>
        </div>
        <nodata v-if="lengths==0"></nodata>
        <div v-else class="balance-list">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              offset="200"
            >
              <div class="list" v-for="i in settleList" :key="i.id">
                <div class="l-left">
                  <p class="l-title">{{i.settleTitle}}</p>
                  <div class="l-date">
                    <p class="l-date">{{formatDate(i.settleTime)}}</p>
                  </div>
                </div>
                <div class="l-right">
                  <p>{{i.settleAmount}}元</p>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "withdraw",
  data() {
    return {
      lengths: null,
      settleList: [],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      money: "",
    };
  },
  mounted() {
    this.money = this.$route.query.money;
  },
  methods: {
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
    lijitx() {
      this.$router.push({ path: "lijitixian", query: { money: this.money } });
    },
    txjl() {
      this.$router.push({ path: "record" });
    },

    getSettleList() {
      this.$api.app.settle
        .getSettleList({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          // console.log(res, "提现收益");
          if (res.code == 200) {
            this.lengths = res.data.totalSize;
            res.data.content.forEach((i) => {
              i.settleAmount = i.settleAmount/100
              this.settleList.push(i);
            });
            this.loading = false;
            // this.finished = true;
            this.refreshing = false;
            if (res.data.content.length < 10) {
              this.finished = true;
            }
          } else {
            this.Toast.fail("获取信息失败");
            this.loading = false;
            this.pageIndex--;
          }
        });
    },
    onLoad() {
      // this.finished = false;
      this.loading = true;
      this.pageIndex++;
      this.getSettleList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.settleList = [];
      this.onLoad();
    },
  },
};
</script>
<style lang="scss" scoped>
.balance {
  .header {
    position: relative;
    width: 100%;
    height: 5.6rem;
    background: linear-gradient(
      150deg,
      rgba(254, 87, 71, 1),
      rgba(251, 33, 72, 1)
    );
    color: #fff;
    .txjl {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0.32rem;
      font-weight: 400;
      color: #fff;
      padding: 12px 20px 0 0;
      z-index: 1000;
    }

    .tixian {
      margin-left: 0.4rem;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 0.52rem;
      margin-bottom: 0.533333rem;
      span {
        font-size: 0.666667rem;
        font-weight: bold;
        color: #fff;
      }
      .lijitx {
        width: 2.533333rem;
        height: 0.8rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.133333rem 0px 0px 0.133333rem;
        font-size: 0.373333rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(251, 41, 72, 1);
        line-height: 0.9rem;
        text-align: center;
      }
    }

    .p1 {
      font-size: 0.32rem;
      font-weight: 400;
      margin-top: 1.04rem;
      margin-left: 0.4rem;
    }
    .p2 {
      font-size: 0.666667rem;
      width: 50%;
      background: none;
      border: none;
      padding: 0.533333rem 0 0.733333rem 0;
    }
    .p3 {
      margin-left: 0.4rem;
      font-size: 0.293333rem;
      font-weight: 400;
      color: rgba(254, 254, 254, 0.58);
      line-height: 0.4rem;
      // opacity:0.58;
    }
  }
  .b-title {
    padding: 0.653333rem 0 0.466667rem 0;
    p {
      font-size: 0.373333rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(26, 5, 5, 1);
    }
  }
  .balance-list {
    // margin-top: 0.413333rem;
    .list {
      //   height: 1.8rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.133333rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.133333rem;
      margin-bottom: 0.2rem;
      .l-left {
        // width: 90%;
        line-height: 0.5rem;
        .l-title {
          font-size: 0.373333rem;
          font-weight: 400;
          color: rgba(26, 5, 5, 1);
        }
        .l-date {
          font-size: 0.293333rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(174, 174, 174, 1);
        }
      }
      .l-right {
        p {
          font-size: 0.48rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: rgba(26, 5, 5, 1);
        }
      }
    }
  }
  .nodata {
    position: fixed;
    top: 8.2rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 3;
  }
}
</style>