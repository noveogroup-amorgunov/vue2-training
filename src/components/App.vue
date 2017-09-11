<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <!-- img class="logo" src="../public/logo-48.png" alt="logo" -->
        </router-link>
        <router-link to="/top">Top</router-link>
        <router-link to="/new">New</router-link>
        <router-link to="/show">Show</router-link>
        <router-link to="/ask">Ask</router-link>
        <router-link to="/job">Jobs</router-link>
        <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">
          Built with Vue.js
        </a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  // import MainNav from '@/components/Layout/MainNav.vue';
  // import MainFooter from '@/components/Layout/MainFooter.vue';
  // import Spinner from '@/components/Layout/Spinner.vue';
  // import Notification from '@/components/Layout/Notification.vue';
  // import Modal from '@/components/Modal/Modal.vue';

  export default {
    name: 'app',
    // components: { MainNav, MainFooter, Spinner, Notification, Modal },
    beforeCreate() {
      this.$store.dispatch('auth/getCurrentUser');
    },
  };

/*
<template>
  <div id="app">
    <img src="../assets/logo.png">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <product-list></product-list>
    <hr>
    <cart></cart>
  </div>
</template>
 */

/*import ProductList from './ProductList.vue';
import Cart from './Cart.vue';

export default {
  components: { ProductList, Cart },
};*/
</script>

<style lang="scss">
</style>
