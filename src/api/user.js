import request from '@/services/request';

export default {
  /**
   * @param {Number} page
   */
  users(page = 1) {
    return request.get('/users', { page });
  },

  /**
   * @param {Number} id
   */
  deleteUser(id) {
    return request.delete(`/users/${id}`);
  },

  /**
   * @param {Number} id
   * @param {Object} data
   * @param {String} data.email
   * @param {String} data.name
   * @param {String} data.password
   * @param {String} data.role
   */
  editUser(id, data) {
    return request.put(`/users/${id}`, data);
  },
};
