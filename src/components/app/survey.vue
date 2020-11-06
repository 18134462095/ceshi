<template>
  <div class="day" v-if="data">
    <div class="dayflex">
      <div class="flex1">
        <p>预估收入</p>
        <p class="money">
          <span style="font-size:12px">￥</span>
          {{data.amount}}
        </p>
      </div>
      <div class="flex1">
        <p>付款单数</p>
        <p class="danshu">{{data.num}}</p>
      </div>
    </div>
    <div class="detail" v-show="detailshow">
      <p></p>
      <p @click="toxiangqing">查看详情</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "survey2",
  props: {
    detailshow: {
      type: Boolean,
      default: true,
    },
    data:null,
    type:{
      type:String,
      default:null
    }
  },
  methods: {
    toxiangqing(){
      // this.$router.push({path:'/app/profitdetail',query:{}})
      this.$api.app.my.memberPlateFormList({
        type:this.type,
        date:this.data.date
      }).then(res=>{ 
        this.$router.push({path:'/app/profitdetail',query:{datalist:res.data,data:this.data}})
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.day {
  width: 100%;
  // height: 2.426667rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.133333rem;
  padding: 0.4rem;
  .dayflex {
    display: flex;
    .flex1 {
      flex: 1;
      p:first-child {
        font-size: 0.32rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(140, 140, 140, 1);
        padding-bottom: 0.4rem;
      }
      .money {
        font-size: 0.48rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(254, 87, 71, 1);
      }
      .danshu {
        font-size: 0.373333rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(26, 5, 5, 1);
      }
    }
  }
  .detail {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 0.293333rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(174, 174, 174, 1);
    }
  }
}
</style>