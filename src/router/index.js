import Vue from 'vue';
import Router from 'vue-router';

import { userRoles } from '@/config';

Vue.use(Router);

// route-level code splitting
const UserView = () => import('@/views/UserView.vue');
const PostView = () => import('@/views/PostView.vue');
const UserEditView = () => import('@/views/UserEditView.vue');
const PostEditView = () => import('@/views/PostEditView.vue');

const createPostView = id => () => import('@/views/CreatePostView.js').then(m => m.default(id));
const BackOfficeView = () => import('@/views/BackOfficeView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const SignupView = () => import('@/views/SignupView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');
const HomeView = () => import('@/views/HomeView.vue');

export function createRouter() {
  return new Router({
    mode: 'history',
    linkExactActiveClass: 'is-active',

    // scroll to top after change page
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/login', name: 'login', component: LoginView },
      { path: '/signup', component: SignupView },

      { path: '/top/:page(\\d+)?', component: createPostView('new') },
      { path: '/new/:page(\\d+)?', component: createPostView('new') },
      { path: '/liked/:page(\\d+)?', component: createPostView('liked') },

      { path: '/user/:id(\\d+)', component: UserView, meta: { requiresAuth: true } },
      { path: '/post/:id(\\d+)', component: PostView, meta: { requiresAuth: true } },
      { path: '/user/:id(\\d+)/edit', component: UserEditView, meta: { requiresAuth: true, roles: [userRoles.ADMIN] } },
      { path: '/post/:id(\\d+)/edit', component: PostEditView, meta: { requiresAuth: true, roles: [userRoles.ADMIN] } },

      { path: '/backoffice', component: BackOfficeView, meta: { requiresAuth: true, roles: [userRoles.ADMIN] } },

      { path: '/', name: 'home', component: HomeView },
      { path: '*', component: NotFoundView },
    ],
  });
}

export function addAuthMiddleware(router, authMiddleware) {
  router.beforeEach(authMiddleware());
}

export default createRouter;
