<!--
 カウンターの操作と表示
 カウントデータを共用データストアを利用するように変更
-->
<template>
  <div>
    <Counter name="Counter 1" :initCount="5" @emitUp="getEvent" />
    <Counter name="Counter 2" :initCount="10" @emitUp="getEvent" />
    <!-- 読み込んだプロジェクト共用データストアからのデータを表示と更新 -->
    <!-- データストア内のdata()は、$dataで参照できる --->
    <p>{{ primitiveStore.$data.globalCount }}</p>
    <input type="text" v-model="primitiveStore.$data.globalCount" />
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
import primitiveStore from "@/primitiveStore.js"; // 共用データストア

export default {
  components: {
    Counter,
  },
  data() {
    return {
      //      stack:[]
      primitiveStore,
    };
  },
  methods: {
    getEvent(payload) {
      //     this.stack.push(payload)
      this.primitiveStore.$data.globalCount++; // 共用データストアへの書き込み
    },
  },
};
</script>

<style>
