<template>
  <div id="app">
    <router-view />
    <!-- <vueToTop type="4" bottom="130" right="0"></vueToTop> -->
  </div>
</template>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  -webkit-touch-callout: none;
  &::-webkit-scrollbar {
    display: none !important;
  }
}
input,
textarea {
  user-select: auto !important;
}
html,
body,
#app {
  background: $pageBg;
  height: 100vh;
  overflow-y: scroll;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
img:not([src]) {
  opacity: 0;
}
.conwidth {
  width: 10rem;
  margin: 0 auto;
}
.btn {
  display: flex;
  justify-content: space-between;
}
.btn_bgk {
  height: 0.9rem /* 30/75 */;
  background: #d9534f;
  border: none;
  margin: 0.8rem 0.6rem;
  line-height: 0.9rem;
  font-size: 0.373333rem /* 28/75 */;
  border-radius: 0.266667rem /* 20/75 */;
}
.padd20 {
  padding: 0 0.533333rem;
}
.minheight {
  min-height: 13.333333rem;
}


</style>
