<script setup>
import Navbar from '@/components/Navbar.vue'
import ActivityThumbnail from '@/components/ActivityThumbnail.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMarkahStore } from '@/stores/lists'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useMarkahStore()

const listId = route.params.id
const list = ref(null)

const goBack = () => router.go(-1)

// ambil detail list (sederhana, karena backend blm detail endpoint)
onMounted(async () => {
  if (!store.lists.length) {
    const volunteerId = localStorage.getItem("volunteer_id")
    await store.fetchAllLists(volunteerId)
  }

  list.value = store.lists.find(l => l.id == listId)
})

const removeActivity = async (activityId) => {
  await store.remove(activityId, listId);

  list.value.activities = list.value.activities.filter(
    a => a.activity_id !== activityId
  );
};
</script>

<template>
  <Navbar />

  <div class="w-full mt-10 px-[128px]">

    <!-- Tombol Kembali -->
    <button 
      @click="goBack"
      class="text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-4 no-underline bg-transparent border-0"
    >
      ← Kembali
    </button>

    <!-- Judul + Icon Edit -->
    <div class="flex items-center gap-3 mb-6">
      <h1 class="text-2xl font-bold">
        {{ list?.name }}
      </h1>

      <!-- Icon Edit -->
      <button 
      class="text-gray-400 hover:text-gray-600"
      @click="$router.push(`/activity_lists/${list.id}/edit`)"
    >
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    </button>
    </div>

    <!-- Grid Activities -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <ActivityThumbnail
        v-for="act in list?.activities"
        :key="act.id"
        :id="act.activity_id"
        :image="act.image"
        :status="act.status"
        :category="act.category"
        :title="act.title"
        :description="act.description"
        :location="act.location"
        :date="act.date"
        :participants="act.participants"
        :quota="act.quota"
        :rating="act.rating"
        :reviews="act.reviews"
        :organizer="act.organizer"
        @delete="removeActivity"
      />

    </div>


  </div>
</template>
