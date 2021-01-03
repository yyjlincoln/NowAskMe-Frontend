<template>
  <div>
    <nam-text title="Open-source Software Licenses"></nam-text>
    <div class="mt-10">
      <nam-loading
        :as_full_page="false"
        :show_logo="false"
        v-if="!loaded"
        status="Loading"
      ></nam-loading>
      <textarea v-if="loaded" v-model="license" disabled class="w-full h-screen"></textarea>
      <p class="mt-1 text-center">Scroll to view the whole text.</p>
    </div>
    <nam-tools title="Download a copy">
      <span
        >A copy of those licenses is available from
        <a :href="licenseURL" class="underline">here.</a> ({{
          this.licenseURL
        }})</span
      >
    </nam-tools>

    <span></span>
  </div>
</template>

<script>
import NamLoading from "../../components/nam-loading.vue";
import NamText from "../../components/nam-text.vue";
import NamTools from "../../components/nam-tools.vue";
import axios from "axios";
export default {
  components: { NamText, NamTools, NamLoading },
  data: () => ({
    loaded: false,
    license: "Loading...",
    licenseURL: "https://static.nowask.me/license.txt",
  }),
  mounted() {
    axios.get(this.licenseURL).then((res) => {
      if (res.data) {
        this.license = res.data;
        this.loaded = true;
      }
    });
  },
};
</script>

<style>
</style>