<template>
  <div class="notice">
    <app-title>官方公告</app-title>
    <div class="conwidth">
      <div class="padd20">
        <div class="box" v-html="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Notice',
  data(){
    return{
      content:''
    }
  },
  mounted(){
    this.$api.app.my.getNotices().then(res=>{
      this.content = res.data[0].content
    })
  }
}
</script>
<style lang="scss" scoped>
.notice{

}
</style>