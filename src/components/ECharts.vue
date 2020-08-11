<template>
  <main>
    <h2 id="bar"></h2>
    <section>
      <figure>
        <chart
          :options="bar"
          style="height: 300px;width: 600px"
        ></chart>
      </figure>
    </section>
    <h2 id="pie"></h2>
    <section>
      <figure>
        <chart 
          :options="pie"
        ></chart>
      </figure>
    </section>
    <h2 id="polar"></h2>
    <section>
      <figure>
        <chart
          :options="polar"
        ></chart>
      </figure>
    </section>
    <h2 id="scatter"></h2>
    <section>
      <figure>
        <chart
          :options="scatter"
        ></chart>
      </figure>
    </section>
    <h2 id="radar"></h2>
    <section>
      <figure>
        <chart
          :options="radar"
        ></chart>
      </figure>
    </section>
    <h2 id="connect"></h2>
    <section>
      <figure>
        <chart
          :options="c1"
        ></chart>
      </figure>
      <figure>
        <chart
          :options="c2"
        ></chart>
      </figure>
    </section>
    <h2 id="flight"></h2>
    <section>
      <figure style="background-color: #003;">
        <chart
          :options="flight"
        ></chart>
      </figure>
    </section>
  </main>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'

import { graphic } from 'echarts/lib/export'

