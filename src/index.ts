// composables
export * from './composables/useCounter'

import { Plugin } from 'vue'

// component
import BetterInput from './components/BetterInput.vue'

export const componentsPlugin: Plugin = {
  install(app, ...options) {
    app.component('better-input', BetterInput)
  }
}
