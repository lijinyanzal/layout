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
          @tab-click="handleClick" 
        >
          <el-tab-pane label="分时" name="first">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium rerum eligendi quae nostrum et maxime itaque provident nulla reprehenderit totam voluptas vero, quibusdam consequatur at ut! Quod fugit hic autem.
              Unde temporibus amet sint omnis? Architecto voluptas temporibus maiores, voluptatibus quaerat pariatur accusamus ipsum repellat id ea, maxime praesentium, fuga nisi? Velit autem numquam rerum possimus maiores quos quidem unde?
              Odit molestias necessitatibus suscipit, culpa cum quis hic saepe, eos est, asperiores earum vitae aperiam. Doloremque veniam quas perspiciatis sit voluptates, tempore excepturi iusto aperiam totam ut molestiae architecto quia!
              Facere enim cum iste libero? Magni porro dignissimos maxime repudiandae praesentium rem possimus molestiae deserunt repellat incidunt, consequatur inventore minus odit beatae id quas explicabo. Earum facere maxime quaerat nesciunt?
              Maxime facere, culpa accusantium similique quo doloremque excepturi enim, fugiat asperiores mollitia nemo, laborum dicta recusandae corporis velit a laboriosam alias sint beatae ut rem incidunt. Quisquam temporibus cumque aliquam.
              lorem*10
            </div>
          </el-tab-pane>
          <el-tab-pane label="5日" name="second">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur harum recusandae eaque. Vitae tempore exercitationem a enim velit explicabo debitis esse, at natus quas nam ea officiis maiores optio corrupti?
            </div>
          </el-tab-pane>
          <el-tab-pane label="日k" name="third">
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab ducimus minus porro quis in quibusdam optio non ipsum odit atque nulla dolor libero blanditiis tempora eum ex, adipisci doloribus obcaecati.
            </div>
          </el-tab-pane>
          <el-tab-pane label="周k" name="fourth">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quos facere nostrum quaerat ducimus odit ad magni, quidem sunt obcaecati modi tempora amet perferendis sit inventore iste quam voluptatum atque?
            </div>
          </el-tab-pane>
          <el-tab-pane label="月k" name="fifth">
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi labore, eligendi sed quam esse facere, repudiandae soluta possimus, amet aliquid aspernatur iusto? Reprehenderit, illo hic obcaecati fuga eum aut pariatur.
            </div>
          </el-tab-pane>
          <el-tab-pane name="sixth">
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

export default {
  data() {
    return {
      activeName: 'first',
      dateShow: false,
    };
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
    handleClick(tab) {
      if (tab.name === 'first' || tab.name === 'sixth' ) {
        this.dateShow = false
      } else if (tab.name === 'second') {
        let end = new Date()
        let start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 5)
        this.date = this.formatDate(start, end)
        
        this.$store.dispatch('getData', {start: this.date[0], end: this.date[1], id: this.item.id})
        this.dateShow = true
      } else {
        this.dateShow = true
      }
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
    height: 200px;
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