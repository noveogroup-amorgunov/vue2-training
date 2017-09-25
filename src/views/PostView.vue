<template>
  <div class="user-view">
    <template v-if="selectedPost">
      <h1>{{ selectedPost.title }}</h1>
      <div>
        {{ selectedPost.content }}
      </div>
      <ul class="meta">
        <li><span class="label">Created:</span> {{ new Date(selectedPost.created_at.date) | timeAgo }} ago</li>
        <li><span class="label">Updated:</span> {{ new Date(selectedPost.updated_at.date) | timeAgo }} ago</li>
        <li><span class="label">Author:</span> <router-link :to="'/user/' + selectedPost.user.id"><strong>{{ selectedPost.user.name }}</strong></router-link></li>
      </ul>
    </template>
    <template v-else>
      <h1>Post not found.</h1>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    title() {
      return this.selectedPost
        ? this.selectedPost.title
        : 'Post not found';
    },
    name: 'post',
    computed: {
      ...mapGetters('post', ['selectedPost']),
    },
    asyncData({ store, route: { params: { id } } }) {
      store.dispatch('post/getPost', id);
    },
  };
</script>