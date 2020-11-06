<template>
  <div class="searchpage">
    <div class="searchBox">
      <!-- <div class="placeholder"></div> -->
      <div class="flexBox">
        <van-icon
          @click="$router.back()"
          class="iconback"
          size="18px"
          name="arrow-left"
        />
        <van-search
          class="search"
          v-model="value"
          placeholder="复制商品链接或商品标题"
          background="none"
          clear-trigger="always"
          @search="onSearch"
          @focus="focuschange"
          @input="inputchange"
          @blur="blurchange"
          id="searchinput"
        >
          <template #right-icon>
            <div class="searchBtn" @click="onSearch(value)">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="searchdivli">
        <ul v-show="searchShow" class="searchul" ref="ulref">
          <li
            style="color: #323233"
            v-for="(i, index) in searchlist"
            :key="index"
            @click="onSearch(i[0])"
          >
            <span>{{ i[0] }}</span>
          </li>
        </ul>
      </div>
      <only-tabs @change="typeChange" :types="tabsType"></only-tabs>
    </div>
    <div class="history" v-show="hist">
      <div style="padding: 0 0.666667rem">
        <div class="fdsa">
          <h6>搜索记录</h6>
          <img
            @click="clearHistory"
            :src="require('@/assets/app/clear.png')"
            alt=""
          />
        </div>
        <div class="maoaf">
          <p @click="onSearch(i)" v-for="i in sHistory" :key="i">{{ i }}</p>
        </div>
        <div class="fdsa" v-if="hotSearchList.length">
          <h6>推荐搜索</h6>
        </div>
        <div class="maoaf" v-if="hotSearchList.length">
          <p
            @click="onSearch(i.title)"
            v-for="i in hotSearchList"
            :key="i.title"
          >
            {{ i.title }}
          </p>
        </div>
      </div>
    </div>
    <!--  @scroll="conScroll($event)" -->
    <div
      class="result"
      ref="scrollT"
      v-show="!hist"
      @scroll="conScroll($event)"
    >
      <index-filter coupon ref="filter" @change="filterchange"></index-filter>
      <div class="conwidth">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="nodatas" v-if="lengths == 0">
              <img src="@/assets/top.png" alt="" />
              <p>暂未搜到</p>
              <p>你想要的宝贝可能还在途中哦</p>
            </div>
            <commodity :commodityList="commodityList"></commodity>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Search",
  data() {
    let _this = this;
    return {
      searchShow: false,
      hotSearchList: [],
      searchlist: [["22"], ["33"], ["11"], ["22"], ["33"]],
      value: "",
      hist: true,
      sHistory: [],
      loading: false,
      finished: false,
      refreshing: false,
      type: "",
      saveScroll: 0,
      hideTop: false,
      commodityList: [],
      tabsType: [],
      subData: {
        coupon: false,
        dockingType: null,
        ip: returnCitySN.cip,
        keyword: "",
        pageNo: 0,
        sort: null,
      },
      lengths: null,
    };
  },
  methods: {
    valueclick(v) {
      console.log(0, "v");
      this.searchShow = true;
    },
    blurchange(e) {
      // console.log(e.target.value,'blur')
      // this.searchShow = false;
    },
    focuschange(e) {
      // console.log(e.target.value,'focu')
      this.hist = true;
      // this.searchShow = true
      if (!e.target.value) {
        this.searchShow = false;
      } else {
        this.searchdata(e.target.value);
      }
    },
    inputchange(value) {
      console.log(value, "input");
      if (!value) {
        this.searchShow = false;
      } else {
        this.searchdata(value);
      }
    },
    searchdata(value) {
      let _this = this;
      var xhr = new plus.net.XMLHttpRequest();
      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case 4:
            if (xhr.status == 200) {
              let responseText = JSON.parse(xhr.responseText);
              console.log(responseText, "xhr请求成功");
              _this.searchShow = true;
              _this.searchlist = responseText.result;
            } else {
              console.log("xhr请求失败");
            }
            break;
          default:
            break;
        }
      };
      xhr.open("GET", "https://suggest.taobao.com/sug?code=utf-8&q=" + value);
      xhr.send();
    },

    filterchange(v) {
      this.subData.coupon = v.coupon;
      this.subData.sort = v;
      if (!this.hist) {
        this.commodityList = [];
        this.onRefresh();
      }
    },
    conScroll(e) {
      this.saveScroll = e.target.scrollTop;
      // let save = this.saveScroll || 0;
      // let direction = e.target.scrollTop - save > 0;
      // let num = Math.abs(e.target.scrollTop - save);
      // if (direction) {
      //   if (num > 15) this.hideTop = true;
      // } else {
      //   if (num > 15) this.hideTop = false;
      // }
      // this.saveScroll = e.target.scrollTop;
    },
    typeChange(val) {
      // console.log(val,'valpdd')
      this.subData.dockingType = val;
      if (!this.hist) {
        this.commodityList = [];
        this.onRefresh();
      }
    },
    onSearch(value) {
      // this.searchShow = true
      console.log(value, "clickvalue00");
      if (value) {
        this.value = value;
        this.searchShow = false;
      } else {
        this.Toast.fail("请输入内容");
        return;
      }
      this.saveScroll = 0;
      this.$refs.filter.active = false;
      this.$refs.filter.clickItem(0);
      this.saveHist(value);
      this.$nextTick(() => {
        this.submit(value);
        this.hist = false;
      });
    },
    saveHist(value) {
      // console.log(value, "clickvalue");
      // return;
      for (let i = 0; i < this.sHistory.length; i++) {
        if (this.sHistory[i] == value) {
          this.sHistory.splice(i, 1);
        }
        if (this.sHistory.length >= 12) {
          this.sHistory.pop();
        }
      }
      this.sHistory.unshift(value);
      localStorage.sHistory = this.sHistory.join(",");
    },
    submit(value) {
      this.subData.keyword = value;
      this.commodityList = [];
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    clearHistory() {
      this.sHistory = [];
      localStorage.removeItem("sHistory");
    },
    onLoad() {
      // console.log(this.subData.dockingType, "typepdd");
      if (this.subData.dockingType.name == "PDD") {
        this.$api.app.home.recordPdd().then((res) => {
          console.log(res, "PDDserch");
          if (res.msg) {
            plus.runtime.openURL(res.msg);
            return;
          }
        });
      }
      this.subData.pageNo++;
      this.$api.app.home.query(this.subData).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          if (this.refreshing) {
            this.commodityList = [];
            this.refreshing = false;
          }
          let list = res.data.resultList;
          this.lengths = list.length;
          this.loading = false;
          if (list.length < 20) {
            this.finished = true;
          }
          list.forEach((i) => {
            this.commodityList.push(i);
          });
        } else {
          this.Toast.fail(res.msg);
          this.lengths = 0;
          this.finished = true;
          this.refreshing = false;
          this.loading = false;
        }
      });
    },
    onRefresh() {
      this.subData.pageNo = 0;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    getHotSearch() {
      this.$api.app.home.getHotSearch().then((res) => {
        // console.log(res,'热门')
        if (res.code == 200) {
          this.hotSearchList = res.data;
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.searchinput.focus();
      document.querySelector('#searchinput').focus();
    });
    let history = localStorage.sHistory ? localStorage.sHistory.split(",") : [];
    this.sHistory = history;
    let docktype = this.$store.getters.dockType;
    this.tabsType = docktype.slice(0, 4);
    this.getHotSearch();
    this.value = this.$route.query.content;
    // this.onSearch(this.$route.query.content);
  },
  created() {},
  activated() {
    this.$refs.scrollT.scrollTop = this.saveScroll;
  },
  beforeRouteLeave(to, from, next) {
    let keepAlive = to.name == "Detail";
    this.$route.meta.keepAlive = keepAlive;
    if (!keepAlive && this.$vnode.parent) {
      this.$vnode.parent.componentInstance.cache = {};
      this.$vnode.parent.componentInstance.key = [];
    }
    this.$forceUpdate();
    this.$nextTick(() => {
      next();
    });
  },
};
</script>

<style scoped lang="scss">
.searchpage {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .searchBox {
    // height: calc(65px + 44px);
    position: relative;
    z-index: 2;
    .placeholder {
      height: 100%;
    }
    .flexBox {
      background: $pageBg;
      display: flex;
      justify-content: space-between;
      height: 65px;
      // position: fixed;
      // top: 0;
      // left: 0;
      // right: 0;
      align-items: center;
      overflow: hidden;
      transition: height 0.3s;
      &.hideTop {
        height: 0;
      }
    }

    .iconback {
      margin-left: 10px;
      color: #333;
    }
    >>> .van-search__action {
      background: none !important;
    }
    >>> .van-search__content {
      border-radius: 10px;
      background: #fff;
      input {
        height: 35px;
      }
      .van-field {
        align-items: center;
      }
      .van-field__right-icon {
        align-self: stretch;
      }
    }
    .searchBtn {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $lineBg;
      padding: 0 20px;
      border-radius: 5px;
      color: #fff;
    }
    .search {
      flex: 1;
    }
    .types {
      // position: fixed;
      top: 65px;
      // left: 0;right: 0;
      >>> .van-tabs__nav {
        background: $pageBg;
      }
      .typeBox {
        background: none;
      }
    }
  }
  .searchdivli {
    // height: 400px;
    // border-radius: 0 0 10px 10px;
    // overflow: hidden;
    .searchul {
      position: absolute;
      top: 48px;
      width: 100%;
      z-index: 9;
      padding: 0 12px;
      padding-left: 40px;
      max-height: calc(400px - 60px);
      overflow: scroll;
      border-radius: 0 0 10px 10px;
      li {
        width: 100%;
        background: #fff;
        width: 100%;
        font-size: 0.373333rem;
        line-height: 22px;
        padding: 5px 8px;
      }
    }
  }
  .history {
    height: 0;
    // height: calc(100% - 65px - 44px);
    // overflow: scroll;
    flex: 1;
    // padding: 0 .666667rem;
    .fdsa {
      font-size: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      margin-top: 0.2rem;
      img {
        width: 0.4rem;
      }
    }
    .maoaf {
      display: flex;
      flex-wrap: wrap;
      p {
        padding: 0.15rem 0.5rem;
        border-radius: 0.266667rem;
        background: #e9e9e9;
        margin-right: 0.6rem;
        margin-top: 0.3rem;
        font-size: 0.266667rem;
        &:nth-child(even) {
          color: #fe5747;
        }
      }
    }
  }
  .result {
    height: 0;
    flex: 1;
    overflow-y: scroll;
    .nodatas {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      margin-top: 1.333333rem;
      img {
        width: 2.666667rem;
        height: 2.666667rem;
      }
      p {
        font-size: 0.373333rem;
        color: rgb(131, 129, 129);
        padding-top: 0.133333rem;
      }
    }
  }
}
</style>
