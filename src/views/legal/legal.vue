<template>
  <div>
    <nam-page>
      <a
        class="text-2xl font-extrabold font-gray-700"
        @click.prevent="$router.go(-1)"
        href="/"
        >⬅️ Back</a
      >
      <span class="text-3xl md:text-4xl text-gray-700 font-extrabold py-1"
        >Legal</span
      >
      <router-view v-if="$route.path != '/legal'"></router-view>
      <div v-if="$route.path == '/legal'" class="">
        <nam-text title="Legal Statements"></nam-text>
        <div class="flex flex-col my-10">
          <p class="text-2xl font-extrabold">
            Prior to using our service, you must agree to the following legal
            statements:
          </p>
          <router-link
            to="/legal/tos"
            class="text-3xl font-extrabold mt-5 text-gradient underline"
            >Terms of Service</router-link
          >
          <router-link
            to="/legal/tos"
            class="text-3xl font-extrabold mt-5 text-gradient underline"
            >Privacy Policy</router-link
          >
        </div>
      </div>
    </nam-page>
    <nam-footer></nam-footer>
  </div>
</template>

<script>
import NamFooter from "../../components/nam-footer.vue";
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
export default {
  components: { namPage, NamFooter, NamText },
};
</script>

<style>
</style>