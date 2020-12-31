<template>
  <div>
    <div
      class="h-hit mt-5 overflow-scroll w-screen flex flex-col justify-center py-10" :class="unbounded?'':'max-w-6xl'"
    >
      <div class="mx-5 px-5 md:mx-10 md:px-10 lg:mx-20 lg:px-20 flex flex-col">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data:()=>({
        unbounded: false
    }),
    props:['unbounded'],
};
</script>

<style>
</style>