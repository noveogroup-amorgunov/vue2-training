import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export function createStore() {
  return new Vuex.Store({
    state: {
      activeType: null,
      itemsPerPage: 20,
      items: {/* [id: number]: Item */},
      users: {/* [id: string]: User */},
      lists: {
        top: [/* number */],
        new: [],
        show: [],
        ask: [],
        job: [],
      },
    },
    modules: { auth /*, post, collection, ui*/ },
    // actions,
    // mutations,
    // getters,
    strict: debug,
    plugins: debug ? [createLogger()] : [],
  });
}

/*
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products
  },
})*/
