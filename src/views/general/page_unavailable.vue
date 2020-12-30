<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative overflow-hidden min-h-full">
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
            class="mt-10 mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 md:mt-16 h-screen w-screen lg:mx-10 lg:mt-40"
          >
            <div class="sm:text-center lg:text-left">
                <span class="text-5xl tracking-tight font-extrabold text-gray-900">Error 403/404</span>
                <span class="text-7xl tracking-tight font-extrabold block text-indigo-600">This page is unavailable or could not be found.</span>
                <span class="text-sm tracking-tight font-extrabold block text-gray-500 mt-10">Diagnostics:</span>
                <span class="text-sm tracking-tight font-extrabold block text-gray-500">uuid: {{$nam.user.uuid}}, token: {{$nam.user.token}}, name: {{$nam.user.name}}</span>
            </div>
          </main>
        </div>
      </div>
      <!-- <div
        class="w-screen h-screen absolute mt-0 top-0 bg-white opacity-90 hidden sm:block"
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
      </div> -->

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