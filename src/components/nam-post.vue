<template>
  <div>
    <!-- <div
      style="background: rgba(0, 0, 0, 0.5)"
      class="z-40 h-screen w-screen top-0 left-0 fixed flex"
    ></div> -->

    <div
      class="bg-gray-100 px-5 py-5 mt-10 max-w-3xl w-fit h-fit rounded-md relative flex flex-col min-w-3xl min-h-2xl"
    >
      <div class="flex">
        <nam-user
          :show_actions="false"
          :user="$nam.user"
          :spacing="false"
          background_class=""
          :show_userid="false"
          :constrains="false"
        >
          <template #aside_name>
            <span class="text-gray-500">Now</span>
          </template>
          <a href="#" @click.prevent="changeSharePermissions = true">
            {{
              permission == null
                ? "Shared according to your default sharing settings. (Click to change)"
                : ""
            }}
            {{
              permission == "public"
                ? "Shared to: Everyone on the internet"
                : ""
            }}
            {{
              permission == "followers" ? "Shared to: People who follow me" : ""
            }}
            {{ permission == "following" ? "Shared to: People I follow" : "" }}
            {{ permission == "private" ? "🤚Private" : "" }}
          </a>
          <vs-tooltip shadow not-hover bottom v-model="changeSharePermissions">
            <template #tooltip :border="false">
              <div class="w-full flex flex-col">
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="
                    permission = null;
                    changeSharePermissions = false;
                  "
                  href="#"
                >
                  My default settings
                </a>
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="
                    permission = 'public';
                    changeSharePermissions = false;
                  "
                  href="#"
                >
                  Public
                </a>
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="
                    permission = 'followers';
                    changeSharePermissions = false;
                  "
                  href="#"
                >
                  My followers
                </a>
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="
                    permission = 'following';
                    changeSharePermissions = false;
                  "
                  href="#"
                >
                  People I follow
                </a>
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="
                    permission = 'private';
                    changeSharePermissions = false;
                  "
                  href="#"
                >
                  Private
                </a>
              </div>
            </template>
          </vs-tooltip>
        </nam-user>
      </div>
      <div class="mt-2">
        <textarea
          class="relative rounded-md bg-transparent text-left text-xl ontline-none w-full font-bold h-24"
          style="outline: none"
          placeholder="Share your story, ask a question..."
          v-model="tale"
          :disabled="posting"
        ></textarea>
      </div>
      <div class="flex w-full">
        <a
          class="ml-auto px-3 py-2 text-lg text-white rounded-md font-bold"
          href="#"
          @click.prevent="postStory"
          :disabled="posting"
          :class="posting ? 'bg-gray-300' : 'bg-indigo-500'"
        >
          <i class="bx bxs-send mx-auto"></i>
          Send
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import NamUser from "./nam-user.vue";
export default {
  components: { NamUser },
  data: () => ({
    tale: "",
    posting: false,
    changeSharePermissions: false,
    permission: null,
  }),
  props: {
    afterPost: {
      required: false,
    },
  },
  methods: {
    postStory() {
      if (this.tale == "") {
        return;
      }
      this.$nam.post.postStory(this.tale, this.permission).then(() => {
        this.tale = "";
        this.permission = null;
        if (this.afterPost) {
          this.afterPost();
        }
      });
    },
  },
};
</script>

<style>
</style>