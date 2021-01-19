//
// Vuexテンプレート
//
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // グローバルな状態を保持するプロパティ
  state: {
    globalCount: 0
  },

  // stateプロパティへの書き込みは
  // mutationsの中でしか行わない
  mutations: {
    // mutationsで定義されたメソッドは
    // 第一引数に必ずstateを持つこと
    globalIncrement(state){
      state.globalCount++ // stateへの書き込み
    }
  },


  actions: {
  },
  modules: {
  }
})
