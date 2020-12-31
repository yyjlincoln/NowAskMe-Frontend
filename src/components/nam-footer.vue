<template>
  <div>
    <div class="mt-5 absolute w-screen left-0 h-fit py-10 px-20 bg-gray-100">
      <span class="font-bold block text-gray-500 text-2xl">Nowask.me</span>
      <span class="font-bold block text-gray-400 text-xl"
        >This is a HSC Major Work project.</span
      >
      <span class="font-bold block text-gray-400 text-xl"
        >For a list of sources used (including open-sourced projects), please
        refer to the theory document or
        <router-link to="/legal" class="underline">here</router-link>.</span
      >
      <span class="font-bold block text-gray-400 text-xl mt-5"
        >©️Yijun "Lincoln" Yan 2020 - 2021. All rights reserved.</span
      >
      <a
        class="text-gray-400 underline font-bold text-xl"
        href="/legal"
        @click.prevent="$router.push('legal')"
        >Legal Statements</a
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>