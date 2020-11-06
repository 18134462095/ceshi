<template>
  <div class="ifm">
    <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  computed: {
    src(){
      return this.$route.params.url
    }
  }
}
</script>

<style lang="scss">
iframe {
  width: 100vw;
  height: 100vh;
}
</style>
