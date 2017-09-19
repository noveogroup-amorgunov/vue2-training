import request from '@/services/request';

export default {
  /**
   * @param {Number} page
   */
  users(page = 1) {
    return request.get('/users', { page });
  },
};
