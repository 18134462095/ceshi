<template>
  <div class="hotGoods" v-if="$store.getters.hotrec.length">
    <p class="title">热门推荐</p>
    <div v-swiper:goodsSwiper="goodsOption">
      <div class="swiper-wrapper hotwrap">
        <div class="swiper-slide hotslide" :key="ind" v-for="(i, ind) in $store.getters.hotrec">
          <div class="imgBox">
            <p class="tr" v-if="i.couponLastPrice / i.salePrice * 10">{{(i.couponLastPrice / i.salePrice * 10).toFixed(1)}}折</p>
            <img :src="replaceHttp(i.pictUrl)" alt class="goodsImg" />
          </div>
          <div class="hotname">
            <p class="swtitle">{{i.title}}</p>
            <p class="price"><span>￥{{i.couponLastPrice || i.salePrice}}</span><span v-show="i.couponLastPrice">￥{{i.salePrice}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tuiswiper",
  data() {
    let _this = this
    return {
      clickIndex: null,
      goodsOption: {
        touchMoveStopPropagation: true,
        freeMode: true,
        // freeModeSticky: true,
        slidesPerView: "auto",
        freeModeMomentumRatio: false,
        freeModeMomentumRatio: 0,
        loop: true,
        speed: 3000,
        autoplay: false,
        // centeredSlides: true,
        // centeredSlidesBounds: true,
        observer: true,
        observeParents:true,
        on: {
          click() {
            let index = this.clickedSlide.dataset.swiperSlideIndex
            _this.clickIndex = index;
            _this.$emit('toHot', _this.$store.getters.hotrec[index])
          },
        },
      },
    };
  },
  mounted () {
    // this.goodsSwiper.slideTo(0,0,false)
    // this.$forceUpdate()
  },
};
</script>
<style lang="scss" scoped>
.hotGoods {
  background: #fff;
  padding: 0.4rem 0.266667rem;
  border-radius: 0.266667rem;
  overflow: hidden;
  margin-bottom: 0.32rem;
  .title {
    // padding-left: 0.25rem;
    line-height: 0.426667rem;
    font-size: 0.426667rem;
    margin-bottom: 0.266667rem;
  }
  .hotwrap {
    // height: 3rem;
    transition-timing-function: linear;
    .hotslide {
      width: 2rem;
      margin-right: 0.533333rem;
      .imgBox {
        position: relative;
        height: 2rem;
        width: 2rem;
        border-radius: 0.266667rem;
        overflow: hidden;
        .tr {
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 0.5rem;
          background: linear-gradient(to right, #fe5747, #fc2149);
          border-radius: 0 0 10px 0;
          text-align: center;
          color: #fff;
          line-height: 0.5rem;
          font-size: 0.32rem;
        }
        img.goodsImg {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }
      .hotname {
        .swtitle {
          font-size: 0.373333rem;
          margin-top: 0.133333rem;
          white-space: pre;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          width: 100%;
          span:first-child {
            font-size: 0.346667rem;
            color: #fd3748;
          }
          span:last-child {
            font-size: 0.266667rem;
            color: #000;
            text-decoration: line-through;
            padding-left: 0.1rem;
          }
        }
      }
    }
  }
}
</style>