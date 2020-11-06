<template>
  <div class="profitdetail">
    <app-title>查看详情</app-title>
    <div class="conwidth">
      <div class="padd20">
        <div class="lishilist">
          <p class="s-title">{{setdate($route.query.date||$route.query.data.date)}}</p>
          <survey2 :detailshow="false" :data="$route.query.data||null"></survey2>
        </div>
        <div class="lishilist">
          <p class="s-title">收入明细</p>
          <div class="table">
            <div class="th">
              <span>平台名称</span>
              <span>预估收入</span>
              <span>付款次数</span>
            </div>
            <div class="td" v-for="(i,index) in datalist" :key="index">
              <span>{{i.title}}</span>
              <span >{{i.amount}}</span>
              <span>{{i.num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "profitdetail",
  data() {
    return {
      datalist: null,
    };
  },
  mounted() {
    this.datalist = this.$route.query.datalist;
  },
  methods: {
    setdate(dates) {
      dates = dates.split("-");
      let str =
        dates.length == 2
          ? dates[0] + "年" + dates[1] + "月"
          : dates[0] + "年" + dates[1] + "月" + dates[2] + "日";
      return str;
    },
  },
};
</script>
<style lang="scss" scoped>
.profitdetail {
  .lishilist {
    margin-top: 0.373333rem;
    .s-title {
      font-size: 0.373333rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(26, 5, 5, 1);
      padding-bottom: 0.213333rem;
    }
    .table {
      width: 100%;
      background: #fff;
      border-radius: 0.133333rem;
      font-size: 0.32rem;
      border-collapse: inherit;
      // padding-left: 0.426667rem;
      // text-align: center;
      .th {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0.4rem 0.266667rem 0.4rem;
        font-size: 0.32rem;
        color: #AEAEAE;
        span {
          width: 1.333333rem;
          display: block;
        }
      }
      .td {
        display: flex;
        padding: 0.4rem;
        color: #AEAEAE;
        justify-content: space-between;
        span {
          width: 1.333333rem;
          display: block;
          font-size: 0.32rem;
          color: #8C8C8C;
        }
        span:nth-child(2) {
          font-size: 0.373333rem;
          color: #1A0505;
          font-size: 0.373333rem;
        }
      }
    }
  }
}
</style>