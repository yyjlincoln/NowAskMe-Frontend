<template>
  <div>
    <div
      v-if="display == 'list'"
      class="flex flex-col rounded-md"
      :class="
        (background_class != null ? background_class : 'bg-gray-200') +
        ' ' +
        (spacing ? 'px-5 py-5 my-1 mx-1' : '') +
        ' ' +
        (constrains ? 'max-w-sm' : '')
      "
    >
      <div class="flex flex-row">
        <a
          @click.prevent="$router.push('/user/' + user.uuid)"
          :href="'/user/' + user.uuid"
        >
          <vs-avatar color="#d1d5db">
            <template #text>{{ user.name }}</template>
          </vs-avatar>
        </a>
        <div class="ml-3 flex flex-row justify-between w-full">
          <div>
            <div class="flex flex-row">
              <div class="font-bold text-md">
                {{ user.name }}
              </div>
              <div class="mx-1">
                <slot name="aside_name"></slot>
              </div>
            </div>
            <div class="flex flex-col" v-if="show_userid">
              <div class="font-bold text-md text-gray-500">
                #{{ user.userid }}
              </div>
            </div>
            <div v-if="!show_userid">
              <slot></slot>
            </div>
          </div>
          <!-- User Actions Button -->
          <div v-if="show_actions">
            <nam-useractions :user="user" show="collapsed"></nam-useractions>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-1">
        <div v-if="show_userid">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import namUseractions from "./nam-useractions.vue";
// TODO: Dropdown at the user card
export default {
  components: { namUseractions },
  data: () => ({
    _listener: -1,
  }),
  methods: {},
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
    background_class: {
      default: null,
    },
    hover_expand: {
      default: false,
    },
    show_userid: {
      default: true,
    },
    spacing: {
      default: true,
    },
    constrains: {
      default: true,
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>
</style>