<template>
  <transition name="fade">
    <nam-page
      :centered="true"
      :unbounded="true"
      :global_centered="true"
      v-if="!loaded && as_full_page"
    >
      <div class="animate-pulse">
        <div class="flex flex-col">
          <nam-text
            title="Nowask.me"
            title_config="text-4xl md:text-5xl lg:text-6xl text-center"
            v-if="show_logo"
          ></nam-text>
          <span
            class="text-gradient mt-3 text-4xl font-extrabold text-center animate-bounce"
            >......</span
          >
        </div>
      </div>
      <div class="flex flex-row mt-5 justify-center">
        <div class="flex flex-col">
          <span class="text-2xl text-gray-600 font-bold">{{ status }}</span>
          <slot></slot>
        </div>
      </div>
    </nam-page>
    <div v-if="!loaded && !as_full_page">
      <div class="animate-pulse">
        <div class="flex flex-col">
          <nam-text
            title="Nowask.me"
            title_config="text-4xl md:text-5xl lg:text-6xl text-center"
            v-if="show_logo"
          ></nam-text>
          <span
            class="text-gradient mt-3 text-4xl font-extrabold text-center animate-bounce"
            >......</span
          >
        </div>
      </div>
      <div class="flex flex-row mt-5 justify-center">
        <div class="flex flex-col">
          <span class="text-2xl text-gray-600 font-bold">{{ status }}</span>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import namPage from "./nam-page.vue";
import NamText from "./nam-text.vue";
export default {
  data: () => ({
    loaded: false,
  }),
  components: { namPage, NamText },
  beforeDestroy() {
    this.loaded = true;
  },
  props: {
    status: {
      default: "",
    },
    as_full_page: {
      default: true,
    },
    show_logo:{
      default: true
    }
  },
};
</script>

<style>
</style>