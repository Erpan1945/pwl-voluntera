<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getActivityDetail } from "@/services/listServices"

const route = useRoute()
const activityId = route.params.id

const activity = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await getActivityDetail(activityId)
    activity.value = res.data.data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-10">

    <div v-if="loading">Memuat detail kegiatan...</div>

    <div v-else-if="activity">

      <h1 class="text-2xl font-bold mb-4">{{ activity.title }}</h1>

      <img
        :src="activity.thumbnail"
        alt=""
        class="w-full h-64 object-cover rounded-lg mb-6"
      />

      <p class="text-gray-700 mb-4">
        {{ activity.description }}
      </p>

      <div class="text-gray-600 space-y-1">
        <p><strong>Lokasi:</strong> {{ activity.location }}</p>
        <p><strong>Status:</strong> {{ activity.status }}</p>
        <p><strong>Tanggal Mulai:</strong> {{ activity.activity_start_date }}</p>
        <p><strong>Tanggal Selesai:</strong> {{ activity.activity_end_date }}</p>
      </div>

    </div>

  </div>
</template>
