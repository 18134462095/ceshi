<template>
  <div class="home conwidth">
    <!-- home -->
    <div class="title" @click="routerDetail">
      <div class="title_img">
        <img src="@/assets/my/title.png"/>
      </div>
      <div>
        <p>用户名：zhengtai</p>
        <p>用户级别：代理</p>
        <p>可提现余额：0元</p>
      </div>
    </div>
    <div class="bakline"></div>
    <div class="content">
      <div class="menu" v-for="(i,index) in menulist" :key="index" @click="$router.push(i.eclick)">
        <div class="menu_img" :style="{backgroundImage:i.backgroundImage}">
          <img :src="i.img" alt="">
        </div>
        <p>{{ i.name }}</p>
      </div>
    </div>
    <div class="fixdbtn" @click="close">
      退出后台登录
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menulist:[
        {
          name:'商家管理',
          backgroundImage:'linear-gradient(to bottom right, rgba(102,122,179,1), rgba(102,122,179,.1))',
          img:require('@/assets/my/menu.png'),
          eclick:'/app'
        },
        {
          name:'用户管理',
          backgroundImage:'linear-gradient(to bottom right,rgba(232,120,119,1), rgba(232,120,119,.1))',
          img:require('@/assets/my/menu.png'),
          eclick:'/app'
        },
        {
          name:'订单管理',
          backgroundImage:'linear-gradient(to bottom right, rgba(231,120,23,1), rgba(231,120,23,.1))',
          img:require('@/assets/my/menu.png'),
          eclick:'/app'
        },
        {
          name:'卡密管理',
          backgroundImage:'linear-gradient(to bottom right, rgba(227,85,106,1), rgba(227,85,106,.1))',
          img:require('@/assets/my/menu.png'),
          eclick:'/app'
        },
        {
          name:'广告管理',
          backgroundImage:'linear-gradient(to bottom right, rgba(132,194,37,1), rgba(132,194,37,.1))',
          img:require('@/assets/my/menu.png'),
          eclick:'/app'
        },
        {
          name:'财务管理',
          backgroundImage:'linear-gradient(to bottom right, rgba(59,179,194,1), rgba(59,179,194,.1))',
          img:require('@/assets/my/menu.png'),
          eclick:'/app'
        },
        {
          name:'代理指引',
          backgroundImage:'linear-gradient(to bottom right, rgba(217,79,140,1), rgba(217,79,140,.1))',
          img:require('@/assets/my/menu.png'),
          eclick:'/manager/agency/alogin'
        },
      ]
    }
  },
  methods:{
    routerDetail(){
      this.$router.push('/manager/homeDetail')
    },
    close(){},
  }
}
</script>

<style lang="scss" scoped>
.home{
  .title{
    padding: .4rem /* 30/75 */;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .426667rem /* 32/75 */;
    line-height: .7rem /* 30/75 */;
    color: #000;
    font-weight: bold;
    .title_img{
      width: 2rem;
      height: 2rem;
      margin-right: .4rem /* 30/75 */;
      background: #F6F6F6;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .bakline{
    width: 100%;
    height: 10px;
    background: #F6F6F6;
  }
  .content{
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    .menu{
      width: 25%;
      text-align: center;
      font-size: .426667rem /* 32/75 */;
      font-weight: 400;
      margin-top: .4rem /* 30/75 */;
      .menu_img{
        width: 1.333333rem /* 100/75 */;
        height: 1.333333rem /* 100/75 */;
        // background-image: linear-gradient(to bottom right, #667AB3, #BDC6DF);
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: .2rem /* 10/75 */ auto;
        img{
          width: 70%;
          height: 70%;
          object-fit: cover;
        }
      }
    }
  }
  .fixdbtn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2rem /* 300/75 */;
    text-align: center;
    line-height: 2rem;
    font-size: .586667rem /* 44/75 */;
    color: #118EEB;
    background: #F6F6F6;
    font-weight: bold;
  }
}
</style>>
</style>
