<template>
  <div class="commTabs">
    <van-tabs
      v-model="active"
      sticky
      background="#f3f3f4"
      swipeable
      title-active-color="#1A0505"
      color="#FB2148"
      class="tab"
      :ellipsis="false"
      v-if="tabs.length"
      @change="vantab"
      duration="0.15"
    >
      <van-tab v-for="(i,index) in tabs" :key="index" :title="i.title" :name="index">
        <div class="content conwidth">
          <div style="overflow-y: visible">
            <van-pull-refresh v-model="refreshing[index]" @refresh="onRefresh(index)">
              <div class="nodata">
                <nodata :fun="onRefresh" :index="index" v-if="loadData[index]&&loadData[index].length == 0"></nodata>
              </div>
              <van-list
                offset="1000"
                v-model="loading[index]"
                :finished="finished[index]"
                finished-text="没有更多了"
                @load="onLoad"
                :error.sync="error[index]"
              >
                <!-- <index-list v-if="loadData[index] && loadData[index].length" :list="loadData[index]" :key="i.name + key"></index-list> -->
                <commodity
                  v-if="loadData[index] && loadData[index].length"
                  :commodityList="loadData[index]"
                ></commodity>
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
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Sigintabs",
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
    return {
      active: "rec",
      key: 0,
      loadData: {},
      refreshing: {},
      loading: {},
      finished: {},
      refreshing: {},
      pageNo: {},
      saveScroll: {},
      error: {},
    };
  },
  methods: {
    clickdock(i) {},
    vantab(e, s) {
      if (this.loadData[e] && this.loadData[e].length) {
      } else {
        this.goodsLoad(e);
      }
    },
    goodsLoad(index) {
      this.$api.app.taobao
        .dgOptimusMaterial({
          materialId: this.tabs[index].value,
          pageNo: this.pageNo[index],
          deviceType,
        })
        .then((res) => {
          if (res.code == 200) {
            this.addData(index, res.data);
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
      if (data.length < 20) {
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
      this.onLoad(index);
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
    this.goodsLoad(0);
  },
};
</script>

<style scoped lang="scss">
.commTabs {
  //   flex: 1;
  //   height: calc(100% - 44px);
  .tab {
    height: 100%;
    >>> .van-tab {
      color: #adadad;
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
          background: linear-gradient(-90deg, rgba(243, 243, 244, 1),  rgba(243, 243, 244, 0));
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