<script setup>
import WelcomeCard from '@/components/WelcomeCard.vue';
import Navbar from '../components/Navbar.vue';
import ActivityCard from '@/components/ActivityCard.vue';
import ActivityListCard from '@/components/ActivityListCard.vue';
import OrganizerCard from '@/components/OrganizerCard.vue';
import ReviewCard from '@/components/ReviewCard.vue';

import axios from "axios";
import { ref, onMounted, computed } from "vue";

const activities = ref([]);
const searchQuery = ref("");

// Fetch data activities
const fetchActivities = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/activities");
        activities.value = res.data.data;
    } catch (err) {
        console.error("Gagal load kegiatan:", err);
    }
};

// Filter pencarian lokal
const filteredActivities = computed(() => {
    const q = searchQuery.value.toLowerCase();

    return activities.value.filter(a =>
        a.name?.toLowerCase().includes(q) ||
        a.location?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q)
    );
});

onMounted(fetchActivities);
</script>

<template>
    <Navbar />

    <div class="w-full flex flex-col">
        
        <!-- WELCOME -->
        <WelcomeCard />

        <!-- 4 MINI CARD -->
        <div class="w-full max-w-9/10 !mx-auto flex !space-x-4">
            <ActivityCard />
            <OrganizerCard />
            <ActivityListCard />
            <ReviewCard />
        </div>

        <!-- TAB MENU -->
        <div class="w-full max-w-9/10 !mx-auto flex !space-x-4 !mt-4">
            <router-link to="/jelajahi">
                <button class="rounded-xl text-white text-base px-3 py-2" style="background-color:#155DFC;">
                    Jelajahi Kegiatan
                </button>
            </router-link>

            <router-link to="/">
                <button class="rounded-xl text-[#4A5565] text-base px-3 py-2 bg-white">
                    Kegiatan Saya
                </button>
            </router-link>

            <router-link to="/following">
                <button class="rounded-xl text-[#4A5565] text-base px-3 py-2 bg-white">
                    Mengikuti
                </button>
            </router-link>

            <router-link to="/DaftarSaya">
                <button class="rounded-xl text-[#4A5565] text-base px-3 py-2 bg-white">
                    Daftar Saya
                </button>
            </router-link>
        </div>

        <!-- SEARCH BAR (margin seperti gambar 50.698px) -->
        <div class="mt-[16px] mx-[50.7px]">
            <div class="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
                <input 
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari kegiatan..."
                    class="flex-1 outline-none text-gray-600 placeholder-gray-400"
                />
                <img src="/src/assets/search.svg" class="w-5 opacity-50" />
            </div>
        </div>

        <!-- GRID KEGIATAN -->
        <div class="w-full max-w-9/10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-10">

            <ActivityListCard 
                v-for="item in filteredActivities"
                :key="item.id"
                :activity="item"
            />

        </div>

    </div>
</template>

<style>
body {
    background-color: #F9FAFB;
}
</style>
