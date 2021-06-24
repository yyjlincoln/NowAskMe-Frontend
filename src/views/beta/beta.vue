<template>
  <nam-page>
    <a
      class="text-2xl font-extrabold font-gray-500"
      @click.prevent="$router.go(-1)"
      href="/"
      >← Back</a
    >
    <nam-text title="Beta Testing" subtitle="Developer"></nam-text>
    <nam-area title="" config_class="">
      <div class="text-xl flex flex-col">
        <span class="font-bold"
          >Hey {{ loggedIn ? $nam.user.name : "developer" }},</span
        >
        <span>Welcome to our developer's beta testing program!</span>
        <span class="mt-3"
          >As a member of this program, you'll receive early access to lots of
          functionalities that were delivered to all users but not
          activated.</span
        >
        <span class="mt-3"
          >Before you start, make sure you've read our
          <a href="#" class="underline" @click.prevent="$router.push('/legal')"
            >legal statements</a
          >. All data collected in the beta testing will be treated as normal
          data according to our privacy policy.</span
        >
        <span class="mt-3"
          >You may leave the beta testing program at any time, at which you'll
          lose the access to those beta functionalities.</span
        >
        <span class="mt-10 text-xl font-bold"
          >I've read and understood the above conditions, and I'm ready to
          enroll/disenroll.</span
        >
      </div>
    </nam-area>
    <div class="text-right">
      <div class="flex flex-row text-right justify-end mt-3">
        <div class="rounded-md shadow flex mx-3" v-if="loggedIn">
          <a
            href="#"
            class="
              flex
              items-center
              justify-center
              px-8
              py-3
              text-base
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              active:bg-indigo-800
              md:py-4
              md:text-lg
              md:px-10
            "
            @click.prevent="toggle"
          >
            {{ status ? "Disenroll" : "Enroll" }}
          </a>
        </div>
        <div>
          <span class="text-red-500 font-bold" v-if="!loggedIn"
            >Please log in to enroll/disenroll.</span
          >
        </div>
      </div>
    </div>
  </nam-page>
</template>

<script>
import NamArea from "../../components/nam-area.vue";
import NamPage from "../../components/nam-page.vue";
import namText from "../../components/nam-text.vue";
export default {
  components: { namText, NamPage, NamArea },
  data: () => ({
    loggedIn: false,
    status: false,
  }),
  async mounted() {
    if (await this.$nam.auth.checkLoginStatus()) {
      this.loggedIn = true;
      console.log(
        "STATUS",
        (await this.$nam.requestAPI("/user/get_beta", {})).status
      );
      this.status = (await this.$nam.requestAPI("/user/get_beta", {})).status;
    }
  },
  methods: {
    toggle() {
      this.$nam
        .requestAPI("/user/set_beta", {
          params: {
            status: !this.status,
          },
        })
        .then(async () => {
          this.status = (
            await this.$nam.requestAPI("/user/get_beta", {})
          ).status;
          this.$config.updateConfig()
        });
    },
  },
};
</script>

<style>
</style>