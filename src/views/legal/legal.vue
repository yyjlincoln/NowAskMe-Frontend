<template>
  <div>
    <nam-page>
      <!-- <a
          class="text-2xl font-extrabold font-gray-700"
          @click.prevent="$router.go(-1)"
          href="/"
          >⬅️ Back</a
        > -->
      <span class="text-3xl md:text-4xl text-gray-700 font-extrabold py-1"
        >Legal</span
      >
      <router-view></router-view>
      <nam-footer></nam-footer>
    </nam-page>
  </div>
</template>

<script>
import NamFooter from "../../components/nam-footer.vue";
import namPage from "../../components/nam-page.vue";
export default {
  components: { namPage, NamFooter },
};
</script>

<style>
</style>