export default {
  components: {
    chart : ECharts,
  }, 
  data () {
    //bar
    function randomize () {
      return [0, 0, 0].map(() => {
        return Math.round(300 + Math.random() * 700) / 10
      })
    }
    //polar
    const data = []

    for (let i = 0; i <= 360; i++) {
      const t = (i / 180) * Math.PI
      const r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

    //scatter
    const scatterData = [
      [
        [28604, 77, 17096869, 'Australia', 1990],
        [31163, 77.4, 27662440, 'Canada', 1990],
        [1516, 68, 1154605773, 'China', 1990],
        [13670, 74.7, 10582082, 'Cuba', 1990],
        [28599, 75, 4986705, 'Finland', 1990],
        [29476, 77.1, 56943299, 'France', 1990],
        [31476, 75.4, 78958237, 'Germany', 1990],
        [28666, 78.1, 254830, 'Iceland', 1990],
        [1777, 57.7, 870601776, 'India', 1990],
        [29550, 79.1, 122249285, 'Japan', 1990],
        [2076, 67.9, 20194354, 'North Korea', 1990],
        [12087, 72, 42972254, 'South Korea', 1990],
        [24021, 75.4, 3397534, 'New Zealand', 1990],
        [43296, 76.8, 4240375, 'Norway', 1990],
        [10088, 70.8, 38195258, 'Poland', 1990],
        [19349, 69.6, 147568552, 'Russia', 1990],
        [10670, 67.3, 53994605, 'Turkey', 1990],
        [26424, 75.7, 57110117, 'United Kingdom', 1990],
        [37062, 75.4, 252847810, 'United States', 1990]
      ],
      [
        [44056, 81.8, 23968973, 'Australia', 2015],
        [43294, 81.7, 35939927, 'Canada', 2015],
        [13334, 76.9, 1376048943, 'China', 2015],
        [21291, 78.5, 11389562, 'Cuba', 2015],
        [38923, 80.8, 5503457, 'Finland', 2015],
        [37599, 81.9, 64395345, 'France', 2015],
        [44053, 81.1, 80688545, 'Germany', 2015],
        [42182, 82.8, 329425, 'Iceland', 2015],
        [5903, 66.8, 1311050527, 'India', 2015],
        [36162, 83.5, 126573481, 'Japan', 2015],
        [1390, 71.4, 25155317, 'North Korea', 2015],
        [34644, 80.7, 50293439, 'South Korea', 2015],
        [34186, 80.6, 4528526, 'New Zealand', 2015],
        [64304, 81.6, 5210967, 'Norway', 2015],
        [24787, 77.3, 38611794, 'Poland', 2015],
        [23038, 73.13, 143456918, 'Russia', 2015],
        [19360, 76.5, 78665830, 'Turkey', 2015],
        [38225, 81.4, 64715810, 'United Kingdom', 2015],
        [53354, 79.1, 321773631, 'United States', 2015]
      ]
    ]

    //radar
    const scores = [
      { name: '进攻', max: 20, value: 19 },
      { name: '防守', max: 20, value: 9 },
      { name: '速度', max: 20, value: 18 },
      { name: '力量', max: 20, value: 16 },
      { name: '耐力', max: 20, value: 16 },
      { name: '敏捷', max: 20, value: 20 }
    ]

    //connect
    const data1 = []
    const symbolCount = 6
    for (let i = 0; i < 16; i++) {
      data1.push([
        Math.random() * 5,
        Math.random() * 4,
        Math.random() * 12,
        Math.round(Math.random() * (symbolCount - 1))
      ])
    }


    return {
      bar: {
        legend: {},
        tooltip: {},
        dataset: {
          // Provide data.
          source: [
            ['Product', '2015', '2016', '2017'],
            ['Matcha Latte', ...randomize()],
            ['Milk Tea', ...randomize()],
            ['Cheese Cocoa', ...randomize()],
            ['Walnut Brownie', ...randomize()]
          ]
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: { type: 'category' },
        // Declare Y axis, which is a value axis.
        yAxis: {},
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      },
      pie: {
        title: {
          text: '饼图程序调用高亮示例',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      },
      scatter: {
        title: {
          text: '各国人均寿命与GDP对比'
        },
        legend: {
          right: 10,
          data: ['1990', '2015']
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          scale: true
        },
        series: [
          {
            name: '1990',
            data: scatterData[0],
            type: 'scatter',
            symbolSize (data) {
              return Math.sqrt(data[2]) / 5e2
            },
            label: {
              emphasis: {
                show: true,
                formatter ({ data }) {
                  return data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                  }
                ])
              }
            }
          },
          {
            name: '2015',
            data: scatterData[1],
            type: 'scatter',
            symbolSize (data) {
              return Math.sqrt(data[2]) / 5e2
            },
            label: {
              emphasis: {
                show: true,
                formatter ({ data }) {
                  return data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                  }
                ])
              }
            }
          }
        ]
      },
      radar:  {
        title: {
          text: '能力雷达图'
        },
        tooltip: {},
        radar: {
          indicator: scores.map(({ name, max }) => {
            return { name, max }
          })
        },
        series: [
          {
            name: '能力值',
            type: 'radar',
            data: [{ value: scores.map(({ value }) => value) }]
          }
        ]
      },
      c1: {
        legend: {
          top: 20,
          data: ['scatter']
        },
        tooltip: {
          formatter: '{c}'
        },
        grid: {
          top: '26%',
          bottom: '26%'
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            realtime: false,
            left: 'right',
            selectedMode: 'multiple',
            dimension: 2,
            selected: [],
            min: 0,
            max: 18,
            precision: 0,
            splitNumber: 0,
            calculable: true
          }
        ],
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            symbolSize: 30,
            data: data1
          }
        ]
      },
      c2: {
        legend: {
          top: 20,
          data: ['scatter']
        },
        tooltip: {
          formatter: '{c}'
        },
        grid: {
          top: '26%',
          bottom: '26%'
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            left: 'right',
            selectedMode: 'multiple',
            dimension: 2,
            selected: [],
            min: 0,
            max: 18,
            precision: 0,
            splitNumber: 0,
            calculable: true
          }
        ],
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            symbolSize: 30,
            data: data1
          }
        ]
      },
      flight: null
    }
  },
  created() {
    this.loadFlights()
    console.log(this.flight)
  },
  methods: {
    loadFlights () {
      import('@/assets/flight.json').then(({ default: data }) => {
        function getAirportCoord (idx) {
          return [data.airports[idx][3], data.airports[idx][4]]
        }
        const routes = data.routes.map(function (airline) {
          return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]
        })
        this.flight = {
          title: {
            text: 'World Flights',
            left: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          backgroundColor: '#003',
          tooltip: {
            formatter (param) {
              const route = data.routes[param.dataIndex]
              return (
                data.airports[route[1]][1] + ' > ' + data.airports[route[2]][1]
              )
            }
          },
          geo: {
            map: 'world',
            left: 0,
            right: 0,
            silent: true,
            itemStyle: {
              normal: {
                borderColor: '#003',
                color: '#005'
              }
            }
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
              data: routes,
              large: true,
              largeThreshold: 100,
              lineStyle: {
                normal: {
                  opacity: 0.05,
                  width: 0.5,
                  curveness: 0.3
                }
              },
              // 设置混合模式为叠加
              blendMode: 'lighter'
            }
          ]
        }
      })
    }
  }
}

</script>

<style scoped>

  figure {
    width: 100vw;
    margin: 1em auto;
    padding: 0 1em;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
  figure .echarts {
    width: 100%;
    min-width: 0;
    height: 75vw;
  }

</style>