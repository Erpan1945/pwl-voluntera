<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-3 mb-4">
          <Heart class="text-blue-600" :size="40" />
          <span class="text-2xl font-bold text-gray-900">Voluntera</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun Anda</h1>
        <p class="text-gray-600">Mulai berbuat baik hari ini</p>
      </div>

      <CardComponent :padding="true">
        <form @submit.prevent="handleLogin">
          <InputComponent
            v-model="email"
            label="Email"
            type="email"
            placeholder="nama@email.com"
            :required="true"
            :error="errors.email"
          />

          <InputComponent
            v-model="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            :required="true"
            :error="errors.password"
          />

          <div v-if="errors.general" class="mb-4 p-3 bg-red-50 rounded-lg">
            <p class="text-sm text-red-700">{{ errors.general }}</p>
          </div>

          <ButtonComponent
            type="submit"
            variant="primary"
            :disabled="loading"
            class="w-full mb-4"
          >
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </ButtonComponent>

          <div class="text-center text-sm text-gray-600">
            Belum punya akun?
            <router-link to="/register" class="text-blue-600 hover:underline">
              Daftar di sini
            </router-link>
          </div>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6 pt-6 border-t">
          <p class="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
          <div class="space-y-2 text-xs text-gray-600">
            <div class="flex justify-between">
              <span>Relawan:</span>
              <span>volunteer@test.com / password</span>
            </div>
            <div class="flex justify-between">
              <span>Penyelenggara:</span>
              <span>organizer@test.com / password</span>
            </div>
            <div class="flex justify-between">
              <span>Admin:</span>
              <span>admin@test.com / password</span>
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Heart } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import CardComponent from '@/components/common/CardComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errors = ref({})

const handleLogin = () => {
  // Reset errors
  errors.value = {}

  // Validate
  if (!email.value) {
    errors.value.email = 'Email wajib diisi'
    return
  }
  if (!password.value) {
    errors.value.password = 'Password wajib diisi'
    return
  }

  loading.value = true

  // Simulate API call
  setTimeout(() => {
    const result = login(email.value, password.value)

    if (result.success) {
      // Redirect based on role
      const routes = {
        volunteer: '/volunteer/dashboard',
        organizer: '/organizer/dashboard',
        admin: '/admin/dashboard'
      }
      router.push(routes[result.user.role])
    } else {
      errors.value.general = result.message
    }

    loading.value = false
  }, 500)
}
</script>