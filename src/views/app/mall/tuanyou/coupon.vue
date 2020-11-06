<template>
  <div class="coupon">
    <app-title>一键加油</app-title>
    <div class="box">
      <van-tabs v-model="active">
        <van-tab v-for="i in tab" :title="i" :key="i">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="item" v-for="item in list" :key="item">
                  <h4>新手注册礼</h4>
                  <p>适用于团油部分合作加油站</p>
                  <p>有效期2020.09.27 09:33:35-2020.10.04 09:33:35</p>
									<div class="jiage">
										<span><i>¥</i>20.11</span>
										<p>满230元可以使用</p>
									</div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: ["未使用", "已使用", "已过期"],
      count: "0",
      isLoading: false,
      active: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon {
  width: 100%;
  height: 100vh;
  .box {
    width: 100%;
    height: calc(100% - 40px);
    >>> .van-tabs {
        height: 100%;
      .van-tabs__wrap {
      }
      .van-tabs__content {
        height: calc(100% - 44px);
        overflow-y: scroll;
      }
      .item {
          width: 9.173333rem;
          margin: 0 auto;
          margin-top: 0.266667rem;
          border-radius: 0.133333rem;
          background: #fff;
          height: 2.666667rem;
					padding: 0.4rem 0 0 0.266667rem;
					position: relative;
					h4 {
						color: #000;
						font-size: 0.373333rem;
						line-height: 0.32rem;
					}
					p {
						font-size: 0.16rem;
						color: #8C8C8C;
						margin-top: 0.266667rem;
					}
					.jiage {
						position: absolute;
						top: 0.3rem;
						right: 0.8rem;
						text-align: center;
						span {
							color: #ee0a24;
							font-size: 0.533333rem;
							font-weight: 600;
							i {
								font-style: normal;
								font-size: 0.24rem;
								font-weight: 200;
							}
						}
						p {
							color: #333;
							margin-top: 0.133333rem;
						}
					}
      }
    }
  }
}
</style>