<template>
  <div>
    <div
      class="h-hit min-h-screen overflow-scroll w-screen flex flex-col justify-center max-w-6xl"
    >
      <div class="mx-5 px-5 md:mx-10 md:px-10 lg:mx-20 lg:px-20 flex flex-col">
        <span class="text-3xl md:text-4xl font-extrabold">Getting Started</span>
        <span class="text-5xl md:text-6xl font-extrabold text-gradient"
          >Please enter your email address</span
        >
        <div class="mt-1 md:mt-3">
          <form @submit.capture.prevent="nextAction">
            <div
              class="shadow my-5 md:my-10 w-full flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
            >
              <input
                class="relative w-full h-20 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-3xl md:text-4xl text-gray-600 ontline-none"
                type="email"
                placeholder="Your email address"
                @input="checkEmail"
                v-model="email"
              />
              <div class="mx-2">
                <div v-if="verification_status == 'checkemail'">
                  <svg class="animate-spin h-7 w-7 mr-3" viewBox="0 0 24 24">
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
          <div class="flex w-fit w-full">
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
            <div class="ml-auto">
              <p
                class="mt-3 text-base text-gray-700 sm:mx-auto md:mt-5 md:text-xl"
              >
                By continuing, you agree to our
                <a class="underline" href="/legal/privacy">privacy policy</a>
                and
                <a class="underline" href="/legal/eua">end user agreement</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative mx-10 md:mx-20 lg:mx-40 mt-20 px-5 py-5 rounded-md w-fit flex flex-col bg-gray-100"
      >
        <span class="text-xl font-bold text-gray-500 mb-3"
          >Didn't work? Try those:</span
        >
        <div class="flex flex-row">
          <a
            class="rounded-md shadow bg-indigo-600 hover:bg-indigo-700 px-5 py-2"
            href="/login/qr"
          >
            <div class="flex">
              <svg
                t="1609289121260"
                class="mr-2"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3710"
                width="30"
                height="30"
              >
                <path
                  d="M477.098667 546.901333V896H128v-349.098667h349.098667z m279.253333 279.253334V896H686.506667v-69.845333h69.845333z m139.648 0V896h-69.845333v-69.845333H896z m-139.648-279.253334v69.802667h69.802667v-69.802667H896v209.450667h-209.493333v-69.802667h-69.802667V896h-69.802667v-349.098667h209.450667z m-349.098667 69.802667H197.802667v208.938667h209.493333v-208.938667zM337.493333 686.549333v69.802667H267.648v-69.802667h69.802667zM477.098667 128v349.098667H128V128h349.098667zM896 128v349.098667h-349.098667V128H896zM407.253333 197.802667H197.802667v209.493333h209.493333v-209.493333z m418.901334 0h-209.450667v209.493333h209.493333v-209.493333zM337.493333 267.648v69.802667H267.648V267.648h69.802667z m418.901334 0v69.802667H686.506667V267.648h69.845333z"
                  fill="white"
                  p-id="3711"
                ></path>
              </svg>
              <span class="text-xl text-white">Use QR Code</span>
            </div>
          </a>
          <a
            class="rounded-md shadow bg-indigo-600 hover:bg-indigo-700 px-5 py-2 ml-4"
            href="/login/password"
          >
            <div class="flex">
              <svg
                t="1609289560495"
                class="mr-2"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4623"
                width="30"
                height="30"
              >
                <path
                  d="M851.450696 21.647662l-399.545757 399.609756c-117.438165-55.551132-262.011906-35.007453-359.162388 62.143029-123.646068 123.646068-123.646068 324.218934 0 447.865002s324.218934 123.646068 447.865002 0c97.150482-97.150482 117.630162-241.660224 62.143029-359.226387l151.741629-151.741629 96.382494 96.382494c28.79955 28.79955 75.51882 28.863549 104.382369 0l43.51932-43.51932c28.79955-28.79955 28.863549-75.51882 0-104.382369l-54.463149-54.463149 0.063999-0.063999-41.983344-41.791347 99.966438-99.966438c28.79955-28.79955 28.863549-75.51882 0-104.382369l-46.463274-46.463274c-28.863549-28.863549-75.582819-28.863549-104.446368 0zM392.065874 782.787769c-41.663349 41.663349-109.182294 41.59935-150.781644-0.063999-41.663349-41.663349-41.663349-109.182294 0-150.845643s109.182294-41.59935 150.781644 0.063999 41.727348 109.118295 0 150.845643z"
                  p-id="4624"
                  fill="#ffffff"
                ></path>
              </svg>
              <span class="text-xl text-white">Use Password</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data: () => ({
    menu: false,
    githubredirect: false,
    verification_status: "",
    timer: null,
    register: -1, // 0 - Sign in; 1 - Register; -1 - Undetermined
    email: "",
  }),
  mounted() {},
  methods: {
    async checkEmail() {
      // Inspired: https://stackoverflow.com/questions/49711449/how-to-delay-keyup-handler-in-vue-js. Fully understood.
      // Three states:
      // this.register = -1; // Undetermined
      // this.register = 0; // Login
      // this.register = 1; // Register
      // Three states:
      // this.verification_status = "incorrectemail";
      // this.verification_status = "allowcontinue";
      // this.verification_status = "checkemail";
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
        this.$nam.auth
          .checkEmail(this.email)
          .then((result) => {
            this.register = result ? 0 : 1;
            this.verification_status = "allowcontinue";
          })
          .catch((e) => {
            console.log(e);
            this.verification_status = "incorrectemail";
          });
      }, 1000);
    },
    nextAction() {
      if (this.verification_status != "allowcontinue") {
        return;
      }
      this.$router.push({
        name: "verification",
        params: {
          email: this.email,
          register: this.register == 0 ? false : true,
        },
      });
    },
  },
};
</script>