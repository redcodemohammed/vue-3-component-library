import { type Plugin } from 'vue'

// plugins
import { useRouter } from './router'

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
    app.use(useRouter(options.baseUrl))
  }
} as Plugin
