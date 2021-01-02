<template>
  <div>
    <div v-if="show == 'collapsed'">
      <vs-tooltip shadow not-hover bottom v-model="userActionsDropdown">
        <vs-button icon color="#d1d5db" @click="showActions">
          <i class="bx bxs-chevron-down-circle"></i>
        </vs-button>
        <template #tooltip :border="false">
          <div class="w-full flex flex-col">
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
    <div v-if="show == 'inline-buttons'">
      <a
        class="text-md font-bold rounded-md px-4 py-4 bg-indigo-500 mx-1 text-white"
        @click.prevent="toggleFollow"
        href="#"
        >{{ followed ? "Unfollow" : "Follow" }}</a
      >
      <a
        class="text-md font-bold rounded-md px-4 py-4 bg-indigo-500 mx-1 text-white"
        @click.prevent="togglePin"
        href="#"
        >{{ pinned ? "Unpin" : "Pin" }}</a
      >
      <a
        class="text-md font-bold rounded-md px-2 my-1 px-4 py-4 bg-indigo-500 mx-1 text-white"
        @click.prevent="showUserProfile"
        href="#"
        >Profile</a
      >
    </div>
    <div v-if="show == 'inline-text'">
      <a
        class="text-md font-bold rounded-md mx-2 text-gray-700"
        @click.prevent="toggleFollow"
        href="#"
        >{{ followed ? "Unfollow" : "Follow" }}</a
      >
      <a
        class="text-md font-bold rounded-md mx-2 text-gray-700"
        @click.prevent="togglePin"
        href="#"
        >{{ pinned ? "Unpin" : "Pin" }}</a
      >
      <a
        class="text-md font-bold rounded-md mx-2 text-gray-700"
        @click.prevent="showUserProfile"
        href="#"
        >Profile</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    userActionsDropdown: false,
    followed: false,
    pinned: false,
  }),
  props: {
    user: {
      required: true,
    },
    show: {
      default: "collapsed",
    },
  },
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
      await this.$nam.sleep(300);
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