<script setup>
    import UnfollowModal from './UnfollowModal.vue';
    import { ref } from 'vue'

    const isModalOpen = ref(false)

    const handleUnfollow = () => {
    console.log('User berhenti mengikuti yayasan!')
    isModalOpen.value = false
    }
</script>

<template>
    <div class="w-full flex flex-col !py-10 !px-5 rounded-lg border border-black/10 !mt-6" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
        <router-link to="/OrganizerProfile">
            <div class="w-full flex !mb-5">
                <img src="../assets/OrganizerProfile.svg" class="!mr-3">
                <div>
                    <h1 class="text text-black !text-base md:!text-sm">Yayasan Peduli Sesama</h1>
                    <p class="text text-[#4A5565] !text-sm">Diikuti sejak 10/1/2025</p>
                </div>
            </div>
        </router-link>
        <div class="w-full flex !space-x-2">
            <button class="w-full !py-2 rounded-lg text-center" style="background-color: #F3F4F6; color: #364153;" @click="isModalOpen = true">Berhenti Mengikuti</button>
            <button class="w-full max-w-1/6 !py-2 rounded-lg flex items-center justify-center" style="background-color: #F3F4F6;">
                <img src="../assets/NotificationOn.svg">
            </button>
        </div>
    </div>

    <UnfollowModal 
        v-model:show="isModalOpen"
        organizationName="Yayasan Peduli Sesama"
        @confirm="handleUnfollow"
    />
</template>
