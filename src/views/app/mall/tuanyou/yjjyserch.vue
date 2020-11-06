<template>
  <div class="yjjyserch">
    <app-title>一键加油</app-title>
    <div class="conwidth">
      <div class="header">
        <div class="search">
          <form action="/">
            <van-search
              v-model="value"
              show-action
              placeholder="小区/写字楼/学校等"
              @cancel="onCancel"
            />
          </form>
        </div>
        <div class="congxindw">
          <div class="dingw">
            <p class="dwleft">历史搜索</p>
            <div class="dwbtn">
              <img src="@/assets/app/delete.png" alt="" />
            </div>
          </div>
          <div class="address">
            <p>来电(豫新铜锅涮)</p>
            <p>中粮大夏</p>
            <p>联合中心</p>
            <p>航海东路范德萨发达霜十分大</p>
          </div>
        </div>
      </div>
      <!-- <div class="content">
        <p class="fujin">附近地址</p>
        
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "yjjyserch",
  data() {
    return {
      value: "",
    };
  },
  methods:{
    onCancel(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
.yjjyserch {
  .header {
    width: 100%;
    // height: 4rem;
    background: #ffffff;
    padding: 0.4rem;
    .search {
      >>> .van-search {
        padding: 0;
        background: none;
      }
      >>> .van-search__content {
        padding: 0;
      }
    }
    .congxindw {
      margin-top: 0.666667rem;
      .title {
        font-size: 0.373333rem;
        color: #8c8c8c;
      }
      .dingw {
        margin-top: 0.133333rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .dwleft {
          font-size: 0.426667rem;
          color: #000;
          font-weight: 400;
        }
        .dwbtn {
          width: 0.666667rem;
          height: 0.666667rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .address {
        margin-top: 0.266667rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        p {
          font-size: 0.373333rem;
          color: #000;
          padding: 0.133333rem;
          background: #f3f3f4;
          margin: 0.133333rem;
          border-radius:2px;
        }
      }
    }
  }
}
</style>