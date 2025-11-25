<script setup>
    import WelcomeCard from '@/components/WelcomeCard.vue';
    import Navbar from '../components/Navbar.vue';
    import ActivityCard from '@/components/ActivityCard.vue';
    import ActivityListCard from '@/components/ActivityListCard.vue';
    import OrganizerCard from '@/components/OrganizerCard.vue';
    import ReviewCard from '@/components/ReviewCard.vue';
    import FollowedOrganizerCard from '@/components/FollowedOrganizerCard.vue';
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
            <router-link to="/">
                <button class="rounded-xl text text-white text-base !px-3 !py-2 " style="background-color: #155DFC;">Mengikuti</button>
            </router-link>
            <router-link to="/">
                <button class="rounded-xl text text-[#4A5565] text-base !px-3 !py-2 " style="background-color: white;">Daftar Saya</button>
            </router-link>
       </div>
       <div class="w-full max-w-9/10 !mx-auto grid grid-cols-3 gap-5">    
       </div>
    </div>
</template>


<style>

body{
  background-color: #F9FAFB;
}

</style>