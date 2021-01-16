<template>
  <div>
    <div class="flex flex-col rounded-md pb-5 py-5 border-dotted border-b-2">
      <nam-user
        :spacing="false"
        :show_userid="false"
        background_class=""
        :user="{
          uuid: 'fab4309821ad298fbf2c0efe465df09f',
          name: 'Lincoln Yan',
          userid: 'yyjlincoln',
        }"
        :show_actions="false"
      >
        <p>Asked a new question</p>
        <template #aside_name>
          <span class="text-gray-500"> Just now </span>
        </template>
      </nam-user>
      <div class="my-1 flex flex-col text-xl">
        <span>I can't understand.</span>
        <span>Why am I always procrastinating???💢</span>
      </div>
      <div class="flex flex-row">
        <span class="mr-2">Like</span>
        <span class="mx-2">Comment</span>
      </div>
    </div>
  </div>
</template>

<script>
import NamUser from './nam-user.vue';

export default {
  components: { NamUser },
};
</script>

<style>
</style>