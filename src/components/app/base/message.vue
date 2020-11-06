
<template>
  <div class="box">
    <div :class="'b' + index" v-for="(i,index) in arr" :key="index">
      <div class="imgtext">
        <img src="@/assets/app/s1.jpg" alt />
        <p>{{i.name}}</p>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Message",
  data() {
    return {
      arr: [
        {
          name: "用户:a 刚刚领券并购买了该商品",
        },
        {
          name: "用户:b 刚刚领券并购买了该商品",
        },
        {
          name: "用户:c 刚刚领券并购买了该商品",
        },
        {
          name: "用户:d 刚刚领券并购买了该商品",
        },
        {
          name: "用户:e 刚刚领券并购买了该商品",
        },
        {
          name: "用户:f 刚刚领券并购买了该商品",
        },
        {
          name: "用户:g 刚刚领券并购买了该商品",
        },
        {
          name: "用户:h 刚刚领券并购买了该商品",
        },
        {
          name: "用户:i 刚刚领券并购买了该商品",
        },
        {
          name: "用户:j 刚刚领券并购买了该商品",
        },
        {
          name: "用户:k 刚刚领券并购买了该商品",
        },
        {
          name: "用户:l 刚刚领券并购买了该商品",
        },
        {
          name: "用户:m 刚刚领券并购买了该商品",
        },
        {
          name: "用户:n 刚刚领券并购买了该商品",
        },
        {
          name: "用户:o 刚刚领券并购买了该商品",
        },
        {
          name: "用户:p 刚刚领券并购买了该商品",
        },
        {
          name: "用户:q 刚刚领券并购买了该商品",
        },
        {
          name: "用户:r 刚刚领券并购买了该商品",
        },
        {
          name: "用户:s 刚刚领券并购买了该商品",
        },
        {
          name: "用户:t 刚刚领券并购买了该商品",
        },
      ],
      m: 0,
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    getlist() {
      let box = document.querySelectorAll(".box >div>.imgtext");
      box.forEach(i=>{
        i.style.animationDelay = this.m + 's'
        this.m+=3
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  pointer-events: none;
  div {
    position: absolute;
    left: .266667rem;
    bottom: 0;
    z-index: 9999;
    width: 9rem;
    .imgtext {
      animation: mymove 5s 1;
      background: rgba(26, 5, 5, 0.37);
      border-radius: 0.133333rem;
      display: flex;
      align-items: center;
      padding: 0.133333rem 0.266667rem;
      opacity: 0;
      img {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
      }
      p {
        font-size: 0.4rem;
        color: #fff;
        margin-left: 0.133333rem;
      }
    }
  }
}
@keyframes mymove {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(-150px);
    opacity: 1;
  }
}
</style>