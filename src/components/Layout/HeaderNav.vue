<template>
  <header class="layout-header header cf">
    <div class="header-inner">
      <router-link :to="isLoggedIn ? '/top' : '/'" exact>
        <div class="header-logo">v</div>
      </router-link>
      <span>
        <template v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Signup</router-link>
        </template>  
        <template v-else>
          Hello, <strong>{{currentUser.name}}</strong>
          <a href="#" @click.prevent="doLogout()">(Logout)</a>
          <router-link to="/top">Top</router-link>
          <router-link to="/new">New</router-link>
          <router-link to="/liked">Liked</router-link>
          <template v-if="isAdmin">
            <router-link to="/backoffice"><strong>Backoffice</strong></router-link>
          </template>
        </template>
      </span>
      <span class="header-vue">
        <a href="https://vuejs.org" target="_blank"> Build with <strong>Vue2</strong></a>
      </span>
    </div>
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