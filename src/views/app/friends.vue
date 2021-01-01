<template>
  <div>
    <nam-page :unbounded="true">
      <nam-text subtitle="Friends" title="Your friends"></nam-text>
      <div class="flex flex-wrap flex-row mt-5">
        <!-- <nam-area title="Recent Contacts..." config_class="max-w-md">
          <nam-user v-for="friend in friends" :key="friend.uuid" :user="friend">
            <span class="font-bold text-gray-500">{{
              friend.description
            }}</span>
          </nam-user>
          <div v-if="friends.length == 0">
            <span class="font-bold text-gray-500"
              >Oops...We can't find any...</span
            >
          </div>
        </nam-area> -->
        <nam-area title="Pinned📌" config_class="max-w-md">
          <nam-user v-for="friend in pinned" :key="friend.uuid" :user="friend">
            <span class="font-bold text-gray-500">{{
              friend.description
            }}</span>
          </nam-user>
          <div v-if="pinned.length == 0">
            <span class="font-bold text-gray-500"
              >Oops...We can't find any...</span
            >
          </div>
        </nam-area>
        <nam-area title="Following" config_class="max-w-md">
          <nam-user
            v-for="friend in following"
            :key="friend.uuid"
            :user="friend"
          >
            <span class="font-bold text-gray-500">{{
              friend.description
            }}</span>
          </nam-user>
          <div v-if="following.length == 0">
            <span class="font-bold text-gray-500"
              >Oops...We can't find any...</span
            >
          </div>
        </nam-area>
        <nam-area title="Your followers" config_class="max-w-md">
          <nam-user
            v-for="friend in followers"
            :key="friend.uuid"
            :user="friend"
          >
            <span class="font-bold text-gray-500">{{
              friend.description
            }}</span>
          </nam-user>
          <div v-if="followers.length == 0">
            <span class="font-bold text-gray-500"
              >Oops...We can't find any...</span
            >
          </div>
        </nam-area>
      </div>
    </nam-page>
  </div>
</template>

<script>
import NamArea from "../../components/nam-area.vue";
import NamPage from "../../components/nam-page.vue";
import namText from "../../components/nam-text.vue";
import NamUser from "../../components/nam-user.vue";
import Vue from "vue";
export default {
  components: { namText, NamPage, NamArea, NamUser },
  data: () => ({
    friends: [],
    pinned: [],
    following: [],
    followers: [],
  }),
  methods: {
    reloadData() {
      this.$nam.notification.success("Data updated","We've detected a change in your user data. It's now updated.");
      this.$nam.useractions.getFollowers().then((followers_uuids) => {
        if (followers_uuids.length < this.followers.length) {
          // Optimize for better user experience:
          // If the length is greater or equal, then it will be overwritten
          // Otherwise, some data might need not be rewritten.
          // Alternatively, this can be resolved by removing the last n elements,
          // But that may secrafise efficiency :)
          this.followers = [];
        }
        for (var i in followers_uuids) {
          this.$nam.useractions
            .getUserProfile(followers_uuids[i])
            .then((profile) => {
              Vue.set(this.followers, i, profile);
            });
        }
      });
      this.$nam.useractions.getFollowing().then((following_uuids) => {
        if (following_uuids.length < this.following.length) {
          this.following = [];
        }
        for (var i in following_uuids) {
          this.$nam.useractions
            .getUserProfile(following_uuids[i])
            .then((profile) => {
              Vue.set(this.following, i, profile);
            });
        }
      });
      this.$nam.useractions.getPinned().then((pinned_uuids) => {
        if (pinned_uuids.length < this.pinned.length) {
          this.pinned = [];
        }
        for (var i in pinned_uuids) {
          this.$nam.useractions
            .getUserProfile(pinned_uuids[i])
            .then((profile) => {
              Vue.set(this.pinned, i, profile);
            });
        }
      });
    },
  },
  mounted() {
    this.$nam.useractions.addUserStatusListener(this, this.reloadData);
    this.reloadData();
  },
};
</script>

<style>
</style>