<template>
  <div class="appNav" v-if="show">
    <div class="placeholder"></div>
    <div class="nav">
      <router-link
        v-for="i in nav"
        :key="i.path"
        :to="i.path"
        replace
      >
        <div class="navicon">
          <i class="iconfont" :class="'icon-' + i.icon"></i>
        </div>
        <p>{{i.name}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNav',
  data () {
    return {
      nav: [
        {
          name: '首页',
          path: '/app/index',
          icon: 'shouye'
        },
        {
          name: '大牌秒杀',
          path: '/app/commission',
          icon: 'qianbao'
        },
        {
          name: '9.9包邮',
          path: '/app/support',
          icon: 'shangcheng'
        },
        {
          name: '我的',
          path: '/app/my',
          icon: 'wode'
        },
      ]
    }
  },
  computed: {
    show () {
      return this.$route.meta.nav
    }
  }
}
</script>

<style scoped lang="scss">
$navHeight: 47px;
.appNav {
  height: $navHeight;
  .placeholder, .nav {
    height: $navHeight;
  }
  .nav {
    z-index: 99;
    border-top: 1px solid #ececec;
    position: fixed;
    height: $navHeight;
    bottom: 0;left: 0;right: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding-top: 6px;
    border-top: 1px solid #ececec;
    overflow: hidden;
    a {
      flex: 1;
      text-decoration: none;
      color: #000;
      .iconfont {
        font-size: 18px;
      }
      &.router-link-active {
        color: $activeNav;
        .iconfont {
          background: $activeIcon;
          color: transparent;
          -webkit-background-clip: text;
        }
        .navicon {
          .img {
            display: none;
          }
          .activeImg {
            display: block;
          }
        }
      }
      p {
        font-size: 14px;
      }
      .navicon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        img {
          height: 100%;
        }
        .activeImg {
          display: none;
        }
        .img {
          display: block;
        }
      }
    }
  }
}
</style>