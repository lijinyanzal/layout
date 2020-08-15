<template>
  <div class="layout">
    <div class="content" v-if="tables && layout">
      <ul>
        <grid-layout
          class="grid_layout"
          :layout.sync="layout"
          :colNum="6"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="true"
          :use-css-transforms="true"
        >
          <grid-item
            class="grid_item"
            v-for="item in tables"
            :key="item.id"
            :x="item.x"
            :y="item.y" 
            :w="item.w"
            :h="item.h"
            :i="item.id"
            :minW="2"
            :minH="2"
          >
            <Card  tag="li" 
              :item="item"
            ></Card>
          </grid-item>
        </grid-layout>
      </ul>
    </div>
  </div>
</template>

<script>
import Card from '@/views/Card.vue'
import VueGridLayout from 'vue-grid-layout'

export default {
  components: {
    Card,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  }, 
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    tables() {
      try {
        const tablesId = this.$store.getters.tablesId;
        const cards = this.$store.getters.cards;
        const  layout = this.$store.state.layout
        return tablesId.map(id => {
          return {...cards[id],...layout[id]}
        })
      } catch(err) {
        console.log(err)
      } 
    },
    top(){
      return this.$store.getters.top
    },
    topDate: {
      get(){
        return [this.top.start, this.top.end]
      },
      set(val) {
        [this.top.start, this.top.end] = val
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    layout() {
      try {
        const layout = this.$store.getters.layout
        const tablesId = this.$store.getters.tablesId
        return tablesId.map(id => layout[id])
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
  .layout {
    width: 100%;
    box-sizing: border-box;
  }
  ul {
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .grid_layout {
    position: relative;
  }
</style>