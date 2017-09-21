<template>
  <div>
    <h1>Users</h1>
    <template v-if="isAdmin">
      <h2>Add new users</h2>
      <UserCreateForm @create-user="updateData = !updateData"/>
    </template>
    <h2>Users list</h2>
    <Grid
      entity-name="User"
      :meta="meta"
      :data="users"
      :update-data="updateData"
      :apiGetEntitiesMethod="loadUsers"
      :apiDeleteEntityMethod="deleteUser"
      :columns="columns" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Grid from '@/components/Grid/Grid.vue';
  import UserCreateForm from '@/components/Form/UserCreateForm.vue';

  export default {
    name: 'users-view',
    title: 'List of users',
    components: { Grid, UserCreateForm },
    asyncData({ store, route: { params: { id } } }) {
      // special timeout (1 second) for progress bar testing
      return Promise.all([
        store.dispatch('user/getUsers'),
        new Promise(res => setTimeout(res, 1e3))
      ]);
    },
    data() {
      return {
        updateData: false,
        columns: ['id', 'email', 'name', 'role'],
        columns2: [
          {
            key: 'id',
            width: '20%',
            onClick() {
              /* open modal with user editing */
            },
          }
        ]
      };
    },
    computed: {
      ...mapGetters('user', ['users', 'meta']),
      ...mapGetters('auth', ['isAdmin']),
    },
    methods: {
      loadUsers({ page, orderBy, sort } = {}) {
        return this.$store.dispatch('user/getUsers', { page, orderBy, sort });
      },
      deleteUser(id) {
        return this.$store.dispatch('user/deleteUser', id);
      }
    }
  };
</script>
