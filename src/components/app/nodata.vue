<template>
  <div class="nodata">
    <div class="dataimg">
      <img src="@/assets/top.png" alt />
    </div>
    <!-- <div class="databtn">没有找到相关的宝贝</div> -->
    <div class="goguang" @click="click">{{fun?'点击刷新':'去逛逛'}}</div>
  </div>
</template>
<script>
export default {
  name: "nodata",
  props:['fun','index'],
  methods:{
    click(){
      // let index = typeof this.$parent.active == "number" ? this.$parent.active + 1 : 0;
      if(this.fun){
        this.fun(this.index)
      } else {
        this.$router.push('commission')
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nodata {
  // position: absolute;
  // left: 50%;
  // margin-left: -1.646667rem;
  // margin-top: 5.333333rem;
  .dataimg {
    width: 3.173333rem;
    height: 2.906667rem;
    overflow: hidden;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .databtn {
    margin: 0 auto;
    margin-top: 0.4rem;
    width: 2.4rem;
    height: 0.666667rem;
    border: 1px solid rgba(140, 140, 140, 1);
    box-shadow: 0px 0px 21px 0px rgba(140, 140, 140, 0.16);
    border-radius: 0.133333rem;
    text-align: center;
    line-height: 0.55rem;
    font-size: 0.373333rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(60, 60, 60, 1);
  }
  .goguang {
    margin: 0 auto;
    margin-top: .426667rem;
    width: 1.72rem;
    height: 0.666667rem;
    border: 1px solid rgba(253, 71, 87, 1);
    box-shadow: 0px 0px 21px 0px rgba(139, 139, 139, 0.16);
    border-radius: 0.133333rem;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.373333rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(253, 87, 71, 1);
  }
}
</style>