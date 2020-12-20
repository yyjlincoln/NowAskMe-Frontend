<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative overflow-hidden h-screen">
      <div class="max-w-7xl mx-auto">
        <div
          class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
        >
          <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav
              class="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div
                class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"
              ></div>
            </nav>
          </div>

          <main
            class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 h-screen w-screen lg:mx-10 lg:mt-40"
          >
            <div class="sm:text-center lg:text-left">
              <h1
                class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span>Got a Question?</span>
                <span class="block text-indigo-600">Ask me, now!</span>
              </h1>
              <p
                class="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Nowask.me allows you to ask questions anonymously, or start a secret conversation with your friends without revealling your who you are. 
              </p>
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
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
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div
        class="w-screen h-screen absolute mt-0 top-0 bg-white opacity-70 hidden sm:block"
        style="z-index: -7"
      ></div>
      <div
        class="w-screen h-screen absolute mt-0 top-0 hidden sm:block"
        style="z-index: -10"
      >
        <img
          class="object-cover w-screen h-screen"
          src="https://images.unsplash.com/photo-1518384401463-d3876163c195"
        />
      </div>
      <div
        class="absolute bottom-1 right-1 opacity-50 hover:opacity-100 z-100 w-fit"
      >
        Unsplash.
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data: () => ({
    menu: false,
    getstarted: false,
  }),
  methods:{
    getstarted_action(){
      this.getstarted=true;
      setTimeout(() => {
        this.$router.push('/get-started')
      }, 1000);
    }
  }
};
</script>