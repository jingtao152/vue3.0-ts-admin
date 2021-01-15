import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import './style/index.scss'
import 'element-plus/lib/theme-chalk/index.css';

export const app = createApp(App)

// installElementPlus(app)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
