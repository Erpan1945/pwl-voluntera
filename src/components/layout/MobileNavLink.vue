<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
    :class="[
      $route.path === to 
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
  }
})
</script>