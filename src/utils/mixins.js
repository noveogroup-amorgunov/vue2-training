function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }
  return null;
}

export const title = {
  mounted() {
    const pageTitle = getTitle(this);
    if (pageTitle) {
      document.title = `Vue HN 2.0 | ${pageTitle}`;
    }
  },
};

export const beforeRouteUpdate = {
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next);
    } else {
      next();
    }
  },
};
