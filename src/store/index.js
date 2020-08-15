import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import fetchData from '@/api.js'
const { v4: uuidv4 } = require('uuid');

require('es6-promise').polyfill()
require('isomorphic-fetch')

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    suggestions: [],
    currentPage: 1,
    pageSize: 10, 
    totalNumber: 0,
    totalPage: 0,  
    delay: 10,
    searchResults: {},
    historyData: {},
    top: {start: '2019-07-17', end: '2019-08-01'},
    cards: {},
    tablesId: [],
    position: {x : 0, y : 0, w : 2, h : 4, i : 0},
    layout: {},
    options: {}
  },
  getters: {
    cards(state) {
      return state.cards
    },
    tablesId(state) {
      return state.tablesId
    },
    layout(state) {
      return state.layout
    },
    suggestions(state) {
      return state.suggestions
    }, 
    currentPage(state) {
      return state.currentPage
    },
    pageSize(state) {
      return state.pageSize
    },
    totalPage(state) {
      return state.totalPage
    },
    totalNumber(state) {
      return state.totalNumber
    },
    delay(state) {
      return state.delay
    },
    searchResults(state) {
      return state.searchResults
    },
    historyData(state) {
      return state.historyData
    },
    options(state) {
      return state.options
    }
  },
  mutations: {
    getData(state, {res, start, end, id}) {
      if (res && res.status !== 500) {
        const data = res.data     
        if (data) {
          Vue.set(state.cards, id,  {
            ...state.cards[id],
            start: start,
            end: end,
            tableData: data.data,
            columnDim: data.columnDim
          })
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    getSuggestions(state, {res, search, page}) {
      if (res && res.data) {
        const data = res.data
        if (data) {
          state.suggestions = data.data
          state.totalNumber = data.total
          state.totalPage = data.totalPage
        }
      }
    },
    addPage(state) {
      state.currentPage++
    },
    // eslint-disable-next-line no-unused-vars
    getMoreSuggestions(state, {res, search, page}) {
      if (res && res.data) {
        const data = res.data
        if (data) {
          state.suggestions.push(...data.data)
        }
      }
    },
    clearSuggestions(state) {
      state.suggestions = []
      state.currentPage = 1
      state.totalPage = 0
      state.totalNumber = 0
    },
    searchStock(state, {res, search}) {
      if (res && res.data) {
        const data = res.data
        Vue.set(state.searchResults, search, data.data)
      }
    },
    addCard(state, name) {
      const id = uuidv4()
      let position = state.position
      try {
        Vue.set(state.cards, id, {
          id: id,
          name: name,
          start: '2019-07-01',
          end: '2019-07-30',
          tableData: [],
          columnDim: [],
        })
        state.tablesId.push(id)

        Vue.set(state.layout, id, {
          "x": (position.x++ % 3) * 2,
          "y": Math.floor(position.y++ / 3),
          "w": position.w,
          "h": position.h,
          "i": id,
        })
      } catch(err) {
        console.log(err)
      }
    },
    // eslint-disable-next-line no-unused-vars
    getHistoryData(state, {res, code, frequency, label}) {
      const upColor = '#00da3c'
      const downColor = '#ec0000'

      if (res && res.data) {
        const data = res.data
        state.historyData = data
        const categoryData = data.map(item => item.datetime)
        const values = data.map(item => [item.open, item.close, item.low, item.high])
        const volumes = data.map(item => item.volume)

        state.options = {
          animation: false,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
              color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
              var obj = {top: 10}
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
              return obj
            }
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: '日k'
          },
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            },
            label: {
              backgroundColor: '#777'
            }
          },
          toolbox: {
            feature: {
              dataZoom: {
                  yAxisIndex: false
              },
              brush: {
                type: ['lineX', 'clear']
              }
            }
          },
          brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
              colorAlpha: 0.1
            }
          },
          visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [
              {
                value: 1,
                color: downColor
              }, 
              {
                value: -1,
                color: upColor
              }
            ]
          },
          grid: [
            {
              left: '10%',
              right: '8%',
              height: '50%'
            },
            {
              left: '10%',
              right: '8%',
              top: '63%',
              height: '16%'
            }
          ],
          xAxis: [
            {
              type: 'category',
              data: categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: {
                onZero: false
              },
              splitLine: {
                show: false
              },
              splitNumber: 20,
              min: 'dataMin',
              max: 'dataMax',
              axisPointer: {
                z: 100
              }
            },
            {
              type: 'category',
              gridIndex: 1,
              data: categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: {
                onZero: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitNumber: 20,
              min: 'dataMin',
              max: 'dataMax'
            }
          ],
          yAxis: [
            {
              scale: true,
              splitArea: {
                show: true
              }
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0, 1],
              start: 98,
              end: 100
            },
            {
              show: true,
              xAxisIndex: [0, 1],
              type: 'slider',
              top: '85%',
              start: 98,
              end: 100
            }
          ],
          series: [
            {
              name: '上证指数',
              type: 'candlestick',
              data: values,
              itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: null,
                borderColor0: null
              },
              tooltip: {
                formatter: function (param) {
                  param = param[0];
                  return [
                    '日期: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    '开盘价: ' + param.data[0] + '<br/>',
                    '收盘价: ' + param.data[1] + '<br/>',
                    '最低价: ' + param.data[2] + '<br/>',
                    '最高价: ' + param.data[3] + '<br/>'
                  ].join('');
                }
              }
            },
            {
              name: '成交量',
              type: 'bar',
              itemStyle: {
                color: upColor,
                color0: downColor,
              },
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: volumes
            }
          ]
        }
      }
    },
    editCard(state, {id, data}) {
      try {
        Vue.set(state.cards, id, {
          ...state.cards[id],
          name: data,
        })
      } catch(err) {
        console.log('Error: ', err)
      }
    },
    deleteCard(state, id) {
      try {
        state.tablesId = state.tablesId.filter(item => item !== id)
        state.position = {
          ...state.position,
          x: (state.position.x-- % 2) * 2,
          y: Math.floor(state.position.y-- / 2)
        }
        
        Vue.set(state.layout, id, undefined)
        Vue.set(state.cards, id, undefined)
      } catch(err) {
        console.err(err)
      }
    },
    changeAllDate(state, [start, end]) {
      var cards = state.cards
      try {
        if (cards) {
          Object.values(cards).map(item => {
            if (item) {
              item.start = start
              item.end = end
            }
          })
        }
      } catch(err) {
        console.log(err)
      }    
    },
    deleteAllCards(state) {
      state.cards = {}
      state.tablesId = []
      state.layout = {}
    }
  },
  actions: {
    getData(context, {start, end, id}) {
      fetchData('http://localhost:8989/api/load?', {start, end})
      .then( res => {
        if (res.ok) {
          return res.json()
        } else {
          console.error('服务器繁忙，请稍后再试；\r\nCode:' + res.status)
        }
      })
      .then(res => {
        context.commit('getData', {res, start, end, id})
      })
      .catch(err => console.error(err))  
    },
    getSuggestions(context, {search, page, delay, pagesize}) {
      let id = 0
      ;(function() {
        let innerId = + Date.now()
        fetchData('http://localhost:8989/api/suggestions?', {search, page, delay, pagesize})
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              console.error('查询失败' + res.status)
            }
          }).then(res => {
            if (innerId > id) {
              id = innerId
              context.commit('getSuggestions', {res, search})
            }
          }).catch(err => console.log(err))
      })() 
    },
    getMoreSuggestions(context, {search, page, delay, pagesize}) {
      fetchData('http://localhost:8989/api/suggestions?', {search, page, delay, pagesize})
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.error('查询失败' + res.status)
        }
      }).then(res => {
        context.commit('getMoreSuggestions', {res, search})
      }).catch(err => console.log(err))
    },
    addPage(context) {
      context.commit('addPage')
    },
    clearSuggestions(context) {
      context.commit('clearSuggestions')
    },
    searchStock(context, search) {
      fetchData('http://localhost:8989/api/realtime', search)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            console.error('查询失败' + res.status)
          }
        }).then(res => {
          context.commit('searchStock', {res, search})
        }).catch(err => console.log(err))
    },

    addCard(context, name) {
      context.commit('addCard', name)
    },
    getHistoryData(context, {code, frequency, label}) {
      fetchData('http://localhost:8989/api/candlestick?', {code, frequency})
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            console.error('查询失败' + res.status)
          }
        }).then(res => {
          context.commit('getHistoryData', {res, code, frequency, label})
        }).catch(err => console.log(err))
      
    },
    editCard(context, id, data) {
      context.commit('editCard', id, data)
    },
    deleteCard(context, id) {
      context.commit('deleteCard', id)
    },
    changeAllDate(context, date) {
      context.commit('changeAllDate', date)
    },
    deleteAllCards(context) {
      context.commit('deleteAllCards')
    }
  }
})

export default store