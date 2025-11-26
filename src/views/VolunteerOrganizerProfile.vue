<script setup>
    import UnfollowModal from '../components/UnfollowModal.vue';
    import Navbar from '@/components/Navbar.vue';
    import { useRouter, useRoute } from 'vue-router';
    import { ref, computed, onMounted } from 'vue';
    import { useFollowingStore } from '../stores/followings';
    import NotificationOn from '../assets/NotificationOn.svg';
    import NotificationOff from '../assets/NotificationOff.svg';
    import { useAuthStore } from '@/stores/auth';
    const router = useRouter();
    const route = useRoute();

    function goBack() {
        router.back();
    }
    
    const authStore = useAuthStore();

    const followingStore = useFollowingStore()
    const isModalOpen = ref(false)
    const organizerId = route.params.id

    const organizer = computed(() => {
        return followingStore.followingList.find(org => org.organizer_id == organizerId) || null;
    });

    const handleUnfollow = async () => {
        await followingStore.removeFollow(organizerId)
        router.push('/following');
        isModalOpen.value = false
    }
    const notificationState = computed(() => organizer.value?.pivot?.notification === 1);

    const UpdateNotification = async() => {
        const newValue = notificationState.value ? 0 : 1;
        await followingStore.notifyFollow(organizerId, { notification: newValue });
        alert(
            newValue === 1
            ? 'Anda berhasil menghidupkan notifikasi!'
            : 'Anda berhasil mematikan notifikasi!'
        );
    };

    onMounted(async () => {
        if (followingStore.followingList.length === 0) {
            await followingStore.fetchFollowing();
        }

        await followingStore.fetchFollower(organizerId);

        await authStore.fetchUserProfile();
        if(!authStore.isLoggedIn){
            alert("Anda Belum Login.")
            return router.push('/loginCoba')
        }
        if(authStore.userType !== "volunteer"){
            alert("Anda Tidak Memiliki Akses.")
            return router.push('/loginCoba')
        }
    });

    const totalFollower = computed(() => followingStore.followerList.length);
</script>

<template>
    <Navbar />
    <div class="w-full max-w-3/4 !mx-auto !mt-4">
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
                    <div v-if="organizer" class="w-full flex !space-x-3">
                        <h1 class="!text-xl text text-black">{{ organizer?.name }}</h1>
                        <button class="text !text-sm text-[#1447E6] !py-1 !px-3 rounded-xl" style="background-color: #DBEAFE;">
                            Penyelenggara
                        </button>
                    </div>
                    <p class="text !text-base text-[#4A5565]">{{ organizer?.email }}</p>
                    <RouterLink :to="`/follower/${organizerId}`" class="inline-block max-w-fit">
                        <p class="text text-[#4A5565] max-w-fit">
                        <span class="!font-bold">{{ totalFollower }}</span> Pengikut
                        </p>
                    </RouterLink>
                </div>
            </div>
            
            <div class="flex items-end space-x-2">
                <div class="flex items-end ml-auto space-x-2">
                    <button class="flex justify-center items-center !px-4 !py-2 rounded-xl text-center self-end !mr-3" style="background-color: #E5E7EB; color: #364153;" @click="isModalOpen = true">
                        <img src="../assets/OrganizerIconBlack.svg" class="max-w-4 max-h-4 !mr-2"></img>
                        Mengikuti
                    </button>
                    <button class="!px-4 !py-2  rounded-lg flex items-center justify-center" style="background-color: #E5E7EB;" @click="UpdateNotification">
                        <img :src="notificationState ? NotificationOn : NotificationOff" class="max-w-10 max-h-10 p-[2px]">
                    </button>
                </div>
            </div>
        </div>

        
        <div class="w-full !mx-auto p-5 rounded-lg border border-black/10 !mt-6" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
            <h1 class="text !text-lg text-black !mb-6">Informasi Profil</h1>

            <div>
                <label class="text text-[#364153]">Nama Organisasi</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerProfileIcon.svg" class="max-w-5 !mr-3"/>
                    <p class="text text-black">{{ organizer?.name }}</p>
                </div>

                <label class="text text-[#364153]">Email</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerEmailIcon.svg" class="max-w-5 !mr-3"/>
                    <p class="text text-black">{{organizer?.email}}</p>
                </div>

                <label class="text text-[#364153]">Nomor Telepon</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerPhoneIcon.svg" class="max-w-5 !mr-3"/>
                    <p class="text text-black">{{organizer?.phone_number}}</p>
                </div>

                <label class="text text-[#364153]">Kota</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerLocationIcon.svg" class="max-w-5 !mr-3"/>
                    <p class="text text-black">{{ organizer?.city }}</p>
                </div>

                <label class="text text-[#364153]">Tanggal Berdiri</label>
                <div class="flex items-center !mb-4">
                    <img src="../assets/OrganizerTimeIcon.svg" class="max-w-5 !mr-3" />
                    <p class="text text-black">{{ organizer?.date_of_establishment }}</p>
                </div>

                <label class="text text-[#364153]">Deskripsi Organisasi</label>
                <div class="flex items-center !mb-4">
                    <p class="text text-black">{{ organizer?.description}}</p>
                </div>
            </div>
        </div>
    </div>

    <UnfollowModal 
        v-model:show="isModalOpen"
        :organizationName="organizer?.name"
        @confirm="handleUnfollow"
    />
</template>