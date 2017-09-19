import axios from 'axios';
import { errorMessages, APP_KEY, API_URL } from '@/config';

function send(config) {
  const url = `${API_URL}${config.url}`;
  const headers = {
    'X-Application-Key': APP_KEY,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  return axios(Object.assign({}, config, { url, headers })).then(
    response => response.data.data,
    (responseWithError) => {
      // console.log(responseWithError.response);
      const error = new Error();
      error.errors = [];
      try {
        const responseErr = responseWithError.response.data.errors;

        if (typeof responseErr === 'string') {
          error.errors.push({ key: 'common', message: errorMessages[responseErr] });
        } else {
          Object.keys(responseErr).forEach((key) => {
            error.errors.push({ key, message: errorMessages[responseErr[key]] });
          });
        }
      } catch (err) {
        error.errors.push({ key: 'common', message: errorMessages.unknownServerError });
      }

      throw error;
    },
  );
}

const request = {
  async post(url, data) {
    return send({ url, data, method: 'POST' });
  },
  async get(url) {
    return send({ url, method: 'GET' });
  },
};

export default request;
