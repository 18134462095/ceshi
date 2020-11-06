<template>
  <div class="settingss">
    <app-title>设置</app-title>
    <div class="conwidth">
      <div class="touxiang" @click="showupBOX=true">
        <p class="tx">头像</p>
        <div class="img">
          <div class="img1">
            <img :src="user.headImgUrl" alt />
          </div>
          <div class="img2">
            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
            <!-- <img src="@/assets/my/rightr.png" alt /> -->
          </div>
        </div>
      </div>

      <van-cell
        title="昵称"
        is-link
        :value="user.nickName.length>9 ? user.nickName.slice(0,9) + '...':user.nickName"
        @click="$router.push({path:'nickname',query:{nickName:user.nickName}})"
      />
      <van-cell title="收货地址" is-link @click="$router.push('goodsaddress')" />
      <div class="margin10">
        <van-cell title="账号" :value="user.phone" />
        <van-cell title="手机号" :value="user.phone" />
        <!-- <van-cell title="微信号" is-link value="未绑定" /> -->
        <van-cell title="关于我们" is-link @click="$router.push('about')" />
      </div>
      <div class="padd20">
        <van-button class="settbtn" @click="signOutshow">退出登录</van-button>
      </div>
    </div>
    <van-dialog v-model="show" title="标题" show-cancel-button @confirm="signOut">
      <p class="dialogtip">确认要退出登录吗？</p>
    </van-dialog>
    <!-- 裁剪 -->
    <van-popup class="vantpopup" v-model="uploadimgshow">
      <div style="width:100%;height:20px;"></div>
      <uploadimg @afterimg="afterimg" :oldimg="oldimg" :key="key"></uploadimg>
      <!-- <div class="imgflexs"> -->
        <!-- <van-button class="vanbtn huanimg" size="small" @click="gengHuan">更换图片</van-button>
        <van-button @click="closeshow" class="vanbtn close" size="small">取消</van-button> -->
      <!-- </div> -->
    </van-popup>
    <van-popup class="showupBox" v-model="showupBOX" round position="bottom">
      <van-button @click="showCamara" type="default">拍照</van-button>
      <van-button @click="showAlbum" type="default">从相册选择</van-button>
      <van-button @click="showupBOX=false" type="default">取消</van-button>
    </van-popup>
  </div>
