<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavbarComponent :user="currentUser" @logout="handleLogout" />

    <main class="flex-1 flex justify-center items-center">
    <div class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft :size="20" />
        <span>Kembali</span>
      </button>

      <!-- Loading -->
      <div v-if="!activity" class="text-center py-12">
        <p class="text-gray-600">Kegiatan tidak ditemukan</p>
      </div>

      <!-- Activity Detail -->
      <div v-else>
        <!-- Header Image -->
        <div class="h-64 md:h-96 mb-6 rounded-lg overflow-hidden bg-gray-200">
          <img
            v-if="activity.imageUrl"
            :src="activity.imageUrl"
            :alt="activity.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Main Content -->
          <div class="md:col-span-2 space-y-6">
            <!-- Title & Category -->
            <CardComponent>
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <BadgeComponent
                    :variant="'info'"
                    :text="getCategoryLabel(activity.category)"
                    class="mb-2"
                  />
                  <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ activity.title }}</h1>
                  <div class="flex items-center gap-2 text-gray-600">
                    <Building2 :size="16" />
                    <span>{{ activity.organizerName }}</span>
                  </div>
                </div>

                <!-- Follow Button (Volunteer only) -->
                <div v-if="isVolunteer">
                  <ButtonComponent
                    v-if="!isFollowing"
                    variant="outline"
                    size="sm"
                    @click="handleFollow"
                  >
                    <Heart :size="16" class="inline mr-1" />
                    Follow
                  </ButtonComponent>
                  <ButtonComponent
                    v-else
                    variant="danger"
                    size="sm"
                    @click="handleUnfollow"
                  >
                    <Heart :size="16" class="inline mr-1 fill-current" />
                    Unfollow
                  </ButtonComponent>
                </div>
              </div>

              <!-- Rating -->
              <div v-if="activity.rating > 0" class="flex items-center gap-2 mb-4">
                <div class="flex items-center gap-1">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    :class="i <= Math.round(activity.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
                    :size="20"
                  />
                </div>
                <span class="font-medium text-gray-900">{{ activity.rating }}</span>
                <span class="text-gray-600">({{ activity.reviewCount }} review)</span>
              </div>

              <!-- Description -->
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Deskripsi</h3>
                <p class="text-gray-700 leading-relaxed">{{ activity.description }}</p>
              </div>

              <!-- Requirements -->
              <div v-if="activity.requirements">
                <h3 class="font-semibold text-gray-900 mb-2">Persyaratan</h3>
                <p class="text-gray-700">{{ activity.requirements }}</p>
              </div>

              <!-- Tags -->
              <div v-if="activity.tags && activity.tags.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2">Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in activity.tags"
                    :key="tag"
                    class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </CardComponent>

            <!-- Reviews -->
            <CardComponent>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Review ({{ activityReviews.length }})
              </h3>

              <div v-if="activityReviews.length > 0" class="space-y-4">
                <ReviewCard
                  v-for="review in activityReviews"
                  :key="review.id"
                  :review="review"
                />
              </div>

              <div v-else class="text-center py-8 text-gray-500">
                Belum ada review
              </div>
            </CardComponent>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Info Card -->
            <CardComponent>
              <h3 class="font-semibold text-gray-900 mb-4">Informasi Kegiatan</h3>
              
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <MapPin class="text-gray-400 mt-0.5" :size="18" />
                  <div>
                    <p class="font-medium text-gray-900">{{ activity.location }}</p>
                    <p class="text-gray-600">{{ activity.city }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <Calendar class="text-gray-400" :size="18" />
                  <span class="text-gray-700">{{ formatDate(activity.date) }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <Clock class="text-gray-400" :size="18" />
                  <span class="text-gray-700">{{ activity.time }} ({{ activity.duration }})</span>
                </div>

                <div class="flex items-center gap-2">
                  <Users class="text-gray-400" :size="18" />
                  <span class="text-gray-700">
                    {{ activity.enrolledCount }}/{{ activity.capacity }} peserta
                  </span>
                </div>
              </div>

              <!-- Enrollment Button (Volunteer only) -->
              <div v-if="isVolunteer" class="mt-6">
                <!-- Already Enrolled -->
                <div v-if="myEnrollment">
                  <BadgeComponent
                    :variant="myEnrollment.status"
                    :text="getEnrollmentStatusLabel(myEnrollment.status)"
                    class="w-full text-center block mb-2"
                  />
                  <ButtonComponent
                    v-if="myEnrollment.status === 'pending'"
                    variant="danger"
                    size="sm"
                    class="w-full"
                    @click="handleCancelEnrollment"
                  >
                    Batalkan Pendaftaran
                  </ButtonComponent>
                </div>

                <!-- Not Enrolled -->
                <ButtonComponent
                  v-else
                  variant="primary"
                  class="w-full"
                  :disabled="activity.enrolledCount >= activity.capacity"
                  @click="showEnrollModal = true"
                >
                  <UserPlus :size="20" class="inline mr-2" />
                  {{ activity.enrolledCount >= activity.capacity ? 'Penuh' : 'Daftar Sekarang' }}
                </ButtonComponent>
              </div>

              <!-- Add to List (Volunteer only) -->
              <div v-if="isVolunteer && myLists.length > 0" class="mt-4">
                <ButtonComponent
                  variant="secondary"
                  size="sm"
                  class="w-full"
                  @click="showAddToListModal = true"
                >
                  <Bookmark :size="16" class="inline mr-2" />
                  Tambah ke Daftar
                </ButtonComponent>
              </div>
            </CardComponent>

            <!-- Organizer Info -->
            <CardComponent>
              <h3 class="font-semibold text-gray-900 mb-4">Penyelenggara</h3>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 class="text-blue-600" :size="24" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ activity.organizerName }}</p>
                  <p class="text-sm text-gray-600">Penyelenggara</p>
                </div>
              </div>
            </CardComponent>
          </div>
        </div>
      </div>
    </div>
    </main>

    <!-- Enroll Modal -->
    <ModalComponent
      :show="showEnrollModal"
      title="Daftar Kegiatan"
      @close="showEnrollModal = false"
    >
      <form @submit.prevent="handleEnroll">
        <div class="mb-4">
          <p class="text-gray-700 mb-2">
            Anda akan mendaftar untuk kegiatan <strong>{{ activity?.title }}</strong>
          </p>
        </div>

        <TextareaComponent
          v-model="enrollMessage"
          label="Pesan (Opsional)"
          placeholder="Beritahu penyelenggara mengapa Anda tertarik..."
          :rows="3"
        />

        <div class="flex gap-2">
          <ButtonComponent type="submit" variant="primary">
            Daftar
          </ButtonComponent>
          <ButtonComponent type="button" variant="secondary" @click="showEnrollModal = false">
            Batal
          </ButtonComponent>
        </div>
      </form>
    </ModalComponent>

    <!-- Add to List Modal -->
    <ModalComponent
      :show="showAddToListModal"
      title="Tambah ke Daftar"
      @close="showAddToListModal = false"
    >
      <div class="space-y-2">
        <button
          v-for="list in myLists"
          :key="list.id"
          @click="handleAddToList(list)"
          class="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <p class="font-medium text-gray-900">{{ list.listName }}</p>
          <p class="text-sm text-gray-600">{{ list.activityIds.length }} kegiatan</p>
        </button>
      </div>

      <div v-if="myLists.length === 0" class="text-center py-4 text-gray-500">
        Belum ada daftar. Buat daftar dulu di dashboard.
      </div>
    </ModalComponent>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ArrowLeft, Heart, Star, MapPin, Calendar, Clock, Users,
  Building2, UserPlus, Bookmark
} from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { useActivities } from '@/composables/useActivities'
import { useEnrollments } from '@/composables/useEnrollments'
import { useReviews } from '@/composables/useReviews'
import { useFollows } from '@/composables/useFollows'
import { useActivityLists } from '@/composables/useActivityLists'

