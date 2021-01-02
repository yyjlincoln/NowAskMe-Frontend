<template>
  <div>
    <transition name="fade">
      <nam-page
        :centered="true"
        :unbounded="true"
        :global_centered="true"
        v-if="!loaded"
      >
        <div class="animate-pulse">
          <div class="flex flex-col">
            <nam-text title="Nowask.me" class=""></nam-text>
            <span
              class="text-gradient mt-3 text-4xl font-extrabold text-center animate-bounce"
              >......</span
            >
          </div>
        </div>
        <div class="flex flex-row mt-5 justify-center">
          <div class="flex flex-col">
            <span class="text-2xl text-gray-600 font-bold"
              >{{status}}</span
            >
            <slot></slot>
          </div>
        </div>
      </nam-page>
    </transition>
  </div>
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
  props:{
    status: {
      default: ''
    }
  }
};
</script>

<style>
</style>