<template>
  <div class="fans" v-if="datas" :key="keys">
    <app-title>我的粉丝</app-title>
    <!-- <div class="fanscontent"> -->
    <div class="explain">
      <div class="conwidth explainList">
        <div class="expItem">
          <p>
            {{ todlist.directNum }}
          </p>
          <span>粉丝总数</span>
        </div>
        <div class="expItem">
          <p>{{ todlist.todayNum }}</p>
          <span>新增粉丝</span>
        </div>
        <div class="expItem">
          <p>{{ todlist.parentName }}</p>
          <span>我的邀请人</span>
        </div>
      </div>
    </div>
    <div class="list">
      <!-- <div class="nodatas" v-if="data.length == 0">
          <nodata></nodata>
        </div> -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="200"
        >
          <div class="fanslist conwidth">
            <div
              class="fansItem"
              @click="todetail(item.id)"
              v-for="item in datas"
              :key="item.openId"
            >
              <img v-if="item.headImgUrl" :src="item.headImgUrl" alt />
              <img v-else src="@/assets/my/headimg.png" alt />
              <div class="fansmsg">
                <div>
                  <span>{{ item.phone }}</span>
                  <p style="font-size: 0.293333rem" v-if="item.isToday">新增</p>
                </div>
                <p class="time" v-if="item.direct">直属粉丝</p>
                <p class="time" v-else>粉丝</p>
              </div>
              <p style="font-size: 0.293333rem; color: #fd5747">
                本月贡献:{{ item.todayContribution }}元
              </p>
              <van-icon class="arrow" name="arrow" />
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "Fans",
  data() {
    return {
      todlist: {
        directNum: 0,
        todayNum: 0,
        parentName: 0,
      },
      datas: [],
      active: 0,
      tabs: [],
      keys: 0,
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    // this.getfans();
  },
  methods: {
    onLoad() {
      // this.finished = false;
      this.pageIndex++;
      this.loading = true;
      this.getfans();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.datas = [];
      this.onLoad();
    },

    getfans() {
      this.$api.app.my.getMyfans(this.pageIndex).then((res) => {
        // this.data = res.data;
        console.log(res.data);
        if (res.code == 200) {
          this.todlist.directNum = res.data.directNum;
          this.todlist.todayNum = res.data.todayNum;
          this.todlist.parentName = res.data.myInfo.parentName;
          this.loading = false;
          // this.finished = true;
          this.refreshing = false;
          if (res.data.totalList.length < 10) {
            this.finished = true;
          }
          res.data.totalList.forEach((i) => {
            // i.img = this.replaceHttp(i.img);
            this.datas.push(i);
          });
        } else {
          this.Toast.fail("获取信息失败");
          this.loading = false;
          this.pageIndex--;
          this.finished = true;
        }
      });
    },
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
    todetail(id) {
      this.$router.push({ path: "fansMsg", query: { id: id } });
    },
    fensisx() {
      // this.getfans();
      // this.keys++
    },
  },
};
</script>

<style lang="scss" scoped>
.fans {
  height: 100vh;
  display: flex;
  flex-direction: column;
  // .fanscontent {
  //   height: 100%;
  // height: calc(100% - 40px);
  // overflow-y: scroll;
  .explain {
    padding: 0.4rem 0;
    background: #fff;
    .explainList {
      display: flex;
      div {
        flex: 1;
        position: relative;
        text-align: center;
        line-height: 1.5;
        p {
          font-size: 0.373333rem;
          color: rgba(60, 60, 60, 1);
        }
        span {
          font-size: 0.32rem;
          color: rgba(174, 174, 174, 1);
        }
        &:after {
          display: block;
          content: "";
          position: absolute;
          width: 1px;
          right: 0;
          top: 0;
          bottom: 0;
          background: #f3f3f4;
        }
        &:last-child:after {
          display: none;
        }
      }
    }
  }
  .list {
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
  .fanslist {
    padding: 0 20px;
    // height:100px;
    .fansItem {
      display: flex;
      margin-top: 0.266667rem;
      background: #fff;
      border-radius: 0.133333rem;
      align-items: center;
      padding: 0.266667rem;
      img {
        width: 0.96rem;
        height: 0.96rem;
        display: block;
        // background: #000;
        margin-right: 0.266667rem;
        border-radius: 50%;
      }
      .fansmsg {
        flex: 1;
        width: 0;
        div {
          display: flex;
          align-items: center;
          span {
            font-size: 0.373333rem;
            color: rgba(26, 5, 5, 1);
          }
          p {
            font-size: 0.293333rem;
            color: rgba(254, 87, 71, 1);
            padding: 0.06rem 0.2rem;
            background: rgba(255, 245, 247, 1);
            border-radius: 0.133333rem 0 0.133333rem 0;
            margin-left: 0.266667rem;
          }
        }
        .time {
          font-size: 0.293333rem;
          color: rgba(174, 174, 174, 1);
        }
      }
      .arrow {
        font-size: 0.4rem;
      }
    }
  }
  .nodatas {
    margin-top: 4rem;
    >>> .goguang {
      display: none;
    }
  }
  // }
}
</style>