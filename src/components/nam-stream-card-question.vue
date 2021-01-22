<template>
  <div>
    <div class="w-full h-fit py-10 flex flex-col bg-white rounded-md my-2 px-10">
      <div class="mx-auto flex flex-row">
        <div class="bg-indigo-400 rounded-md text-white">
          <p class="text-center font-extrabold text-2xl px-2">?</p>
        </div>
      </div>
      <div class="mx-auto mt-2 h-full flex flex-row justify-center">
        <span class="text-gray-500">"</span>
        <p class="whitespace-pre-wrap font-bold text-center">{{ post.content }}</p>
        <span class="text-gray-500">"</span>
      </div>
      <nam-question-responseinput class="mt-5"></nam-question-responseinput>
    </div>
  </div>
</template>

<script>
import namQuestionResponseinput from "./nam-question-responseinput.vue";
export default {
  components: { namQuestionResponseinput },
  props: {
    post: {
      required: true,
    },
  },
};
</script>

<style>
</style>