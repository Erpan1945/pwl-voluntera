<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :value="modelValue"
      :required="required"
      :class="selectClasses"
      @change="handleChange"
    >
      <option value="">Pilih {{ label }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
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
  options: {
    type: Array,
    required: true
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

const selectClasses = computed(() => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white'
  const errorClasses = props.error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
  
  return [baseClasses, errorClasses].join(' ')
})

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>