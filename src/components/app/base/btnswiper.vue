<template>
  <div class="btnswiper">
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiperslide" v-for="(i, index) in list" :key="index">
        <div class="img">
          <img :src="i[img]" alt />
        </div>
        <p>{{ i[name] }}</p>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "BtnSwiper",
  data() {
    let that = this;
    return {
      swiperOption: {
        autoplay: false,
        slidesPerView: 5,
        slidesPerColumn: 2,
        slidesPerGroup: 5,
        touchMoveStopPropagation: true,
        slidesPerColumnFill: "row",
        pagination: {
          el: ".swiper-pagination",
        },
        on: {
          click: function () {
            that.toUrl(this.clickedIndex);
          },
        },
      },
    };
  },
  props: {
    list: {
      type: Array,
      default: null,
    },
    img: {
      type: String,
      default: "img",
    },
    name: {
      type: String,
      default: "name",
    },
    router: {
      type: String,
      default: "rouclick",
    },
  },
  methods: {
    toUrl(index) {
      let g = this.list[index];
      this.id = g.id;
      // console.log(this.id)
      switch (g.urlType) {
        case "1":
          this.$router.push(g[this.router]);
          // console.log(1);
          break;
        case "2":
          this.openWeb(g[this.router], g.id);
          // plus.runtime.openWeb(g[this.router])
          // console.log(2);
          break;
        case "3":
          this.openWeb(g[this.router], g.id);
          // plus.runtime.openWeb(g[this.router])
          // console.log("3");
          break;
        case undefined:
          this.$router.push(g[this.router]);
          // console.log(4);
      }
      // localStorage.noback = "";
      // plus.key.removeEventListener("backbutton", this.cancel);
    },
    openWeb(url, id) {
       let that = this;
      // console.log(url, id, "urlid");
      let nw = plus.webview.create(url, id, {
        titleNView: {
          buttons: [
            {
              type: "back",
              onclick: function (event) {
                nw.canBack(function (e) {
                  // console.log("是否可返回：" + e.canBack);
                  if (e.canBack) {
                    nw.back();
                  } else {
                    nw.close();
                  }
                });
              },
              float: "left",
            },
            {
              type: "close",
              onclick: function () {
                nw.close();
              },
              float: "left",
            },
          ],
        },
      });
      plus.key.addEventListener(
        "backbutton",
        function () {
          nw.canBack(function (e) {
            // console.log("是否可返回：" + e.canBack);
            if (e.canBack) {
              nw.back();
            } else {
              nw.close();
            }
          });
        }, 
        false
      );
      let referer = "http://tq.jfshou.cn/";
      nw.overrideUrlLoading(
        {
          match: /^weixin:\/\/|^alipays:\/\/|^https:\/\/wx.tenpay.com/,
          // match:indexOf('weixin://') == 0
        },
        function (e) {
          console.log(e.url, "e");
          let url = e.url;
          // if (url.match(/^weixin:\/\/|^alipays:\/\//)==true) { 
          if (url.indexOf('weixin://') == 0) {
            plus.runtime.openURL(url);
          } else if (url.indexOf('https://wx.tenpay.com')==0) {
            plus.webview.create(url, id, {
              additionalHttpHeaders: { Referer: referer },
            });
          } else {
            that.openWeb(url);
            // location.href = url
            // plus.webview.open(url)
          }
        }
      );
      nw.show();
    },
  },
  watch: {},
  mounted() {
    this.$emit("start2");
    this.$nextTick(() => {
      this.$refs.mySwiper.$swiper.update();
      this.$forceUpdate();
      // localStorage.noback = "1";
      // plus.key.addEventListener("backbutton", this.cancel);
    });
  },
};
</script>

<style scoped lang="scss">
.btnswiper {
  margin-top: 0.533333rem;
  margin-bottom: 0.266667rem;
}
.swiper {
  padding-bottom: 0.266667rem;
  >>> .swiper-wrapper {
    height: 3.7rem;
  }
  .swiperslide {
    // width: 20%;
    // margin-top: .28rem;
    height: 40%;
    // padding-bottom: 0.533333rem;
    .img {
      width: 0.933333rem;
      height: 0.933333rem;
      margin: 0 auto;
      img {
        width: 100%;
        // height: 100%;
        // object-fit: cover;
      }
    }
    p {
      font-size: 0.32rem;
      margin-top: 0.15rem;
      text-align: center;
    }
  }
  .swiper-pagination-bullets {
    bottom: 0;
    >>> .swiper-pagination-bullet {
      width: 0.133333rem;
      height: 0.133333rem;
      background: #8c8c8c;
    }
    >>> .swiper-pagination-bullet-active {
      background: #fe5747;
    }
  }
}
</style>