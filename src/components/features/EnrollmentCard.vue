<template>
  <CardComponent :padding="true">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="font-semibold text-gray-900 mb-1">
          {{ enrollment.activityTitle }}
        </h3>
        <p v-if="viewMode === 'organizer'" class="text-sm text-gray-600">
          {{ enrollment.volunteerName }} ({{ enrollment.volunteerEmail }})
        </p>
      </div>
      <BadgeComponent 
        :variant="enrollment.status" 
        :text="getStatusLabel(enrollment.status)" 
      />
    </div>

    <!-- Message -->
    <div v-if="enrollment.message" class="bg-gray-50 rounded-lg p-3 mb-3">
      <p class="text-sm text-gray-700">{{ enrollment.message }}</p>
    </div>

    <!-- Rejection Reason -->
    <div v-if="enrollment.status === 'rejected' && enrollment.rejectionReason" class="bg-red-50 rounded-lg p-3 mb-3">
      <p class="text-sm text-red-700">
        <strong>Alasan:</strong> {{ enrollment.rejectionReason }}
      </p>
    </div>

    <!-- Meta Info -->
    <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
      <div class="flex items-center gap-1">
        <Clock :size="16" />
        <span>{{ formatDate(enrollment.enrolledAt) }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="showActions" class="flex gap-2">
      <!-- Volunteer Actions -->
      <template v-if="viewMode === 'volunteer'">
        <ButtonComponent
          v-if="enrollment.status === 'pending'"
          variant="danger"
          size="sm"
          @click="$emit('cancel', enrollment)"
        >
          Batalkan
        </ButtonComponent>
      </template>

      <!-- Organizer Actions -->
      <template v-if="viewMode === 'organizer'">
        <ButtonComponent
          v-if="enrollment.status === 'pending'"
          variant="success"
          size="sm"
          @click="$emit('accept', enrollment)"
        >
          Terima
        </ButtonComponent>
        <ButtonComponent
          v-if="enrollment.status === 'pending'"
          variant="danger"
          size="sm"
          @click="$emit('reject', enrollment)"
        >
          Tolak
        </ButtonComponent>
      </template>
    </div>
  </CardComponent>
</template>

<script setup>
import { Clock } from 'lucide-vue-next'
import CardComponent from '@/components/common/CardComponent.vue'
import BadgeComponent from '@/components/common/BadgeComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

defineProps({
  enrollment: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  viewMode: {
    type: String,
    default: 'volunteer',
    validator: (value) => ['volunteer', 'organizer'].includes(value)
  }
})

defineEmits(['cancel', 'accept', 'reject'])

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Menunggu',
    accepted: 'Diterima',
    rejected: 'Ditolak'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMM yyyy HH:mm', { locale: id })
}
</script>