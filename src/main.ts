import Vue from 'vue';
import vuetify from './plugins/vuetify';
import router from '@/common/router';
import { i18n } from '@/common/i18/i18n';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@/main.css';
import '@/themes.css';

import PersonalClientDesktop from '@/common/components/personal-client-desktop/PersonalClientDesktop.vue';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  vuetify,
  render: h => h(PersonalClientDesktop),
}).$mount('#app');
