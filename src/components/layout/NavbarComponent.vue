<template>
  <nav class="bg-white border-b sticky top-0 z-50 shadow-sm">
    <div class="w-full px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Brand -->
        <div class="flex items-center gap-3">
          <LogoComponent />
          <span class="text-xl font-bold text-gray-900">Voluntera</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <!-- Nav Items based on user type -->
          <template v-if="isVolunteer">
            <NavLink 
              :to="'/dashboard/volunteer'" 
              :active="$route.path === '/dashboard/volunteer'"
            >
              <LayoutDashboard :size="20" />
              Dashboard
            </NavLink>
          </template>

          <template v-if="isOrganizer">
            <NavLink 
              :to="'/dashboard/organizer'" 
              :active="$route.path === '/dashboard/organizer'"
            >
              <LayoutDashboard :size="20" />
              Dashboard
            </NavLink>
          </template>

          <template v-if="isAdmin">
            <NavLink 
              :to="'/dashboard/admin'" 
              :active="$route.path === '/dashboard/admin'"
            >
              <Shield :size="20" />
              Admin Panel
            </NavLink>
          </template>

          <!-- Common Nav Items -->
          <NavLink 
            to="/profile" 
            :active="$route.path === '/profile'"
          >
            <User :size="20" />
            Profil
          </NavLink>

          <!-- Logout Button -->
          <button
            @click="handleLogout"
            class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut :size="20" />
            Keluar
          </button>
        </div>

        <!-- User Info (Desktop) -->
        <div class="hidden md:flex items-center gap-3">
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
            <p class="text-xs text-gray-500 capitalize">{{ user?.type }}</p>
          </div>
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-semibold">{{ userInitial }}</span>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t">
          <!-- User Info Mobile -->
          <div class="flex items-center gap-3 px-4 py-3 mb-4 bg-gray-50 rounded-lg">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-semibold text-lg">{{ userInitial }}</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ user?.name }}</p>
              <p class="text-sm text-gray-500 capitalize">{{ user?.type }}</p>
            </div>
          </div>

          <!-- Mobile Nav Links -->
          <div class="space-y-1">
            <template v-if="isVolunteer">
              <MobileNavLink 
                to="/dashboard/volunteer"
                @click="closeMobileMenu"
              >
                <LayoutDashboard :size="20" />
                Dashboard
              </MobileNavLink>
            </template>

            <template v-if="isOrganizer">
              <MobileNavLink 
                to="/dashboard/organizer"
                @click="closeMobileMenu"
              >
                <LayoutDashboard :size="20" />
                Dashboard
              </MobileNavLink>
            </template>

            <template v-if="isAdmin">
              <MobileNavLink 
                to="/dashboard/admin"
                @click="closeMobileMenu"
              >
                <Shield :size="20" />
                Admin Panel
              </MobileNavLink>
            </template>

            <MobileNavLink 
              to="/profile"
              @click="closeMobileMenu"
            >
              <User :size="20" />
              Profil
            </MobileNavLink>

            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut :size="20" />
              Keluar
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { 
  Heart, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Shield 
} from 'lucide-vue-next'
import LogoComponent from '@/components/common/LogoComponent.vue'

const { user, isVolunteer, isOrganizer, isAdmin, handleLogout } = useAuth()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Computed
const userInitial = computed(() => {
  return user.value?.name?.charAt(0).toUpperCase() || 'U'
})

// Methods
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
/* Mobile menu slide animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>