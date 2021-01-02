<template>
  <div>
    <div
      class="px-5 py-5 rounded-md w-fit flex flex-col mx-5 my-5 overflow-hidden"
      :class="
        background_class + ' ' + config_class + ' ' + shadow "
    >
      <span
        class="text-lg md:text-xl font-bold text-gray-500 mb-3 text-center md:text-left"
        >{{ title }}</span
      >
      <div class="flex flex-col flex-nowrap justify-center md:justify-start">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "This is an area:",
    },
    background_class: {
      default: "bg-gray-100",
    },
    config_class: {
      default: "max-w-xs max-h-md",
    },
    shadow: {
      default: '',
    },
  },
  components: {},
};
</script>

<style>
</style>