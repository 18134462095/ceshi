<template>
  <div class="profit">
    <div v-if="$store.getters.info.id == 11">
      <!-- <p>jia</p> -->
      <div class="top">
        <app-title class="apptitle">收益报表</app-title>
        <!-- <p class="name">{{ MemberInfo.nickName }}</p> -->
        <p class="name" v-if="MemberInfo.nickName">
          {{
            MemberInfo.nickName.length > 9
              ? MemberInfo.nickName.slice(0, 9) + "..."
              : MemberInfo.nickName
          }}
        </p>
        <p class="name" v-else>{{ MemberInfo.phone }}</p>
        <p class="ktxje">可提现金额:<span>532.94</span></p>
        <div class="leiji">
          <p>累计到账(元):<span>532.43</span></p>
          <p>累计提现(元):<span>328.61</span></p>
          <p>待提现(元):<span>0</span></p>
        </div>
        <button class="tixian" @click="lijitxClick(moneyslist.money)">
          去提现
        </button>
      </div>
      <van-tabs v-model="jiaact">
        <van-tab :title="i.tou" v-for="(i, index) in jiatabs" :key="index">
          <div class="gaikuang" style="justify-content: space-around;">
            <div class="yugu">
              <h5>{{ i.tou }}预估</h5>
              <p><span>￥</span>{{ i.jinri }}</p>
            </div>
            <div class="fkds">
              <h5>付款单数</h5>
              <p>{{ i.danshu }}</p>
            </div>
            <!-- <div class="lsgk" @click="lsgkclick">
              <span>历史概况</span>
              <img src="@/assets/my/righthui.png" alt="" />
            </div> -->
          </div>
          <div class="srmx">
            <h3>个人订单收益</h3>
            <div class="mingxi">
              <table class="table">
                <tr>
                  <th>平台名称</th>
                  <th>预估收入</th>
                  <th>付款次数</th>
                </tr>
                <tr v-for="m in i.geren" :key="m.title">
                  <td>{{ m.title }}</td>
                  <td>{{ m.amount }}</td>
                  <td>{{ m.num }}次</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="srmx">
            <h3>团队订单收益</h3>
            <div class="mingxi">
              <table class="table">
                <tr>
                  <th>平台名称</th>
                  <th>预估收入</th>
                  <th>付款次数</th>
                </tr>
                <tr v-for="n in i.tuandui" :key="n.title">
                  <td>{{ n.title }}</td>
                  <td>{{ n.amount }}</td>
                  <td>{{ n.num }}次</td>
                </tr>
              </table>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="jsmx" @click="incomededetail">
        <span>结算订单明细</span>
        <img src="@/assets/my/righthui.png" alt="" />
      </div>
      <div class="jsmx" @click="$router.push({ path: 'record' })">
        <span>提现记录</span>
        <img src="@/assets/my/righthui.png" alt="" />
      </div>
    </div>
    <div v-else>
      <!-- <p>zhen</p> -->
      <!-- 个人收益 -->
      <div class="top">
        <app-title class="apptitle">收益报表</app-title>
        <!-- <p class="name">{{ MemberInfo.nickName }}</p> -->
        <p class="name" v-if="MemberInfo.nickName">
          {{
            MemberInfo.nickName.length > 9
              ? MemberInfo.nickName.slice(0, 9) + "..."
              : MemberInfo.nickName
          }}
        </p>
        <p class="name" v-else>{{ MemberInfo.phone }}</p>
        <p class="ktxje">
          可提现金额:<span>{{ moneyslist.money }}</span>
        </p>
        <div class="leiji">
          <p>
            累计到账(元):<span>{{ leijilist.cumulativeAccount }}</span>
          </p>
          <p>
            累计提现(元):<span>{{ leijilist.alreadyWithdrawal }}</span>
          </p>
          <p>
            待提现(元):<span>{{ leijilist.waityWithdrawal }}</span>
          </p>
        </div>
        <button class="tixian" @click="lijitxClick(moneyslist.money)">
          去提现
        </button>
      </div>
      <van-tabs v-model="active" @click="qiehuan(active)">
        <van-tab :title="i" v-for="(i, index) in tabs" :key="index">
          <div class="gaikuang" v-if="yugu">
            <div class="yugu">
              <h5>{{ i }}预估</h5>
              <p><span>￥</span>{{ yugu.amount }}</p>
            </div>
            <div class="fkds">
              <h5>付款单数</h5>
              <p>{{ yugu.num }}</p>
            </div>
            <div class="lsgk" @click="lsgkclick">
              <span>历史概况</span>
              <img src="@/assets/my/righthui.png" alt="" />
            </div>
          </div>
          <div class="srmx">
            <h3>个人订单收益</h3>
            <div class="mingxi">
              <table class="table">
                <tr>
                  <th>平台名称</th>
                  <th>预估收入</th>
                  <th>付款次数</th>
                </tr>
                <tr v-for="i in gerensrlist" :key="i.title">
                  <td>{{ i.title }}</td>
                  <td>{{ i.amount }}</td>
                  <td>{{ i.num }}次</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="srmx">
            <h3>团队订单收益</h3>
            <div class="mingxi">
              <table class="table">
                <tr>
                  <th>平台名称</th>
                  <th>预估收入</th>
                  <th>付款次数</th>
                </tr>
                <tr v-for="i in teamlist" :key="i.title">
                  <td>{{ i.title }}</td>
                  <td>{{ i.amount }}</td>
                  <td>{{ i.num }}次</td>
                </tr>
              </table>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="jsmx" @click="incomededetail">
        <span>结算订单明细</span>
        <img src="@/assets/my/righthui.png" alt="" />
      </div>
      <div class="jsmx" @click="$router.push({ path: 'record' })">
        <span>提现记录</span>
        <img src="@/assets/my/righthui.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Profit",
  data() {
    return {
      jiaact:0,
      active: 0,
      tabs: ["今日", "昨日", "本月", "上月"],
      data: {
        ri: [],
        yue: [],
      },
      indexdata: {},
      MemberInfo: "",
      moneyslist: {
        money: "0",
      },
      yugu: "",
      gerensrlist: [],
      teamlist: [],
      lsgktype: 1,
      lsgkdata: null,
      leijilist: {},
      jiatabs: [
        {
          tou: "今日",
          jinri: 39.83,
          danshu: 28,
          geren: [
            {
              title: "京东",
              amount: 0,
              num: 0,
            },
            {
              title: "淘宝",
              amount: 1.88,
              num: 1,
            },
            {
              title: "拼多多",
              amount: 0,
              num: 0,
            },
          ],
          tuandui: [
            {
              title: "京东",
              amount: 11.56,
              num: 8,
            },
            {
              title: "淘宝",
              amount: 18.03,
              num: 17,
            },
            {
              title: "拼多多",
              amount: 9.44,
              num: 3,
            },
          ],
        },
        {
          tou: "昨日",
          jinri: 316.32,
          danshu: 136,
          geren: [
            {
              title: "京东",
              amount: 0,
              num: 0,
            },
            {
              title: "淘宝",
              amount: 6.32,
              num: 4,
            },
            {
              title: "拼多多",
              amount: 0,
              num: 0,
            },
          ],
          tuandui: [
            {
              title: "京东",
              amount: 65.26,
              num: 43,
            },
            {
              title: "淘宝",
              amount: 206.4,
              num: 83,
            },
            {
              title: "拼多多",
              amount: 34.66,
              num: 10,
            },
          ],
        },
        {
          tou: "本月",
          jinri: 652.8,
          danshu: 306,
          geren: [
            {
              title: "京东",
              amount: 2.3,
              num: 1,
            },
            {
              title: "淘宝",
              amount: 8.04,
              num: 5,
            },
            {
              title: "拼多多",
              amount: 0,
              num: 0,
            },
          ],
          tuandui: [
            {
              title: "京东",
              amount: 136.56,
              num: 61,
            },
            {
              title: "淘宝",
              amount: 464.8,
              num: 218,
            },
            {
              title: "拼多多",
              amount: 51.6,
              num: 27,
            },
          ],
        },
        {
          tou: "上月",
          jinri: 1314.44,
          danshu: 516,
          geren: [
            {
              title: "京东",
              amount: 12.46,
              num: 5,
            },
            {
              title: "淘宝",
              amount: 27.6,
              num: 10,
            },
            {
              title: "拼多多",
              amount: 0,
              num: 0,
            },
          ],
          tuandui: [
            {
              title: "京东",
              amount: 356.12,
              num: 52,
            },
            {
              title: "淘宝",
              amount: 907.52,
              num: 422,
            },
            {
              title: "拼多多",
              amount: 50.8,
              num: 42,
            },
          ],
        },
      ],
    };
  },
  created() {
    this.MemberInfo = this.$store.getters.info;
    if(this.$store.getters.info.id != 11){
      console.log(this.$store.getters.info);
      // 可提现金额
      this.$api.app.settle.canCashMoney().then((res) => {
        if (res.code == 200) {
          this.moneyslist.money = res.msg;
        }
      });
      // 日期获取
      this.$api.app.my
        .memberEstimateList({
          type: 1,
        })
        .then((res) => {
          console.log(res, "ri");
          if (res.code == 200) {
            this.data.ri = res.data;
            this.yugu = this.data.ri[0];
            let type = 1,
              id = 1;
            this.shourudetail(res.data[0].date, type);
            this.shourudetail(res.data[0].date, type, id);
            this.lsgkdata = res.data;
          } else {
            this.Toast(res.msg);
          }
        });
      // 月份获取
      this.$api.app.my
        .memberEstimateList({
          type: 2,
        })
        .then((res) => {
          // console.log(res,'yue')
          if (res.code == 200) {
            this.data.yue = res.data;
          } else {
            this.Toast(res.msg);
          }
        });
      this.$api.app.my.memberIncomeIndex().then((res) => {
        if (res.code == 200) {
          this.indexdata = res.data;
        } else {
          this.Toast(res.msg);
        }
      });
      // 累计接口
      this.$api.app.my.personalAccount().then((res) => {
        console.log(res, "累计");
        this.leijilist = res.data;
      });
    }
  },
  methods: {
    qiehuan(active) {
      console.log(active);
      console.log(this.data);
      let type, id;
      switch (active) {
        case 0:
          this.yugu = this.data.ri[0];
          this.shourudetail(this.data.ri[0].date, (type = 1));
          this.shourudetail(this.data.ri[0].date, (type = 1), (id = 1));
          this.lsgktype = 1;
          this.lsgkdata = this.data.ri;
          break;
        case 1:
          this.yugu = this.data.ri[1];
          this.shourudetail(this.data.ri[1].date, (type = 1));
          this.shourudetail(this.data.ri[1].date, (type = 1), (id = 1));
          this.lsgktype = 1;
          this.lsgkdata = this.data.ri;
          break;
        case 2:
          this.yugu = this.data.yue[0];
          this.shourudetail(this.data.yue[0].date, (type = 2));
          this.shourudetail(this.data.yue[0].date, (type = 2), (id = 1));
          this.lsgktype = 2;
          this.lsgkdata = this.data.yue;
          break;
        case 3:
          this.yugu = this.data.yue[1];
          this.shourudetail(this.data.yue[1].date, (type = 2));
          this.shourudetail(this.data.yue[1].date, (type = 2), (id = 1));
          this.lsgktype = 2;
          this.lsgkdata = this.data.yue;
          break;
      }
    },
    lsgkclick() {
      this.$router.push({
        path: "/app/survey",
        query: { data: this.lsgkdata, type: this.lsgktype },
      });
    },
    //结算订单收支明细
    incomededetail() {
      this.$router.push({ name: "incomedetail" });
    },
    shourudetail(date, type, id) {
      let data = null;
      if (id) {
        console.log(id, "有");
        data = {
          type: type,
          date: date,
          orderMemberId: id,
        };
        this.$api.app.my.memberPlateFormList(data).then((res) => {
          console.log(res, "res有");
          // if(id){
          this.gerensrlist = res.data;
          // }else{
          //   this.teamlist = res.data
          // }
        });
      }
      if (!id) {
        console.log(id, "无");
        data = {
          type: type,
          date: date,
        };
        this.$api.app.my.memberPlateFormList(data).then((res) => {
          console.log(res, "res无");
          // if(id){
          //   this.gerensrlist = res.data;
          // }else{
          this.teamlist = res.data;
          // }
        });
      }
    },
    lijitxClick(a) {
      if(this.$store.getters.info.id == 11){
        a = 532.94
      }
      this.$router.push({
        path: "withdraw",
        query: {
          money: a,
        },
      });
    },
    //历史概况
    lishigk(data, type) {
      this.$router.push({
        path: "/app/survey",
        query: { data: data, type: type },
      });
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.top {
  position: relative;
  width: 100%;
  height: 5.2rem;
  background: linear-gradient(150deg, #fe5747, #fb2148);
  .apptitle {
    color: #fff;
  }
  .name {
    margin-top: 0.666667rem;
    margin-left: 0.4rem;
    font-size: 0.373333rem;
    color: #fff;
  }
  .ktxje {
    font-size: 0.32rem;
    color: #ffdddd;
    margin-top: 0.533333rem;
    line-height: 0.48rem;
    margin-left: 0.4rem;
    span {
      color: #fff;
      font-size: 0.48rem;
    }
  }
  .leiji {
    margin-top: 0.933333rem;
    // margin-left: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      font-size: 0.32rem;
      color: #ffdddd;
      span {
        color: #fff;
      }
    }
    p:last-child {
      // margin-left: 1.16rem;
    }
  }
  .tixian {
    position: absolute;
    right: 0;
    top: 2.72rem;
    color: #fb2948;
    font-size: 0.373333rem;
    width: 2.266667rem;
    height: 0.933333rem;
    background: #fff;
    border: none;
    border-radius: 0.133333rem 0 0 0.133333rem;
  }
}

.van-tabs {
  margin-bottom: 0.533333rem;
  >>> .van-tabs__nav {
    background: none;
  }
  .gaikuang {
    width: 9.173333rem;
    height: 1.733333rem;
    background: #fff;
    border-radius: 0.133333rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
    line-height: 22px;
    text-align: center;
    margin-top: 0.266667rem;
    .yugu {
      text-align: center;
      h5 {
        font-size: 0.346667rem;
        color: #1d0808;
      }
      p {
        font-size: 0.48rem;
        color: #fe5747;
        span {
          font-size: 0.32rem;
        }
      }
    }
    .fkds {
      h5 {
        font-size: 0.346667rem;
        color: #1d0808;
      }
      p {
        color: #1a0505;
        font-size: 0.373333rem;
      }
    }
    .lsgk {
      // line-height: 1.733333rem;
      font-size: 0.32rem;
      color: #7c7c7c;
      margin-top: 0.266667rem;

      img {
        width: 0.16rem;
      }
    }
  }

  .srmx {
    width: 9.173333rem;
    margin: 0 auto;
    margin-top: 0.533333rem;
    h3 {
      color: #1a0505;
      font-size: 0.373333rem;
    }
    .mingxi {
      width: 100%;
      height: 4.466667rem;
      background: #fff;
      border-radius: 0.133333rem;
      margin-top: 0.266667rem;
      .table {
        width: 100%;
        height: 100%;
        th {
          color: #1d0808;
          font-size: 0.373333rem;
          // line-height: ;
          text-align: center;
        }
        td {
          font-size: 0.32rem;
          color: #8c8c8c;
          text-align: center;
        }
      }
    }
  }
}

.jsmx {
  width: 100%;
  height: 1.146667rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.666667rem;
  span {
    color: #3c3c3c;
    font-size: 0.373333rem;
  }
  img {
    width: 0.213333rem;
    height: 0.4rem;
  }
}

.profit {
  .zongsy {
    width: 100%;
    padding: 0.533333rem 0 0.426667rem 0;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px 10px 0px 0px;
    .zong {
      text-align: center;
      line-height: 0.533333rem;
      p:first-child {
        font-size: 0.32rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(174, 174, 174, 1);
      }
      p:last-child {
        font-size: 0.48rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(254, 87, 71, 1);
      }
    }
    .shouhuo {
      margin-top: 0.666667rem;
      display: flex;
      .s-money {
        position: relative;
        flex: 1;
        text-align: center;
        line-height: 0.65rem;
        p:first-child {
          font-size: 0.373333rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: rgba(60, 60, 60, 1);
        }
        p:last-child {
          font-size: 0.32rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(174, 174, 174, 1);
        }
        &::after {
          content: "";
          width: 1px;
          height: 0.92rem;
          background: #f3f3f4;
          position: absolute;
          right: 0;
          // top: 0;
          bottom: 0.2rem;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
  }
  .b-title {
    padding: 0.4rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 0.373333rem;
      font-weight: 400;
      color: rgba(26, 5, 5, 1);
    }
    .right {
      display: flex;
      align-items: center;
      p {
        font-size: 0.32rem;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
      }
      img {
        width: 0.48rem;
        height: 0.426667rem;
      }
    }
  }
  .noshouyi {
    font-size: 0.426667rem;
    color: #8c8c8c;
    width: 100%;
    text-align: center;
    padding: 1.333333rem 0;
  }
}
</style>