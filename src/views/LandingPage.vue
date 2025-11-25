<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-50">
      <div class="w-full px-4 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <LogoComponent />
            
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-4">
            <router-link
              to="/login"
              class="px-6 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              Masuk
            </router-link>
            <router-link
              to="/register"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Daftar
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-linear-to-br from-blue-50 to-indigo-100 min-h-[calc(100vh-64px)] bg-blue-50 flex items-center px-30 py-20">
      <div class="max-w-full mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left: Text Content -->
          <div>
            <h1 class="text-5xl font-bold text-gray-900 mb-6">
              Bergabunglah dalam Gerakan
              <span class="text-blue-600">Kebaikan</span>
            </h1>
            <p class="text-xl text-gray-700 mb-8 leading-relaxed py-5 pr-6">
              Platform volunteering terpercaya yang menghubungkan relawan dengan
              penyelenggara kegiatan sosial. Mari berbuat baik bersama-sama!
            </p>
            <div class="flex gap-4 py-5">
              <router-link
                to="/register"
                class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                Mulai Sekarang
              </router-link>
              <button
                @click="scrollToFeatures"
                class="px-8 py-4 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition text-lg font-semibold border-2 border-gray-300"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          <!-- Right: Image/Illustration -->
          <div class="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"
              alt="Volunteering"
              class="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-full mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">1,000+</div>
            <div class="text-gray-600">Relawan Aktif</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div class="text-gray-600">Kegiatan Terlaksana</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div class="text-gray-600">Organisasi Partner</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div class="text-gray-600">Kota Terjangkau</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-50">
      <div class="max-w-full mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih Voluntera?
          </h2>
          <p class="text-xl text-gray-600">
            Platform terlengkap untuk kegiatan volunteering di Indonesia
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 py-5">
          <!-- Feature 1 -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Search class="text-blue-600" :size="28" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Cari Kegiatan Mudah
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Temukan kegiatan volunteering sesuai minat dan lokasimu dengan fitur
              pencarian dan filter yang canggih.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Users class="text-blue-600" :size="28" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Komunitas Aktif
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Bergabung dengan komunitas relawan dan penyelenggara yang peduli
              dengan perubahan sosial.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Shield class="text-blue-600" :size="28" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Terpercaya & Aman
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Semua kegiatan diverifikasi oleh admin untuk memastikan keamanan dan
              kredibilitas penyelenggara.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Calendar class="text-blue-600" :size="28" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Kelola Kegiatan
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Organizer bisa membuat, mengelola, dan mempromosikan kegiatan dengan
              mudah melalui dashboard.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Star class="text-blue-600" :size="28" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Review & Rating
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Berikan feedback dan rating untuk kegiatan yang sudah diikuti, bantu
              relawan lain membuat keputusan.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Bell class="text-blue-600" :size="28" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Notifikasi Real-time
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Dapatkan update langsung tentang status pendaftaran dan kegiatan
              baru dari organizer favoritmu.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-linear-to-r from-blue-600 to-indigo-600">
      <div class="max-w-full mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">
          Siap Untuk Berbuat Kebaikan?
        </h2>
        <p class="text-xl text-blue-100 mb-8 py-5">
          Bergabunglah dengan ribuan relawan dan ratusan organisasi yang sudah
          memulai perjalanan kebaikan mereka.
        </p>
        <router-link
          to="/register"
          class="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Daftar Sekarang - Gratis!
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-10">
      <div class="max-w-full mx-auto px-10">
        <div class="grid md:grid-cols-4 gap-10 mb-8 pb-10">
          <!-- About -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <Heart :size="28" fill />
              <span class="text-xl font-bold">Voluntera</span>
            </div>
            <p class="text-gray-400 leading-relaxed">
              Platform volunteering terpercaya untuk menghubungkan relawan dengan
              kegiatan sosial.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h3 class="font-semibold mb-4">Tentang</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">Tentang Kami</a></li>
              <li><a href="#" class="hover:text-white transition">Cara Kerja</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="font-semibold mb-4">Dukungan</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition">Kontak</a></li>
              <li><a href="#" class="hover:text-white transition">Bantuan</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="font-semibold mb-4">Legal</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">Privasi</a></li>
              <li><a href="#" class="hover:text-white transition">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Voluntera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import LogoComponent from '@/components/common/LogoComponent.vue';
import { Heart, Search, Users, Shield, Calendar, Star, Bell } from 'lucide-vue-next'

function scrollToFeatures() {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}
</script>