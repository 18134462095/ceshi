<template>
  <div class="indexList">
    <div v-for="(bit, bitIdx) in NumBit" :key="'bit' + bit">
      <index-list-item class="listItem" v-for="(iNum, num) in list.slice(bitIdx * forNum, (bitIdx * forNum) + 3)" :key="'iNum' + num" :data="iNum">{{forNum}}</index-list-item>
      <!-- <div class="forNum" v-if="list.length > forNum * bit && show">
        fasfasfasf
      </div> -->
    </div>
    <index-list-item class="listItem" v-for="(i, index) in list.slice(show ? forNum * NumBit : 0)" :key="'item' + index" :data="i"></index-list-item>
  </div>
</template>

<script>
export default {
  name: 'IndexList',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    show: {
      type: Boolean,
      default: true
    },
    forNum: {
      type: Number,
      default: 3
    },
    NumBit: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
    }
  },
  watch: {
    list (v) {
    }
  }
}
</script>

<style scoped lang="scss">
.indexList {
  width: 100%;
}
</style>