import request from '@/services/request';
import { defaultPerPage } from '@/config';

export default {
  /**
   * @param {Object} options
   * @param {Number} options.per_page
   * @param {String} options.order_by
   * @param {String} options.sort
   * @param {Boolean} options.liked
   */
  posts(options) {
    return request.get('/posts', { per_page: defaultPerPage, ...options });
  },

  /**
   * @param {Object} data
   * @param {String} data.title
   * @param {String} data.content
   */
  createPost(data) {
    return request.post('/posts', data);
  },

  /**
   * @param {Number} id
   * @param {Object} data
   * @param {String} data.title
   * @param {String} data.content
   */
  editPost(id, data) {
    return request.put(`/posts/${id}`, data);
  },

  /**
   * @param {Number} id
   */
  deletePost(id) {
    return request.delete(`/posts/${id}`);
  },

  /**
   * @param {Number} id
   */
  likePost(id) {
    return request.post(`/posts/${id}/like`);
  },
};
