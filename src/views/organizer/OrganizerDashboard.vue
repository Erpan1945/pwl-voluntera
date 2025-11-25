<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavbarComponent :user="currentUser" @logout="handleLogout" />

    <div class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Penyelenggara</h1>
        <p class="text-gray-600">{{ currentUser.name }}</p>
      </div>

      <!-- Tabs -->
      <div class="mb-6 border-b">
        <div class="flex gap-4 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2 font-medium whitespace-nowrap transition-colors',
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
        <!-- Overview Tab -->
        <div v-show="activeTab === 'overview'">
          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <CardComponent>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Total Kegiatan</p>
                  <p class="text-2xl font-bold text-gray-900">{{ myActivities.length }}</p>
                </div>
                <Calendar class="text-blue-600" :size="32" />
              </div>
            </CardComponent>

            <CardComponent>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Total Peserta</p>
                  <p class="text-2xl font-bold text-green-600">{{ totalParticipants }}</p>
                </div>
                <Users class="text-green-600" :size="32" />
              </div>
            </CardComponent>

            <CardComponent>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Rating Rata-rata</p>
                  <p class="text-2xl font-bold text-yellow-600">{{ averageRating.toFixed(1) }}</p>
                </div>
                <Star class="text-yellow-600" :size="32" />
              </div>
            </CardComponent>
          </div>

          <!-- Popular Activities -->
          <CardComponent>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Kegiatan Populer</h3>
            <div v-if="popularActivities.length > 0" class="space-y-3">
              <div
                v-for="activity in popularActivities"
                :key="activity.id"
                class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-sm text-gray-600">{{ activity.enrolledCount }}/{{ activity.capacity }} peserta</p>
                </div>
                <div class="flex items-center gap-1">
                  <Star class="text-yellow-500 fill-yellow-500" :size="16" />
                  <span class="font-medium">{{ activity.rating }}</span>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-4 text-gray-500">
              Belum ada kegiatan
            </div>
          </CardComponent>
        </div>

        <!-- Activity Requests Tab -->
        <div v-show="activeTab === 'requests'">
          <div class="mb-4">
            <ButtonComponent variant="primary" @click="showCreateRequestModal = true">
              <Plus :size="20" class="inline mr-2" />
              Buat Permohonan Baru
            </ButtonComponent>
          </div>

          <div v-if="myRequests.length > 0" class="space-y-4">
            <ActivityRequestCard
              v-for="request in myRequests"
              :key="request.id"
              :request="request"
              :viewMode="'organizer'"
              @edit="editRequest"
              @delete="deleteRequest"
            />
          </div>

          <div v-else class="text-center py-12">
            <FileText class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Belum ada permohonan kegiatan</p>
          </div>
        </div>

        <!-- Activities Tab -->
        <div v-show="activeTab === 'activities'">
          <div v-if="myActivities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActivityCard
              v-for="activity in myActivities"
              :key="activity.id"
              :activity="activity"
              @click="viewActivityDetail(activity)"
            />
          </div>

          <div v-else class="text-center py-12">
            <Calendar class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Belum ada kegiatan dipublikasikan</p>
          </div>
        </div>

        <!-- Enrollments Tab -->
        <div v-show="activeTab === 'enrollments'">
          <div v-if="allEnrollments.length > 0" class="space-y-4">
            <EnrollmentCard
              v-for="enrollment in allEnrollments"
              :key="enrollment.id"
              :enrollment="enrollment"
              :viewMode="'organizer'"
              @accept="acceptEnrollment"
              @reject="rejectEnrollment"
            />
          </div>

          <div v-else class="text-center py-12">
            <Users class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Belum ada pendaftaran</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Request Modal -->
    <ModalComponent
      :show="showCreateRequestModal"
      title="Buat Permohonan Kegiatan"
      size="lg"
      @close="showCreateRequestModal = false"
    >
      <form @submit.prevent="submitRequest">
        <InputComponent
          v-model="requestForm.title"
          label="Judul Kegiatan"
          :required="true"
        />

        <TextareaComponent
          v-model="requestForm.description"
          label="Deskripsi"
          :required="true"
          :rows="4"
        />

        <SelectComponent
          v-model="requestForm.category"
          label="Kategori"
          :options="categoryOptions"
          :required="true"
        />

        <div class="grid grid-cols-2 gap-4">
          <InputComponent
            v-model="requestForm.location"
            label="Lokasi"
            :required="true"
          />

          <InputComponent
            v-model="requestForm.city"
            label="Kota"
            :required="true"
          />
        </div>

        <div class="grid grid-cols-3 gap-4">
          <InputComponent
            v-model="requestForm.date"
            label="Tanggal"
            type="date"
            :required="true"
          />

          <InputComponent
            v-model="requestForm.time"
            label="Waktu"
            type="time"
            :required="true"
          />

          <InputComponent
            v-model="requestForm.duration"
            label="Durasi"
            placeholder="3 jam"
            :required="true"
          />
        </div>

        <InputComponent
          v-model="requestForm.capacity"
          label="Kapasitas"
          type="number"
          :required="true"
        />

        <TextareaComponent
          v-model="requestForm.requirements"
          label="Persyaratan (Opsional)"
          :rows="2"
        />

        <div class="flex gap-2">
          <ButtonComponent type="submit" variant="primary">
            Kirim Permohonan
          </ButtonComponent>
          <ButtonComponent type="button" variant="secondary" @click="showCreateRequestModal = false">
            Batal
          </ButtonComponent>
        </div>
      </form>
    </ModalComponent>

    <!-- Reject Enrollment Modal -->
    <ModalComponent
      :show="showRejectModal"
      title="Tolak Pendaftaran"
      @close="showRejectModal = false"
    >
      <form @submit.prevent="confirmReject">
        <p class="text-gray-700 mb-4">
          Berikan alasan penolakan untuk <strong>{{ selectedEnrollment?.volunteerName }}</strong>
        </p>

        <TextareaComponent
          v-model="rejectionReason"
          label="Alasan Penolakan"
          :required="true"
          :rows="3"
        />

        <div class="flex gap-2">
          <ButtonComponent type="submit" variant="danger">
            Tolak Pendaftaran
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
import { Calendar, Users, Star, Plus, FileText } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { useActivities } from '@/composables/useActivities'
import { useEnrollments } from '@/composables/useEnrollments'
import { categoryOptions } from '@/data/mockData'

