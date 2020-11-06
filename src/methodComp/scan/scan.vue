<template>
  <div class="scan" ref="scan" v-if="show">
  </div>
</template>

<script>
export default {
  name: "Scan",
  data() {
    let _this = this;
    return {
      show: true,
      barcode: null
    };
  },
  methods: {
    close (result) {
      plus.key.removeEventListener('backbutton', this.close)
      this.callback && this.callback(result);
      localStorage.noback = ''
      this.barcode.close();
      this.show = false;
    },
    scan () {
      if(!this.barcode){
        this.barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
          top:'0',
          left:'0px',
          width: '100%',
          height: '100%',
          position: 'fixed'
        });
        this.barcode.onmarked = this.onmarked;
        plus.webview.currentWebview().append(this.barcode);
      }
      this.barcode.start();
    },
    onmarked (type, result) {
      var text = '未知: ';
      switch(type){
        case plus.barcode.QR:
          text = 'QR: ';
          break;
      }
      this.close( result );
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.show = true;
      localStorage.noback = '1'
      this.scan()
      plus.key.addEventListener('backbutton', this.close)
    });
  }
};
</script>

<style lang="scss" scoped>
.scan {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
</style>