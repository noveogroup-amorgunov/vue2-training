import request from '@/services/request';
import { defaultPerPage } from '@/config';

export default {
  /**
   * @param {Number} page
   * @param {String} sort
   * @param {String} orderBy
   */
  users(page = 1, sort = 'desc', orderBy = 'id') {
    return request.get('/users', { page, sort, order_by: orderBy, per_page: defaultPerPage });
  },

  /**
   * @param {Number} id
   */
  getUser(id) {
    return request.get(`/users/${id}`);
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
