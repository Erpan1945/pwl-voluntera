import { ref, computed } from 'vue'
import { mockActivities, mockActivityRequests } from '@/data/mockData'

// Global state
const activities = ref([...mockActivities])
const activityRequests = ref([...mockActivityRequests])

export function useActivities() {
  // ============================================
  // COMPUTED PROPERTIES
  // ============================================

  /**
   * Get all published activities
   */
  const publishedActivities = computed(() => {
    return activities.value.filter(a => a.status === 'published')
  })

  /**
   * Get pending requests
   */
  const pendingRequests = computed(() => {
    return activityRequests.value.filter(r => r.status === 'pending')
  })

  /**
   * Get approved requests
   */
  const approvedRequests = computed(() => {
    return activityRequests.value.filter(r => r.status === 'approved')
  })

  /**
   * Get rejected requests
   */
  const rejectedRequests = computed(() => {
    return activityRequests.value.filter(r => r.status === 'rejected')
  })

  // ============================================
  // ACTIVITIES METHODS
  // ============================================

  /**
   * Get activity by ID
   * @param {string} activityId
   * @returns {Object|null}
   */
  const getActivityById = (activityId) => {
    return activities.value.find(a => a.id === activityId) || null
  }

  /**
   * Get activities by organizer
   * @param {string} organizerId
   * @returns {Array}
   */
  const getActivitiesByOrganizer = (organizerId) => {
    return activities.value.filter(a => a.organizerId === organizerId)
  }

  /**
   * Filter activities
   * @param {Object} filters - { category, city, search }
   * @returns {Array}
   */
  const filterActivities = (filters) => {
    let filtered = [...publishedActivities.value]

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(a => a.category === filters.category)
    }

    // Filter by city
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(a => a.city === filters.city)
    }

    // Filter by search query
    if (filters.search && filters.search.trim() !== '') {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.organizerName.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  /**
   * Get available cities from activities
   * @returns {Array}
   */
  const getAvailableCities = () => {
    const cities = [...new Set(publishedActivities.value.map(a => a.city))]
    return cities.sort()
  }

  // ============================================
  // ACTIVITY REQUESTS METHODS
  // ============================================

  /**
   * Create new activity request
   * @param {Object} data
   * @returns {Object} { success, message, request }
   */
  const createActivityRequest = (data) => {
    const newRequest = {
      id: `request-${Date.now()}`,
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      city: data.city,
      date: data.date,
      time: data.time,
      duration: data.duration,
      capacity: parseInt(data.capacity),
      organizerId: data.organizerId,
      organizerName: data.organizerName,
      status: 'pending',
      requirements: data.requirements || '',
      tags: data.tags || [],
      requestedAt: new Date().toISOString()
    }

    activityRequests.value.push(newRequest)

    return {
      success: true,
      message: 'Permohonan kegiatan berhasil dibuat. Menunggu review admin.',
      request: newRequest
    }
  }

  /**
   * Update activity request (only pending)
   * @param {string} requestId
   * @param {Object} updates
   * @returns {Object} { success, message }
   */
  const updateActivityRequest = (requestId, updates) => {
    const requestIndex = activityRequests.value.findIndex(r => r.id === requestId)
    
    if (requestIndex === -1) {
      return {
        success: false,
        message: 'Permohonan tidak ditemukan'
      }
    }

    const request = activityRequests.value[requestIndex]

    // Only pending requests can be edited
    if (request.status !== 'pending') {
      return {
        success: false,
        message: 'Hanya permohonan pending yang bisa diedit'
      }
    }

    // Update request
    activityRequests.value[requestIndex] = {
      ...request,
      ...updates,
      id: request.id, // Keep original ID
      status: request.status, // Keep original status
      requestedAt: request.requestedAt // Keep original date
    }

    return {
      success: true,
      message: 'Permohonan berhasil diupdate'
    }
  }

  /**
   * Delete activity request (only pending)
   * @param {string} requestId
   * @returns {Object} { success, message }
   */
  const deleteActivityRequest = (requestId) => {
    const requestIndex = activityRequests.value.findIndex(r => r.id === requestId)
    
    if (requestIndex === -1) {
      return {
        success: false,
        message: 'Permohonan tidak ditemukan'
      }
    }

    const request = activityRequests.value[requestIndex]

    // Only pending requests can be deleted
    if (request.status !== 'pending') {
      return {
        success: false,
        message: 'Hanya permohonan pending yang bisa dihapus'
      }
    }

    // Delete request
    activityRequests.value.splice(requestIndex, 1)

    return {
      success: true,
      message: 'Permohonan berhasil dihapus'
    }
  }

  /**
   * Get requests by organizer
   * @param {string} organizerId
   * @returns {Array}
   */
  const getRequestsByOrganizer = (organizerId) => {
    return activityRequests.value.filter(r => r.organizerId === organizerId)
  }

  /**
   * Get request by ID
   * @param {string} requestId
   * @returns {Object|null}
   */
  const getRequestById = (requestId) => {
    return activityRequests.value.find(r => r.id === requestId) || null
  }

  // ============================================
  // ADMIN METHODS
  // ============================================

  /**
   * Approve activity request (Admin only)
   * @param {string} requestId
   * @returns {Object} { success, message }
   */
  const approveRequest = (requestId) => {
    const requestIndex = activityRequests.value.findIndex(r => r.id === requestId)
    
    if (requestIndex === -1) {
      return {
        success: false,
        message: 'Permohonan tidak ditemukan'
      }
    }

    const request = activityRequests.value[requestIndex]

    // Update request status
    activityRequests.value[requestIndex] = {
      ...request,
      status: 'approved',
      reviewedAt: new Date().toISOString()
    }

    // Create published activity from approved request
    const newActivity = {
      id: `activity-${Date.now()}`,
      title: request.title,
      description: request.description,
      category: request.category,
      location: request.location,
      city: request.city,
      date: request.date,
      time: request.time,
      duration: request.duration,
      capacity: request.capacity,
      enrolledCount: 0,
      organizerId: request.organizerId,
      organizerName: request.organizerName,
      status: 'published',
      requirements: request.requirements,
      tags: request.tags,
      rating: 0,
      reviewCount: 0,
      imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
      createdAt: new Date().toISOString()
    }

    activities.value.push(newActivity)

    return {
      success: true,
      message: 'Kegiatan berhasil disetujui dan dipublikasikan'
    }
  }

  /**
   * Reject activity request (Admin only)
   * @param {string} requestId
   * @param {string} reason
   * @returns {Object} { success, message }
   */
  const rejectRequest = (requestId, reason) => {
    const requestIndex = activityRequests.value.findIndex(r => r.id === requestId)
    
    if (requestIndex === -1) {
      return {
        success: false,
        message: 'Permohonan tidak ditemukan'
      }
    }

    const request = activityRequests.value[requestIndex]

    // Update request status
    activityRequests.value[requestIndex] = {
      ...request,
      status: 'rejected',
      rejectionReason: reason,
      reviewedAt: new Date().toISOString()
    }

    return {
      success: true,
      message: 'Permohonan berhasil ditolak'
    }
  }

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    activities,
    activityRequests,
    
    // Computed
    publishedActivities,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
    
    // Activities methods
    getActivityById,
    getActivitiesByOrganizer,
    filterActivities,
    getAvailableCities,
    
    // Requests methods
    createActivityRequest,
    updateActivityRequest,
    deleteActivityRequest,
    getRequestsByOrganizer,
    getRequestById,
    
    // Admin methods
    approveRequest,
    rejectRequest
  }
}