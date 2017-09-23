import postApi from '@/api/post';

const defaultMetaState = {
  orderBy: 'id',
  sort: 'desc',
  page: 1,
  total: 0,
};

// initial state
const initialState = {
  posts: [/* [id: number, liked: boolean, title: string, content: string]: Post */],
  meta: { ...defaultMetaState },
  loading: false,
};

const getters = {
  posts: state => state.posts,
  meta: state => state.meta,
  loading: state => state.loading,
};

const types = {
  FETCH_POSTS_REQUEST: 'FETCH_POSTS_REQUEST',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE',

  DELETE_POST_REQUEST: 'DELETE_POST_REQUEST',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
  DELETE_POST_FAILURE: 'DELETE_POST_FAILURE',

  EDIT_POST_REQUEST: 'EDIT_POST_REQUEST',
  EDIT_POST_SUCCESS: 'EDIT_POST_SUCCESS',
  EDIT_POST_FAILURE: 'EDIT_POST_FAILURE',

  CREATE_POST_REQUEST: 'CREATE_POST_REQUEST',
  CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
  CREATE_POST_FAILURE: 'CREATE_POST_FAILURE',

  LIKE_POST_REQUEST: 'LIKE_POST_REQUEST',
  LIKE_POST_SUCCESS: 'LIKE_POST_SUCCESS',
  LIKE_POST_FAILURE: 'LIKE_POST_FAILURE',
};

const mutations = {
  /**
   * Fetch posts list
   */
  [types.FETCH_POSTS_REQUEST](state) {
    state.posts = [];
    state.loading = true;
  },
  [types.FETCH_POSTS_SUCCESS](state, { data: { posts, meta }, page, orderBy, sort }) {
    state.posts = posts;
    state.meta = {
      ...state.meta,
      ...meta,
      page,
      orderBy,
      sort,
    };
    state.loading = false;
  },
  [types.FETCH_POSTS_FAILURE](state) {
    state.posts = [];
    state.meta = defaultMetaState;
    state.loading = false;
  },

  /**
   * Delete post by id
   */
  [types.DELETE_POST_REQUEST](state) {
    state.loading = true;
  },
  [types.DELETE_POST_SUCCESS](state, id) {
    state.posts = state.posts.filter(post => post.id !== id);
    state.loading = false;
  },
  [types.DELETE_POST_FAILURE](state) {
    state.loading = false;
  },

  /**
   * Edit post by id
   */
  [types.EDIT_POST_REQUEST](state) {
    state.loading = true;
  },
  [types.EDIT_POST_SUCCESS](state, editedPost) {
    state.posts = state.posts.map((post) => {
      if (post.id === editedPost.id) {
        return editedPost;
      }
      return post;
    });
    state.loading = false;
  },
  [types.EDIT_POST_FAILURE](state) {
    state.loading = false;
  },

  /**
   * Create new post
   */
  [types.CREATE_POST_REQUEST](state) {
    state.loading = true;
  },
  [types.CREATE_POST_SUCCESS](state, post) {
    state.posts = state.posts.concat(post);
    state.loading = false;
  },
  [types.CREATE_POST_FAILURE](state) {
    state.loading = false;
  },

  /**
   * Like post by id
   */
  [types.LIKE_POST_REQUEST](state) {
    state.loading = true;
  },
  [types.LIKE_POST_SUCCESS](state, likedPost) {
    state.posts = state.posts.map((post) => {
      if (post.id === likedPost.id) {
        return likedPost;
      }
      return post;
    });
    state.loading = false;
  },
  [types.LIKE_POST_FAILURE](state) {
    state.loading = false;
  },
};

const actions = {
  getPosts({ commit }, { type, page, orderBy, sort } = {}) {
    commit(types.FETCH_POSTS_REQUEST);

    const liked = type === 'liked' ? true : undefined;
    if (type === 'top') {
      orderBy = 'total_likes';
    } else if (type === 'new') {
      orderBy = 'id';
    }

    return postApi.posts({ liked, page, sort, order_by: orderBy }).then(
      (data) => {
        commit(types.FETCH_POSTS_SUCCESS, { data, page, orderBy, sort });
      },
      (err) => {
        commit(types.FETCH_POSTS_FAILURE, { err });
        throw err;
      },
    );
  },

  deletePost({ commit }, id) {
    commit(types.DELETE_POST_REQUEST);
    return postApi.deletePost(id).then(
      () => {
        commit(types.DELETE_POST_SUCCESS, id);
      },
      (err) => {
        commit(types.DELETE_POST_FAILURE, { err });
        throw err;
      },
    );
  },

  editPost({ commit }, { id, data }) {
    commit(types.EDIT_POST_REQUEST);
    return postApi.editPost(id, data).then(
      (data) => {
        commit(types.EDIT_POST_SUCCESS, data.post);
      },
      (err) => {
        commit(types.EDIT_POST_FAILURE, { err });
        throw err;
      },
    );
  },

  createPost({ commit }, post) {
    commit(types.CREATE_POST_REQUEST);
    return postApi.createPost(post).then(
      (data) => {
        commit(types.CREATE_POST_SUCCESS, data.post);
      },
      (err) => {
        commit(types.CREATE_POST_FAILURE, { err });
        throw err;
      },
    );
  },

  likePost({ commit }, id) {
    commit(types.LIKE_POST_REQUEST);
    return postApi.likePost(id).then(
      (data) => {
        commit(types.LIKE_POST_SUCCESS, data.post);
      },
      (err) => {
        commit(types.LIKE_POST_FAILURE, { err });
        throw err;
      },
    );
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export { types };
