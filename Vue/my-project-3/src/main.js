// index.html -> main.js -> App.vue -> 子コンポーネント.vue の順に入れ子

import Vue from 'vue'
import App from './App.vue'
import router from './router' // SPA対応
import store from './store'  // Vuexで追加

Vue.config.productionTip = false

// Vueインスタンス作成
//
// el: '#app'ではなく .$mount ('#app')を使用すると、Vueインスタンスを明示的にマウントする。 
// これは、特定の要素がページに存在するか、非同期プロセスが完了するまで、Vueインスタンスの
// マウントを遅らせることができる。
// これは、要素をDOMに挿入するレガシーアプリにVueを追加するときに特に役立ちます。 
// これは、複数のテストで同じvueインスタンスを使用したい場合のテストで頻繁に発生する。
new Vue({
  router, // SPA対応

  store,  // Vuexで追加

  // templateレンダリングの代替...黙って記述
  render: h => h(App)
}).$mount('#app')
