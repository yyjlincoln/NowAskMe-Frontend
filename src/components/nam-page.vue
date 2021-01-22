<template>
  <div>
    <!-- Deleted justify-center -->
    <div
      v-if="global_centered"
      class="min-h-screen flex flex-col justify-center w-fit h-fit px-10 py-10 mx-auto overflow-hidden"
      :class="absolute ? 'absolute' : 'relative'"
    >
      <div class="flex flex-col h-full w-full">
        <div class="mx-auto">
          <slot></slot>
        </div>
      </div>
    </div>
    <div
      class="h-fit overflow-hidden w-fit flex min-h-screen flex-col py-10 pt-15"
      :class="
        String(unbounded ? '' : 'max-w-6xl') +
        ' ' +
        String(centered ? 'justify-center' : '')
      "
      v-if="!global_centered"
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
    centered: {
      default: false,
    },
    global_centered: {
      default: false,
    },
    absolute: {
      default: false,
    },
  },
};
</script>

<style>
</style>