// initial state
const initialState = {
  modal: null,
};

const getters = {
  isShowModal: state => state.modal !== null,
  modal: state => state.modal,
};

const modalTypes = {
  CONFIRM_DELETE_ENTITY: 'CONFIRM_DELETE_ENTITY',
  CONFIRM_LOGOUT: 'CONFIRM_LOGOUT',
};

const types = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
};

const mutations = {
  [types.SHOW_MODAL](state, { modalType, modalProps }) {
    state.modal = { modalType, modalProps };
  },
  [types.HIDE_MODAL](state) {
    state.modal = null;
  },
};

const actions = {
  showModal({ commit }, options) {
    commit(types.SHOW_MODAL, options);
  },

  hideModal({ commit }) {
    commit(types.HIDE_MODAL);
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
export { modalTypes };
