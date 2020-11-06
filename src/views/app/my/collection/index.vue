<template>
  <div class="collection">
    <!-- 我的收藏 -->
    <app-title>我的收藏</app-title>
    <nodata v-if="lengths==0"></nodata>
    <div v-else class="conwidth" @scroll="conScroll($event)">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="200"
        >
          <div
            class="coll-content"
            v-for="i in collectionList"
            :key="i.itemId"
            @click="toadetail(i)"
          >
            <div class="padd10">
              <div class="content-box">
                <div class="box-img">
                  <img v-lazy="i.pictUrl" :src="i.pictUrl" alt />
                </div>
                <div class="box-text">
                  <p v-if="i.title">{{i.title.length > 40 ? i.title.slice(0,40) + '...':i.title}}</p>
                  <p>￥{{i.reservePrice}}</p>
                </div>
              </div>
              <div class="purchase">
                <quan quan="3" fanli="2.5"></quan>
                <div class="pur-money">
                  <p>￥{{i.salePrice}}</p>
                  <p @click.stop="shoping(i)">去购买</p>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
export default {
  name: "Collection",
  data() {
    return {
      collectionList: [],
      saveScroll: "",
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      lengths:null,
    };
  },
  created() {

  },
  methods: {
    getCollectionList() {
      this.$api.app.my
        .getCollectionList({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          
          if (res.code == 200) {
            this.lengths = res.data.totalSize
            res.data.content.forEach(i => {
             i.goodsInfoJson = JSON.parse(i.goodsInfoJson)
            //  console.log(i.goodsInfoJson)
             i.goodsInfoJson.pictUrl = this.replaceHttp(i.goodsInfoJson.pictUrl)
             this.collectionList.push(i.goodsInfoJson)
            });
            
            this.loading = false;
            // this.finished = true;
            this.refreshing = false;
            if (res.data.content.length < 10) {
              this.finished = true;
            }
          } else {
            this.Toast.fail("获取信息失败");
            this.loading = false;
            this.pageIndex--;
          }
        });
    },
    onLoad() {
      // this.finished = false;
      this.loading = true;
      this.pageIndex++;
      this.getCollectionList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.collectionList = [];
      this.onLoad();
    },

    toadetail(params) {
      // console.log(params)
      this.$router.push({ name: "Detail", params });
    },
    shoping(i) {
      this.Toast.loading({
        message: "加载中",
        duration: 0,
      });
      let goodData = Object.assign({}, i);
      if (goodData.turnChain) {
        let type = goodData.dockingType.name;
        switch (type) {
          case "TB":
            this.$api.app.taobao.tbkIdPrivilege(goodData.itemId).then((res) => {
              this.Toast.clear();
              if (res.code == 200) {
                goodData.couponShareUrl = res.data.coupon_click_url;
                this.toifm(goodData);
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
                  this.toifm(goodData);
                } else {
                  this.Toast.fail("获取信息失败, 请重试!");
                }
              });
            break;
          case "PDD":
            this.$api.app.pinduoduo
              .createUrl({
                goodsId: goodData.itemId,
                searchId: goodData.searchId,
              })
              .then((res) => {
                this.Toast.clear();
                if (res.code == 200) {
                  goodData.couponShareUrl = res.msg;
                  this.toifm(goodData);
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
        this.getShoucang();
        this.Toast.clear();
      }
    },
    toifm(goodData) {
      let url = goodData.hasCoupon
        ? this.replaceHttp(goodData.couponShareUrl)
        : this.replaceHttp(goodData.url);
      plus.runtime.openWeb(url);
    },
    conScroll(e) {
      this.saveScroll = e.target.scrollTop;
    },
  },
  activated() {
    let tbs = document.querySelectorAll(".conwidth")[0];
    tbs.scrollTop = this.saveScroll;
  },
};
</script>
<style lang="scss" scoped>
.collection {
  height: 100vh;
  .conwidth {
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
  .coll-content {
    // width: 100%;
    margin: 0.2rem $blank;
    height: 2.96rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.133333rem;
    padding-top: 0.226667rem;
    .padd10 {
      margin: 0 0.266667rem;
      .content-box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 1.733333rem;
        background: rgba(243, 243, 244, 1);
        border-radius: 0.133333rem;
        .box-img {
          width: 1.466667rem;
          height: 1.466667rem;
          border-radius: 0.133333rem;
          margin: 0.133333rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            // object-fit: cover;
          }
        }
        .box-text {
          p:first-child {
            font-size: 0.293333rem;
            font-weight: 400;
            color: rgba(60, 60, 60, 1);
          }
          p:last-child {
            font-size: 0.32rem;
            font-weight: 400;
            color: rgba(26, 5, 5, 1);
            margin-top: 0.3rem;
          }
        }
      }
      .purchase {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.173333rem 0;
        >>> .quan {
          margin-top: 0;
          font-size: 0.266667rem;
        }
        .pur-money {
          display: flex;
          align-items: center;
          p:first-child {
            font-size: 0.32rem;
            font-weight: 400;
            color: rgba(254, 87, 71, 1);
          }
          p:last-child {
            width: 1.6rem;
            height: 0.666667rem;
            background: rgba(254, 87, 71, 1);
            border-radius: 0.133333rem;
            font-size: 0.32rem;
            font-weight: 400;
            color: rgba(255, 254, 254, 1);
            line-height: 0.666667rem;
            text-align: center;
            margin-left: 0.266667rem;
          }
        }
      }
    }
  }
}
.nodata {
    position: fixed;
    top: 5.2rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 3;
  }
</style>