import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/Home.vue'), name: 'home' },
  { path: '/about', component: () => import('../views/About.vue'), name: 'about' }
]

export const useRouter = (basePath: string = '', app: string) =>
  createRouter({
    history: createWebHistory(),
    routes: routes.map((route) => {
      route.path = basePath + route.path
      route.name = `${app}-${route.name?.toString()}`
      return route
    })
  })
