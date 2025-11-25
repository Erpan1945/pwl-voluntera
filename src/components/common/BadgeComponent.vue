<template>
  <span :class="badgeClasses">
    {{ text }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['pending', 'accepted', 'rejected', 'approved', 'success', 'info'].includes(value)
  },
  text: {
    type: String,
    required: true
  }
})

const badgeClasses = computed(() => {
  const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium inline-block'
  
  const variantClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    approved: 'bg-green-100 text-green-800',
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800'
  }
  
  return [baseClasses, variantClasses[props.variant]].join(' ')
})
</script>