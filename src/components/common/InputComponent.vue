<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1 py-2.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :class="inputClasses"
      @input="handleInput"
      class="text-gray-900"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const inputClasses = computed(() => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors'
  const errorClasses = props.error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
  
  return [baseClasses, errorClasses].join(' ')
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>