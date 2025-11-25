<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200'
  const paddingClass = props.padding ? 'p-6' : ''
  const hoverClass = props.hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
  
  return [baseClasses, paddingClass, hoverClass].filter(Boolean).join(' ')
})
</script>