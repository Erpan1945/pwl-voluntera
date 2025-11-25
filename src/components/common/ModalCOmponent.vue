<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" @click.self="handleClose">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <!-- Modal -->
      <div class="flex min-h-screen items-center justify-center p-4">
        <div :class="modalClasses" @click.stop>
          <!-- Header -->
          <div class="flex items-center justify-between border-b pb-4 mb-4">
            <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
            <button
              @click="handleClose"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Body -->
          <div>
            <slot />
          </div>
          
          <!-- Footer (optional) -->
          <div v-if="$slots.footer" class="border-t pt-4 mt-4">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['close'])

const modalClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg p-6 shadow-xl relative'
  
  const sizeClasses = {
    sm: 'max-w-md w-full',
    md: 'max-w-lg w-full',
    lg: 'max-w-2xl w-full'
  }
  
  return [baseClasses, sizeClasses[props.size]].join(' ')
})

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>