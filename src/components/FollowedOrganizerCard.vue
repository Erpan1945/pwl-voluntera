<script setup>
    import UnfollowModal from './UnfollowModal.vue';
    import { ref, computed } from 'vue';
    import { useFollowingStore } from '../stores/followings';
    import NotificationOn from '../assets/NotificationOn.svg'
    import NotificationOff from '../assets/NotificationOff.svg'

    const props = defineProps({
        organizer: Object // data satu organisasi
    })

    const followingStore = useFollowingStore()
    const isModalOpen = ref(false)

    const handleUnfollow = async () => {
        await followingStore.removeFollow(props.organizer.organizer_id)
        isModalOpen.value = false
    }
    const notificationState = computed(() => props.organizer?.pivot?.notification === 1);

    const UpdateNotification = async(id) => {
        const newValue = notificationState.value ? 0 : 1;
        await followingStore.notifyFollow(id, { notification: newValue });
        alert(
            newValue === 1
            ? 'Anda berhasil menghidupkan notifikasi!'
            : 'Anda berhasil mematikan notifikasi!'
        );
    };
    
</script>

<template>
    <div class="w-full flex flex-col !py-10 !px-5 rounded-lg border border-black/10 !mt-6" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
        <router-link :to="`/OrganizerProfile/${organizer.organizer_id}`">
            <div class="w-full flex !mb-5">
                <img :src="organizer.logo" class="!mr-3 !max-w-12">
                <div>
                    <h1 class="text text-black !text-base md:!text-sm">{{ organizer.name }}</h1>
                    <p class="text text-[#4A5565] !text-sm">
                        Diikuti sejak {{ organizer.pivot.created_at.substring(0, 10) }}
                    </p>
                </div>
            </div>
        </router-link>
        <div class="w-full flex !space-x-2">
            <button class="w-full !py-2 rounded-lg text-center" style="background-color: #F3F4F6; color: #364153;" @click="isModalOpen = true">Berhenti Mengikuti</button>
            <button class="w-full max-w-1/6 !py-2 rounded-lg flex items-center justify-center" style="background-color: #F3F4F6;" @click="UpdateNotification(organizer.organizer_id)">
                <img :src="notificationState? NotificationOn : NotificationOff" >
            </button>
        </div>
    </div>

    <UnfollowModal 
        v-model:show="isModalOpen"
        :organizationName="organizer.name"
        @confirm="handleUnfollow"
    />
</template>
