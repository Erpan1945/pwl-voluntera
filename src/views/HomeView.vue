<script setup>
    import WelcomeCard from '@/components/WelcomeCard.vue';
import Navbar from '../components/Navbar.vue';
import ActivityCard from '@/components/ActivityCard.vue';
import ActivityListCard from '@/components/ActivityListCard.vue';
import OrganizerCard from '@/components/OrganizerCard.vue';
import ReviewCard from '@/components/ReviewCard.vue';
</script>

<template>
    <Navbar />
    <div class="w-full flex flex-col justify-center items-center">
       <WelcomeCard />
       <div class="w-full max-w-9/10 !mx-auto flex !space-x-4">
          <ActivityCard />
          <OrganizerCard />
          <ActivityListCard />
          <ReviewCard />
       </div>
    </div>
</template>


<style>

body{
  background-color: #F9FAFB;
}

</style>