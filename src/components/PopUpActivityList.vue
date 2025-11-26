<!-- components/PopUpActivityList.vue -->
<script setup>
const emit = defineEmits(["close"]);
</script>

<template>
  <!-- WRAPPER: posisi absolute DI BAWAH button -->
  <div
    class="absolute mt-2 right-0 bg-white shadow-xl rounded-2xl w-80 p-4 z-50"
  >

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-4">
      <button @click="emit('close')" class="text-gray-600 flex items-center gap-1">
        ← Kembali
      </button>

      <button class="px-4 py-1.5 bg-red-500 text-white rounded-full shadow">
        Hapus
      </button>
    </div>

    <!-- LIST ITEM -->
    <div class="space-y-3 overflow-y-auto max-h-80">

      <!-- Contoh item -->
      <div
        class="flex justify-between items-center p-3 rounded-xl border border-gray-200"
      >
        <span>Kegiatan Favorit</span>
        <div class="w-6 h-6 rounded-full border-2 border-blue-600 bg-blue-500"></div>
      </div>

      <div
        class="flex justify-between items-center p-3 rounded-xl border border-gray-200"
      >
        <span>Rencana Bulan Depan</span>
        <div class="w-6 h-6 rounded-full border-2 border-gray-400"></div>
      </div>

      <div
        class="flex justify-between items-center p-3 rounded-xl border border-gray-200"
      >
        <span>Kegiatan Mengajar</span>
        <div class="w-6 h-6 rounded-full border-2 border-gray-400"></div>
      </div>

    </div>

    <!-- BUAT LIST BARU -->
    <button
      class="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-medium"
    >
      + Buat Daftar Baru
    </button>
  </div>
</template>
