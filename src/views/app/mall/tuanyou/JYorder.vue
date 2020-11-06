<template>
  <div class="JYorder">
    <app-title>加油订单</app-title>
    <div class="top">
      <div class="top_item">
        <span><i>¥</i>{{num.countMoney}}</span>
        <p>累计加油支出(元)</p>
      </div>
      <div class="top_item">
        <span>{{num.countlitre}}</span>
        <p>累计加油升数(L)</p>
      </div>
    </div>
    <div class="bottom">
      <van-tabs v-model="active" @change="activeclick" swipeable>
        <van-tab v-for="i in tab" :title="i" :key="i">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
             <div class="nodata">
              <nodata :fun="onRefresh" v-if="list.length == 0"></nodata>
            </div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error="error"
              @load="onLoad"
              v-if="list.length"
            >
              <div class="item" v-for="item in list" :key="item.orderId" @click="$router.push({name:'JYdetails',query:{data:item}})">
                <h4>{{item.litre}}升 {{item.oilNo}}{{item.gasName}}</h4>
                <p>{{item.payTime}}</p>
                <div class="jiage">
                  <span>¥{{item.amountPay}}</span>
                  <p>{{item.orderStatusName}}</p>
                </div>
              </div>
              <template class="errBox" #error>
                  <p @click="onLoad">加载失败</p>
                </template>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: ["全部", "已支付", "退款"],
      count: "0",
      isLoading: false,
      active: 0,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageIndex:0,
      orderStatus:'',
      error: false,
      num:{
        countlitre:'0',
        countMoney:'0'
      }
    };
  },
  created(){
    this.activeclick(0)
  },
  methods: {
    activeclick(i){
      // console.log(i,'ii')
      if(i==0){
        this.orderStatus = ''
      }else if(i==1){
        this.orderStatus = 1
      }else if(i==2){
        this.orderStatus = 5
      }
      this.onRefresh()
    },
    getOrderList(){
      let data = {
        pageIndex:this.pageIndex,
        pageSize:10,
        orderStatus:this.orderStatus
      }
      this.error = false;
      this.$api.app.home.getOrderList(data).then(res=>{
        // console.log(res,'reslist')
        if (res.code == 200) {
          this.num.countlitre = res.data.countlitre.toFixed(2)
          this.num.countMoney = res.data.countMoney.toFixed(2)
          if (res.data.result) {
            res.data.result.forEach((i) => {
              this.list.push(i);
            });
          }
          this.loading = false;
          
          this.refreshing = false;
          if (res.data.result && res.data.result.length < 10) {
            this.finished = true;
          }
        } else {
          this.loading = false;
          this.pageIndex--;
           this.error= true;
        }
      }).catch(err=>{
        // console.log(err)
      })
    },
    onLoad() {
      this.loading = true;
      this.pageIndex++;
      this.getOrderList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.list = [];
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.JYorder {
  width: 100%;
  height: 100vh;
  .top {
    width: 9.173333rem;
    height: 3.2rem;
    border-radius: 0.266667rem;
    margin: 0 auto;
    margin-top: 0.26rem;
    background: #fff;
    box-shadow: 0 0 0.133333rem 0.133333rem rgba(170, 170, 170, 0.1);
    display: flex;
    padding-top: 0.8rem;
    //  justify-content: space-between;
    .top_item {
      width: 50%;
      height: 100%;
      text-align: center;
      span {
        font-size: 0.6rem;
        color: #333;
        i {
          font-size: 0.213333rem;
        }
      }
      p {
        font-size: 0.24rem;
        color: #999;
        margin-top: 0.266667rem;
      }
    }
  }
  .bottom {
    width: 9.173333rem;
    height: calc(100% - 3.86rem - 40px);
    margin: 0 auto;
    margin-top: 0.4rem;
    >>> .van-tabs {
      height: 100%;
      .van-tabs__wrap {
      }
      .van-tabs__content {
        height: calc(100% - 44px);
        overflow-y: scroll;
      }
      .item {
        width: 9.173333rem;
        margin: 0 auto;
        margin-top: 0.266667rem;
        border-radius: 0.133333rem;
        height: 1.666667rem; 
        padding: 0.4rem 0 0 0.266667rem;
        position: relative;
        h4 {
          color: #000;
          font-size: 0.373333rem;
          line-height: 0.32rem;
        }
        p {
          font-size: 0.16rem;
          color: #8c8c8c;
          margin-top: 0.266667rem;
        }
        .jiage {
          position: absolute;
          top: 0.3rem;
          right: 0.8rem;
          text-align: center;
          span {
            color: #333;
            font-size: 0.533333rem;
            font-weight: 600;
          }
          p {
            color: #333;
            margin-top: 0.133333rem;
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
</style>