import NavbarComponent from '@/components/layout/NavbarComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import CardComponent from '@/components/common/CardComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import SelectComponent from '@/components/common/SelectComponent.vue'
import TextareaComponent from '@/components/common/TextareaComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import ModalComponent from '@/components/common/ModalComponent.vue'
import ActivityCard from '@/components/features/ActivityCard.vue'
import ActivityRequestCard from '@/components/features/ActivityRequestCard.vue'
import EnrollmentCard from '@/components/features/EnrollmentCard.vue'

const router = useRouter()
const { currentUser, logout } = useAuth()
const {
  getActivitiesByOrganizer,
  getRequestsByOrganizer,
  createActivityRequest,
  deleteActivityRequest
} = useActivities()
const {
  getEnrollmentsByActivity,
  acceptEnrollment: acceptEnrollmentAction,
  rejectEnrollment: rejectEnrollmentAction
} = useEnrollments()

// Tabs
const activeTab = ref('overview')
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'requests', label: 'Permohonan' },
  { id: 'activities', label: 'Kegiatan' },
  { id: 'enrollments', label: 'Pendaftaran' }
]

// Modals
const showCreateRequestModal = ref(false)
const showRejectModal = ref(false)

// Forms
const requestForm = ref({
  title: '',
  description: '',
  category: '',
  location: '',
  city: '',
  date: '',
  time: '',
  duration: '',
  capacity: '',
  requirements: ''
})

const selectedEnrollment = ref(null)
const rejectionReason = ref('')

// Computed
const myActivities = computed(() => {
  return getActivitiesByOrganizer(currentUser.value.id)
})

const myRequests = computed(() => {
  return getRequestsByOrganizer(currentUser.value.id)
})

const allEnrollments = computed(() => {
  const enrollments = []
  myActivities.value.forEach(activity => {
    const activityEnrollments = getEnrollmentsByActivity(activity.id)
    enrollments.push(...activityEnrollments)
  })
  return enrollments.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
})

const totalParticipants = computed(() => {
  return myActivities.value.reduce((sum, activity) => sum + activity.enrolledCount, 0)
})

const averageRating = computed(() => {
  const activitiesWithRating = myActivities.value.filter(a => a.rating > 0)
  if (activitiesWithRating.length === 0) return 0
  const sum = activitiesWithRating.reduce((sum, activity) => sum + activity.rating, 0)
  return sum / activitiesWithRating.length
})

const popularActivities = computed(() => {
  return [...myActivities.value]
    .sort((a, b) => b.enrolledCount - a.enrolledCount)
    .slice(0, 5)
})

// Methods
const handleLogout = () => {
  if (confirm('Yakin ingin logout?')) {
    logout()
    router.push('/login')
  }
}

const submitRequest = () => {
  const result = createActivityRequest({
    ...requestForm.value,
    organizerId: currentUser.value.id,
    organizerName: currentUser.value.name
  })

  if (result.success) {
    alert(result.message)
    showCreateRequestModal.value = false
    requestForm.value = {
      title: '',
      description: '',
      category: '',
      location: '',
      city: '',
      date: '',
      time: '',
      duration: '',
      capacity: '',
      requirements: ''
    }
  } else {
    alert(result.message)
  }
}

const editRequest = (request) => {
  // Populate form with request data
  requestForm.value = { ...request }
  showCreateRequestModal.value = true
}

const deleteRequest = (request) => {
  if (confirm(`Hapus permohonan "${request.title}"?`)) {
    const result = deleteActivityRequest(request.id)
    if (result.success) {
      alert(result.message)
    } else {
      alert(result.message)
    }
  }
}

const viewActivityDetail = (activity) => {
  router.push(`/activity/${activity.id}`)
}

const acceptEnrollment = (enrollment) => {
  if (confirm(`Terima pendaftaran dari ${enrollment.volunteerName}?`)) {
    const result = acceptEnrollmentAction(enrollment.id)
    if (result.success) {
      alert(result.message)
    } else {
      alert(result.message)
    }
  }
}

const rejectEnrollment = (enrollment) => {
  selectedEnrollment.value = enrollment
  showRejectModal.value = true
}

const confirmReject = () => {
  const result = rejectEnrollmentAction(selectedEnrollment.value.id, rejectionReason.value)
  
  if (result.success) {
    alert(result.message)
    showRejectModal.value = false
    selectedEnrollment.value = null
    rejectionReason.value = ''
  } else {
    alert(result.message)
  }
}
</script>