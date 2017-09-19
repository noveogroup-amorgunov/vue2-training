import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import auth from './modules/auth';
import user from './modules/user';
import post from './modules/post';
import app from './modules/app';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export function createStore() {
  return new Vuex.Store({
    modules: { auth, user, post, app },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
  });
}
