<template>
  <div>
    <nam-page>
      <nam-text subtitle="Friends" title="Your friends"></nam-text>
      <nam-area title="Recents" config_class="min-w-full">
        <nam-user
          v-for="friend in friends"
          :key="friend.uuid"
          :user="friend"
        ></nam-user>
      </nam-area>
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
        uuid: "awd",
        name:"test",
        description:"description",
        userid:'userid'
      },
    ],
  }),
};
</script>

<style>
</style>