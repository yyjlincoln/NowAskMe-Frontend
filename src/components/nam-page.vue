<template>
  <div>
    <!-- Deleted justify-center -->
    <div
      class="h-hit overflow-scroll min-w-screen flex min-h-screen flex-col py-10 pt-15"
      :class="String(unbounded ? '' : 'max-w-6xl') + ' ' + String(centered?'justify-center':'')"
    >
      <div
        class="mt-10 mx-5 px-5 md:mx-10 md:px-10 lg:mx-20 lg:px-20 flex flex-col"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    unbounded: {
      default: false,
    },
    centered:{
      default: false
    }
  },
};
</script>

<style>
</style>