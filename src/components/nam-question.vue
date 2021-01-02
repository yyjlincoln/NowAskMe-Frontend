<template>
  <div>
      <nam-area :title="question.question">
          <!-- TODO -->
      </nam-area>
  </div>
</template>

<script>
import namArea from './nam-area.vue'
export default {
  components: { namArea },
  props:{
      question: {
          required: true
      }
  }

}
</script>

<style>

</style>