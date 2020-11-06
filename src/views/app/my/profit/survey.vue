<template>
  <div class="survey">
    <app-title>历史概况</app-title>
    <div class="rili" @click="surveyshow = true">
      <img src="@/assets/my/rili.png" alt @click="surveyshow=true" />
      <p>{{date}}</p>
    </div>
    <div class="conwidth">
      <div style="margin-top:20px;">
        <div class="lishilist" v-for="i in list" :key="i.date">
          <p class="s-title">{{i.date}}</p>
          <survey2 :data="i" v-if="i" :type="$route.query.type"></survey2>
        </div>
      </div>
    </div>
    <!-- 日期 时间选择器 -->
    <van-popup v-model="surveyshow" position="bottom">
      <!-- <van-dialog v-model="surveyshow" title="标题" show-cancel-button> -->
      <div v-if="$route.query.type==1">
        <van-datetime-picker
          v-model="currentDate2"
          type="date"
          title="选择年月日"
          :min-date="minDate2"
          :max-date="maxDate2"
          @confirm="condate2"
          @cancel="canceldate"
        />
      </div>
      <div v-if="$route.query.type==2">
        <van-datetime-picker
          v-model="currentDate1"
          type="year-month"
          title="选择年月"
          :min-date="minDate1"
          :max-date="maxDate1"
          :formatter="formatter"
          @confirm="condate1"
          @cancel="canceldate"
        />
      </div>
      <!-- </van-dialog> -->
    </van-popup>
  </div>
</template>
<script>
import { format } from "@/utils/date";
export default {
  name: "survey",
  data() {
    return {
      surveyshow: false,
      date: "",
      list: null,
      minDate1: new Date(2019, 0, 1),
      maxDate1: new Date(),
      currentDate1: new Date(),
      minDate2: new Date(2019, 0, 1),
      maxDate2: new Date(),
      currentDate2: new Date(),
    };
  },
  mounted() {
    this.list = this.$route.query.data;
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    //年月选择确认
    condate1(value) {
      let year = value.getFullYear();
      let month = value.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let currentDate1 = year + "-" + month;
      this.$api.app.my.memberPlateFormList({
        type:2,
        date:this.currentDate1
      }).then(res=>{
        this.$router.push({path:'/app/profitdetail',query:{datalist:res.data,date:currentDate1}})
      })
      this.surveyshow = false;
    },
    //年月日选择确认
    condate2(value) {
      let year = value.getFullYear();
      let month = value.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = value.getDate();
      day = day < 10 ? "0" + day : day;
      let currentDate2 = year + "-" + month + "-" + day;
      this.$api.app.my.memberPlateFormList({
        type:1,
        date:this.currentDate2
      }).then(res=>{
        this.$router.push({path:'/app/profitdetail',query:{datalist:res.data,date:currentDate2}})
      })
      this.surveyshow = false;
    },
    //日期取消
    canceldate() {
      this.surveyshow = false;
    },
  },
  beforeRouteLeave(to, from, next) {
    let keepAlive = to.name == "profitdetail";
    this.$route.meta.keepAlive = keepAlive;
    if (!keepAlive && this.$vnode.parent) {
      this.$vnode.parent.componentInstance.cache = {};
      this.$vnode.parent.componentInstance.key = [];
    }
    this.$forceUpdate();
    this.$nextTick(() => {
      next();
    });
  },
};
</script>
<style lang="scss" scoped>
.survey {
  position: relative;
  height: 100vh;
  .conwidth {
    height: calc(100% - 40px);
    overflow-y: scroll;
    padding: 0 0.533333rem;
  }
  .rili {
    position: absolute;
    right: 20px;
    top: 12px;
    width: 15px;
    height: 15px;
    overflow: hidden;
    z-index: 1000;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .lishilist {
    margin-bottom: 0.373333rem;
    .s-title {
      font-size: 0.373333rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(26, 5, 5, 1);
      padding-bottom: 0.213333rem;
    }
  }
}
</style>