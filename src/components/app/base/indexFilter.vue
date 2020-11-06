<template>
  <div class="indexFilter">
    <div class="filterTool">
      <div class="conwidth">
        <div class="filterItem" v-for="(i, index) in filter" :key="index" :class="{active: i.active}" @click="clickItem(index)">
          <span>{{i.name}}</span>
          <img v-if="i.index != null" :src="require('@/assets/app/sort' + i.index + '.png')" alt="">
        </div>
        <div v-if="coupon" class="filterItem" :class="{ active }" @click="clickcoupon">
          <span>优惠券</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexFilter',
  data () {
    return {
      filter: [],
      getsort: [],
      active: false
    }
  },
  props: {
    coupon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickItem (index) {
      if (this.filter[index].active == true && this.filter[index].index == null) return
      this.filter.forEach((i, idx) => {
        if (index != idx) {
          i.active = false
          if (i.index != null) {
            i.index = 0
          }
        } else {
          i.active = true
          if(i.index != null) {
            if (i.index == 0 || i.index == 2) {
              i.index = 1
            } else if (i.index == 1) {
              i.index = 2
            }
          }
        }
      })
      this.$nextTick(() => {
        this.emitFilter()
      })
    },
    emitFilter () {
      this.filter.forEach(i => {
        if (i.active) {
          if (i.index == null) {
            this.getsort.forEach(j => {
              if (j.title.slice(0, 2) == i.name) {
                this.change(j)
              }
            })
          } else {
            this.getsort.forEach(j => {
              if (j.title.slice(0, 2) == i.name) {
                if (i.index == 1 && j.jdSort == 'desc') {
                  this.change(j)
                } else if (i.index == 2 && j.jdSort == 'asc') {
                  this.change(j)
                }
              }
            })
          }
        }
      })
    },
    change (a) {
      if (this.coupon) {
        a.coupon = this.active
      }
      this.$emit('change', a)
    },
    clickcoupon () {
      this.active = !this.active
      this.emitFilter()
    }
  },
  mounted () {
    this.$api.app.home.getSort().then(res => {
      if (res.code == 200) {
        this.getsort = res.data
        let filter = []
        let name = ''
        res.data.forEach((i, index) => {
          let item = {
            prop: i.name,
            name: i.title.slice(0,2),
            active: false
          }
          if (name == i.title.slice(0,2)) {
            filter.forEach(j => {
              if (j.name == name) {
                j.index = 0
              }
            })
          } else {
            filter.push(item)
            name = i.title.slice(0,2)
          }
        })
        filter[0].active = true
        this.filter = filter
        this.$nextTick(() => {
          this.emitFilter()
        })
      } else {
        this.Toast.fail('获取排序枚举失败')
      }
    })
  }
}
</script>

<style scoped lang="scss">
.indexFilter {
  width: 100%;
  height: 40px;
  .filterTool {
    width: 100%;
    position: absolute;
    z-index: 2;
    background: #fff;
    .conwidth {
      display: flex;
      justify-content: space-between;
      .filterItem {
        flex: 1;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          color: #000;
        }
        img {
          margin-left: 3px;
          width: 12px;
        }
      }
    }
  }
}
</style>