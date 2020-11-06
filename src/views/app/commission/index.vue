<template>
  <div class="index">
    <div class="titleSearch">
      <h6>大牌秒杀</h6>
      <div class="settings setting">
        <gong-gao></gong-gao>
      </div>
    </div>
    <comm-tabs v-if="tabs.length" :tabs="tabs" name="title" />
  </div>
</template>

<script>
export default {
  data() {
    let _this = this;
    return {
      tabs: [],
    };
  },
  methods: {
    // messageClick() {
    // },
  },
  beforeMount() {
    this.$api.app.taobao
      .getTbWlPpq()
      .then((res) => {
        this.tabs = res.data;
      })
      .catch((err) => {
      });
  },
  mounted() {},
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
      margin-right: 20px;
      transition: transform 0.3s;
      &.hideTop {
        transform: scale(0);
      }
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
        padding-right: 1.2rem;
      }
      .inner {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 15px;
        display: flex;
        justify-content: space-between;
        color: #666;
        font-size: 14px;
        align-items: stretch;
        .searIcon {
          align-self: center;
          margin: 0 10px;
        }
        span {
          flex: 1;
          align-self: center;
          font-size: 13px;
        }
        button {
          background: linear-gradient(-60deg, #fb2148, #fe5747);
          outline: none;
          border: none;
          color: #fff;
          border-radius: 15px;
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
        background: #000;
        margin: 0 3px;
      }
      i {
        margin: 0 3px;
      }
    }
  }
  .tab {
    flex: 1;
    height: 0;
    >>> .van-tab--complete {
      text-align: center;
      width: 70px;
    }
    >>> .van-tab--active {
      font-size: 0.48rem;
    }
    >>> .van-tabs__wrap::after {
      border-width: 0 !important;
    }
    >>> .van-tabs__content {
      height: calc(100% - 44px);
      position: relative;
    }
    >>> .van-tab__pane {
      height: 100%;
    }
    >>>.van-sticky {
      .van-tabs__wrap {
        .van-tabs__nav {
          padding: 0;
          margin-left: $blank;
          margin-right: $blank;
          padding-bottom: 15px;
          .van-tab {
            padding: 0 4px;
          }
        }
      }
    }
    .content {
      height: calc(100% - 6px);
      margin-top: 6px;
      overflow-y: scroll;
      padding: 0 $blank;
      .bannerwrap {
        width: 100%;
        height: 4rem;
        margin: 0.2rem auto;
        border-radius: 5px;
        overflow: hidden;
        .bannerslide {
          height: 100%;
          background: #fff;
        }
      }
    }
    
    .list1 {
      padding: 0;
      padding-bottom: 0.3rem;
      background: none;
    }
    .hotGoods {
      background: #fff;
      padding: 0.533333rem 0;
      border-radius: 0.266667rem;
      padding-left: 0.25rem;
      overflow: hidden;
      .title {
        font-size: 0.533333rem;
        margin-bottom: 0.266667rem;
      }
      .hotwrap {
        // height: 3rem;
        transition-timing-function: linear;
        .hotslide {
          width: 3rem;
          .imgBox {
            position: relative;
            height: 2rem;
            width: 100%;
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
              background: #000;
              display: block;
            }
          }
          .hotname {
            .swtitle {
              font-size: 0.373333rem;
              margin-top: 0.133333rem;
            }
            .price {
              span:first-child {
                font-size: 0.373333rem;
                color: #fd3748;
              }
              span:last-child {
                font-size: 0.32rem;
                color: #000;
                text-decoration: line-through;
                padding-left: 0.1rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
