import { type Plugin } from 'vue'

// plugins
import { useRouter, routes } from './router'

// composables
export * from './composables/useCounter'

// component
import BetterInput from './components/BetterInput.vue'

interface App1Options {
  baseUrl: string
}

export default {
  install(app, options: App1Options = { baseUrl: '/app1' }) {
    app.component('better-input', BetterInput)
    if (!app.config.globalProperties.$router) {
      app.use(useRouter(options.baseUrl))
    } else {
      const $router = app.config.globalProperties.$router
      routes.forEach((route) => {
        route.path = options.baseUrl + route.path

        $router.addRoute(route)
      })
    }
  }
} as Plugin
