/* eslint-disable no-unused-vars */
<template>
  <div class="card">
    <div class="card-header">
      <CardHeader :item="item"></CardHeader>
      <CardControl :item="item"></CardControl>
    </div>
    <!-- <div class="table">
      <el-table
        :data="item.tableData"
        style="width: 100%"
        border
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
      >  
        <el-table-column
          v-for="(column, index) in item.columnDim"
          :key="index"
          :label="column.title"
          :prop="column.title"
          :align="column.align"
        >
        </el-table-column>
      </el-table>
    </div>  -->
  </div>
</template>

<script>
import CardHeader from '@/views/CardHeader.vue'
import CardControl from '@/views/CardControl.vue'

export default {
  components: {
    CardHeader,
    CardControl
  }, 
  props: ['item']
}
</script>

<style scoped>
  .card {
    box-sizing: border-box;
    overflow: visible;
    color: #fff;
    background: #777;
  }
 

</style>
