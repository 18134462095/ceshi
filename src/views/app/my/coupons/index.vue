<template>
  <div class="coupon">
    <!-- 优惠券 -->
    <app-title style="background: #F3F3F4;">优惠券</app-title>
    <nodata v-if="lengths==0"></nodata>
    <div v-else class="conwidth padd20" :key="key">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="200"
        >
          <div
            class="content"
            :style="i.state.value==1 ? 'filter:grayscale(0)':'filter:grayscale(100%)'"
            v-for="i in couponList"
            :key="i.id"
            @click="urlClick(i)"
          >
            <div class="bro-img">
              <img v-lazy="i.img" :src="i.img" alt />
            </div>
            <div class="bro-right">
              <p
                v-if="i.goodsName"
                class="bro-title"
              >{{i.goodsName.length > 17 ? i.goodsName.slice(0,17)+'...' :i.goodsName}}</p>
              <p class="bro-title" v-else>商品标题</p>
              <div class="bro-con">
                <div class="quanfanli">
                  <p class="bro-money">
                    <span>￥{{i.presentPrice}}</span>
                    <span>
                      <span v-if="i.plateForm=='TB'">淘宝</span>
                      <span v-else-if="i.plateForm=='PDD'">拼多多</span>
                      <span v-else-if="i.plateForm=='JD'">京东</span>
                      ￥{{i.originPrice}}
                    </span>
                  </p>
                  <p class="bro-date">{{formatDate(i.createTime)}}</p>
                </div>
                <quan v-if="i.couponAmount" :quan="i.couponAmount" :fanlishou="false"></quan>
                <quan v-else quan="1" :fanlishou="false"></quan>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "Coupon",
  inject: ["reload"],
  data() {
    return {
      lengths: null,
      couponList: [],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      key: 0,
    };
  },
  mounted() {},
  methods: {
    getExchangeList() {
      this.$api.app.my
        .getExchangeList({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          this.lengths = res.data.totalSize;
          this.$store.commit("exChangeList", res.data.content);
          if (res.code == 200) {
            res.data.content.forEach((i) => {
              i.img = this.replaceHttp(i.img);
              this.couponList.push(i);
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
      this.getExchangeList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.couponList = [];
      this.onLoad();
    },

    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
    urlClick(i) {
      // console.log(i, "i");
      if (i.state.value == 1) {
        // this.$api.app.my.getClickExchangeGoods(i.id);
        this.$api.app.my.getExchangeGoods(i).then((res) => {
          if (res.code == 200) {
            i.url = this.replaceHttp(i.url);
            this.getDetailUrl(i.url, i.plateForm);
            this.reload();
          }
        });
      } else {
        this.Toast("优惠券已使用");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.coupon {
  width: 100%;
  height: 100vh;
  >>> .van-tabs__nav {
    background: none;
  }
  >>> .van-tab {
    font-size: 0.32rem;
  }
  >>> .van-tab--active {
    font-size: 0.373333rem;
    font-weight: 400;
    color: rgba(254, 87, 71, 1);
  }
  >>> .van-tabs__line {
    background: #fe5747;
  }
  .conwidth {
    position: relative;
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
  .padd20 {
    // padding: 0 0.533333rem;
    .yhq {
      margin-top: 0.2rem;
      position: relative;
      width: 100%;
      height: 2.573333rem;
      border-radius: 0.133333rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .fillterimg {
        filter: grayscale(100%) opacity(0.4);
      }
      .yhqmark {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .around {
          height: 100%;
          display: flex;
          align-items: center;
          // justify-content: space-around;
          .a-money {
            font-size: 0.666667rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            padding: 0 0.4rem 0 0.5rem;
          }
          .a-line {
            width: 1px;
            height: 1.88rem;
            border: 1px dashed rgba(255, 255, 255, 0.3);
          }
          .a-desc {
            width: 4rem;
            padding: 0 0.32rem 0 0.4rem;
            .d-title {
              font-size: 0.426667rem;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
            .d-date {
              font-size: 0.32rem;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              padding: 0.133333rem 0;
            }
            .d-text {
              font-size: 0.293333rem;
              font-weight: 400;
              color: rgba(255, 181, 184, 1);
            }
            .huise {
              color: #8c8c8c;
            }
          }
          .a-ljsy {
            width: 1.6rem;
            height: 0.666667rem;
            background: rgba(255, 255, 255, 1);
            border-radius: 0.133333rem;
            font-size: 0.32rem;
            font-weight: 400;
            color: rgba(251, 38, 72, 1);
            text-align: center;
            line-height: 0.666667rem;
          }
          .tovoid {
            width: 1.8rem;
            height: 1.64rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}

.content {
  display: flex;
  width: 100%;
  background: #fff;
  height: 2.4rem;
  border-radius: 0.133333rem;
  overflow: hidden;
  margin-top: 0.2rem;
  .bro-img {
    width: 30%;
    height: 100%;
    padding-right: 0.266667rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .bro-right {
    width: 70%;
    padding-right: 0.3rem;
    .bro-title {
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(26, 5, 5, 1);
      margin: 0.3rem 0 0 0;
    }
    .bro-con {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .quanfanli {
        >>> .quan {
          font-size: 0.266667rem;
          .quan1 {
            width: 1.1rem;
            height: 0.6rem;
            line-height: 0.6rem;
          }
          .fanli {
            width: 1.32rem;
            height: 0.5rem;
            line-height: 0.55rem;
          }
        }
        .bro-money {
          margin: 0.3rem 0 0.2rem 0;
          span:first-child {
            font-size: 0.32rem;
            color: #fe5747;
          }
          span:last-child {
            font-size: 0.293333rem;
            color: #aeaeae;
            text-decoration: line-through;
          }
        }
        .bro-date {
          font-size: 0.32rem;
          font-weight: 400;
          color: rgba(203, 203, 203, 1);
        }
      }
      .bro-btn {
        width: 1.6rem;
        height: 0.666667rem;
        border: 1px solid rgba(174, 174, 174, 1);
        border-radius: 0.133333rem;
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(174, 174, 174, 1);
        text-align: center;
        line-height: 0.666667rem;
      }
    }
  }
}
.nodata {
  position: fixed;
  top: 5.2rem;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 3;
}
</style>