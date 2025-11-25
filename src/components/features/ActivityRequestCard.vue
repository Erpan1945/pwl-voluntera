<template>
  <CardComponent :padding="true">
    <div class="flex justify-between items-start mb-3">
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900 mb-1">{{ request.title }}</h3>
        <p class="text-sm text-gray-600 line-clamp-2">{{ request.description }}</p>
      </div>
      <BadgeComponent 
        :variant="getStatusVariant(request.status)" 
        :text="getStatusLabel(request.status)" 
      />
    </div>

    <!-- Meta Info -->
    <div class="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
      <div class="flex items-center gap-1">
        <MapPin :size="14" />
        <span>{{ request.city }}</span>
      </div>
      <div class="flex items-center gap-1">
        <Calendar :size="14" />
        <span>{{ formatDate(request.date) }}</span>
      </div>
      <div class="flex items-center gap-1">
        <Users :size="14" />
        <span>Kapasitas: {{ request.capacity }}</span>
      </div>
      <div class="flex items-center gap-1">
        <Tag :size="14" />
        <span>{{ getCategoryLabel(request.category) }}</span>
      </div>
    </div>

    <!-- Rejection Reason -->
    <div v-if="request.status === 'rejected' && request.rejectionReason" class="bg-red-50 rounded-lg p-3 mb-3">
      <p class="text-sm text-red-700">
        <strong>Alasan Penolakan:</strong> {{ request.rejectionReason }}
      </p>
    </div>

    <!-- Actions -->
    <div v-if="showActions" class="flex gap-2 mt-3 pt-3 border-t">
      <!-- Organizer Actions (only pending) -->
      <template v-if="viewMode === 'organizer' && request.status === 'pending'">
        <ButtonComponent
          variant="secondary"
          size="sm"
          @click="$emit('edit', request)"
        >
          Edit
        </ButtonComponent>
        <ButtonComponent
          variant="danger"
          size="sm"
          @click="$emit('delete', request)"
        >
          Hapus
        </ButtonComponent>
      </template>

      <!-- Admin Actions (only pending) -->
      <template v-if="viewMode === 'admin' && request.status === 'pending'">
        <ButtonComponent
          variant="success"
          size="sm"
          @click="$emit('approve', request)"
        >
          Setujui
        </ButtonComponent>
        <ButtonComponent
          variant="danger"
          size="sm"
          @click="$emit('reject', request)"
        >
          Tolak
        </ButtonComponent>
      </template>
    </div>
  </CardComponent>
</template>

<script setup>
import { MapPin, Calendar, Users, Tag } from 'lucide-vue-next'
import CardComponent from '@/components/common/CardComponent.vue'
import BadgeComponent from '@/components/common/BadgeComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

defineProps({
  request: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  viewMode: {
    type: String,
    default: 'organizer',
    validator: (value) => ['organizer', 'admin'].includes(value)
  }
})

defineEmits(['edit', 'delete', 'approve', 'reject'])

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Menunggu Review',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  }
  return labels[status] || status
}

const getStatusVariant = (status) => {
  const variants = {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected'
  }
  return variants[status] || 'info'
}

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
  return format(new Date(dateString), 'dd MMM yyyy', { locale: id })
}
</script>