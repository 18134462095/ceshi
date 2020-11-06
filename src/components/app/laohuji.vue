<template>
  <div>
    <div class="box">
      <div
        class="groups animation-ease"
        ref="groups"
        :style="{'height':height+'px',}"
        v-for="k in 3"
        :key="k"
        @webkitTransitionEnd="endGame(k)"
      >
        <ul class="group-item" v-for="i in (round+1)" :key="i">
          <li class="prize-item" v-for="item in prizes" :key="item.id">
            <img :src="item.imageUrl+''" alt />
            <span>{{item.prizeName}}</span>
          </li>
        </ul>
      </div>
      <van-popup v-model="popupshow" class="popup">
        <img :src="lottery.imageUrl+''" alt />
        <span>{{lottery.hint}}</span>
      </van-popup>
    </div>
    <!-- <div @click="startClick">{{disClick?'抽奖中...':'点击开始'}}</div> -->
  </div>
</template>

<script>
export default {
  name: "Laohuji",
  data() {
    return {
      round: 10, //转几回合后停下来
      disClick: false, //防止多次点击
      itemHeight: 0, //每个奖品的高度
      prize_id: "", //中奖id
      height: "",
      lottery: "",
      popupshow: false,
    };
  },
  props: ["prizes"],
  created() {},
  mounted() {
    this.itemHeight = document.getElementsByClassName(
      "prize-item"
    )[0].offsetHeight;
    this.height = this.itemHeight * this.prizes.length * (this.round + 1);
    // console.log(this.itemHeight);
    // console.log(this.$refs);
  },
  methods: {
    startClick() {
      //开始抽奖
      //获取中奖的id
      let index = 2;
      this.$api.app.my
        .getLottery()
        .then((res) => {
          // console.log(res);
          let lotteryId = res.data.sn-1
          if (res.code == 200) {
            this.runGame(lotteryId);
            // console.log(lotteryId)
            this.lottery = res.data;
          } else {
            this.Toast(res.msg);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    runGame(index) {
      //启动抽奖
      this.disClick = true;
      this.resetGame();
      var itemHeight = this.itemHeight;
      var groupsHeight =
        this.round *
        document.getElementsByClassName("group-item")[0].offsetHeight;
      this.$refs.groups.forEach((i, e) => {
        var pos = index * itemHeight + groupsHeight;
        setTimeout(() => {
          i.classList.add("animation-ease");
          i.style.transform = "translate3d(0, -" + pos + "px, 0)";
          // console.log(i);
        }, e * 300);
      });
    },
    endGame(k) {
      //抽奖结束后的回调
      if (k == 3) {
        // alert("恭喜您中了" + this.prizd_id);
        this.popupshow = true;
        this.$parent.istrue = true;
      }
    },
    resetGame() {
      this.$refs.groups.forEach((i, e) => {
        i.classList.remove("animation-ease");
        i.style.transform = "";
        // console.log(i);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 7rem;
  height: 3.653333rem;
  overflow: hidden;
  // background: #fff;
  display: flex;
  justify-content: space-between;
  .animation-ease {
    transition-property: transform;
    transition-duration: 3s;
    transition-timing-function: ease;
  }
  .groups {
    // float: left;
    width: 33%;
    height: 100%;
    text-align: center;
    .prize-item {
      width: 100%;
      height: 3.653333rem;
      // line-height: 3.653333rem;
      font-size: 50px;
      overflow: hidden;
      img {
        width: 2rem;
        height: 2rem;
        display: block;
        margin: 0 auto;
        margin-top: 0.2rem;
        background: orange;
      }
      span {
        font-size: 0.32rem;
        text-align: center;
        display: block;
        width: 100%;
        margin-top: 0.266667rem;
        line-height: 0.32rem;
        color: #fff;
      }
    }
  }
  >>> .popup {
    width: 4rem;
    height: 4rem;
    border-radius: 0.133333rem;
    img {
      width: 2.333333rem;
      height: 2.333333rem;
      display: block;
      margin: 0 auto;
      background: #aaaaaa;
      margin-bottom: 0.2rem;
      margin-top: 0.2rem;
    }
    span {
      font-size: 0.346667rem;
      color: #333333;
      text-align: center;
      display: block;
    }
  }
}
</style>