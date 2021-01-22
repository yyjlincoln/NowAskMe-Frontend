<template>
  <div>
    <div class="flex flex-col">
      <span class="font-extrabold" :class="subtitle_config">{{
        subtitle
      }}</span>
      <span class="font-extrabold text-gradient pb-2" :class="title_config">{{
        title
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    title: {
      default: "",
    },
    subtitle: {
      default: "",
    },
    subtitle_config: {
      default: "text-3xl md:text-4xl",
    },
    title_config: {
      default: "text-4xl md:text-5xl lg:text-6xl ",
    },
  },
};
</script>

<style>
</style>