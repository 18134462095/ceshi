<template>
  <div class="order">
    <div class="header">
      <app-title class="apptitle">订单</app-title>
    </div>
    <div class="commTabs">
      <van-tabs
        duration="0.15"
        v-model="active"
        sticky
        background="none"
        swipeable
        title-active-color="#FE5848"
        color="#FE5848"
        class="tab"
        :ellipsis="false"
        v-if="tabs.length"
      >
        <van-tab
          v-for="(i, index) in tabs"
          :key="index"
          :title="i.title"
          :name="index"
        >
          <div class="content conwidth">
            <div style="overflow-y: visible">
              <van-pull-refresh
                v-model="refreshing[index]"
                @refresh="onRefresh(index)"
              >
                <div class="nodata">
                  <nodata
                    v-if="loadData[index] && loadData[index].length == 0"
                  ></nodata>
                </div>
                <van-list
                  offset="1000"
                  v-model="loading[index]"
                  :finished="finished[index]"
                  finished-text="没有更多了"
                  @load="onLoad"
                  :error.sync="error[index]"
                >
                  <order-list
                    v-if="loadData[index] && loadData[index].length"
                    :list="loadData[index]"
                    :key="i.name + key"
                  ></order-list>
                  <template class="errBox" #error>
                    <p @click="onLoad">加载失败</p>
                  </template>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      activetype: 0,
      lengths: 0,
      active: 0,
      key: 0,
      loadData: {},
      refreshing: {},
      loading: {},
      finished: {},
      // refreshing: {},
      commodityList: [],
      hist: true,
      pageNo: {},
      saveScroll: {},
      error: {},
      sort: null,
      dingtypetab: "",
      name: {
        type: String,
        defualt: "name",
      },
      orderList: [
        {
          img: require("@/assets/my/taobao.png"),
          name: "淘宝订单",
          type: "TB",
        },
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
      ],
      tabs: [
        {
          title: "全部",
          value: "",
        },
        {
          title: "即将到账",
          value: "COMING_SOON",
        },
        {
          title: "已到账",
          value: "HAS_ARRIVED",
        },
        {
          title: "已失效",
          value: "FAIL",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    tabs2click() {
      // this.onLoad()
    },
    tabsdingclick(type) {
      // console.log(type,'type')
      if (type == 0) {
        this.dingtypetab = "TB";
      } else if (type == 1) {
        this.dingtypetab = "PDD";
      } else if (type == 2) {
        this.dingtypetab = "JD";
      }
      this.onLoad();
    },
    goodsLoad(index) {
      this.$api.app.home
        .getMemberOrder({
          status: this.tabs[index].value,
          // dockingType: this.dingtypetab,
          dockingType: this.$route.query.dockingType,
          pageIndex: this.pageNo[index],
        })
        .then((res) => {
          if (res.code == 200) {
            this.addData(index, res.data.content);
            this.error[index] = false;
          } else {
            this.Toast.fail("获取信息失败");
            this.loading[index] = false;
            this.error[index] = true;
            this.pageNo[index]--;
            this.key++;
            this.$forceUpdate();
          }
        });
    },
    addData(index, data) {
      let idx = this.active;
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
      if (data.length < 10) {
        this.$set(this.finished, index, true);
      }
      data.forEach((i) => {
        this.loadData[index].push(i);
      });
      this.$set(this.loading, index, false);
      this.$set(this.refreshing, index, false);
      this.$nextTick(() => {
        this.key++;
        this.$forceUpdate();
      });
      // this.lengths = this.loadData[index].length;
    },
    onLoad() {
      let index = this.active;
      this.loading[index] = true;
      this.error[index] = false;
      this.$forceUpdate();
      this.pageNo[index]++;
      this.goodsLoad(index);
    },
    onRefresh(index) {
      this.$set(this.loading, index, true);
      this.$forceUpdate();
      this.pageNo[index] = 0;
      this.onLoad();
    },
  },
  beforeMount() {
    this.tabs.forEach((i, index) => {
      this.loading[index] = false;
      this.finished[index] = false;
      this.refreshing[index] = false;
      this.error[index] = false;
      this.pageNo[index] = 0;
    });
    // this.goodsLoad(0);
  },
};
</script>

<style lang="scss" scoped>
.order {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    // background: $lineBg;
    padding-bottom: 45px;
    margin-bottom: -50px;
  }
  .commTabs {
    flex: 1;
    height: calc(100% - 40px);
    .tab {
      height: 100%;
      >>> .van-tab {
        color: #1a0505;
        font-size: 0.373333rem;
      }
      >>> .van-tab--complete {
        text-align: center;
        padding: 0 15px;
      }
      >>> .van-tabs__wrap::after {
        border-width: 0 !important;
      }
      >>> .van-tabs__content {
        height: calc(100% - 50px);
        position: relative;
        z-index: 2;
      }
      >>> .van-tab__pane {
        height: 100%;
      }
      .content {
        height: calc(100% - 6px);
        margin-top: 6px;
        overflow-y: scroll;
        // padding: 0 20px;
        .bannerwrap {
          width: 100%;
          height: 4rem;
          margin: 0.2rem auto;
          border-radius: 5px;
          overflow: hidden;
          .bannerslide {
            height: 100%;
            background: #fff;
          }
        }
      }
      .list1 {
        padding: 0;
        padding-bottom: 0.3rem;
        background: none;
      }
    }
    .loadingBox {
      text-align: center;
      padding-top: 80px;
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
}
</style>