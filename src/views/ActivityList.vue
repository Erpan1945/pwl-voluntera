<script setup>
import WelcomeCard from '@/components/WelcomeCard.vue';
import Navbar from '../components/Navbar.vue';
import OrganizerCard from '@/components/OrganizerCard.vue';
import ActivityCard from '@/components/ActivityCard.vue';
import ReviewCard from '@/components/ReviewCard.vue';
import VolunteerListCard from '@/components/VolunteerListCard.vue';

import { useMarkahStore } from '@/stores/lists';
import { onMounted } from 'vue';

const store = useMarkahStore();
const volunteerId = localStorage.getItem('volunteer_id'); // sesuaikan sumber ID

onMounted(() => {
  store.fetchAllLists(volunteerId);
});
</script>

<template>
  <Navbar />
  <div class="w-full flex flex-col">
    <WelcomeCard />

    <div class="w-full max-w-9/10 !mx-auto flex !space-x-4">
      <ActivityCard />
      <OrganizerCard />
      <ActivityListCard />
      <ReviewCard />
    </div>

    <div class="w-full max-w-9/10 !mx-auto flex !space-x-4 !mt-4">
      <router-link to="/">
        <button class="rounded-xl text-[#4A5565] text-base px-3 py-2 bg-white">Jelajahi Kegiatan</button>
      </router-link>
      <router-link to="/">
        <button class="rounded-xl text-[#4A5565] text-base px-3 py-2 bg-white">Kegiatan Saya</button>
      </router-link>
      <router-link to="/following">
        <button class="rounded-xl text-[#4A5565] text-base px-3 py-2 bg-white">Mengikuti</button>
      </router-link>
      <router-link to="/DaftarSaya">
        <button class="rounded-xl text-white text-base px-3 py-2 bg-[#155DFC]">Daftar Saya</button>
      </router-link>
    </div>

    <div class="w-full max-w-9/10 !mx-auto !mt-4">
      <router-link to="/form-daftar-baru">
        <button class="rounded-xl text-white text-base px-4 py-2 bg-[#155DFC]">Buat Daftar Baru</button>
      </router-link>
    </div>

    <!-- LIST CARD LOOP -->
    <div class="w-full max-w-9/10 !mx-auto flex flex-col gap-4 !mt-4 !mb-4">

      <!-- Jika list kosong -->
      <p v-if="store.lists.length === 0" class="text-gray-500 text-center py-6">
        Anda tidak memiliki Daftar Aktivitas
      </p>

      <!-- Jika list ada -->
      <VolunteerListCard
        v-else
        v-for="list in store.lists"
        :key="list.id"
        :list="list"
      />
    </div>
  </div>
</template>

<style>
body {
  background-color: #F9FAFB;
}
</style>
