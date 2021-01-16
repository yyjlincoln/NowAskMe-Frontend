<template>
  <div>
    <div
      class="flex flex-col rounded-md my-5 px-5 py-5 bg-gray-100 max-w-3xl"
    >
      <nam-user
        :spacing="false"
        :show_userid="false"
        background_class=""
        :user="user"
        :show_actions="false"
      >
        <p>{{ post.type == "question" ? "Asked a new question" : "" }}</p>

        <template #aside_name>
          <a
            class="text-gray-500"
            @click.prevent="fulltime = !fulltime"
            href="#"
          >
            {{ $nam.utils.timeFrom(post.time * 1000, fulltime) }}
          </a>
        </template>
      </nam-user>
      <div class="my-1 flex flex-col text-xl">
        <p class="whitespace-pre-wrap">{{ post.content }}</p>
      </div>
      <div class="flex flex-row">
        <span class="mr-2">Like</span>
        <span class="mx-2">Comment</span>
      </div>
    </div>
  </div>
</template>

<script>
import NamUser from "./nam-user.vue";

export default {
  components: { NamUser },
  data: () => ({
    user: {
      required: true,
      default: null,
    },
    fulltime: false,
  }),
  props: {
    post: {
      required: true,
      default: {},
      _hint: {
        uuid: null,
        postid: null,
        type: "question",
        content: "",
        time: 0,
      },
    },
  },
  mounted() {
    this.$nam.useractions
      .getUserProfile(this.post.uuid)
      .then((user) => {
        this.user = user;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style>
</style>