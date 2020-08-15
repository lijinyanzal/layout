/* eslint-disable no-unused-vars */
<template>
  <div class="wrapper">
    <div class="control-bar">
      <div class="date-picker" v-if="dateShow">
        <el-date-picker
          v-model="date"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @input="dateChangeHandler"
        ></el-date-picker>     
      </div>
      <div class="rate-tabs">
        <el-tabs 
          v-model="activeName" 
          type="card" 
          @tab-click="tabClickHandler" 
        >
          <el-tab-pane label="分时" name="first">
            <div>
              
            </div>
          </el-tab-pane>
          <el-tab-pane label="日k" name="second">
            <div>
              <ECharts :item="item"></ECharts>
            </div>
          </el-tab-pane>
          <el-tab-pane label="月k" name="third">
            <div>
              <ECharts :item="item"></ECharts>
            </div>
          </el-tab-pane>
          <el-tab-pane label="年k" name="fouth">
            <div>
              <ECharts :item="item"></ECharts>
            </div>
          </el-tab-pane>
          <el-tab-pane name="fifth">
            <el-dropdown slot="label" 
              placement="bottom-start"
            >
              <span class='el-dropdown-link'>
                分钟<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot='dropdown' >
                <el-dropdown-item>5分钟</el-dropdown-item>
                <el-dropdown-item>15分钟</el-dropdown-item>
                <el-dropdown-item>30分钟</el-dropdown-item>
                <el-dropdown-item>60分钟</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tab-pane>
          
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from '@/views/ECharts.vue'

export default {
  data() {
    return {
      activeName: 'second',
      dateShow: false,
    };
  },
  components: {
    ECharts
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
  },
  methods: {
    dateChangeHandler(event) {
      try {
        if (event) {
          this.$store.dispatch('getData', {start: event[0], end: event[1], id: this.item.id})
        }
      } catch(err) {
        console.log(err)
      }
    },
    formatDate(start, end) {
      start = start.toISOString().split("T")[0]
      end = end.toISOString().split("T")[0]
      return [start, end]
    },
    tabClickHandler(tab) {
      if (tab.name === 'first' || tab.name === 'fifth' ) {
        this.dateShow = false
      } else {
        this.dateShow = true
      }
      const frequency = {
        '日k': 'daily',
        '月k': 'monthly',
        '年k': 'annual',
      }
      this.$store.dispatch('getHistoryData', {code: this.item.name, frequency: frequency[tab.label], lable: tab.label})
    }
  }
}
</script>

<style>
  .control-bar {
    display: flex;
    position: relative;
    overflow: visible;
  }
  .date-picker {
    display: inline-block;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 230px;
    border-radius: 0;
    border-left: 1px solid #777;
  }
  .rate-tabs {
    color: #fff;
    
  }
  .el-tabs__content {
    position: absolute;
    left: 0px;
    right: 0px;
    height: 600px;
    overflow-y: scroll;
    color: #000;
  }
  .el-tabs__item {
    color: #fff;
  }
  .el-tabs__item.is-active {
    color: #fff;
    background: #555;
  }
  .el-dropdown-link {
    color: #fff;
    border: none;
    outline: none;
  }
  .el-dropdown-link:hover {
    color: #409EFF;
    cursor: pointer;
  }
  .el-icon-arrow-down {
    color: #fff;
  }
  .el-icon-arrow-down:hover {
    color: #409EFF;
    cursor: pointer;
  }
  .el-tabs__nav-scroll {
    box-sizing: border-box;
  }

</style>