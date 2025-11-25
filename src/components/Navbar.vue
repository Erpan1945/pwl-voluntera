<template>
  <nav class="w-full mx-auto" style="height: 90px; background-color: #fff;">
    <div class="w-full !mx-6 relative h-full">

      <!-- Logo -->
      <div class="absolute left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2">
        <router-link to="/">
          <img src="../assets/Logo.svg" alt="Voluntera logo">
        </router-link>
      </div>

      <!-- Right -->
      <div class="md:flex absolute right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 space-x-6">

        <button
          class="flex px-3 md:px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-xs md:text-sm lg:text-base font-medium"
          style="color: #155DFC; background-color: #EFF6FF;"
        >
          <img src="../assets/dashboard.svg" class="!mr-2" alt="Dashboard">
          Dashboard
        </button>

        <button
          class="flex justify-center items-center px-3 md:px-4 lg:px-6 py-2 lg:py-3 text-xs md:text-sm lg:text-base font-medium h-full !space-x-2"
          style="color: #4A5565; background-color: transparent;"
        >
          <img src="../assets/profileIcon.svg" class="!mr-2" alt="profile">
          <p class="text-base font-medium">Profile</p>

          <div class="w-[1px] h-[20px]" style="background-color: #4A5565;"></div>
          <p class="text-base font-medium">{{ userName }}</p>
        </button>

        <!-- KELUAR -->
        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="flex px-3 md:px-4 lg:px-6 py-2 lg:py-3 text-xs md:text-sm lg:text-base font-medium h-full"
          style="color: #E7000B; background-color: transparent;"
        >
          <img src="../assets/exitIcon.svg" class="!mr-2" alt="exit">
          Keluar
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const isLoggedIn = auth.isLoggedIn;
const userName = auth.user.name;

const handleLogout = () => {
  auth.logout();
  router.push("/logincoba");
};
</script>

<style scoped>
nav {
  display: flex;
  gap: 10px;
}
</style>
