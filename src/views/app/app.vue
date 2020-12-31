<template>
  <div>
    <vs-sidebar fixed reduce open>
        <vs-sidebar-item id="back" class="mt-10">
          <template #icon>
            <i class='bx bx-arrow-back' @click="$router.go(-1)"></i>
          </template>
          <span class="font-extrabold">Back</span>
        </vs-sidebar-item>
        <vs-sidebar-item id="dashboard" class="mt-10">
          <template #icon>
            <i class='bx bxs-dashboard' @click="$router.push('/dashboard')"></i>
          </template>
          <span class="font-extrabold">Dashboard</span>
        </vs-sidebar-item>
        <vs-sidebar-item id="friends" class="mt-3" >
          <template #icon>
            <i class='bx bxs-group' @click="$router.push('/friends')"></i>
          </template>
          <span class="font-extrabold">Friends</span>
        </vs-sidebar-item>
        <vs-sidebar-item id="box" class="mt-3">
          <template #icon>
            <i class='bx bxs-box' @click="$router.push('/box')"></i>
          </template>
          <span class="font-extrabold">My Box</span>
        </vs-sidebar-item>
    </vs-sidebar>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>