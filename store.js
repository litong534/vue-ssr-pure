/**
 * 获取的数据需要位于视图组件之外，即放置在专门的数据预取存储容器(data store)或"状态容器(state container)）"中。
 * 首先，在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)
 * 和内联预置(inline)状态
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Promise from 'promise'
Vue.use(Vuex)

import {
  getRecommends,
  getRecommend,
  getRecommendByTypes,
  getRecommendTypesCount,
  getRecommendsCount
} from './src/api/recommend/recommend'

export const createStore = () => {
  return new Vuex.Store({
    state: {
      recommends: [],
      recommend: [],
      count: 0,
      typesCount: 0,
      typeRecommend: [],
      category: []
    },
    actions: {
      getHomepageData(store, page) {
        return Promise.all([
          store.dispatch('getRecommends', page),
          store.dispatch('getRecommendTypesCount'),
          store.dispatch('getRecommendsCount')
        ])
      },
      getRecommends({ commit }, page) {
        return getRecommends(page).then(payload => {
          commit('setRecommends', payload.data)
        })
      },
      getRecommend({ commit }, id) {
        return getRecommend(id).then(payload => {
          commit('setRecommend', payload.data)
        })
      },
      getRecommendByTypes({ commit }, type, page) {
        return getRecommendByTypes(type, page).then(payload => {
          commit('setRecommends', payload.data)
        })
      },
      getRecommendTypesCount({ commit }) {
        return getRecommendTypesCount().then(payload => {
          commit('setCategory', payload.data)
        })
      },
      getRecommendsCount({ commit }) {
        return getRecommendsCount().then(payload => {
          commit('setRecommendsCount', payload.data)
        })
      }
    },
    mutations: {
      setRecommends(state, payload) {
        state.recommends = payload
      },
      appendRecommends(state, payload) {
        state.recommends.push(...payload)
      },
      resetRecommends(state) {
        state.recommends = []
      },
      setRecommend(state, payload) {
        state.recommend = payload
      },
      setCategory(state, payload) {
        state.category = payload
      },
      setRecommendsCount(state, payload) {
        state.count = payload
      },
    }
  })
}