<template>
  <div class="order-wrapper">
    <eui-layout class="container" :regions="regions">
      <div slot="north">
        <ul class="tabs">
          <li v-for="(status, index) in statusList"
              :class="{active: query.status === status.value}"
              :key="index" @click="tabClick(status.value)">
            {{status.name}}
          </li>
        </ul>
      </div>
      <eui-table slot="center"
                 v-loading="loading"
                 :options="tableOptions">
        <el-table-column slot="status" label="状态" align="center" minWidth="100">
          <template slot-scope="scope">
            {{getStatus(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column status="progress" label="进度条" align="center" minWidth="100">
          <template slot-scope="scope">
            <el-progress :percentage="getProgress(scope.row)" :show-text="false"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="详情" align="center" minWidth="100" fixed="right">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="text"
                @click="getDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </eui-table>
    </eui-layout>
    <order-detail-window ref="detail">
    </order-detail-window>
  </div>
</template>

<script>
  import EuiLayout from './components/EuiLayout'
  import EuiTable from './components/EuiTable'
  import OrderDetailWindow from './window/OrderDetailWindow'
  import api from '@/api'
  export default {
    components: {
      EuiLayout,
      EuiTable,
      OrderDetailWindow
    },
    data() {
      return {
        regions: {
          north: {},
          middle: {
            center: {}
          }
        },
        statusList: [
          {
            name: '全部',
            value: null
          }, {
            name: '待生产',
            value: 0
          }, {
            name: '生产中',
            value: 1
          }, {
            name: '已完成',
            value: 8
          }
        ],
        loading: false,
        query: {
          status: null,
          page: 1,
          rows: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'productTitle', label: '产品名称', minWidth: 100},
            {prop: 'productSpec', label: '规格', minWidth: 100},
            {prop: 'batchNo', label: '批号', minWidth: 100},
            {prop: 'finishQuantity', label: '完成数量', minWidth: 100},
            {prop: 'quantity', label: '数量', minWidth: 100},
            {prop: 'status', slot: true},
            {prop: 'progress', slot: true}
          ],
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.rows = name === 'pageSize' ? val : this.query.rows
            this.getTableData()
          }
        }
      }
    },
    methods: {
      tabClick(val) {
        this.query.status = val
        this.getTableData()
      },
      getTableData() {
        this.loading = true
        api.TempUserGetTradeSummary(this.query).then(res => {
          this.loading = false
          this.tableOptions.data = res.data.data.rows
          this.tableOptions.total = res.data.data.total
        })
      },
      getStatus(row) {
        return this.statusList.find(status => status.value === row.status)?.name
      },
      getProgress(row) {
        if (row.finishQuantity > row.quantity) {
          return 100
        }
        return row.finishQuantity ? row.finishQuantity / row.quantity * 100 : 0
      },
      getDetail(row) {
        api.TempUserGetTradeItem({
          id: row.id
        }).then(res => {
          this.$refs.detail.open(res.data.data)
        })
      }
    },
    mounted() {
      this.getTableData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .order-wrapper
    position: relative
    box-sizing: border-box
    padding: 30px
    background: #F7F7F7
    .container
      width: 100%
      height: 100%
      background: #ffffff
      box-shadow: 0 0 3px #ccc
      display: flex
      flex-wrap: wrap
      overflow: hidden
      .tabs
        display: flex
        margin-top: 30px
        li
          width: 120px
          height: 40px
          margin-left: 20px
          line-height: 40px
          text-align: center
          border: 1px solid #E0E0E0
          background: #ffffff
          border-radius: 40px
          color: #0077FF
          font-size: 14px
          transition: all .3s
          &.active
            color: #ffffff
            background: #0077FF
</style>
