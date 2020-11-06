<template>
  <div class="hello">
    <div v-show="false">
      <p>预览</p>
      <div class="before"></div>
    </div>
    <div class="container">
      <div class="img-container">
        <img :src="oldimg" ref="image" alt />
      </div>
    </div>
    <button class="vanbtn" :disabled="isDisable" type="error" @click="sureSava">确定</button>
    <!-- <img :src="afterImg" v-if="false" alt /> -->
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "Uploadimg",
  props: {
    oldimg: {
      type: String,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      myCropper: null,
      afterImg: "",
      isDisable: false,
      compress: 0.8,
      base64: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: "none",
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: ".before",
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        movable: true,
        scalable: true,
        zoomable: true,
        zoomOnTouch: true,
        touchDragZoom:true
      });
    },
    sureSava() {
      this.isDisable = true;
      // console.log(0)
      this.afterImg = this.myCropper
        .getCroppedCanvas({
          imageSmoothingQuality: "high",
          maxWidth: 500,
          maxHeight: 500,
          fillColor: "#fff",
          imageSmoothingEnabled: false,
        })
        .toDataURL("image/jpeg",.5);
        // console.log(1)
      this.$emit("afterimg", this.afterImg);
      setTimeout(() => {
        this.isDisable = false;
      }, 1000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  width: 100%;
  height: 90%;
  // button {
    // position: absolute;
    // right: 0.266667rem;
    // bottom:30px;
  // }
}
.container {
  display: flex;
  height: 100%;
}
.before {
  width: 100px;
  height: 100px;
  overflow: hidden;
  /* 这个属性可以得到想要的效果 */
}
.img-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    // width: 100%;
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
.vanbtn {
  position: absolute;
  right: 0.18rem;
  top: 0.18rem;
  width: 2rem;
  height: 0.8rem;
  background: #ef4745;
  border: none;
  color: #fff;
  border-radius: .066667rem;
}
</style>