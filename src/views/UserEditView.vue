<template>
  <div class="user-edit-view">
    <template v-if="selectedUser">
      <h1>User: #{{ selectedUser.id }}</h1>
      <user-edit-form :data="selectedUser" />
    </template>
    <template v-else>
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import UserEditForm from '@/components/Form/UserEditForm.vue';

  export default {
    title() {
      return this.selectedUser
        ? `Edit user ${this.selectedUser.id}`
        : 'User not found';
    },
    components: { UserEditForm },
    computed: {
      ...mapGetters('user', ['selectedUser']),
    },
    methods: {
      ...mapActions('user', ['getUser']),
    },
    asyncData({ store, route: { params: { id } } }) {
      store.dispatch('user/getUser', id);
    },
  };
</script>
