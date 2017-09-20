<template>
  <div>
    <h1>Users</h1>
    <template v-if="isAdmin">
      <h2>Add new users</h2>
      <PostCreateForm />
    </template>
    <h2>Users list</h2>
    <Grid
      entity-name="User"
      :data="users"
      :apiGetEntitiesMethod="loadUsers"
      :columns="columns" />
  </div>
</template>

<!--
 :class="{'active': isActive}"
@submit="additem"
 @click="() => remove(item)"
-->

<script>
  import { mapGetters } from 'vuex';
  import Grid from '@/components/Grid/Grid.vue';
  import PostCreateForm from '@/components/Form/PostCreateForm.vue';

  export default {
    name: 'users-view',
    title: 'List of users',
    components: { Grid, PostCreateForm },
    asyncData({ store, route: { params: { id } } }) {
      // special timeout (1 second) for progress bar testing
      return Promise.all([
        store.dispatch('user/getUsers'),
        new Promise(res => setTimeout(res, 1e3))
      ]);
    },
    data() {
      return {
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
      ...mapGetters('user', ['users']),
      ...mapGetters('auth', ['isAdmin']),
    },
    methods: {
      loadUsers({ page, orderBy, sort } = {}) {
        return this.$store.dispatch('user/getUsers', { page, orderBy, sort });
      },
    }
  };
</script>
