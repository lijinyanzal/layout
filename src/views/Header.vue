<template>
  <div class="header">
    <div class="add-card">
      <div class="input-wrapper">
        <el-input
          type="text"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          clearable
          ref="input"
          v-model.trim="input"
          @input="changeInputHandler"
          @keyup.enter.native="searchClickHandler"
        >
        </el-input>
        <el-button 
          class="query-btn"
          type="primary"
          @click="searchClickHandler"
        >查询</el-button>
        <div class="search-result"
          v-if="input && popVisible"
        >
          <el-table class="item-wrapper"
            :data="suggestions"
            border
            height="200"
            :cell-style="cellStyle"
            @row-click="clickRowHandler"
            >
            <el-table-column
              prop="code"
              label="代码"
              align="center"
              :formatter="formatter"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              align="center"   
            >
            </el-table-column>
          </el-table>
          <div class="more-wrapper"> 
            <span class="rest-number" v-show="restNumber">{{restNumber}} 条</span>
            <span class="rest-number" v-show="!restNumber && suggestions.length">没有更多内容</span>
            <el-button
              class="more-btn"
              type="primary"
              size="small"
              v-show="restNumber && suggestions.length"
              @click.stop="getMoreClickHandler"
            >更多</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="delete_all_card">
      <el-button class="add_button" 
        type="danger" plain
        size="small"
        @click="deleteAllStartClickHandler"
      >
        delete
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
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
var _ = require('lodash')

export default {
  data() {
    return {
      input: '',
      editId: 0,
      popVisible: true,
      deleteAllVisible: false,
    }
  },  
  computed: {
    ...mapGetters([
      'tablesId',
      'suggestions',
      'currentPage',
      'pageSize',
      'totalPage',
      'totalNumber',
      'delay',
      'searchResults'
    ]),
    restNumber() {
      const restNumber = this.totalNumber - this.pageSize * this.currentPage
      return restNumber > 0 ? restNumber : 0
    }
  },
  mounted() {
    this.$refs.input.focus()
    document.addEventListener('click', this.hidePop)
  },
  updated() {
    this.$refs.input.focus()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hidePop)
  },
  methods: {
    changeInputHandler: _.debounce(
      function() { 
        if (this.input) {
          this.$store.dispatch('getSuggestions', {search: this.input, page: this.currentPage, delay: this.delay, pagesize: this.pageSize, element: this.$refs.input})
        }
        if (!this.input) {
          this.$store.dispatch('clearSuggestions')
        }
      }, 300
    ),
    formatter(row, column, cellValue) {
      return cellValue
    },
    // eslint-disable-next-line no-unused-vars
    cellStyle({row, column, rowIndex, columnIndex}) {
      return
    },
    getMoreClickHandler() {
      this.$store.dispatch('addPage')
      if (this.input && this.currentPage !== this.totalPage) {
        this.$store.dispatch('getMoreSuggestions', {search: this.input, page: this.currentPage, delay: this.delay, pagesize: this.pageSize})
      }
      this.$nextTick(() => {
        let el = this.$el.querySelector('.el-table__body-wrapper');
        el.scrollTop = el.scrollHeight;
      })
    },
    searchClickHandler() {
      if (this.input) {
        this.$store.dispatch('searchStock', {search: this.input})
        this.$store.dispatch('addCard', this.input)
        this.input = ''
      } 
    },
    clickRowHandler(row) {
      this.input = row.code 
      this.searchClickHandler()
    },
    hidePop(e) {
      const pop = document.querySelector('.input-wrapper')
      if (pop) {
        if (!e.path.includes(pop)) {
          this.popVisible = false
          this.input = ''
          this.popVisible = true
        }
        }
      }
    },
    addCardClickHandler() {
      try {
        if (this.input) {
          this.$store.dispatch('addCard', {s: this.input, page: this.page})
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
    cancellClickHandler() {
      this.dialogVisible=false
      this.input = ''
    },
  }

</script>

<style scoped>
  .header {
    height: 0;
    width: 100%;
    border-radius: 5px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 80px;
  }
  .add_card {
    color: #000;
  }
  .input-wrapper {
    width: 40%;
    margin: 10px;
    display: flex;
    overflow: visible;
  }
  .search-result {
    position: absolute;
    top: 40px;
    left: 10px;
    right: calc(60% + 50px);
    bottom: 10px;
    z-index: 111;
  }
  .query-btn {
    border-radius: 0;
  }  
  .more-wrapper {
    position: absolute;
    right: 0px;
    top: 200px;
  } 
  /* .more-btn {
    padding: 10px;
  } */
  .rest-number {
    padding: 10px 20px 10px;
    font-size: 14px;
    color: #333;
  }

</style>
<style>
  .el-input__inner {
    border-radius: 0;
    display: inline;
  }

</style>

