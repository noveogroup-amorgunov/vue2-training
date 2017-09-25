<template>
  <div class="user-view">
    <template v-if="selectedUser">
      <h1>User: #{{ selectedUser.id }}</h1>
      <ul class="meta">
        <li><span class="label">Created:</span> {{ new Date(selectedUser.created_at.date) | timeAgo }} ago</li>
        <li><span class="label">Updated:</span> {{ new Date(selectedUser.updated_at.date) | timeAgo }} ago</li>
        <li><span class="label">Email:</span> {{ selectedUser.email }}</li>
        <li><span class="label">Name:</span> {{ selectedUser.name }}</li>
      </ul>
    </template>
    <template v-else>
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    title() {
      return this.selectedUser
        ? `User profile ${this.selectedUser.id}`
        : 'User not found';
    },
    name: 'user',
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