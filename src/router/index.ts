import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Basic.vue'),
    meta: {
      title: 'Basic signature details',
    },
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
