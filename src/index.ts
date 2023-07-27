// composables
export * from './composables/useCounter'

import { type Plugin } from 'vue'

// component
import BetterInput from './components/BetterInput.vue'

export default {
  install(app, ...options) {
    app.component('better-input', BetterInput)
  }
} as Plugin