import NavbarComponent from '@/components/layout/NavbarComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import CardComponent from '@/components/common/CardComponent.vue'
import BadgeComponent from '@/components/common/BadgeComponent.vue'
import TextareaComponent from '@/components/common/TextareaComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import ModalComponent from '@/components/common/ModalComponent.vue'
import ReviewCard from '@/components/features/ReviewCard.vue'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const router = useRouter()
const route = useRoute()
const { currentUser, isVolunteer, logout } = useAuth()
const { getActivityById } = useActivities()
const {
  checkEnrollment,
  createEnrollment,
  cancelEnrollment: cancelEnrollmentAction
} = useEnrollments()
const { getReviewsByActivity } = useReviews()
const {
  checkFollowing,
  followOrganizer,
  unfollowOrganizer
} = useFollows()
const {
  getListsByVolunteer,
  addActivityToList
} = useActivityLists()

// State
const activityId = route.params.id
const activity = ref(null)
const showEnrollModal = ref(false)
const showAddToListModal = ref(false)
const enrollMessage = ref('')

// Load activity
onMounted(() => {
  activity.value = getActivityById(activityId)
})

// Computed
const activityReviews = computed(() => {
  if (!activity.value) return []
  return getReviewsByActivity(activity.value.id)
})

const myEnrollment = computed(() => {
  if (!activity.value || !isVolunteer.value) return null
  return checkEnrollment(currentUser.value.id, activity.value.id)
})

