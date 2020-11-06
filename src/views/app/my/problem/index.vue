<template>
  <div class="problem">
    <app-title>常见问题</app-title>
    <nodata v-if="lengths==0"></nodata>
    <div v-else class="content">
    <!-- <div class="content"> -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="200"
        >
          <!-- <div v-for="(item,index) in data" :key="index">{{item.question}}</div> -->
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item
              v-for="(item,index) in data"
              :title="item.question"
              :name="index"
              :key="index"
            >{{item.answer}}</van-collapse-item>
          </van-collapse>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
export default {
  name: "Problem",
  data() {
    return {
      activeName: "1",
      data: [],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      lengths: null,
    };
  },
  mounted() {
    
    this.getProblems();
  },
  methods: {
    getProblems() {
      this.$api.app.my
        .getProblems({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          if (res.code == 200) {
            this.lengths = res.data.totalSize;
            res.data.content.forEach((i) => {
              this.data.push(i);
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
      this.getProblems();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.data = [];
      this.onLoad();
    },
  },
};
</script>
<style lang="scss" scoped>
.problem {
  width: 100%;
  height: 100vh;
  position: relative;
  .content {
    width: 9.16rem;
    margin: 0 auto;
    margin-top: 30px;
    max-height: calc(100% - 74px);
    border-radius: 0.133333rem;
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