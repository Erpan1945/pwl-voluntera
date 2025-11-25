<template>
  <router-link
    :to="to"
    class="flex items-center gap-2 px-4 py-2 rounded-lg transition"
    :class="[
      active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-700 hover:bg-gray-100'
    ]"
  >
    <slot />
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>