<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-50">
      <div class="max-w-full mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Heart class="text-blue-600" :size="32" />
          <span class="text-xl font-semibold text-gray-900">Voluntera</span>
        </div>
        <div class="flex items-center gap-3">
          <ButtonComponent variant="outline" @click="goToLogin"> Masuk </ButtonComponent>
          <ButtonComponent variant="primary" @click="goToRegister"> Daftar </ButtonComponent>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-linear-to-br from-blue-50 to-indigo-100 py-22 flex items-center">
      <div class="max-w-full mx-auto px-4 flex justify-between items-center">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Berbuat Baik, Dimulai dari Sini
          </h1>
          <p class="text-xl text-gray-600 mb-8 py-10">
            Platform yang mempertemukan relawan dengan kegiatan sosial. Temukan kegiatan yang sesuai
            dengan minat Anda atau buat kegiatan untuk komunitas.
          </p>
          <div class="flex justify-center gap-4 flex-wrap">
            <ButtonComponent
              variant="primary"
              size="lg"
              @click="goToRegister"
              class="flex items-center gap-2"
            >
              Mulai Sekarang
              <ArrowRight :size="20" />
            </ButtonComponent>
            <ButtonComponent variant="outline" size="lg" @click="goToLogin">
              Sudah Punya Akun
            </ButtonComponent>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-full mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Fitur Utama</h2>
          <p class="text-lg text-gray-600">
            Semua yang Anda butuhkan untuk berpartisipasi dalam kegiatan sosial
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center p-6">
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Search class="text-blue-600" :size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Cari Kegiatan</h3>
            <p class="text-gray-600">
              Temukan kegiatan relawan yang sesuai dengan minat dan lokasi Anda
            </p>
          </div>

          <div class="text-center p-6">
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Calendar class="text-green-600" :size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Daftar Mudah</h3>
            <p class="text-gray-600">
              Pendaftaran cepat dan sederhana untuk bergabung dalam kegiatan
            </p>
          </div>

          <div class="text-center p-6">
            <div
              class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Users class="text-purple-600" :size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Kelola Kegiatan</h3>
            <p class="text-gray-600">Buat dan kelola kegiatan sosial untuk komunitas Anda</p>
          </div>

          <div class="text-center p-6">
            <div
              class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Star class="text-yellow-600" :size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Review & Rating</h3>
            <p class="text-gray-600">Beri feedback dan lihat review dari peserta lainnya</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-blue-600 py-25">
      <div class="max-w-full mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Siap Berbuat Baik?</h2>
        <p class="text-xl text-blue-100 mb-8 py-5">
          Bergabunglah dengan ribuan relawan lainnya dan mulai berbuat baik hari ini
        </p>
        <ButtonComponent variant="secondary" size="lg" @click="goToRegister">
          Daftar Sekarang
        </ButtonComponent>
      </div>
    </section>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Heart, Search, Calendar, Users, Star, ArrowRight } from 'lucide-vue-next'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>
