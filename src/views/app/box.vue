<template>
  <div>
    <nam-page :unbounded="true">
      <nam-text subtitle="Box" title="Here's your box"></nam-text>
    </nam-page>
  </div>
</template>

<script>
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
export default {
  components: { namPage, NamText },
};
</script>

<style>
</style>