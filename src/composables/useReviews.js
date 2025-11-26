import { ref, computed } from 'vue'
import { mockReviews } from '@/data/mockData'
import { useActivities } from './useActivities'
import { useEnrollments } from './useEnrollments'

// Global state
const reviews = ref([...mockReviews])

export function useReviews() {
  const { activities } = useActivities()
  const { enrollments } = useEnrollments()

  // ============================================
  // METHODS
  // ============================================

  /**
   * Get reviews by activity
   * @param {string} activityId
   * @returns {Array}
   */
  const getReviewsByActivity = (activityId) => {
    return reviews.value
      .filter(r => r.activityId === activityId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  /**
   * Get reviews by volunteer
   * @param {string} volunteerId
   * @returns {Array}
   */
  const getReviewsByVolunteer = (volunteerId) => {
    return reviews.value.filter(r => r.volunteerId === volunteerId)
  }

  /**
   * Check if volunteer already reviewed activity
   * @param {string} volunteerId
   * @param {string} activityId
   * @returns {boolean}
   */
  const hasReviewed = (volunteerId, activityId) => {
    return reviews.value.some(
      r => r.volunteerId === volunteerId && r.activityId === activityId
    )
  }

  /**
   * Check if volunteer can review (must be accepted)
   * @param {string} volunteerId
   * @param {string} activityId
   * @returns {boolean}
   */
  const canReview = (volunteerId, activityId) => {
    // Check if enrollment is accepted
    const enrollment = enrollments.value.find(
      e => e.volunteerId === volunteerId && 
           e.activityId === activityId && 
           e.status === 'accepted'
    )

    if (!enrollment) return false

    // Check if not already reviewed
    return !hasReviewed(volunteerId, activityId)
  }

  /**
   * Create new review
   * @param {Object} data - { activityId, activityTitle, volunteerId, volunteerName, rating, comment }
   * @returns {Object} { success, message, review }
   */
  const createReview = (data) => {
    // Check if can review
    if (!canReview(data.volunteerId, data.activityId)) {
      return {
        success: false,
        message: 'Anda hanya bisa review kegiatan yang sudah Anda ikuti'
      }
    }

    // Create review
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

    // Update activity rating
    updateActivityRating(data.activityId)

    return {
      success: true,
      message: 'Review berhasil ditambahkan',
      review: newReview
    }
  }

  /**
   * Calculate average rating for activity
   * @param {string} activityId
   * @returns {number}
   */
  const calculateAverageRating = (activityId) => {
    const activityReviews = getReviewsByActivity(activityId)
    
    if (activityReviews.length === 0) return 0

    const sum = activityReviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / activityReviews.length) * 10) / 10
  }

  /**
   * Update activity rating and review count
   * @param {string} activityId
   */
  const updateActivityRating = (activityId) => {
    const activityIndex = activities.value.findIndex(a => a.id === activityId)
    
    if (activityIndex === -1) return

    const activityReviews = getReviewsByActivity(activityId)
    const avgRating = calculateAverageRating(activityId)

    activities.value[activityIndex] = {
      ...activities.value[activityIndex],
      rating: avgRating,
      reviewCount: activityReviews.length
    }
  }

  /**
   * Get review by ID
   * @param {string} reviewId
   * @returns {Object|null}
   */
  const getReviewById = (reviewId) => {
    return reviews.value.find(r => r.id === reviewId) || null
  }

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    reviews,
    
    // Methods
    getReviewsByActivity,
    getReviewsByVolunteer,
    hasReviewed,
    canReview,
    createReview,
    calculateAverageRating,
    getReviewById
  }
}