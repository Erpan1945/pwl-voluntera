<script setup>
import Navbar from '@/components/Navbar.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useFollowingStore } from '../stores/followings';

const router = useRouter();
const route = useRoute();

function goBack() {
  router.back();
}

const followingStore = useFollowingStore()
const organizerId = route.params.id

onMounted(async () => {
    if (followingStore.followerList.length === 0) {
        await followingStore.fetchFollower(organizerId);
    }
});
</script>

<template>
    <Navbar />
    <div class="w-full max-w-3/4 !mx-auto !mt-4">
        <button @click="goBack()">
            <div class="flex">
                <img src="../assets/BackIcon.svg"/>
                <p class="text text-base text-[#4A5565] !ml-2">Kembali</p>
            </div>
        </button>

        <h1 class="text font-bold !text-xl text-black !mt-2">Pengikut</h1>

        <div class="w-full !mx-auto p-5 rounded-lg border border-black/10 !mt-1" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
            <div v-for="follower in followingStore.followerList" :key="follower.volunteer_id" class="w-full mx-12 flex !mb-4">
                <img src="../assets/FollowerProfile.svg" class="max-w-[44px] !mr-8" />
                
                <div>
                    <h1 class="text !text-xl text-black">{{ follower.name }}</h1>
                    <p class="text !text-base text-[#4A5565]">{{ follower.email }}</p>
                </div>
            </div>
        </div>
    </div>
</template>