<template>
  <div>
    <p class="whitespace-pre-wrap">{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
    },
  },
};
</script>

<style>
</style>