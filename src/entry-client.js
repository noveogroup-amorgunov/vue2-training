import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { createApp } from '@/app';
import ProgressBar from '@/components/Layout/ProgressBar.vue';
import * as filters from '@/utils/filters';
import * as mixins from '@/utils/mixins';
import * as hooks from '@/utils/hooks';

// global progress bar
const bar = new Vue(ProgressBar).$mount();
Vue.prototype.$bar = bar;
document.body.appendChild(bar.$el);

// TODO: add $bar component to requestService

// register global utility filters.
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.use(VeeValidate);

Vue.config.productionTip = false;

// mixin for handling title
Vue.mixin(mixins.title);
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin(mixins.beforeRouteUpdate);

const { app, router, store } = createApp();

// wait until router has resolved all async before hooks and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve(hooks.handlingAsyncData(router, store, bar));
  router.beforeEach(hooks.authMiddleware());

  // actually mount to DOM
  app.$mount('#app');
});
