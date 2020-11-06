<template>
  <div class="onlyTabs">
    <div class="types">
      <van-tabs
        v-model="type"
        class="typeBox"
        :background="bg"
        color="#fe5747"
        title-active-color="#fe5747"
        @change="typeChange"
      >
        <van-tab
          v-for="(i, index) in types"
          :key="index"
          :name="index"
          :title="i[title]"
        />
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnlyTabs",
  props: {
    types: {
      type: Array,
      default() {
        return [];
      },
    },
    bg: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
  },
  data() {
    return {
      type: 0,
    };
  },
  methods: {
    typeChange(index) {
      this.types.forEach((i, idx) => {
        if (index == idx) {
          this.$emit("change", i, index);
        }
      });
    },
    nextTab() {
      if (this.type < this.types.length - 1) {
        this.type++;
      } else {
        this.type = 0;
      }
    },
    prevTab() {
      if (this.type > 0) {
        this.type--;
      } else {
        this.type = this.types.length - 1;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      // if(this.types.length==5){
      //   this.types.pop()
      // }
      // console.log(this.$route.path, "this.$route.params.path");
      // if (this.types.length == 5&this.$route.path=='/app/search') {
      //   this.types.pop();
      // }
      this.$emit("change", this.types[0]);
    });
  },
};
</script>

<style scoped lang="scss">
.onlyTabs {
}
</style>