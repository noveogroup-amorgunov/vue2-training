import request from '@/services/request';

export default {
  /**
   * @param {Object} credentials - credentials data
   * @param {string} credentials.email
   * @param {string} credentials.password
   */
  login(credentials) {
    /**
     * Mocking client-server processing
     */
    // return new Promise((resolve, reject) => setTimeout(reject, 1000));
    return new Promise((resolve, reject) => setTimeout(reject.bind(null, new Error('authenticate.credentials_invalid')), 2000));
    // return request.post('/login', credentials);
  },

  /**
   * @param {Object} data - credentials data + username
   * @param {string} credentials.email
   * @param {string} credentials.name
   * @param {string} credentials.password
   */
  register(data) {
    return request.post('/register', data);
  },
  currentUser() {
    return request.get('/user');
  },
};
