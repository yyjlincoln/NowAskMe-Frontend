<template>
  <div id="app" class="h-fit w-fit overflow-hidden">
    <transition :name="transition_name" mode="out-in">
      <nam-loading
        :as_full_page="true"
        :show_logo="true"
        :status="status"
        class="bg-white"
        style="z-index: 999999999"
        v-if="loading && !error"
      >
      </nam-loading>
    </transition>
    <transition :name="transition_name" mode="out-in">
      <div>
        <!-- Error -->
        <nam-page :absolute="true" v-if="error">
          <nam-text
            title="Nowask.me"
            title_config="text-4xl md:text-5xl lg:text-6xl"
          ></nam-text>
          <nam-text subtitle="We ran into a problem."></nam-text>
          <nam-area :title="title" config_class="">
            <span class="text-xl font-bold">{{ status }}</span>
          </nam-area>
          <div v-if="ignorable" class="flex flex-row">
            <div class="rounded-md shadow flex">
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
                @click.prevent="ignore"
              >
                Ignore
              </a>
            </div>
          </div>
        </nam-page>
      </div>
    </transition>
    <transition :name="transition_name" mode="out-in" v-if="!loading">
      <router-view />
    </transition>
  </div>
</template>

<style>
.slide-left-leave-active,
.slide-right-leave-active {
  display: none;
}

.slide-left-enter-active,
.slide-right-enter-active {
  /* position: absolute; */
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

/* .slide-right-leave-active, */
.slide-left-enter {
  opacity: 0;
  transform: translate(2em, 0);
}

/* .slide-left-leave-active, */
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<style>
.text-gradient {
  background: linear-gradient(90deg, #4e46e5, #9c2f9e);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.bg-gradient {
  background: linear-gradient(
    90deg,
    rgb(78, 70, 229, 0.8),
    rgb(156, 47, 158, 0.8)
  );
}

.app {
  font-family: "Helvetica";
}
</style>

<script>
import "tailwindcss/tailwind.css";
// import "boxicons/dist/boxicons"
import "boxicons/css/boxicons.min.css";
import NamLoading from "./components/nam-loading.vue";
import NamPage from "./components/nam-page.vue";
import namText from "./components/nam-text.vue";
import NamArea from "./components/nam-area.vue";
export default {
  name: "App",
  components: { NamLoading, NamPage, namText, NamArea },
  data: () => ({
    transition_name: "slide-left",
    // transition_name: "fade",
    lastPath: "/",
    status: "Loading Application...",
    loading: true,
    error: false,
    title: "",
    ignorable: true,
  }),
  watch: {
    // $route: function (before, after) {
    // },
  },
  async mounted() {
    // Load
    this.status = "Loading user configuration...";
    let configUpdated = await this.$config.updateConfig();
    if (configUpdated) {
      this.status = "Config loaded, initializing...";
      this.loading = false;
    } else {
      this.error = true;
      this.status =
        "There was an error while we tried to contact the server for your configuration file. You may ignore this error and continue, although some of the functionalities may be limited.";
      this.title = "We could not load your configuration file.";
      this.ignorable = true;
    }
  },
  methods: {
    ignore() {
      this.error = false;
      this.loading = false;
    },
  },
};
</script>
