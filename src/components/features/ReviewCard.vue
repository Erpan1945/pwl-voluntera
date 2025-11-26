<template>
  <CardComponent :padding="true">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h4 class="font-semibold text-gray-900">{{ review.volunteerName }}</h4>
        <p class="text-sm text-gray-600">{{ formatDate(review.createdAt) }}</p>
      </div>
      <div class="flex items-center gap-1">
        <Star 
          v-for="i in 5" 
          :key="i"
          :class="i <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
          :size="16"
        />
      </div>
    </div>

    <p class="text-gray-700">{{ review.comment }}</p>
  </CardComponent>
</template>

<script setup>
import { Star } from 'lucide-vue-next'
import CardComponent from '@/components/common/CardComponent.vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

defineProps({
  review: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMMM yyyy', { locale: id })
}
</script>