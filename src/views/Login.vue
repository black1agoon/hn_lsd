<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="form-box">
        <div class="form">
          <p class="welcome">Welcome to lsd.</p>
          <p class="text">请登录您的账号进行访问。</p>
          <div class="input-wrap">
            <div class="label">Email</div>
            <input type="text" v-model="loginData.credential" />
          </div>
          <div class="input-wrap">
            <div class="label">Password</div>
            <input type="password" v-model="loginData.password" />
          </div>
          <div class="btn login" v-loading="loading" @click="login">登录</div>
        </div>
      </div>
      <div class="logo">
        <img src="../assets/img/loginlogo.png" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginData: {
          credential: null,
          password: null
        },
        loading: false
      }
    },
    methods: {
      login() {
        if (!this.loginData.credential || !this.loginData.password) {
          this.$message.warning('请输入账号和密码!')
          return
        }
        this.loading = true
        this.$store.dispatch('login', this.loginData).then(() => {
          this.loading = false
          this.$router.push('/')
        }).catch(() => {
          this.loading = false
        })
      },
      keyDown(e) {
        var theEvent = window.event || e
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode
        if (code === 13) {
          this.login()
        }
      }
    },
    mounted() {
      document.body.addEventListener('keydown', this.keyDown)
    },
    destroyed() {
      document.body.removeEventListener('keydown', this.keyDown)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-wrapper
  position: relative
  .container
    display: flex
    width: 1400px
    margin: 67px auto
    .form-box
      width: 700px
      height: 656px
      background: #FAFBFC
      .form
        position: relative
        margin: 110px auto
        width: 450px
        height: 430px
        border-radius: 10px
        box-shadow: 0 0 3px 1px #ccc
        padding: 40px 30px 30px
        box-sizing: border-box
        .welcome
          font-size: 30px
          color: #757575
        .text
          font-size: 14px
          color: #A1A1A1
          margin: 20px 0 60px 0
        .input-wrap
          margin-top: 20px
          .label
            font-size: 12px
            color: #A1A1A1
          input
            width: 100%
            height: 36px
            line-height: 36px
            border-bottom: 1px solid #D4D4D4
            text-decoration: none
            outline: none
            background: #FAFBFC
            color: #757575
        .login
          position: absolute
          right: 30px
          bottom: 30px
    .logo
      width: 700px
      height: 700px
      img
        width: 100%
</style>

