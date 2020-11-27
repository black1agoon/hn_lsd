<template>
  <div class="header-wrapper">
    <div class="logo"></div>
    <ul class="navigation">
<!--      <li>-->
<!--        <router-link to="">首页</router-link>-->
<!--      </li>-->
<!--      <li>-->
<!--        <router-link to="">产品</router-link>-->
<!--      </li>-->
<!--      <li>-->
<!--        <router-link to="">服务</router-link>-->
<!--      </li>-->
      <li :class="{active: $route.path === '/order'}">
        <router-link to="/order">用户中心</router-link>
      </li>
    </ul>
    <div class="btn login" v-if="!loginStatus" @click="login">登录</div>
    <div class="btn logout" v-loading="logout_loading" v-else @click="logout">退出</div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'v-header',
    computed: {
      ...mapState([
        'loginData'
      ]),
      loginStatus() {
        return !!this.loginData.userID
      }
    },
    data() {
      return {
        logout_loading: false
      }
    },
    methods: {
      logout() {
        this.logout_loading = true
        this.$store.dispatch('logout').finally(() => {
          this.logout_loading = false
          this.$store.commit('CLEAR_LOGIN_DATA')
          window.localStorage.removeItem('loginData')
          this.$router.push('/login')
        })
      },
      login() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.header-wrapper
  position: relative
  min-width: 1200px
  height: 90px
  box-shadow: 0 1px 2px #ccc
  overflow: hidden
  z-index: 10
  display: flex
  .logo
    width: 96px
    height: 44px
    background-image: url("../../assets/img/logo.png")
    background-size: 96px 44px
    background-repeat: no-repeat
    margin: 23px 0 0 57px
  .navigation
    margin-left: 50px
    display: flex
    align-items: center
    font-size: 16px
    li
      cursor: pointer
      width: 100px
      height: 80px
      line-height: 80px
      margin: 0 20px
      text-align: center
      &.active
        a
          color: #333333
  .button
    width: 100px
    height: 40px
    line-height: 40px
    border-radius: 40px
    background: rgba(0,119,226, 1)
    color: #ffffff
    font-size: 18px
    text-align: center
    &:active
      opacity: .8
  .login, .logout
    position: absolute
    top: 25px
    right: 42px
</style>
