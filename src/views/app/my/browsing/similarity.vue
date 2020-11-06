<template>
  <div class="similarity">
    <app-title>相似推荐</app-title>
    <div class="liebiao" @scroll="conScroll($event)">
      <commodity v-if="datalist" :commodityList="datalist"></commodity>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: [],
    };
  },
  mounted() {
    let type = this.$route.params.type;
    let Id = this.$route.params.id;
    switch (type) {
      case "JD":
        this.$api.app.jingdong.jdSimilarRecommend(Id).then((res) => {
          this.datalist = res.data;
        });
        break;
      case "TB":
        this.$api.app.taobao
          .dgOptimusMaterial({
            materialId: "13256",
            deviceType,
            itemId: Id,
          })
          .then((res) => {
            this.datalist = res.data;
          });
        break;
      case "TM":
        this.$api.app.taobao
          .dgOptimusMaterial({
            materialId: "13256",
            deviceType,
            itemId: Id,
          })
          .then((res) => {
            this.datalist = res.data;
          });
        break;
      default:
        break;
    }
  },

  activated() {
    let tbs = document.querySelectorAll(".liebiao")[0];
    tbs.scrollTop = this.saveScroll;
  },
  methods: {
    conScroll(e) {
      this.saveScroll = e.target.scrollTop;
    },
  },
  beforeRouteLeave (to, from, next) {
    let keepAlive = to.name == 'Detail'
    this.$route.meta.keepAlive = keepAlive
    if (!keepAlive && this.$vnode.parent) {
      this.$vnode.parent.componentInstance.cache = {}
      this.$vnode.parent.componentInstance.key = []
    }
    this.$forceUpdate()
    this.$nextTick(() => {
      next()
    })
  }
};
</script>

<style lang="scss" scoped>
.similarity {
  width: 100%;
  height: 100vh;

  .liebiao {
    width: 9.2rem;
    margin: 0 auto;
    overflow-y: scroll;
    // margin-top: 40px;
    height: calc(100% - 40px);
  }
}
</style>