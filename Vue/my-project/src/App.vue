<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--
    // カウンターの表示
    // 別インスタンスなので別々の初期値が持てる
    // 1) 以下、省略記法の説明（：はv-bindのシンタックスシュガー）
    // :initCount=""と表記すると""内はJavaScript書式指定（Number型）
    // initCount=""だとString型になる
    // 2) 子コンポーネントからのイベントの受け取り
    // @emitUp="" でemitUp名のカスタムイベントが上がったら""メソッドを実行する
    -->
    <Counter name="Counter 1" :initCount="5" @emitUp="getEvent"/>
    <Counter name="Counter 2" :initCount="10" @emitUp="getEvent"/>

     <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// 呼び出したい子コンポーネントファイルのimport。パスを通す
// キー名と変数名が同じ場合は省略する構文が使える（非省略 Counter: Counter)
import HelloWorld from './components/HelloWorld.vue'
import Counter from './components/Counter.vue'

//
export default {
  //
  name: 'App',
  // 子コンポーネントをマウント
  components: {
    HelloWorld,
    Counter
  },
  //
  data(){
    return{
      stack: []
    }
  },
  //
  methods: {
    getEvent(payload){
      this.stack.push(payload)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
