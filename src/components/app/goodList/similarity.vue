<template>
  <div class="similarity">
    <div class="lists" v-for="i in similarityList" :key="i.id" @click="toDetail(i)">
      <div class="img">
        <img v-lazy="i.pictUrl" :src="replaceHttp(i.pictUrl)" alt />
      </div>
      <div class="texts">
        <p class="title">{{i.title}}</p>
        <!-- <quan :quan="i.couponAmount" :fanli="i.fanli" :quanshow="i.memberForecastCommission || 0"></quan> -->
        <div class="price">
          <p>到手￥</p>
          <p>{{i.couponLastPrice?i.couponLastPrice:i.salePrice}}</p>
        </div>
        <div class="oldprice">
          <p>原价￥{{i.salePrice}}</p>
          <p>月销{{i.tkTotalSales}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Similarity',
  inject: ['reload'],
  props:{
    similarityList:{
      type:Array,
      default(){
        return[]
      }
    },
    quanshow:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    toDetail (params) {
      if (/Detail/.test(this.$route.name)) {
        // this.$route.meta.params = null
        // this.$store.commit('changeDetail', params)
        // this.reload()
        this.$router.replace({
          name: this.$route.name == 'Detail' ? 'Detail2' : 'Detail',
          params
        })
      } else {
        this.$router.push({
          name: 'Detail',
          params
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.similarity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 .4rem;
  .lists {
    width: 48%;
    border-radius: 0.133333rem;
    overflow: hidden;
    margin-top: 0.266667rem;
    background: #fff;
    .img {
      width: 100%;
      height: 4rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .texts {
      padding: 0.266667rem 0.15rem;
      .title {
        font-size: 0.38rem;
        font-weight: bold;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      // .quan {
      //   display: flex;
      //   align-items: center;
      //   font-size: 0.32rem;
      //   color: #fff;
      //   text-align: center;
      //   margin-top: 0.2rem;
      //   p {
      //     padding: 0.066667rem 0.133333rem;
      //     border-radius: 0.133333rem;
      //     line-height: 0.5rem;
      //   }
      //   .quan1 {
      //     position: relative;
      //     padding: 0.066667rem 0.2rem;
      //     background: linear-gradient(to right, #fe5747, #fc2149);
      //     &::after {
      //       content: "";
      //       width: 0.25rem;
      //       height: 0.25rem;
      //       background: #fff;
      //       position: absolute;
      //       right: -5px;
      //       top: 50%;
      //       border-radius: 50%;
      //       margin-top: -4px;
      //     }
      //     &::before {
      //       content: "";
      //       width: 0.25rem;
      //       height: 0.25rem;
      //       background: #fff;
      //       position: absolute;
      //       left: -5px;
      //       top: 50%;
      //       border-radius: 50%;
      //       margin-top: -4px;
      //     }
      //   }
      //   .fanli {
      //     background: #ff5000;
      //     margin-left: 0.266667rem;
      //   }
      // }
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
}
</style>