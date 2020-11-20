<template>
  <transition name="show">
    <div class="window-wrapper" v-show="show">
      <div class="mask"></div>
      <div class="window" :style="{
      width: options.width + 'px',
      height: options.height + 'px'
    }">
        <div class="close el-icon-close" @click="cancel"></div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="btns"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'eui-window',
    props: {
      options: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.show = true
      },
      cancel() {
        this.show = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.window-wrapper
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  padding: 0
  transition: all .3s
  z-index: 9999
  &.show-enter, &.show-leave-to
    opacity: 0
  .mask
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    background: rgba(0,0,0,.3)
  .window
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 0
    margin: auto
    background: #ffffff
    display: flex
    flex-direction: column
    padding: 20px
    box-sizing: border-box
    .close
      position: absolute
      right: 15px
      top: 15px
      cursor: pointer
    .content
      flex: 1
      margin-top: 30px

</style>
