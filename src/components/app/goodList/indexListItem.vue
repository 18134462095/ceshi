<template>
  <div class="indexListItem" @click="toDetail">
    <div class="img">
      <img :src="data.pictUrl ? replaceHttp(data.pictUrl) : replaceHttp(data.itempic)" />
    </div>
    <div class="texts">
      <p class="title"><img :src="logo()" alt="">{{data.title || data.itemtitle}}</p>
      <quan :quan="data.couponmoney || data.couponAmount" :fanli="data.memberForecastCommission || 0"></quan>
      <div class="name">{{data.itemDescription || data.itemdesc}}</div>
      <div class="price">
        <p v-if="data.couponLastPrice">到手</p>
        <p>￥{{data.couponLastPrice || data.salePrice}}</p>
      </div>
      <div class="oldprice">
        <p>原价￥{{data.salePrice || data.itemprice}}</p>
        <p>月销{{data.tkTotalSales}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexListItem',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    quanshow:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toDetail () {
      let params = this.data
      this.$router.push({
        name: 'Detail',
        params
      })
    },
    logo () {
      // require('@/assets/app/' + data.dockingType.name + '.png')
      if (this.data.dockingType.name == 'TB') {
        let icon = this.data.mallType == '天猫' ? 'TM' : 'TB'
        return require('@/assets/app/' + icon + '.png')
      } else {
        return require('@/assets/app/' + this.data.dockingType.name + '.png')
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.indexListItem {
  width: 100%;
  height: 4rem;
  background: #fff;
  margin: .133333rem 0;
  display: flex;
  border-radius: .2rem;
  overflow: hidden;
  .img {
    width: 45%;
    height: 4rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  .texts {
    padding: 0.266667rem 0.2rem;
    flex: 1;
    width: 0;
    .title {
      font-size: 0.38rem;
      font-weight: bold;
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
      img {
        width: 0.38rem;
        height: 0.38rem;
        vertical-align: text-bottom;
        margin-right: .133333rem;
      }
    }
    .quan {
      display: flex;
      align-items: center;
      font-size: 0.32rem;
      color: #fff;
      text-align: center;
      margin-top: 0.2rem;
      p {
        padding: 0.066667rem 0.133333rem;
        border-radius: 0.133333rem;
        line-height: 0.5rem;
      }
      .quan1 {
        position: relative;
        padding: 0.066667rem 0.2rem;
        background: linear-gradient(to right, #fe5747, #fc2149);
        &::after {
          content: "";
          width: 0.25rem;
          height: 0.25rem;
          background: #fff;
          position: absolute;
          right: -5px;
          top: 50%;
          border-radius: 50%;
          margin-top: -4px;
        }
        &::before {
          content: "";
          width: 0.25rem;
          height: 0.25rem;
          background: #fff;
          position: absolute;
          left: -5px;
          top: 50%;
          border-radius: 50%;
          margin-top: -4px;
        }
      }
      .fanli {
        background: #ff5000;
        margin-left: 0.266667rem;
      }
    }
    .name {
      font-size: .213333rem;
      color: #999;
      margin-top: .2rem;
      height: .5rem;
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      display: flex;
      align-items: center;
      color: #fe5747;
      margin-top: 0.2rem;
      p:first-child {
        font-size: 0.35rem;
      }
      p:last-child {
        font-size: 0.45rem;
        width: 0;
      }
    }
    .oldprice {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #b1b1b1;
      font-size: 0.32rem;
      margin-top: 0.2rem;
      p:first-child {
        text-decoration: line-through;
      }
    }
  }
}
</style>