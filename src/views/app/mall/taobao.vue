<template>
  <div class="taobao">
    <div class="header">
      <app-title class="apptitle">{{
        $route.query.type == "TB" ? "淘宝" : "天猫"
      }}</app-title>
      <div @click="$router.push('search')" class="conSearch hideTop">
        <div class="inner">
          <!-- <van-icon name="search" class="searIcon" /> -->
          <img src="@/assets/my/sousuo.png" class="searIcon" alt="" />
          <span>复制商品链接或商品标题</span>
          <button>搜优惠</button>
        </div>
      </div>
    </div>
    <threetabs ref="tab" v-if="tabs.length" :tabs="tabs" name="name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [],
    };
  },
  beforeMount() {
    this.$api.app.taobao
      .getTbProductCate()
      .then((res) => {
        this.tabs = res.data;
      })
      .catch((err) => {});
  },
  methods: {
    apis(index) {
      let sort = this.$refs.tab.sort != null ? this.$refs.tab.sort.name : null;
      return this.$api.app.taobao.materialOptional({
        cat: this.$refs.tab.tabs[index].tbCid,
        ip: returnCitySN.cip,
        hasCoupon: true,
        pageNo: this.$refs.tab.pageNo[index],
        sort,
        deviceType,
        isTmall: this.$route.query.type == "TM",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.taobao {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.conSearch {
  height: 35px;
  margin: 9px 20px;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
  &.hideTop {
    // padding-right: 1rem;
  }
  .inner {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    color: #cdcdcd;
    font-size: 14px;
    align-items: stretch;
    .searIcon {
      width: 12px;
      align-self: center;
      margin: 0 10px;
    }
    span {
      flex: 1;
      align-self: center;
      font-size: 12px;
    }
    button {
      background: linear-gradient(-60deg, #fb2148, #fe5747);
      outline: none;
      border: none;
      color: #fff;
      border-radius: 5px;
      margin: 3px;
      padding: 0 15px;
    }
  }
}
.header {
  width: 100%;
  background: $lineBg;
  padding-bottom: 45px;
  margin-bottom: -50px;
  .apptitle {
    color: #fff;
  }
}
</style>