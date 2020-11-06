<template>
  <div class="nickname">
    <app-title>昵称修改</app-title>
    <div class="conwidth">
      <div class="padd20">
        <div class="nickbox">
          <input maxlength="11" v-model="nickName" type="text" placeholder="请输入昵称" />
          <div class="close" @click="close">
            <img src="@/assets/my/guanbi.png" alt />
          </div>
        </div>
        <van-button @click="changenickname" class="nickbtn" block>保存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nickname",
  data() {
    return {
      nickName: "",
    };
  },
  created() {
    this.nickName = this.$route.query.nickName;
  },
  methods: {
    
    close() {
      this.nickName = "";
    },
    changenickname() {
      // console.log(this.nickName.length,'this.nickName.length')
      if (this.nickName == "") {
        this.Toast("昵称不能为空");
      } else {
        this.$api.app.my.getChangeNickName(this.nickName).then((res) => {
          // console.log(res, "nickname");
          if (res.code == 200) {
            this.Toast("修改成功");
            this.getInfo().then(() => {
              this.$router.back();
            });
          } else {
            this.Toast(res.msg);
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.nickname {
  .nickbox {
    margin-top: 0.533333rem;
    width: 100%;
    // height: 1.146667rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.133333rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 0.3rem;
    input {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 0.373333rem;
    }
    .close {
      width: 0.266667rem;
      height: 0.266667rem;
      // overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .nickbtn {
    height: 1.2rem;
    background: rgba(254, 87, 71, 1);
    box-shadow: 0px 4px 16px 0px rgba(161, 161, 161, 0.41);
    border-radius: 0.133333rem;
    color: #fff;
    font-size: 0.48rem;
    margin-top: 6.666667rem;
  }
}
</style>