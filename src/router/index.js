import { createRouter, createWebHistory } from 'vue-router'
import UserFollowingView from '@/views/UserFollowingView.vue'
import ActivityList from '@/views/ActivityList.vue'
import FormDaftarBaru from '@/views/FormDaftarBaru.vue';
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/auth/LoginPage.vue'
import RegisterPage from '../views/auth/RegisterPage.vue'
import LoginPageTest from '../views/auth/LoginPageTest.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import VolunteerDashboard from '../views/volunteer/VolunteerDashboard.vue'
import ProfilePage from '../views/ProfilePage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import JelajahiKegiatan from '@/views/jelajahiKegiatan.vue'

import OrganizerFollowerView from '@/views/OrganizerFollowerView.vue'
import Login from '@/views/Login.vue';
import DetailList from '@/views/DetailList.vue';
import EditListName from '@/views/EditListName.vue';
import ActivityDetail from '@/views/ActivityDetail.vue';
import VolunteerOrganizerProfile from '@/views/VolunteerOrganizerProfile.vue';
import OrganizerDashboard from '@/views/OrganizerDashboard.vue';

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
      path: '/login-test',
      name: 'login-test',
      component: LoginPageTest
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/volunteer/dashboard',
      name: 'volunteer-dashboard',
      component: VolunteerDashboard,
      meta: { requiresAuth: true, role: 'volunteer' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/following',
      name: 'following',
      component: UserFollowingView,
    },
    {
      path: '/activity_lists',
      name: 'activity_lists',
      component: ActivityList,
    },
    {
      path: '/form-daftar-baru',
      name: 'FormDaftarBaru',
      component: FormDaftarBaru
    },
    {
      path: '/OrganizerProfile/:id',
      name: 'OrganizerProfile',
      component: VolunteerOrganizerProfile,
    },
    {
      path: '/follower/:id',
      name: 'OrganizerFollower',
      component: OrganizerFollowerView,
    },
    {
      path: '/activity_lists/:id',
      name: 'DetailDaftar',
      component: DetailList
    },
    {
      path: "/activity_lists/:id/edit",
      name: "EditListName",
      component: EditListName,
    },
    {
      path: "/logincoba",
      name: "Login Dummy",
      component: Login
    },
    {
      path: "/activities/:id",
      name: "activity-detail",
      component: ActivityDetail
    },
    {
      path: '/organizer-dashboard',
      name: 'OrganizerDashboard',
      component: OrganizerDashboard,
    },    
    {
      path: '/jelajahi',
      name: 'JelajahiKegiatan',
      component: JelajahiKegiatan,
    },
    // Pastikan rute wildcard (404) selalu ditaruh paling bawah
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
});

export default router