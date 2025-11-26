<template>
  <CardComponent :padding="true">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="font-semibold text-gray-900 mb-1">{{ list.listName }}</h3>
        <p class="text-sm text-gray-600">{{ activities.length }} kegiatan</p>
      </div>
      
      <div class="flex gap-2">
        <button
          @click="$emit('rename', list)"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          title="Rename list"
        >
          <Edit2 :size="18" />
        </button>
        <button
          @click="$emit('delete', list)"
          class="p-2 rounded-lg hover:bg-red-100 transition-colors text-red-600"
          title="Delete list"
        >
          <Trash2 :size="18" />
        </button>
      </div>
    </div>

    <!-- Activities -->
    <div v-if="activities.length > 0" class="space-y-2">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
      >
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900 line-clamp-1">{{ activity.title }}</p>
          <p class="text-xs text-gray-600">{{ activity.city }} • {{ formatDate(activity.date) }}</p>
        </div>
        <button
          @click="$emit('removeActivity', list, activity)"
          class="p-1 rounded hover:bg-red-100 text-red-600 transition-colors"
          title="Hapus dari list"
        >
          <X :size="16" />
        </button>
      </div>
    </div>

    <div v-else class="text-center py-4 text-gray-500 text-sm">
      Belum ada kegiatan
    </div>
  </CardComponent>
</template>

<script setup>
import { Edit2, Trash2, X } from 'lucide-vue-next'
import CardComponent from '@/components/common/CardComponent.vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

defineProps({
  list: {
    type: Object,
    required: true
  },
  activities: {
    type: Array,
    default: () => []
  }
})

defineEmits(['rename', 'delete', 'removeActivity'])

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMM', { locale: id })
}
</script>