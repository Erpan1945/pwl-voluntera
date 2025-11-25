<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavbarComponent :user="currentUser" @logout="handleLogout" />

    <div class="max-w-full mx-auto px-4 py-8 flex-1 w-full">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p class="text-gray-600 pb-5">Kelola permohonan dan kegiatan</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ">
        <CardComponent>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-yellow-600">{{ pendingRequests.length }}</p>
            </div>
            <Clock class="text-yellow-600" :size="32" />
          </div>
        </CardComponent>

        <CardComponent>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Disetujui</p>
              <p class="text-2xl font-bold text-green-600">{{ approvedRequests.length }}</p>
            </div>
            <CheckCircle class="text-green-600" :size="32" />
          </div>
        </CardComponent>

        <CardComponent>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Ditolak</p>
              <p class="text-2xl font-bold text-red-600">{{ rejectedRequests.length }}</p>
            </div>
            <XCircle class="text-red-600" :size="32" />
          </div>
        </CardComponent>

        <CardComponent>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Kegiatan</p>
              <p class="text-2xl font-bold text-blue-600">{{ publishedActivities.length }}</p>
            </div>
            <Calendar class="text-blue-600" :size="32" />
          </div>
        </CardComponent>
      </div>

      <!-- Tabs -->
      <div class="mb-6 border-b">
        <div class="flex gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-3 font-medium transition-colors',
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div>
        <!-- Pending Requests Tab -->
        <div v-show="activeTab === 'pending'">
          <div v-if="pendingRequests.length > 0" class="space-y-4">
            <ActivityRequestCard
              v-for="request in pendingRequests"
              :key="request.id"
              :request="request"
              :viewMode="'admin'"
              @approve="approveRequest"
              @reject="rejectRequest"
            />
          </div>

          <div v-else class="text-center py-12">
            <Clock class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Tidak ada permohonan pending</p>
          </div>
        </div>

        <!-- All Activities Tab -->
        <div v-show="activeTab === 'activities'">
          <div class="mb-4 py-5">
            <InputComponent
              v-model="activitySearch"
              placeholder="Cari kegiatan..."
            />
          </div>

          <div v-if="filteredPublishedActivities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActivityCard
              v-for="activity in filteredPublishedActivities"
              :key="activity.id"
              :activity="activity"
              @click="viewActivityDetail(activity)"
            />
          </div>

          <div v-else class="text-center py-12">
            <Calendar class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Tidak ada kegiatan</p>
          </div>
        </div>

        <!-- History Tab -->
        <div v-show="activeTab === 'history'">
          <div class="space-y-6">
            <!-- Approved -->
            <div>
              <h3 class="text-lg font-semibold text-green-600 mb-3">
                Disetujui ({{ approvedRequests.length }})
              </h3>
              <div v-if="approvedRequests.length > 0" class="space-y-3">
                <ActivityRequestCard
                  v-for="request in approvedRequests"
                  :key="request.id"
                  :request="request"
                  :viewMode="'admin'"
                  :showActions="false"
                />
              </div>
              <p v-else class="text-gray-500 text-sm">Belum ada permohonan disetujui</p>
            </div>

            <!-- Rejected -->
            <div>
              <h3 class="text-lg font-semibold text-red-600 mb-3">
                Ditolak ({{ rejectedRequests.length }})
              </h3>
              <div v-if="rejectedRequests.length > 0" class="space-y-3">
                <ActivityRequestCard
                  v-for="request in rejectedRequests"
                  :key="request.id"
                  :request="request"
                  :viewMode="'admin'"
                  :showActions="false"
                />
              </div>
              <p v-else class="text-gray-500 text-sm">Belum ada permohonan ditolak</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <ModalComponent
      :show="showRejectModal"
      title="Tolak Permohonan"
      @close="showRejectModal = false"
    >
      <form @submit.prevent="confirmReject">
        <p class="text-gray-700 mb-4">
          Berikan alasan penolakan untuk permohonan <strong>{{ selectedRequest?.title }}</strong>
        </p>

        <TextareaComponent
          v-model="rejectionReason"
          label="Alasan Penolakan"
          :required="true"
          :rows="4"
        />

        <div class="flex gap-2">
          <ButtonComponent type="submit" variant="danger">
            Tolak Permohonan
          </ButtonComponent>
          <ButtonComponent type="button" variant="secondary" @click="showRejectModal = false">
            Batal
          </ButtonComponent>
        </div>
      </form>
    </ModalComponent>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { useActivities } from '@/composables/useActivities'

import NavbarComponent from '@/components/layout/NavbarComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import CardComponent from '@/components/common/CardComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import TextareaComponent from '@/components/common/TextareaComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import ModalComponent from '@/components/common/ModalComponent.vue'
import ActivityCard from '@/components/features/ActivityCard.vue'
import ActivityRequestCard from '@/components/features/ActivityRequestCard.vue'

const router = useRouter()
const { currentUser, logout } = useAuth()
const {
  publishedActivities,
  pendingRequests,
  approvedRequests,
  rejectedRequests,
  approveRequest: approveRequestAction,
  rejectRequest: rejectRequestAction
} = useActivities()

// Tabs
const activeTab = ref('pending')
const tabs = [
  { id: 'pending', label: 'Pending' },
  { id: 'activities', label: 'Semua Kegiatan' },
  { id: 'history', label: 'Riwayat' }
]

// State
const activitySearch = ref('')
const showRejectModal = ref(false)
const selectedRequest = ref(null)
const rejectionReason = ref('')

// Computed
const filteredPublishedActivities = computed(() => {
  if (!activitySearch.value) return publishedActivities.value

  const query = activitySearch.value.toLowerCase()
  return publishedActivities.value.filter(activity =>
    activity.title.toLowerCase().includes(query) ||
    activity.description.toLowerCase().includes(query) ||
    activity.organizerName.toLowerCase().includes(query)
  )
})

// Methods
const handleLogout = () => {
  if (confirm('Yakin ingin logout?')) {
    logout()
    router.push('/login')
  }
}

const approveRequest = (request) => {
  if (confirm(`Setujui permohonan "${request.title}"?`)) {
    const result = approveRequestAction(request.id)
    if (result.success) {
      alert(result.message)
    } else {
      alert(result.message)
    }
  }
}

const rejectRequest = (request) => {
  selectedRequest.value = request
  showRejectModal.value = true
}

const confirmReject = () => {
  const result = rejectRequestAction(selectedRequest.value.id, rejectionReason.value)
  
  if (result.success) {
    alert(result.message)
    showRejectModal.value = false
    selectedRequest.value = null
    rejectionReason.value = ''
  } else {
    alert(result.message)
  }
}

const viewActivityDetail = (activity) => {
  router.push(`/activity/${activity.id}`)
}
</script>