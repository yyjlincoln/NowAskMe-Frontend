<template>
  <div>
      <nam-page :unbounded="true">
          <nam-text subtitle="Post" title="Ask a new question">
              <!-- TODO: Invitation code, Friend list, option to choose if that is anomonyous -->
          </nam-text>
      </nam-page>
  </div>
</template>

<script>
import namPage from '../../components/nam-page.vue'
import NamText from '../../components/nam-text.vue'
export default {
  components: { namPage, NamText },

}
</script>

<style>

</style>