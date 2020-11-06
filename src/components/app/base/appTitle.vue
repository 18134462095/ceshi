<template>
  <div class="appTitle">
    <div class="placeholder" />
    <div class="titleName" :style="{background}">
      <van-icon class="backIcon" @click="$router.back()" name="arrow-left" />
      <p><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTitle',
  props: {
    background: {
      type: String,
      default: 'none'
    }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.appTitle {
  height: 40px;
  position: relative;
  z-index: 999;
  .placeholder {
    height: 100%;
  }
  .titleName {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    position: absolute;
    left: 0;right: 0;top: 0;
    text-align: center;
    transition: background .3s;
    .backIcon {
      line-height: 40px;
      padding: 0 20px;
      position: absolute;
      left: 0;top: 0;
    }
  }
}
</style>