import { createApp } from 'vue'
import App from './App.vue'
import installPlugin from '../src'

const app = createApp(App)

app.use(installPlugin)

app.mount('#app')
