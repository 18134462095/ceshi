<template>
  <div class="detail">
    <!-- 详情页面 -->
    <div class="titlefanhui">
      <div class="fanhuiimg">
        <div @click="$router.back()" class="left">
          <img src="@/assets/app/fanhui.png" alt />
        </div>
        <!-- <div class="right">
          <img src="@/assets/app/fenxiang2.png" alt />
        </div>-->
      </div>
    </div>
    <div class="detail-swiper conwidth" v-if="goodData != null">
      <div class="swipercontainer">
        <swiper class="swiper" :options="swiperOption" ref="mySwiper">
          <swiper-slide v-if="goodData.pictUrls == null" class="slide">
            <img
              v-lazy="replaceHttp(goodData.pictUrl)"
              :src="replaceHttp(goodData.pictUrl)"
              alt
            />
          </swiper-slide>
          <swiper-slide
            v-for="(i, index) in goodData.pictUrls"
            :key="index"
            class="slide"
          >
            <img v-lazy="replaceHttp(i)" :src="replaceHttp(i)" alt />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 动画弹出 -->
        <!-- <message /> -->
      </div>
      <div class="content">
        <div class="price">
          <p class="pricemoney">
            ￥{{ goodData.couponLastPrice || goodData.salePrice }}
          </p>
          <p class="quanhou" v-if="goodData.couponLastPrice">券后</p>
          <p class="yujifanli" v-if="goodData.memberForecastCommission">
            预计返现{{ goodData.memberForecastCommission }}
          </p>
        </div>
        <div class="xiao">
          <p>{{ goodData.mallType }}￥{{ goodData.salePrice }}</p>
          <p>月销{{ goodData.tkTotalSales }}</p>
        </div>
      </div>
      <!-- <kaitong></kaitong> -->
      <div class="content">
        <p class="commtitle">{{ goodData.title }}</p>
        <p class="yishou">已售{{ goodData.totalSold }}件</p>
        <!-- todo 优惠券 -->
        <div class="quan" v-if="Number(goodData.couponAmount)" @click="toifm">
          <img src="@/assets/app/quan.png" alt />
          <div class="qtext">
            <div class="quanflex">
              <div class="qleft">
                <p class="qmoney">
                  <span style="font-size: 0.5em">￥</span>
                  {{ goodData.couponAmount }}
                </p>
                <div class="qdate">
                  <p>优惠券使用期限</p>
                  <p>
                    {{
                      goodData.couponStartTime.slice(0, 10).replace(/-/g, ".")
                    }}-{{
                      goodData.couponEndTime.slice(0, 10).replace("-", ".")
                    }}
                  </p>
                </div>
              </div>
              <!-- <div class="qright">
                <p @click="exchangeGoods">立即领券</p>
              </div>-->
            </div>
          </div>
        </div>
        <div class="tuijian">
          <p class="line">推荐语</p>
          <p class="tuitext" v-if="goodData.itemDescription">
            {{ goodData.itemDescription }}
          </p>
          <p class="tuitext" v-else>暂无推荐描述</p>
        </div>
      </div>
      <div class="dpfff">
        <div class="dianpu">
          <div class="dpxx">
            <div class="dpimg">
              <img :src="goodData.mallLogo" alt />
            </div>
            <div class="xinxi">
              <p class="xxtitle">
                {{ goodData.mallName || goodData.mallType + "店铺" }}
              </p>
              <div class="dptype">
                <img :src="goodData.mallLogo" alt />
                <p>{{ goodData.mallType }}店铺</p>
              </div>
            </div>
          </div>
          <!-- <div class="jindian" v-if="goodData.mallurl" @click="toifm(goodData.mallurl)">进店逛逛</div> -->
        </div>
      </div>
      <div class="tuijian imgs" v-if="imgs && imgs.length">
        <p class="line">商品详情</p>
        <div class="imgsbox">
          <img :src="i" v-for="(i, index) in imgs" :key="index" alt />
        </div>
      </div>
      <div class="xstj" v-if="similarlist.length">
        <!-- <tuiswiper @toHot="toHot" style="margin-top: 0.2rem;"></tuiswiper> -->
        <h4 class="h4">相似推荐</h4>
        <commodity :commodityList="similarlist"></commodity>
      </div>
    </div>
    <div class="footerfixd" v-if="goodData != null">
      <div class="foot">
        <div class="icons">
          <div class="scfx" @click="shoucang">
            <van-icon
              class="img"
              v-if="!iconshow"
              name="star-o"
              color="#8c8c8c"
              size="25"
            />
            <van-icon
              class="img"
              v-else-if="iconshow"
              name="star"
              color="#FE5747"
              size="25"
            />
            <p>收藏</p>
          </div>
          <!--<div class="scfx" @click="fenxiang">
             <img class="img" src="@/assets/app/fenxiang.png" alt />
            <p>分享</p>
          </div>-->
        </div>
        <div class="btns">
          <!-- <div @click="toifm('http:' + goodData.url)" class="btn1">直接购买</div> -->
          <div @click="toifm()" class="btn2">
            {{ goodData.hasCoupon ? "领券购买" : "直接购买" }}
          </div>
        </div>
      </div>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/date";
