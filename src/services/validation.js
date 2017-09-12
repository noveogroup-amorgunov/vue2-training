const messages = {
  'validation.required': 'This field is required',
  'validation.email': 'This field should be correct email',
  'validation.unique': 'This field should be unique',
  'authenticate.credentials_invalid': 'Email or password are invalid',
};

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
  async isValidForm(component) {
    let valid = true;
    component.errors.clear();

    for (const child of component.$children) {
      // console.log(child.errors);
      if (child.errors) {
        child.errors.clear();
        valid = await child.$validator.validateAll() && valid;
      }
    }

    console.log(`valid: ${valid}`);

    if (!valid) {
      throw new Error('Validation error');
    }
    return valid;
  },
};
