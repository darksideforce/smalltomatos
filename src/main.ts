import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import 'virtual:svg-icons-register'
import './style.css'
import SvgIcon from "@/components/SvgIcon/index.vue";
import './demos/ipc'
import { setupStore } from './store';

const app = createApp(App);

app.use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
  app.component('SvgIcon', SvgIcon);
setupStore(app)
