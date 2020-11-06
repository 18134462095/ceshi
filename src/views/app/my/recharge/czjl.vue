<template>
  <div class="record">
    <div class="tabbar">
      <app-title style="color:#1D0707;">充值记录</app-title>
    </div>
    <!-- <van-icon name="search" color="#190505" size="20" class="my-icon" /> -->
    <!-- <img src="@/assets/my/sousuo_hei.png" alt class="my-icon" /> -->

    <div class="content">
      <div v-if="$route.query.act==0">
        <nodata v-if="lengths==0"></nodata>
        <div v-else>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              offset="200"
            >
              <czjilu :nametitle="title1" v-for="item in datalist" :key="item.order" :data="item"></czjilu>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
      <div v-if="$route.query.act==1">
        <nodata v-if="lengths2==0"></nodata>
        <div v-else>
          <van-pull-refresh v-model="refreshing2" @refresh="onRefresh2">
            <van-list
              v-model="loading2"
              :finished="finished2"
              finished-text="没有更多了"
              @load="onLoad2"
              offset="200"
            >
              <zhijiecz v-for="i in datalist2" :key="i.id" :data2="i"></zhijiecz>
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
  data() {
    return {
      lengths: null,
      datalist: [],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      title1: "充值卡充值",
      //直接充值
      datalist2: [],
      pageIndex2: 0,
      loading2: false,
      finished2: false,
      refreshing2: false,
      lengths2: null,
    };
  },
  created() {
  },
  methods: {
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
    //充值卡充值
    getUseCardList() {
      this.$api.app.my
        .getUseCardList({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          if (res.code == 200) {
            this.lengths = res.data.totalSize;
            res.data.content.forEach((i) => {
              this.datalist.push(i);
              i.createTime = this.formatDate(i.createTime);
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
      this.getUseCardList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.datalist = [];
      this.onLoad();
    },

    //直接充值
    getChargeList() {
      this.$api.app.my
        .getChargeList({
          pageIndex: this.pageIndex2,
        })
        .then((res) => {
          if (res.code == 200) {
            this.lengths2 = res.data.totalSize
            res.data.content.forEach((i) => {
              i.payTime = this.formatDate(i.payTime);
              i.createTime = this.formatDate(i.createTime);
              this.datalist2.push(i);
            });
            // console.log(this.datalist2,"2")
            this.loading2 = false;
            this.refreshing2 = false;
            if (res.data.content.length < 10) {
              this.finished2 = true;
            }
          } else {
            this.Toast.fail("获取信息失败");
            this.loading2 = false;
            this.pageIndex2--;
          }
        });
    },
    onLoad2() {
      this.loading2 = true;
      this.pageIndex2++;
      this.getChargeList();
    },
    onRefresh2() {
      this.finished2 = false;
      this.refreshing2 = true;
      this.pageIndex2 = 0;
      this.datalist2 = [];
      this.onLoad2();
    },
  },
};
</script>

<style lang="scss" scoped>
.record {
  position: relative;
  overflow: hidden;
  height: 100vh;
  .tabbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
  }
  .my-icon {
    width: 13px;
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 2020;
  }

  .content {
    height: calc(100% - 40px);
    overflow-y: scroll;
    margin-top: 40px;
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