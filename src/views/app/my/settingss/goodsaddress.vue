<template>
  <div class="goodsaddress">
    <!-- <div class="apptitles"> -->
    <app-title>收货地址</app-title>
    <!-- </div> -->
    <nodata v-if="lengths==0"></nodata>
    <div v-else class="conwidth padd20">
      <!-- <div class=""> -->
      <div class="minheight">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="200"
          >
            <div class="content" v-for="(i,index) in addresslist" :key="index">
              <div class="address">
                <div class="addflex">
                  <p class="a-name">{{i.name}}</p>
                  <p class="a-phone">{{i.phone}}</p>
                  <p class="a-moren" v-show="i.isDefault">默认</p>
                </div>
                <p class="dizhi">{{i.province+i.city+i.country+i.address}}</p>
              </div>
              <div class="addbtn" @click="editclick(i)">编辑</div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <!-- </div> -->
    <div class="fixed">
      <van-button @click="$router.push({path:'addgoods',query:{isadd:1}})" class="addressbtn">新增收货地址</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Goodsaddress",
  data() {
    return {
      addresslist: [],
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      lengths: null,
    };
  },
  methods: {
    getAddressList() {
      this.$api.app.my
        .getAddressList({
          pageIndex: this.pageIndex,
        })
        .then((res) => {
          // alert(res, "address");
          this.lengths = res.data.totalSize;
          if (res.code == 200) {
            res.data.content.forEach((i) => {
              this.addresslist.push(i);
            });
            this.loading = false;
            this.refreshing = false;
            if (res.data.content.length < 10) {
              this.finished = true;
            }
          } else {
            this.Toast.fail("获取信息失败");
            this.loading = false;
            this.pageIndex--;
          }
        });
    },
    onLoad() {
      this.loading = true;
      this.pageIndex++;
      this.getAddressList();
    },
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      this.addresslist = [];
      this.onLoad();
    },
    editclick(i) {
      this.$router.push({
        path: "addgoods",
        query: {
          isadd: 2,
          id: i.id,
          addressDetail: i.address,
          city: i.city,
          county: i.country,
          isDefault: i.isDefault,
          name: i.name,
          tel: i.phone,
          province: i.province,
          areaCode: i.areaCode,
        },
      });
    },
    onAdd() {
      this.$router.push({ path: "addgoods", query: { isadd: 1 } });
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
  },
};
</script>
<style lang="scss" scoped>
.goodsaddress {
  height: 100vh;
  .conwidth {
    position: relative;
    height: calc(100% - 40px);
    overflow-y: scroll;
    .minheight {
      margin-bottom: 1.8rem;
    }
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    // height: 2.16rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.133333rem;
    padding: 0.4rem 0.266667rem 0.386667rem 0.386667rem;
    margin-top: 0.2rem;
    .address {
      width: 83%;
      .addflex {
        display: flex;
        align-items: flex-end;
        p {
          margin-right: 0.266667rem;
        }
        .a-name {
          font-size: 0.373333rem;
          font-weight: 400;
          color: rgba(26, 5, 5, 1);
        }
        .a-phone {
          font-size: 0.32rem;
          font-weight: 400;
          color: rgba(174, 174, 174, 1);
        }
        .a-moren {
          width: 0.933333rem;
          height: 0.533333rem;
          background: rgba(255, 245, 247, 1);
          border-radius: 0.133333rem 0px 0.133333rem 0px;
          text-align: center;
          line-height: 0.533333rem;
          color: #fe5747;
        }
      }
      .dizhi {
        font-size: 0.32rem;
        font-weight: 400;
        color: #8c8c8c;
        line-height: 0.4rem;
        margin-top: 0.133333rem;
      }
    }
    .addbtn {
      width: 1.013333rem;
      height: 0.666667rem;
      border: 1px solid rgba(174, 174, 174, 1);
      border-radius: 0.133333rem;
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(174, 174, 174, 1);
      text-align: center;
      line-height: 0.7rem;
    }
  }
  .fixed {
    width: 100%;
    // height: 1.066667rem;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0.3rem 0.533333rem;
  }
  .addressbtn {
    // margin-top: 0.3rem;
    width: 100%;
    height: 1.2rem;
    background: rgba(254, 87, 71, 1);
    box-shadow: 0px 4px 16px 0px rgba(161, 161, 161, 0.41);
    border-radius: 0.133333rem;
    font-size: 0.373333rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  >>> .van-radio__icon {
    display: none;
  }
  >>> .van-address-item__tag {
    width: 0.933333rem;
    height: 0.533333rem;
    background: rgba(255, 245, 247, 1);
    border-radius: 0.133333rem 0px 0.133333rem 0px;
    text-align: center;
    line-height: 0.533333rem;
    color: #fe5747;
  }
  .nodata {
    position: fixed;
    top: 5.2rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 3;
  }
}
</style>