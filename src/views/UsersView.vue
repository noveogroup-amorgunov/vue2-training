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
      :default-page="defaultPage"
      :meta="meta"
      :data="users"
      :update-data="updateData"
      :apiGetEntitiesMethod="loadUsers"
      :apiDeleteEntityMethod="deleteUser"
      :edit-view="editFormComponent"
      :on-edit-view="() => updateData = !updateData"
      :columns="['id', 'email', 'name', 'role']" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Grid from '@/components/Grid/Grid.vue';
  import UserCreateForm from '@/components/Form/UserCreateForm.vue';
  import UserEditForm from '@/components/Form/UserEditForm.vue';

  export default {
    name: 'users-view',
    title: 'List of users',
    components: { Grid, UserCreateForm, UserEditForm },
    asyncData({ store, route: { params: { page } } }) {
      // special timeout (1 second) for progress bar testing
      return Promise.all([
        store.dispatch('user/getUsers', { page }),
        new Promise(res => setTimeout(res, 1e3))
      ]);
    },
    data() {
      return {
        defaultPage: +this.$route.params.page,
        editFormComponent: UserEditForm,
        updateData: false,
      };
    },
    computed: {
      ...mapGetters('user', ['users', 'meta']),
      ...mapGetters('auth', ['isAdmin']),
    },
    methods: {
      /**
       * @param {Object} options
       * @param {Number} options.page
       * @param {Number} options.orderBy - ordered field
       * @param {Number} options.sort - asc or desc
       */
      loadUsers({ page, orderBy, sort } = {}) {
        return this.$store.dispatch('user/getUsers', { page, orderBy, sort });
      },
      /**
       * @param {Number} id
       */
      deleteUser(id) {
        return this.$store.dispatch('user/deleteUser', id);
      }
    }
  };
</script>
