<template>
  <div>
    <nam-page>
      <nam-text subtitle="Add a friend" title="Search for a user"></nam-text>
      <form @submit.capture.prevent="search">
        <div
          class="shadow my-5 md:my-10 w-full flex items-center justify-center border text-base font-medium rounded-md bg-gray-200 ontline-none"
        >
          <input
            class="relative w-full h-10 my-2 rounded-md bg-transparent text-left font-xl font-extrabold px-3 text-3xl md:text-2xl text-gray-600 ontline-none"
            type="text"
            placeholder="Search by entering their username, userid or uuid"
            @input="searchDelayed"
            v-model="term"
          />
        </div>
      </form>
      <div class="flex flex-row flex-wrap w-full">
        <nam-user
          v-for="user in users"
          :key="user.uuid"
          :user="user"
        ></nam-user>
      </div>
      <transition name="fade">
        <nam-loading
          v-if="loading || target != loaded"
          :as_full_page="false"
          :show_logo="false"
          status="Updating results..."
        ></nam-loading
      ></transition>
      <nam-tools title="Search options">
        <div class="flex flex-col">
          <p class="font-bold">Only search with:</p>
          <div class="flex flex-row">
            <a href="#" @click.prevent="term = '#'" class="mr-2 underline">userid</a>
            <a href="#" @click.prevent="term = '!'" class="mx-2 underline">name</a>
            <a href="#" @click.prevent="term = '$'" class="mx-2 underline"
              >exact uuid</a
            >
          </div>
        </div>
      </nam-tools>
      <nam-tools title="Adding others?">
        <div class="flex flex-col">
          <p>Your username is: {{ this.$nam.user.name }}</p>
          <p>Your userid is: {{ this.$nam.user.userid }}</p>
          <p>
            If nothing else works, try searching with your uuid:
            {{ this.$nam.user.uuid }}
          </p>
        </div>
      </nam-tools>
    </nam-page>
  </div>
</template>

<script>
import Vue from "vue";
import namPage from "../../components/nam-page.vue";
import NamText from "../../components/nam-text.vue";
import NamUser from "../../components/nam-user.vue";
import NamLoading from "../../components/nam-loading.vue";
import NamTools from "../../components/nam-tools.vue";
export default {
  components: { namPage, NamText, NamUser, NamLoading, NamTools },
  data: () => ({
    results: [],
    term: "",
    _timer: null,
    users: [],
    loading: false,
    target: 0,
    loaded: 0,
  }),
  methods: {
    searchDelayed() {
      this.loading = true;
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      this._timer = setTimeout(() => {
        this.search();
      }, 800);
    },
    search() {
      clearTimeout(this._timer);
      this.loading = true;
      this.$nam.useractions
        .search(this.term)
        .then((res) => {
          this.results = res;
          this.loaded = 0;
          this.loading = false;
          this.target = res.length;
          let f = (index, term) => {
            this.$nam.useractions
              .getUserProfile(this.results[index])
              .then((res) => {
                if (term == this.term) {
                  this.loaded += 1;
                  Vue.set(this.users, index, res);
                }
              });
          };
          this.users = [];
          for (var index in this.results) {
            f(index, this.term);
          }
        })
        .catch(() => {
          this.$nam.notification.failed(
            "Failed to search.",
            "An error occured."
          );
        });
    },
  },
};
</script>

<style>
</style>