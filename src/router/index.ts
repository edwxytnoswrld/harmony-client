import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Sidebar from "@/components/Sidebar.vue";

// Responsible for routing
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        main: HomeView,
        sidebar: Sidebar
      }
    },
    {
      path: '/settings',
      name: 'settings',
      components: {
        main: () => import('../views/SettingsView.vue'),
        sidebar: Sidebar
      }
    },
    {
      path: '/publish',
      name: 'publish',
      components: {
        main: () => import('../views/PublishView.vue'),
        sidebar: Sidebar
      }
    },
    {
      path: '/publication/:postId',
      name: 'publication',
      components: {
        main: () => import('../views/PublicationView.vue'),
        sidebar: Sidebar
      },
      props: true
    },
    {
      path: '/user/:userId',
      name: 'user',
      components: {
        main: () => import('../views/UserView.vue'),
        sidebar: Sidebar
      },
      props: true
    },
    {
      path: '/login',
      name: 'login',
      components: {
        main: () => import('../views/LoginView.vue'),
        sidebar: Sidebar
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        main: () => import('../views/RegistrationView.vue'),
        sidebar: Sidebar
      }
    },
  ]
})

export default router
