<template>
  <div class="kaitong">
    <div class="kthy" @click="vipClick">
      <div class="gokt">
        <img class="img1" src="@/assets/my/vip.png" alt />
        <p>开通会员卡，享优惠特权</p>
      </div>
      <div class="gokt">
        <p>去开通</p>
        <img class="img2" src="@/assets/my/right.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Kaitong",
  methods: {
    vipClick() {
      this.$router.push({ path: "vip" });
    },
  },
};
</script>
<style lang="scss" scoped>
.kaitong {
  width: 10rem;
  height: 1.3rem;
  padding: 0 0.4rem;
  .kthy {
    height: 100%;
    background: linear-gradient(
      150deg,
      rgba(242, 223, 188, 1),
      rgba(219, 189, 136, 1)
    );
    border-radius: 0.15rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.25rem;
    .gokt {
      display: flex;
      align-items: center;
      font-size: 0.42rem;
      font-weight: bold;
      .img1 {
        width: 0.55rem;
        height: 0.55rem;
        object-fit: contain;
        margin-right: 0.133333rem;
      }
      .img2 {
        width: 0.2rem;
        height: 0.4rem;
        margin-left: 0.133333rem;
      }
    }
  }
}
</style>