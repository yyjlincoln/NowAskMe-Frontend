<template>
  <div>
    <div
      class="h-hit min-h-screen overflow-scroll w-screen flex flex-col justify-center max-w-6xl"
    >
      <div class="mx-5 px-5 md:mx-10 md:px-10 lg:mx-20 lg:px-20 flex flex-col">
        <span class="text-3xl md:text-4xl font-extrabold"
          >We've sent you an email</span
        >
        <span class="text-5xl md:text-6xl font-extrabold text-gradient"
          >Please enter the One-Time Password (OTP)</span
        >
        <div class="mt-1 md:mt-3">
          <form @submit.capture.prevent="nextAction">
            <div
              class="my-5 md:my-10 w-full flex items-center justify-center text-base font-medium ontline-none"
            >
              <div class="flex">
                <input
                  class="shadow mx-3 rounded-md bg-gray-200 relative w-20 h-20 rounded-md bg-transparent text-center font-xl font-extrabold px-3 text-3xl md:text-4xl text-gray-600 ontline-none uppercase"
                  type="text"
                  maxlength="1"
                  placeholder=""
                  @keyup="onOTPInput"
                  v-model="otp[0]"
                />
                <input
                  class="shadow mx-3 rounded-md bg-gray-200 relative w-20 h-20 rounded-md bg-transparent text-center font-xl font-extrabold px-3 text-3xl md:text-4xl text-gray-600 ontline-none uppercase"
                  type="text"
                  maxlength="1"
                  placeholder=""
                  v-model="otp[1]"
                  @keyup="onOTPInput"
                />
                <input
                  class="shadow mx-3 rounded-md bg-gray-200 relative w-20 h-20 rounded-md bg-transparent text-center font-xl font-extrabold px-3 text-3xl md:text-4xl text-gray-600 ontline-none uppercase"
                  type="text"
                  maxlength="1"
                  placeholder=""
                  v-model="otp[2]"
                  @keyup="onOTPInput"
                />
                <input
                  class="shadow mx-3 rounded-md bg-gray-200 relative w-20 h-20 rounded-md bg-transparent text-center font-xl font-extrabold px-3 text-3xl md:text-4xl text-gray-600 ontline-none uppercase"
                  type="text"
                  maxlength="1"
                  placeholder=""
                  v-model="otp[3]"
                  @keyup="onOTPInput"
                />
                <input
                  class="shadow mx-3 rounded-md bg-gray-200 relative w-20 h-20 rounded-md bg-transparent text-center font-xl font-extrabold px-3 text-3xl md:text-4xl text-gray-600 ontline-none uppercase"
                  type="text"
                  maxlength="1"
                  placeholder=""
                  v-model="otp[4]"
                  @keyup="onOTPInput"
                />
                <input
                  class="shadow mx-3 rounded-md bg-gray-200 relative w-20 h-20 rounded-md bg-transparent text-center font-xl font-extrabold px-3 text-3xl md:text-4xl text-gray-600 ontline-none uppercase"
                  type="text"
                  maxlength="1"
                  placeholder=""
                  @keyup="onOTPInput"
                  @input="checkOTP"
                  v-model="otp[5]"
                />
              </div>
              <div class="mx-2">
                <div v-if="verification_status == 'checkingotp'">
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
                <div v-if="verification_status == 'correctotp'">
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
                <div v-if="verification_status == 'incorrectotp'">
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
      </div>
      <div
        class="relative mx-10 md:mx-20 lg:mx-40 mt-20 px-5 py-5 rounded-md w-fit flex flex-col bg-gray-100"
      >
        <span class="text-xl font-bold text-gray-500 mb-3"
          >Didn't work? Try those:</span
        >
        <div class="flex flex-row">
          <router-link
            class="rounded-md shadow bg-indigo-600 hover:bg-indigo-700 px-5 py-2 ml-4"
            to="/get-started"
          >
            <div class="flex">
              <svg
                t="1609292002142"
                class="mr-2"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5549"
                width="30"
                height="30"
              >
                <path
                  d="M853.333333 170.666667 170.666667 170.666667C123.733333 170.666667 85.333333 209.066667 85.333333 256l0 512c0 46.933333 38.4 85.333333 85.333333 85.333333l682.666667 0c46.933333 0 85.333333-38.4 85.333333-85.333333L938.666667 256C938.666667 209.066667 900.266667 170.666667 853.333333 170.666667zM853.333333 341.333333l-341.333333 213.333333L170.666667 341.333333 170.666667 256l341.333333 213.333333 341.333333-213.333333L853.333333 341.333333z"
                  p-id="5550"
                  fill="#ffffff"
                ></path>
              </svg>
              <span class="text-xl text-white">Resend Email</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data: () => ({
    verification_status: "",
    timer: null,
    otp: ["", "", "", "", "", ""],
    email: null,
    register: false,
  }),
  mounted() {
    if (!this.$route.params.email) {
      this.$nam.notification.failed(
        "Context lost! Please try again",
        "We could not find the email that you've just entered."
      );
      this.$router.push("/get-started");
    }
    this.email = this.$route.params.email
    this.register = this.$route.params.register
    this.$nam.auth.requestOTP(this.email)
  },
  methods: {
    onOTPInput(event) {
      if (event.code == "Backspace") {
        try {
          event.target.previousElementSibling.focus();
        } catch {
          // Nothing
        }
      } else if (event.target.value != "") {
        try {
          event.target.nextElementSibling.focus();
        } catch {
          // Nothing
        }
      }
      return true;
      //   console.log(event);
    },
    checkOTP(event) {
      if (event.data != null) {
        this.verification_status = "checkingotp";
        this.$nam.auth
          .checkOTP(this.email, this.otp.join(''))
          .then((res) => {
            this.$nam.success(
              "Welcome back, " + res.name,
              "You will be redirected soon."
            );
            this.$router.push("/dashboard");
          })
          .catch(() => {
            this.verification_status = "incorrectotp";
          });
      }
    },
    nextAction() {
      if (this.verification_status != "correctotp") {
        return;
      }
      this.$router.push({
        name: "email_verification",
        params: {
          email: this.email,
          register: this.register == 0 ? false : true,
        },
      });
    },
  },
};
</script>