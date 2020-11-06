<template>
  <div class="tongzhi">
    <app-title>官方公告</app-title>
    <nodata v-if="lengths==0"></nodata>
    <div v-else class="conwidth">
      <div class="padd20">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="200"
          >
            <div class="tzlist" @click="toNOte(i)" v-for="i in list" :key="i.id">
              <p class="date">{{formatDate(i.createTime)}}</p>
              <div class="tip">
                <div class="tz-text">
                  <p>{{i.title}}</p>
                  <div>{{i.description}}</div>
                </div>
                <div class="tz-img">
                  <img src="@/assets/my/righthui.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "tongzhi",
  data() {
    return {
      lengths:null,
      list:[],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    getNotices() {
      this.$api.app.my
        .getNotices({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          if (res.code == 200) {
          this.lengths = res.data.data.totalSize
            res.data.data.content.forEach((i) => {
              this.list.push(i);
            });
            console.log(res)
            this.loading = false;
            // this.finished = true;
            this.refreshing = false;
            if (res.data.data.content.length < 10) {
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
      this.getNotices();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.list = [];
      this.onLoad();
    },

    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
    toNOte(params) {
      this.$router.push({
        name: "TzDetail",
        params,
      });
      this.$api.app.home.readNotice(params.id);
      this.getInfo();
    },
  },
  // computed: {
  //   list() {
  //     let list = this.$store.getters.inform.data;
  //     let hasRead = list.filter((i) => i.hasRead);
  //     let noRead = list.filter((i) => !i.hasRead);
  //     return noRead.concat(hasRead);
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.tongzhi {
  overflow: hidden;
  height: 100vh;
  .conwidth {
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
  .tzlist {
    width: 100%;
    background: #fff;
    border-radius: 0.133333rem;
    padding: 0.4rem 0.266667rem;
    margin-top: 0.266667rem;
    .date {
      font-size: 0.293333rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(174, 174, 174, 1);
      text-align: center;
    }
    .tip {
      display: flex;
      align-items: center;
      padding-top: 0.2rem;
      .tz-text {
        flex: 1;
        // line-height: .6rem;
        p:first-child {
          font-size: 0.373333rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(26, 5, 5, 1);
        }
        div:last-child {
          font-size: 0.32rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(140, 140, 140, 1);
          padding-top: 0.1rem;
        }
        >>> img {
          width: 100%;
          display: block;
          margin: 0 auto;
        }
      }
      .tz-img {
        width: 0.2rem;
        height: 0.373333rem;
        img {
          width: 100%;
          height: 100%;
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