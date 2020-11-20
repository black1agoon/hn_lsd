<template>
  <div class="table-wrapper">
    <el-table
        ref="table"
        class="table"
        :row-class-name="options.rowClassName"
        :data="options.data"
        :span-method="options.objectSpanMethod"
        style="width: 100%"
        size="small"
        height="数值无关紧要，但必须要设置"
        header-row-class-name="header-class"
        :highlight-current-row="highlightCurrentRow"
        @selection-change="(...params) => todoEvent('handleSelectionChange', ...params)"
        @row-click="(...params) => todoEvent('rowClick', ...params)"
        @row-dblclick="(...params) => todoEvent('rowDblclick', ...params)">
      <el-table-column
          v-if="showSelection"
          type="selection"
          width="50"
          fixed>
      </el-table-column>
      <el-table-column
          v-if="showIndex"
          type="index"
          width="40"
          fixed>
      </el-table-column>
      <slot name="prev"></slot>
      <template v-for="(item) in (options.columns)">
        <template v-if="item.slot">
          <slot :name="item.prop"></slot>
        </template>
        <el-table-column
            v-else-if="item.click && item.type !== 'picture'"
            :key="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :align="item.align"
            :sortable="item.sortable">
          <template slot-scope="scope">
          <span class="click-span" @click="handleClick(scope.row)">{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column
            v-else-if="item.showTips"
            :key="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :align="item.align || 'center'"
            :sortable="item.sortable">
          <template slot-scope="scope" >
            <el-tooltip :content="scope.row[item.prop]"
                        placement="bottom-start" effect="light">
              <span>{{scope.row[item.prop]}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
            v-else
            :prop="item.prop"
            :key="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :align="item.align || 'center'"
            :sortable="item.sortable">
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <el-pagination
        v-if="showPagination"
        class="pagination"
        :current-page.sync="options.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :layout="layout"
        :total="options.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'eui-table',
    props: {
      options: {
        type: Object,
        default: () => ({
          data: [],
          total: 0,
          currentPage: 1,
          columns: []
        })
      },
      showPagination: {
        type: Boolean,
        default: true
      },
      showIndex: {
        type: Boolean,
        default: true
      },
      showSelection: {
        type: Boolean,
        default: false
      },
      pageSize: {
        type: Number,
        default: 10
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper, slot'
      },
      highlightCurrentRow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showPicUrl: null,
        currentPage: 1,
        selectionList: []
      }
    },
    methods: {
      todoEvent(name, ...params) {
        if (this.options[name]) {
          this.options[name](...params)
        }
      },
      handleSizeChange(pageSize) {
        this.options['reload']('pageSize', pageSize)
        // this.$emit('reloadTable', 'pageSize', pageSize)
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.options['reload']('page', page)
        // this.$emit('reloadTable', 'page', page)
      },
      callByName(fn, ...args) {
        this.$refs.table[fn].call(this, ...args)
      },
      columnsSort(list) {
        // return list.sort((a, b) => a.req - b.req)
        return list
      },
      handleClick(row) {
        this.$emit('fieldClick', row)
      },
      showFullpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      }
    },
    watch: {
      'currentPage'() {
        if (this.options.data.length === 0) {
          this.$emit('reloadTable', 'page', this.currentPage)
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-wrapper
    display: flex
    flex-direction: column
    flex: 1
    width: 100%
    height: 100%
    padding: 0 10px
    box-sizing: border-box
    /*background: #ebf1f6*/
    .table
      flex: 1
      .click-span
        font-weight: bold
        color: #409eff
        cursor: pointer
    .pagination
      padding: 5px
      border-bottom: 1px solid #eee
</style>
<style>
  .el-table th > .cell {
    color: #000;
    font-weight: bold;
  }

  .el-table .cell {
    white-space: nowrap;
  }

  .el-table .cell i {
    vertical-align: top;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .el-table .cell {
    white-space: nowrap !important;
  }
  .el-table__fixed-right::before, .el-table__fixed::before {
    height: 0
  }
  .el-table .header-class th {
    background: #f7f7f7;
  }
</style>
