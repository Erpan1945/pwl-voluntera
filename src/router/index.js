import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserFollowingView from '@/views/UserFollowingView.vue'
import ActivityList from '@/views/ActivityList.vue'
import FormDaftarBaru from '@/views/FormDaftarBaru.vue';
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/auth/LoginPage.vue'
import RegisterPage from '../views/auth/RegisterPage.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'

import OrganizerFollowerView from '@/views/OrganizerFollowerView.vue'
import Login from '@/views/Login.vue';
import DetailList from '@/views/DetailList.vue';
import EditListName from '@/views/EditListName.vue';
import ActivityDetail from '@/views/ActivityDetail.vue';
import VolunteerOrganizerProfile from '@/views/VolunteerOrganizerProfile.vue';


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
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
  ]
});

export default router
