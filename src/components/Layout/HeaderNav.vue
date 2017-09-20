<template>
  <header class="layout-header cf">
    <router-link to="/" exact>
      <h1>Vue2</h1>
      <img class="logo" src="/logo-48.png" alt="logo">
    </router-link>
    <span>
      <template v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </template>  
      <template v-else>
        Hello, {{currentUser.name}}
        <a href="#" @click.prevent="doLogout()">Logout</a>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/users">Users</router-link>
        <template v-if="isAdmin">
        </template>  
      </template>
    </span>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import { modalTypes } from '@/store/modules/app';

  export default {
    computed: {
      ...mapGetters('auth', ['isLoggedIn', 'currentUser', 'isAdmin']),
    },
    methods: {
      ...mapActions('auth', ['logout']),
      ...mapActions('app', ['showModal']),
      doLogout() {
        this.showModal({ modalType: modalTypes.CONFIRM_LOGOUT });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .logo {
    height: 50px;
  }
</style>