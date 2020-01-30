import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(VueI18n);

Vue.use(BootstrapVue);

const messages = {
  en: {
    message: {
      loadingPlayer: 'Loading player'
    },
  }
};

const i18n = new VueI18n({ locale: 'en', messages });

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount('#app');
