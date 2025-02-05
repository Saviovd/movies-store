import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import store from './store'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(MotionPlugin)
app.mount('#app')
