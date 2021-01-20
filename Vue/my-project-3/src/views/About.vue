<!--

-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ profile }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // mountedライフサイクルを使って呼び出される
  mounted() {
    this.$store.dispatch("fetchGithubProfile", 
    { user_id: "togura55" })
  },

  computed: {
    ...mapState(["profile"]),
  },
};
</script>