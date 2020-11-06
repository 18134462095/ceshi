<template>
  <div class="card">
    <!-- 卡包 -->
    <app-title>卡包</app-title>
    <div class="conwidth">
      <div class="cardlist">
        <div class="ka">
          <img class="bakimg" src="@/assets/my/card.png" alt />
          <div class="mark">
            <img src="@/assets/my/cardfont.png" alt />
            <p>会员卡特权介绍</p>
            <div class="btndetail">
              <p>查看详情</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
};
</script>
<style lang="scss" scoped>
.card {
  .cardlist {
    padding: .4rem 0.533333rem;
    .ka {
      position: relative;
      width: 100%;
      height: 4.12rem;
      border-radius: 0.133333rem;
      overflow: hidden;
      .bakimg {
        width: 100%;
        height: 100%;
        // object-fit: cover;
      }
      .mark {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0.693333rem 0 0 0.64rem;
        img {
          width: 3.226667rem;
          height: 0.52rem;
        }
        p {
          font-size: 0.346667rem;
          font-weight: 400;
          color: rgba(140, 140, 140, 1);
          line-height: 0.506667rem;
          margin-top: 0.386667rem;
        }
        .btndetail {
          position: absolute;
          right: .4rem;
          bottom: .666667rem;
          p {
            width: 1.6rem;
            height: 0.666667rem;
            border: 1px solid rgba(60, 60, 60, 1);
            border-radius: 0.133333rem;
            font-size: 0.32rem;
            font-weight: 400;
            color: rgba(60, 60, 60, 1);
            line-height: 0.666667rem;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>