</template>
<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  name: "Settingss",
  data() {
    return {
      showupBOX: false,
      key: 12,
      myCropper: {
        viewMode: 1,
        dragMode: "move",
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: ".before",
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        movable: true,
        zoomOnTouch: true,
      },
      oldimg: "",
      uploadimgshow: false,
      show: false,
      user: {
        phone: "",
        nickName: "",
        headImgUrl: "",
      },
      isDisable: false,
    };
  },
  mounted() {
    this.user = this.$store.getters.info;
  },
  methods: {
    tobase(file) {
      let _this = this;
      var reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = function () {
        let { result } = this;
        _this.oldimg = result;
        _this.key++;
      };
    },
    //拍照
    showCamara() {
      let _this = this;
      _this.showupBOX = false;
      let camera = plus.camera.getCamera();
      camera.captureImage(
        function (filePath) {
          plus.zip.compressImage(
            {
              src: filePath,
              dst: filePath,
              width: "70%", // 缩小到原来的一半
              quality: 20,
              overwrite: true,
            },
            function (dst) {
              // console.log("Compress success!");
              // console.log(dst.target, "dst");
              _this.upImg(dst.target);
              // _this.oldimg = dst.target
              // _this.key++
              // _this.upImg(dst.target);
            },
            function (error) {
              // console.log("Compress error!" + error);
            }
          );
        },
        function (e) {
          // alert(e);
        }
      );
    },
    //压缩图片
    compress(filePath) {
      // console.log(filePath);
    },
    upImg(filePath) {
      let _this = this;
      plus.io.resolveLocalFileSystemURL(
        filePath,
        function (entry) {
          let reader = null;
          entry.file(function (file) {
            // console.log(file, "file");
            reader = new plus.io.FileReader(); // 文件系统中的读取文件对象，用于获取文件的内容
            reader.readAsDataURL(file);
            (reader.onloadend = function (e) {
              // console.log(e, 'e')
              let dataBase = 'data:image/jpeg;base64' + e.target.result;
              _this.uploadimgshow = true;
              localStorage.noback = '1'
              _this.oldimg = dataBase;
              _this.key++;
              plus.key.addEventListener('backbutton', _this.cancel)
            }),
              function (e) {
                alert(e.message);
              };
          });
        },
        function (e) {
          plus.nativeUI.toast("读取拍照文件错误！");
        }
      );
    },
    cancel () {
      localStorage.noback = ''
      plus.key.removeEventListener('backbutton', this.cancel)
      this.uploadimgshow = false;
    },
    //相册选择
    showAlbum() {
      let _this = this;
      _this.showupBOX = false;
      plus.gallery.pick(
        function (path) {
          _this.upImg(path)
        },
        function (e) {},
        { filter: "image" }
      );
    },
    // afterRead(file) {
    //   this.uploadimgshow = true;
    //   this.oldimg = file.content;
    //   this.key++;
    // },
    //更换图片
    gengHuan() {
      this.showAlbum();
    },
    // beforeRead(path) {
    //   let imagetype = /jpg|jpeg$/;
    //   console.log(path);
    //   if (!imagetype.test(path)) {
    //     this.uploadimgshow = true;
    //     this.oldimg = path;
    //     this.key++;
    //   } else {
    //     this.Toast("请上传 jpg/jpeg 格式图片");
    //   }
    // },
    // 退出登陆------------
    signOutshow() {
      this.show = true;
    },
    signOut() {
      this.$api.app.login.getLogOut().then((res) => {
        if (res.code == 200) {
          // plus.oauth.getServices((services) => {
          //   let obj = services.filter(i => i.id == 'weixin')[0] || null
          //   if (obj) {
          //     obj.logout(e => {
          //     });
          //   }
          // })
          this.$store.commit("memberInfo", null);
          this.$router.replace("/login");
        } else {
          this.Toast(res.msg);
        }
      });
    },
    // 裁剪   ------------
    closeshow() {
      this.uploadimgshow = false;
    },
    afterimg(img) {
      // console.log(2);
      this.$api.app.my.getChangeHeadImg(img).then((res) => {
        if (res.code == 200) {
          this.Toast("上传成功");
          this.user.headImgUrl = img;
          this.getInfo();
          localStorage.noback = ''
          this.uploadimgshow = false;
          plus.key.removeEventListener('backbutton', this.cancel)
        } else {
          this.Toast(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.settingss {
  .touxiang {
    position: relative;
    background: #fff;
    width: 100%;
    padding: 0.346667rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    .tx {
      font-size: 0.373333rem;
      color: #000;
    }
    .img {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .img1 {
        width: 0.933333rem;
        height: 0.933333rem;
        background: rgba(254, 80, 71, 1);
        border-radius: 50%;
        overflow: hidden;
        // margin-right: .266667rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:active {
      background-color: #f2f3f5;
    }
  }
  .dialogtip {
    color: #ef4745;
    text-align: center;
    line-height: 2rem;
  }
  >>> .van-cell {
    padding: 0.266667rem 0.8rem;
  }
  .margin10 {
    margin-top: 0.133333rem;
  }
  .settbtn {
    margin-top: 5.48rem;
    width: 100%;
    height: 1.2rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 16px 0px rgba(161, 161, 161, 0.41);
    border-radius: 0.133333rem;
    font-size: 0.373333rem;
    font-weight: 400;
    color: rgba(254, 87, 71, 1);
  }
  .upsc {
    p {
      width: 100%;
      height: 1.066667rem;
      font-size: 0.426667rem;
      font-weight: bold;
      text-align: center;
      line-height: 1.066667rem;
      border-bottom: 1px solid rgb(248, 242, 242);
    }
  }
  .conwidth {
    >>> .van-uploader__wrapper {
      display: block;
    }
    >>> .van-uploader {
      width: 100%;
    }
  }
}

.footer-btn {
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .scope-btn {
    width: 350px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .upload-btn {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
}
.vantpopup {
  width: 100%;
  height: 100vh;
  background: #000;
  .huantu {
    position: absolute;
    left: 0.266667rem;
    bottom: 5px;
  }
  .dflex {
    display: flex;
    align-items: center;
  }
}
>>> .van-uploader__input-wrapper {
  color: #fff;
}
.showupBox {
  // padding-bottom: 1.4rem;
  text-align: center;
  font-size: 0.373333rem;
  button {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 0.026666rem solid #ececec;
    line-height: 1.4rem;
    height: auto;
  }
}
.container {
  display: flex;
}
.before {
  width: 100px;
  height: 100px;
  overflow: hidden;
  /* 这个属性可以得到想要的效果 */
}
.img-container {
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    // height: 100%;
  }
}
.afterCropper {
  flex: 1;
  margin-left: 20px;
  border: 1px solid salmon;
  text-align: center;
}
.afterCropper img {
  width: 150px;
  margin-top: 30px;
}
.imgflexs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.133333rem;
}
.vanbtn {
  // left: 0.15rem;
  width: 2rem;
  height: 0.8rem;
  background: #ef4745;
  border: none;
  color: #fff;
}
.close {
  // left: 0.15rem;
  // bottom: -4px;
}
.huanimg {
  // left: 0.15rem;
  // top: 4px;
}
</style>