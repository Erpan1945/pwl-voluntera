<template>
    <div class="w-full max-w-9/10 !mx-auto p-5 rounded-lg border border-black/10 !mt-6" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
        <h1 v-if="authStore.user" class="text text-black !text-2xl md:!text-xl !mb-2">Selamat Datang, {{authStore.user.name}}!</h1>
        <h1 v-else class="text text-black !text-2xl md:!text-xl !mb-2">Selamat Datang!</h1>
        <p class="text text-[#4A5565] !text-base md:!text-sm">Temukan kegiatan relawan yang sesuai dengan minat </p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
onMounted(() => {
    authStore.fetchUserProfile
})
</script>
