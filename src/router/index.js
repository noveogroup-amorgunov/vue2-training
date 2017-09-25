import Vue from 'vue';
import Router from 'vue-router';

import { userRoles } from '@/config';

Vue.use(Router);

// route-level code splitting
const UsersView = () => import('@/views/UsersView.vue');
const UserView = () => import('@/views/UserView.vue');
const PostView = () => import('@/views/PostView.vue');
const PostsView = () => import('@/views/PostsView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const SignupView = () => import('@/views/SignupView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');
const HomeView = () => import('@/views/HomeView.vue');
const createPostView = id => () => import('@/views/CreatePostView.js').then(m => m.default(id));

// const PostCreateView = () => import('@/views/PostCreateView.vue');

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
      { path: '/post/:id(\\d+)', component: UserView, meta: { requiresAuth: true } },

      { path: '/users/page/:page(\\d+)?', name: 'users', component: UsersView, meta: { requiresAuth: true } },
      { path: '/users', redirect: '/users/page/1' },
      // { path: '/users/:id/edit', name: 'user-edit', component: UserEditView, meta: { requiresAuth: true } },

      { path: '/posts/page/:page(\\d+)?', name: 'posts', component: PostsView, meta: { requiresAuth: true } },
      { path: '/posts', redirect: '/posts/page/1' },

      // { path: '/posts/:id(\\d+)/edit', name: 'post-edit', component: PostEditView, meta: { requiresAuth: true,  } },
      // { path: '/posts/:id(\\d+)/create', name: 'post-create', component: PostCreateView, meta: { requiresAuth: true, roles: [userRoles.ADMIN] } },
      { path: '/', name: 'home', component: HomeView },
      { path: '*', component: NotFoundView },
    ],
  });
}

export function addAuthMiddleware(router, authMiddleware) {
  router.beforeEach(authMiddleware());
}

export default createRouter;
