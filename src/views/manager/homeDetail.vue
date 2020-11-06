<template>
  <div class="home-detail conwidth">
    <!-- 代理信息 -->
    <div class="inputd">
      <div class="text">账号</div>
        <input type="text" readonly unselectable='on' v-model="homedetail.username">
    </div>
    <div class="inputd">
      <div class="text">手机号</div>
        <input type="text" readonly unselectable='on' v-model="homedetail.phone">
    </div>
    <div class="inputd">
      <div class="text">注册时间</div>
        <input type="text" readonly unselectable='on' v-model="homedetail.date">
    </div>
    <div class="inputd">
      <div class="text">代理ID</div>
        <input type="text" readonly unselectable='on' v-model="homedetail.ID">
    </div>
    <div class="inputd">
      <div class="text">地址</div>
        <input type="text" readonly unselectable='on' v-model="homedetail.address">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      homedetail:{
        username:'',
        phone:'',
        date:'',
        ID:'',
        address:''
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
.home-detail{
  margin-top: .8rem ;
  .inputd{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .3rem /* 30/75 */ .533333rem /* 40/75 */;
    .text{
      font-size: .533333rem /* 40/75 */;
      text-align: right;
      width: 25%;
      font-weight: bold;
      color: #0000009c;
      // margin-right: .6rem;
    }
    input{
      width: 70%;
      height: 1rem /* 60/75 */;
      border-radius: .133333rem /* 10/75 */;
      border: 1px solid #0000009c;
      text-align: center;
    }
  }
}
</style>
