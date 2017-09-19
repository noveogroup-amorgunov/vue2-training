<template>
  <header class="layout-header cf">
    <router-link to="/" exact>
      <h1>Vue2</h1>
      <img class="logo" src="../../../public/logo-48.png" alt="logo">
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
      <!--router-link to="/show">Show</router-link>
      <router-link to="/ask">Ask</router-link>
      <router-link to="/job">Jobs</router-link-->
    </span>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { userRoles } from '@/config';

  export default {
    computed: {
      ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
      isAdmin() {
        return this.currentUser && this.currentUser.role === userRoles.ADMIN;
      },
    },
    methods: {
      ...mapActions('auth', ['logout']),
      doLogout() {
        this.logout();
        this.$router.push({ name: 'home' });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .logo {
    height: 50px;
  }
</style>