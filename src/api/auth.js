import request from '@/services/request';

export default {
  /**
   * @param {Object} credentials - credentials data
   * @param {String} credentials.email
   * @param {String} credentials.password
   */
  login(credentials) {
    /**
     * Mocking client-server processing
     */
    // return new Promise((resolve, reject) => setTimeout(reject.bind(null, new Error('authenticate.credentials_invalid')), 2000));
    return request.post('/login', credentials);
  },

  /**
   * @param {Object} data - credentials data + username
   * @param {String} data.email
   * @param {String} data.name
   * @param {String} data.password
   */
  register(data) {
    return request.post('/register', data);
  },

  currentUser() {
    return request.get('/user');
  },
};
