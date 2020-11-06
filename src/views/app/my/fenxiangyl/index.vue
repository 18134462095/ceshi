<template>
  <div class="fenxiangyl">
    <app-title>分享有礼</app-title>
    <div class="sharebtn" @click="fenxiangClick">
      <!-- <p>点击分享</p> -->
      <img src="@/assets/my/fxyl.png" alt="" />
    </div>
    <!-- <div
      class="backimg"
      id="imageWrapper"
      @touchstart="gotouchstart"
      @touchmove="gotouchmove"
      @touchend="gotouchend"
    > -->
    <div class="backimg" id="imageWrapper">
      <img class="contentimg" :src="imgurl" alt="" />
      <!-- <img class="contentimg" :src="saveimg" alt="" /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Fenxiangyl",
  data() {
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return {
      msg: {},
      imgurl: "",
      saveimg: "",
      timeOutEvent: 0,
    };
  },
  mounted() {
    this.$api.app.home.getInviteQrCode().then((res) => {
      // console.log(res.msg, "reser");
      if (res.code == 200) {
        this.imgurl = res.msg;
        // this.imageDown(res.msg, "success", "ereor");
       this.getBase64(res.msg)
      //  console.log(a,'a')
      }
    });
  },
  methods: {
    getBase64(imgUrl) {
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      // 至关重要
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          //得到一个blob对象
          var blob = this.response;
          console.log("blob", blob);
          // 至关重要
          let oFileReader = new FileReader();
          oFileReader.onloadend = function (e) {
            // 此处拿到的已经是 base64的图片了
            console.log("方式一》》》》》》》》》", e);
            let base64 = e.target.result;
          };
        }
      };
      xhr.send();
    },

    createDownload(url, isds) {
      let _this = this;
      console.log(url, "url");
      var dtask = plus.downloader.createDownload(url, {}, function (d, status) {
        console.log(d, status, "dddddddddd");
        // 下载完成
        if (status == 200) {
          // if (isds == "down") {
          //   _this.imageSaveByGallery(d.filename);
          // } else {
          _this.stytemshare(d.filename);
          // }
        } else {
          console.log("Download failed: " + status);
        }
      });
      //dtask.addEventListener("statechanged", onStateChanged, false);
      dtask.start();
    },
    //长按保存
    gotouchstart() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(() => {
        //执行长按要执行的内容，
        //base64图片 转file再保存
        // this.imageDown(this.imgurl, "a", "ereor");
        //网络图片，下载再保存
        // this.createDownload(this.imgurl, "down");
      }, 1000); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        //这里写要执行的内容（犹如onclick事件）
        this.timeOutEvent = 0;
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
    //点击分享
    fenxiangClick() {
      //base64图片 转file再保存
      // this.imageDown(this.imgurl, "b", "error");
      //网络图片，下载再保存
      this.createDownload(this.imgurl);
    },
    //初始化bitmap对象
    imageDown(base64, success, error) {
      let _this = this;
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
      var name = this.randomString(10);
      console.log(name, "name...");
      bitmap.save(
        `_doc/${name}.jpg`,
        {
          overwrite: false,
          clip: { top: "0px", left: "0px", width: "100%", height: "80%" },
        },
        function (event) {
          console.log(success, "success");
          if (success == "a") {
            _this.imageSaveByGallery(event.target, success, error);
          }
          if (success == "b") {
            _this.stytemshare(event.target);
          }
        },
        function (err) {
          window.plus.nativeUI(err.message);
        }
      );
    },
    //保存到相册
    imageSaveByGallery(url, success, error) {
      let _this = this;
      console.log(url, success, error, "保存到相册");

      // if (isiOS) {
      //   console.log('ios')
      //   plus.gallery.save(
      //     url + "jpg",
      //     function (event) {
      //       _this.Toast("保存成功");
      //     },
      //     function (err) {
      //       console.log(err,'err')
      //       _this.Toast("保存失败");
      //     }
      //   );
      // } else {
      // console.log('anzhuo')
      window.plus.gallery.save(
        url,
        function (event) {
          _this.Toast("保存成功");
        },
        function (err) {
          _this.Toast("保存失败");
        }
      );
      // }
    },

    //调用系统分享
    stytemshare(url) {
      let msg = {
        type: "image",
        title: "全网惠", //标题
        content: "全网惠分享", //内容
        pictures: [url], //缩略图
        thumbs: [url], //缩略图
      };
      plus.share.sendWithSystem(
        msg,
        function () {
          console.log("成功");
        },
        function (e) {
          console.log(e, "失败");
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
.fenxiangyl {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .sharebtn {
    width: 0.48rem;
    height: 0.48rem;
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 0.48rem;
    z-index: 999;
    img {
      // display: block;
      width: 100%;
      height: 100%;
    }
  }
  .backimg {
    // position: relative;
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: hidden;
    .contentimg {
      width: 100%;
    }
    .img {
      width: 100%;
      display: block;
    }
    .imgcon {
      position: absolute;
      top: 6rem;
      left: 0;
      right: 0;
      width: 90%;
      height: 55%;
      margin: 0 auto;
      .conimg {
        width: 100%;
        height: 100%;
      }
      .texts {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        .textfx {
          margin-top: 1rem;
          font-size: 0.426667rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #391407;
          line-height: 0.8rem;
          .last {
            font-size: 0.48rem;
            font-weight: bold;
            color: #ef4757;
            display: flex;
            align-items: center;
            justify-content: center;
            #yaoqingma {
              text-align: center;
              width: 3rem;
              border: none;
              background: none;
            }
            .records {
              color: #000;
            }
          }
        }
        .erweima {
          width: 4rem;
          height: 4rem;
          margin: 0 auto;
          margin-top: 0.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .btnfx {
    position: absolute;
    bottom: 0.933333rem;
    left: 0;
    right: 0;
    width: 80%;
    height: 35px;
    margin: 0 auto;
    text-align: center;
    line-height: 35px;
    font-size: 16px;
    color: #fff;
    p {
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #fa684e, #f04848);
      box-shadow: 0px 8px 6px 0px rgba(218, 67, 37, 0.3);
      border-radius: 19px;
    }
  }
  .sharecontent {
    padding: 0 0.533333rem;
    .sharefx {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .sfx {
        // flex: 1;
        padding: 0.266667rem 0;
        width: 20%;
        text-align: center;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
        p {
          font-size: 0.373333rem;
        }
      }
    }
  }
}
</style>