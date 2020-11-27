<template>
  <div class="online-wrapper">
    <div class="container">
      <div class="equipment"
           v-for="(equipment, index) in equipmentList"
           :key="index">
        <div class="video" :id="'video' + index"></div>
        <div class="name">{{equipment.title}}</div>
      </div>

    </div>

    <div class="dialog" v-show="dialogVisible" v-loading="loading">
      <div class="mask"></div>
      <div class="content">
        <div class="tips">请输入密钥</div>
        <div class="input-wrap">
          <div class="label">密钥</div>
          <el-input class="input" v-model="key" placeholder="输入密钥"></el-input>
        </div>
        <el-button class="enter" type="primary" @click="enter">进入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import '@/../public/static/js/ckplayer.js'

  export default {
    data() {
      return {
        dialogVisible: true,
        loading: false,
        key: null,
        equipmentList: [],
        deadline: null
      }
    },
    methods: {
      enter() {
        if (this.key === '' || this.key === null) {
          this.$message.warning('请输入密钥')
          return
        }
        this.loading = true
        api.ValidateKeyAllow({
          key: this.key
        }).then(res => {
          if (!res.data.success) {
            return
          }
          if (res.data.data && res.data.data.length === 0) {
            this.$message.warning('没有可查看的设备!')
            return
          }
          this.dialogVisible = false
          this.loading = false
          this.equipmentList = res.data.data.videoList
          this.deadline = res.data.data.deadline
          this.compareTime()
          this.$nextTick(() => {
            this.equipmentList.forEach((eq, idx) => {
              new window.ckplayer({
                container: '#video' + idx,
                variable: 'player',
                flashplayer: false,
                html5m3u8: true,
                autoplay: false,
                loop: false,
                live: true,
                video: `http://lx.wazhiyuan.com:8001/hls/${eq.ipCrm}.m3u8`
              })
            })
          })
        }).catch(() => {
          this.dialogVisible = true
          this.loading = false
        })
      },
      compareTime() {
        this.timer = setInterval(() => {
          const date = new Date().getTime()
          const deadline = new Date(this.deadline).getTime()
          if (date > deadline) {
            this.dialogVisible = true
            this.equipmentList = []
            clearInterval(this.timer)
            this.key = null
          }
        }, 1000 * 60)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.online-wrapper
  position: relative
  box-sizing: border-box
  padding: 30px
  background: #F7F7F7
  .container
    position: relative
    width: 100%
    height: 100%
    background: #ffffff
    box-shadow: 0 0 3px #ccc
    display: flex
    flex-wrap: wrap
    align-content: flex-start
    overflow-y: auto
    .equipment
      position: relative
      /*width: 310px*/
      /*height: 188px*/
      width: 410px
      height: 244px
      margin: 30px 30px 0
      box-shadow: 0 0 2px #ccc
      .mask
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 200
      &.maximize
        z-index: 100
        position: absolute
        width: 100%
        height: 100%
        margin: 0
        .video, video
          left: 0
          top: 0
          position: absolute
          width: 100%
          height: 100%
      .time
        position: absolute
        right: 10px
        top: 15px
        color: #ffffff
        font-size: 12px
      .video, video
        width: 100%
        height: 200px
        background: #230851
        cursor: pointer
      .name
        font-size: 12px
        color: #555555
        height: 44px
        line-height: 44px
        padding-left: 20px
  .dialog
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    padding: 0
    .mask
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      background: rgba(0,0,0,.3)
    .content
      position: absolute
      top: 0
      right: 0
      left: 0
      bottom: 0
      margin: auto
      width: 375px
      height: 300px
      background: #ffffff
      .tips
        height: 66px
        line-height: 66px
        font-size: 21px
        font-weight: bold
        color: #1A173B
        text-align: center
        background: #FAFBFC
      .input-wrap
        margin: 50px 20px 0
        .label
          margin-bottom: 15px
          font-size: 14px
          color: #9FA9BA
        .input
          margin-bottom: 40px
      .enter
        width: 335px
        margin: 0 20px 30px
</style>
