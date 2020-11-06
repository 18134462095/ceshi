<template>
  <div class="mapview">
    <app-title>导航</app-title>
    <!-- <div class="wh">
      <div class="fanhui" @click="$router.back()">
        <img src="@/assets/app/header-back.png" alt="" />
      </div>
    </div> -->
    <iframe id="iframe" :src="url" scrolling="no" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  created() {
    // console.log(this.$route.query);
    let query = this.$route.query;
    this.url = `https://gaode.com/dir?from%5Bname%5D=${query.qdaddress}&from%5Blnglat%5D=${query.qdlng +','+ query.qdlat}&to%5Bname%5D=${query.zdaddress}&to%5Blnglat%5D=${query.zdlng + ',' + query.zdlat}&policy=1&type=car`;

    // var iframe = document.querySelector(".pg-navigation");
    // var body = iframe.contentWindow.document.body;
    // console.log( this.url, "_iframe");
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.mapview {
  width: 100%;
  height: 100vh;
  background: #ffffff;
  iframe {
    width: 100%;
    height: calc(100% - 40px);
  }
  .wh {
    width: 1.8rem;
    height: 45px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .fanhui {
    width: 12px;
    height: 19px;
    position: absolute;
    left: 19px;
    top: 13px;
    img {
      // line-height: 40px;
      // padding: 0 20px;
      // position: absolute;
      // left: 0;
      // top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>