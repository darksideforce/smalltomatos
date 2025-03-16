import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'

import './style.css'

import './demos/ipc'


createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
