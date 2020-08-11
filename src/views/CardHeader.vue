<template>
  <div class="header-wrapper">
    <span class="card-name">{{ item.name }}</span>
    <div class="edit-container">
      <el-popover
        placement="bottom"
        width="160"
        v-model="visible"
        style="margin-right: 5px"
        @show="inputAutofocus"
      >
        <el-input 
          size="small"
          style="margin-bottom: 5px;"
          clearable
          v-model.trim="editingData"
          ref="editInput"
          @keyup.enter.native="editClickHandler"
        ></el-input>
        <div style="text-align: right;">
          <el-button size="mini" type="text" @click="cancelEditHandler">取消</el-button>
          <el-button type="primary" size="mini" @click="editClickHandler">确定</el-button>
        </div>
        <el-button slot="reference"
          size="small"
        >编辑</el-button>
      </el-popover>
    </div>
    <div class="delete-container">
      <el-button class="card-delete" 
        type="danger" plain
        size="small"
        @click="deleteStartHandler"
      >删除</el-button>
      <el-dialog 
        title="提示"
        :modal="false"
        :visible.sync="dialogVisible"
        width="100%"
      >
        <span>确认删除卡片{{ item.name }}吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteClickHandler">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <span class="total-message" v-if="messageLength">{{ messageLength }}条</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      editingData: '',
      dialogVisible: false,
    }
  },
  props: ['item'],
  computed: {
    date: {
      get() {
        return [this.item.start, this.item.end]
      },
      set(val) {
        [this.item.start, this.item.end] =  val
      }
    },
    messageLength() {
      return this.item.tableData && this.item.tableData.length
    },
    tablesId() {
      return this.$store.getters.tablesId
    }
  },
  methods: {
    editClickHandler() {
      this.visible = false
      if (this.editingData) {
        this.$store.dispatch('editCard', {id: this.item.id, data: this.editingData})
      } 
    },
    inputAutofocus() {
      this.$nextTick(function () {
        this.$refs.editInput.$el.querySelector('input').focus()
      })
    },
    cancelEditHandler() {
      this.visible = false
      this.editingData = ''
    },
    deleteStartHandler() {
      this.dialogVisible = true
    },
    deleteClickHandler() {
      this.dialogVisible = true
      this.$store.dispatch('deleteCard', this.item.id)
    },
    // eslint-disable-next-line no-unused-vars
    cellStyle({row, column, rowIndex, columnIndex}) {
      try {
        if (columnIndex === 0) {
          return this.item.columnDim.map(item => {
            if (item.style) {
              return item.style
            }
          })
        }
      } catch(err) {
        console.log(err)
      }
    },
    // eslint-disable-next-line no-unused-vars
    headerCellStyle({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        return this.item.columnDim.map(item => {
          if (item.style) {
            return item.style
          }
        })
      }
    },
  }
}
</script>

<style scoped>
  .header-wrapper {
    padding: 10px;
  }
  .card-name {
    margin: 0 20px;
  }
  .edit-container,
  .delete-container {
    display: inline-block;
  }
  .total-message {
    margin: 15px 20px;
    padding-top: 5px;
    vertical-align: baseline;
    font-size: 12px;
  }
</style>