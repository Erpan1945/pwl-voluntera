<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Loading State -->
    <div v-if="!currentUser" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <p class="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else>
      <NavbarComponent :user="currentUser" @logout="handleLogout" />

    <div class="max-w-7xl mx-auto px-4 py-5 flex-1 w-full">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Relawan</h1>
        <p class="text-gray-600">Selamat datang, {{ currentUser.name }}!</p>
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
        <!-- Browse Activities Tab -->
        <div v-show="activeTab === 'browse'">
          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <CardComponent>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Total Pendaftaran</p>
                  <p class="text-2xl font-bold text-gray-900">{{ myEnrollments.length }}</p>
                </div>
                <Calendar class="text-blue-600" :size="32" />
              </div>
            </CardComponent>

            <CardComponent>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Diterima</p>
                  <p class="text-2xl font-bold text-green-600">
                    {{ acceptedEnrollments.filter(e => e.volunteerId === currentUser.id).length }}
                  </p>
                </div>
                <CheckCircle class="text-green-600" :size="32" />
              </div>
            </CardComponent>

            <CardComponent>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Following</p>
                  <p class="text-2xl font-bold text-purple-600">{{ myFollows.length }}</p>
                </div>
                <Heart class="text-purple-600" :size="32" />
              </div>
            </CardComponent>
          </div>

          <!-- Filters -->
          <CardComponent class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputComponent
                v-model="filters.search"
                placeholder="Cari kegiatan..."
                label="Pencarian"
              />

              <SelectComponent
                v-model="filters.category"
                label="Kategori"
                :options="categoryOptions"
              />

              <SelectComponent
                v-model="filters.city"
                label="Kota"
                :options="cityOptions"
              />
            </div>
          </CardComponent>

          <!-- Activities Grid -->
          <div v-if="filteredActivities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActivityCard
              v-for="activity in filteredActivities"
              :key="activity.id"
              :activity="activity"
              @click="viewActivityDetail(activity)"
            />
          </div>

          <div v-else class="text-center py-12">
            <Search class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Tidak ada kegiatan ditemukan</p>
          </div>
        </div>

        <!-- My Enrollments Tab -->
        <div v-show="activeTab === 'enrollments'">
          <div v-if="myEnrollments.length > 0" class="space-y-4">
            <EnrollmentCard
              v-for="enrollment in myEnrollments"
              :key="enrollment.id"
              :enrollment="enrollment"
              :viewMode="'volunteer'"
              @cancel="cancelEnrollment"
            />
          </div>

          <div v-else class="text-center py-12">
            <Calendar class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Belum ada pendaftaran</p>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div v-show="activeTab === 'reviews'">
          <div class="mb-4">
            <ButtonComponent variant="primary" @click="showReviewModal = true">
              <Plus :size="20" class="inline mr-2" />
              Tulis Review
            </ButtonComponent>
          </div>

          <div v-if="myReviews.length > 0" class="space-y-4">
            <ReviewCard
              v-for="review in myReviews"
              :key="review.id"
              :review="review"
            />
          </div>

          <div v-else class="text-center py-12">
            <Star class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Belum ada review</p>
          </div>
        </div>

        <!-- Following Tab -->
        <div v-show="activeTab === 'following'">
          <div v-if="myFollows.length > 0" class="space-y-4">
            <FollowCard
              v-for="follow in myFollows"
              :key="follow.id"
              :follow="follow"
              @unfollow="unfollowOrganizer"
              @toggleNotification="toggleNotification"
            />
          </div>

          <div v-else class="text-center py-12">
            <Heart class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Belum mengikuti penyelenggara</p>
          </div>
        </div>

        <!-- Activity Lists Tab -->
        <div v-show="activeTab === 'lists'">
          <div class="mb-4">
            <ButtonComponent variant="primary" @click="showCreateListModal = true">
              <Plus :size="20" class="inline mr-2" />
              Buat Daftar Baru
            </ButtonComponent>
          </div>

          <div v-if="myLists.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActivityListCard
              v-for="list in myLists"
              :key="list.id"
              :list="list"
              :activities="getListActivities(list)"
              @rename="renameList"
              @delete="deleteList"
              @removeActivity="removeActivityFromList"
            />
          </div>

          <div v-else class="text-center py-12">
            <Bookmark class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Belum ada daftar kegiatan</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <ModalComponent
      :show="showReviewModal"
      title="Tulis Review"
      @close="showReviewModal = false"
    >
      <form @submit.prevent="submitReview">
        <SelectComponent
          v-model="reviewForm.activityId"
          label="Pilih Kegiatan"
          :options="reviewableActivitiesOptions"
          :required="true"
        />

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Rating <span class="text-red-500">*</span>
          </label>
          <div class="flex gap-2">
            <button
              v-for="i in 5"
              :key="i"
              type="button"
              @click="reviewForm.rating = i"
              class="p-2"
            >
              <Star
                :class="i <= reviewForm.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
                :size="32"
              />
            </button>
          </div>
        </div>

        <TextareaComponent
          v-model="reviewForm.comment"
          label="Komentar"
          placeholder="Bagaimana pengalaman Anda?"
          :required="true"
          :rows="4"
        />

        <div class="flex gap-2">
          <ButtonComponent type="submit" variant="primary">
            Kirim Review
          </ButtonComponent>
          <ButtonComponent type="button" variant="secondary" @click="showReviewModal = false">
            Batal
          </ButtonComponent>
        </div>
      </form>
    </ModalComponent>

    <!-- Create List Modal -->
    <ModalComponent
      :show="showCreateListModal"
      title="Buat Daftar Baru"
      @close="showCreateListModal = false"
    >
      <form @submit.prevent="createNewList">
        <InputComponent
          v-model="listForm.listName"
          label="Nama Daftar"
          placeholder="Contoh: Kegiatan Favorit"
          :required="true"
        />

        <div class="flex gap-2">
          <ButtonComponent type="submit" variant="primary">
            Buat Daftar
          </ButtonComponent>
          <ButtonComponent type="button" variant="secondary" @click="showCreateListModal = false">
            Batal
          </ButtonComponent>
        </div>
      </form>
    </ModalComponent>

    <FooterComponent />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Calendar, CheckCircle, Heart, Search, Star, Plus, Bookmark
} from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { useActivities } from '@/composables/useActivities'
import { useEnrollments } from '@/composables/useEnrollments'
import { useReviews } from '@/composables/useReviews'
import { useFollows } from '@/composables/useFollows'
import { useActivityLists } from '@/composables/useActivityLists'
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
import EnrollmentCard from '@/components/features/EnrollmentCard.vue'
import ReviewCard from '@/components/features/ReviewCard.vue'
import FollowCard from '@/components/features/FollowCard.vue'
import ActivityListCard from '@/components/features/ActivityListCard.vue'

