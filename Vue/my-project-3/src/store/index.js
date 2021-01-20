//
// Vuexテンプレート
//
//import { Store } from 'node_modules/vuex/types/index'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // Vuexのstateは....
  // グローバルな状態を保持するプロパティ
  state: {
    globalCount: 0,
    profile: null,
  },

  // Vuexのmutationsはストアへのコミット目的で使用
  // stateプロパティへの書き込みは
  // ミューテーションの中でしか行わない
  mutations: {
    // mutationsで定義されたハンドラーメソッド
    // 第一引数に必ずstateを持つこと
    globalIncrement(state){
      state.globalCount++ // stateへの書き込み
    },

    setGithubProfile(state, payload){
      state.profile = payload;
    },
  },

  // Vuexのactionsはディスパッチ目的で使用
   // 任意の非同期処理を含むことができる
  actions: {
    // state.profileに値があれば早期にリターン。
    // 無ければAPIコールし、得られた値をミューテーションでコミットさせる
    async fetchGithubProfile(store, payload){
      if (store.state.profile != null) return;

      const response = await fetch(
        `https://api.github.com/users/${payload.user_id}`
      ).then((res) => {
        return res.json();
      });
      store.commit("setGithubProfile", response);
    },
  },
  
  // Vuexのmodulesは....
  modules: {
  }
});
