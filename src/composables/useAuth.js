import { ref, computed } from 'vue'
import { mockUsers } from '@/data/mockData'

// Global state
const currentUser = ref(null)
const users = ref([...mockUsers])

export function useAuth() {
  // ============================================
  // COMPUTED PROPERTIES
  // ============================================
  
  const isAuthenticated = computed(() => currentUser.value !== null)
  
  const isVolunteer = computed(() => currentUser.value?.role === 'volunteer')
  
  const isOrganizer = computed(() => currentUser.value?.role === 'organizer')
  
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  // ============================================
  // AUTHENTICATION METHODS
  // ============================================

  /**
   * Initialize auth from localStorage
   */
  const initAuth = () => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        currentUser.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('currentUser')
      }
    }
  }

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Object} { success, message, user }
   */
  const login = (email, password) => {
    const user = users.value.find(
      u => u.email === email && u.password === password
    )

    if (!user) {
      return {
        success: false,
        message: 'Email atau password salah'
      }
    }

    // Set current user
    currentUser.value = user
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user))

    return {
      success: true,
      message: 'Login berhasil',
      user: user
    }
  }

  /**
   * Register new volunteer
   * @param {Object} data - { name, email, password, phone, city, bio }
   * @returns {Object} { success, message, user }
   */
  const registerVolunteer = (data) => {
    // Check if email already exists
    const existingUser = users.value.find(u => u.email === data.email)
    if (existingUser) {
      return {
        success: false,
        message: 'Email sudah terdaftar'
      }
    }

    // Create new volunteer
    const newVolunteer = {
      id: `volunteer-${Date.now()}`,
      role: 'volunteer',
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      city: data.city,
      bio: data.bio || '',
      profileImage: null,
      createdAt: new Date().toISOString()
    }

    // Add to users
    users.value.push(newVolunteer)

    return {
      success: true,
      message: 'Registrasi berhasil! Silakan login.',
      user: newVolunteer
    }
  }

  /**
   * Register new organizer
   * @param {Object} data - { name, email, password, phone, address, website, bio }
   * @returns {Object} { success, message, user }
   */
  const registerOrganizer = (data) => {
    // Check if email already exists
    const existingUser = users.value.find(u => u.email === data.email)
    if (existingUser) {
      return {
        success: false,
        message: 'Email sudah terdaftar'
      }
    }

    // Create new organizer
    const newOrganizer = {
      id: `organizer-${Date.now()}`,
      role: 'organizer',
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      website: data.website || '',
      bio: data.bio || '',
      profileImage: null,
      createdAt: new Date().toISOString()
    }

    // Add to users
    users.value.push(newOrganizer)

    return {
      success: true,
      message: 'Registrasi berhasil! Silakan login.',
      user: newOrganizer
    }
  }

  /**
   * Logout current user
   */
  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  /**
   * Update user profile
   * @param {Object} updates - Data to update
   * @returns {Object} { success, message }
   */
  const updateProfile = (updates) => {
    if (!currentUser.value) {
      return {
        success: false,
        message: 'User tidak ditemukan'
      }
    }

    // Update current user
    currentUser.value = {
      ...currentUser.value,
      ...updates
    }

    // Update in users array
    const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
    if (userIndex !== -1) {
      users.value[userIndex] = currentUser.value
    }

    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))

    return {
      success: true,
      message: 'Profil berhasil diupdate'
    }
  }

  /**
   * Change password
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {Object} { success, message }
   */
  const changePassword = (oldPassword, newPassword) => {
    if (!currentUser.value) {
      return {
        success: false,
        message: 'User tidak ditemukan'
      }
    }

    // Check old password
    if (currentUser.value.password !== oldPassword) {
      return {
        success: false,
        message: 'Password lama salah'
      }
    }

    // Update password
    currentUser.value.password = newPassword

    // Update in users array
    const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
    if (userIndex !== -1) {
      users.value[userIndex].password = newPassword
    }

    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))

    return {
      success: true,
      message: 'Password berhasil diubah'
    }
  }

  /**
   * Get user by ID
   * @param {string} userId
   * @returns {Object|null}
   */
  const getUserById = (userId) => {
    return users.value.find(u => u.id === userId) || null
  }

  // ============================================
  // RETURN
  // ============================================

  return {
    // State
    currentUser,
    users,
    
    // Computed
    isAuthenticated,
    isVolunteer,
    isOrganizer,
    isAdmin,
    
    // Methods
    initAuth,
    login,
    registerVolunteer,
    registerOrganizer,
    logout,
    updateProfile,
    changePassword,
    getUserById
  }
}