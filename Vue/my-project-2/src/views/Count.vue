<template>
  <div>
    <Counter name="Counter 1"
    :initCount="5" @emitUp="getEvent" />
    <Counter name="Counter 2"
    :initCount="10" @emitUp="getEvent" />
    {{stack}}
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue'

export default {
  components: {
    Counter
  },
  data(){
    return {
      stack:[]
    }
  },
  methods:{
    getEvent(payload){
      this.stack.push(payload)
    }
  }
}
</script>

<style>
