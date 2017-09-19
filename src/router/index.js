import Vue from 'vue';
import Router from 'vue-router';

import { userRoles } from '@/config';

Vue.use(Router);

// route-level code splitting
// const PostListView = () => import('@/views/PostListView.vue');
// const PostCreateView = () => import('@/views/PostCreateView.vue');
// const PostEditView = () => import('@/views/PostEditView.vue');
// const UserEditView = () => import('@/views/UserEditView.vue');
const UserListView = () => import('@/views/UserListView.vue');

const LoginView = () => import('@/views/LoginView.vue');
const SignupView = () => import('@/views/SignupView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');
const HomeView = () => import('@/views/HomeView.vue');

// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id));
// const ItemView = () => import('../views/ItemView.vue');
// const UserView = () => import('../views/UserView.vue');

function createRouter() {
  return new Router({
    mode: 'history',
    linkExactActiveClass: 'is-active',

    // scroll to top after change page
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/login', name: 'login', component: LoginView },
      { path: '/signup', name: 'signup', component: SignupView },
      { path: '/users/:page(\\d+)?', name: 'users', component: UserListView, meta: { requiresAuth: true } },
      // { path: '/users/:id/edit', name: 'user-edit', component: UserEditView, meta: { requiresAuth: true, roles: [userRoles.ADMIN] } },

      // { path: '/posts/:page(\\d+)?', name: 'posts', component: PostListView, meta: { requiresAuth: true } },
      // { path: '/posts/:id(\\d+)/edit', name: 'post-edit', component: PostEditView, meta: { requiresAuth: true } },
      // { path: '/posts/:id(\\d+)/create', name: 'post-create', component: PostCreateView, meta: { requiresAuth: true, roles: [userRoles.ADMIN] } },
      { path: '/', name: 'home', component: HomeView },
      { path: '*', name: 'not-found', component: NotFoundView },
    ],
  });
}

export default createRouter;
export { createRouter };
