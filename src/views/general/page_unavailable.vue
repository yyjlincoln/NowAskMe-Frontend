<template>
  <div>
    <nam-page :centered="true">
      <nam-text
        :subtitle="'GET ' + $route.path + ' 404'"
        title="Page not found."
      ></nam-text>
      <span class="text-3xl text-gray-600 font-extrabold mt-5"
        >You can try to
        <a class="underline" href="/" @click.prevent="$router.go(-1)"
          >go back</a
        > or go <a class="underline" href="/" @click.prevent="$router.push('/')">home</a></span
      >
      <span class="text-xl text-gray-300 font-extrabold mt-5"
        >If you believe you've ran into some problems, please go to 
        <a class="underline" href="/" @click.prevent="$router.push('/diagnostics')"
          >diagnostics</a
        ></span
      >
    </nam-page>
  </div>
</template>


<script>
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
export default {
  components: { namPage, NamText },
  data: () => ({}),
  methods: {},
};
</script>