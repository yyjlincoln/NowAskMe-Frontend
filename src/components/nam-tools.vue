<template>
  <div>
    <div
      class="mt-5 md:mt-10 lg:mt-20 px-5 py-5 rounded-md w-fit flex flex-col bg-gray-100"
    >
      <span
        class="text-lg md:text-xl font-bold text-gray-500 mb-3 text-center md:text-left"
        >Didn't work? Try those:</span
      >
      <div
        class="flex flex-col flex-nowrap sm:flex-row justify-center md:justify-start"
      >
      <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>