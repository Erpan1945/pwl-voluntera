<template>
  <nav class="bg-white border-b sticky top-0 z-40">
    <div class="max-w-1xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <Heart class="text-blue-600" :size="32" />
          <span class="text-xl font-semibold text-gray-900">Voluntera</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-4">
          <span class="text-gray-700">{{ user.name }}</span>
          <BadgeComponent 
            :variant="getRoleBadgeVariant(user.role)" 
            :text="getRoleLabel(user.role)" 
          />
          <ButtonComponent 
            variant="outline" 
            size="sm" 
            @click="$emit('logout')"
          >
            Logout
          </ButtonComponent>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2 rounded-lg hover:bg-gray-100"
          @click="showMobileMenu = !showMobileMenu"
        >
          <Menu :size="24" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden pb-4">
        <div class="flex flex-col gap-2">
          <div class="text-gray-700 font-medium">{{ user.name }}</div>
          <BadgeComponent 
            :variant="getRoleBadgeVariant(user.role)" 
            :text="getRoleLabel(user.role)" 
          />
          <ButtonComponent 
            variant="outline" 
            size="sm" 
            @click="$emit('logout')"
            class="w-full"
          >
            Logout
          </ButtonComponent>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Heart, Menu } from 'lucide-vue-next'
import BadgeComponent from '@/components/common/BadgeComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['logout'])

const showMobileMenu = ref(false)

const getRoleLabel = (role) => {
  const labels = {
    volunteer: 'Relawan',
    organizer: 'Penyelenggara',
    admin: 'Admin'
  }
  return labels[role] || role
}

const getRoleBadgeVariant = (role) => {
  const variants = {
    volunteer: 'success',
    organizer: 'info',
    admin: 'pending'
  }
  return variants[role] || 'info'
}
</script>