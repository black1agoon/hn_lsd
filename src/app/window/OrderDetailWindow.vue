<template>
  <eui-window :options="windowOptions" ref="window">
    <div class="content">
      <div class="detail">
        <div class="title">详情</div>
        <div class="form">
          <div class="item" v-for="(item, index) in formInfo" :key="index">
            <div class="label">{{item.label}}:</div>
            <div class="value">{{formdata[item.value]}}</div>
          </div>
        </div>
      </div>
      <div class="report">
        <div class="title">检测报告</div>
        <div class="imglist">
<!--          <img v-for="(file, index) in formdata.productFileList" :key="index" :src="file.filePath" />-->
          <el-image v-for="(file, index) in formdata.productFileList"
                    :src="getImageUrl(file.filePath)"
                    :preview-src-list="[getImageUrl(file.filePath)]"
                    :key="index">
          </el-image>
        </div>
      </div>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '../components/EuiWindow'
  import { getImageUrl } from '../../assets/js/utils'

  export default {
    name: 'order-detail-window',
    components: {
      EuiWindow
    },
    data() {
      return {
        windowOptions: {
          width: 800,
          height: 460
        },
        formInfo: [
          {
            label: '产品名称',
            value: 'productTitle'
          }, {
            label: '规格',
            value: 'productSpec'
          }, {
            label: '批号',
            value: 'batchNo'
          }, {
            label: '数量',
            value: 'quantity'
          }, {
            label: '状态',
            value: 'status'
          }, {
            label: '盒数',
            value: 'boxInQuantity'
          }, {
            label: '箱数',
            value: 'packageQuantity'
          }, {
            label: '生产设备号',
            value: 'deviceTitle'
          }
        ],
        formdata: {},
        getImageUrl
      }
    },
    methods: {
      open(data = {}) {
        console.log(data)
        this.formdata = data
        this.$refs.window.open()
      }
    },
    mounted() {
      // this.open()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.content
  display: flex
  font-size: 13px
  color: #70727C
  .title
    font-size: 14px
    color: #000000
    padding: 10px 0
    border-bottom: 1px solid #E4EAEE
  .detail
    flex: 1
    height: 100%
    margin-right: 50px
    .form
      display: flex
      flex-wrap: wrap
      .item
        flex: 0 0 200px
        margin: 20px 0
        .label
          display: inline-block
          margin-right: 10px
        .value
          display: inline-block
  .report
    flex: 0 0 230px
    .imglist
      padding: 10px
      height: 350px
      overflow-y: auto
      .el-image
        width: 100%
        margin: 10px 0
</style>
