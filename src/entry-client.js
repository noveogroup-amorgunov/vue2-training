/*router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const dontRequiresAuth = to.matched.some(record => record.meta.requiresAuth === false);
  if (!auth.isLoggedIn() && requiresAuth) {
    return next({
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    });
  } else if (auth.isLoggedIn() && dontRequiresAuth) {
    return next({
      name: 'home',
    });
  }
  const { role } = auth.getUser();
  if (to.matched.some(record => record.meta.roles && record.meta.roles.indexOf(role) === -1)) {
    return next({
      name: 'home',
    });
  }
  return next();
});*/

import Vue from 'vue';
import { createApp } from './app';
// import ProgressBar from './components/ProgressBar.vue'

// global progress bar
// const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
// document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
/*Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})*/

const { app, router, store } = createApp();

// wait until router has resolved all async before hooks and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  /*router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })*/

  // actually mount to DOM
  app.$mount('#app')
});
