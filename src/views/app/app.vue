<template>
  <div>
    <div class="flex flex-row">
      <vs-sidebar fixed reduce open>
        <div class="flex flex-col justify-center h-full mt-0 py-10 overflow-scroll">
          <vs-sidebar-item id="back">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.go(-1)"
              >
                <i class="bx bx-arrow-back mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">Back</span>
          </vs-sidebar-item>
          <vs-sidebar-item id="dashboard" class="mt-10">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.push('/dashboard')"
              >
                <i class="bx bxs-dashboard mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">Dashboard</span>
          </vs-sidebar-item>
          <vs-sidebar-item id="friends" class="mt-3">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.push('/friends')"
              >
                <i class="bx bxs-group mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">Friends</span>
          </vs-sidebar-item>
          <vs-sidebar-item id="box" class="mt-3">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.push('/box')"
              >
                <i class="bx bxs-box mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">My Box</span>
          </vs-sidebar-item>
          <vs-sidebar-item id="post" class="mt-3">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.push('/post')"
              >
                <i class="bx bxs-send mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">Post a new question</span>
          </vs-sidebar-item>
          <vs-sidebar-item id="me" class="mt-3">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.push('/me')"
              >
                <i class="bx bxs-user-account mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">My Profile</span>
          </vs-sidebar-item>
          <vs-sidebar-item id="settings" class="mt-3">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.push('/settings')"
              >
                <i class="bx bxs-cog mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">Settings</span>
          </vs-sidebar-item>
          <vs-sidebar-item id="logout" class="mt-3">
            <template #icon>
              <div
                class="w-full h-full flex flex-col justify-center"
                @click="$router.push('/logout')"
              >
                <i class="bx bxs-exit mx-auto"></i>
              </div>
            </template>
            <span class="font-extrabold">Log out</span>
          </vs-sidebar-item>
        </div>
      </vs-sidebar>
      <div class="" style="margin-right: 50px">
        <!-- Pseudo element to hold the space for vs-sidebar -->
      </div>
      <transition name="slide-left">
        <router-view class="w-full"></router-view>
      </transition>
    </div>
    <nam-footer></nam-footer>
  </div>
</template>

<script>
import namFooter from "../../components/nam-footer.vue";
export default {
  components: { namFooter },
};
</script>

<style>
</style>