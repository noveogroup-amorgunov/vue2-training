export const { API_APP_KEY, API_ENDPOINT } = process.env;

export const userRoles = {
  ADMIN: 'admin',
  USER: 'user',
};

export const errorMessages = {
  'validation.required': 'This field is required',
  'validation.email': 'This field should be correct email',
  'validation.unique': 'This field should be unique',
  'authenticate.credentials_invalid': 'Email or password are invalid',
};
