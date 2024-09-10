import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios"
import { loadFonts } from './plugins/webfontloader'

loadFonts()

let app = createApp(App)
axios.defaults.withCredentials = true
axios.baseURL = "/api"
app.config.globalProperties.$axios = axios


app.use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
