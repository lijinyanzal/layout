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
    top: {start: '2019-07-17', end: '2019-08-01'},
    cards: {},
    tablesId: [],
    position: {x : 0, y : 0, w : 2, h : 2, i : 0},
    layout: {}
  },
  getters: {
    cards(state) {
      return state.cards
    },
    tablesId(state) {
      return state.tablesId
    },
    top(state){
      return state.top
    },
    layout(state) {
      return state.layout
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
          "x": (position.x++ % 2) * 2,
          "y": Math.floor(position.y++ / 2),
          "w": position.w,
          "h": position.h,
          "i": id,
        })
      } catch(err) {
        console.log(err)
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
    async getData(context, {start, end, id}) {
      await fetchData('http://localhost:8989/api/load?', {start, end})
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
    addCard(context, name) {
      context.commit('addCard', name)
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