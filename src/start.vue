<template>
  <div class="box">
    <van-swipe class="van-swipe" @change="onChange" :loop="false">
      <van-swipe-item>
        <img src="@/assets/yindao1.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/yindao2.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/yindao3.jpg" alt />
        <!-- <button class="ksty" @click="gotoindex">开始体验</button> -->
        <!-- 这里不要了  别放开了 -->
      </van-swipe-item>
    </van-swipe>
    <button class="tiaoguo" @click="gotoindex">跳过</button>
  </div>
</template>

<script>
export default {
  name: "Start",
  data() {
    return {};
  },
  methods: {
    gotoindex() {
      // 引导页面
      (localStorage.start = "0"), this.$router.push({ name: "AppIndex" });
    },
    onChange(index) {},
  },
};
</script>

<style lang="scss" scoped>
.box {
  // width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  >>> .van-swipe {
    height: 100%;
  }
  .van-swipe-item {
    position: relative;
    height: 100%;
    img {
      width: 100%;
      // height: 100%;
    }
    .ksty {
      width: 6.666667rem;
      height: 1.2rem;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      font-size: 0.346667rem;
      z-index: 2;
      border: none;
      position: absolute;
      top: 70vh;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
>>> .van-swipe__indicator {
  background: #8c8c8c;
  // opacity: 0.49;
  width: 0.133333rem;
  height: 0.133333rem;
  border-radius: 0.066667rem;
  transition: all 0.2s;
  margin: 0 0.066667rem;
  &.van-swipe__indicator--active {
    // opacity: 1;
    background: #ef5757;
    width: 0.4rem;
  }
}
.tiaoguo {
  position: absolute;
  top: 0.6rem;
  right: 0.666667rem;
  width: 1.466667rem;
  height: 0.746667rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.17);
  z-index: 2;
  border: none;
  font-size: 0.453333rem;
}
</style>
