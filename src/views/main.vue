<template>
  <div>
    <transition name="fade">
      <div v-if="pwaloading">
        <nam-loading
          :as_full_page="true"
          status="Loading home screen..."
        ></nam-loading>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="!pwaloading">
        <div
          class="h-screen w-screen flex-col flex justify-center items-center flex overflow-hidden"
        >
          <div
            class="h-screen mt-0 absolute left-0 top-0 overflow-hidden"
            style="z-index: -2"
            id="background_animate"
          >
            <div
              class="w-screen h-screen bg-white left-0 top-0 opacity-50 absolute overflow-hidden"
            ></div>
            <img
              class="object-cover w-screen h-screen overflow-hidden"
              src="https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixlib=rb-1.2.1&q=80&fm=jpg&w=1920"
            />
          </div>
          <div
            id="title_animate"
            class="relative mx-auto text-center align-middle py-10"
          >
            <div class="overflow-hidden">
              <span
                class="relative text-5xl md:text-6xl lg:text-7xl block text-gray-800 font-extrabold"
                >Got a Question?</span
              >
            </div>
            <div class="overflow-hidden">
              <span
                class="relative text-6xl md:text-7xl lg:text-8xl block font-extrabold text-gradient overflow-hidden"
                >Ask me, now!</span
              >
            </div>
          </div>

          <!-- Buttons -->
          <div
            id="buttons_animate"
            class="flex flex-col w-full max-w-sm sm:flex-row sm:w-auto sm:px-auto sm:max-w-lg"
          >
            <div class="rounded-md shadow">
              <a
                href="/get-started"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 md:py-4 md:text-lg md:px-10"
                @click.prevent="getstarted_action"
              >
                <svg
                  class="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                  v-if="getstarted"
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
                Get Started
              </a>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="/dashboard"
                @click.prevent="$router.push('dashboard')"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Dashboard
              </a>
            </div>
          </div>
          <!-- Bottom learn more -->
          <div class="absolute bottom-10">
            <span class="font-extrabold text-gray-500 relative"
              >↓ Learn more</span
            >
          </div>
        </div>
        <div id="content" class="h-fit">
          <div class="pt-7 px-7 lg:pt-20 lg:px-20">
            <span
              class="relative text-4xl md:text-5xl lg:text-6xl block text-gray-700 font-extrabold"
              id="tip-main"
              >Don't know how?</span
            >
            <span
              class="text-gradient text-5xl md:text-6xl lg:text-7xl font-extrabold"
              id="tip-sub"
              >Simply,</span
            >
            <div class="flex justify-center items-center mt-10" id="tip-1">
              <div class="pr-5">
                <svg
                  t="1609244266714"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1309"
                  width="100"
                  height="100"
                  fill="#4e46c5"
                >
                  <path
                    d="M512 981.333333c-21.333333 0-42.666667-4.266667-64-17.066666l-298.666667-170.666667C110.933333 772.266667 85.333333 729.6 85.333333 682.666667V341.333333c0-46.933333 25.6-89.6 64-110.933333l298.666667-170.666667c38.4-21.333333 89.6-21.333333 128 0l298.666667 170.666667c38.4 21.333333 64 64 64 110.933333v341.333334c0 46.933333-25.6 89.6-64 110.933333l-298.666667 170.666667c-21.333333 12.8-42.666667 17.066667-64 17.066666z m0-853.333333c-8.533333 0-12.8 0-21.333333 4.266667l-298.666667 170.666666c-12.8 8.533333-21.333333 21.333333-21.333333 38.4v341.333334c0 17.066667 8.533333 29.866667 21.333333 38.4l298.666667 170.666666c12.8 8.533333 29.866667 8.533333 42.666666 0l298.666667-170.666666c12.8-8.533333 21.333333-21.333333 21.333333-38.4V341.333333c0-17.066667-8.533333-29.866667-21.333333-38.4l-298.666667-170.666666c-8.533333-4.266667-12.8-4.266667-21.333333-4.266667z m384 554.666667z"
                    p-id="1310"
                  ></path>
                  <path
                    d="M512 554.666667c-8.533333 0-12.8 0-21.333333-4.266667l-371.2-213.333333c-21.333333-17.066667-29.866667-42.666667-17.066667-59.733334 12.8-21.333333 38.4-29.866667 59.733333-17.066666l349.866667 204.8 349.866667-204.8c21.333333-12.8 46.933333-4.266667 59.733333 17.066666 12.8 21.333333 4.266667 46.933333-17.066667 59.733334l-371.2 213.333333c-8.533333 4.266667-12.8 4.266667-21.333333 4.266667z"
                    p-id="1311"
                  ></path>
                  <path
                    d="M512 985.6c-25.6 0-42.666667-17.066667-42.666667-42.666667V512c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667v430.933333c0 21.333333-17.066667 42.666667-42.666667 42.666667z"
                    p-id="1312"
                  ></path>
                </svg>
              </div>
              <div class="w-full">
                <span
                  class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-600"
                  >Pack your question</span
                >
              </div>
            </div>

            <div class="flex justify-center items-center mt-8" id="tip-2">
              <div class="pr-5">
                <svg
                  t="1609245284017"
                  class="icon"
                  viewBox="0 0 1025 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2056"
                  width="100"
                  height="80"
                  fill="#4e46c5"
                >
                  <path
                    d="M971.387916 23.759347 28.09806 518.407462c-38.802954 20.336728-37.211038 50.145356 3.502215 66.263506l120.428449 47.59829c40.633657 16.078352 102.240808 7.362612 136.785387-19.660163L811.83813 200.183443c34.385387-27.102371 38.086592-23.082783 8.198368 8.91473l-413.500194 442.672056c-29.96782 31.878119-21.05309 70.959658 19.699961 86.839021l14.088457 5.531908c40.753051 15.759969 107.374738 42.265371 147.928799 58.821298l133.561757 54.363933c40.593859 16.516129 73.785309 30.206607 73.785309 30.445394 0 0.238787 0.238787 0.994948 0.437777 1.034745 0.19899 0.079596 9.790284-34.385387 21.252079-76.650758L1020.976101 63.676642C1032.437897 21.371473 1010.19087 3.462417 971.387916 23.759347z"
                    p-id="2057"
                  ></path>
                  <path
                    d="M410.874275 788.794403l-92.410727-37.808006c-40.514264-16.595725-59.935639 2.865449-43.140925 43.339914 0.039798 0 85.804275 206.710299 83.416401 213.993315-2.46747 7.243218 82.30206-122.657132 82.30206-122.657132C464.99942 848.96883 451.388538 805.390128 410.874275 788.794403z"
                    p-id="2058"
                  ></path>
                </svg>
              </div>
              <div class="w-full">
                <span
                  class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-600"
                  >Post it to your friends</span
                >
              </div>
            </div>
            <div class="flex justify-center items-center mt-8" id="tip-3">
              <div class="pr-5">
                <svg
                  t="1609245394970"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2844"
                  width="100"
                  height="80"
                >
                  <path
                    d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m288.580267 332.552534l-324.266667 347.426133a45.866667 45.866667 0 0 1-64.9216 2.6112 20.334933 20.334933 0 0 1-1.518933-1.518933l-185.258667-185.233067a46.344533 46.344533 0 0 1 65.3568-65.3568l152.541867 151.3472 290.423466-312.2432a46.293333 46.293333 0 1 1 71.68 58.632533 37.0944 37.0944 0 0 1-4.0192 4.343467z m0 0"
                    p-id="2845"
                    fill="#4e46c5"
                  ></path>
                </svg>
              </div>
              <div class="w-full">
                <span
                  class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-600"
                  >Wait for them to reply!</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="h-fit py-20 px-20">
          <div
            class="flex flex-col w-full max-w-sm sm:flex-row sm:w-auto sm:px-auto sm:max-w-lg"
          >
            <div class="rounded-md shadow">
              <a
                href="/get-started"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 md:py-4 md:text-lg md:px-10"
                @click.prevent="getstarted_action"
              >
                <svg
                  class="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                  v-if="getstarted"
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
                Get Started
              </a>
            </div>
          </div>
        </div>
        <nam-footer></nam-footer>
      </div>
    </transition>
  </div>
