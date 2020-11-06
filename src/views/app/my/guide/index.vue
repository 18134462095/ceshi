
<template>
  <div class="guide">
    <app-title>新手指引</app-title>
    <div class="conwidth">
      <div class="padd20">
        <div class="box">
          <div v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Message",
  data() {
    return {
      content:''
    };
  },
  mounted() {
    this.$api.app.my.getGuide().then(res=>{
      this.content = res.data.content
    })
  },
  methods: {
    
  },
};
</script>
<style lang="scss" scoped>
.guide {
  height: 100vh;
  .conwidth{
    position: relative;
    height: calc(100% - 40px);
    overflow-y: scroll;
  }
 .box{
   width: 100%;
   overflow: hidden;
  >>> img{
    width: 100%;
  }
 }
}

</style>