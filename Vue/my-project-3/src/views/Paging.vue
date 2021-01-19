<template>
  <div class="about">
    <h1>Page: {{ $route.params.page }}</h1>
    <router-link :to="`/paging/${prevPage}`">Prev</router-link> |
    <router-link :to="`/paging/${nextPage}`">Next</router-link>
  </div>
</template>

<script>
export default {
  computed: { // 算出プロパティ。getterメソッドとして定義できる
    prevPage() {
      return Number(this.$route.params.page) - 1;
    },
    nextPage() {
      return Number(this.$route.params.page) + 1;
    },
  },
};
</script>

