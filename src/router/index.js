import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserFollowingView from '@/views/UserFollowingView.vue'
import ActivityList from '@/views/ActivityList.vue'
import FormDaftarBaru from '@/views/FormDaftarBaru.vue';

import OrganizerProfile from '@/views/OrganizerProfile.vue'
import OrganizerFollowerView from '@/views/OrganizerFollowerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'home',
      component: HomeView,
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
      path: '/DaftarSaya',
      name: 'DaftarSaya',
      component: ActivityList,
    },
    {
      path: '/form-daftar-baru',
      name: 'FormDaftarBaru',
      component: FormDaftarBaru
    },
    {
      path: '/OrganizerProfile',
      name: 'Organizer Profile',
      component: OrganizerProfile,
    },
    {
      path: '/follower',
      name: 'Organizer Follower',
      component: OrganizerFollowerView,
    },
  ]
});

export default router
