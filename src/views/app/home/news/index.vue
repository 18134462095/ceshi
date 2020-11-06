<template>
  <div class="news">
    <!-- 看新闻 -->
    <app-title>看新闻</app-title>
    <van-tabs v-model="active">
      <van-tab title="头条" swipeable v-for="i in 10" :key="i">
        <div class="conwidth">
          <div class="content" v-for="m in 5" :key="m">
            <p class="news-title">华云链康改革创新给信电商带来的利好华云链康改革创新给信电商带来的。</p>
            <div class="news-img">
              <div class="img" v-for="n in 3" :key="n">
                <img src="@/assets/app/news1.png" alt />
              </div>
            </div>
            <div class="news-foo">
              <p>
                富人靠科技
                <span>阅读12309</span>
              </p>
              <p>2020.07.31 15:00</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "News",
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
.news {
  // padding-bottom: .266667rem;
  >>> .van-tab {
    font-size: 0.373333rem;
    color: #aeaeae;
  }
  >>> .van-tab--active {
    font-size: 0.48rem;
    font-weight: 400;
    color: #fe5747;
  }
  >>> .van-tabs__line {
    background: #fe5747;
  }
  >>>.van-sticky {
      .van-tabs__wrap {
        .van-tabs__nav {
          padding: 0;
          margin-left: $blank;
          margin-right: $blank;
          padding-bottom: 15px;
        }
      }
    }
  .content {
    padding: 0.266667rem 0.533333rem;
    width: 100%;
    // height: 4.186667rem;
    background: rgba(255, 255, 255, 1);
    margin-top: 0.2rem;
    .news-title {
      font-size: 0.426667rem;
      font-weight: 400;
      color: rgba(29, 8, 8, 1);
      line-height: 0.56rem;
    }
    .news-img {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.133333rem;
      margin: 0.3rem 0;
      .img {
        width: 2.85rem;
        height: 1.84rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .news-foo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p:first-child {
        font-size: 0.293333rem;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
        line-height: 0.506667rem;
        span {
          font-size: 0.266667rem;
          font-weight: 400;
          color: rgba(174, 174, 174, 1);
        }
      }
      p:last-child {
        font-size: 0.266667rem;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
      }
    }
  }
}
</style>