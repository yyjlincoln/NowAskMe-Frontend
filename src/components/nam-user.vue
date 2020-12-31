<template>
  <div>
    <div
      v-if="display == 'list'"
      class="flex flex-col bg-gray-200 rounded-md px-5 py-5 my-1 mx-1"
    >
      <div class="flex flex-row">
        <div>
          <vs-avatar>
            <template #text>{{ user.name }}</template>
          </vs-avatar>
        </div>
        <div class="ml-3">
          <div class="flex flex-row">
            <div class="font-bold text-md">
              {{ user.name }}
            </div>
            <!-- <div class="font-bold text-md text-gray-500 ml-1">
              #{{ user.userid }}
            </div> -->
          </div>
          <div class="flex flex-col">
            <div class="font-bold text-md text-gray-500">
              #{{ user.userid }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Dropdown at the user card
export default {
  props: {
    user: {
      required: true,
    },
    display: {
      default: "list",
    },
  },
};
</script>

<style>
</style>