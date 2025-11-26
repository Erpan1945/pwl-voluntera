import { ref, computed } from 'vue'
import { mockFollows } from '@/data/mockData'

// Global state
const follows = ref([...mockFollows])

export function useFollows() {
  // ============================================
  // METHODS
  // ============================================

  /**
   * Get follows by volunteer
   * @param {string} volunteerId
   * @returns {Array}
   */
  const getFollowsByVolunteer = (volunteerId) => {
    return follows.value.filter(f => f.volunteerId === volunteerId)
  }

  /**
   * Get followers by organizer
   * @param {string} organizerId
   * @returns {Array}
   */
  const getFollowersByOrganizer = (organizerId) => {
    return follows.value.filter(f => f.organizerId === organizerId)
  }

  /**
   * Check if volunteer is following organizer
   * @param {string} volunteerId
   * @param {string} organizerId
   * @returns {Object|null}
   */
  const checkFollowing = (volunteerId, organizerId) => {
    return follows.value.find(
      f => f.volunteerId === volunteerId && f.organizerId === organizerId
    ) || null
  }

  /**
   * Follow organizer
   * @param {Object} data - { volunteerId, volunteerName, organizerId, organizerName }
   * @returns {Object} { success, message, follow }
   */
  const followOrganizer = (data) => {
    // Check if already following
    const existing = checkFollowing(data.volunteerId, data.organizerId)
    if (existing) {
      return {
        success: false,
        message: 'Anda sudah mengikuti penyelenggara ini'
      }
    }

    // Create follow
    const newFollow = {
      id: `follow-${Date.now()}`,
      volunteerId: data.volunteerId,
      volunteerName: data.volunteerName,
      organizerId: data.organizerId,
      organizerName: data.organizerName,
      notificationEnabled: true,
      followedAt: new Date().toISOString()
    }

    follows.value.push(newFollow)

    return {
      success: true,
      message: `Anda sekarang mengikuti ${data.organizerName}`,
      follow: newFollow
    }
  }

  /**
   * Unfollow organizer
   * @param {string} volunteerId
   * @param {string} organizerId
   * @returns {Object} { success, message }
   */
  const unfollowOrganizer = (volunteerId, organizerId) => {
    const followIndex = follows.value.findIndex(
      f => f.volunteerId === volunteerId && f.organizerId === organizerId
    )

    if (followIndex === -1) {
      return {
        success: false,
        message: 'Anda tidak mengikuti penyelenggara ini'
      }
    }

    const follow = follows.value[followIndex]
    follows.value.splice(followIndex, 1)

    return {
      success: true,
      message: `Anda berhenti mengikuti ${follow.organizerName}`
    }
  }

  /**
   * Toggle notification for followed organizer
   * @param {string} volunteerId
   * @param {string} organizerId
   * @returns {Object} { success, message, notificationEnabled }
   */
  const toggleNotification = (volunteerId, organizerId) => {
    const followIndex = follows.value.findIndex(
      f => f.volunteerId === volunteerId && f.organizerId === organizerId
    )

    if (followIndex === -1) {
      return {
        success: false,
        message: 'Follow tidak ditemukan'
      }
    }

    const follow = follows.value[followIndex]
    const newStatus = !follow.notificationEnabled

    follows.value[followIndex] = {
      ...follow,
      notificationEnabled: newStatus
    }

    return {
      success: true,
      message: newStatus ? 'Notifikasi diaktifkan' : 'Notifikasi dinonaktifkan',
      notificationEnabled: newStatus
    }
  }

  /**
   * Get follow by ID
   * @param {string} followId
   * @returns {Object|null}
   */
  const getFollowById = (followId) => {
    return follows.value.find(f => f.id === followId) || null
  }

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    follows,
    
    // Methods
    getFollowsByVolunteer,
    getFollowersByOrganizer,
    checkFollowing,
    followOrganizer,
    unfollowOrganizer,
    toggleNotification,
    getFollowById
  }
}