import authApi from '@/api/auth';
import authService from '@/services/auth';

// initial state
const initialState = {
  isLoggedIn: authService.isLoggedIn(),
  currentUser: authService.getUser(),
  pending: false,
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  currentUser: state => state.currentUser,
  pending: state => state.pending,
};

const types = {
  LOGIN_REQUEST: '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: '@@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@@auth/LOGIN_FAILURE',

  SIGNUP_REQUEST: '@@auth/SIGNUP_REQUEST',
  SIGNUP_SUCCESS: '@@auth/SIGNUP_SUCCESS',
  SIGNUP_FAILURE: '@@auth/SIGNUP_FAILURE',

  LOGOUT: '@@auth/LOGOUT',

  FETCH_CURRENT_USER_REQUEST: '@@auth/FETCH_CURRENT_USER_REQUEST',
  FETCH_CURRENT_USER_SUCCESS: '@@auth/FETCH_CURRENT_USER_SUCCESS',
  FETCH_CURRENT_USER_FAILURE: '@@auth/FETCH_CURRENT_USER_FAILURE',
};

const mutations = {
  /**
   * Login mutations group
   */
  [types.LOGIN_REQUEST](state) {
    state.pending = true;
  },
  [types.LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
  },
  [types.LOGIN_FAILURE](state) {
    state.isLoggedIn = false;
    state.pending = false;
  },
  /**
   * Registration mutations group
   */
  [types.REGISTRATION](state) {
    state.pending = true;
  },
  [types.REGISTRATION_SUCCESS](state) {
    state.isLoggedIn = true;
  },
  [types.REGISTRATION_FAILURE](state) {
    state.isLoggedIn = false;
    state.pending = false;
  },
  /**
   * Logout mutation
   */
  [types.LOGOUT](state) {
    state.isLoggedIn = false;
    state.pending = false;
  },
  /**
   * Fetch current user
   */
  [types.FETCH_CURRENT_USER](state) {
    state.pending = true;
  },
  [types.FETCH_CURRENT_USER_SUCCESS](state, { user }) {
    state.currentUser = user;
    state.pending = false;
  },
  [types.FETCH_CURRENT_USER_FAILURE](state) {
    state.currentUser = {};
    state.pending = false;
  },
};

const actions = {
  login({ commit, dispatch }, credentials) {
    commit(types.LOGIN_REQUEST);
    console.log(credentials);

    return authApi.login(credentials).then(
      (token) => {
        authService.login(token);
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
    authApi.currentUser(
      (user) => {
        authService.setUser(user);
        commit(types.FETCH_CURRENT_USER_SUCCESS);
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
