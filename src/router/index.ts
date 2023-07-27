import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/Home.vue'), name: 'home' },
  { path: '/about', component: () => import('../views/About.vue'), name: 'about' }
]

export const useRouter = (basePath: string = '') =>
  createRouter({
    history: createWebHistory(),
    routes: routes.map((r) => {
      r.path = basePath + r.path
      return r
    })
  })
