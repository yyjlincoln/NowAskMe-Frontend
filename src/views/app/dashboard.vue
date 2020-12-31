<template>
  <div>
    <nam-page :unbounded="true">
      <div class="flex flex-row">
        <div>
          <nam-text subtitle="Dashboard" :title="globalTitle"></nam-text>
          <div class="mt-10">
            <span class="text-3xl font-extrabold">New messages...</span>
            <div class="flex flex-row flex-wrap">
              <nam-area :title="'Hey ' + $nam.user.name + ' 👋,'">
                <span></span>
                <span>Nowask.me is still under development.</span>
              </nam-area>
              <nam-area :title="'Diagnostics ⛏'" config_class="max-w-3xl max-h-md">
                <span class="font-bold">Do not share the following info as others might be able to log in to your account! 😈</span>
                <span>Connected to: {{$nam.server}}</span>
                <span>Name: {{$nam.user.name}}</span>
                <span>UUID: {{$nam.user.uuid}}</span>
                <span>Token: {{$nam.user.token}}</span>

              </nam-area>
            </div>
          </div>
        </div>
        <div>
          <!-- Content -->
        </div>
      </div>
    </nam-page>
    <nam-footer></nam-footer>
  </div>
</template>

<script>
import NamPage from "../../components/nam-page.vue";
import namText from "../../components/nam-text.vue";
import NamArea from "../../components/nam-area.vue";
import NamFooter from "../../components/nam-footer.vue";
export default {
  components: { namText, NamPage, NamArea, NamFooter },
  data: () => ({
    globalTitle: "Loading status...",
  }),
  computed: {},
  mounted() {
    this.globalTitle = this.randomGreetings() + this.$nam.user.name+" 👋";
  },
  methods: {
    randomGreetings() {
      const Greetings = [
        "What’s up, ",
        "How’s your day going, ",
        "G'day, ",
        "Yo, ",
        "Whazzup, ",
      ];
      return Greetings[Math.floor(Math.random() * Greetings.length)];
    },
  },
};
</script>

<style>
</style>