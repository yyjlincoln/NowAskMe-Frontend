<template>
  <div>
    <nam-page :unbounded="true">
      <nam-text
        :subtitle="name ? 'Hello, ' + name : 'Complete setup'"
        title="Let your friends know who you are"
      ></nam-text>

      <div class="mt-10 bg-gray-100 rounded-md px-5 py-5">
        <div class="text-3xl font-bold text-gradient">Your name</div>
        <input
          class="relative w-full h-20 rounded-md bg-transparent text-left font-xl font-extrabold text-3xl md:text-4xl text-gray-600 ontline-none"
          type="text"
          placeholder="Pick a name"
          v-model="name"
          :disabled="done"
        />
      </div>
      <div class="mt-10 bg-gray-100 rounded-md px-5 py-5">
        <div class="text-3xl font-bold text-gradient">Pick an ID</div>
        <input
          class="relative w-full h-20 rounded-md bg-transparent text-left font-xl font-extrabold text-3xl md:text-4xl text-gray-600 ontline-none"
          type="text"
          placeholder="Pick an ID"
          v-model="userid"
          :disabled="done"
        />
      </div>
      <div class="mt-10 bg-gray-100 rounded-md px-5 py-5">
        <div class="text-3xl font-bold text-gradient">
          Introduce yourself...
        </div>
        <textarea
          class="relative mt-4 w-full h-40 rounded-md bg-transparent text-left font-xl font-extrabold text-3xl md:text-4xl text-gray-600 ontline-none"
          type="text"
          placeholder="Hey, I'm..."
          v-model="description"
          :disabled="done"
        />
      </div>
      <div class="flex mt-10">
        <div class="rounded-md shadow">
          <a
            href="/dashboard"
            class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 md:py-4 md:text-lg md:px-10"
            @click.prevent="update_profile"
          >
            <svg
              class="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
              v-if="done"
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

            I'm done
          </a>
        </div>
      </div>
    </nam-page>
  </div>
</template>

<script>
import NamPage from "../../components/nam-page.vue";
import namText from "../../components/nam-text.vue";
export default {
  components: { namText, NamPage },
  data: () => ({
    name: "",
    description: "",
    userid: "",
    done: false,
  }),
  methods: {
    update_profile() {
      if (this.done) {
        this.$nam.notification.failed(
          "Please wait",
          "We're still processing your request"
        );
      }
      this.done = true;

      this.$nam.useractions
        .updateProfile({
          name: this.name,
          description: this.description,
          userid: this.userid,
        })
        .then(async (res) => {
          this.done = false;
          this.$nam.notification.success(
            "Successfully updated profile",
            res.message
          );
          await this.$nam.useractions.getProfile();
          this.$nam.pullCredentials();
          this.$router.push({
            path: this.$route.query.then
              ? this.$route.query.then
              : "/dashboard",
          });
        })
        .catch((e) => {
          console.log(e);
          this.$nam.notification.failed(
            "Could not update your profile",
            "An error occured."
          );
          this.done = false;
        });
    },
  },
};
</script>

<style>
</style>