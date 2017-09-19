import userApi from '@/api/user';

const defaultMetaState = {
  order_by: 'id',
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
};

const types = {
  FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
};

const mutations = {
  /**
   * Fetch users list request
   */
  [types.FETCH_USERS_REQUEST](state) {
    state.loading = true;
  },
  [types.FETCH_USERS_SUCCESS](state, { users, meta }) {
    state.users = users;
    state.meta = { ...state.meta, ...meta };
    state.loading = false;
  },
  [types.FETCH_USERS_FAILURE](state) {
    state.users = {};
    state.meta = defaultMetaState;
    state.loading = false;
  },
};

const actions = {
  getUsers({ commit }, page) {
    commit(types.FETCH_USERS_REQUEST);
    return userApi.users(page).then(
      (data) => {
        commit(types.FETCH_USERS_SUCCESS, data);
      },
      (err) => {
        commit(types.FETCH_USERS_FAILURE, { err });
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
