<template>
  <div>
    <nam-page>
      <nam-text
        subtitle="Login"
        title="Please scan the QR code to complete the authentication."
      ></nam-text>
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