<template>
  <div>
    <nam-page :centered="true">
      <nam-text
        subtitle="You're about to log out"
        title="Do you want to log out?"
      ></nam-text>
      <span class="mt-3 font-extrabold text-gray-600 text-3xl"
        >You're currently logged in as {{ $nam.user.name }} ({{$nam.user.userid}})</span
      >

      <div class="flex mt-10">
        <div class="rounded-md shadow">
          <a
            href="/"
            class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 md:py-4 md:text-lg md:px-10"
            @click.prevent="logout"
          >
            <svg
              class="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
              v-if="loading"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Confirm
          </a>
        </div>
        <div class="ml-3">
          <a
            href="/dashboard"
            @click.prevent="$router.go(-1)"
            class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
          >
            Cancel
          </a>
        </div>
      </div>
    </nam-page>
  </div>
</template>

<script>
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
export default {
  components: { namPage, NamText },
  data: () => ({
    loading: false,
  }),
  methods: {
    async logout() {
      let result = await this.$nam.auth.logout();
      this.loading = true;
      if (result) {
        this.$nam.notification.success(
          "Logged out",
          "You've successfully logged out."
        );
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>