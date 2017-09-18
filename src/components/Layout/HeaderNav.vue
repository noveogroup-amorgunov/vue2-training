<template>
  <header class="header">
    <nav class="inner">
      <router-link to="/" exact><img class="logo" src="../../../public/logo-48.png" alt="logo"></router-link>
      <template v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </template>  
      <template v-else>
        <a href="#" @click.prevent="doLogout()">Logout {{currentUser.name}}</a>
      </template>  
      <router-link to="/show">Show</router-link>
      <router-link to="/ask">Ask</router-link>
      <router-link to="/job">Jobs</router-link>
    </nav>
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