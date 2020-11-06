<template>
  <div class="quan" v-show="quanshow">
    <div class="quan1" v-show="Number(quan)">
      {{quan}}元券
      <!-- <img src="@/assets/app/q1.png" alt />
      <p>{{quan}}元券</p>-->
    </div>
    <p class="fanli" v-show="fanlishou && Number(fanli)">预计返现{{fanli}}元</p>
  </div>
</template>
<script>
export default {
  name: "Quan",
  props: {
    quan: {
      type: String | Number,
      default: "2",
    },
    fanli: {
      type: String | Number,
      default: "10",
    },
    quanshow: {
      type: Boolean,
      default: true,
    },
    fanlishou: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.quan {
  display: flex;
  align-items: center;
  font-size: 0.293333rem;
  color: #fff;
  text-align: center;
  margin-top: 0.2rem;
  p {
    border-radius: 0.133333rem;
  }
  .quan1 {
    min-width: 0.933333rem;
    // height: 0.693333rem;
    // line-height: 0.693333rem;
    position: relative;
    background: linear-gradient(
      150deg,
      rgba(254, 87, 71, 1),
      rgba(251, 33, 72, 1)
    );
    box-shadow: 0px 0px 6px 0px rgba(252, 47, 72, 0.3);
    border-radius: 0.133333rem;
    padding: .1rem .2rem;
    &::after{
      width: .2rem;
      height: .2rem;
      background: #fff;
      border-radius: 50%;
      content: '';
      position: absolute;
      top: 50%;
      margin-top: -.1rem;
      right: -.1rem;
    }
    &::before{
      width: .2rem;
      height: .2rem;
      background: #fff;
      border-radius: 50%;
      content: '';
      position: absolute;
      top: 50%;
      margin-top: -.1rem;
      left: -.1rem;
    }
  }
  .fanli {
    min-width: 1rem;
    // height: 0.56rem;
    background: #ff5000;
    margin-left: 0.266667rem;
    // line-height: 0.56rem;
    padding: .1rem;
  }
}
</style>