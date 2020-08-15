<template>
    <chart :options="options" style="height: 600px;"></chart>
</template>
 
<script>
import ECharts from 'vue-echarts'
import 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'

export default {
  components: {
    chart : ECharts,
  },
  data() {
    return {
    }
  },
  props: ['item'],
  computed: {
    options() {
      return this.$store.getters.options
    }
  }
}
</script>

<style>

</style>