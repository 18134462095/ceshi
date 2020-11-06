<template>
  <div class="userApp">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isReload" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isReload" />
    <app-nav />
  </div>
</template>

<script>
export default {
  name: 'UserApp',
  provide(){
		return {
      reload: this.reload,
		}
  },
  data () {
    return {
      isReload: true,
    }
  },
  methods: {
    reload(){
      this.isReload = false
      this.$nextTick(function(){
        this.isReload = true
      })
    },
  }
}
</script>

<style>
  #app{
    position: relative;
  }
</style>