const router = useRouter()
const { currentUser, logout, initAuth } = useAuth()

// Initialize auth on mount
onMounted(() => {
  initAuth()
})
const { filterActivities, publishedActivities, getAvailableCities } = useActivities()
const {
  getEnrollmentsByVolunteer,
  cancelEnrollment: cancelEnrollmentAction,
  acceptedEnrollments
} = useEnrollments()
const {
  getReviewsByVolunteer,
  createReview,
  canReview
} = useReviews()
const {
  getFollowsByVolunteer,
  unfollowOrganizer: unfollowAction,
  toggleNotification: toggleNotificationAction
} = useFollows()
const {
  getListsByVolunteer,
  createList,
  deleteList: deleteListAction,
  renameList: renameListAction,
  removeActivityFromList: removeActivityAction
} = useActivityLists()

// Tabs
const activeTab = ref('browse')
const tabs = [
  { id: 'browse', label: 'Jelajahi Kegiatan' },
  { id: 'enrollments', label: 'Pendaftaran Saya' },
  { id: 'reviews', label: 'Review Saya' },
  { id: 'following', label: 'Following' },
  { id: 'lists', label: 'Daftar Kegiatan' }
]

// Filters
const filters = ref({
  search: '',
  category: 'all',
  city: 'all'
})

