<template>
  <footer class="bg-gray-50 border-t mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <Heart class="text-blue-600" :size="24" />
            <span class="font-semibold text-gray-900">Voluntera</span>
          </div>
          <p class="text-gray-600 text-sm">
            Platform yang mempertemukan relawan dengan kegiatan sosial untuk berbuat baik bersama.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-600">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-blue-600">Cara Kerja</a></li>
            <li><a href="#" class="hover:text-blue-600">FAQ</a></li>
            <li><a href="#" class="hover:text-blue-600">Kontak</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Hubungi Kami</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-center gap-2">
              <Mail :size="16" />
              <span>info@voluntera.id</span>
            </li>
            <li class="flex items-center gap-2">
              <Phone :size="16" />
              <span>+62 812-3456-7890</span>
            </li>
            <li class="flex items-center gap-2">
              <MapPin :size="16" />
              <span>Malang, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t mt-8 pt-8 text-center text-sm text-gray-600">
        <p>&copy; 2025 Voluntera. Pemrograman Web Lanjut - Universitas Brawijaya</p>
        <p class="mt-1">Tim: Vanessa, Irfan, Kezia, Khansa, Faiza, Feni</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Heart, Mail, Phone, MapPin } from 'lucide-vue-next'
</script>