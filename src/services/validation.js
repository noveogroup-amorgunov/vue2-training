

export default {
  addErrors(err, component) {
    console.log(err);
    /* if (typeof err.errors === 'string') {
      component.errors.add('common', messages[err.errors], 'server');
    } else {
      forEach(err.errors, (error, field) => {
        const element = field === 'common' ? component : component.$children.find(e => e.name === field);
        if (element && error) {
          error.forEach(value => element.errors.add(field, messages[value], 'server'));
        }
      });
    }
    */
  },
};
