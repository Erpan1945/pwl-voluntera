<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <button @click="goBack" class="flex items-center gap-2 text-sm text-gray-700 mb-4 hover:underline">
        <ArrowLeft :size="18" class="text-gray-700" />
        Kembali
      </button>
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

          <!-- Password Input with Show/Hide for Volunteer -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1 py-2.5">
              Password
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                :value="volunteerForm.password"
                @input="volunteerForm.password = $event.target.value"
                :type="showPasswordVolunteer ? 'text' : 'password'"
                placeholder="Min. 6 karakter"
                class="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                @click="showPasswordVolunteer = !showPasswordVolunteer"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Eye v-if="!showPasswordVolunteer" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>
          </div>

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
            class="text-gray-700"
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

          <!-- Password Input with Show/Hide for Organizer -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1 py-2.5">
              Password
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                :value="organizerForm.password"
                @input="organizerForm.password = $event.target.value"
                :type="showPasswordOrganizer ? 'text' : 'password'"
                placeholder="Min. 6 karakter"
                class="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                @click="showPasswordOrganizer = !showPasswordOrganizer"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Eye v-if="!showPasswordOrganizer" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>
          </div>

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
            class="text-gray-700"
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
            class="text-gray-700"
          />

          <div v-if="errors.general" class="mb-4 p-3 py-3 bg-red-50 rounded-lg">
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
import { Heart, Users, Building2, ArrowLeft, Eye, EyeOff } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import CardComponent from '@/components/common/CardComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import TextareaComponent from '@/components/common/TextareaComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const router = useRouter()
const { registerVolunteer, registerOrganizer } = useAuth()

const goBack = () => {
  router.push('/')
}

const activeTab = ref('volunteer')
const loading = ref(false)
const errors = ref({})
const showPasswordVolunteer = ref(false)
const showPasswordOrganizer = ref(false)

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

const handleRegisterVolunteer = async () => {
  errors.value = {}
  loading.value = true

  // Validasi field
  if (!volunteerForm.value.name) {
    errors.value.general = 'Nama wajib diisi'
    loading.value = false
    return
  }
  if (!volunteerForm.value.email) {
    errors.value.general = 'Email wajib diisi'
    loading.value = false
    return
  }
  if (!volunteerForm.value.password) {
    errors.value.general = 'Password wajib diisi'
    loading.value = false
    return
  }
  if (volunteerForm.value.password.length < 6) {
    errors.value.general = 'Password minimal 6 karakter'
    loading.value = false
    return
  }
  if (!volunteerForm.value.phone) {
    errors.value.general = 'Nomor telepon wajib diisi'
    loading.value = false
    return
  }
  if (!volunteerForm.value.city) {
    errors.value.general = 'Kota wajib diisi'
    loading.value = false
    return
  }

  try {
    const result = await registerVolunteer(volunteerForm.value)

    if (result.success) {
      alert('Registrasi berhasil! Silakan login dengan akun Anda.')
      router.push('/login')
    } else {
      errors.value.general = result.message
    }
  } catch (err) {
    errors.value.general = 'Terjadi kesalahan saat registrasi'
    console.error(err)
  }

  loading.value = false
}

const handleRegisterOrganizer = async () => {
  errors.value = {}
  loading.value = true

  // Validasi field
  if (!organizerForm.value.name) {
    errors.value.general = 'Nama organisasi wajib diisi'
    loading.value = false
    return
  }
  if (!organizerForm.value.email) {
    errors.value.general = 'Email wajib diisi'
    loading.value = false
    return
  }
  if (!organizerForm.value.password) {
    errors.value.general = 'Password wajib diisi'
    loading.value = false
    return
  }
  if (organizerForm.value.password.length < 6) {
    errors.value.general = 'Password minimal 6 karakter'
    loading.value = false
    return
  }
  if (!organizerForm.value.phone) {
    errors.value.general = 'Nomor telepon wajib diisi'
    loading.value = false
    return
  }
  if (!organizerForm.value.address) {
    errors.value.general = 'Alamat wajib diisi'
    loading.value = false
    return
  }
  if (!organizerForm.value.bio) {
    errors.value.general = 'Deskripsi organisasi wajib diisi'
    loading.value = false
    return
  }

  try {
    const result = await registerOrganizer(organizerForm.value)

    if (result.success) {
      alert('Registrasi organisasi berhasil! Silakan login dengan akun Anda.')
      router.push('/login')
    } else {
      errors.value.general = result.message
    }
  } catch (err) {
    errors.value.general = 'Terjadi kesalahan saat registrasi'
    console.error(err)
  }

  loading.value = false
}
</script>