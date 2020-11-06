<template>
  <div class="commTabs">
    <app-title>我的订单</app-title>
    <div class="conwidth">
      <div class="padd20">
        <van-tabs
          v-model="active"
          sticky
          background="none"
          swipeable
          class="tab"
          :ellipsis="false"
          v-if="tabs.length"
          @click="tabsChange"
        >
          <van-tab v-for="(i,index) in tabs" :key="index" :title="i.title" :name="i.value">
            <div class="content conwidth">
              <div style="overflow-y: visible">
                <van-pull-refresh v-model="refreshing[index]" @refresh="onRefresh(index)">
                  <van-list
                    offset="1000"
                    v-model="loading[index]"
                    :finished="finished[index]"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :error.sync="error[index]"
                  >
                    <!-- <order-list :list="list"></order-list> -->
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
  </div>
</template>

<script>
export default {
  name: "order",
  // props: {
  //   name: {
  //     type: String,
  //     defualt: "name",
  //   },
  //   tabs: {
  //     type: Array,
  //     default() {
  //       return [];
  //     },
  //   },
  // },
  data() {
    return {
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
      active: '',
      key: 0,
      loadData: {},
      refreshing: {},
      loading: {},
      finished: {},
      // refreshing: {},
      pageNo: {
        pageNum:0
      },
      saveScroll: {},
      error: {},
      zhangtype: "",
    };
  },
  mounted(){
    this.onLoad()
  },
  methods: {
    tabsChange(name,title){
      this.zhangtype = name
      this.goodsLoad(name)
    },
    goodsLoad(index) {
      let type = this.$route.query.dockingType;
      this.$api.app.home
        .getMemberOrder(
          this.pageNo.pageNum,
          type,
          this.zhangtype
        )
        .then((res) => {
          if (res.code == 200) {
            this.addData(index, res.data.content);
            this.error[index] = false;
          } else {
            this.Toast.fail("获取信息失败");
            this.loading[index] = false;
            this.error[index] = true;
            this.pageNo.pageNum--;
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
      tbs.scrollTop -= 0.1
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
      this.pageNo.pageNum++;
      this.goodsLoad(index);
    },
    onRefresh(index) {
      this.$set(this.loading, index, true);
      this.$forceUpdate();
      this.pageNo.pageNum = 0;
      this.onLoad(index);
    },
  },
  beforeMount() {
    this.tabs.forEach((i, index) => {
      this.loading[index] = false;
      this.finished[index] = false;
      this.refreshing[index] = false;
      this.error[index] = false;
      this.pageNo.pageNum = 0;
    });
  },
};
</script>

<style scoped lang="scss">
.commTabs {
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
    >>> .van-tabs__wrap::after {
      border-width: 0 !important;
    }
    .van-tabs__wrap::before {
        content: '';
        position: absolute;
        height: 44px;
        width: 1.6rem;
        background: linear-gradient(-90deg, #fb2148, rgba(251,33,72,0));
        z-index: 10;
        right: 0;
        pointer-events: none;
      }
    >>> .van-tabs__content {
      height: calc(100% - 44px);
      position: relative;
    }
    >>> .van-tab__pane {
      height: 100%;
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
}
</style>