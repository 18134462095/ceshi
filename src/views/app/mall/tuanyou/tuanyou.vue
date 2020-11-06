<template>
  <div class="tuanyou">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="logistics">加油</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- <div> -->
    <app-title>一键加油</app-title>
    <!-- 加油 -->
    <div class="activess" v-if="active == 0">
      <div class="conwidth padd20 heightact">
        <div class="dingwei" @click="yjjyclick">
          <van-icon name="location" />

          <p v-if="loadingdw">
            {{
              dingweiaddress.length > 15
                ? dingweiaddress.slice(0, 15) + "..."
                : dingweiaddress
            }}
          </p>
          <van-loading v-else size="20px" :vertical="false"
            >定位中...</van-loading
          >
          <van-icon name="arrow" />
        </div>
        <!-- <div class="tyswiper">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
              <img src="@/assets/app/tybanner.jpg" alt="" />
            </van-swipe-item>
          </van-swipe>
        </div> -->
        <div class="sort">
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="valuekm"
              :options="optionkm"
              @change="kmclick"
            />
            <van-dropdown-item :title="youtypenum" ref="youitem">
              <div class="conwidth padd20">
                <div class="youtype" v-for="item in youList" :key="item.title">
                  <p class="youtitle">{{ item.title }}</p>
                  <div class="youbtn">
                    <div
                      @click="youactive(i.type)"
                      v-for="i in item.youtype"
                      :key="i.type"
                      class="btn"
                    >
                      <p :class="{ youactive: i.type == youcurractive }">
                        {{ i.type }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </van-dropdown-item>
            <van-dropdown-item
              v-model="value"
              :options="option"
              @change="serchclick(value)"
            />
          </van-dropdown-menu>
        </div>
      </div>
      <div class="jyzlist" :key="key0">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loadinglist"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="200"
          >
            <div class="nodata" v-if="lengths == 0">
              <nodata :fun="onRefresh"></nodata>
            </div>
            <div
              v-else
              class="youzhan"
              v-for="(i, index) in zhanList"
              :key="index"
              @click="detailclick(i)"
            >
              <div class="address">
                <div class="addr">
                  <p class="atitle" v-if="i.gasName">
                    {{
                      i.gasName.length > 13
                        ? i.gasName.slice(0, 13) + "..."
                        : i.gasName
                    }}
                  </p>
                  <div class="detailadd">
                    <van-icon name="location" />
                    <p v-if="i.gasAddress">
                      {{
                        i.gasAddress.length > 15
                          ? i.gasAddress.slice(0, 15) + "..."
                          : i.gasAddress
                      }}
                    </p>
                  </div>
                </div>
                <div class="daohang" @click.stop="daohanggaode(i)">
                  <img src="@/assets/app/go.png" alt="" />
                  <p>{{ i.distance }}km</p>
                </div>
              </div>
              <div class="money">
                <div class="m_jia" v-for="j in i.oilPriceList" :key="j.oilName">
                  <p class="newjia">
                    <span>￥</span><span>{{ j.priceYfq }}</span>
                  </p>
                  <div class="m_btn">
                    <div class="img">
                      <img src="@/assets/app/xia.png" alt="" />
                    </div>
                    <p>已降￥{{ j.reducePrice }}</p>
                  </div>
                  <p class="guobiao">国标价￥{{ j.priceOfficial }}</p>
                </div>
                <!-- <div class="youhui">
              <div class="left">
                <div class="bukeyong" v-if="i.youbuke">
                  <p>{{ i.youbuke }}不可用券</p>
                </div>
                <div class="collapse">
                  <div class="dan" v-for="n in i.huilist" :key="n.name">
                    <p>{{ n.name }}</p>
                  </div>
                </div>
                <div class="dantext" v-if="i.huilist.length == 1">
                  <p v-for="a in i.huilist" :key="a.text">{{ a.text }}</p>
                </div>
              </div>
              <div class="right" v-if="i.huilist.length > 1">
                <van-icon
                  @click.stop="i.kai = false"
                  v-if="i.kai"
                  name="arrow-down"
                />
                <van-icon @click.stop="i.kai = true" v-else name="arrow-up" />
              </div>
            </div>
            <div class="huilist" v-if="(i.huilist.length > 1) & i.kai">
              <div class="huitext" v-for="(m, index) in i.huilist" :key="index">
                <div class="htitle">
                  <p>{{ m.name }}</p>
                </div>
                <p class="htext">{{ m.text }}</p>
              </div>
            </div> -->
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <!-- 我的 -->
    <div class="activess" v-if="active == 1">
      <div class="conwidth padd20 heightact">
        <div class="header">
          <div class="img">
            <img v-if="user.headImgUrl" :src="user.headImgUrl" alt="" />
            <img v-else src="@/assets/app/jiayou.png" alt="" />
          </div>
          <div class="nickname">
            <p>{{ user.phone }}</p>
          </div>
          <!-- <div class="renzheng">
            <p>已认证私家车</p>
          </div> -->
        </div>
        <div class="tycontent">
          <!-- <div class="list">
            <div class="listimg">
              <img src="@/assets/app/tyyouhuiquan.png" alt="" />
            </div>
            <div class="cell">
              <van-cell
                title="优惠券"
                @click="$router.push('coupon')"
                is-link
                value="14张"
              />
            </div>
          </div> -->
          <div class="list">
            <div class="listimg">
              <img src="@/assets/app/tydingdan.png" alt="" />
            </div>
            <div class="cell">
              <van-cell
                title="加油订单"
                @click="$router.push('JYorder')"
                is-link
              />
            </div>
          </div>
          <!-- <div class="list">
            <div class="listimg">
              <img src="@/assets/app/tybangzhu.png" alt="" />
            </div>
            <div class="cell">
              <van-cell
                title="帮助中心"
                @click="$router.push('help')"
                is-link
              />
            </div>
          </div> -->
          <!-- <div class="list">
            <div class="listimg">
              <img src="@/assets/app/tykefu.png" alt="" />
            </div>
            <div class="cell">
              <van-cell title="客服中心" is-link />
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: "tuanyou",
  data() {
    return {
      loadingdw: true,
      youitem: true,
      youtypenum: "92#",
      // kai: false,
      youcurractive: "92#",
      active: 0,
      dingweiaddress: "",
      map: "",
      value: 0,
      valuekm: 0,
      switch1: false,
      switch2: false,
      option: [
        { text: "智能排序", value: 0 },
        { text: "距离优先", value: 1 },
        { text: "价格优先", value: 2 },
      ],
      optionkm: [
        { title: 10, text: "10km", value: 0 },
        { title: 20, text: "20km", value: 1 },
        { title: 30, text: "30km", value: 2 },
        { title: 40, text: "40km", value: 3 },
        { title: 50, text: "50km", value: 4 },
      ],
      youList: [
        {
          title: "汽油",
          youtype: [
            {
              type: "90#",
            },
            {
              type: "92#",
            },
            {
              type: "95#",
            },
            {
              type: "98#",
            },
            {
              type: "101#",
            },
          ],
        },
        {
          title: "柴油",
          youtype: [
            {
              type: "-40#",
            },
            {
              type: "-35#",
            },
            {
              type: "-30#",
            },
            {
              type: "-20#",
            },
            {
              type: "-10#",
            },
            {
              type: "0#",
            },
          ],
        },
        {
          title: "天然气",
          youtype: [
            {
              type: "CNG",
            },
            {
              type: "LNG",
            },
          ],
        },
      ],
      zhanList: [],
      list: {
        longitude: "",
        latitude: "",
        oilName: "92#",
        price: "",
        pageIndex: 0,
        distance: "10",
      },
      loadinglist: false,
      finished: false,
      refreshing: false,
      pageIndex: 0,
      key0: 0,
      lengths: null,
    };
  },
  created() {
    this.initMap();
    // this.bmapinit()
    // this.onLoad();
  },
  computed: {
    user() {
      var phone = this.$store.getters.info.phone; //获取到的电话信息
      phone = "" + phone;
      var reg = /(\d{3})\d{4}(\d{4})/; //正则表达式
      var phone = phone.replace(reg, "$1****$2");
      // console.log(phone);
      this.$store.getters.info.phone = phone;
      return this.$store.getters.info;
    },
  },
  mounted() {},
  methods: {
    yjjyclick() {
      // this.$router.push({name:'yjjy',query:{dingw:this.dingweiaddress}})
    },

    detailclick(i) {
      // console.log(i, "ceshi");
      this.$router.push({
        name: "jiayoudetail",
        query: {
          gasId: i.gasId,
          distance: i.distance,
          zdlng: i.gasAddressLongitude,
          zdlat: i.gasAddressLatitude,
          zdaddress: i.gasAddress,
          qdlng: this.list.longitude,
          qdlat: this.list.latitude,
          qdaddress: this.dingweiaddress,
          oilName: i.oilPriceList[0].oilName,
        },
      });
    },
    daohanggaode(i) {
      this.$router.push({
        name: "mapview",
        query: {
          zdlng: i.gasAddressLongitude,
          zdlat: i.gasAddressLatitude,
          zdaddress: i.gasAddress,
          qdlng: this.list.longitude,
          qdlat: this.list.latitude,
          qdaddress: this.dingweiaddress,
        },
      });
    },
    getLocalGasStation() {
      this.list.pageIndex = this.pageIndex;
      this.$api.app.home.getLocalGasStation(this.list).then((res) => {
        // console.log(res, "res");
        if (res.code == 200) {
          this.lengths = res.data.content.length;
          res.data.content.forEach((i, index) => {
            i.distance = Math.round(i.distance * 100) / 100;
            this.zhanList.push(i);
            // i.oilPriceList.forEach((j) => {
            //   if (j.oilName == this.list.oilName) {
            //     i.oilPriceList = [];
            //     i.oilPriceList.push(j);
            //     console.log(j.oilName, "klklk");
            //   }
            // });
          });
          // this.zhanList = res.data.result;
          // console.log(this.zhanList, "zhlist");
          this.loadinglist = false;
          // this.finished = true;
          this.refreshing = false;
          if (res.data.content.length < 10) {
            this.finished = true;
          }
        } else {
          this.Toast.fail(res.msg);
          this.refreshing = false;
          this.loadinglist = false;
          this.pageIndex--;
        }
      });
    },

    onLoad() {
      if (this.list.longitude) {
        // console.log(this.user, "user");
        this.loadinglist = true;
        this.pageIndex++;
        this.getLocalGasStation();
      }
    },
    onRefresh() {
      // console.log(1);
      this.finished = false;
      this.refreshing = true;
      this.pageIndex = 0;
      // this.zhanList = [];
      this.onLoad();
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    youactive(i) {
      // console.log(i, "iiiii");
      this.youcurractive = i;
      this.youtypenum = i;
      this.list.oilName = i;
      this.$refs.youitem.toggle();
      // this.lengths = null
      this.zhanList = [];
      this.onRefresh();
      this.key0++;
    },
    serchclick(v) {
      // console.log(v, "v");
      if (v == 2) {
        this.list.price = "1";
      } else {
        this.list.price = "";
      }
      // this.lengths != 0
      this.zhanList = [];
      this.onRefresh();
      this.key0++;
    },
    kmclick(v) {
      // console.log(this.optionkm[v],'km')
      this.list.distance = this.optionkm[v].title;
      // this.lengths != 0
      this.zhanList = [];
      this.onRefresh();
      this.key0++;
    },
    bmapinit() {
      let _this = this;
      var map = new BMap.Map("allmap");
      var geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();

      geolocation.getCurrentPosition(
        function (r) {
          // console.log(r, "rrrr");
          let lng = r.point.lng;
          let lat = r.point.lat;
          // let lnglat =  _this.coordtransform.bd09togcj02(lng,lat)
          // let gdlnglat = _this.coordtransform.gcj02towgs84(lnglat[0],lnglat[1])
          map.centerAndZoom(r.point, 12);
          geoc.getLocation(r.point, function (rs) {
            // console.log(rs, "rs");
            var addComp = rs.addressComponents;
            alert(
              addComp.province +
                "," +
                addComp.city +
                "," +
                addComp.district +
                "," +
                addComp.street +
                "," +
                addComp.streetNumber
            );
          });
          // console.log(lnglat, gdlnglat, "r.lnglat");
          // if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          //   var mk = new BMap.Marker(r.point);
          //   map.addOverlay(mk);
          //   map.panTo(r.point);
          //   alert("您的位置：" + r.point.lng + "," + r.point.lat);
          // } else {
          //   alert("failed" + this.getStatus());
          // }
        },
        { enableHighAccuracy: true }
      );
    },
    initMap() {
      this.loadingdw = false;
      var geocoder = new AMap.Geocoder({});
      let _this = this;
      // this.map = new AMap.Map("mapView");
      let geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: false,
        //  定位按钮的排放位置,  RB表示右下
        showButton: false,
      });
        geolocation.getCurrentPosition();
      if (isiOS) {
        AMap.event.addListener(geolocation, "complete", function (data) {
          console.log(data, "data");
          let position = [data.position.lng, data.position.lat];
          var longitude = position[0];
          var latitude = position[1];
          _this.list.longitude = longitude;
          _this.list.latitude = latitude;
          // _this.list.longitude = "116";
          // _this.list.latitude = "40";
          _this.onLoad();
          let lnglat = _this.coordtransform.gcj02towgs84(longitude, latitude);
          // let lnglat = [longitude, latitude];
          // console.log("定位成功", lnglat);
          geocoder.getAddress(lnglat, function (status, result) {
            console.log(status, result, "result...");
            if (status === "complete" && result.regeocode) {
              _this.loadingdw = true;
              _this.dingweiaddress = result.regeocode.formattedAddress;
            } else {
            }
          });
        });
        AMap.event.addListener(geolocation, "error", function (e) {
          _this.Toast.fail("用户定位失败!");
          _this.loadingdw = false;
          _this.loadinglist = false;
        });
      } else {
        // geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", function (data) {
          console.log(data, "data");
          let position = [data.position.lng, data.position.lat];
          var longitude = position[0];
          var latitude = position[1];
          _this.list.longitude = longitude;
          _this.list.latitude = latitude;
          // _this.list.longitude = "116";
          // _this.list.latitude = "40";
          _this.onLoad();
          // let lnglat = _this.coordtransform.gcj02towgs84(longitude, latitude);
          let lnglat = [longitude, latitude];
          // console.log("定位成功", lnglat);
          geocoder.getAddress(lnglat, function (status, result) {
            console.log(status, result, "result...");
            if (status === "complete" && result.regeocode) {
              _this.loadingdw = true;
              _this.dingweiaddress = result.regeocode.formattedAddress;
            } else {
            }
          });
        });
        AMap.event.addListener(geolocation, "error", function (e) {
          _this.Toast.fail("用户定位失败!");
          _this.loadingdw = false;
          _this.loadinglist = false;
        });

        //   console.log("安卓");
        //   let geolocation = plus.geolocation;
        //   console.log("geolocation", geolocation);
        //   geolocation.getCurrentPosition(
        //     function (p) {
        //       console.log(p, "ppppp");
        //       let position = [p.coords.longitude, p.coords.latitude];
        //       // let lnglat = (position[0], position[1]);
        //       console.log(position,'position')
        //        _this.list.longitude = position[0];
        //       _this.list.latitude = position[1];
        //       _this.onLoad();
        //       console.log("定位成功", lnglat);
        //       // AMap.convertFrom(position, "gps", function (status, result) {
        //       //   console.log(status, result, "result");
        //       //   if (result.info === "ok") {
        //       //     let lnglats = result.locations; // Array.<LngLat>
        //       //     let lng = lnglats[0].lng;
        //       //     let lat = lnglats[0].lat;
        //       //     _this.list.longitude = lng;
        //       //     _this.list.latitude = lat;
        //       //     // _this.list.longitude = "116";
        //       //     // _this.list.latitude = "40";
        //       //     _this.onLoad();
        //       //     // let lnglat = _this.coordtransform.gcj02towgs84(lng, lat);
        //       //     let lnglat = [lng, lat];
        //       //     console.log("定位成功", lnglat);
        //       //     geocoder.getAddress(lnglat, function (status, result) {
        //       //       console.log(status, result, "result...");
        //       //       if (status === "complete" && result.regeocode) {
        //       //         _this.loadingdw = true;
        //       //         _this.dingweiaddress = result.regeocode.formattedAddress;
        //       //       }
        //       //     });
        //       //   }
        //       // });
        //     },
        //     function (e) {
        //       console.log(e.message, "e.message");
        //       _this.Toast.fail("用户定位失败！");
        //       // _this.loadingdw = false;
        //       // _this.loadinglist = false;
        //     },
        //     {
        //       // provider: "amap",
        //       provider: "system",
        //       enableHighAccuracy: true,
        //       timeout: 50000,
        //       coordsType: "wgs84",
        //     }
        //   );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tuanyou {
  height: 100vh;
  .activess {
    position: relative;
    height: calc(100% - 40px - 50px);
    overflow-y: scroll;
    // height: 100vh;
    .heightact {
      height: 2.5rem;
    }
  }
  .header {
    width: 100%;
    padding: 0.666667rem 0;
    background: #ffffff;
    margin-top: 0.266667rem;
    display: flex;
    align-items: center;
    div {
      margin-left: 0.266667rem;
    }
    .img {
      width: 1.866667rem;
      height: 1.866667rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .nickname {
      font-size: 0.48rem;
      font-weight: 400;
    }
    .renzheng {
      border: 1px solid #8c8c8c;
      color: #8c8c8c;
      border-radius: 0.066667rem;
      padding: 0 0.133333rem;
    }
  }
  .tycontent {
    margin-top: 0.4rem;
    .list {
      display: flex;
      align-items: center;
      .listimg {
        width: 0.7rem;
        height: 0.7rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .cell {
        width: 100%;
        border-bottom: 1px solid #9b97973b;
        margin-left: 0.266667rem;
        >>> .van-cell {
          background: none;
          padding: 0.533333rem 0;
        }
        >>> .van-cell__value {
          color: #000;
        }
      }
    }
  }
  .dingwei {
    display: flex;
    align-items: center;
    margin-top: 0.266667rem;
    >>> .van-icon {
      font-size: 0.48rem;
      color: #8c8c8c;
    }
    p {
      font-size: 0.373333rem;
      padding: 0 0.133333rem;
    }
  }
  .tyswiper {
    margin-top: 0.266667rem;
    border-radius: 0.266667rem;
    overflow: hidden;
    .my-swipe .van-swipe-item {
      height: 3rem;
      background-color: #39a9ed;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .sort {
    margin-top: 0.266667rem;
    >>> .van-dropdown-menu__bar {
      background: none;
      box-shadow: none;
    }
    >>> .van-dropdown-menu__item {
      background: #ffffff;
      border-radius: 1.333333rem;
      margin: 0.133333rem;
    }
    .youtype {
      // margin: 0.4rem 0;
      .youtitle {
        font-size: 0.373333rem;
        color: #000;
        font-weight: 400;
        margin: 0.266667rem 0;
      }
      .youbtn {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        flex-wrap: wrap;
        .btn {
          width: 25%;
          height: 0.7rem;
          padding: 0 0.133333rem;
          margin-bottom: 0.35rem;
          p {
            width: 100%;
            height: 100%;
            color: #8c8c8c;
            font-size: 0.373333rem;
            border: 1px solid #8c8c8c;
            border-radius: 0.133333rem;
            text-align: center;
            line-height: 0.7rem;
          }
          .youactive {
            border: 1px solid #fe5747;
            color: #fe5747;
          }
        }
      }
    }
  }
  .jyzlist {
    // margin-top: 0.266667rem;
    position: relative;
    height: calc(100% - 2.5rem - 0.266667rem);
    overflow: scroll;
    // margin-bottom: 1.8rem;
    >>> .van-pull-refresh {
      // height: 100%;
      .van-list {
        // height: 100%;
        // overflow-y: scroll;
      }
    }
    .youzhan {
      width: 100%;
      // height: 4rem;
      background: #ffffff;
      border-bottom: 1px solid #d1cfcf;
      padding: 0.533333rem;
      .address {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .addr {
          .atitle {
            font-size: 0.48rem;
            color: #000;
            font-weight: 400;
          }
          .detailadd {
            display: flex;
            align-items: center;
            margin-top: 0.266667rem;
            >>> .van-icon {
              font-size: 0.373333rem;
              color: #8c8c8c;
            }
            p {
              font-size: 0.373333rem;
              color: #8c8c8c;
            }
          }
        }
        .daohang {
          text-align: center;
          img {
            width: 0.533333rem;
            height: 0.533333rem;
          }
          p {
            font-size: 0.426667rem;
            color: #8c8c8c;
          }
        }
      }
      .money {
        margin-top: 0.4rem;
        .m_jia {
          display: flex;
          align-items: center;
          .newjia {
            color: #000;
            span:first-child {
              font-size: 0.426667rem;
            }
            span:last-child {
              font-size: 0.666667rem;
            }
          }
          .m_btn {
            height: 0.533333rem;
            display: flex;
            align-items: center;
            border: 1px solid #fe5747;
            border-radius: 0.066667rem;
            color: #fe5747;
            margin: 0.2rem;
            .img {
              border-radius: 0.066667rem;
              width: 0.533333rem;
              height: 0.533333rem;
              margin-left: -1px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            p {
              padding: 0 0.133333rem;
              font-size: 0.32rem;
            }
          }
          .guobiao {
            font-size: 0.373333rem;
            color: #8c8c8c;
            text-decoration: line-through;
          }
        }
        .youhui {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.2rem;
          .left {
            display: flex;
            align-items: center;
            .bukeyong {
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              padding: 0.08rem 0.133333rem;
              font-size: 0.346667rem;
              border-radius: 0.066667rem;
              // width: 30%;
              text-align: center;
            }
            .collapse {
              display: flex;
              align-items: center;
              .dan {
                margin-left: 0.2rem;
                border: 1px solid #fe5747;
                color: #fe5747;
                border-radius: 0.133333rem;
                padding: 0 3px;
                font-size: 0.373333rem;
                font-weight: bold;
              }
            }
            .dantext {
              margin-left: 0.2rem;
              font-size: 0.426667rem;
              color: #000;
            }
          }
          .right {
            >>> .van-icon {
              font-size: 0.48rem;
              font-weight: bold;
              color: #8c8c8c;
            }
          }
        }
        .huilist {
          margin-top: 0.266667rem;
          .huitext {
            margin-top: 0.133333rem;
            display: flex;
            align-items: center;
            .htitle {
              border: 1px solid #fe5747;
              color: #fe5747;
              border-radius: 0.133333rem;
              padding: 0 3px;
              font-size: 0.346667rem;
              font-weight: bold;
            }
            .htext {
              margin-left: 0.2rem;
              font-size: 0.373333rem;
              color: #8c8c8c;
            }
          }
        }
      }
    }
  }
}
.nodata {
  position: fixed;
  top: 5.2rem;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 3;
}
</style>