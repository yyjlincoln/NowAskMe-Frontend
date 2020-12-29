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
            class="h-screen w-screen mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mx-10 lg:mt-20 md:max-w-4xl"
          >
            <div class="sm:text-center lg:text-left">
              <span class="text-3xl tracking-tight font-extrabold text-gray-900"
                >We've sent you an email</span
              >
              <h1
                class="text-4xl tracking-tight font-extrabold sm:text-4xl md:text-5xl"
              >
                <span class="block text-indigo-600"
                  >Please enter the OTP (One-Time Password) below</span
                >
              </h1>
            </div>
            <div>
              <form @submit.capture.prevent="nextAction">
                <div
                  class="shadow my-10 flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
                >
                  <input
                    class="relative w-20 h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-4xl text-gray-600 ontline-none"
                    type="email"
                    placeholder=""
                    v-model="email"
                  />
                </div>
                <div
                  class="shadow my-10 flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
                >
                  <input
                    class="relative w-20 h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-4xl text-gray-600 ontline-none"
                    type="email"
                    placeholder=""
                    v-model="email"
                  />
                </div>
                <div
                  class="shadow my-10 flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
                >
                  <input
                    class="relative w-20 h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-4xl text-gray-600 ontline-none"
                    type="email"
                    placeholder=""
                    v-model="email"
                  />
                </div>
                <div
                  class="shadow my-10 flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
                >
                  <input
                    class="relative w-20 h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-4xl text-gray-600 ontline-none"
                    type="email"
                    placeholder=""
                    v-model="email"
                  />
                </div>
                <div
                  class="shadow my-10 flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
                >
                  <input
                    class="relative w-20 h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-4xl text-gray-600 ontline-none"
                    type="email"
                    placeholder=""
                    v-model="email"
                  />
                </div>
                <div
                  class="shadow my-10 flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
                >
                  <input
                    class="relative w-20 h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-4xl text-gray-600 ontline-none"
                    type="email"
                    placeholder=""
                    v-model="email"
                  />
                </div>
                <div>
                  <div class="mx-2">
                    <div v-if="verification_status == 'checkemail'">
                      <svg
                        class="animate-spin h-7 w-7 mr-3"
                        viewBox="0 0 24 24"
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
                    </div>
                    <div v-if="verification_status == 'allowcontinue'">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="green"
                      >
                        <path
                          d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                        />
                      </svg>
                    </div>
                    <div v-if="verification_status == 'incorrectemail'">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="red"
                      >
                        <path
                          d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="sm:text-center lg:text-left">
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
              >
                <div class="rounded-md shadow">
                  <a
                    href="#"
                    class="w-full flex items-center justify-center px-5 border border-transparent text-base font-medium rounded-md text-white bg-gray-400 text-lg py-4"
                    @click.prevent="nextAction"
                    :class="
                      verification_status == 'allowcontinue'
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : ''
                    "
                  >
                    {{ register == -1 ? "Continue" : "" }}
                    {{ register == 0 ? "Sign in" : "" }}
                    {{ register == 1 ? "Register" : "" }}
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
import axios from "axios";
export default {
  data: () => ({
    menu: false,
    githubredirect: false,
    verification_status: "",
    timer: null,
    register: -1, // 0 - Sign in; 1 - Register; -1 - Undetermined
    email: "",
  }),
  methods: {
    checkEmail() {
      // Inspired: https://stackoverflow.com/questions/49711449/how-to-delay-keyup-handler-in-vue-js.
      // Fully understood.
      this.verification_status = "checkemail";
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        if (!reg.test(this.email)) {
          this.verification_status = "incorrectemail";
          this.register = -1;
          return;
        }
        // [TODO] This is going to be replaced using a global component that globally handle those exceptions
        axios
          .get("https://apis.nowask.me/auth/check_email", {
            params: {
              email: this.email,
            },
          })
          .then((res) => {
            if (res.data.code == 0) {
              if (res.data.exist == true) {
                this.verification_status = "allowcontinue";
                this.register = 0;
              } else {
                this.verification_status = "allowcontinue";
                this.register = 1;
              }
            }
          });
        // Three states:
        // this.register = -1; // Undetermined
        // this.register = 0; // Login
        // this.register = 1; // Register
        // Three states:
        // this.verification_status = "incorrectemail";
        // this.verification_status = "allowcontinue";
        // this.verification_status = "checkemail";
      }, 1000);
    },
    nextAction() {
      if (this.verification_status != "allowcontinue") {
        return;
      }
      if (this.register == 0) {
        this.$router.push({
          path: "/login",
          params: {
            email: this.email,
          },
        });
      } else if (this.register == 1) {
        this.$router.push({
          path: "/register",
          params: {
            email: this.email,
          },
        });
      }
    },
  },
};
</script>