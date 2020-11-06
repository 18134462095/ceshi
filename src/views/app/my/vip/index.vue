<template>
  <div class="vip">
    <div class="header">
      <app-title style="color:#fff;">会员支付</app-title>
      <div class="conwidth">
        <div class="padd20">
          <div class="user">
            <img class="vip_bg" src="@/assets/my/vip_bg.png" alt />
            <img class="touxiang" :src="user.headImgUrl" alt />
            <div class="user_text">
              <span>{{user.nickName ? user.nickName : '昵称'}}</span>
              <p>您还不是会员，快去开通会员吧</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="conwidth">
      <div class="xztc">
        <div class="padd20">
          <h4>选择套餐</h4>
          <ul class="taocan">
            <li
              v-for="(i,index) in 3"
              :key="index"
              :class="{active:index==act}"
              @click="curractive(index,i)"
            >
              <span>1个月</span>
              <p>
                <i>￥</i>12
              </p>
              <del>原价:￥20/月</del>
            </li>
          </ul>
          <van-checkbox icon-size=".293333rem" v-model="checked">
            <span class="checkbox">已阅读并同意会员订阅服务</span>
          </van-checkbox>
          <van-button color="#FE5747" type="primary" size="large" class="ljkt">立即开通</van-button>
          <ul class="zffs">
            <li>
              <img src="@/assets/my/zfb.png" alt />
              <span>支付宝支付</span>
            </li>
            <li>
              <img src="@/assets/my/wxzf.png" alt />
              <span>微信支付</span>
            </li>
            <li>
              <!-- <img src="@/assets/my/zfb.png" alt /> -->
              <span>支付宝支付 ></span>
            </li>
          </ul>
        </div>
      </div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="常见问题" name="1">内容</van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      activeNames: [],
      act: 0,
    };
  },
  computed: {
    user() {
      return this.$store.getters.info;
    },
  },
  methods: {
    curractive(index, item) {
      this.act = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.vip {
  width: 100%;
  position: relative;
  .header {
    width: 100%;
    height: 3.92rem;
    background: #1a0505;
    border-radius: 0 0 25% 25%;
    position: relative;
    .user {
      width: 100%;
      height: 1.733333rem;
      position: relative;
      top: 1.333333rem;
      left: 0;
      display: flex;
      padding: 0.4rem 0.266667rem;
      margin: 0 auto;
      .vip_bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
      }

      .touxiang {
        width: 0.933333rem;
        height: 0.933333rem;
        background: #1a0505;
        border-radius: 50%;
        z-index: 2;
      }

      .user_text {
        margin-left: 0.266667rem;
        z-index: 2;
        span {
          color: #1a0505;
          font-size: 0.373333rem;
        }
        p {
          color: #8c8c8c;
          font-size: 0.32rem;
          line-height: 0.32rem;
          margin-top: 0.08rem;
        }
      }
    }
  }

  .xztc {
    width: 100%;
    height: 8.8rem;
    background: #fff;
    margin-top: 0.733333rem;
    padding: 0.4rem 0;
    margin-bottom: 0.266667rem;
    h4 {
      color: #8c8c8c;
      font-size: 0.373333rem;
    }
    .taocan {
      width: 100%;
      display: flex;
      justify-content: space-between;
      // padding: .4rem;
      margin-top: 0.4rem;
      margin-bottom: 0.133333rem;

      li {
        width: 31%;
        height: 3.466667rem;
        border: 0.013333rem solid #aeaeae;
        text-align: center;
        border-radius: 0.133333rem;
        span {
          display: block;
          color: #1a0505;
          line-height: 0.36rem;
          font-size: 0.373333rem;
          margin-top: 0.626667rem;
        }
        p {
          color: #fe5747;
          font-size: 0.666667rem;
          margin-top: 0.52rem;
          line-height: 0.666667rem;
          font-weight: bold;
          i {
            font-size: 0.373333rem;
            font-style: normal;
          }
        }
        del {
          display: block;
          font-size: 0.32rem;
          color: #aeaeae;
          margin-top: 0.48rem;
          line-height: 0.333333rem;
        }
      }
      .active {
        background: rgba(242, 223, 188, 1);
        border: 1px solid rgba(254, 87, 71, 1);
      }
    }
    .checkbox {
      font-size: 0.293333rem;
      color: #aeaeae;
    }
    .ljkt {
      margin-top: 0.4rem;
    }
    .zffs {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 0.4rem;
      li {
        width: 2.533333rem;
        height: 0.933333rem;
        border: 0.013333rem solid #aeaeae;
        border-radius: 0.133333rem;
        text-align: center;
        display: flex;
        justify-content: center;
        // padding-top: .16rem;

        img {
          width: 0.466667rem;
          height: 0.466667rem;
          display: block;
          margin-top: 0.2rem;
        }
        span {
          color: #aeaeae;
          font-size: 0.32rem;
          padding-left: 0.133333rem;
          line-height: 0.933333rem;
        }
      }
    }
  }
  >>> .van-cell{
    padding: 10px 20px;
  }
}
</style>