import { ref, computed } from 'vue'
import { mockActivityLists } from '@/data/mockData'

// Global state
const activityLists = ref([...mockActivityLists])

export function useActivityLists() {
  // ============================================
  // METHODS
  // ============================================

  /**
   * Get lists by volunteer
   * @param {string} volunteerId
   * @returns {Array}
   */
  const getListsByVolunteer = (volunteerId) => {
    return activityLists.value.filter(list => list.volunteerId === volunteerId)
  }

  /**
   * Get list by ID
   * @param {string} listId
   * @returns {Object|null}
   */
  const getListById = (listId) => {
    return activityLists.value.find(list => list.id === listId) || null
  }

  /**
   * Create new activity list
   * @param {Object} data - { volunteerId, volunteerName, listName }
   * @returns {Object} { success, message, list }
   */
  const createList = (data) => {
    // Check if list name already exists for this volunteer
    const existing = activityLists.value.find(
      list => list.volunteerId === data.volunteerId && 
              list.listName === data.listName
    )

    if (existing) {
      return {
        success: false,
        message: 'Nama daftar sudah ada'
      }
    }

    // Create new list
    const newList = {
      id: `list-${Date.now()}`,
      volunteerId: data.volunteerId,
      volunteerName: data.volunteerName,
      listName: data.listName,
      activityIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    activityLists.value.push(newList)

    return {
      success: true,
      message: 'Daftar berhasil dibuat',
      list: newList
    }
  }

  /**
   * Delete activity list
   * @param {string} listId
   * @returns {Object} { success, message }
   */
  const deleteList = (listId) => {
    const listIndex = activityLists.value.findIndex(list => list.id === listId)

    if (listIndex === -1) {
      return {
        success: false,
        message: 'Daftar tidak ditemukan'
      }
    }

    activityLists.value.splice(listIndex, 1)

    return {
      success: true,
      message: 'Daftar berhasil dihapus'
    }
  }

  /**
   * Rename activity list
   * @param {string} listId
   * @param {string} newName
   * @returns {Object} { success, message }
   */
  const renameList = (listId, newName) => {
    const listIndex = activityLists.value.findIndex(list => list.id === listId)

    if (listIndex === -1) {
      return {
        success: false,
        message: 'Daftar tidak ditemukan'
      }
    }

    const list = activityLists.value[listIndex]

    // Check if new name already exists for this volunteer
    const existing = activityLists.value.find(
      l => l.volunteerId === list.volunteerId && 
           l.listName === newName && 
           l.id !== listId
    )

    if (existing) {
      return {
        success: false,
        message: 'Nama daftar sudah ada'
      }
    }

    // Update list name
    activityLists.value[listIndex] = {
      ...list,
      listName: newName,
      updatedAt: new Date().toISOString()
    }

    return {
      success: true,
      message: 'Nama daftar berhasil diubah'
    }
  }

  /**
   * Add activity to list
   * @param {string} listId
   * @param {string} activityId
   * @returns {Object} { success, message }
   */
  const addActivityToList = (listId, activityId) => {
    const listIndex = activityLists.value.findIndex(list => list.id === listId)

    if (listIndex === -1) {
      return {
        success: false,
        message: 'Daftar tidak ditemukan'
      }
    }

    const list = activityLists.value[listIndex]

    // Check if activity already in list
    if (list.activityIds.includes(activityId)) {
      return {
        success: false,
        message: 'Kegiatan sudah ada di daftar ini'
      }
    }

    // Add activity
    activityLists.value[listIndex] = {
      ...list,
      activityIds: [...list.activityIds, activityId],
      updatedAt: new Date().toISOString()
    }

    return {
      success: true,
      message: 'Kegiatan berhasil ditambahkan ke daftar'
    }
  }

  /**
   * Remove activity from list
   * @param {string} listId
   * @param {string} activityId
   * @returns {Object} { success, message }
   */
  const removeActivityFromList = (listId, activityId) => {
    const listIndex = activityLists.value.findIndex(list => list.id === listId)

    if (listIndex === -1) {
      return {
        success: false,
        message: 'Daftar tidak ditemukan'
      }
    }

    const list = activityLists.value[listIndex]

    // Check if activity in list
    if (!list.activityIds.includes(activityId)) {
      return {
        success: false,
        message: 'Kegiatan tidak ada di daftar ini'
      }
    }

    // Remove activity
    activityLists.value[listIndex] = {
      ...list,
      activityIds: list.activityIds.filter(id => id !== activityId),
      updatedAt: new Date().toISOString()
    }

    return {
      success: true,
      message: 'Kegiatan berhasil dihapus dari daftar'
    }
  }

  /**
   * Check if activity in any list
   * @param {string} volunteerId
   * @param {string} activityId
   * @returns {Array} List IDs that contain this activity
   */
  const checkActivityInLists = (volunteerId, activityId) => {
    const volunteerLists = getListsByVolunteer(volunteerId)
    return volunteerLists
      .filter(list => list.activityIds.includes(activityId))
      .map(list => list.id)
  }

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    activityLists,
    
    // Methods
    getListsByVolunteer,
    getListById,
    createList,
    deleteList,
    renameList,
    addActivityToList,
    removeActivityFromList,
    checkActivityInLists
  }
}