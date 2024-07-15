import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import store from './store/store.js';
import './assets/css/ezber.css';

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

const app = createApp(App);

// Vue uygulamasına Vuex store'u entegre etme
app.use(store);

// Vue uygulamasına Vue Router'ı ve Router'u da entegre etme
app.use(router);

app.mount('#app');
