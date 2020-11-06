<template>
  <div class="ouderfind">
    <app-title style="color: #000">订单找回</app-title>
    <div class="bottom">
      <p>
        未获得佣金的订单需手动找回才可获得返利；
        <br />
        需登录本人账号找回才有效哦！
      </p>
      <div class="search">
        <img src="@/assets/my/sousuo.png" alt="" />
        <input type="text" placeholder="请输入订单编号" v-model="value" />
        <button @click="onSearch">找回</button>
      </div>
      <div class="yindao">
        <img src="@/assets/my/zhdd.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {
      console.log(this.value, "this.value,");
      if (this.value) {
        this.$api.app.my
          .findTbOrders({
            orderNo: this.value,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.Toast("订单已找回！");
            } else {
              this.Toast(res.msg);
            }
          });
      } else {
        this.Toast("请输入订单号！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ouderfind {
  width: 100vw;
  height: 100vh;
  .bottom {
    height: calc(100% - 40px);
    overflow-y: scroll;
    width: 100%;
    p {
      color: #1a0606;
      font-size: 0.426667rem;
      padding: 0.4rem 0 0.4rem 0.4rem;
      font-weight: 400;
    }
    .search {
      width: 9.2rem;
      height: 1.066667rem;
      border: 0.013333rem solid #fe5747;
      margin: 0 auto;
      background: none;
      border-radius: 0.133333rem;
      display: flex;
      background: #fff;
      img {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin-top: 0.3rem;
        margin-left: 0.2rem;
      }
      input {
        background: none;
        border: none;
        width: 6.866667rem;
        height: 100%;
        margin-left: 0.266667rem;
      }
      button {
        display: block;
        width: 1.6rem;
        height: 0.8rem;
        border-radius: 0.133333rem;
        background: linear-gradient(150deg, #fe5747, #fb2148);
        box-shadow: 0px 0px 0.08rem 0px rgba(252, 47, 72, 0.3);
        outline: none;
        border: none;
        color: #fff;
        font-size: 0.373333rem;
        margin-top: 0.106667rem;
        margin-right: 0.266667rem;
      }
    }
  }
  .yindao {
    width: 9.2rem;
    margin: 0 auto;
    margin-top: 0.4rem;
    margin-bottom: 0.266667rem;
    img {
      width: 100%;
    }
  }
}
</style>