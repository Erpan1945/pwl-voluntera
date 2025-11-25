<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <Navbar />

  <div class="w-full mt-12" style="padding-left: 128px; padding-right: 64px;">
    
    <!-- Tombol Kembali -->
    <router-link 
      to="/DaftarSaya" 
      class="text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-4 no-underline"
    >
      ← Kembali
    </router-link>

    <!-- Judul -->
    <h1 class="text-2xl font-bold mb-4">Nama Daftar</h1>

    <!-- Form -->
    <div class="flex items-center gap-4">
      <input 
        type="text" 
        placeholder="Masukkan nama daftar"
        class="border rounded-lg px-4 py-2 w-80"
      />
      <button class="bg-[#155DFC] text-white px-6 py-2 rounded-lg">
        Simpan
      </button>
    </div>

  </div>
</template>
