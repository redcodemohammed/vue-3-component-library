import { Plugin } from 'vue'

// component
import BetterInput from './components/BetterInput.vue'

// composables
export * from './composables/useCounter'

export const componentsPlugin: Plugin = {
  install(app, ...options) {
    app.component('better-input', BetterInput)
  }
}
