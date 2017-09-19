<template>
  <div id="app">
    <header-nav />
    <main class="layout-wrapper">
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </main>
    <footer class="layout-footer">
      Example created by <a target="blank" href="https://github.com/noveogroup-amorgunov">Alexander&nbsp;Morgunov</a>, {{ year }}
    </footer>
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
    computed: {
      year() {
        return (new Date()).getFullYear();
      }
    }
  };
</script>

<style lang="scss">

#app {
  display: flex;
  min-height: 100vh;
  height: 100%;
  flex-direction: column;
}

.layout-wrapper {
  flex: 1;
}

.layout-wrapper {
  flex: 1 0 auto;
  // padding: var(--space) var(--space) 0;
  width: 100%;
}

.layout-wrapper::after {
  content: '\00a0'; /* &nbsp; */
  display: block;
  margin-top: var(--space);
  height: 0px;
  visibility: hidden;
}
</style>
