import Vue from 'vue';
import VeeValidate from 'vee-validate';

import App from '@/components/App.vue';

import { createStore } from '@/store';
import { createRouter } from '@/router';

// import { sync } from 'vuex-router-sync'
import titleMixin from '@/utils/title';
import * as filters from '@/utils/filters';

// mixin for handling title
Vue.mixin(titleMixin);

// register global utility filters.
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.use(VeeValidate);

Vue.config.productionTip = false;

export function createApp() {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

  // create the app instance
  const app = new Vue({
    router,
    // store,
    render: h => h(App),
  });

  // expose the app, the router and the store.
  return { app, router, store };
}
