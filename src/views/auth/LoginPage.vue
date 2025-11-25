<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <button @click="goBack" class="flex items-center gap-2 text-sm text-gray-700 mb-4 hover:underline">
        <ArrowLeft :size="18" class="text-gray-700" />
        Kembali
      </button>
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-3 mb-4">
          <Heart class="text-blue-600" :size="40" />
          <span class="text-2xl font-bold text-gray-900">Voluntera</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun Anda</h1>
        <p class="text-gray-600 py-3">Mulai berbuat baik hari ini</p>
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

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between mb-6 mt-4 py-3">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span class="ml-2 text-sm text-gray-700 px-2">Ingat saya</span>
            </label>
            <button
              type="button"
              @click="showForgotPassword = true"
              class="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Lupa password?
            </button>
          </div>

          <div v-if="errors.general" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-700">{{ errors.general }}</p>
          </div>

          <ButtonComponent
            type="submit"
            variant="primary"
            :disabled="loading"
            class="w-full mb-4 py-1"
          >
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </ButtonComponent>

          <div class="text-center text-sm text-gray-600 py-2">
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

    <!-- Forgot Password Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showForgotPassword"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          @click.self="closeForgotPassword"
        >
          <div
            class="bg-white rounded-lg w-full max-w-md p-6"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-900">Lupa Password</h3>
              <button
                @click="closeForgotPassword"
                class="text-gray-400 hover:text-gray-600 transition"
              >
                <X :size="24" />
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="resetPasswordSuccess" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-start gap-3">
                <CheckCircle :size="20" class="text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-green-900">Email terkirim!</p>
                  <p class="text-sm text-green-700 mt-1">
                    Kami telah mengirimkan link reset password ke email Anda. Silakan cek inbox atau folder spam.
                  </p>
                </div>
              </div>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="handleForgotPassword">
              <p class="text-sm text-gray-600 mb-4">
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
              </p>

              <InputComponent
                v-model="forgotEmail"
                label="Email"
                type="email"
                placeholder="nama@email.com"
                :required="true"
                :error="forgotPasswordError"
              />

              <div v-if="forgotPasswordError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-700">{{ forgotPasswordError }}</p>
              </div>

              <div class="flex gap-3">
                <ButtonComponent
                  type="button"
                  variant="secondary"
                  @click="closeForgotPassword"
                  class="flex-1"
                >
                  Batal
                </ButtonComponent>
                <ButtonComponent
                  type="submit"
                  variant="primary"
                  :disabled="forgotPasswordLoading"
                  class="flex-1"
                >
                  {{ forgotPasswordLoading ? 'Mengirim...' : 'Kirim Link' }}
                </ButtonComponent>
              </div>
            </form>

            <!-- Close button after success -->
            <div v-if="resetPasswordSuccess" class="mt-4">
              <ButtonComponent
                variant="primary"
                @click="closeForgotPassword"
                class="w-full"
              >
                Tutup
              </ButtonComponent>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Heart, ArrowLeft, X, CheckCircle } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import CardComponent from '@/components/common/CardComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const router = useRouter()
const { login } = useAuth()

const goBack = () => {
  router.push('/')
}

// Login form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const errors = ref({})

// Forgot password state
const showForgotPassword = ref(false)
const forgotEmail = ref('')
const forgotPasswordLoading = ref(false)
const forgotPasswordError = ref('')
const resetPasswordSuccess = ref(false)

// Load saved email if "Remember Me" was checked
onMounted(() => {
  const savedEmail = localStorage.getItem('rememberedEmail')
  if (savedEmail) {
    email.value = savedEmail
    rememberMe.value = true
  }
})

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

  // Handle "Remember Me"
  if (rememberMe.value) {
    localStorage.setItem('rememberedEmail', email.value)
  } else {
    localStorage.removeItem('rememberedEmail')
  }

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

const handleForgotPassword = () => {
  // Reset error
  forgotPasswordError.value = ''

  // Validate
  if (!forgotEmail.value) {
    forgotPasswordError.value = 'Email wajib diisi'
    return
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(forgotEmail.value)) {
    forgotPasswordError.value = 'Format email tidak valid'
    return
  }

  forgotPasswordLoading.value = true

  // Simulate API call
  setTimeout(() => {
    // In real app, you would call an API here
    // For demo, we'll just show success message
    resetPasswordSuccess.value = true
    forgotPasswordLoading.value = false
  }, 1000)
}

const closeForgotPassword = () => {
  showForgotPassword.value = false
  forgotEmail.value = ''
  forgotPasswordError.value = ''
  forgotPasswordLoading.value = false
  resetPasswordSuccess.value = false
}
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
}
</style>