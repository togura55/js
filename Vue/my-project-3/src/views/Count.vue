<!--
 カウンターの操作と表示
 カウントデータを共用データストアを利用するように変更
-->
<template>
  <div>
    <Counter name="Counter 1" :initCount="5" @emitUp="getEvent" />
    <Counter name="Counter 2" :initCount="10" @emitUp="getEvent" />

    <!-- 読み込んだプロジェクト共用データストアからのデータを表示と更新 -->
    <!-- データストア内のdata()は、$dataで参照できる -->
    <!-- <p>{{ primitiveStore.$data.globalCount }}</p> -->
    <!-- <input type="text" v-model="primitiveStore.$data.globalCount" /> -->

    <p>{{ count }}</p>
    <!-- グローバルデータストア参照 -->
    <p>{{ globalCount }}</p>
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
// import primitiveStore from "@/primitiveStore.js"; // 共用データストア

// 便利なmapStateを使うなら、importが必要
import { mapState } from "vuex";

export default {
  components: {
    Counter,
  },

  // data() {
  //   return {
  //     //      stack:[]
  //     primitiveStore,
  //   };
  // },

  methods: {
    getEvent() {
      //     this.stack.push(payload)
      // this.primitiveStore.$data.globalCount++; // 共用データストアへの書き込み

      // storeへのデータ書き込みはmutations経由で
      this.$store.commit("globalIncrement"); // 引数メソッドを実行
    },

    // やらない
    shouldNotThis() {
      this.$store.state.globalCount++;
    },
  },

  // computed内はVueインスタンスから参照可能
  // $store.stateの中身をcomputedプロパティで取り出す
  computed: {
    // 1. storeからstateを参照する方法
    count() {
      return this.$store.state.globalCount;
    },

    // 2. mapStateを使うと、まとめてアサイン可能
    ...mapState(["globalCount"]), // 複数のストア値がある場合は連記できる
  }
};
</script>

<style>
