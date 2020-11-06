<template>
  <div class="money">
    <app-title style="color:#1D0808;" class="title">赚钱</app-title>
    <!-- imageWrapper 写在class="moneyimg"可视截屏 -->
    <div class="moneyimg">
      <!-- imageWrapper 写在class="conwidth"整个页面截屏 -->
      <div class="conwidth" ref="imageWrapper">
        <img class="backimg" src="@/assets/my/moneybak.png" alt />
        <div class="abou">
          <div class="hdgz">活动规则</div>
          <div class="padd20">
            <div class="content">
              <div class="yqcode">
                <div class="yanqing">
                  <div class="copy">
                    <p>专属邀请码</p>
                    <p>
                      <!-- <span>DHDUHFIN</span> -->
                      <input readonly id="yaoqingma" type="text" value="DHDUHFIN" />
                      <img @click="copyClick" src="@/assets/my/copy.png" alt />
                    </p>
                  </div>
                  <div class="yqbtn" @click="lijiyaoqing">
                    立即邀请
                    <img src="@/assets/my/rightrow.png" alt />
                  </div>
                </div>
                <div class="line"></div>
                <div class="fulititle">
                  <span>福利商品</span>
                  <span>分享给新人 ta购买你也有奖励</span>
                </div>
                <div class="fulilist">
                  <div class="list" v-for="i in 4" :key="i">
                    <div class="listimg">
                      <img src="@/assets/my/c1.png" alt />
                    </div>
                    <p class="mon">￥45</p>
                    <p class="fenx">分享</p>
                  </div>
                </div>
              </div>
              <div class="buzhou">
                <img src="@/assets/my/left.png" alt />
                <p class="bztitle">邀请进度</p>
                <img src="@/assets/my/bright.png" alt />
              </div>
              <div class="yaoqing">
                <div class="yqbox">
                  <p>
                    <span>1</span>
                    <span>人</span>
                  </p>
                  <p>邀请数量</p>
                </div>
                <div class="yqbox">
                  <p>
                    <span>88</span>
                    <span>元</span>
                  </p>
                  <p class="lastflex">
                    <span>佣金奖励</span>
                    <img src="@/assets/my/righthui.png" alt />
                  </p>
                </div>
                <div class="yqbox">
                  <p>
                    <span>8</span>
                    <span>元</span>
                  </p>
                  <p class="lastflex">
                    <span>首单奖励</span>
                    <img src="@/assets/my/righthui.png" alt />
                  </p>
                </div>
              </div>
              <div class="buzhou">
                <img src="@/assets/my/left.png" alt />
                <p class="bztitle">邀请步骤</p>
                <img src="@/assets/my/bright.png" alt />
              </div>
              <div class="yqbz">
                <div class="buimg">
                  <img class="img33" src="@/assets/my/b1.png" alt />
                  <p>
                    将
                    <span style="color:#000;">邀请码</span>或
                    <span style="color:#000;">商品链接</span>
                    分享给好友
                  </p>
                </div>
                <div class="buimg">
                  <img class="imgrow" src="@/assets/my/brow.png" alt />
                </div>
                <div class="buimg">
                  <img class="img33" src="@/assets/my/b2.png" alt />
                  <p>好友下载全网惠APP填写你的邀请码</p>
                </div>
                <div class="buimg">
                  <img class="imgrow" src="@/assets/my/brow.png" alt />
                </div>
                <div class="buimg">
                  <img class="img33" src="@/assets/my/b3.png" alt />
                  <p>好友下单商品，你获得对应佣金</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="isimg">
      <img style="width:100%" :src="dataurlimg" alt />
      <div class="downstart" @touchstart="start">
        <p>点击下载</p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  name: "Money",
  data() {
    return {
      isimg: false,
      dataurlimg: "",
      longClick: 0,
    };
  },
  methods: {
    copyClick() {
      let copycode = document.getElementById("yaoqingma");
      copycode.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.Toast("已复制到剪贴板");
    },

    // 压缩图片
    compress(base64String, w, quality) {
      var newImage = new Image();
      var imgWidth, imgHeight;
      var promise = new Promise((resolve) => (newImage.onload = resolve));
      newImage.src = base64String;
      return promise.then(() => {
        imgWidth = newImage.width;
        imgHeight = newImage.height;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w;
            canvas.height = (w * imgHeight) / imgWidth;
          } else {
            canvas.height = w;
            canvas.width = (w * imgWidth) / imgHeight;
          }
        } else {
          canvas.width = imgWidth;
          canvas.height = imgHeight;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        // var base64 = canvas.toDataURL(getMimeType(base64String), quality);
        var base64 = canvas.toDataURL("image/jpeg", quality);
        // console.log(base64);
        return base64;
      });
    },
    lijiyaoqing() {
      let _this = this;
      html2canvas(this.$refs.imageWrapper, {
        logging: true,
        useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
        backgroundColor: null,
      }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataurlimg = dataURL
        this.isimg = true;
        // this.compress(dataURL, 800, 1).then((val) => {
        //   //得到压缩图片
        //   this.isimg = true;
        //   this.dataurlimg = val;
        // });
      }).catch((err)=>{
          console.log(err,'err')
        });
    },
    // 长按
    start() {
      this.Dialog.confirm({
        title: "保存",
        message: "是否保存到相册？",
      })
        .then(() => {
          this.imageDown(this.dataurlimg, "success", "ereor");
          this.isimg = false;
        })
        .catch(() => {
          _this.Toast("保存失败");
        });
    },
    //初始化bitmap对象
    imageDown(base64, success, error) {
      let _this = this;
      // console.log(base64, success, error, "初始化bitmap对象");
      var bitmap = new window.plus.nativeObj.Bitmap("image");
      bitmap.loadBase64Data(
        base64,
        function (i) {
          _this.bigmapToSave(bitmap, success, error);
        },
        function (err) {
          window.plus.nativeUI(err.message);
        }
      );
    },
    // 保存返回bitmap一个地址路径
    bigmapToSave(bitmap, success, error) {
      let _this = this;
      // console.log(bitmap, success, error, "保存返回bitmap一个地址路径");
      var name = this.randomString(10);
      bitmap.save(
        `_doc/${name}.jpg`,
        { overwrite: false },
        function (event) {
          // console.log(event.target, "2-target");
          _this.imageSaveByGallery(event.target, success, error);
        },
        function (err) {
          window.plus.nativeUI(err.message);
        }
      );
    },
    //保存到相册
    imageSaveByGallery(url, success, error) {
      let _this = this;
      // console.log(url, success, error, "保存到相册");
      window.plus.gallery.save(
        url,
        function (event) {
          _this.Toast("保存成功");
          
        },
        function (err) {
          _this.Toast("保存失败");
        }
      );
    },
    randomString(e) {
      e = e || 32;
      var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var a = t.length;
      var n = "";
      for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    },
  },
};
</script>
<style lang="scss" scoped>
.money {
  width: 100%;
  height: 100vh;
  .title {
    background: #f3f3f4;
  }
  .moneyimg {
    position: relative;
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
  .backimg {
    width: 100%;
    display: block;
  }
  .abou {
    width: 100%;
    // height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .hdgz {
      position: absolute;
      right: 0;
      top: 5rem;
      width: 1.866667rem;
      height: 0.533333rem;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0px 0px 46px 0px rgba(255, 255, 255, 0.3);
      // opacity:0.25;
      border-radius: 0.133333rem 0px 0px 0.133333rem;
      font-size: 0.293333rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 0.533333rem;
    }
    .content {
      .yqcode {
        margin-top: 6.18rem;
        width: 100%;
        // height: 7.333333rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 38px 0px rgba(140, 21, 35, 0.3);
        border-radius: 0.133333rem;
        padding: 0.666667rem 0.533333rem;
        .yanqing {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .copy {
            // line-height: .666667rem;
            p:first-child {
              font-size: 0.32rem;
              font-weight: 400;
              color: rgba(174, 174, 174, 1);
            }
            p:last-child {
              margin-top: 0.2rem;
              font-size: 0.533333rem;
              font-weight: bold;
              color: rgba(26, 5, 5, 1);
              display: flex;
              align-items: center;
              img {
                margin-left: 0.08rem;
                width: 0.48rem;
                height: 0.533333rem;
              }
              input {
                width: 2.8rem;
                border: none;
                background: none;
              }
            }
          }
          .yqbtn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.44rem;
            height: 0.933333rem;
            background: linear-gradient(
              150deg,
              rgba(254, 87, 71, 1),
              rgba(251, 33, 72, 1)
            );
            box-shadow: 0px 0px 6px 0px rgba(252, 47, 72, 0.3);
            border-radius: 0.133333rem;
            font-size: 0.426667rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            img {
              margin-top: 0.066667rem;
              margin-left: 0.133333rem;
              width: 0.146667rem;
              height: 0.266667rem;
            }
          }
        }
        .line {
          width: 100%;
          height: 1px;
          border: 1px dashed #ffcad185;
          margin: 0.533333rem 0;
          // background: linear-gradient(
          //   150deg,
          //   rgba(254, 87, 71, 1),
          //   rgba(251, 33, 72, 1)
          // );
          // box-shadow: 0px 0px 6px 0px rgba(252, 47, 72, 0.3);
        }
        .fulititle {
          span:first-child {
            font-size: 0.426667rem;
            font-weight: 500;
            color: rgba(26, 5, 5, 1);
          }
          span:last-child {
            font-size: 0.293333rem;
            font-weight: 400;
            color: rgba(174, 174, 174, 1);
          }
        }
        .fulilist {
          margin-top: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .list {
            .listimg {
              width: 1.8rem;
              height: 1.8rem;
              border-radius: 0.133333rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .mon {
              text-align: center;
              font-size: 0.32rem;
              font-weight: 400;
              color: #fe5747;
              padding: 0.133333rem 0;
            }
            .fenx {
              margin: 0 auto;
              width: 1.333333rem;
              height: 0.533333rem;
              background: linear-gradient(
                150deg,
                rgba(254, 87, 71, 1),
                rgba(251, 33, 72, 1)
              );
              box-shadow: 0px 0px 6px 0px rgba(192, 34, 53, 0.3);
              border-radius: 0.133333rem;
              font-size: 0.32rem;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              line-height: 0.533333rem;
            }
          }
        }
      }
      .buzhou {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.4rem 0 0.4rem 0;
        .bztitle {
          font-size: 0.373333rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          padding: 0 0.266667rem;
        }
        img {
          width: 1.28rem;
          height: 0.413333rem;
        }
      }
      .yaoqing {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 38px 0px rgba(140, 21, 35, 0.3);
        border-radius: 0.133333rem;
        padding: 0.4rem 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        .yqbox {
          p:first-child {
            font-size: 0.373333rem;
            color: #000;
            span:last-child {
              color: #aeaeae;
            }
            padding-bottom: 0.133333rem;
          }
          p:last-child {
            font-size: 0.32rem;
            color: #aeaeae;
          }
          .lastflex {
            display: flex;
            align-items: center;
            img {
              margin-top: 0.066667rem;
              margin-left: 0.08rem;
              width: 0.146667rem;
              height: 0.266667rem;
            }
          }
        }
      }
      .yqbz {
        width: 100%;
        font-size: 0.266667rem;
        text-align: center;
        color: #8c8c8c;
        background: rgba(254, 254, 254, 1);
        box-shadow: 0px 0px 38px 0px rgba(140, 21, 35, 0.3);
        border-radius: 0.133333rem;
        padding: 0.3rem 0;
        display: flex;
        // justify-content: space-around;
        .buimg {
          .img33 {
            width: 0.6rem;
            height: 0.6rem;
          }
          .imgrow {
            width: 0.28rem;
            height: 0.48rem;
          }
        }
        p {
          text-align: left;
          margin-top: 0.2rem;
          padding: 0 0.2rem;
        }
      }
    }
  }
  >>> .van-popup {
    background: none;
  }
  .downstart {
    width: 100%;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 30px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 40px;
    margin-top: 50px;
  }
}
</style>