<script setup>
    import WelcomeCard from '@/components/WelcomeCard.vue';
    import Navbar from '../components/Navbar.vue';
    import ActivityCard from '@/components/ActivityCard.vue';
    import ActivityListCard from '@/components/ActivityListCard.vue';
    import OrganizerCard from '@/components/OrganizerCard.vue';
    import ReviewCard from '@/components/ReviewCard.vue';
    import FollowedOrganizerCard from '@/components/FollowedOrganizerCard.vue';

    import { onMounted, computed } from 'vue';
    import { useFollowingStore } from '@/stores/followings';
    import { useAuthStore } from '@/stores/auth';
    import router from '@/router';

    const followingStore = useFollowingStore();
    const authStore = useAuthStore();

    onMounted(async () => {
        await authStore.fetchUserProfile();
        if(!authStore.isLoggedIn){
            alert("Anda Belum Login.")
            return router.push('/loginCoba')
        }
        if(authStore.userType !== "volunteer"){
            alert("Anda Tidak Memiliki Akses.")
            return router.push('/loginCoba')
        }
        await followingStore.fetchFollowing()
    })
    const totalFollowing = computed(() => followingStore.followingList.length) 
    
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
            <router-link to="/jelajahi">
                <button class="rounded-xl text text-[#4A5565] text-base !px-3 !py-2 " style="background-color: white;">Jelajahi Kegiatan</button>
            </router-link>
            <router-link to="/">
                <button class="rounded-xl text text-[#4A5565] text-base !px-3 !py-2 " style="background-color: white;">Kegiatan Saya</button>
            </router-link>
            <router-link to="/following">
                <button class="rounded-xl text text-white text-base !px-3 !py-2 " style="background-color: #155DFC;">Mengikuti</button>
            </router-link>
            <router-link to="/activity_lists">
                <button class="rounded-xl text text-[#4A5565] text-base !px-3 !py-2 " style="background-color: white;">Daftar Saya</button>
            </router-link>
       </div>
       <div class="w-full max-w-9/10 !mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <template v-if="totalFollowing > 0">
                <FollowedOrganizerCard
                    v-for="org in followingStore.followingList"
                    :key="org.organizer_id"
                    :organizer="org"
                />
            </template>
            <p v-else class="text-gray-500 text-center col-span-3 py-10">
                Kamu belum mengikuti organisasi mana pun.
            </p>
       </div>
    </div>
</template>


<style>

body{
  background-color: #F9FAFB;
}

</style>