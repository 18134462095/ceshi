<template>
  <div class="about">
    <app-title>关于我们</app-title>
    <div class="conwidth">
      <div class="banben">
        <div class="img">
          <img src="@/assets/logo.png" alt />
        </div>
        <p>v{{versions}}</p>
      </div>
      <van-cell title="系统通知" @click="$router.push('tongzhi')" is-link />
      <van-cell title="用户协议" is-link @click="xieyi"/>
      <van-cell title="隐私权政策" is-link @click="yinsi"/>
      <van-cell title="检查更新" is-link @click="gengxin"/>
    </div>
  </div>
</template>
<script>
import { upAPP } from '@/utils/upAPP';
export default {
  name: "About",
  methods: {
    xieyi () {
      plus.runtime.openWeb('http://39.99.166.101:8080/doc/agreement.html')
    },
    yinsi () {
      plus.runtime.openWeb('http://39.99.166.101:8080/doc/privacy.html')
    },
    gengxin () {
      upAPP(true)
      // this.Toast('暂无更新...')
    },
  },
  data () {
    return {
      versions: '1.2.6'
    }
  },
  mounted () {
    let _this = this
  }
};
</script>
<style lang="scss" scoped>
.about {
  .banben {
    text-align: center;
    padding: 0.666667rem 0;
    .img {
      margin: 0 auto;
      width: 2rem;
      height: 2rem;
      border-radius: 0.133333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      margin-top: 0.266667rem;
      font-size: 0.373333rem;
    }
  }
}
</style>