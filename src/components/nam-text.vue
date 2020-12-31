<template>
  <div>
    <div class="flex flex-col">
      <span class="text-3xl md:text-4xl font-extrabold">{{ subtitle }}</span>
      <span
        class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient pb-1"
        >{{ title }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "",
    subtitle: "",
  }),
  props: ["title", "subtitle"],
};
</script>

<style>
</style>