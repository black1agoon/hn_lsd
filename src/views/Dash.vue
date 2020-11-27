<template>
    <el-container class="content-wrapper">
      <el-container>
        <sidebar></sidebar>
        <el-main>
          <keep-alive>
            <router-view class="router"></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import Sidebar from './sidebar/Sidebar'

  export default {
    name: 'Dash',
    components: {
      Sidebar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.content-wrapper
  width: 100%
  height: calc(100% - 90px)
  position: relative
  overflow: hidden
  .el-main
    padding: 0
    .router
      width: 100%
      height: 100%
  .el-container
    overflow: hidden
</style>
