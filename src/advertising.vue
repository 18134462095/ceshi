<template>
  <div class="advertising">
    <img src="@/assets/advertising.jpg" alt="" />
    <button class="daojishi" @click="toindex">
      <span>跳过{{time}}s</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
    };
  },
  methods: {
    countDown() {
      let THIS = this;
      THIS.time--;
    },
    toindex(){
          this.$router.push("/index");
      }
  },
  mounted() {
    let THIS = this;
    THIS.time = 5;
    setInterval(THIS.countDown, 1000);
  },
  watch: {
    time: function (newVal, oldVal) {
      if (newVal == 0) {
        this.$router.push("/index");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.advertising {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    width: 100%;
    // height: 100%;
  }
  .daojishi {
      width: 1.2rem;
      height: 0.8rem;
      border-radius: 0.133333rem;
      position: absolute;
      top: 0.266667rem;
      right: 0.266667rem;
      line-height: 0.8rem;
      text-align: center;
    color: #fff;
    font-size: 0.32rem;
    background: none;
    border: 0.013333rem solid #fff;
  }

}
</style>