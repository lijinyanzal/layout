<template>
  <div class="header">
    <div class="add_card">
      <el-button class="add_button" 
        type="primary"
        @click="addStartClickHandler"
      >
        添加卡片
      </el-button>
      <div class="add_content">
        <el-dialog 
          title="添加卡片标题"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-input 
            v-model.trim="input"
            placeholder="请输入标题"
            ref="input"
            clearable
            @keyup.enter.native="addCardClickHandler"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancellClickHandler">取消</el-button>
            <el-button type="primary" 
              @click="addCardClickHandler"
            >确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="delete_all_card">
      <el-button class="add_button" 
        type="danger"
        @click="deleteAllStartClickHandler"
      >
        删除全部
      </el-button>
      <el-dialog 
        title="警告"
        :visible.sync="deleteAllVisible"
        width="30%"
      >
        <span style="font-size: 18px">是否删除所有卡片</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteAllVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteAllClickHandler">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="date-picker">
      <span class="date-label">选择日期</span>
      <el-date-picker
        v-model="topDate"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="allDateChangeHandler"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      editId: 0,
      dialogVisible: false,
      deleteAllVisible: false
    }
  },  
  computed: {
    tablesId() {
      return this.$store.getters.tablesId
    },
    top(){
      return this.$store.state.top
    },
    topDate: {
      get(){
        return [this.top.start, this.top.end]
      },
      set(val) {
        [this.top.start, this.top.end] = val
      }
    }
  },
  updated() {
    if(this.$refs.input) {
      this.$refs.input.focus()
    } 
  },
  methods: {
    addStartClickHandler() { 
      this.dialogVisible = true
    },
    addCardClickHandler() {
      try {
        if (this.input) {
          this.$store.dispatch('addCard', this.input)
        }
        this.input = ''
        this.dialogVisible=false
      } catch(err) {
        console.log(err)
      }
    },
    deleteAllStartClickHandler() {
      this.deleteAllVisible = true
    },
    deleteAllClickHandler() {
      this.deleteAllVisible = false
      this.$store.dispatch('deleteAllCards')
    },
    allDateChangeHandler() {
      try {
        this.$store.dispatch('changeAllDate', this.topDate)
        this.tablesId.forEach(id => {
          this.$store.dispatch('getData', {start: this.topDate[0], end: this.topDate[1], id: id})
        })
      } catch(err) {
        console.log(err)
      }
    },
    cancellClickHandler() {
      this.dialogVisible=false
      this.input = ''
    },
  }
}
</script>

<style scoped>
  .header {
    height: 0;
    width: 100%;
    padding-bottom: 100px;
    border-radius: 5px;
    margin: 0 auto;
  }
  .add_card,
  .delete_all_card {
    display: inline-block;
    padding: 10px 10px;
    padding-right: 20px;
  }
  .date-picker {
    float: right;
    padding: 10px 20px;
  }
  .date-label {
    padding-right: 10px;
  }
</style>