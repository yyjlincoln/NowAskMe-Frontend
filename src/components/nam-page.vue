<template>
  <div>
    <div
      class="h-hit mt-5 overflow-scroll min-h-screen w-screen flex flex-col justify-center max-w-6xl py-10"
    >
      <div class="mx-5 px-5 md:mx-10 md:px-10 lg:mx-20 lg:px-20 flex flex-col">
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