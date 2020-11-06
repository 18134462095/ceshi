<template>
  <div class="browsing">
    <!-- 浏览记录 -->
    <app-title>浏览记录</app-title>
    <p class="scjl" @click="scjl">删除记录</p>
    <div class="conwidth" @scroll="conScroll($event)">
      <nodata v-if="browsingList.length == 0"></nodata>
      <div
        v-else
        class="content"
        v-for="(i,index) in browsingList"
        :key="index"
        @click="toorder(i)"
      >
        <div class="bro-img">
          <img v-lazy="i.pictUrl" :src="i.pictUrl" alt />
        </div>
        <div class="bro-right">
          <!-- <p
            class="bro-title"
            v-if="i.shortTitle"
          >{{i.shortTitle.length > 30 ? i.shortTitle.slice(0,30) + '...':i.shortTitle}}</p>-->
          <p class="bro-title">{{ i.title }}</p>
          <div class="bro-con">
            <div class="quanfanli">
              <quan
                :quan="i.couponAmount"
                :fanli="i.memberForecastCommission"
              ></quan>
              <p class="bro-money">
                <span>￥{{ i.salePrice }}</span>
                <span>￥{{ i.reservePrice }}</span>
              </p>
            </div>
            <div>
              <div class="bro-btn" @click.stop="deletes(i,index)">删除</div>
              <div class="bro-btn" @click.stop="xiangsi(i)">找相似</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Browsing",
  data() {
    return {
      browsingList: [],
      datas: []
    };
  },
  created() {
    this.getlist();
  },
  activated() {
    let tbs = document.querySelectorAll(".conwidth")[0];
    tbs.scrollTop = this.saveScroll;
  },
  methods: {
    deletes(i,index) {
      console.log(i,index);
      this.$api.app.my
        .delBrowseInfo({
          goodsId: i.itemId,
          plateForm: this.datas[index].plateForm,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.Toast("删除成功");
            this.getlist();
          }
        });
    },
    getlist() {
      this.$api.app.my.getBrowseList().then((res) => {
        if (res.code == 200) {
          let arr = res.data.map((i) => JSON.parse(i.goodsInfoJson));
          // console.log(arr, "arr");
          arr.forEach((i) => {
            i.pictUrl = this.replaceHttp(i.pictUrl);
          });
          this.datas = res.data;
          this.browsingList = arr;
        } else {
          this.Toast(res.msg);
        }
      });
    },
    conScroll(e) {
      this.saveScroll = e.target.scrollTop;
    },
    toorder(params) {
      this.$router.push({
        name: "Detail",
        params,
      });
    },
    xiangsi(i) {
      let type = i.dockingType.name;
      switch (type) {
        case "JD":
          this.$router.push({
            name: "Similarity",
            params: {
              id: i.itemId,
              type,
            },
          });
          break;
        case "TB":
          this.$router.push({
            name: "Similarity",
            params: {
              id: i.itemId,
              type,
            },
          });
          break;
        case "TM":
          this.$router.push({
            name: "Similarity",
            params: {
              id: i.itemId,
              type,
            },
          });
          break;
        case "PDD":
          this.Toast("拼多多暂无相似");
          break;
      }
    },
    scjl() {
      this.Dialog.confirm({
        title: "删除浏览记录",
        message: "是否要清空浏览记录列表",
      })
        .then(() => {
          this.Toast.loading({
            message: "加载中",
            duration: 0,
          });
          this.$api.app.my.delBrowser().then((res) => {
            this.Toast.clear();
            if (res.code == 200) {
              this.browsingList = [];
              this.Toast("删除成功");
            } else {
              this.Toast("删除失败");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.browsing {
  height: 100vh;
  .conwidth {
    height: calc(100% - 40px);
    overflow-y: scroll;
    padding: 0 $blank;
  }
  .scjl {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.32rem;
    font-weight: 400;
    color: #000;
    padding: 12px 20px 0 0;
    z-index: 1000;
  }
  .content {
    display: flex;
    width: 100%;
    background: #fff;
    height: 2.666667rem;
    border-radius: 0.133333rem;
    overflow: hidden;
    margin-bottom: 0.2rem;
    .bro-img {
      width: 30%;
      height: 100%;
      padding-right: 0.266667rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .bro-right {
      width: 70%;
      padding-right: 0.4rem;
      .bro-title {
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(26, 5, 5, 1);
        margin: 0.2rem 0 0 0;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bro-con {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .quanfanli {
          >>> .quan {
            font-size: 0.266667rem;
            margin-top: 0.4rem;
          }
          .bro-money {
            margin-top: 0.4rem;
            span:first-child {
              font-size: 0.32rem;
              color: #fe5747;
            }
            span:last-child {
              font-size: 0.293333rem;
              color: #aeaeae;
              text-decoration: line-through;
            }
          }
        }
        .bro-btn {
          width: 1.6rem;
          height: 0.666667rem;
          border: 1px solid rgba(174, 174, 174, 1);
          border-radius: 0.133333rem;
          font-size: 0.32rem;
          font-weight: 400;
          color: rgba(174, 174, 174, 1);
          text-align: center;
          line-height: 0.666667rem;
          margin-top: 0.133333rem;
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