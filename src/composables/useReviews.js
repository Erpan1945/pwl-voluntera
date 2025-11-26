import { ref } from 'vue'
import { mockReviews } from '@/data/mockData'
import { useActivities } from './useActivities'
import { useEnrollments } from './useEnrollments'

// Global state
const reviews = ref([...mockReviews])

export function useReviews() {
  const { activities } = useActivities()
  const { enrollments } = useEnrollments()

  const getReviewsByActivity = (activityId) => {
    return reviews.value
      .filter(r => r.activityId === activityId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const getReviewsByVolunteer = (volunteerId) => {
    return reviews.value.filter(r => r.volunteerId === volunteerId)
  }

  const hasReviewed = (volunteerId, activityId) => {
    return reviews.value.some(
      r => r.volunteerId === volunteerId && r.activityId === activityId
    )
  }

  const canReview = (volunteerId, activityId) => {
    const enrollment = enrollments.value.find(
      e => e.volunteerId === volunteerId &&
           e.activityId === activityId &&
           e.status === 'accepted'
    )

    if (!enrollment) return false
    return !hasReviewed(volunteerId, activityId)
  }

  const createReview = (data) => {
    if (!canReview(data.volunteerId, data.activityId)) {
      return { success: false, message: 'Anda hanya bisa review kegiatan yang Anda ikuti.' }
    }

    const newReview = {
      id: `review-${Date.now()}`,
      activityId: data.activityId,
      activityTitle: data.activityTitle,
      volunteerId: data.volunteerId,
      volunteerName: data.volunteerName,
      rating: parseInt(data.rating),
      comment: data.comment,
      createdAt: new Date().toISOString()
    }

    reviews.value.push(newReview)
    updateActivityRating(data.activityId)

    return { success: true, message: 'Review berhasil ditambahkan', review: newReview }
  }

  // 🔥 NEW — Update review
  const updateReview = (reviewId, data) => {
    const index = reviews.value.findIndex(r => r.id === reviewId)
    if (index === -1) {
      return { success: false, message: 'Review tidak ditemukan' }
    }

    reviews.value[index] = {
      ...reviews.value[index],
      rating: data.rating ?? reviews.value[index].rating,
      comment: data.comment ?? reviews.value[index].comment,
      updatedAt: new Date().toISOString()
    }

    updateActivityRating(reviews.value[index].activityId)

    return {
      success: true,
      message: 'Review berhasil diperbarui',
      updatedReview: reviews.value[index]
    }
  }

  const calculateAverageRating = (activityId) => {
    const activityReviews = getReviewsByActivity(activityId)
    if (activityReviews.length === 0) return 0

    const sum = activityReviews.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / activityReviews.length) * 10) / 10
  }

  const updateActivityRating = (activityId) => {
    const idx = activities.value.findIndex(a => a.id === activityId)
    if (idx === -1) return

    const activityReviews = getReviewsByActivity(activityId)
    activities.value[idx] = {
      ...activities.value[idx],
      rating: calculateAverageRating(activityId),
      reviewCount: activityReviews.length
    }
  }

  const getReviewById = (id) => {
    return reviews.value.find(r => r.id === id) || null
  }

  return {
    reviews,
    getReviewsByActivity,
    getReviewsByVolunteer,
    hasReviewed,
    canReview,
    createReview,
    updateReview, // <-- required
    calculateAverageRating,
    getReviewById
  }
}
