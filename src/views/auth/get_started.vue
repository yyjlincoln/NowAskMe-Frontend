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
            class="h-screen w-screen mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mx-10 lg:mt-20 md:max-w-4xl"
          >
            <div class="sm:text-center lg:text-left">
              <span class="text-3xl tracking-tight font-extrabold text-gray-900"
                >Get started</span
              >
              <h1
                class="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl"
              >
                <span class="block text-indigo-600"
                  >Please enter your email address</span
                >
              </h1>
            </div>
            <div>
              <div
                class="shadow my-10 w-full flex items-center justify-center border text-base font-medium rounded-md bg-gray-200"
              >
                <input
                  class="relative w-full h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-4xl text-gray-600"
                />
              </div>
            </div>
            <div class="sm:text-center lg:text-left">
              <p
                class="mt-3 text-base text-gray-700 sm:mx-auto md:mt-5 md:text-xl"
              >
                By continuing, you agrees to our
                <a class="underline" href="/legal/privacy">privacy policy</a>
                and
                <a class="underline" href="/legal/eua">end user agreement</a>
              </p>
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
              >
                <div class="rounded-md shadow">
                  <a
                    href="/login"
                    class="w-full flex items-center justify-center px-5 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-lg py-4"
                    @click="githubredirect = true"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div
        class="w-screen h-screen absolute mt-0 top-0 bg-white opacity-90 hidden sm:block"
        style="z-index: -7"
      ></div>
      <div
        class="w-screen h-screen absolute mt-0 top-0 hidden sm:block"
        style="z-index: -10"
      >
        <img
          class="object-cover w-screen h-screen"
          src="https://source.unsplash.com/random?technology"
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
    githubredirect: false,
  }),
};
</script>