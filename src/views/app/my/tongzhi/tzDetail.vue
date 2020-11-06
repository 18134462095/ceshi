<template>
  <div class="tzDetail">
    <app-title>公告详情</app-title>
    <div class="contn">
      <div class="noteTitle">{{data.title}}</div>
      <div class="time">
        <p>时间:</p>
        <span>{{formatDate(data.createTime)}}</span>
      </div>
      <div class="content ql-editor" v-html="data.content"></div>
    </div>
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/datetime";
export default {
  name: "tzDetail",
  methods: {
    formatDate(date) {
      return formatWithSeperator(date, ".", ":");
    },
  },
  computed: {
    data () {
      return this.$route.params
    }
  }
};
</script>
<style lang="scss" scoped>
.tzDetail {
  height: 100vh;
  .contn {
    padding: 0.5rem;
    background: #fff;
    border-radius: 0.04rem;
    height: calc(100% - 40px);
    overflow-y: scroll;
    div {
      margin-bottom: 0.266667rem;
      padding: 0.133333rem 0.2rem;
    }
    .noteTitle {
      font-size: .5rem;
      font-weight: 500;
    }
    .time {
      border-bottom: 1px solid #ececec;
      p{
        font-size: 0.4rem;
        color: #333;
        margin-bottom: 0.133333rem;
      }
      span{
        font-size: 0.373333rem;
        color: #999;
      }
    }
    .content {
      border: none;
      padding: 0.5rem;
      line-height: 1.5;
      font-size: 0.32rem;
      >>> img {
        display: block;
        width: 100%;
      }
      >>> h1 {
        font-size: 2em;
      }
      >>> h2 {
        font-size: 1.5em;
      }
      >>> h3 {
        font-size: 1.17em;
      }
      >>> h4 {
        font-size: 1em;
      }
      >>> h5 {
        font-size: 0.83em;
      }
      >>> h6 {
        font-size: 0.67em;
      }
    }
  }
}
</style>