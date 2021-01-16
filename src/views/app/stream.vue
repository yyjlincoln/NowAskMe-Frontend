<template>
  <div>
    <nam-page :unbounded="true">
      <div class="flex flex-row">
        <nam-text subtitle="Stream" title="What's happening?">
          <!-- TODO: Invitation code, Friend list, option to choose if that is anomonyous -->
        </nam-text>
      </div>
      <nam-post :afterPost="updateStream"></nam-post>
      <!-- Main Content -->
      <div class="mt-10 min-w-full min-h-full w-fit h-fit overflow-hidden">
        <div v-for="post in posts" :key="post.postid">
          <nam-stream-card :post="post" :afterUpdate="updateStream"></nam-stream-card>
        </div>
        <div v-if="posts.length == 0">
          <p class="font-bold text-gray-500 text-center mt-10">
            Oops...We can't find any post...
          </p>
        </div>
        <nam-loading
          v-if="updating"
          :as_full_page="false"
          :show_logo="false"
        ></nam-loading>
        <nam-tools title="Not seeing may posts?">
          <div class="flex flex-col">
            <p>Try following someone to get started.</p>
            <p>
              Due to privacy settings, you may have to be a follower of someone
              in order to view his/her posts.
            </p>
          </div>
        </nam-tools>
      </div>
    </nam-page>
  </div>
</template>

<script>
import namPage from "../../components/nam-page.vue";
import NamStreamCard from "../../components/nam-stream-card.vue";
import NamText from "../../components/nam-text.vue";
import Vue from "vue";
import NamLoading from "../../components/nam-loading.vue";
import NamTools from "../../components/nam-tools.vue";
import NamPost from '../../components/nam-post.vue';
export default {
  components: { namPage, NamText, NamStreamCard, NamLoading, NamTools, NamPost },
  methods: {
    post() {
      // Post something
    },
    updateStream() {
      this.updating = true;
      this.$nam.post.getStream().then((res) => {
        this.updating = false;
        if (res.length < this.posts.length) {
          this.posts = [];
        }
        let f = (i) => {
          this.$nam.post.getPost(res[i]).then((post) => {
            Vue.set(this.posts, i, post);
          });
        };
        for (var i = 0; i < res.length; i++) {
          f(i);
        }
      });
    }
  },
  data: () => ({
    posts: [],
    updating: false,
  }),
  mounted() {
    this.updateStream();
  },
};
</script>

<style>
</style>