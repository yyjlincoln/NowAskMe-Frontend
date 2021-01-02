<template>
  <div>
    <div
      v-if="display == 'list'"
      class="flex flex-col bg-gray-200 rounded-md px-5 py-5 my-1 mx-1"
    >
      <div class="flex flex-row">
        <div>
          <vs-avatar color="#d1d5db">
            <template #text>{{ user.name }}</template>
          </vs-avatar>
        </div>
        <div class="ml-3">
          <div class="flex flex-row">
            <div class="font-bold text-md">
              {{ user.name }}
            </div>
          </div>
          <div class="flex flex-col">
            <div class="font-bold text-md text-gray-500">
              #{{ user.userid }}
            </div>
          </div>
        </div>
        <!-- User Actions Button -->
        <div v-if="show_actions">
          <nam-useractions :user="user" show="collapsed"></nam-useractions>
        </div>
      </div>
      <div class="flex flex-col mt-1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import namUseractions from './nam-useractions.vue';
// TODO: Dropdown at the user card
export default {
  components: { namUseractions },
  data: () => ({
    _listener: -1,
  }),
  methods: {
  },
  props: {
    user: {
      required: true,
    },
    display: {
      default: "list",
    },
    show_actions: {
      default: true,
    },
  },
  mounted() {

  },
  beforeDestroy() {
  },
};
</script>

<style>
</style>