import { type Plugin } from 'vue'

// plugins
import { useRouter, routes } from './router'

// composables
export * from './composables/useCounter'

// component
import BetterInput from './components/BetterInput.vue'

export interface App1Options {
  baseUrl: string
  app: string
}

export default {
  install(app, options: App1Options = { baseUrl: '/app1', app: '' }) {
    app.component('better-input', BetterInput)
    if (!app.config.globalProperties.$router) {
      app.use(useRouter(options.baseUrl, options.app))
    } else {
      const $router = app.config.globalProperties.$router
      routes.forEach((route) => {
        route.path = options.baseUrl + route.path
        route.name = `${options.app}-${route.name?.toString()}`
        $router.addRoute(route)
      })
    }
  }
} as Plugin
