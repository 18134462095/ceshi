<template>
  <div class="commodityclass">
    <!-- 商品分类 -->
    <app-title>商品分类</app-title>
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <div class="conwidth">
      <list1 :list="supportlist"></list1>
    </div>
  </div>
</template>
<script>
export default {
  name:'Commodityclass',
  data(){
    return{
      supportlist: [
        {
          img: require("@/assets/support/nz1.png"),
          name: "女装",
          rouclick: "/my/dingdan",
        },
        {
          img: require("@/assets/support/my.png"),
          name: "母婴",
          rouclick: "/my/fensi",
        },
        {
          img: require("@/assets/support/hzp.png"),
          name: "化妆品",
          rouclick: "/my/zhuanqian",
        },
        {
          img: require("@/assets/support/jj.png"),
          name: "居家",
          rouclick: "/my/kabao",
        },
        {
          img: require("@/assets/support/xbps.png"),
          name: "鞋包配饰",
          rouclick: "/my/shangjiadl",
        },
        {
          img: require("@/assets/support/ms.png"),
          name: "美食",
          rouclick: "/my/youhuiquan",
        },
        {
          img: require("@/assets/support/wtyp.png"),
          name: "文体用品",
          rouclick: "/my/chongzhi",
        },
        {
          img: require("@/assets/support/smjd.png"),
          name: "数码家电",
          rouclick: "/my/shangjiadl",
        },
        {
          img: require("@/assets/support/nz2.png"),
          name: "男装",
          rouclick: "/my/youhuiquan",
        },
        {
          img: require("@/assets/support/xh.png"),
          name: "洗护",
          rouclick: "xihu",
        },
        {
          img: require("@/assets/support/sp.png"),
          name: "食品",
          rouclick: "shipin",
        },
        {
          img: require("@/assets/support/sj.png"),
          name: "手机",
          rouclick: "shouji",
        },
        {
          img: require("@/assets/support/bj.png"),
          name: "保健",
          rouclick: "baojian",
        },
        {
          img: require("@/assets/support/cp.png"),
          name: "车品",
          rouclick: "chepin",
        },
        {
          img: require("@/assets/support/ny.png"),
          name: "内衣",
          rouclick: "neiyi",
        },

      ],
      value:''
    }
  }
}
</script>
<style lang="scss" scoped>
.commodityclass{
  >>> .van-search{
    background: none;
  }
}
</style>