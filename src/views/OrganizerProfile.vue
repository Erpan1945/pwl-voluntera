<script setup>
    import Navbar from '@/components/Navbar.vue';
    import { useRouter, useRoute } from 'vue-router';
    import { ref, computed, onMounted } from 'vue';
    import { useFollowingStore } from '../stores/followings';
    import { useAuthStore } from '@/stores/auth';
    const router = useRouter();

    function goBack() {
        router.back();
    }    
    const authStore = useAuthStore();
    const followingStore = useFollowingStore()
    const isLoading = ref(true);

    onMounted(async () => {
        await authStore.fetchUserProfile();
        if(!authStore.isLoggedIn){
            alert("Anda Belum Login.")
            return router.push('/loginCoba')
        }
        if(authStore.userType !== "organizer"){
            alert("Anda Tidak Memiliki Akses.")
            return router.push('/loginCoba')
        }
        await followingStore.fetchFollowing()
        isLoading.value = false
    })
    const totalFollower = computed(() => followingStore.followingList.length) 
</script>

<template>
    <Navbar />

    <div v-if="isLoading" class="text-center py-20 text-gray-500">
        Memuat data...
    </div>

    <div v-else class="w-full max-w-3/4 !mx-auto !mt-4">
        <div class="flex">
            <img src="../assets/BackIcon.svg" @click="goBack()"/>
            <p class="text text-base text-[#4A5565] !ml-2">Kembali</p>
        </div>

        <div class="w-full flex !mx-auto p-5 rounded-lg border border-black/10 !mt-2" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
            <div class="flex flex-1">
                <div class="!mr-4 items-center">
                    <img src="../assets/OrganizerProfile.svg" class="lg:w-[6rem] lg:h-[6rem]"></img>
                </div>

                <div class="self-center">
                    <div class="w-full flex !space-x-3">
                        <h1 class="!text-xl text text-black">{{ authStore.user?.name }}</h1>
                        <button class="text !text-sm text-[#1447E6] !py-1 !px-3 rounded-xl" style="background-color: #DBEAFE;">
                            Penyelenggara
                        </button>
                    </div>
                    <p class="text !text-base text-[#4A5565]">{{ authStore.user?.email }}</p>
                    <RouterLink :to="`/follower/${authStore.user?.id}`" class="inline-block max-w-fit">
                        <p class="text text-[#4A5565] max-w-fit">
                        <span class="!font-bold">{{ totalFollower }}</span> Pengikut
                        </p>
                    </RouterLink>
                </div>
            </div>
        </div>

        
        <div class="w-full !mx-auto p-5 rounded-lg border border-black/10 !mt-6" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
            <h1 class="text !text-lg text-black !mb-6">Informasi Profil</h1>

            <div>
                <label class="text text-[#364153]">Nama Organisasi</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerProfileIcon.svg" class="max-w-5 !mr-3"/>
                    <p class="text text-black">{{ authStore.user?.name }}</p>
                </div>

                <label class="text text-[#364153]">Email</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerEmailIcon.svg" class="max-w-5 !mr-3"/>
                    <p class="text text-black">{{authStore.user?.email}}</p>
                </div>

                <label class="text text-[#364153]">Nomor Telepon</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerPhoneIcon.svg" class="max-w-5 !mr-3"/>
                    <p class="text text-black">{{authStore.user?.phone_number}}</p>
                </div>
            </div>
        </div>
    </div>
</template>