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

  // API base (set VITE_API_BASE_URL in .env to point to backend, e.g. http://localhost:8000)
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

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
  const login = async (email, password) => {
    // Validasi input
    if (!email || !password) {
      return {
        success: false,
        message: 'Email dan password harus diisi'
      };
    }

    // Find user in mock data
    const user = users.value.find(u => u.email === email && u.password === password);

    if (user) {
      currentUser.value = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      // In a real app, you'd get a token from the backend
      localStorage.setItem('token', `fake-token-for-${user.id}`);
      return {
        success: true,
        message: 'Login berhasil',
        user: user,
        token: `fake-token-for-${user.id}`
      };
    } else {
      return { success: false, message: 'Email atau password salah' };
    }
  }

  /**
   * Register new volunteer
   * @param {Object} data - { name, email, password, phone, city, bio }
   * @returns {Object} { success, message, user }
   */
  const registerVolunteer = async (data) => {
    // Validasi input
    if (!data.name || !data.email || !data.password || !data.phone || !data.city) {
      return {
        success: false,
        message: 'Semua field wajib diisi (nama, email, password, telepon, kota)'
      };
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Format email tidak valid'
      };
    }

    // Validasi panjang password
    if (data.password.length < 6) {
      return {
        success: false,
        message: 'Password minimal 6 karakter'
      };
    }
    
    // Check if email already exists
    if (users.value.some(u => u.email === data.email)) {
      return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain.' };
    }

    // Create new user
    const newUser = {
      id: `volunteer-${Date.now()}`,
      role: 'volunteer',
      name: data.name,
      email: data.email,
      password: data.password, // In a real app, hash this password
      phone: data.phone,
      city: data.city,
      bio: data.bio || '',
      profileImage: null,
      createdAt: new Date().toISOString()
    };

    users.value.push(newUser);

    return { 
      success: true, 
      message: 'Registrasi berhasil! Silakan login.', 
      user: newUser 
    };
  }

  /**
   * Register new organizer
   * @param {Object} data - { name, email, password, phone, address, website, bio }
   * @returns {Object} { success, message, user }
   */
  const registerOrganizer = async (data) => {
    // Validasi input
    if (!data.name || !data.email || !data.password || !data.phone || !data.address || !data.bio) {
      return {
        success: false,
        message: 'Semua field wajib diisi (nama organisasi, email, password, telepon, alamat, deskripsi)'
      };
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Format email tidak valid'
      };
    }

    // Validasi panjang password
    if (data.password.length < 6) {
      return {
        success: false,
        message: 'Password minimal 6 karakter'
      };
    }

    // Check if email already exists
    if (users.value.some(u => u.email === data.email)) {
      return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain.' };
    }

    // Create new user
    const newOrganizer = {
      id: `organizer-${Date.now()}`,
      role: 'organizer',
      name: data.name,
      email: data.email,
      password: data.password, // In a real app, hash this password
      phone: data.phone,
      address: data.address,
      website: data.website || '',
      bio: data.bio,
      profileImage: null,
      createdAt: new Date().toISOString()
    };

    users.value.push(newOrganizer);

    return { 
      success: true, 
      message: 'Registrasi organisasi berhasil! Silakan login.', 
      user: newOrganizer 
    };
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
    user: currentUser,
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
    getUserById,
    handleLogout: logout
  }
}