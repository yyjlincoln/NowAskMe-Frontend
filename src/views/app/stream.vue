<template>
  <div>
    <nam-page :unbounded="true">
      <div class="flex flex-row">
        <nam-text subtitle="Stream" title="What's happening?">
          <!-- TODO: Invitation code, Friend list, option to choose if that is anomonyous -->
        </nam-text>
        <div class="flex flex-col justify-end ml-20">
          <a
            class="rounded-md bg-gradient px-3 py-3 my-3 mx-3 text-2xl text-white font-bold"
            href="#"
            @click.prevent="post"
          >
            <i class="bx bxs-send mx-auto"></i>
            Post
          </a>
        </div>
      </div>
      <!-- Main Content -->
      <div class="mt-10 min-w-full min-h-full w-fit h-fit overflow-hidden">
        <nam-stream-card></nam-stream-card>
        <nam-stream-card></nam-stream-card>
        <nam-stream-card></nam-stream-card>
        <nam-stream-card></nam-stream-card>
        <nam-stream-card></nam-stream-card>
        <nam-stream-card></nam-stream-card>

      </div>
    </nam-page>
  </div>
</template>

<script>
import namPage from "../../components/nam-page.vue";
import NamStreamCard from '../../components/nam-stream-card.vue';
import NamText from "../../components/nam-text.vue";
export default {
  components: { namPage, NamText, NamStreamCard },
  methods: {
    post() {
      // Post something
    },
  },
};
</script>

<style>
</style>