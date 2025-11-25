<template>
  <router-link
    to="/"
    class="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
    :class="customClass"
  >
    <img
      src="@/assets/voluntera-logo.svg"
      alt="Voluntera Logo"
      :style="{ height: iconHeight + 'px', width: 'auto' }"
      class="object-contain"
    />

    <span
      v-if="showText"
      class="font-bold text-gray-900"
      :class="textSizeClass"
    >
      Voluntera
    </span>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

// Mendefinisikan props agar komponen bisa diatur dari luar
const props = defineProps({
  // Menentukan tinggi ikon dalam pixel (default 32px seperti contoh awalmu)
  iconHeight: {
    type: [Number, String],
    default: 32
  },
  // Apakah teks "Voluntera" ditampilkan? (default ya)
  showText: {
    type: Boolean,
    default: true
  },
  // Kelas Tailwind untuk ukuran teks (default text-2xl)
  textSizeClass: {
    type: String,
    default: 'text-2xl'
  },
  // Tambahan class kustom jika dibutuhkan untuk wrapper luarnya
  customClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* Tidak ada style khusus, kita gunakan Tailwind penuh */
</style>