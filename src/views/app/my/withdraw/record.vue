<template>
  <div class="record">
    <div class="tabbar">
      <app-title style="color: #1d0707">提现记录</app-title>
    </div>
    <div v-if="$store.getters.info.id == 11">
      <txjilu v-for="item in jiadatalist" :key="item.order" :data="item"></txjilu>
    </div>
    <!-- <div> -->
      <!-- <nodata v-if="lengths == 0"></nodata> -->
      <div v-else class="content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="200"
          >
            <nodata v-if="lengths==0"></nodata>
            <txjilu
              v-for="item in datalist"
              :key="item.order"
              :data="item"
            ></txjilu>
          </van-list>
        </van-pull-refresh>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      jiadatalist:[
        {
          orderName:'佣金提现',
          status:{title:'成功'},
          zfbAccount:"6256125356622",
          cashTime:1603706536000,
          cashOutTradeNo:'CASH564156341',
          outAmmount:156.61
        },
        {
          orderName:'佣金提现',
          status:{title:'成功'},
          zfbAccount:"6256125356622",
          cashTime:1601100548000,
          cashOutTradeNo:'CASH562236958',
          outAmmount:172
        }
      ],
      datalist: [],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      lengths: null,
    };
  },
  created() {},
  methods: {
    getCashOutList() {
      this.$api.app.settle
        .getCashOutList({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          if (res.code == 200) {
            this.lengths = res.data.totalSize;
            res.data.content.forEach((i) => {
              this.datalist.push(i);
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
      this.getCashOutList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.datalist = [];
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.record {
  position: relative;
  height: 100vh;
  .tabbar {
    position: relative;
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