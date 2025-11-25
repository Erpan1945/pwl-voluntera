<script setup>
    import WelcomeCard from '@/components/WelcomeCard.vue';
    import Navbar from '../components/Navbar.vue';
    import ActivityCard from '@/components/ActivityCard.vue';
    import ActivityListCard from '@/components/ActivityListCard.vue';
    import OrganizerCard from '@/components/OrganizerCard.vue';
    import ReviewCard from '@/components/ReviewCard.vue';
    import FollowedOrganizerCard from '@/components/FollowedOrganizerCard.vue';

    import { onMounted } from 'vue';
    import { useFollowingStore } from '@/stores/followings';

    const followingStore = useFollowingStore();
    onMounted(() => {
        followingStore.fetchFollowing()
    })
    const totalFollowing = followingStore.totalFollowing;
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
                <button class="rounded-xl text text-[#4A5565] text-base !px-3 !py-2 " style="background-color: white;">Jelajahi Kegiatan</button>
            </router-link>
            <router-link to="/">
                <button class="rounded-xl text text-[#4A5565] text-base !px-3 !py-2 " style="background-color: white;">Kegiatan Saya</button>
            </router-link>
            <router-link to="/following">
                <button class="rounded-xl text text-white text-base !px-3 !py-2 " style="background-color: #155DFC;">Mengikuti</button>
            </router-link>
            <router-link to="/DaftarSaya">
                <button class="rounded-xl text text-[#4A5565] text-base !px-3 !py-2 " style="background-color: white;">Daftar Saya</button>
            </router-link>
       </div>
       <div class="w-full max-w-9/10 !mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FollowedOrganizerCard
                v-if="totalFollowing > 0"
                v-for="org in followingStore.followingList"
                :key="org.organizer_id"
                :organizer="org"
            />
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