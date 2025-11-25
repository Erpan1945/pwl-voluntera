<script setup>
// kalau nanti mau props bisa ditambah
</script>

<template>
  <div
    class="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm"
  >
    <!-- Kiri: Icon + Text -->
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <div class="text-blue-600">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </div>

      <!-- Text -->
      <div>
        <h3 class="font-semibold text-gray-800">Kegiatan Favorit</h3>
        <p class="text-sm text-gray-500">2 kegiatan</p>
      </div>
    </div>

    <!-- Tombol Hapus -->
    <button class="text-red-500 text-sm font-medium hover:underline">
      Hapus
    </button>
  </div>
</template>