export default {
  name: "detailView",
  data() {
    let _this = this;
    return {
      swiperOption: {
        autoplay: false,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      iconshow: false,
      content: "",
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      goodData: null,
      type: "",
      similarlist: [],
      imgs: [],
    };
  },
  mounted() {
    // console.log(this.$route.params, "params");
    // if (this.$route.params) {
    //   this.$store.commit("changeDetail", this.$route.params);
    // }
    if (Object.keys(this.$route.params).length != 0) {
      this.$store.commit("changeDetail", this.$route.params);
    }
    this.$nextTick(() => {
      this.getContent();
      this.getDetail();
    });
  },
  beforeDestroy() {
    this.Toast.clear();
  },
  methods: {
    exchangeGoods() {
      let yu = Number(this.user.balanceAmount),
        quan = Number(this.goodData.couponAmount);
      if (yu < quan) {
        // this.Toast("余额不足,请充值！");
        this.Dialog.confirm({
          title: "余额不足,请充值！",
          // message: "弹窗内容",
        })
          .then(() => {
            // on confirm
            this.$router.push("recharge");
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$api.app.my
          .getExchangeGoods({
            consumeAmount: this.goodData.couponAmount,
            couponAmount: this.goodData.couponAmount,
            goodsId: this.goodData.itemId,
            goodsName: this.goodData.title,
            img: this.goodData.pictUrl,
            originPrice: this.goodData.salePrice,
            plateForm: this.goodData.dockingType.name,
            presentPrice: this.goodData.couponLastPrice,
            url: this.goodData.couponShareUrl,
          })
          .then((res) => {
            if (res.code == 200) {
              this.Toast("领券成功");
            } else {
              this.Toast(res.msg);
            }
          });
      }
    },
    getSimilar() {
      let goodData = Object.assign({}, this.detail);
      let type = goodData.dockingType.name;
      let Id = goodData.itemId;
      switch (type) {
        case "JD":
          this.$api.app.jingdong.jdSimilarRecommend(Id).then((res) => {
            this.similarlist = res.data;
          });
          break;
        case "TB":
          this.$api.app.taobao
            .dgOptimusMaterial({
              materialId: "13256",
              deviceType,
              itemId: Id,
            })
            .then((res) => {
              this.similarlist = res.data;
            });
          break;
        case "TM":
          this.$api.app.taobao
            .dgOptimusMaterial({
              materialId: "13256",
              deviceType,
              itemId: Id,
            })
            .then((res) => {
              this.similarlist = res.data;
            });
          break;
        case "PDD":
          this.similarlist = [];
          break;
        default:
          break;
      }
    },
    getDetail() {
      // let _this=this
      let goodData = Object.assign({}, this.detail);
      this.$api.app.home
        .goodsDetails({
          dockingType: goodData.dockingType.name,
          skuId: goodData.itemId,
        })
        .then((res) => {
          if (res.code == 200) {
            this.imgs = res.data.map(this.replaceHttp);
            // console.log(this.imgs)
          }
          // console.log(this.imgs,'detailimg')
        });
    },
    getContent() {
      this.Toast.loading({
        message: "加载中",
        duration: 0,
      });
      let goodData = Object.assign({}, this.detail);
      if (goodData.turnChain) {
        let type = goodData.dockingType.name;
        switch (type) {
          case "TB":
            this.$api.app.taobao.tbkIdPrivilege(goodData.itemId).then((res) => {
              this.Toast.clear();
              if (res.code == 200) {
                goodData.couponShareUrl = res.data.coupon_click_url;
                this.goodData = goodData;
                this.getSimilar();
                this.getShoucang();
              } else {
                this.Toast.fail(res.msg);
              }
            });
            break;
          case "JD":
            this.$api.app.jingdong
              .jdByUnionidPromotion(goodData.url)
              .then((res) => {
                this.Toast.clear();
                if (res.code == 200) {
                  goodData.couponShareUrl = res.msg;
                  this.goodData = goodData;
                  this.getSimilar();
                  this.getShoucang();
                } else {
                  this.Toast.fail("获取信息失败, 请重试!");
                }
              });
            break;
          case "PDD":
            this.$api.app.home.recordPdd().then((res) => {
              console.log(res, "PDDserch");
              if (res.msg) {
                plus.runtime.openURL(res.msg);
                return;
              }
            });
            this.$api.app.pinduoduo
              .createUrl({
                goodsId: goodData.itemId,
                searchId: goodData.searchId,
              })
              .then((res) => {
                this.Toast.clear();
                if (res.code == 200) {
                  goodData.couponShareUrl = res.msg;
                  this.goodData = goodData;
                  this.getSimilar();
                  this.getShoucang();
                } else {
                  this.Toast.fail("获取信息失败, 请重试!");
                }
              });
            break;
          default:
            break;
        }
      } else {
        this.goodData = goodData;
        this.getSimilar();
        this.getShoucang();
        this.Toast.clear();
      }
    },
    getShoucang() {
      this.$api.app.my
        .getIsCollection({
          goodsInfoJson: JSON.stringify(this.detail),
          goodsId: this.detail.itemId,
          plateForm: this.detail.mallType,
          memberId: this.user.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.iconshow = res.data;
          } else {
            this.Toast(res.msg);
          }
        });
    },
    toifm() {
      let type = this.goodData.dockingType.name;
      if (type == "TB") {
        // 刷新授权信息
        this.$api.app.my.refreshMemberInfo().then((res) => {
          if (res.code == 200) {
            this.$store.commit("memberInfo", res.data);
            let info = this.$store.getters.info;
            console.log(info, "in");
            if (!info.tbSpecialId) {
              this.$api.app.taobao
                .getAuthUrl({
                  itemId: this.detail.itemId,
                })
                .then((res) => {
                  if (res.code == 200) {
                    console.log(res.msg);
                    // plus.runtime.openWeb(res.msg);
                    this.openWeb(res.msg, 3);
                    // window.open(res.msg);
                  }
                });
            } else {
              // 查看余额
              let data = this.goodData;
              // this.$api.app.my.getClickExchangeGoods();
              if (data.hasCoupon == true) {
                let yu = Number(this.user.balanceAmount),
                  quan = Number(data.couponAmount);
                if (yu < quan) {
                  // this.Toast("余额不足,请充值！");
                  this.Dialog.confirm({
                    title: "余额不足,请充值！",
                  })
                    .then(() => {
                      // on confirm
                      this.$router.push("recharge");
                    })
                    .catch(() => {
                      // on cancel
                    });
                } else {
                  // 使用余额购买优惠券
                  this.$api.app.my
                    .getExchangeGoods({
                      consumeAmount: data.couponAmount,
                      couponAmount: data.couponAmount,
                      goodsId: data.itemId,
                      goodsName: data.title,
                      img: data.pictUrl,
                      originPrice: data.salePrice,
                      plateForm: data.dockingType.name,
                      presentPrice: data.couponLastPrice,
                      url: data.couponShareUrl,
                    })
                    .then((res) => {
                      data.couponShareUrl = this.replaceHttp(
                        data.couponShareUrl
                      );
                      this.getDetailUrl(
                        data.couponShareUrl,
                        data.dockingType.name
                      );
                    });
                }
              } else {
                this.$api.app.my
                  .getExchangeGoods({
                    goodsId: data.itemId,
                    goodsName: data.title,
                    img: data.pictUrl,
                    originPrice: data.salePrice,
                    plateForm: data.dockingType.name,
                    presentPrice: data.salePrice,
                    url: data.url,
                  })
                  .then((res) => {
                    data.url = this.replaceHttp(data.url);
                    this.getDetailUrl(data.url, data.dockingType.name);
                  });
              }
            }
          }
        });
      } else {
        // 查看余额
        let data = this.goodData;
        // this.$api.app.my.getClickExchangeGoods();
        if (data.hasCoupon == true) {
          let yu = Number(this.user.balanceAmount),
            quan = Number(data.couponAmount);
          if (yu < quan) {
            // this.Toast("余额不足,请充值！");
            this.Dialog.confirm({
              title: "余额不足,请充值！",
            })
              .then(() => {
                // on confirm
                this.$router.push("recharge");
              })
              .catch(() => {
                // on cancel
              });
          } else {
            // 使用余额购买优惠券
            this.$api.app.my
              .getExchangeGoods({
                consumeAmount: data.couponAmount,
                couponAmount: data.couponAmount,
                goodsId: data.itemId,
                goodsName: data.title,
                img: data.pictUrl,
                originPrice: data.salePrice,
                plateForm: data.dockingType.name,
                presentPrice: data.couponLastPrice,
                url: data.couponShareUrl,
              })
              .then((res) => {
                data.couponShareUrl = this.replaceHttp(data.couponShareUrl);
                this.getDetailUrl(data.couponShareUrl, data.dockingType.name);
              });
          }
        } else {
          this.$api.app.my
            .getExchangeGoods({
              goodsId: data.itemId,
              goodsName: data.title,
              img: data.pictUrl,
              originPrice: data.salePrice,
              plateForm: data.dockingType.name,
              presentPrice: data.salePrice,
              url: data.url,
            })
            .then((res) => {
              data.url = this.replaceHttp(data.url);
              this.getDetailUrl(data.url, data.dockingType.name);
            });
        }
      }
      console.log(this.goodData, "data");
    },
    openWeb(url, id) {
      // console.log(url, id, "urlid");
      let nw = plus.webview.create(url, id, {
        titleNView: {
          buttons: [
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
      nw.show();
    },
    toHot(data) {
      this.$router.replace({
        name: "Detail",
        params: { goodData },
      });
      this.getContent();
    },
    formatDate(date) {
      return formatWithSeperator(date, ".");
    },
    shoucang() {
      let goos = this.goodData;
      this.$api.app.home
        .saveOrUnSaveCollection({
          goodsInfoJson: JSON.stringify(this.detail),
          goodsId: this.goodData.itemId,
          plateForm: this.goodData.mallType,
          memberId: this.user.id,
        })
        .then((res) => {
          if (res.code == 200) {
            if (this.iconshow) {
              this.iconshow = false;
              this.Toast("取消收藏");
            } else {
              this.Toast("收藏成功");
              this.iconshow = true;
            }
          } else {
            this.Toast(res.msg);
          }
        });
    },
    fenxiang() {
      plus.share.getServices(
        (services) => {},
        (err) => {}
      );
      this.showShare = true;
    },
    onSelect(option) {
      this.Toast(option.name);
      this.showShare = false;
    },
  },
  computed: {
    user() {
      return this.$store.getters.info;
    },
    detail() {
      return this.$store.getters.detail;
    },
  },
};
</script>
<style lang="scss" scoped>
.detail {
  padding-bottom: 2rem;
  .titlefanhui {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0.266667rem 0.533333rem;
    .fanhuiimg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        width: 0.666667rem;
        height: 0.666667rem;
        // background:#6F6262;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        background: rgba(25, 5, 5, 0.39);
        img {
          padding: 15%;
        }
      }
    }
  }
  .detail-swiper {
    .swipercontainer {
      position: relative;
      width: 100%;
      height: 10rem;
      z-index: 0;
      .swiper {
        height: 100%;
        .slide {
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        --swiper-theme-color: #fff;
      }
    }
    .tuijian {
      margin: 0.4rem 0;
      &.imgs {
        .line {
          margin: 0 0.26667rem;
        }
        .imgsbox {
          margin: 0.2rem 0;
          width: 100%;
          img {
            display: block;
            width: 100%;
          }
        }
      }
      .line {
        display: inline-block;
        padding-bottom: 0.133333rem;
        font-size: 0.426667rem;
        font-weight: 400;
        border-bottom: 2px solid #e46057;
        border-radius: 0.066667rem;
      }
      .tuitext {
        font-size: 0.32rem;
        color: #8c8c8c;
        margin-top: 0.266667rem;
      }
    }
    .content {
      padding: 0 $blank;
      .price {
        display: flex;
        align-items: center;
        padding: 0.266667rem 0;
        .pricemoney {
          font-size: 0.7rem;
          color: #fe5747;
        }
        .quanhou {
          background: #fff5f7;
          font-size: 0.32rem;
          color: #fe5747;
          padding: 0.05rem 0.2rem;
          border-radius: 0.2rem 0 0.2rem 0;
          margin-left: 0.266667rem;
        }
        .yujifanli {
          justify-self: end;
          font-size: 0.4rem;
          color: #fe5747;
        }
      }
      .xiao {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.35rem;
        color: #aeaeae;
        margin-bottom: 0.266667rem;
      }
      .commtitle {
        font-size: 0.4rem;
        color: #1a0505;
        font-weight: bold;
        padding: 0.266667rem 0;
      }
      .yishou {
        font-size: 0.35rem;
        color: #aeaeae;
      }
      .quan {
        position: relative;
        width: 100%;
        height: 2.293333rem;
        margin-top: 0.266667rem;
        img {
          width: 100%;
          height: 100%;
        }
        .qtext {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #fff;
          .quanflex {
            display: flex;
            align-items: center;
            height: 100%;
            .qleft {
              width: 100%;
              display: flex;
              align-items: center;
              .qmoney {
                font-size: 0.6rem;
                font-weight: bold;
                padding: 0 0.4rem 0 0.6rem;
              }
              .qdate {
                font-size: 0.3rem;
                line-height: 0.7rem;
                p:first-child {
                  font-weight: bold;
                  font-size: 0.4rem;
                }
              }
            }
            .qright {
              width: 30%;
              p {
                font-size: 0.5rem;
                text-align: center;
                line-height: 1.906667rem;
              }
            }
          }
        }
      }
    }

    .xstj {
      .h4 {
        font-size: 0.426667rem;
        color: #1a0505;
        margin-left: 0.666667rem;
        // line-height: ;
      }
    }
    .dpfff {
      background: #fff;
      padding: 0 0.533333rem;
      margin-bottom: 0.266667rem;
      margin-top: 0.4rem;
      .dianpu {
        // width: 10rem;
        margin: 0 auto;
        padding: 0.2rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 0.133333rem;
        .dpxx {
          display: flex;
          align-items: center;
          .dpimg {
            margin-right: 0.4rem;
            width: 2rem;
            height: 2rem;
            border-radius: 0.133333rem;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .xinxi {
            .xxtitle {
              font-size: 0.48rem;
              font-weight: 400;
              width: 4.5rem;
              // white-space: pre;
              font-family: Source Han Sans CN;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .dptype {
              display: flex;
              align-items: center;
              margin-top: 0.4rem;
              img {
                width: 0.4rem;
                height: 0.4rem;
                object-fit: cover;
                border-radius: 0.066667rem;
                margin-right: 0.173333rem;
              }
              p {
                font-size: 0.373333rem;
              }
            }
          }
        }
        .jindian {
          width: 1.8rem;
          height: 0.7rem;
          border: 1px solid #fe5747;
          font-size: 0.373333rem;
          color: #fe5747;
          text-align: center;
          line-height: 0.7rem;
          border-radius: 0.133333rem;
        }
      }
    }
  }
  .footerfixd {
    position: fixed;
    bottom: -3px;
    left: 0;
    z-index: 9;
    width: 100%;
    .foot {
      display: flex;
      // justify-content: space-between;
      height: 1.333333rem;
      .icons {
        background: #fff;
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        .scfx {
          .img {
            width: 0.6rem;
            height: 0.6rem;
            object-fit: cover;
          }
          p {
            font-size: 0.373333rem;
          }
        }
      }
      .btns {
        width: 70%;
        height: 100%;
        display: flex;
        .btn1,
        .btn2 {
          flex: 1;
          height: 100%;
          font-size: 0.533333rem;
          text-align: center;
          line-height: 1.333333rem;
        }
        .btn1 {
          background: #ffe7eb;
          color: #fe5747;
        }
        .btn2 {
          background: #fe5747;
          color: #fff;
        }
      }
    }
  }
  // @keyframes myMove {
  //   0% {
  //     transform: translateY(0);
  //   }
  //   100% {
  //     transform: translateY(-150px);
  //   }
  // }
}
.tanchu {
  width: 100%;
  position: absolute;
  bottom: 1.066667rem;
  left: 0;
  z-index: 2;
  padding: 0.266667rem 0.533333rem;
  >>> .imgtext {
    background: rgba(26, 5, 5, 0.37);
    border-radius: 0.133333rem;
    display: flex;
    align-items: center;
    padding: 0.133333rem 0.266667rem;
    animation: myMove 5s linear 1;
    animation-fill-mode: forwards;
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

@keyframes myMove {
  0% {
    transform: translateY(0);
    // opacity: 0;
  }
  100% {
    transform: translateY(-200px);
    opacity: 0;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>