const isFollowing = computed(() => {
  if (!activity.value || !isVolunteer.value) return false
  return checkFollowing(currentUser.value.id, activity.value.organizerId) !== null
})

const myLists = computed(() => {
  if (!isVolunteer.value) return []
  return getListsByVolunteer(currentUser.value.id)
})

// Methods
const goBack = () => {
  router.back()
}

const handleLogout = () => {
  if (confirm('Yakin ingin logout?')) {
    logout()
    router.push('/login')
  }
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

const getEnrollmentStatusLabel = (status) => {
  const labels = {
    pending: 'Menunggu',
    accepted: 'Diterima',
    rejected: 'Ditolak'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMMM yyyy', { locale: id })
}

const handleEnroll = () => {
  const result = createEnrollment({
    activityId: activity.value.id,
    activityTitle: activity.value.title,
    volunteerId: currentUser.value.id,
    volunteerName: currentUser.value.name,
    volunteerEmail: currentUser.value.email,
    message: enrollMessage.value
  })

  if (result.success) {
    alert(result.message)
    showEnrollModal.value = false
    enrollMessage.value = ''
  } else {
    alert(result.message)
  }
}

const handleCancelEnrollment = () => {
  if (confirm('Yakin ingin membatalkan pendaftaran?')) {
    const result = cancelEnrollmentAction(myEnrollment.value.id)
    if (result.success) {
      alert(result.message)
    }
  }
}

const handleFollow = () => {
  const result = followOrganizer({
    volunteerId: currentUser.value.id,
    volunteerName: currentUser.value.name,
    organizerId: activity.value.organizerId,
    organizerName: activity.value.organizerName
  })

  if (result.success) {
    alert(result.message)
  }
}

const handleUnfollow = () => {
  if (confirm(`Berhenti mengikuti ${activity.value.organizerName}?`)) {
    const result = unfollowOrganizer(currentUser.value.id, activity.value.organizerId)
    if (result.success) {
      alert(result.message)
    }
  }
}

const handleAddToList = (list) => {
  const result = addActivityToList(list.id, activity.value.id)
  
  if (result.success) {
    alert(result.message)
    showAddToListModal.value = false
  } else {
    alert(result.message)
  }
}
</script>