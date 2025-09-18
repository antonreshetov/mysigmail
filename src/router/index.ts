import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/basic',
    component: () => import('@/views/Basic.vue'),
    meta: {
      title: 'Basic signature details',
    },
  },
  {
    path: '/social',
    component: () => import('@/views/Social.vue'),
    meta: {
      title: 'Social media links',
    },
  },
  {
    path: '/options',
    component: () => import('@/views/Options.vue'),
    meta: {
      title: 'Signature options',
    },
  },
  {
    path: '/addons',
    component: () => import('@/views/Addons.vue'),
    meta: {
      title: 'Signature addons',
    },
  },
  {
    path: '/templates',
    component: () => import('@/views/Templates.vue'),
    meta: {
      title: 'Templates',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/basic',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