</template>
<style>
</style>


<script>
import NamFooter from "../components/nam-footer.vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NamLoading from "../components/nam-loading.vue";
gsap.registerPlugin(ScrollTrigger);
export default {
  data: () => ({
    getstarted: false,
    pwaloading: false,
  }),
  mounted() {
    if (this.$route.query.pwa == "true") {
      document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      //I love you lincoln (From matt:))
      document.body.setAttribute("style", "touch-action: pan-x pan-y;s");
      this.pwaloading = true;
      this.$nam.pwa = true;
      this.$nam.auth.checkLoginStatus().then((status) => {
        if (status == true) {
          this.$router.replace("/dashboard");
        } else {
          this.pwaloading = false;
        }
      });
    }
    gsap
      .timeline({})
      .from(
        "#background_animate",
        {
          delay: 0,
          opacity: 0,
          duration: 1.8,
        },
        0
      )
      .from(
        "#background_animate div",
        {
          duration: 5,
          opacity: 1,
        },
        "<"
      )
      .from(
        "#title_animate span",
        {
          duration: 1.5,
          y: 200,
          ease: "power4.out",
          skewY: 10,
          skewX: 10,
          stagger: {
            amount: 0.4,
          },
        },
        "<+1"
      )
      .from(
        "#buttons_animate div",
        {
          duration: 0.8,
          opacity: 0,
        },
        "<+0.8"
      );
    gsap
      .timeline({})
      .from("#tip-1", {
        scrollTrigger: {
          trigger: "#content",
          start: "top center",
          end: "100",
          scrub: true,
        },
        translateY: -40,
        opacity: 0,
      })
      .from("#tip-2", {
        scrollTrigger: {
          trigger: "#content",
          start: "top center 40px",
          end: "60",
          scrub: true,
        },
        translateY: -80,
        opacity: 0,
      })
      .from("#tip-3", {
        scrollTrigger: {
          trigger: "#content",
          start: "top center 60px",
          end: "40",
          scrub: true,
        },
        translateY: -160,
        opacity: 0,
      });
  },
  methods: {
    getstarted_action() {
      this.getstarted = true;
      setTimeout(() => {
        this.$router.push("/get-started");
      }, 1000);
    },
  },
  components: {
    NamFooter,
    NamLoading,
  },
};
</script>