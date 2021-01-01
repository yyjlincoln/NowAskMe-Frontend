<template>
  <div>
    <nam-page>
      <a
        class="font-extrabold text-2xl font-gray-700"
        href="/"
        @click.prevent="$router.go(-1)"
        >⬅️ Back</a
      >
      <nam-text subtitle="Debug" title="Diagnostics"></nam-text>
      <nam-area class="mt-10" title="General Information" config_class="">
        <span>Version: {{ $nam.version }}</span>
        <span>Server: {{ $nam.server }}</span>
        <span>Current timestamp: {{ Date.now() }}</span>
      </nam-area>
      <nam-area title="User Account Information" config_class="">
        <span>uuid: {{ $nam.user.uuid }}</span>
        <span>userid: {{ $nam.user.userid }}</span>
        <span>name: {{ $nam.user.name }}</span>
        <span>token: {{ $nam.user.token }}</span>
      </nam-area>
      <nam-area title="Cache Information" config_class="">
        <span>Cache max age: {{ $nam.cache_max }}</span>
        <span>Cache max wait: {{ $nam.cache_max_wait }}</span>
        <span>Cache wait period: {{ $nam.cache_wait_period }}</span>
        <span>Local Cache: {{ $nam.cache }}</span>
      </nam-area>
      <nam-area title="Listener Information" config_class="">
        <span
          >User Status Listener:
          {{ $nam.useractions._userStatusListeners }}</span
        >
      </nam-area>
      <nam-area title="More Information" config_class="">
        <button @click="clearcache">Clear Cache</button>
        <button @click="dev">Developer Mode</button>
      </nam-area>
    </nam-page>
    <nam-footer></nam-footer>
  </div>
</template>

<script>
import NamArea from "../../components/nam-area.vue";
import NamFooter from "../../components/nam-footer.vue";
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
export default {
  components: { namPage, NamText, NamArea, NamFooter },
  data: () => ({
    connectivity: "testing...",
    devcount: 10,
  }),
  mounted() {},
  methods: {
    clearcache() {
      this.$nam.cache = {};
      localStorage.setItem("nam_cache", JSON.stringify({}));
    },
    dev() {
      this.devcount--;
      if (this.devcount <= 0) {
        this.$nam.notification.success("Developer Mode", "Enabled.");
        window.developer = this;
        window.$nam = this.$nam;
        console.info("Developer mode is now enabled.");
        console.info(
          "Use window.$nam for this.$nam, and window.developer for this."
        );
        console.info(this);
      } else {
        this.$nam.notification.warn(
          "Developer Mode",
          "Click " + this.devcount + " more times."
        );
      }
    },
  },
};
</script>

<style>
</style>