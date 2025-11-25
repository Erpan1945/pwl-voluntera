import { ref, computed } from 'vue'
import { mockEnrollments } from '@/data/mockData'
import { useActivities } from './useActivities'

// Global state
const enrollments = ref([...mockEnrollments])

export function useEnrollments() {
  const { activities } = useActivities()

  // ============================================
  // COMPUTED PROPERTIES
  // ============================================

  /**
   * Get pending enrollments
   */
  const pendingEnrollments = computed(() => {
    return enrollments.value.filter(e => e.status === 'pending')
  })

  /**
   * Get accepted enrollments
   */
  const acceptedEnrollments = computed(() => {
    return enrollments.value.filter(e => e.status === 'accepted')
  })

  /**
   * Get rejected enrollments
   */
  const rejectedEnrollments = computed(() => {
    return enrollments.value.filter(e => e.status === 'rejected')
  })

  // ============================================
  // METHODS
  // ============================================

  /**
   * Get enrollments by volunteer
   * @param {string} volunteerId
   * @returns {Array}
   */
  const getEnrollmentsByVolunteer = (volunteerId) => {
    return enrollments.value.filter(e => e.volunteerId === volunteerId)
  }

  /**
   * Get enrollments by activity
   * @param {string} activityId
   * @returns {Array}
   */
  const getEnrollmentsByActivity = (activityId) => {
    return enrollments.value.filter(e => e.activityId === activityId)
  }

  /**
   * Check if volunteer already enrolled in activity
   * @param {string} volunteerId
   * @param {string} activityId
   * @returns {Object|null}
   */
  const checkEnrollment = (volunteerId, activityId) => {
    return enrollments.value.find(
      e => e.volunteerId === volunteerId && e.activityId === activityId
    ) || null
  }

  /**
   * Create new enrollment
   * @param {Object} data - { activityId, activityTitle, volunteerId, volunteerName, volunteerEmail, message }
   * @returns {Object} { success, message, enrollment }
   */
  const createEnrollment = (data) => {
    // Check if already enrolled
    const existing = checkEnrollment(data.volunteerId, data.activityId)
    if (existing) {
      return {
        success: false,
        message: 'Anda sudah mendaftar di kegiatan ini'
      }
    }

    // Check activity capacity
    const activity = activities.value.find(a => a.id === data.activityId)
    if (!activity) {
      return {
        success: false,
        message: 'Kegiatan tidak ditemukan'
      }
    }

    if (activity.enrolledCount >= activity.capacity) {
      return {
        success: false,
        message: 'Kegiatan sudah penuh'
      }
    }

    // Create enrollment
    const newEnrollment = {
      id: `enrollment-${Date.now()}`,
      activityId: data.activityId,
      activityTitle: data.activityTitle,
      volunteerId: data.volunteerId,
      volunteerName: data.volunteerName,
      volunteerEmail: data.volunteerEmail,
      status: 'pending',
      message: data.message || '',
      enrolledAt: new Date().toISOString()
    }

    enrollments.value.push(newEnrollment)

    return {
      success: true,
      message: 'Pendaftaran berhasil! Menunggu konfirmasi penyelenggara.',
      enrollment: newEnrollment
    }
  }

  /**
   * Cancel enrollment (only pending)
   * @param {string} enrollmentId
   * @returns {Object} { success, message }
   */
  const cancelEnrollment = (enrollmentId) => {
    const enrollmentIndex = enrollments.value.findIndex(e => e.id === enrollmentId)
    
    if (enrollmentIndex === -1) {
      return {
        success: false,
        message: 'Pendaftaran tidak ditemukan'
      }
    }

    const enrollment = enrollments.value[enrollmentIndex]

    // Only pending can be cancelled
    if (enrollment.status !== 'pending') {
      return {
        success: false,
        message: 'Hanya pendaftaran pending yang bisa dibatalkan'
      }
    }

    // Delete enrollment
    enrollments.value.splice(enrollmentIndex, 1)

    return {
      success: true,
      message: 'Pendaftaran berhasil dibatalkan'
    }
  }

  /**
   * Accept enrollment (Organizer)
   * @param {string} enrollmentId
   * @returns {Object} { success, message }
   */
  const acceptEnrollment = (enrollmentId) => {
    const enrollmentIndex = enrollments.value.findIndex(e => e.id === enrollmentId)
    
    if (enrollmentIndex === -1) {
      return {
        success: false,
        message: 'Pendaftaran tidak ditemukan'
      }
    }

    const enrollment = enrollments.value[enrollmentIndex]

    // Check activity capacity
    const activity = activities.value.find(a => a.id === enrollment.activityId)
    if (!activity) {
      return {
        success: false,
        message: 'Kegiatan tidak ditemukan'
      }
    }

    if (activity.enrolledCount >= activity.capacity) {
      return {
        success: false,
        message: 'Kegiatan sudah penuh'
      }
    }

    // Update enrollment status
    enrollments.value[enrollmentIndex] = {
      ...enrollment,
      status: 'accepted'
    }

    // Update activity enrolled count
    const activityIndex = activities.value.findIndex(a => a.id === enrollment.activityId)
    if (activityIndex !== -1) {
      activities.value[activityIndex].enrolledCount += 1
    }

    return {
      success: true,
      message: 'Pendaftaran berhasil diterima'
    }
  }

  /**
   * Reject enrollment (Organizer)
   * @param {string} enrollmentId
   * @param {string} reason
   * @returns {Object} { success, message }
   */
  const rejectEnrollment = (enrollmentId, reason) => {
    const enrollmentIndex = enrollments.value.findIndex(e => e.id === enrollmentId)
    
    if (enrollmentIndex === -1) {
      return {
        success: false,
        message: 'Pendaftaran tidak ditemukan'
      }
    }

    const enrollment = enrollments.value[enrollmentIndex]

    // Update enrollment status
    enrollments.value[enrollmentIndex] = {
      ...enrollment,
      status: 'rejected',
      rejectionReason: reason
    }

    return {
      success: true,
      message: 'Pendaftaran berhasil ditolak'
    }
  }

  /**
   * Get enrollment by ID
   * @param {string} enrollmentId
   * @returns {Object|null}
   */
  const getEnrollmentById = (enrollmentId) => {
    return enrollments.value.find(e => e.id === enrollmentId) || null
  }

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    enrollments,
    
    // Computed
    pendingEnrollments,
    acceptedEnrollments,
    rejectedEnrollments,
    
    // Methods
    getEnrollmentsByVolunteer,
    getEnrollmentsByActivity,
    checkEnrollment,
    createEnrollment,
    cancelEnrollment,
    acceptEnrollment,
    rejectEnrollment,
    getEnrollmentById
  }
}