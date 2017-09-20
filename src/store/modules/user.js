import userApi from '@/api/user';
import authApi from '@/api/auth';

const defaultMetaState = {
  orderBy: 'id',
  sort: 'desc',
  page: 1,
  total: 0,
};

// initial state
const initialState = {
  users: [/* [id: number]: User */],
  meta: { ...defaultMetaState },
  loading: false,
};

const getters = {
  users: state => state.users,
  meta: state => state.meta,
  loading: state => state.loading,
  getUserByEmail: state => email => state.users.filter(user => user.email === email)[0],
};

const types = {
  FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',

  DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',

  EDIT_USER_REQUEST: 'EDIT_USER_REQUEST',
  EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
  EDIT_USER_FAILURE: 'EDIT_USER_FAILURE',

  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',
};

const mutations = {
  /**
   * Fetch users list request
   */
  [types.FETCH_USERS_REQUEST](state) {
    state.loading = true;
  },
  [types.FETCH_USERS_SUCCESS](state, { data: { users, meta }, page, orderBy, sort }) {
    state.users = users;
    state.meta = {
      ...state.meta,
      ...meta,
      page,
      orderBy,
      sort,
    };
    state.loading = false;
  },
  [types.FETCH_USERS_FAILURE](state) {
    state.users = [];
    state.meta = defaultMetaState;
    state.loading = false;
  },

  /**
   * Delte user by id
   */
  [types.DELETE_USER_REQUEST](state) {
    state.loading = true;
  },
  [types.DELETE_USER_SUCCESS](state, id) {
    state.users = state.users.filter(user => user.id !== id);
    state.loading = false;
  },
  [types.DELETE_USER_FAILURE](state) {
    state.loading = false;
  },

  /**
   * Edit user by id
   */
  [types.EDIT_USER_REQUEST](state) {
    state.loading = true;
  },
  [types.EDIT_USER_SUCCESS](state, editedUser) {
    state.users = state.users.map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      }
      return user;
    });
    state.loading = false;
  },
  [types.EDIT_USER_FAILURE](state) {
    state.loading = false;
  },

  /**
   * Create new user
   */
  [types.CREATE_USER_REQUEST](state) {
    state.loading = true;
  },
  [types.CREATE_USER_SUCCESS](state, user) {
    state.users = state.users.concat(user);
    state.loading = false;
  },
  [types.CREATE_USER_FAILURE](state) {
    state.loading = false;
  }
};

const actions = {
  getUsers({ commit }, { page, orderBy, sort } = {}) {
    commit(types.FETCH_USERS_REQUEST);
    return userApi.users(page, sort, orderBy).then(
      (data) => {
        commit(types.FETCH_USERS_SUCCESS, { data, page, orderBy, sort });
      },
      (err) => {
        commit(types.FETCH_USERS_FAILURE, { err });
        throw err;
      },
    );
  },

  deleteUser({ commit }, id) {
    commit(types.DELETE_USER_REQUEST);
    return userApi.deleteUser(id).then(
      () => {
        commit(types.DELETE_USER_SUCCESS, id);
      },
      (err) => {
        commit(types.DELETE_USER_FAILURE, { err });
        throw err;
      },
    );
  },

  editUser({ commit }, { id, data }) {
    commit(types.EDIT_USER_REQUEST);
    return userApi.editUser(id, data).then(
      (data) => {
        commit(types.EDIT_USER_SUCCESS, data.user);
      },
      (err) => {
        commit(types.EDIT_USER_FAILURE, { err });
        throw err;
      },
    );
  },

  createUser({ commit }, user) {
    commit(types.CREATE_USER_REQUEST);
    return authApi.register(user).then(
      (data) => {
        commit(types.CREATE_USER_SUCCESS, data.user);
      },
      (err) => {
        commit(types.CREATE_USER_FAILURE, { err });
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
