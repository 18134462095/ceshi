<template>
  <div class="Lottery">
    <app-title style="color:#1D0808;" class="title">抽奖</app-title>
    <div class="cont">
      <img class="beijing" src="@/assets/my/choujiangbeijing.png" alt />
      <div class="coujiangji">
        <img class="jiqi" src="@/assets/my/choujiangji.png" alt />
        <div class="btn">
          <img
            class="anniu"
            v-if="istrue"
            src="@/assets/my/choujianganniu.png"
            alt
            @click="startClick"
          />
          <img class="anxia" v-else src="@/assets/my/choujianganxia.png" alt />
          <span class="cishi1" v-if="istrue">{{times}}</span>
          <span class="cishu2" v-else>{{times}}</span>
        </div>
        <div class="jiang">
          <laohuji
            ref="laohuji"
            class="laohuji"
            :startClick="startClick"
            :prizes="datalist"
            v-if="datalist"
          ></laohuji>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      istrue: true,
      datalist: null,
      index: "2",
      times: "",
    };
  },
  created() {
    this.getLotteryOption();
  },
  methods: {
    startClick() {
      this.istrue = false;
      this.$refs.laohuji.startClick();
      this.times--;
    },
    getLotteryOption() {
      this.$api.app.my.getLotteryOption().then((res) => {
        this.datalist = res.data.lottery;
        this.times = res.data.times;
        // console.log(this.datalist);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Lottery {
  width: 100%;
  height: 100vh;
  position: relative;
  .cont {
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
    position: relative;
    .beijing {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 24.666667rem;
    }
    .coujiangji {
      width: 100%;
      margin-top: 2rem;
      position: relative;
      height: 14.4rem;
      overflow: hidden;
      .jiqi {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }
      .btn {
        width: 6.466667rem;
        height: 1.693333rem;
        position: absolute;
        width: 6.466667rem;
        height: 1.693333rem;
        z-index: 3;
        bottom: 2.933333rem;
        left: 0;
        right: 0;
        margin: auto;
        .cishi1 {
          color: #fff;
          font-size: 0.38rem;
          position: absolute;
          top: 0.266667rem;
          left: 1.866667rem;
          font-weight: 600;
        }
        .cishu2 {
            color: #fff;
          font-size: 0.38rem;
          position: absolute;
          top: 0.6rem;
          left: 1.866667rem;
          font-weight: 600;
        }
      }
      .anniu {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .anxia {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .jiang {
        display: flex;
        justify-content: space-between;
        width: 7rem;
        margin: 0 auto;
        height: 3.653333rem;
        margin-top: 4.95rem;
        // background: #8c8c8c;
        position: relative;
        z-index: 5;
        .laohuji {
          width: 7rem;
          height: 3.653333rem;
        }
      }
    }
  }
}
</style>