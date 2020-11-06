<template>
  <div class="index">
    <div class="titleSearch">
      <!-- <h6 :class="{hideTop}">购物领券拿返利</h6> -->
      <div class="settings">
        <gong-gao></gong-gao>
      </div>
      <div @click="$router.push('search')" class="conSearch hideTop">
        <div class="inner">
          <!-- <van-icon name="search" class="searIcon" /> -->
          <img src="@/assets/my/sousuo.png" class="searIcon" alt="">
          <span>复制商品链接或商品标题</span>
          <button>搜优惠</button>
        </div>
      </div>
      <!-- <div class="copyte" :class="{hideTop}">
        复制
        <img :src="require('@/assets/app/taobao.png')" alt />
        <img :src="require('@/assets/app/tianmao.png')" alt />
        <img :src="require('@/assets/app/jingdong.png')" alt />
        <img :src="require('@/assets/app/pinduoduo.png')" alt />
        商品标题/链接
        <van-icon name="arrow" />打开全网惠
        <van-icon name="arrow" />领券购买
      </div>-->
    </div>
    <index-tabs v-if="tabs.length" :tabs="tabs" />
  </div>
</template>

<script>
export default {
  data() {
    let _this = this;
    return {
      hideTop: false,
      tabs: [],
    };
  },
  methods: {
    // messageClick() {
    //   .log("提示消息");
    // },
    scrolls() {
      window.scrollTo(0, 0);
    },
  },
  mounted(){
    // this.getInfo()
  },
  beforeMount() {
    this.$api.app.taobao
      .getTbProductCate()
      .then((res) => {
        this.tabs = res.data;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped lang="scss">
.index {
  height: calc(100vh - 47px);
  display: flex;
  flex-direction: column;
  .titleSearch {
    position: relative;
    background: $lineBg;
    color: #fff;
    padding-bottom: 45px;
    margin-bottom: -50px;
    h6 {
      font-size: 18px;
      line-height: 3;
      height: 2.4em;
      transition: all 0.3s;
      text-align: center;
      &.hideTop {
        font-size: 0;
        transform: scale(0);
      }
    }
    .settings {
      position: absolute;
      right: 0;
      top: 10px;
      width: 0.6rem;
      height: 0.6rem;
      margin-right: 0.533333rem;
      z-index: 2020;
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
      }
      .dotxx {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #fff;
        text-align: center;
        line-height: 16px;
        color: #fc2149;
      }
    }
    .conSearch {
      height: 35px;
      margin: 9px 20px;
      transition: all 0.3s;
      position: relative;
      z-index: 1;
      &.hideTop {
        padding-right: 1rem;
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
    .copyte {
      font-size: 12px;
      justify-content: center;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 0;
      transition: all 0.3s;
      &.hideTop {
        margin-top: -20px;
        transform: scale(0);
      }
      img {
        width: 12px;
        height: 12px;
        margin: 0 3px;
      }
      i {
        margin: 0 3px;
      }
    }
  }
  .backtop {
    position: fixed;
    right: 0;
    top: 80%;
    width: 1.333333rem;
    height: 1.333333rem;
    background: #fe5747;
  }
}
</style>
