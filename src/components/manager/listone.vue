<template>
  <div class="list1">
    <h5 class="title">
      {{title}}
    </h5>
    <div class="list">
      <div
        class="windth20"
        v-for="(i, index) in list"
        :key="index"
        @click="toUrl(i)"
      >
        <div class="img" :style="kgcss">
          <img :src="i[img]" alt="" />
        </div>
        <p>{{ i[name] }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List1",
  props: {
    img: {
      type: String,
      default: "img",
    },
    title:{
      type:String,
      default:"服务"
    },
    name: {
      type: String,
      default: "name",
    },
    router: {
      type: String,
      default: "rouclick",
    },
    list: {
      type: Array,
      default() {
        return {};
      },
    },
    kgcss: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  date() {
    return {
      // lookshow:true
    };
  },
  methods: {
    toUrl(g) {
      // console.log(g)
      switch (g.urlType) {
        case "1":
          this.$router.push(g[this.router]);
          break;
        case "2":
          plus.runtime.openWeb(g[this.router]);
          break;
        case "3":
          plus.runtime.openWeb(g[this.router]);
          break;
        case undefined:
          this.$router.push(g[this.router]);
      }
    },
  },
  mounted() {
    this.$emit("start2");
    this.$nextTick(() => {
      this.$forceUpdate();
    });
  },
};
</script>
<style lang="scss" scoped>
.list1 {
  margin-top: 0.266667rem;
  background: #ffffff;
  padding-top: 0.4rem;
  border-radius: 0.133333rem;
  h5 {
    color: #1D0808;
    font-size: 0.426667rem;
    margin-left: 0.4rem;
    margin-bottom: 0.586667rem;
    font-weight: 600;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  .windth20 {
    width: 25%;
    // margin-top: .28rem;
    padding-bottom: 0.533333rem;
    .img {
      width: 0.933333rem;
      height: 0.933333rem;
      margin: 0 auto;
      img {
        width: 100%;
        // height: 100%;
        // object-fit: cover;
      }
    }
    p {
      font-size: 0.32rem;
      margin-top: 0.15rem;
      color: #7C7C7C;
    }
  }
}
</style>