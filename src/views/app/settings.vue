<template>
  <div>
    <nam-page :unbounded="true">
      <nam-text subtitle="Settings" title="User Settings"></nam-text>
      <div class="mt-10">
        <nam-area class="flex flex-col" title="General">
          <div class="flex flex-col">
            <!-- General -->
            <!-- <span class="text-3xl font-bold">General Settings</span> -->
            <span class="text-gray-500 mt-2 text-xl"
              >Who can find my account?</span
            >
          </div>
        </nam-area>
        <nam-area class="flex flex-col" title="Privacy">
          <div class="flex flex-col">
            <!-- General -->
            <!-- <span class="text-3xl font-bold">General Settings</span> -->
            <span class="text-gray-500 mt-2 text-xl"
              >
              By default, my posts are available to: </span
            >
          </div>
        </nam-area>
      </div>
    </nam-page>
  </div>
</template>

<script>
import NamArea from "../../components/nam-area.vue";
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
export default {
  components: { namPage, NamText, NamArea },
};
</script>

<style>
</style>