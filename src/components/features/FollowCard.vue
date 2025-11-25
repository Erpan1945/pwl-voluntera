<template>
  <CardComponent :padding="true">
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900 mb-1">{{ follow.organizerName }}</h3>
        <p class="text-sm text-gray-600">Diikuti sejak {{ formatDate(follow.followedAt) }}</p>
      </div>
      
      <div class="flex gap-2">
        <button
          @click="$emit('toggleNotification', follow)"
          :class="[
            'p-2 rounded-lg transition-colors',
            follow.notificationEnabled 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-600'
          ]"
          :title="follow.notificationEnabled ? 'Nonaktifkan notifikasi' : 'Aktifkan notifikasi'"
        >
          <Bell :size="20" />
        </button>
        
        <ButtonComponent
          variant="danger"
          size="sm"
          @click="$emit('unfollow', follow)"
        >
          Unfollow
        </ButtonComponent>
      </div>
    </div>
  </CardComponent>
</template>

<script setup>
import { Bell } from 'lucide-vue-next'
import CardComponent from '@/components/common/CardComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

defineProps({
  follow: {
    type: Object,
    required: true
  }
})

defineEmits(['unfollow', 'toggleNotification'])

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMMM yyyy', { locale: id })
}
</script>