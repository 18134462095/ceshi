<template>
  <div class="yjjy">
    <app-title>一键加油</app-title>
    <div class="conwidth">
      <div class="header">
        <div class="search" @click="$router.push('yjjyserch')">
          <van-search
            v-model="value"
            placeholder="小区/写字楼/学校等"
            input-align="center"
          />
        </div>
        <div class="congxindw">
          <p class="title">当前定位</p>
          <div class="dingw">
            <p class="dwleft" v-if="loading">
              {{ dingwei.length > 10 ? dingwei.slice(0, 10) + "..." : dingwei }}
            </p>
            <van-loading v-else size="24px" :vertical="false">定位中...</van-loading>
            <div class="dwbtn" @click="initMap">
              <img src="@/assets/app/cxdw.png" alt="" />
              <p>重新定位</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <p class="fujin">附近地址</p>
        <div class="address">
          <p>来电(豫新铜锅涮)</p>
          <p>怪兽充电(王春光)</p>
          <p>怪兽充电怪兽充电(豫新铜锅涮)</p>
          <p>来怪兽充电电(豫怪兽充电新铜锅涮)</p>
          <p>豫新铜锅涮</p>
          <p>怪兽充电(王春光早餐工程黑朱庄店)</p>
          <p>怪兽充电怪兽充电(豫新铜锅涮)</p>
          <p>来怪兽充电电(豫怪兽充电新铜锅涮)</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "yjjy",
  data() {
    return {
      value: "",
      dingwei: "",
      loading: true,
    };
  },
  created() {
    // console.log(this.$route.query);
    this.dingwei = this.$route.query.dingw;
  },
  methods: {
    initMap() {
      this.loading = false;
      var geocoder = new AMap.Geocoder({});
      let _this = this;
      this.map = new AMap.Map("mapView");
      if (isiOS) {
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
        AMap.event.addListener(geolocation, "complete", function (data) {
          // console.log("dingwei");
          let position = [data.position.lng, data.position.lat];
          var longitude = position[0];
          var latitude = position[1];
          let lnglat = _this.coordtransform.gcj02towgs84(longitude, latitude);
          // console.log("定位成功", lnglat);
          geocoder.getAddress(lnglat, function (status, result) {
            // console.log(status, result, "result...");
            if (status === "complete" && result.regeocode) {
              _this.loading = true;
              _this.dingwei = result.regeocode.formattedAddress;
              // document.getElementById("address").value = address;
            } else {
              // log.error("根据经纬度查询地址失败");
            }
          });
        });
        AMap.event.addListener(geolocation, "error", function (e) {
          _this.Toast.fail("用户定位失败: " + e.message);
        });
      } else {
        // console.log("安卓");
        let geolocation = plus.geolocation;
        // console.log("geolocation", geolocation);
        geolocation.getCurrentPosition(
          function (p) {
            // console.log(p, "ppppp");
            let position = [p.coords.longitude, p.coords.latitude];
            AMap.convertFrom(position, "gps", function (status, result) {
              // console.log(result, "result");
              if (result.info === "ok") {
                let lnglats = result.locations; // Array.<LngLat>
                let lng = lnglats[0].lng;
                let lat = lnglats[0].lat;
                let lnglat = [lng, lat];
                // console.log("定位成功", lnglat);
                geocoder.getAddress(lnglat, function (status, result) {
                  // console.log(status, result, "result...");
                  if (status === "complete" && result.regeocode) {
                    // let detailadd = result.regeocode.
                    _this.loading = true;
                    _this.dingwei = result.regeocode.formattedAddress;
                  } else {
                    log.error("根据经纬度查询地址失败");
                  }
                });
              }
            });
          },
          function (e) {
            _this.Toast.fail("用户定位失败: " + e.message);
          },
          {
            provider: "system",
            enableHighAccuracy: true,
            timeout: 10000,
            coordsType: "wgs84",
          }
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.yjjy {
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
          display: flex;
          align-items: center;
          img {
            width: 0.666667rem;
            height: 0.666667rem;
          }
          p {
            font-size: 0.373333rem;
            color: #fe5747;
            font-weight: 400;
          }
        }
      }
    }
  }
  .content {
    margin-top: 0.266667rem;
    width: 100%;
    padding: 0.533333rem;
    background: #ffffff;
    .fujin {
      font-size: 0.373333rem;
      color: #8c8c8c;
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
        border-radius: 2px;
      }
    }
  }
}
</style>