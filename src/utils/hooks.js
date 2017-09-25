import authService from '@/utils/auth';

export const authMiddleware = () => (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const dontRequiresAuth = to.matched.some(record => record.meta.requiresAuth === false);

  if (!authService.isLoggedIn() && requiresAuth) {
    return next({
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    });
  } else if (authService.isLoggedIn() && dontRequiresAuth) {
    return next({
      name: 'home',
    });
  }
  const { role } = authService.getUser();
  if (to.matched.some(record => record.meta.roles && record.meta.roles.indexOf(role) === -1)) {
    return next({
      name: 'home',
    });
  }
  return next();
};

export const handlingAsyncData = (router, store, bar) => (to, from, next) => {
  const matched = router.getMatchedComponents(to);
  const prevMatched = router.getMatchedComponents(from);
  let diffed = false;
  const activated = matched.filter((c, i) =>
    (diffed || (diffed = (prevMatched[i] !== c))));
  const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
  if (!asyncDataHooks.length) {
    return next();
  }

  bar.start();
  return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
    .then(() => {
      bar.finish();
      next();
    })
    .catch(next);
};
