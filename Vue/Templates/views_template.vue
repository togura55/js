<!--
  src\views\ 下に配置すること

-->
<template>
  <div class="foo">
    <h1>This is a sckelton page</h1>
    <p>{{ profile }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // mountedライフサイクルを使って呼び出される
  mounted() {

  },

  computed: {
    ...mapState(["profile"]),
  },
};
</script>