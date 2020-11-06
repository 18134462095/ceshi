<template>
  <div class="incomedetail">
    <app-title>收支明细</app-title>
    <!-- <div v-if="$store.getters.info.id == 11" class="conwidth">
      <div class="detailtabs">
        <van-tabs v-model="jiaact">
          <van-tab :title="i.title" v-for="i in jiatabfor" :key="i.title">
            <div class="list">
              <div class="zongji">
                <div class="first">
                  <p>收支总计</p>
                  <p>{{ i.income }}(元)</p>
                </div>
                <div class="last">
                  <p>付款单数</p>
                  <p>{{ i.selectOrderCount }}</p>
                </div>
              </div>
              <div class="detail">
                <p class="detail-p">收支明细</p>
                <van-list
                  v-model="jialoading"
                  :finished="jiafinished"
                  finished-text="没有更多了"
                  @load="jiaonLoad"
                >
                  <div class="detail-con">
                    <div
                      class="d-list"
                      v-for="(p, index) in jialist"
                      :key="p"
                    >
                      <div class="left">
                        <div class="textimg">
                          <p class="t1">订单佣金</p>
                          <p class="t2" v-if="!p.self">直属</p>
                        </div>
                        <p class="date">{{ p.createTime }}</p>
                      </div>
                      <div class="right">
                        <p>{{ p.memberAmount }}</p>
                      </div>
                    </div>
                  </div>
                </van-list>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div> -->
    <div class="conwidth">
      <div class="detailtabs">
        <van-tabs v-model="active" @click="tabsclick">
          <van-tab :title="i.title" v-for="i in tabfor" :key="i.title">
            <div class="list">
              <div class="zongji" v-if="$store.getters.info.id == 11 & active==0">
                <div class="first">
                  <p>收支总计</p>
                  <p>824.96(元)</p>
                </div>
                <div class="last">
                  <p>付款单数</p>
                  <p>395</p>
                </div>
              </div>
              <!-- 真 -->
              <div v-else class="zongji">
                <div class="first">
                  <p>收支总计</p>
                  <p>{{ income }}(元)</p>
                </div>
                <div class="last">
                  <p>付款单数</p>
                  <p>{{ selectOrderCount }}</p>
                </div>
              </div>
              <div class="detail">
                <p class="detail-p">收支明细</p>
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                  <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    offset="200"
                  >
                    <div class="nodata" v-if="lengths == 0">
                      <nodata :fun="onRefresh"></nodata>
                    </div>
                    <div v-else class="detail-con">
                      <div class="d-list" v-for="i in list" :key="i.id">
                        <div class="left">
                          <div class="textimg">
                            <p class="t1">订单佣金</p>
                            <p class="t2" v-if="!i.self">直属</p>
                          </div>
                          <p class="date">{{ formatDate(i.createTime) }}</p>
                        </div>
                        <div class="right">
                          <p v-if="dockingType == 'TB'">
                            {{ i.settleMemberAmount }}
                          </p>
                          <p v-if="dockingType == 'PDD'">
                            {{ i.memberAmount }}
                          </p>
                          <p v-if="dockingType == 'JD'">
                            {{ i.actualMemberAmount }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </van-list>
                </van-pull-refresh>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "incomedetail",
  data() {
    return {
      // jiaact: 0,
      active: 0,
      tabfor: [
        {
          title: "淘宝明细",
        },
        {
          title: "拼多多明细",
        },
        {
          title: "京东明细",
        },
      ],
      list: [],
      selectOrderCount: 0, //总单数
      income: "0.00", //收入总计
      loading: false,
      finished: false,
      refreshing: false,
      pageIndex: 0,
      lengths: null,
      dockingType: "TB",

      // jialoading: false,
      // jiafinished: false,
      // jiatabfor: [
      //   {
      //     title: "淘宝明细",
      //     income: 0,
      //     selectOrderCount: 0,
      //   },
      //   {
      //     title: "京东明细",
      //     income: 1,
      //     selectOrderCount: 1,
      //     // jialist: [
      //     //   {
      //     //     self: false,
      //     //     memberAmount: 1,
      //     //     createTime: "2020.01.01 10:22",
      //     //   },
      //     // ],
      //   },
      //   {
      //     title: "拼多多明细",
      //     income: 2,
      //     selectOrderCount: 2,
      //     // jialist: [
      //     //   {
      //     //     self: false,
      //     //     memberAmount: 2,
      //     //     createTime: "2020.01.01 10:22",
      //     //   },
      //     // ],
      //   },
      // ],
      // jialist: [],
    };
  },
  mounted() {},
  methods: {
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
    tabsclick(v) {
      console.log(v, "v");
      if (v == 0) {
        this.dockingType = "TB";
      } else if (v == 1) {
        this.dockingType = "PDD";
      } else if (v == 2) {
        this.dockingType = "JD";
      }
      this.onRefresh();
    },
    getincomeDetail() {
      this.$api.app.my
        .incomeDetail({
          pageIndex: this.pageIndex,
          dockingType: this.dockingType,
        })
        .then((res) => {
          if (res.code == 200) {
            this.income = res.data.income;
            this.selectOrderCount = res.data.selectOrderCount;
            // if (res.data.pddfindPage) {
            this.lengths = res.data.findPage.totalSize;
            //拼多多
            res.data.findPage.content.forEach((i, index) => {
              i.settleMemberAmount = i.settleMemberAmount / 100; //TB
              i.memberAmount = i.memberAmount / 100; //PDD
              i.actualMemberAmount = i.actualMemberAmount / 100; //JD
              this.list.push(i);
            });
            this.loading = false;
            this.refreshing = false;
            if (res.data.findPage.content.length < 10) {
              this.finished = true;
            }
          } else {
            this.Toast.fail(res.msg);
            this.refreshing = false;
            this.loading = false;
            this.pageIndex--;
          }
        });
    },
    onLoad() {
      this.loading = true;
      this.pageIndex++;
      this.getincomeDetail();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.list = [];
      this.onLoad();
    },

    // jiaonLoad(){
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.jialist.push(this.jialist.length + 1);
    //     }

    //     // 加载状态结束
    //     this.jialoading = false;

    //     // 数据全部加载完成
    //     if (this.jialist.length >= 40) {
    //       this.jiafinished = true;
    //     }
    //   }, 1000);
    // }
  },
};
</script>
<style lang="scss" scoped>
.incomedetail {
  height: 100vh;
  .conwidth {
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
  .detailtabs {
    >>> .van-tabs__nav {
      background: none;
      .van-tab--active {
        color: #fe5747;
      }
      .van-tabs__line {
        background: #fe5747;
      }
    }
    .list {
      padding: 0.4rem 0.533333rem;
      .zongji {
        padding: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #ffffff;
        border-radius: 0.266667rem;
        text-align: center;
        div {
          line-height: 22px;
          p:first-child {
            font-size: 0.346667rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #1d0808;
          }
          p:last-child {
            font-size: 0.373333rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
          }
        }
        .first {
          p:last-child {
            color: #fe5747;
          }
        }
      }
      .detail {
        margin-top: 0.52rem;
        .detail-p {
          font-size: 0.426667rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #1d0808;
          margin-left: 0.48rem;
          margin-bottom: 0.266667rem;
        }
        .detail-con {
          background: #ffffff;
          padding: 0.266667rem 0.466667rem;
          border-radius: 0.266667rem;
          .d-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.266667rem 0;
            .left {
              .textimg {
                display: flex;
                align-items: center;
                .t1 {
                  font-size: 0.373333rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: #1a0505;
                }
                .t2 {
                  margin-left: 0.32rem;
                  background: linear-gradient(180deg, #ff7a6d, #fb2148);
                  border-radius: 3px;
                  padding: 1px 5px;
                  text-align: center;
                  color: #ffffff;
                }
              }
              .date {
                margin-top: 0.3rem;
                font-size: 0.32rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #aeaeae;
              }
            }
            .right {
              font-size: 0.48rem;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #fe5747;
            }
          }
        }
      }
    }
  }
  .nodata {
    position: fixed;
    top: 8.2rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 3;
  }
}
</style>