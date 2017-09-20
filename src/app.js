import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from '@/components/App.vue';
import { createStore } from '@/store';
import { createRouter, addAuthMiddleware } from '@/router';
import { authMiddleware } from './utils/hooks';

export function createApp() {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

  addAuthMiddleware(router, authMiddleware);
  sync(store, router);

  // create the app instance
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  // expose the app, the router and the store.
  return { app, router, store };
}
