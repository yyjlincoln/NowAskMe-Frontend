<template>
  <div>
    <nam-loading v-if="loading" :status="loadingStatus"> </nam-loading>
    <nam-page v-if="!loading" :unbounded="true">
      <div class="flex flex-row">
        <div>
          <nam-text subtitle="User Profile" :title="this.user.name"></nam-text>
          <span class="text-gray-500">#{{ user.userid }}</span>
        </div>
        <div class="flex flex-col min-h-full ml-10">
          <!-- Horizontal align with title -->
        </div>
      </div>
      <div class="flex flex-row">
        <nam-useractions
          class="mt-3"
          :user="user"
          show="inline-text"
        ></nam-useractions>
      </div>

      <nam-area title="Description" config_class="">
        <span class="text-gray-800">{{
          user.description
            ? user.description
            : "This user did not write any description."
        }}</span>
      </nam-area>
      <div>
        <!-- Q&A Section -->
        <nam-loading
          v-if="$config.getConfig('ui.profile.showQA', false)"
          class="mt-10"
          :as_full_page="false"
          :show_logo="false"
          status="Q&A [TODO]"
        ></nam-loading>
        <!-- TODO -->

        <!-- Stream -->
        <span class="font-extrabold text-4xl">Activities</span>
        <nam-loading
          status="Loading stream..."
          v-if="loadingStream"
          :as_full_page="false"
          :show_logo="false"
        ></nam-loading>
        <div class="w-full mt-5">
          <div v-for="post in posts" :key="post.postid">
            <div class="w-full">
              <nam-stream-card :post="post"></nam-stream-card>
            </div>
          </div>
        </div>
        <span v-if="posts.length == 0" class="text-center text-gray-700">
          Oops. We couldn't find any activity.
        </span>
      </div>
    </nam-page>
  </div>
</template>

<script>
import NamArea from "../../components/nam-area.vue";
import NamLoading from "../../components/nam-loading.vue";
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
import NamUseractions from "../../components/nam-useractions.vue";
import Vue from "vue";
import NamStreamCard from "../../components/nam-stream-card.vue";

export default {
  data: () => ({
    user: {},
    uuid: null,
    loading: true,
    loadingStatus: "Loading Profile...",
    loadingStream: false,
    posts: [],
  }),
  mounted() {
    this.uuid = this.$route.params.uuid;
    if (!this.uuid || this.uuid == "me") {
      this.uuid = this.$nam.user.uuid;
    }
    this.$nam.useractions
      .getUserProfile(this.uuid)
      .then((profile) => {
        this.user = profile;
        this.loading = false;
      })
      .catch(() => {
        this.loadingStatus = "An error occured.";
      });
    this.updateStream();
  },
  methods: {
    updateStream() {
      this.loadingStream = true;
      this.$nam.post.getUserStream(this.uuid).then((res) => {
        this.loadingStream = false;
        let f = (i) => {
          console.log(i, "Get Post");
          this.$nam.post.getPost(res[i]).then((postcontent) => {
            console.log("Post recv");
            Vue.set(this.posts, i, postcontent);
          });
        };
        for (var x = 0; x < res.length; x++) {
          f(x);
        }
      });
    },
  },
  components: {
    namPage,
    NamText,
    NamLoading,
    NamArea,
    NamUseractions,
    NamStreamCard,
  },
};
</script>

<style>
</style>