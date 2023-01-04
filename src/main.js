import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'

import './assets/sass/main.scss'

const app = createApp(App)

app.use(router).use(VueAxios, axios).use(VueGoodTablePlugin)

app.mount('#app')
