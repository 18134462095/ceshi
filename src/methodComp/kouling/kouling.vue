<template>
  <div class="kouling" v-if="show">
    <div class="shadow" />
    <div class="koulingBox">
      <!-- <img :src="require('@/assets/my/sousuo.png')" alt=""> -->
      <h5>是否要搜索以下内容？</h5>
      <p>{{v}}</p>
      <div class="btnBox">
        <span v-fb="{cls: 'fouceBtn'}" class="nosear" @click="cancel">不搜索</span>
        <span v-fb="{cls: 'fouceBtn'}" class="sear" @click="submit">查看详情</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kouling",
  data() {
    let _this = this;
    return {
      show: true,
      v: ''
    };
  },
  methods: {
    cancel () {
      localStorage.noback = ''
      this.show = false;
      this.callback && this.callback()
    },
    submit () {
      localStorage.noback = ''
      this.show = false;
      this.callback && this.callback("confirm");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.show = true;
      localStorage.noback = '1'
    });
  }
};
</script>

<style lang="scss" scoped>
.kouling {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  .shadow {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    z-index: 0;
  }
  .koulingBox {
    width: 8rem;
    background: #fff;
    border-radius: 0.2rem;
    position: relative;
    z-index: 1;
    overflow: hidden;
    padding: 0.4rem;
    img {
      width: .5rem;
      display: block;
      margin: auto;
    }
    h5 {
      font-weight: 600;
      font-size: 0.4rem;
      text-align: center;
      margin-bottom: 0.4rem;
      color: $notActive;
    }
    p {
      font-size: 0.373333rem;
      color: #3c3c3c;
    }
    div {
      margin: auto;
      margin-top: 0.5rem;
      width: 100%;
      text-align: center;
      line-height: .7rem;
      display: flex;
      justify-content: space-between;
      span {
        height: .7rem;
        flex: 1;
        margin: 0 0.1rem;
        border-radius: .5rem;
        font-size: 0.266667rem;
      }
      .sear {
        color: #fff;
        background: $btnAvtive;
        &.fouceBtn {
          background: $btnNotAvtive;
        }
      }
      .nosear {
        color: $btnAvtive;
        background: #fff5f7;
        &.fouceBtn {
          background: #f9e4e9;
        }
      }
    }
  }
}
</style>