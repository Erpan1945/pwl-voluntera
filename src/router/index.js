import { createRouter, createWebHistory } from 'vue-router'

// Import Pages
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/auth/LoginPage.vue'
import RegisterPage from '../views/auth/RegisterPage.vue'
import VolunteerDashboard from '../views/volunteer/VolunteerDashboard.vue'
import OrganizerDashboard from '../views/organizer/OrganizerDashboard.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import ActivityDetailPage from '../views/activity/ActivityDetailPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/volunteer/dashboard',
      name: 'volunteer-dashboard',
      component: VolunteerDashboard,
      meta: { requiresAuth: true, role: 'volunteer' }
    },
    {
      path: '/organizer/dashboard',
      name: 'organizer-dashboard',
      component: OrganizerDashboard,
      meta: { requiresAuth: true, role: 'organizer' }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/activity/:id',
      name: 'activity-detail',
      component: ActivityDetailPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!currentUser) {
      // Not logged in, redirect to login
      next({ name: 'login' })
    } else if (to.meta.role && currentUser.role !== to.meta.role) {
      // Wrong role, redirect to appropriate dashboard
      const dashboardRoutes = {
        volunteer: '/volunteer/dashboard',
        organizer: '/organizer/dashboard',
        admin: '/admin/dashboard'
      }
      next(dashboardRoutes[currentUser.role] || '/')
    } else {
      // All good, proceed
      next()
    }
  } else if (to.meta.requiresGuest) {
    // Route requires guest (not logged in)
    if (currentUser) {
      // Already logged in, redirect to dashboard
      const dashboardRoutes = {
        volunteer: '/volunteer/dashboard',
        organizer: '/organizer/dashboard',
        admin: '/admin/dashboard'
      }
      next(dashboardRoutes[currentUser.role] || '/')
    } else {
      next()
    }
  } else {
    // No restrictions
    next()
  }
})

export default router