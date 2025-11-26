<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavbarComponent :user="currentUser" @logout="handleLogout" />

    <main class="flex-1 flex justify-center items-center">
      <div class="max-w-2xl mx-auto px-4 py-8 flex-1">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h1>
          <p class="text-gray-600">Kelola informasi profil Anda</p>
        </div>

        <!-- Tabs -->
        <div class="mb-6 border-b">
          <div class="flex gap-4">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 font-medium transition-colors',
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900',
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div>
          <!-- Informasi Dasar Tab -->
          <div v-show="activeTab === 'basic'">
            <CardComponent>
              <form @submit.prevent="handleUpdateProfile">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User class="text-blue-600" :size="40" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ currentUser.name }}</p>
                    <p class="text-sm text-gray-600">{{ getRoleLabel(currentUser.role) }}</p>
                  </div>
                </div>

                <InputComponent v-model="profileForm.name" label="Nama" :required="true" />

                <InputComponent
                  v-model="profileForm.email"
                  label="Email"
                  type="email"
                  :required="true"
                />

                <InputComponent
                  v-model="profileForm.phone"
                  label="No. Telepon"
                  :required="true"
                  class="pb-3"
                />

                <!-- Volunteer Fields -->
                <template v-if="isVolunteer">
                  <InputComponent v-model="profileForm.city" label="Kota" :required="true" />

                  <TextareaComponent v-model="profileForm.bio" label="Bio" :rows="3" />
                </template>

                <!-- Organizer Fields -->
                <template v-if="isOrganizer">
                  <TextareaComponent
                    v-model="profileForm.address"
                    label="Alamat"
                    :rows="2"
                    :required="true"
                  />

                  <InputComponent v-model="profileForm.website" label="Website" type="url" />

                  <TextareaComponent
                    v-model="profileForm.bio"
                    label="Deskripsi Organisasi"
                    :rows="3"
                  />
                </template>

                <ButtonComponent type="submit" variant="primary">
                  Simpan Perubahan
                </ButtonComponent>
              </form>
            </CardComponent>
          </div>

          <!-- Keamanan Tab -->
          <div v-show="activeTab === 'security'">
            <CardComponent>
              <form @submit.prevent="handleChangePassword">
                <InputComponent
                  v-model="passwordForm.oldPassword"
                  label="Password Lama"
                  type="password"
                  :required="true"
                />

                <InputComponent
                  v-model="passwordForm.newPassword"
                  label="Password Baru"
                  type="password"
                  :required="true"
                />

                <InputComponent
                  v-model="passwordForm.confirmPassword"
                  label="Konfirmasi Password Baru"
                  type="password"
                  :required="true"
                />

                <div v-if="passwordError" class="mb-4 p-3 bg-red-50 rounded-lg">
                  <p class="text-sm text-red-700">{{ passwordError }}</p>
                </div>

                <ButtonComponent type="submit" variant="primary"> Ubah Password </ButtonComponent>
              </form>
            </CardComponent>
          </div>

          <!-- Akun Tab -->
          <div v-show="activeTab === 'account'">
            <CardComponent>
              <div class="space-y-6">
                <!-- Account Info -->
                <div>
                  <h3 class="font-semibold text-gray-900 mb-3">Informasi Akun</h3>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between py-2 border-b">
                      <span class="text-gray-600">Role:</span>
                      <span class="font-medium text-gray-900">{{
                        getRoleLabel(currentUser.role)
                      }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b">
                      <span class="text-gray-600">Email:</span>
                      <span class="font-medium text-gray-900">{{ currentUser.email }}</span>
                    </div>
                    <div class="flex justify-between py-2">
                      <span class="text-gray-600">Bergabung:</span>
                      <span class="font-medium text-gray-900">{{
                        formatDate(currentUser.createdAt)
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Danger Zone -->
                <div class="pt-6 border-t">
                  <h3 class="font-semibold text-red-600 mb-3">Zona Berbahaya</h3>
                  <p class="text-sm text-gray-600 mb-4">
                    Tindakan ini tidak dapat dibatalkan. Harap berhati-hati.
                  </p>
                  <ButtonComponent variant="danger" @click="handleDeleteAccount">
                    Hapus Akun
                  </ButtonComponent>
                </div>
              </div>
            </CardComponent>
          </div>
        </div>
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'

import NavbarComponent from '@/components/layout/NavbarComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import CardComponent from '@/components/common/CardComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import TextareaComponent from '@/components/common/TextareaComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const router = useRouter()
const { currentUser, isVolunteer, isOrganizer, updateProfile, changePassword, logout } = useAuth()

// Tabs
const activeTab = ref('basic')
const tabs = [
  { id: 'basic', label: 'Informasi Dasar' },
  { id: 'security', label: 'Keamanan' },
  { id: 'account', label: 'Akun' },
]

// Forms
const profileForm = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  website: '',
  bio: '',
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const passwordError = ref('')

// Load profile data
onMounted(() => {
  Object.assign(profileForm, currentUser.value)
})

// Methods
const handleLogout = () => {
  if (confirm('Yakin ingin logout?')) {
    logout()
    router.push('/login')
  }
}

const getRoleLabel = (role) => {
  const labels = {
    volunteer: 'Relawan',
    organizer: 'Penyelenggara',
    admin: 'Admin',
  }
  return labels[role] || role
}

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMMM yyyy', { locale: id })
}

const handleUpdateProfile = () => {
  const result = updateProfile(profileForm)

  if (result.success) {
    alert(result.message)
  } else {
    alert(result.message)
  }
}

const handleChangePassword = () => {
  passwordError.value = ''

  // Validate
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = 'Password baru tidak cocok'
    return
  }

  if (passwordForm.newPassword.length < 6) {
    passwordError.value = 'Password minimal 6 karakter'
    return
  }

  const result = changePassword(passwordForm.oldPassword, passwordForm.newPassword)

  if (result.success) {
    alert(result.message)
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } else {
    passwordError.value = result.message
  }
}

const handleDeleteAccount = () => {
  const confirmation = prompt('Ketik "HAPUS" untuk mengkonfirmasi penghapusan akun:')

  if (confirmation === 'HAPUS') {
    alert('Akun berhasil dihapus (simulasi)')
    logout()
    router.push('/')
  } else if (confirmation) {
    alert('Konfirmasi salah. Akun tidak dihapus.')
  }
}
</script>