// Modals
const showReviewModal = ref(false)
const showCreateListModal = ref(false)

// Forms
const reviewForm = ref({
  activityId: '',
  rating: 0,
  comment: ''
})

const listForm = ref({
  listName: ''
})

// Computed
const filteredActivities = computed(() => {
  return filterActivities(filters.value)
})

const cityOptions = computed(() => {
  const cities = getAvailableCities()
  return [
    { value: 'all', label: 'Semua Kota' },
    ...cities.map(city => ({ value: city, label: city }))
  ]
})

const myEnrollments = computed(() => {
  return getEnrollmentsByVolunteer(currentUser.value.id)
})

const myReviews = computed(() => {
  return getReviewsByVolunteer(currentUser.value.id)
})

const myFollows = computed(() => {
  return getFollowsByVolunteer(currentUser.value.id)
})

const myLists = computed(() => {
  return getListsByVolunteer(currentUser.value.id)
})

const reviewableActivitiesOptions = computed(() => {
  const accepted = acceptedEnrollments.value.filter(e => e.volunteerId === currentUser.value.id)
  return accepted
    .filter(e => canReview(currentUser.value.id, e.activityId))
    .map(e => ({
      value: e.activityId,
      label: e.activityTitle
    }))
})

// Methods
const viewActivityDetail = (activity) => {
  router.push(`/activity/${activity.id}`)
}

const handleLogout = () => {
  if (confirm('Yakin ingin logout?')) {
    logout()
    router.push('/login')
  }
}

const cancelEnrollment = (enrollment) => {
  if (confirm('Yakin ingin membatalkan pendaftaran?')) {
    const result = cancelEnrollmentAction(enrollment.id)
    if (result.success) {
      alert(result.message)
    }
  }
}

const submitReview = () => {
  const activity = publishedActivities.value.find(a => a.id === reviewForm.value.activityId)
  
  const result = createReview({
    activityId: reviewForm.value.activityId,
    activityTitle: activity.title,
    volunteerId: currentUser.value.id,
    volunteerName: currentUser.value.name,
    rating: reviewForm.value.rating,
    comment: reviewForm.value.comment
  })

  if (result.success) {
    alert(result.message)
    showReviewModal.value = false
    reviewForm.value = { activityId: '', rating: 0, comment: '' }
  } else {
    alert(result.message)
  }
}

const unfollowOrganizer = (follow) => {
  if (confirm(`Berhenti mengikuti ${follow.organizerName}?`)) {
    const result = unfollowAction(follow.volunteerId, follow.organizerId)
    if (result.success) {
      alert(result.message)
    }
  }
}

const toggleNotification = (follow) => {
  const result = toggleNotificationAction(follow.volunteerId, follow.organizerId)
  if (result.success) {
    alert(result.message)
  }
}

const createNewList = () => {
  const result = createList({
    volunteerId: currentUser.value.id,
    volunteerName: currentUser.value.name,
    listName: listForm.value.listName
  })

  if (result.success) {
    alert(result.message)
    showCreateListModal.value = false
    listForm.value.listName = ''
  } else {
    alert(result.message)
  }
}

const deleteList = (list) => {
  if (confirm(`Hapus daftar "${list.listName}"?`)) {
    const result = deleteListAction(list.id)
    if (result.success) {
      alert(result.message)
    }
  }
}

const renameList = (list) => {
  const newName = prompt('Nama baru:', list.listName)
  if (newName && newName !== list.listName) {
    const result = renameListAction(list.id, newName)
    if (result.success) {
      alert(result.message)
    } else {
      alert(result.message)
    }
  }
}

const removeActivityFromList = (list, activity) => {
  if (confirm(`Hapus "${activity.title}" dari daftar?`)) {
    const result = removeActivityAction(list.id, activity.id)
    if (result.success) {
      alert(result.message)
    }
  }
}

const getListActivities = (list) => {
  return publishedActivities.value.filter(a => list.activityIds.includes(a.id))
}
</script>