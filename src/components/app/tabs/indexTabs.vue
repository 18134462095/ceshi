<template>
  <div class="indexTabs">
    <van-tabs
      v-model="active"
      sticky
      background="none"
      swipeable
      title-active-color="#fff"
      color="#fff"
      class="tab"
      :ellipsis="false"
      v-if="tabs.length"
      duration="0.15"
    >
      <van-tab title="推荐" name="rec">
        <!--  @scroll="conScroll(active, $event)" -->
        <div class="content conwidth" @scroll="conScroll(active, $event)">
          <div style="overflow-y: visible">
            <van-pull-refresh
              v-model="refreshing.rec"
              @refresh="onRefresh('rec')"
            >
              <div
                v-swiper:indexBanner="bannerOption"
                v-if="indexCarousel.length"
                class
              >
                <div class="swiper-wrapper bannerwrap">
                  <div
                    class="swiper-slide bannerslide"
                    :key="jj.id"
                    v-for="jj in indexCarousel"
                  >
                    <img
                      @click="swiperclick(jj.url, jj.urlType)"
                      :src="jj.img"
                      alt
                    />
                  </div>
                </div>
                <div
                  class="swiper-pagination bannerPagin"
                  v-if="indexCarousel.length > 1"
                ></div>
              </div>
              <div class="NoticeBar">
                <van-notice-bar left-icon="volume-o" :scrollable="false">
                  <!-- <template>
                    <img src="@/assets/backtop.png" alt="">
                  </template> -->
                  <van-swipe
                    vertical
                    class="notice-swipe"
                    :autoplay="3000"
                    :show-indicators="false"
                  >
                    <van-swipe-item v-for="i in noticeList" :key="i">{{
                      i
                    }}</van-swipe-item>
                    <!-- <van-swipe-item v-for="i in noticeList" :key="i.tip">{{i.tip}}</van-swipe-item> -->
                  </van-swipe>
                </van-notice-bar>
              </div>
              <div class="appgw">
                <div
                  class="windth25"
                  v-for="i in docylist"
                  :key="i.value"
                  @click="clickdock(i)"
                >
                  <div class="img">
                    <img
                      class="firstimg"
                      :src="require('@/assets/my/' + i.name + '.png')"
                      alt
                    />
                  </div>
                  <p>{{ i.title }}</p>
                </div>
              </div>
              <btn-swiper
                v-if="list1.length"
                :list="list1"
                img="icon"
                name="title"
                router="url"
              ></btn-swiper>

              <tuiswiper @toHot="toHot"></tuiswiper>
              <van-list
                offset="600"
                v-model="loading['rec']"
                :finished="finished['rec']"
                finished-text="没有更多了"
                @load="onLoad"
                :error.sync="error.rec"
              >
                <index-list
                  :list="loadData.rec"
                  :key="'rec' + key"
                ></index-list>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
      </van-tab>

      <van-tab
        v-for="(i, index) in tabs"
        :key="index"
        :title="i.name"
        :name="index"
      >
        <!--  @scroll="conScroll(active, $event)" -->
        <div class="content conwidth" @scroll="conScroll(active, $event)">
          <div style="overflow-y: visible">
            <van-pull-refresh
              v-model="refreshing[index]"
              @refresh="onRefresh(index)"
            >
              <van-list
                offset="300"
                v-model="loading[index]"
                :finished="finished[index]"
                finished-text="没有更多了"
                @load="onLoad"
                :error.sync="error[index]"
              >
                <index-list
                  v-if="loadData[index] && loadData[index].length"
                  :list="loadData[index]"
                  :key="i.name + key"
                ></index-list>
                <template class="errBox" #error>
                  <p @click="onLoad">加载失败</p>
                </template>
                <!-- <div class="loadingBox" v-else>
                  <van-loading size="24px">加载中...</van-loading>
                </div>-->
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
      </van-tab>
      <img
        class="gotop"
        v-if="saveScroll[active] > 200"
        @click="goTop"
        src="@/assets/backtop.png"
        alt
      />
    </van-tabs>
  </div>
