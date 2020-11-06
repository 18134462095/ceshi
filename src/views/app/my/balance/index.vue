<template>
  <div class="balance">
    <!-- 余额 -->
    <div class="header">
      <app-title>余额</app-title>
      <div class="padd20">
        <p class="p1">当前剩余账户购物余额(元)</p>
        <p class="p2">{{user.balanceAmount}}</p>
        <p class="p3">
          账户余额不可转让到其他账户，不可提现，只能在全网惠平台领取商品
          优惠券使用，不做其他用途使用
        </p>
      </div>
    </div>
    <div class="conwidth">
      <div class="padd20">
        <div class="b-title">
          <p class="left">消费记录</p>
          <!-- <div class="right">
            <p>历史概况</p>
            <img src="@/assets/my/rightr.png" alt />
          </div>-->
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
              <div class="list" v-for="i in consumptionList" :key="i.id">
                <div class="l-left">
                  <p
                    class="l-title"
                    v-if="i.goodsName"
                  >{{i.goodsName.length > 22 ? i.goodsName.slice(0,22) + '...' : i.goodsName}}</p>
                  <p v-else class="l-title">商品标题</p>
                  <div class="l-date">
                    <p>领券时间：{{formatDate(i.createTime)}}</p>
                    <p>￥{{i.consumeAmount}}元</p>
                  </div>
                </div>
                <!-- <div class="l-right">
                  <img src="@/assets/my/rightr.png" alt />
                </div>-->
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
  name: "Balance",
  computed: {
    user() {
      return this.$store.getters.info;
    },
  },
  data() {
    return {
      consumptionList: [],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      lengths: null,
    };
  },
  mounted() {
    // this.$api.app.my.getExchangeList().then((res) => {
    //   if (res.code == 200) {
    //     this.consumptionList = res.data;
    //   } else {
    //     this.Toast(res.msg);
    //   }
    // });
  },
  methods: {
    getExchangeList() {
      this.$api.app.my
        .getExchangeList({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          if (res.code == 200) {
            this.lengths = res.data.totalSize;
            this.$store.commit("exChangeList", res.data.content);
            res.data.content.forEach((i) => {
              this.consumptionList.push(i);
            });

            this.loading = false;
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
      this.loading = true;
      this.pageIndex++;
      this.getExchangeList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.consumptionList = [];
      this.onLoad();
    },
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
  },
};
</script>
<style lang="scss" scoped>
.balance {
  height: 100vh;
  .header {
    width: 100%;
    height: 5.6rem;
    background: linear-gradient(
      150deg,
      rgba(254, 87, 71, 1),
      rgba(251, 33, 72, 1)
    );
    color: #fff;
    .p1 {
      font-size: 0.32rem;
      font-weight: 400;
      margin-top: 1.04rem;
    }
    .p2 {
      font-size: 0.666667rem;
      font-weight: bold;
      margin: 0.6rem 0;
    }
    .p3 {
      font-size: 0.293333rem;
      font-weight: 400;
      color: rgba(254, 254, 254, 0.58);
      line-height: 0.4rem;
      // opacity:0.58;
    }
  }
  .b-title {
    margin-top: 0.72rem;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    .left {
      font-size: 0.373333rem;
      font-weight: 400;
      color: rgba(26, 5, 5, 1);
    }
    .right {
      display: flex;
      align-items: center;
      p {
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
      }
      img {
        width: 0.48rem;
        height: 0.426667rem;
      }
    }
  }
  .conwidth{
    height: calc(100% - 210px);
    overflow: scroll;
  }
  .balance-list {
    margin-top: 0.413333rem;
    
    .list {
      // height: 1.8rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.133333rem;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      padding: 0.2rem 0.133333rem;
      margin-bottom: 0.2rem;
      .l-left {
        width: 100%;
        line-height: 0.8rem;
        .l-title {
          font-size: 0.373333rem;
          font-weight: 400;
          color: rgba(26, 5, 5, 1);
        }
        .l-date {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p:first-child {
            font-size: 0.293333rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(174, 174, 174, 1);
          }
          p:last-child {
            font-size: 0.373333rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(254, 87, 71, 1);
          }
        }
      }
      .l-right {
        width: 0.48rem;
        height: 0.426667rem;
        img {
          width: 100%;
          height: 100%;
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