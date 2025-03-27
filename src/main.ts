import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'

import './style.css'

import './demos/ipc'
import { setupStore } from './store';

const app = createApp(App);

app.use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
setupStore(app)
