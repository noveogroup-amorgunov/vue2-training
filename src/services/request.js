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
      try {
        error.errors = errorMessages[responseWithError.response.data.errors] || errorMessages.unknownServerError;
      } catch (err) {
        error.errors = errorMessages.unknownServerError;
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
