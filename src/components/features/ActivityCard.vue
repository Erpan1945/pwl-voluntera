<template>
  <div 
    class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    @click="$emit('click', activity)"
  >
    <!-- Image -->
    <div class="h-48 overflow-hidden bg-gray-200">
      <img 
        v-if="activity.imageUrl" 
        :src="activity.imageUrl" 
        :alt="activity.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Calendar class="text-gray-400" :size="48" />
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Category Badge -->
      <BadgeComponent 
        :variant="'info'" 
        :text="getCategoryLabel(activity.category)" 
        class="mb-2"
      />

      <!-- Title -->
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ activity.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ activity.description }}
      </p>

      <!-- Meta Info -->
      <div class="space-y-2 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <MapPin :size="16" />
          <span>{{ activity.city }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Calendar :size="16" />
          <span>{{ formatDate(activity.date) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Users :size="16" />
          <span>{{ activity.enrolledCount }}/{{ activity.capacity }} peserta</span>
        </div>
      </div>

      <!-- Rating -->
      <div v-if="activity.rating > 0" class="flex items-center gap-2 mt-3 pt-3 border-t">
        <Star class="text-yellow-500 fill-yellow-500" :size="16" />
        <span class="font-medium text-gray-900">{{ activity.rating }}</span>
        <span class="text-gray-600 text-sm">({{ activity.reviewCount }} review)</span>
      </div>

      <!-- Organizer -->
      <div class="mt-3 pt-3 border-t text-sm text-gray-600">
        <span class="font-medium">{{ activity.organizerName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, MapPin, Users, Star } from 'lucide-vue-next'
import BadgeComponent from '@/components/common/BadgeComponent.vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

defineProps({
  activity: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const getCategoryLabel = (category) => {
  const labels = {
    education: 'Pendidikan',
    environment: 'Lingkungan',
    health: 'Kesehatan',
    social: 'Sosial'
  }
  return labels[category] || category
}

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMMM yyyy', { locale: id })
}
</script>