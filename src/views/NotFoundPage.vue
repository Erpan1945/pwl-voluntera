<template>
  <div class="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
    <div class="text-center">
      <div class="mb-8 flex items-center justify-center">
        <AlertCircle class="mx-auto text-blue-600" :size="80" />
      </div>
      
      <h1 class="text-6xl font-bold text-gray-900 mb-4 pt-3">404</h1>
      <p class="text-2xl font-semibold text-gray-700 mb-2 pt-3">Halaman Tidak Ditemukan</p>
      <p class="text-gray-600 mb-8 py-3">
        Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
      </p>

      <div class="flex gap-4 justify-center pt-3">
        <ButtonComponent variant="primary" @click="goHome">
          <Home :size="20" class="inline mr-2" />
          Kembali ke Beranda
        </ButtonComponent>
        
        <ButtonComponent variant="outline" @click="goBack">
          <ArrowLeft :size="20" class="inline mr-2" />
          Kembali
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { AlertCircle, Home, ArrowLeft } from 'lucide-vue-next'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>