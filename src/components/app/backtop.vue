<template>
  <div class="zhiding" @click="zhiding">
    <img src="@/assets/top.png" alt />
    <!-- 顶部TOP -->
  </div>
</template>
<script>
export default {
  name: "goTop",
  data() {
    return {
      
    };
  },
  props:['scroll'],
  mounted(){
  },
  methods: {
    showbtn() {
      if (scrollTop >= 100) {
        this.dingwei = true;
      } else {
        this.dingwei = false;
      }
    },
    zhiding() {
      let timer = setInterval(function() {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 20);
    }
  }
};
</script>
<style lang="scss" scoped>
.zhiding {
  cursor: pointer;
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 32px;
  height: 32px;
  z-index: 10;
  img {
    width: 100%;
    height: 100%;
    // object-fit: cover;
  }
}
// @media screen and (max-width: 1024px) {
//   .zhiding{
//     right: 5px;
//     bottom: 282px;
//     width: 5vh;
//     height: 5vh;
//   }
// }
</style>