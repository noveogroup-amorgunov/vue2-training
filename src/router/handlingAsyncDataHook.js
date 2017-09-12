export default (router, store, bar) => (to, from, next) => {
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
