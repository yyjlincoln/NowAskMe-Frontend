<template>
  <div>
    <nam-page :unbounded="true">
      <nam-text subtitle="Friends" title="Your friends"></nam-text>
      <div class="flex flex-wrap flex-row mt-5">
        <nam-area title="Recent Contacts..." config_class="max-w-md">
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
        </nam-area>
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
      </div>
    </nam-page>
  </div>
</template>

<script>
import NamArea from "../../components/nam-area.vue";
import NamPage from "../../components/nam-page.vue";
import namText from "../../components/nam-text.vue";
import NamUser from "../../components/nam-user.vue";
export default {
  components: { namText, NamPage, NamArea, NamUser },
  data: () => ({
    friends: [
      {
        uuid: "uuid1",
        name: "testuser1",
        description:
          "Hey, I've just registered a nowask.me account. It's awesome!",
        userid: "userid1",
      },
      {
        uuid: "uuid2",
        name: "Lincoln Yan",
        description: "Hey, look! This man coded the whole thing.",
        userid: "userid",
      },
    ],
    pinned: [
      {
        uuid: "uuid2",
        name: "Lincoln Yan",
        description: "Hey, look! This man coded the whole thing.",
        userid: "userid",
      },
    ],
  }),
};
</script>

<style>
</style>