</template>

<script>
import { NoticeBar } from "vant";
export default {
  name: "IndexTabs",
  props: {
    name: {
      type: String,
      defualt: "name",
    },
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    let _this = this;
    return {
      kgcss: {
        width: "30px",
        height: "30px",
      },
      active: "rec",
      loadData: {},
      indexCarousel: [],
      key: 0,
      refreshing: {
        rec: false,
      },
      loading: {
        rec: false,
      },
      finished: {
        rec: false,
      },
      refreshing: {
        rec: false,
      },
      pageNo: {
        rec: 0,
      },
      error: {
        rec: false,
      },
      saveScroll: {},
      scroll: null,
      bannerOption: {
        touchMoveStopPropagation: true,
        preventClicksPropagation: false,
        effect: "fade",
        loop: false,
        autoplay: {
          delay: 6000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        // on: {
        // tap: function (swiper,event) {
        // console.log(swiper,event,'swiperswiper');
        // _this.tiaozhuan(this.clickedIndex)
        // },
        // },
      },
      list1: [],
      lengths1: null,
      lengths2: null,
      docylist: null,
      noticeList: null,
    };
  },
  mounted() {
    this.docylist = this.$store.getters.dockType;
    this.noticefun();
  },
  methods: {
    noticefun() {
      this.$api.app.home.getRollMessage().then((res) => {
        this.noticeList = res.data;
      });
    },
    toHot(params) {
      this.$router.push({
        name: "Detail",
        params,
      });
    },
    swiperclick(url, type) {
      switch (type) {
        case 0:
          // this.$router.push(g.url);
          break;
        case 1:
          this.$router.push({ name: url });
          break;
        case 2:
          // this.openWeb(g.url, g.id);
          plus.runtime.openWeb(url);
          break;
        case 3:
          // plus.runtime.openWeb(url);
          this.openWeb(url, 6);
          break;
        case 4:
          plus.runtime.openURL(url);
          // window.location.href=url;
          break;
        case undefined:
          break;
      }
    },
    openWeb(url, id) {
      let that = this;
      // console.log(url, id, "urlid");
      let nw = plus.webview.create(url, id, {
        titleNView: {
          buttons: [
            {
              type: "back",
              onclick: function (event) {
                nw.canBack(function (e) {
                  // console.log("是否可返回：" + e.canBack);
                  if (e.canBack) {
                    nw.back();
                  } else {
                    nw.close();
                  }
                });
              },
              float: "left",
            },
            {
              type: "close",
              onclick: function () {
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
              nw.back();
            } else {
              nw.close();
            }
          });
        },
        false
      );
      let referer = "http://tq.jfshou.cn/";
      nw.overrideUrlLoading(
        {
          match: /^weixin:\/\/|^alipays:\/\/|^https:\/\/wx.tenpay.com/,
          // match:indexOf('weixin://') == 0
        },
        function (e) {
          // console.log(e.url, "e");
          let url = e.url;
          // if (url.match(/^weixin:\/\/|^alipays:\/\//)==true) {
          if (url.indexOf("weixin://") == 0) {
            plus.runtime.openURL(url);
          } else if (url.indexOf("https://wx.tenpay.com") == 0) {
            plus.webview.create(url, id, {
              additionalHttpHeaders: { Referer: referer },
            });
          } else {
            that.openWeb(url);
            // location.href = url
            // plus.webview.open(url)
          }
        }
      );
      nw.show();
    },
    // tiaozhuan(clickedIndex){
    //   let index =clickedIndex%this.indexCarousel.length;
    //   let g = this.indexCarousel[index];
    //   console.log(g,'clickedIndex');
    //   switch (g.urlType) {
    //     case 0:
    //       break;
    //     case 1:
    //       this.$router.push({name:g.url});
    //       break;
    //     case 2:
    //       plus.runtime.openWeb(g.url)
    //       break;
    //     case 3:
    //       plus.runtime.openWeb(g.url)
    //       break;
    //     case undefined:

    //       break;
    //   }
    // },

    clickdock(i) {
      let name = i.name != "TM" ? i.name : "TB";
      this.$router.push({
        name,
        query: {
          type: i.name,
        },
      });
    },
    conScroll(index, e) {
      // let save = this.saveScroll[index] || 0;
      // let direction = e.target.scrollTop - save > 0;
      // let num = Math.abs(e.target.scrollTop - save);
      // if (direction) {
      //   if (num > 15 ) this.$parent.hideTop = true;
      // } else {
      //   if ((num > 15 && e.target.scrollTop < 70) || e.target.scrollTop == 0) this.$parent.hideTop = false;
      // }
      this.saveScroll[index] = e.target.scrollTop || 0;
      this.$forceUpdate();
    },
    recLoad() {
      this.$store.getters.tbwl.forEach((i) => {
        if (i.title == "猜你喜欢") {
          this.$api.app.taobao
            .dgOptimusMaterial({
              materialId: i.value,
              pageNo: this.pageNo.rec,
              deviceType,
            })
            .then((res) => {
              if (res.code == 200) {
                this.lengths1 = res.data.length;
                this.addData("rec", res.data);
              } else {
                this.Toast.fail("获取信息失败");
                this.loading[index] = false;
                this.error[index] = true;
                this.pageNo[index]--;
                this.$forceUpdate();
              }
            });
        }
      });
    },
    goodsLoad(index) {
      this.$api.app.taobao
        .materialOptional({
          cat: this.tabs[index].tbCid,
          ip: returnCitySN.cip,
          hasCoupon: true,
          pageNo: this.pageNo[index],
          deviceType,
        })
        .then((res) => {
          if (res.code == 200) {
            this.lengths = res.data.length;
            this.addData(index, res.data);
          } else {
            this.Toast.fail("获取信息失败");
            this.loading[index] = false;
            this.error[index] = true;
            this.pageNo[index]--;
            this.$forceUpdate();
          }
        });
    },
    addData(index, data) {
      let idx = typeof this.active == "number" ? this.active + 1 : 0;
      let tbs = document
        .querySelectorAll(".van-tab__pane")
        [idx].querySelector(".content");
      tbs.scrollTop -= 0.1;
      if (this.refreshing[index]) {
        this.loadData[index] = [];
        this.refreshing[index] = false;
      }
      if (this.loadData[index] == null) {
        this.loadData[index] = [];
      }
      if (data.length < 20) {
        this.$set(this.finished, index, true);
      }
      data.forEach((i) => {
        this.loadData[index].push(i);
      });
      this.$set(this.loading, index, false);
      this.$set(this.refreshing, index, false);
      this.key++;
      this.$forceUpdate();
    },
    onLoad() {
      let index = this.active;
      this.loading[index] = true;
      this.error[index] = false;
      this.$forceUpdate();
      this.pageNo[index]++;
      if (index == "rec") {
        this.recLoad();
      } else {
        this.goodsLoad(index);
      }
    },
    onRefresh(index) {
      this.$set(this.loading, index, true);
      this.finished[index] = false;
      this.$forceUpdate();
      this.pageNo[index] = 0;
      this.onLoad(index);
    },
    goTop() {
      let index = typeof this.active == "number" ? this.active + 1 : 0;
      let tbs = document
        .querySelectorAll(".van-tab__pane")
        [index].querySelector(".content");
      tbs.scrollTop = 0;
    },
  },
  activated() {
    let index = typeof this.active == "number" ? this.active + 1 : 0;
    let tbs = document
      .querySelectorAll(".van-tab__pane")
      [index].querySelector(".content");
    tbs.scrollTop = this.saveScroll[this.active];
  },
  beforeMount() {
    this.tabs.forEach((i, index) => {
      this.loading[index] = false;
      this.finished[index] = false;
      this.refreshing[index] = false;
      this.pageNo[index] = 0;
      this.error[index] = false;
    });
    this.$api.app.home.getCarousels().then((res) => {
      // console.log(res,'swiper')
      if (res.code == 200) {
        this.indexCarousel = res.data;
      } else {
        this.Toast.fail("获取首页活动失败");
      }
    });
    console.log(isiOS);
    if (isiOS) {
      this.$api.app.home
        .getMenuList({
          type: "ios",
        })
        .then((res) => {
          // console.log(res.data, "url");
          if (res.code == 200) {
            this.list1 = res.data;
          } else {
            this.Toast.fail("获取首页菜单失败");
          }
        });
    } else {
      this.$api.app.home
        .getMenuList({
          type: "android",
        })
        .then((res) => {
          console.log(res.data, "url");
          if (res.code == 200) {
            this.list1 = res.data;
          } else {
            this.Toast.fail("获取首页菜单失败");
          }
        });
    }
  },
};
</script>

<style scoped lang="scss">
.indexTabs {
  flex: 1;
  height: 0;
  .tab {
    height: 100%;
    >>> .van-tab {
      color: #fcd0d0;
      font-size: 0.373333rem;
    }
    >>> .van-tab--complete {
      text-align: center;
      padding: 0 15px;
    }
    >>> .van-tab--active {
      font-size: 0.48rem;
    }
    >>> .van-tabs__wrap::after {
      border-width: 0 !important;
    }
    >>> .van-tabs__content {
      height: calc(100% - 44px);
      position: relative;
    }
    >>> .van-tab__pane {
      height: 100%;
    }
    >>> .van-sticky {
      .van-tabs__wrap {
        &::before {
          content: "";
          position: absolute;
          height: 44px;
          width: 1.6rem;
          background: linear-gradient(-90deg, #fb2148, rgba(251, 33, 72, 0));
          z-index: 10;
          right: 0;
          pointer-events: none;
        }
        .van-tabs__nav {
          padding: 0;
          margin-left: $blank;
          margin-right: $blank;
          padding-bottom: 15px;
          .van-tab {
            padding: 0 4px;
          }
        }
      }
    }
    .content {
      height: calc(100% - 6px);
      margin-top: 6px;
      overflow-y: scroll;
      padding: 0 $blank;
      .bannerPagin {
        bottom: 0.24rem;
        >>> .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.49;
          width: 0.133333rem;
          height: 0.133333rem;
          border-radius: 0.066667rem;
          transition: all 0.2s;
          margin: 0 0.066667rem;
          &.swiper-pagination-bullet-active {
            opacity: 1;
            width: 0.4rem;
          }
        }
      }
      .bannerwrap {
        width: 100%;
        height: 3.6rem;
        margin: 0.2rem auto;
        border-radius: 5px;
        overflow: hidden;
        .bannerslide {
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }
        }
      }
    }
    .NoticeBar {
      margin: 0.15rem 0;
      border-radius: 0.266667rem;
      overflow: hidden;
      .notice-swipe {
        height: 40px;
        line-height: 40px;
        font-size: 0.32rem;
      }
      >>> .van-notice-bar {
        background-color: #bfbfbe21;
        color: #000;
        .van-icon {
          color: #ef4757;
        }
      }
      >>> .van-swipe-item {
        // width: 50%;
      }
    }
    .appgw {
      display: flex;
      align-items: center;
      .windth25 {
        flex: 1;
        text-align: center;
        .img {
          position: relative;
          width: 1.7rem;
          height: 1.7rem;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
          .firstimg {
            position: relative;
            z-index: 1;
          }
          .aboimg {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            filter: blur(5px);
          }
        }
        p {
          margin-top: 0.1rem;
          font-size: 0.4rem;
        }
      }
    }
    .list1 {
      margin: 0;
      background: none;
    }
  }
  .loadingBox {
    text-align: center;
    padding-top: 80px;
  }
  .gotop {
    cursor: pointer;
    position: fixed;
    right: 36px;
    bottom: 110px;
    width: 38px;
    height: 38px;
    z-index: 10;
  }
}
</style>