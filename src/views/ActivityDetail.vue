<script setup>
import { ref } from "vue"

// Components
import SavetoListButton from "@/components/SavetoListButton.vue"
import PopUpActivityList from "@/components/PopUpActivityList.vue"

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
  <div class="p-10">

    <h1 class="text-2xl font-bold mb-6">
      Halaman Detail Aktivitas (Dummy)
    </h1>

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

  </div>
</template>
