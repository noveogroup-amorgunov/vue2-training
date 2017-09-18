import authApi from '@/api/auth';
import authService from '@/services/auth';

// initial state
const initialState = {
  isLoggedIn: authService.isLoggedIn(),
  currentUser: authService.getUser(),
  loading: false,
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  currentUser: state => state.currentUser,
  loading: state => state.loading,
};

const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',

  LOGOUT: 'LOGOUT',

  FETCH_CURRENT_USER_REQUEST: 'FETCH_CURRENT_USER_REQUEST',
  FETCH_CURRENT_USER_SUCCESS: 'FETCH_CURRENT_USER_SUCCESS',
  FETCH_CURRENT_USER_FAILURE: 'FETCH_CURRENT_USER_FAILURE',
};

const mutations = {
  /**
   * Login mutations group
   */
  [types.LOGIN_REQUEST](state) {
    state.loading = true;
  },
  [types.LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
  },
  [types.LOGIN_FAILURE](state) {
    state.isLoggedIn = false;
    state.loading = false;
  },
  /**
   * Registration mutations group
   */
  [types.REGISTRATION](state) {
    state.loading = true;
  },
  [types.REGISTRATION_SUCCESS](state) {
    state.isLoggedIn = true;
  },
  [types.REGISTRATION_FAILURE](state) {
    state.isLoggedIn = false;
    state.loading = false;
  },
  /**
   * Logout mutation
   */
  [types.LOGOUT](state) {
    state.isLoggedIn = false;
    state.loading = false;
  },
  /**
   * Fetch current user
   */
  [types.FETCH_CURRENT_USER_REQUEST](state) {
    state.loading = true;
  },
  [types.FETCH_CURRENT_USER_SUCCESS](state, { user }) {
    state.currentUser = user;
    state.loading = false;
  },
  [types.FETCH_CURRENT_USER_FAILURE](state) {
    state.currentUser = {};
    state.loading = false;
  },
};

const actions = {
  login({ commit, dispatch }, credentials) {
    commit(types.LOGIN_REQUEST);

    return authApi.login(credentials).then(
      (data) => {
        authService.login(data.token);
        commit(types.LOGIN_SUCCESS);
        dispatch('getCurrentUser');
      },
      (err) => {
        commit(types.LOGIN_FAILURE, { err });
        throw err;
      },
    );
  },

  register({ commit, dispatch }, data) {
    commit(types.SIGNUP_REQUEST);

    authApi.register(
      data,
      (token) => {
        authService.login(token);
        commit(types.SIGNUP_SUCCESS);
        dispatch('getCurrentUser');
      },
      err => commit(types.SIGNUP_FAILURE, { err }),
    );
  },

  logout({ commit }) {
    authService.logout();
    commit(types.LOGOUT);
  },

  getCurrentUser({ commit, dispatch, state }) {
    if (!state.isLoggedIn) {
      return;
    }

    commit(types.FETCH_CURRENT_USER_REQUEST);
    authApi.currentUser().then(
      (data) => {
        authService.setUser(data.user);
        commit(types.FETCH_CURRENT_USER_SUCCESS, { user: data.user });
      },
      (err) => {
        commit(types.FETCH_CURRENT_USER_FAILURE, { err });
        dispatch('logout');
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
