<template>
  <div class="gonggao" @click="$router.push('tongzhi')">
    <img src="@/assets/my/xiaoxi.svg" />
    <div v-if="unReadNum">
      <div class="dotxx" v-if="unReadNum!=0">{{unReadNum}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GongGao",
  data(){
    return {
      unReadNum:0
    }
  },
  computed: {
    num () {
      // return this.$store.getters.inform && this.$store.getters.inform.content.filter(i => !i.hasRead).length
    }
  },
  mounted() {
    this.unReadNum = this.$store.getters.inform.unReadNum;
  },
};
</script>

<style lang="scss" scoped>
.gonggao {
  position: relative;
  width: 34px;
  img {
    width: 34px;
    display: block;
  }
  .dotxx {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    line-height: 18px;
    color: #fc2149;
  }
}
</style>