<template>
    <BaseModal :submit="doLogout" action-text="logout">
        <template slot="header">Confirm logout</template>
        <template slot="content">Do you want logout? Really?</template>
        <slot name="confirmButtom">Confirm logout modal vue!</slot>
    </BaseModal>
</template>

<script>
  import { mapActions } from 'vuex';
  import BaseModal from './BaseModal.vue';

  export default {
    components: { BaseModal },
    methods: {
      ...mapActions('app', ['hideModal']),
      ...mapActions('auth', ['logout']),
      doLogout() {
        this.logout();
        this.$router.push({ name: 'home' });
      },
    },
  };
</script>