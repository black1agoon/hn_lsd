<template>
  <div class="sidebar-wrapper">
    <div class="avatar-box">
      <div class="avatar">
        <img src="../../assets/img/avatar.png">
      </div>
      <div class="name">{{loginData.realName}}</div>
    </div>
    <div class="menus-wrap">
      <div class="item"
           :class="{active: currentIndex === index}"
           v-for="(item, index) in menus"
           :key="index"
           @click="go2page(item, index)">
        <i :class="item.icon"></i>{{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'sidebar',
    computed: {
      ...mapState([
        'loginData'
      ])
    },
    data() {
      return {
        currentIndex: 0,
        menus: [
          {
            name: '在线验厂',
            icon: 'online',
            path: '/online'
          }, {
            name: '我的订单',
            icon: 'order',
            path: '/order'
          }, {
            name: '用户信息',
            icon: 'userinfo',
            path: '/noOpen'
          }, {
            name: '常见问题',
            icon: 'question',
            path: '/noOpen'
          }
        ]
      }
    },
    methods: {
      go2page(item, index) {
        if (this.$route.path !== item.path) {
          if (item.path === '/noOpen') {
            this.$message.warning('功能暂未开放, 敬请期待.')
            return
          }
          this.currentIndex = index
          this.$router.push(item.path)
        }
      },
      setCurrentIndex() {
        this.currentIndex = this.menus.findIndex(menu => menu.path === this.$route.path)
      }
    },
    mounted() {
      this.setCurrentIndex()
    },
    watch: {
      '$route.path' () {
        this.setCurrentIndex()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.sidebar-wrapper
  position: relative
  z-index: 9
  flex: 0 0 270px
  overflow: hidden
  background: #F7F7F7
  box-shadow: 1px 0 2px #ccc
  .avatar-box
    height: 230px
    .avatar
      width: 95px
      height: 95px
      margin: 45px auto 0
      border-radius: 100%
      img
        width: 100%
    .name
      text-align: center
      font-size: 16px
      color: #808080
      margin-top: 20px
  .menus-wrap
    font-size: 13px
    color: #999999
    .item
      display: flex
      align-items: center
      height: 70px
      cursor: pointer
      transition: all .3s
      &.active
        color: #0077FF
        background: #EBEBEB
        .online
          background-image: url("../../assets/img/online1.png")
        .order
          background-image: url("../../assets/img/order1.png")
        .userinfo
          background-image: url("../../assets/img/userinfo1.png")
        .question
          background-image: url("../../assets/img/question1.png")
      i
        display: inline-block
        width: 18px
        height: 18px
        background-size: 18px 18px
        background-repeat: no-repeat
        margin: 0 20px 0 80px
      .online
        background-image: url("../../assets/img/online.png")
      .order
        background-image: url("../../assets/img/order.png")
      .userinfo
        background-image: url("../../assets/img/userinfo.png")
      .question
        background-image: url("../../assets/img/question.png")

</style>
