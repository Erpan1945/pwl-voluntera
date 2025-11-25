<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-3 mb-4">
          <Heart class="text-blue-600" :size="40" />
          <span class="text-2xl font-bold text-gray-900">Voluntera</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Buat Akun Baru</h1>
        <p class="text-gray-600">Pilih jenis akun yang ingin Anda buat</p>
      </div>

      <CardComponent :padding="true">
        <!-- Tabs -->
        <div class="flex gap-2 mb-6">
          <button
            @click="activeTab = 'volunteer'"
            :class="[
              'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
              activeTab === 'volunteer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            <Users :size="20" class="inline mr-2" />
            Relawan
          </button>
          <button
            @click="activeTab = 'organizer'"
            :class="[
              'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
              activeTab === 'organizer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            <Building2 :size="20" class="inline mr-2" />
            Penyelenggara
          </button>
        </div>

        <!-- Volunteer Form -->
        <form v-if="activeTab === 'volunteer'" @submit.prevent="handleRegisterVolunteer">
          <InputComponent
            v-model="volunteerForm.name"
            label="Nama Lengkap"
            placeholder="Nama Anda"
            :required="true"
          />

          <InputComponent
            v-model="volunteerForm.email"
            label="Email"
            type="email"
            placeholder="nama@email.com"
            :required="true"
          />

          <InputComponent
            v-model="volunteerForm.password"
            label="Password"
            type="password"
            placeholder="Min. 6 karakter"
            :required="true"
          />

          <InputComponent
            v-model="volunteerForm.phone"
            label="No. Telepon"
            type="tel"
            placeholder="08123456789"
            :required="true"
          />

          <InputComponent
            v-model="volunteerForm.city"
            label="Kota"
            placeholder="Malang"
            :required="true"
          />

          <TextareaComponent
            v-model="volunteerForm.bio"
            label="Bio (Opsional)"
            placeholder="Ceritakan sedikit tentang Anda..."
            :rows="3"
          />

          <div v-if="errors.general" class="mb-4 p-3 bg-red-50 rounded-lg">
            <p class="text-sm text-red-700">{{ errors.general }}</p>
          </div>

          <ButtonComponent
            type="submit"
            variant="primary"
            :disabled="loading"
            class="w-full"
          >
            {{ loading ? 'Memproses...' : 'Daftar sebagai Relawan' }}
          </ButtonComponent>
        </form>

        <!-- Organizer Form -->
        <form v-else @submit.prevent="handleRegisterOrganizer">
          <InputComponent
            v-model="organizerForm.name"
            label="Nama Organisasi"
            placeholder="Nama Yayasan/Komunitas"
            :required="true"
          />

          <InputComponent
            v-model="organizerForm.email"
            label="Email"
            type="email"
            placeholder="info@organisasi.com"
            :required="true"
          />

          <InputComponent
            v-model="organizerForm.password"
            label="Password"
            type="password"
            placeholder="Min. 6 karakter"
            :required="true"
          />

          <InputComponent
            v-model="organizerForm.phone"
            label="No. Telepon"
            type="tel"
            placeholder="08123456789"
            :required="true"
          />

          <TextareaComponent
            v-model="organizerForm.address"
            label="Alamat Lengkap"
            placeholder="Jl. Contoh No. 123, Kota"
            :required="true"
            :rows="2"
          />

          <InputComponent
            v-model="organizerForm.website"
            label="Website (Opsional)"
            type="url"
            placeholder="https://organisasi.com"
          />

          <TextareaComponent
            v-model="organizerForm.bio"
            label="Deskripsi Organisasi"
            placeholder="Ceritakan tentang organisasi Anda..."
            :rows="3"
            :required="true"
          />

          <div v-if="errors.general" class="mb-4 p-3 bg-red-50 rounded-lg">
            <p class="text-sm text-red-700">{{ errors.general }}</p>
          </div>

          <ButtonComponent
            type="submit"
            variant="primary"
            :disabled="loading"
            class="w-full"
          >
            {{ loading ? 'Memproses...' : 'Daftar sebagai Penyelenggara' }}
          </ButtonComponent>
        </form>

        <!-- Login Link -->
        <div class="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun?
          <router-link to="/login" class="text-blue-600 hover:underline">
            Masuk di sini
          </router-link>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Heart, Users, Building2 } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import CardComponent from '@/components/common/CardComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import TextareaComponent from '@/components/common/TextareaComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const router = useRouter()
const { registerVolunteer, registerOrganizer } = useAuth()

const activeTab = ref('volunteer')
const loading = ref(false)
const errors = ref({})

const volunteerForm = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  city: '',
  bio: ''
})

const organizerForm = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  website: '',
  bio: ''
})

const handleRegisterVolunteer = () => {
  errors.value = {}
  loading.value = true

  setTimeout(() => {
    const result = registerVolunteer(volunteerForm.value)

    if (result.success) {
      alert(result.message)
      router.push('/login')
    } else {
      errors.value.general = result.message
    }

    loading.value = false
  }, 500)
}

const handleRegisterOrganizer = () => {
  errors.value = {}
  loading.value = true

  setTimeout(() => {
    const result = registerOrganizer(organizerForm.value)

    if (result.success) {
      alert(result.message)
      router.push('/login')
    } else {
      errors.value.general = result.message
    }

    loading.value = false
  }, 500)
}
</script>