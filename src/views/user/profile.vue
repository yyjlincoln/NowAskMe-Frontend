<template>
  <div>
    <nam-loading v-if="loading" status="Loading Profile...">

    </nam-loading>
    <nam-page v-if="!loading">
      <nam-text :subtitle="'User ' + this.uuid"></nam-text>
    </nam-page>
  </div>
</template>

<script>
import NamLoading from "../../components/nam-loading.vue";
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
export default {
  data: () => ({
    user: {},
    uuid: null,
    loading: true,
  }),
  mounted() {
    console.log(this.$route);
    this.uuid = this.$route.params.uuid;
    if (!this.uuid) {
      this.uuid = this.$nam.user.uuid;
    }
    // this.$nam.useractions.getUserProfile()
  },
  components: { namPage, NamText, NamLoading },
};
</script>

<style>
</style>