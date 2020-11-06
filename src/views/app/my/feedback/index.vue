<template>
  <div class="feedback">
    <app-title>意见反馈</app-title>
    <div class="conwidth">
      <div class="padd20">
        <div class="mtop">
          <div class="fankuitype">
            <p class="fktitle">*反馈类型</p>
            <div class="fankuibtn">
              <div
                @click="active(index,i)"
                :class="{active:index==curr}"
                v-for="(i,index) in feedBackList"
                :key="i.value"
              >
                <span>{{i.title}}</span>
              </div>
            </div>
          </div>
          <div class="fankuitype">
            <p class="fktitle">*详细问题</p>
            <textarea
              v-model="savelist.content"
              placeholder="请输入您要反馈的问题5-200字以内"
              class="textarea"
              type="text"
            ></textarea>
          </div>
          <div class="fankuitype">
            <p class="fktitle">您的联系方式</p>
            <input v-model="savelist.phone" class="fkinput" type="text" />
          </div>
          <div class="button">
            <van-button v-if="savelist.content=='' | savelist.phone==''" class="btn1" block>提交</van-button>
            <van-button v-else class="btn2" @click="feedbackSubmit" block>提交</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Feedback",
  data() {
    return {
      curr: 0,
      feedBackList: [],
      savelist: {
        content: "",
        phone: "",
        type: "",
        typeTitle: "",
      },
      valiphone: /^1[3456789]\d{9}$/,
    };
  },
  mounted() {
    this.$api.app.my.getFeedBackList().then((res) => {
      this.feedBackList = res.data;
      this.savelist.type = res.data[0].value;
      this.savelist.typeTitle = res.data[0].title;
    });
  },
  methods: {
    active(index, i) {
      this.savelist.type = i.value;
      this.savelist.typeTitle = i.title;
      this.curr = index;
    },
    feedbackSubmit() {
      if (this.valiphone.test(this.savelist.phone)) {
        this.$api.app.my.getSaveFeedBack(this.savelist).then((res) => {
          if (res.code == 200) {
            this.Toast("反馈成功");
            this.curr = 0;
            this.savelist.content = "";
            this.savelist.phone = "";
          } else {
            this.Toast(res.msg);
          }
        });
      } else {
        this.Toast("请输入正确的联系方式");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.feedback {
  .mtop {
    margin-top: 0.533333rem;
    .fankuitype {
      margin-bottom: 0.666667rem;
      .fktitle {
        font-size: 0.373333rem;
        margin-bottom: 0.266667rem;
      }
      .fankuibtn {
        display: flex;
        align-items: center;
        div {
          width: 1.6rem;
          height: 0.733333rem;
          background: #e9e9e9;
          border-radius: 0.133333rem;
          color: #000;
          text-align: center;
          line-height: 0.666667rem;
          margin-right: 0.266667rem;
          font-size: 0.32rem;
          span {
            width: 100%;
            height: 100%;
          }
        }
        .active {
          background: #fe5747;
          color: #ffffff;
        }
      }
      .textarea {
        width: 100%;
        height: 4.24rem;
        border: none;
        border-radius: 0.133333rem;
        font-size: 0.373333rem;
        line-height: 0.533333rem;
        padding: 0.266667rem;
      }
      .fkinput {
        width: 100%;
        height: 1rem;
        border: none;
        border-radius: 0.133333rem;
        font-size: 0.373333rem;
        padding: 0 0.266667rem;
      }
    }
    .button {
      display: flex;
      margin-top: 2rem;
      >>> .van-button {
        color: #fff;
        font-size: 0.5rem;
        font-weight: 600;
        border-radius: 0.15rem;
      }
      .btn1 {
        background: #ff98aa;
      }
      .btn2 {
        background: #fe5747;
      }
    }
  }
}
</style>