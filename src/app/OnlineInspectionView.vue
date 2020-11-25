<template>
  <div class="online-wrapper">
    <div class="container">
      <div class="equipment"
           v-for="(equipment, index) in equipmentList"
           :key="index">
        <video ref="video" :id="'myVideo' + index" controls="controls" class="video-js video" preload="auto" data-setup="{}">
          <source :src="'rtmp://lx.wazhiyuan.com:8002/live/' + equipment" type="rtmp/flv" />
<!--          <source src="rtmp://lx.wazhiyuan.com:8002/live/192.168.3.214_ef5f9166-be3d-4827-af53-ac2400d71c86" type="rtmp/flv" />-->
        </video>
        <div class="name">视频设备</div>
      </div>

    </div>

    <div class="dialog" v-show="dialogVisible">
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
  import '../assets/video/video-js.css'
  import '../assets/video/videojs-ie8.min.js'
  import videojs from '../assets/video/video.js'
  export default {
    computed: {
      showTime() {
        const hour = this.hour > 12 ? this.hour - 12 : this.hour
        const min = ('00' + this.minutes).substring((this.minutes + '').length)
        const suffix = this.hour > 12 ? 'pm' : 'am'
        return `${hour}:${min} ${suffix}`
      }
    },
    data() {
      return {
        hour: 0,
        minutes: 0,
        dialogVisible: true,
        key: null,
        equipmentList: [],
        myPlayer: []
      }
    },
    methods: {
      enter() {
        if (this.key === '' || this.key === null) {
          this.$message.warning('请输入密钥')
          return
        }
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
          this.equipmentList = res.data.data
          this.$nextTick(() => {
            this.myPlayer = []
            for (let i = 0; i < this.equipmentList.length; i++) {
              const video = videojs('myVideo' + i)
              this.myPlayer.push(video)
            }
            // this.$refs.video.forEach(obj => {
            //   obj.onloadeddata = () => {
            //     var canvas = document.createElement("canvas")
            //     canvas.width = 310
            //     canvas.height = 144
            //     canvas.getContext('2d').drawImage(obj, 0, 0, canvas.width, canvas.height)
            //     obj.setAttribute("poster", canvas.toDataURL("image/png"))
            //   }
            // })
          })
        })
      },
      getTime() {
        const date = new Date()
        this.hour = date.getHours()
        this.minutes = date.getMinutes()
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.dialogVisible = true
      })
    },
    beforeRouteLeave(to, from, next) {
      this.myPlayer.forEach(video => {
        video.dispose()
      })
      next()
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
    overflow: hidden
    .equipment
      position: relative
      width: 310px
      height: 188px
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
        height: 144px
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
