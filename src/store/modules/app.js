// initial state
const initialState = {
  modal: null,
  isOpenDropdowns: false,
};

const getters = {
  isShowModal: state => state.modal !== null,
  isOpenDropdowns: state => state.isOpenDropdowns,
  modal: state => state.modal,
};

const modalTypes = {
  CONFIRM_DELETE_ENTITY: 'CONFIRM_DELETE_ENTITY',
  CONFIRM_LOGOUT: 'CONFIRM_LOGOUT',
};

const types = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  OPEN_DROPDOWNS: 'OPEN_DROPDOWNS',
  CLOSE_DROPDOWNS: 'CLOSE_DROPDOWNS',
};

const mutations = {
  [types.SHOW_MODAL](state, { modalType, modalProps }) {
    state.modal = { modalType, modalProps };
  },
  [types.HIDE_MODAL](state) {
    state.modal = null;
  },
  [types.OPEN_DROPDOWNS](state) {
    state.isOpenDropdowns = true;
  },
  [types.CLOSE_DROPDOWNS](state) {
    state.isOpenDropdowns = false;
  },
};

const actions = {
  showModal({ commit }, options) {
    commit(types.SHOW_MODAL, options);
  },

  hideModal({ commit }) {
    commit(types.HIDE_MODAL);
  },

  closeDropdowns({ commit, state }) {
    if (!state.isOpenDropdowns) {
      return;
    }
    commit(types.CLOSE_DROPDOWNS);
  },

  openDropdowns({ commit }) {
    commit(types.OPEN_DROPDOWNS);
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export { types };
export { modalTypes };
