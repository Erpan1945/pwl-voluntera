<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getActivityDetail } from "@/services/listServices"
import { useFollowingStore } from "@/stores/followings"
import Navbar from "@/components/Navbar.vue"

// Components
import SavetoListButton from "@/components/SavetoListButton.vue"
import PopUpActivityList from "@/components/PopUpActivityList.vue"

const activity = ref(null)
const loading = ref(true)
const followingStore = useFollowingStore();

const route = useRoute();
const activityId = route.params.id;

onMounted(async () => {
  try {
    const res = await getActivityDetail(activityId)
    activity.value = res.data.data
    await followingStore.fetchFollowing()
  } finally {
    loading.value = false
  }
})

const handleUnfollow = (async ($id) => {
  try{
    await followingStore.removeFollow($id);
  }finally{
    alert("Anda berhasil berhenti mengikuti penyelenggara")
  }
})

const handleFollow = (async ($data) => {
  try{
    await followingStore.addFollow($data);
  }finally{
    alert("Anda berhasil mengikuti penyelenggara")
  }
})


// Popup State
const showPopup = ref(false)

const openPopup = () => {
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}
</script>

<template>
  <Navbar />
  <div class="w-full max-w-3/4 !mx-auto !mt-4">
        <button @click="goBack()">
            <div class="flex">
                <img src="../assets/BackIcon.svg"/>
                <p class="text text-base text-[#4A5565] !ml-2">Kembali</p>
            </div>
        </button>
        
        <div class="w-full !mx-auto p-5 rounded-lg border border-black/10 !mt-1" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">      
            <div class="p-10">

              <div v-if="loading">Memuat detail kegiatan...</div>

              <div v-else-if="activity">

                <h1 class="text-2xl font-bold mb-4">{{ activity.title }}</h1>

                <!-- Posisi tombol di kanan -->
                <div class="w-full flex justify-end relative">

                  <!-- BUTTON -->
                  <SavetoListButton @open-popup="openPopup" />

                  <!-- POPUP (posisi absolute terhadap container ini) -->
                  <PopUpActivityList
                    v-if="showPopup"
                    @close="closePopup"
                    class="absolute top-full right-0 mt-2"
                  >
                    <p class="text-gray-700">
                      Ini isi popup. Nanti bisa diganti pilihan list.
                    </p>
                  </PopUpActivityList>
                </div>

                <img
                  :src="activity.thumbnail"
                  alt=""
                  class="w-full h-64 object-cover rounded-lg mb-6"
                />

                <div class="w-full !mx-auto !p-3" style="background-color: #F9FAFB; color: black;">
                    <div class="w-full flex justify-between items-center !py-10 !px-5 rounded-lg border border-black/10 !mt-6" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
                      <router-link :to="`/OrganizerProfile/${activity.organizer_id}`">
                          <div class="w-full flex items-center !mb-5">
                              <img :src="activity.organizer.logo" class="!mr-3 !max-w-12">
                              <div>
                                  <p class="text text-[#4A5565] !text-sm">
                                      Diselenggarakan Oleh 
                                  </p>
                                  <h1 class="text text-black !text-base md:!text-sm">{{ activity.organizer.name }}</h1>
                              </div>
                          </div>
                      </router-link>
                        <button
                          class="!p-2 rounded-lg text-center"
                          :style="{
                            backgroundColor: followingStore.isFollowing(activity.organizer_id) ? '#F3F4F6' : '#3B82F6',
                            color: followingStore.isFollowing(activity.organizer_id) ? '#364153' : '#fff'
                          }"
                          @click="followingStore.isFollowing(activity.organizer_id)
                              ? handleUnfollow(activity.organizer_id)
                              : handleFollow({ organizer_id: activity.organizer_id, notification: false })"
                          >
                          {{ followingStore.isFollowing(activity.organizer_id) ? 'Berhenti Mengikuti' : 'Mengikuti' }}
                        </button>
                  </div>

                </div>

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

  </div>
  </div>
</template>
