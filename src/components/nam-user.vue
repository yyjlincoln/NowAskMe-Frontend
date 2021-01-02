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
          <vs-tooltip shadow not-hover bottom v-model="userActionsDropdown">
            <vs-button icon color="#d1d5db" @click="showActions">
              <i class="bx bxs-chevron-down-circle"></i>
            </vs-button>
            <template #tooltip :border="false">
              <div class="w-full flex flex-col" v-if="show_actions">
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="toggleFollow"
                  href="#"
                  >{{ followed ? "Unfollow" : "Follow" }}</a
                >
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="togglePin"
                  href="#"
                  >{{ pinned ? "Unpin" : "Pin" }}</a
                >
                <a
                  class="text-md font-bold rounded-md px-2 my-1"
                  @click.prevent="showUserProfile"
                  href="#"
                  >Profile</a
                >
              </div>
            </template>
          </vs-tooltip>
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
  data: () => ({
    userActionsDropdown: false,
    followed: false,
    pinned: false,
    _listener: -1,
  }),
  methods: {
    showActions() {
      this.userActionsDropdown = true;
    },
    toggleFollow() {
      this.userActionsDropdown = false;
      if (this.followed) {
        this.$nam.useractions
          .unfollow(this.user.uuid)
          .then(() => {
            this.followed = false;
          })
          .catch(() => {
            this.$nam.notification.failed(
              "Could not unfollow '" + this.user.name + "'.",
              "An error occured."
            );
          });
      } else {
        this.$nam.useractions
          .follow(this.user.uuid)
          .then(() => {
            this.followed = true;
          })
          .catch(() => {
            this.$nam.notification.failed(
              "Could not follow '" + this.user.name + "'.",
              "An error occured."
            );
          });
      }
    },
    togglePin() {
      this.userActionsDropdown = false;
      if (this.pinned) {
        this.$nam.useractions
          .unpin(this.user.uuid)
          .then(() => {
            this.pinned = false;
          })
          .catch(() => {
            this.$nam.notification.failed(
              "Could not unpin '" + this.user.name + "'.",
              "An error occured."
            );
          });
      } else {
        this.$nam.useractions
          .pin(this.user.uuid)
          .then(() => {
            this.pinned = true;
          })
          .catch(() => {
            this.$nam.notification.failed(
              "Could not pin '" + this.user.name + "'.",
              "An error occured."
            );
          });
      }
    },
    async showUserProfile() {
      this.userActionsDropdown = false;
      await this.$nam.sleep(300)
      this.$router.push("/user/" + this.user.uuid);
    },
    userDataChanged(uuids) {
      if (!uuids || uuids.includes(this.user.uuid)) {
        this.$nam.useractions.isFollowing(this.user.uuid).then((followed) => {
          this.followed = followed;
        });
        this.$nam.useractions.isPinned(this.user.uuid).then((pinned) => {
          this.pinned = pinned;
        });
      }
    },
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
    this._listener = this.$nam.useractions.addUserStatusListener(
      this,
      this.userDataChanged
    );
    this.$nam.useractions.isFollowing(this.user.uuid).then((followed) => {
      this.followed = followed;
    });
    this.$nam.useractions.isPinned(this.user.uuid).then((pinned) => {
      this.pinned = pinned;
    });
  },
  beforeDestroy() {
    this.userActionsDropdown = false;
    this.$nam.useractions.removeUserStatusListener(this._listener);
  },
};
</script>

<style>
</style>