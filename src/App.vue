<template>
  <div id="app">
    <transition :name="transition_name" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
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
</style>

<script>
import "tailwindcss/tailwind.css";

export default {
  name: "App",
  components: {},
  data: () => ({
    transition_name: "fade",
    lastPath: "/",
  }),
  watch: {
    // $route: function (before, after) {
    //   if (after.path.split("/").length >= before.path.split("/").length && after.path!=this.lastPath) {
    //     this.transition_name = "slide-left";
    //   } else {
    //     this.transition_name = "slide-right";
    //   }
    //   this.lastPath = after.path
    // },
  },
};
</script>
