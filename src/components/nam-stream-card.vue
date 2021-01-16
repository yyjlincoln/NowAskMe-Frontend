<template>
  <div>
    <div
      class="flex flex-col rounded-md my-5 px-5 py-5 bg-gray-100"
      :class="maxw ? 'max-w-3xl' : ''"
    >
      <nam-user
        :spacing="false"
        :show_userid="false"
        background_class=""
        :user="user"
        :show_actions="false"
      >
        <div class="flex flex-row">
          <p>{{ post.type == "question" ? "Asked a new question" : "" }}</p>
          <p>{{ post.type == "story" ? "Shared a story" : " " }}</p>
          <div class="ml-1">
            <p>
              {{ post.privacy == "followers" ? "with his/her followers" : "" }}
            </p>
            <p>
              {{
                post.privacy == "following"
                  ? "with people who he/she follow"
                  : ""
              }}
            </p>
            <p>{{ post.privacy == "private" ? "with him/herself" : "" }}</p>
          </div>
          <a
            class="ml-5"
            href="#"
            @click.prevent="deletePost"
            v-if="post.uuid == $nam.user.uuid"
            >Delete</a
          >
        </div>

        <template #aside_name>
          <a
            class="text-gray-500"
            @click.prevent="fulltime = !fulltime"
            href="#"
            v-if="updateTime || !updateTime"
          >
            {{ $nam.utils.timeFrom(post.time * 1000, fulltime) }}
          </a>
        </template>
      </nam-user>
      <div class="my-1 flex flex-col text-xl">
        <component
          :is="'nam-stream-card-' + post.type"
          :post="post"
        ></component>
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
import NamStreamCardStory from "./nam-stream-card-story.vue";
import NamStreamCardQuestion from "./nam-stream-card-question.vue";
export default {
  components: { NamUser, NamStreamCardStory, NamStreamCardQuestion },
  data: () => ({
    user: {
      required: true,
      default: null,
    },
    fulltime: false,
    updateTime: true,
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
    afterUpdate: {
      required: false,
    },
    maxw: {
      default: true,
    },
  },
  methods: {
    deletePost() {
      this.$nam.post.deletePost(this.post.postid).then(() => {
        if (this.afterUpdate) {
          this.afterUpdate();
        }
      });
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
    setInterval(() => {
      this.updateTime = !this.updateTime;
    }, 30000);
  },
};
</script>

<style>
</style>