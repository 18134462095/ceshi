<template>
  <div class="fansMsg">
    <app-title>粉丝详情</app-title>
    <div class="fansMsgcontent">
      <div class="fansTop">
        <img :src="memberInfo.headImgUrl" alt />
        <div>
          <p>
            <span class="phone">{{memberInfo.phone}}</span>
          </p>
          <span class="time">注册时间：{{formatDate(memberInfo.registTime)}}</span>
        </div>
      </div>
      <div class="explain" v-if="income">
        <div class="conwidth explainList">
          <div class="expItem">
            <p>{{income.thatDayMoney.all}}</p>
            <span>今日预估</span>
          </div>
          <div class="expItem">
            <p>{{income.thatMonthMoney.all}}</p>
            <span>本月预估</span>
          </div>
          <div class="expItem">
            <p>{{directNum}}</p>
            <span>专属粉丝数</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { formatWithSeperator } from '@/utils/datetime'
export default {
  name: "FansMsg",
  data() {
    return {
      directNum:1,
      memberInfo:'',
      income:null,

    };
  },
  created() {
    // this.id = this.$route.query.id;
    this.getFansDetail(this.$route.query.id);
  },
  methods: {
    getFansDetail(id) {
      this.$api.app.my.getfansdetail(id).then(res=>{
        this.directNum = res.data.directNum;
        this.memberInfo = res.data.memberInfo;
        this.income = res.data.income;
      });
    },
    formatDate (date) {
      return formatWithSeperator(date, '.',':')
    },
  },
};
</script>

<style lang="scss" scoped>
.fansMsg {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .fansMsgcontent {
    height: 0;
    flex: 1;
    overflow-y: auto;
    .fansTop {
      display: flex;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.133333rem;
      padding: 0.266667rem;
      margin: 0 20px;
      margin-bottom: 0.266667rem;
      img {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        box-shadow: 0px 0.04rem 0 rgba(254, 80, 71, 0.4);
        background: #000;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      div {
        font-size: 0.373333rem;
        color: rgba(26, 5, 5, 1);
        p {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.533333rem;
        }
        flex: 1;
        width: 0;
      }
      .time {
        font-size: 0.293333rem;
        color: rgba(174, 174, 174, 1);
      }
    }
    .explain {
      padding: 0.4rem 0;
      background: #fff;
      .explainList {
        display: flex;
        div {
          flex: 1;
          position: relative;
          text-align: center;
          line-height: 1.5;
          p {
            font-size: 0.373333rem;
            color: rgba(60, 60, 60, 1);
          }
          span {
            font-size: 0.32rem;
            color: rgba(174, 174, 174, 1);
          }
          &:after {
            display: block;
            content: "";
            position: absolute;
            width: 1px;
            right: 0;
            top: 0;
            bottom: 0;
            background: #f3f3f4;
          }
          &:last-child:after {
            display: none;
          }
        }
      }
    }
    .gaikuang {
      width: 9.173333rem;
      margin: 0 auto;
      margin-top: 0.4rem;

      .gk_top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        line-height: 0.373333rem;

        h4 {
          color: #1a0505;
          font-size: 0.373333rem;
        }

        .lsgk {
          color: #3c3c3c;
          font-size: 0.32rem;
          display: block;
          .icon {
            font-size: 0.32rem;
          }
        }
      }

      .gk_bottom {
        width: 100%;
        height: 2.426667rem;
        background: #fff;
        border-radius: 0.133333rem;
        margin-top: 0.4rem;
        display: flex;
        position: relative;
        .shouru {
          width: 50%;
          padding-left: 0.506667rem;
          padding-top: 0.4rem;
          span {
            color: #8c8c8c;
            font-size: 0.32rem;
            display: block;
          }
          i {
            font-style: normal;
            color: #fe5747;
            font-size: 0.48rem;
            line-height: 30px;
            display: block;
            margin-top: 0.4rem;

            b {
              font-size: 0.32rem;
            }
          }
        }
        .danshu {
          width: 50%;
          padding-top: 0.4rem;
          span {
            color: #8c8c8c;
            font-size: 0.32rem;
            display: block;
          }
          i {
            font-style: normal;
            color: #1a0505;
            font-size: 0.373333rem;
            display: block;
            margin-top: 0.4rem;
          }
        }

        .ckxq {
          position: absolute;
          background: none;
          border: none;
          color: #aeaeae;
          font-size: 0.293333rem;
          bottom: 0.386667rem;
          right: 0.333333rem;
        }
      }
    }
  }
}
</style>