<template>
  <div id="app">
    <header-nav />
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HeaderNav from '@/components/Layout/HeaderNav.vue';
  // import MainFooter from '@/components/Layout/MainFooter.vue';
  // import Spinner from '@/components/Layout/Spinner.vue';
  // import Notification from '@/components/Layout/Notification.vue';
  // import Modal from '@/components/Modal/Modal.vue';

  export default {
    name: 'app',
    components: { HeaderNav },
    beforeCreate() {
      this.$store.dispatch('auth/getCurrentUser');
    },
  };
</script>

<style lang="scss">
</style>
