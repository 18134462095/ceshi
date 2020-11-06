<template>
  <div class="contact">
    <app-title>联系我们</app-title>
    <div class="erweima">
      <img src="@/assets/my/erweima.jpg" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Contact",
};
</script>
<style lang="scss" scoped>
.contact {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .erweima {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    margin-top: 175px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>