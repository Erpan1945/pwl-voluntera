<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMarkahStore } from '@/stores/lists';

const router = useRouter();
const route = useRoute();
const store = useMarkahStore();

const listId = route.params.id;

const name = ref("");

// tombol kembali
const goBack = () => router.go(-1);

// Prefill: ambil nama lama
onMounted(async () => {
  // kalau lists belum dimuat (misal refresh)
  if (!store.lists.length) {
    const volunteerId = localStorage.getItem("volunteer_id");
    await store.fetchAllLists(volunteerId);
  }

  const target = store.lists.find(l => l.id == listId);
  if (target) name.value = target.name;
});

// Submit rename
const handleSubmit = async () => {
  if (!name.value) {
    alert("Nama daftar wajib diisi!");
    return;
  }

  try {
    await store.renameList(listId, name.value);

    alert("Nama daftar berhasil diperbarui!");

    router.push(`/activity_lists/${listId}`);
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat mengubah nama daftar.");
  }
};
</script>

<template>
  <Navbar />

  <div class="w-full mt-12" style="padding-left: 128px; padding-right: 64px;">
    
    <!-- Tombol Kembali -->
    <button 
      @click="goBack"
      class="text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-4 no-underline bg-transparent border-0"
    >
      ← Kembali
    </button>

    <!-- Judul -->
    <h1 class="text-2xl font-bold mb-4">Ubah Nama Daftar</h1>

    <!-- Form -->
    <div class="flex items-center gap-4">
      <input 
        v-model="name"
        type="text" 
        placeholder="Masukkan nama daftar"
        class="border rounded-lg px-4 py-2 w-80"
      />
      <button 
        @click="handleSubmit"
        class="bg-[#155DFC] text-white px-6 py-2 rounded-lg"
      >
        Simpan
      </button>
    </div>

  </div>
</template>
